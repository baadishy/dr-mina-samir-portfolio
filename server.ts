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
app.use(express.static(path.join(__dirname, '.'))); // serve static files from root

let clientConnection: MongoClient | null = null;
let db: any = null;
let seeded = false;

async function getDb() {
  if (db) return db;
  try {
    if (!clientConnection) {
      clientConnection = new MongoClient(mongodbUri);
      await clientConnection.connect();
      console.log('Connected to MongoDB');
    }
    db = clientConnection.db();
    
    // Seed initial data if collections are empty (thread-safe and only calls once)
    if (!seeded) {
      await seedData(db);
    }
  } catch (error) {
    console.error('Failed to connect or seed MongoDB', error);
    throw error;
  }
  return db;
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
    seeded = true;
  } catch (err) {
    console.error('Error seeding data:', err);
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
    res.status(500).json({ error: 'Failed to fetch clinics' });
  }
});

// Appointments
app.post('/api/appointments', async (req, res) => {
  try {
    const database = await getDb();
    const { patientName, birthDate, phone, clinicId, serviceId, appointmentDay, appointmentTime } = req.body;
    const result = await database.collection('appointments').insertOne({
      patientName,
      birthDate,
      phone,
      clinicId,
      serviceId,
      appointmentDay,
      appointmentTime,
      status: 'pending',
      createdAt: new Date()
    });
    res.json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;

