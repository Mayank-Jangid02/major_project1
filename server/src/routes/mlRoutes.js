import express from 'express';
import axios from 'axios';
import { calculateCareerMatch, calculateSkillGapMatrix, calculatePlacementReadiness } from '../services/mlEngine.js';

const router = express.Router();
const ML_FASTAPI_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

// @route   POST /api/ml/career-recommendation
router.post('/career-recommendation', async (req, res) => {
  try {
    const { user, careers } = req.body;
    try {
      const response = await axios.post(`${ML_FASTAPI_URL}/api/ml/career-recommendation`, { user, careers }, { timeout: 1500 });
      return res.json(response.data);
    } catch (err) {
      // Fallback to JS ML Engine
      const recs = careers.map(c => {
        const m = calculateCareerMatch(user, c);
        return {
          careerId: c.id || c._id,
          title: c.title,
          matchScore: m.matchScore,
          whyMatches: m.whyMatches,
          demand: c.demand || 'High'
        };
      }).sort((a, b) => b.matchScore - a.matchScore);

      return res.json({ status: 'success', recommendations: recs, engine: 'JavaScript Fallback ML Engine' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// @route   POST /api/ml/skill-gap
router.post('/skill-gap', async (req, res) => {
  try {
    const { user, targetCareer } = req.body;
    try {
      const response = await axios.post(`${ML_FASTAPI_URL}/api/ml/skill-gap`, { user, targetCareer }, { timeout: 1500 });
      return res.json(response.data);
    } catch (err) {
      const gaps = calculateSkillGapMatrix(user, targetCareer);
      return res.json({ status: 'success', skillGaps: gaps, engine: 'JavaScript Fallback ML Engine' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// @route   POST /api/ml/readiness-score
router.post('/readiness-score', (req, res) => {
  try {
    const readiness = calculatePlacementReadiness(req.body.user || {});
    res.json({ status: 'success', ...readiness });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
