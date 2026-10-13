import express from 'express';
import { FileDB } from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';
import { calculateCareerMatch, calculateSkillGapMatrix } from '../services/mlEngine.js';

const router = express.Router();

// @route   GET /api/careers
// @desc    Get all available career paths
router.get('/', (req, res) => {
  try {
    const careerStore = new FileDB('careers');
    const careers = careerStore.read();
    res.json({ success: true, careers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/careers/recommendations
// @desc    Calculate personalized career match scores for authenticated user
router.get('/recommendations', protect, (req, res) => {
  try {
    const careerStore = new FileDB('careers');
    const allCareers = careerStore.read();

    const recommendations = allCareers.map(career => {
      const matchResult = calculateCareerMatch(req.user, career);
      const skillGaps = calculateSkillGapMatrix(req.user, career);

      return {
        ...career,
        matchScore: matchResult.matchScore,
        whyMatches: matchResult.whyMatches,
        skillScore: matchResult.skillScore,
        interestMatch: matchResult.interestMatch,
        academicFit: matchResult.academicFit,
        skillGaps: skillGaps
      };
    });

    // Sort by highest match percentage first
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      topCareerMatchScore: recommendations.length > 0 ? recommendations[0].matchScore : 82,
      recommendations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/careers/:id
// @desc    Get details & gap analysis for a specific career
router.get('/:id', protect, (req, res) => {
  try {
    const careerStore = new FileDB('careers');
    const career = careerStore.findById(req.params.id) || careerStore.findOne({ id: req.params.id });

    if (!career) {
      return res.status(404).json({ success: false, message: 'Career path not found' });
    }

    const matchResult = calculateCareerMatch(req.user, career);
    const skillGaps = calculateSkillGapMatrix(req.user, career);

    res.json({
      success: true,
      career: {
        ...career,
        matchScore: matchResult.matchScore,
        whyMatches: matchResult.whyMatches,
        skillGaps
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
