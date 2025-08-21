const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
app.use(cors());
app.use(express.json());

// DB
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB error', err));

// Quick health check
app.get('/', (req,res) => res.send('API OK'));

// CREATE
app.post('/api/students', async (req, res) => {
  try {
    const saved = await Student.create(req.body);
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// READ
app.get('/api/students', async (req, res) => {
  const all = await Student.find().sort({ createdAt: -1 });
  res.json(all);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
