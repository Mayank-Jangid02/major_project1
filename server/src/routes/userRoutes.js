import express from 'express';
import { FileDB } from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';
import { calculatePlacementReadiness } from '../services/mlEngine.js';

const router = express.Router();

// @route   PUT /api/user/onboarding
// @desc    Complete or update multi-step onboarding
router.post('/onboarding', protect, (req, res) => {
  try {
    const { education, skills, interests, careerGoals, assessmentResults } = req.body;
    const userStore = new FileDB('users');

    const updateObj = {};
    if (education) updateObj.education = { ...req.user.education, ...education };
    if (skills) updateObj.skills = skills;
    if (interests) updateObj.interests = interests;
    if (careerGoals) updateObj.careerGoals = careerGoals;
    if (assessmentResults) updateObj.assessmentResults = assessmentResults;

    const updatedUser = userStore.findByIdAndUpdate(req.user._id, updateObj);
    const userWithoutPass = { ...updatedUser };
    delete userWithoutPass.password;

    res.json({
      success: true,
      user: userWithoutPass,
      message: 'Student profile onboarding saved successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/user/profile
// @desc    Update editable student profile
router.put('/profile', protect, (req, res) => {
  try {
    const { name, education, skills, interests, careerGoals, projects, certifications, resumeLink, profilePhoto } = req.body;
    const userStore = new FileDB('users');

    const updateObj = {};
    if (name) updateObj.name = name;
    if (education) updateObj.education = education;
    if (skills) updateObj.skills = skills;
    if (interests) updateObj.interests = interests;
    if (careerGoals) updateObj.careerGoals = careerGoals;
    if (projects) updateObj.projects = projects;
    if (certifications) updateObj.certifications = certifications;
    if (resumeLink !== undefined) updateObj.resumeLink = resumeLink;
    if (profilePhoto !== undefined) updateObj.profilePhoto = profilePhoto;

    const updatedUser = userStore.findByIdAndUpdate(req.user._id, updateObj);
    const userWithoutPass = { ...updatedUser };
    delete userWithoutPass.password;

    res.json({
      success: true,
      user: userWithoutPass,
      message: 'Profile updated successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/user/assessment
// @desc    Submit career/aptitude assessment answers & calculate score
router.post('/assessment', protect, (req, res) => {
  try {
    const { answers, totalQuestions } = req.body;
    const assessmentStore = new FileDB('assessments');
    const quiz = assessmentStore.read()[0];

    let correctCount = 0;
    if (quiz && quiz.questions && answers) {
      quiz.questions.forEach((q, idx) => {
        if (answers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
    }

    const calculatedScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 75;

    const userStore = new FileDB('users');
    const assessmentResults = {
      score: calculatedScore,
      correctAnswers: correctCount,
      totalQuestions: totalQuestions || 8,
      completedAt: new Date().toISOString()
    };

    const updatedUser = userStore.findByIdAndUpdate(req.user._id, { assessmentResults });
    const userWithoutPass = { ...updatedUser };
    delete userWithoutPass.password;

    res.json({
      success: true,
      score: calculatedScore,
      assessmentResults,
      user: userWithoutPass,
      message: `Assessment completed! You scored ${calculatedScore}%.`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/user/readiness
// @desc    Calculate and fetch placement readiness metrics
router.get('/readiness', protect, (req, res) => {
  try {
    const readinessData = calculatePlacementReadiness(req.user);
    res.json({
      success: true,
      ...readinessData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
