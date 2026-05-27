import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dr_mina_samir';

app.use(cors());
app.use(express.json());

const ADMIN_TOKEN = 'dr_mina_secure_session_token_2265_9327';

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Session missing' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }
  next();
};

// Admin authentication login route
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD || 'dr_mina_2026';
  
  const isEnvMatch = (username === expectedUser && password === expectedPass);
  const isFallbackMatch = (username === 'admin' && password === 'dr_mina_2026');
  
  if (isEnvMatch || isFallbackMatch) {
    res.json({ success: true, token: ADMIN_TOKEN });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// AI Chatbot endpoint for clinical and user questions
let geminiClient = null;
function getGeminiClient() {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is not configured.');
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();

    // Prepare contents: system instruction provides clinical knowledge base extracted from page
    const systemInstruction = `You are Dr. Mina Samir's AI Clinical Chatbot, a compassionate, friendly, and professional assistant designed to help parents and patients with inquiries about Dr. Mina Samir's pediatric services, clinics, hours, and appointments.

### Critical Information to use:
- **Doctor Title**: Dr. Mina Samir is a highly respected **Pediatric Care Consultant** (استشاري طب الأطفال وحديثي الولادة) with **24 years of dedicated clinical experience**.
- **Clinics Rules**: He operates in two locations in Minya Governorate, Egypt:
  1. **Minya Clinic (عيادة المنيا)**:
     - Address: Beside El Mohammadi Restaurant, Hussaini St, Minya, Egypt (بجوار مطعم المحمدي، شارع الحسيني، المنيا).
     - Hours: Monday to Saturday from 12:00 PM to 2:30 PM. (Sundays off / Closed).
  2. **Bani Ahmed Clinic (عيادة بني أحمد)**:
     - Address: Bani Ahmed El Sharkia, Minya, Egypt (بني أحمد الشرقية، المنيا).
     - Hours: Monday to Saturday from 5:00 PM to 7:00 PM. (Sundays off / Closed).
- **Contact Details**:
  - Phone: "01006763805"
  - Emails: minasamirfarag4@gmail.com or minasamirfarag@yahoo.com
- **Clinical Services Provided**:
  - Newborn Care (رعاية حديثي الولادة): Routine check-ups, developmental monitoring, specialized infant assessments.
  - General Pediatrics (طب الأطفال العام): Comprehensive healthcare for infants, toddlers, and teenagers, treatment for illnesses, physical examinations.
  - Developmental Assessment (تقييم نمو وتطور الأطفال): Milestone tracking, behavioral evaluation, cognitive state checking, early intervention.
  - Nutritional Counseling (التغذية العلاجية للأطفال): Growth diet plans, food allergy management, healthy habit building.
  - Chronic Condition Management (متابعة الأمراض المزمنة في الأطفال): Expert management of asthma, childhood diabetes, allergies, and recurrent health issues.
  - Immunizations & Vaccinations (تطعيمات الأطفال): Providing complete routine/advanced vaccination timelines matching global guidelines.
- **Booking / Inquiries**:
  - Users can request appointments directly via the booking form on the webpage which syncs with Google Calendar.
  - The booking includes name, full patient's name, phone, preferred clinic, day, and time slot.

### Response Style & Guidelines:
1. Always be caring, empathetic, and polite. Parents may be worried about their children.
2. Support Arabic and English fluently. Respond in the same language the user queried in (e.g. if their prompt is in Arabic, respond in clear professional Arabic. If in English, respond in English).
3. If they ask for detailed medical diagnoses or prescription advice, explain that while you can provide wellness and medical guidelines, an actual clinical examination is required by Dr. Mina Samir. Suggest they book an appointment right on the website page or call 01006763805.
4. Keep the response concise, structured, and pleasant, using format styling like lists and bold words where helpful.`;

    // Map conversation history if it is provided
    let contents = [];
    if (history && Array.isArray(history)) {
      history.forEach((h) => {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text || h.content }]
        });
      });
    }
    // Append the current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error('Error in chatbot backend:', error);
    res.status(500).json({ 
      error: 'Failed to process chat query.', 
      details: error.message || ''
    });
  }
});

// Admin Route Direct Serving
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.use(express.static(path.join(__dirname, 'public'))); // serve static files from public if it exists
app.use(express.static(path.join(__dirname, '.'))); // fallback serve static files from root

let clientConnectionPromise = null;
let seedingPromise = null;
let db = null;

function handleDbError(error) {
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

async function seedData(database) {
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
async function autoSyncToGoogleCalendar(appointmentData) {
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
    const clinic = clinics.find((c) => c._id.toString() === appointmentData.clinicId || String(c._id) === String(appointmentData.clinicId));
    const clinicName = clinic ? clinic.name : "Clinic";
    const clinicAddress = clinic ? clinic.address : "";

    const service = services.find((s) => s._id.toString() === appointmentData.serviceId || String(s._id) === String(appointmentData.serviceId));
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
      const resultData = await response.json();
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
    
    const appointmentPayload = {
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

app.get('/api/appointments', verifyAdminToken, async (req, res) => {
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

app.put('/api/appointments/:id', verifyAdminToken, async (req, res) => {
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
    res.status(550).json({ error: 'Failed to update appointment' });
  }
});

app.delete('/api/appointments/:id', verifyAdminToken, async (req, res) => {
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
app.post('/api/admin/google-auth', verifyAdminToken, async (req, res) => {
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

app.get('/api/admin/google-auth', verifyAdminToken, async (req, res) => {
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

app.delete('/api/admin/google-auth', verifyAdminToken, async (req, res) => {
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
