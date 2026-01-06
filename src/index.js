const cors = require('cors');
// ==============================
// Configuración de entorno
// ==============================
require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { generateMasterPlan } = require('./services/gemini');

// ==============================
// Middlewares
// ==============================
app.use(express.json());

// ==============================
// Sequelize
// ==============================
const db = require('./models');
const {
  Profile,
  MasterPlan,
  DailyLog,
  Notification
} = db;

// ==============================
// Ruta base
// ==============================
app.get('/', (req, res) => {
  res.json({
    name: 'Eliana AI',
    description: 'Business Assistant Companion API',
    status: 'running'
  });
});

// ==============================
// Middlewares
// ==============================
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


// =====================================================
// PROFILES
// (extensión de auth.users)
// =====================================================

// CREATE profile (después de signup en Supabase)
app.post('/api/profiles', async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ all profiles
app.get('/api/profiles', async (req, res) => {
  const profiles = await Profile.findAll();
  res.json(profiles);
});

// READ profile by user_id
app.get('/api/profiles/:id', async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);

  if (!profile) {
    return res.status(404).json({ error: 'Perfil no encontrado' });
  }

  res.json(profile);
});

// UPDATE profile
app.patch('/api/profiles/:id', async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);

  if (!profile) {
    return res.status(404).json({ error: 'Perfil no encontrado' });
  }

  await profile.update(req.body);
  res.json(profile);
});

// DELETE profile
app.delete('/api/profiles/:id', async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);

  if (!profile) {
    return res.status(404).json({ error: 'Perfil no encontrado' });
  }

  await profile.destroy();
  res.json({ message: 'Perfil eliminado correctamente' });
});


// =====================================================
// MASTER PLANS
// (resultado del motor IA - Gemini)
// =====================================================

// CREATE master plan
app.post('/api/master-plans', async (req, res) => {
  try {
    const {
      userId,
      diagnosis,
      goal_90_days,
      roadmap,
      micro_habits,
      income_ideas,
      eliana_message
    } = req.body;

    // 🔒 validación manual (muy importante)
    if (
      !userId ||
      !diagnosis ||
      !goal_90_days ||
      !roadmap ||
      !micro_habits ||
      !income_ideas ||
      !eliana_message
    ) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios para crear el Plan Maestro'
      });
    }

    const plan = await MasterPlan.create({
      userId,
      diagnosis,
      goal_90_days,
      roadmap,
      micro_habits,
      income_ideas,
      eliana_message
    });

    res.status(201).json(plan);

  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message
    });
  }
});


// READ master plan por usuario
app.get('/api/master-plans/user/:userId', async (req, res) => {
  const plan = await MasterPlan.findOne({
    where: { userId: req.params.userId }
  });

  if (!plan) {
    return res.status(404).json({ error: 'Plan no encontrado' });
  }

  res.json(plan);
});

// UPDATE master plan
app.patch('/api/master-plans/:id', async (req, res) => {
  const plan = await MasterPlan.findByPk(req.params.id);

  if (!plan) {
    return res.status(404).json({ error: 'Plan no encontrado' });
  }

  await plan.update(req.body);
  res.json(plan);
});

// =====================================================
// GENERATE MASTERPLAN USING FREE GEMINI API KEY

app.post('/api/master-plans/generate/:userId', async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.userId);

    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    const planData = await generateMasterPlan(profile);

    const masterPlan = await MasterPlan.create({
      userId: profile.id, // 👈 este UUID
      ...planData
    });

    res.status(201).json(masterPlan);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando Plan Maestro' });
  }
});




// =====================================================
// DAILY LOGS
// (memoria diaria)
// =====================================================

// CREATE daily log
app.post('/api/daily-logs', async (req, res) => {
  const log = await DailyLog.create(req.body);
  res.status(201).json(log);
});

// READ logs por usuario
app.get('/api/daily-logs/user/:userId', async (req, res) => {
  const logs = await DailyLog.findAll({
    where: { userId: req.params.userId }
  });

  res.json(logs);
});

// UPDATE daily log
app.patch('/api/daily-logs/:id', async (req, res) => {
  const log = await DailyLog.findByPk(req.params.id);

  if (!log) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }

  await log.update(req.body);
  res.json(log);
});

// DELETE daily log
app.delete('/api/daily-logs/:id', async (req, res) => {
  const log = await DailyLog.findByPk(req.params.id);

  if (!log) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }

  await log.destroy();
  res.json({ message: 'Registro eliminado correctamente' });
});


// =====================================================
// NOTIFICATIONS
// =====================================================

// CREATE notification
app.post('/api/notifications', async (req, res) => {
  const notification = await Notification.create(req.body);
  res.status(201).json(notification);
});

// READ pending notifications por usuario
app.get('/api/notifications/user/:userId', async (req, res) => {
  const notifications = await Notification.findAll({
    where: {
      userId: req.params.userId,
      sent: false
    }
  });

  res.json(notifications);
});




// ==============================
// Iniciar servidor
// ==============================
app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conectado a PostgreSQL');
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Error DB:', error);
  }
});
