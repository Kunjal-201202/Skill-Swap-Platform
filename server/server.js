require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes'); // ✅ Import first

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api', userRoutes); // ✅ Then use
console.log("MONGO_URI:", process.env.MONGO_URI);



mongoose.connect(process.env.MONGO_URI)
  
  .then(() => app.listen(5000, () => console.log('🚀 Server running on port 5000')))
  .catch(err => console.error('❌ MongoDB connection error:', err));
