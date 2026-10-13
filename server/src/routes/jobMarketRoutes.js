import express from 'express';
import { FileDB } from '../config/db.js';

const router = express.Router();

// @route   GET /api/jobmarket
// @desc    Get job market analytics data
router.get('/', (req, res) => {
  try {
    const jobStore = new FileDB('jobmarket');
    const data = jobStore.read()[0] || {};
    res.json({
      success: true,
      data,
      isDemoData: true,
      lastUpdated: 'Live Demo Sync'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
