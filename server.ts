import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dr_mina_samir';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from public if it exists
app.use(express.static(path.join(__dirname, '.'))); // fallback serve static files from root

let clientConnectionPromise: Promise<MongoClient> | null = null;
let seedingPromise: Promise<void> | null = null;
let db: any = null;

function handleDbError(error: any) {
  console.error('Database connection or query error:', error);
  // Reset cached database and connections on connection or query error to force a reconnect next time
  db = null;
  clientConnectionPromise = null;
  seedingPromise = null;
}

async function getDb() {
  if (db) return db;

  if (!clientConnectionPromise) {
    console.log('Initializing MongoClient...');
    const client = new MongoClient(mongodbUri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    // Cache the promise so concurrent requests await the same connection attempt
    clientConnectionPromise = client.connect().then((connectedClient) => {
      console.log('Successfully connected to MongoDB');
      return connectedClient;
    }).catch((err) => {
      console.error('MongoDB connection failed:', err);
      clientConnectionPromise = null; // enable retry
      throw err;
    });
  }

  try {
    const client = await clientConnectionPromise;
    const database = client.db();

    // Ensure seeding only runs once, even with concurrent requests
    if (!seedingPromise) {
      console.log('Seeding process starting...');
      seedingPromise = seedData(database).then(() => {
        console.log('Seeding process completed successfully');
      }).catch((err) => {
        console.error('Seeding process failed:', err);
        seedingPromise = null; // enable retry on failure
        throw err;
      });
    }

    // Await the seeding completion so queries don't run against unseeded database
    await seedingPromise;
    
    db = database;
    return db;
  } catch (error) {
    // If anything fails during the process, clear the cached promise to allow healing
    handleDbError(error);
    throw error;
  }
}

async function seedData(database: any) {
  try {
    // Ensure clinics exist first
    let clinics = await database.collection('clinics').find({}).toArray();
    if (clinics.length === 0) {
      await database.collection('clinics').insertMany([
        { 
          name: 'Minya Clinic (عيادة المنيا)', 
          address: 'المنيا شارع الحسيني شرق المحمدي (Hussaini St, East of El Mohammadi, Minya)',
          schedule: {
            days: [1, 2, 3, 4, 5, 6],
            hours: { start: '12:00', end: '14:30' }
          }
        },
        { 
          name: 'Bani Ahmed Clinic (عيادة بني أحمد)', 
          address: 'بني احمد الشرقية (Bani Ahmed El Sharkia)',
          schedule: {
            days: [1, 2, 3, 4, 5, 6],
            hours: { start: '17:00', end: '19:00' }
          }
        }
      ]);
      clinics = await database.collection('clinics').find({}).toArray();
    }

    // Ensure services exist and link them to clinics
    const servicesCount = await database.collection('services').countDocuments();
    if (servicesCount === 0 && clinics.length >= 2) {
      const minyaClinicId = clinics[0]._id.toString();
      const baniAhmedClinicId = clinics[1]._id.toString();

      await database.collection('services').insertMany([
        { name: 'General Consultation', price: 200, assistant_fees: 20, clinic_id: minyaClinicId },
        { name: 'Newborn Checkup', price: 250, assistant_fees: 30, clinic_id: minyaClinicId },
        { name: 'Vaccination', price: 150, assistant_fees: 15, clinic_id: minyaClinicId },
        { name: 'General Consultation', price: 180, assistant_fees: 20, clinic_id: baniAhmedClinicId },
        { name: 'Emergency Visit', price: 300, assistant_fees: 50, clinic_id: baniAhmedClinicId }
      ]);
    }
  } catch (err) {
    console.error('Error seeding data:', err);
    throw err;
  }
}

// Warm up connection on startup (non-blocking, fails gracefully)
getDb().catch(() => {});

// API Endpoints

// Services
app.get('/api/services', async (req, res) => {
  try {
    const database = await getDb();
    const services = await database.collection('services').find({}).toArray();
    res.json(services);
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const database = await getDb();
    const testimonials = await database.collection('testimonials')
      .find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();
    res.json(testimonials);
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const database = await getDb();
    const { name, condition, content, rating } = req.body;
    const result = await database.collection('testimonials').insertOne({
      name,
      condition,
      content,
      rating,
      isApproved: true, // Auto-approved to show directly
      createdAt: new Date()
    });
    res.json({ id: result.insertedId });
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to save testimonial' });
  }
});

// Clinics
app.get('/api/clinics', async (req, res) => {
  try {
    const database = await getDb();
    const clinics = await database.collection('clinics').find({}).toArray();
    res.json(clinics);
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to fetch clinics' });
  }
});

// Helpers for Google Calendar Auto-Sync
async function autoSyncToGoogleCalendar(appointmentData: any) {
  try {
    const database = await getDb();
    const config = await database.collection('admin_config').findOne({ _id: 'google_auth' });
    if (!config || !config.accessToken || !config.calendarId) {
      console.log('No active doctor Google Calendar configuration found for auto-sync.');
      return null;
    }

    // Retrieve clinic and service info for rich details
    const clinics = await database.collection('clinics').find({}).toArray();
    const services = await database.collection('services').find({}).toArray();
    
    // Find matching clinic and service
    const clinic = clinics.find((c: any) => c._id.toString() === appointmentData.clinicId || String(c._id) === String(appointmentData.clinicId));
    const clinicName = clinic ? clinic.name : "Clinic";
    const clinicAddress = clinic ? clinic.address : "";

    const service = services.find((s: any) => s._id.toString() === appointmentData.serviceId || String(s._id) === String(appointmentData.serviceId));
    const serviceName = service ? service.name : "Pediatric Consultation";

    const startDateTimeStr = `${appointmentData.appointmentDay}T${appointmentData.appointmentTime}:00`;
    
    // Calculate end time
    let [h, m] = appointmentData.appointmentTime.split(':').map(Number);
    m += 30;
    if (m >= 60) {
      m -= 60;
      h += 1;
    }
    const endH = String(h).padStart(2, '0');
    const endM = String(m).padStart(2, '0');
    const endDateTimeStr = `${appointmentData.appointmentDay}T${endH}:${endM}:00`;

    const eventData = {
      summary: `Dr. Mina Samir Appointment - ${appointmentData.patientName}`,
      location: `${clinicName} (${clinicAddress})`,
      description: `Appointment details:\n- Patient: ${appointmentData.patientName}\n- Service: ${serviceName}\n- Contact: ${appointmentData.phone}\n\nThank you for booking! See you soon.`,
      start: {
        dateTime: startDateTimeStr,
        timeZone: 'Africa/Cairo'
      },
      end: {
        dateTime: endDateTimeStr,
        timeZone: 'Africa/Cairo'
      },
      reminders: {
        useDefault: true
      }
    };

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId)}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (response.ok) {
      const resultData: any = await response.json();
      console.log(`Auto-synced event successfully to Google Calendar: ${resultData.id}`);
      return resultData.id;
    } else {
      const errText = await response.text();
      console.error(`Google Calendar auto-sync API returned error status ${response.status}:`, errText);
      return null;
    }
  } catch (err) {
    console.error('Exception during Google Calendar auto-sync:', err);
    return null;
  }
}

// Appointments
app.post('/api/appointments', async (req, res) => {
  try {
    const database = await getDb();
    const { patientName, birthDate, phone, clinicId, serviceId, appointmentDay, appointmentTime } = req.body;
    
    const appointmentPayload: any = {
      patientName,
      birthDate,
      phone,
      clinicId,
      serviceId,
      appointmentDay,
      appointmentTime,
      status: 'pending',
      createdAt: new Date(),
      gcalSynced: false,
      gcalEventId: null
    };

    // Auto-sync attempt (fails silently if no active token / expired token)
    const gcalEventId = await autoSyncToGoogleCalendar(appointmentPayload);
    if (gcalEventId) {
      appointmentPayload.gcalSynced = true;
      appointmentPayload.gcalEventId = gcalEventId;
    }

    const result = await database.collection('appointments').insertOne(appointmentPayload);
    res.json({ id: result.insertedId, gcalSynced: appointmentPayload.gcalSynced });
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const database = await getDb();
    const appointments = await database.collection('appointments')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json(appointments);
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const database = await getDb();
    const { id } = req.params;
    const updateData = req.body;
    
    let filter = {};
    try {
      filter = { _id: new ObjectId(id) };
    } catch (e) {
      filter = { _id: id };
    }

    const { _id, ...fieldsToUpdate } = updateData;

    await database.collection('appointments').updateOne(filter, { $set: fieldsToUpdate });
    res.json({ success: true });
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

app.delete('/api/appointments/:id', async (req, res) => {
  try {
    const database = await getDb();
    const { id } = req.params;
    let filter = {};
    try {
      filter = { _id: new ObjectId(id) };
    } catch (e) {
      filter = { _id: id };
    }
    await database.collection('appointments').deleteOne(filter);
    res.json({ success: true });
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

// Admin Configuration endpoints
app.post('/api/admin/google-auth', async (req, res) => {
  try {
    const database = await getDb();
    const { accessToken, email, name, calendarId } = req.body;
    await database.collection('admin_config').updateOne(
      { _id: 'google_auth' },
      {
        $set: {
          accessToken,
          email,
          name,
          calendarId,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to save Google Auth config' });
  }
});

app.get('/api/admin/google-auth', async (req, res) => {
  try {
    const database = await getDb();
    const config = await database.collection('admin_config').findOne({ _id: 'google_auth' });
    if (!config) {
      return res.json({ connected: false });
    }
    const isExpired = (new Date().getTime() - new Date(config.updatedAt).getTime()) > 12 * 60 * 60 * 1000;
    res.json({
      connected: true,
      accessToken: config.accessToken,
      email: config.email,
      name: config.name,
      calendarId: config.calendarId,
      isExpired
    });
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to fetch Google Auth config' });
  }
});

app.delete('/api/admin/google-auth', async (req, res) => {
  try {
    const database = await getDb();
    await database.collection('admin_config').deleteOne({ _id: 'google_auth' });
    res.json({ success: true });
  } catch (error) {
    handleDbError(error);
    res.status(500).json({ error: 'Failed to delete config' });
  }
});

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;

