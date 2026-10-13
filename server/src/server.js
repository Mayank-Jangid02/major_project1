import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { runSeed } from './seed/seedData.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import jobMarketRoutes from './routes/jobMarketRoutes.js';
import mlRoutes from './routes/mlRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/jobmarket', jobMarketRoutes);
app.use('/api/ml', mlRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'CareerPath AI Server',
    timestamp: new Date().toISOString()
  });
});

// Start Server and Seed Database
const start = async () => {
  await connectDB();
  await runSeed();

  app.listen(PORT, () => {
    console.log(`🚀 CareerPath AI Server running on http://localhost:${PORT}`);
  });
};

start();
