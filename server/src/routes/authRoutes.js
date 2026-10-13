import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/jwt.js';
import { FileDB } from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new student with education profile
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, degree, branch, year, college, gradYear } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const userStore = new FileDB('users');
    const existing = userStore.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userStore.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'student',
      education: {
        degree: degree || 'B.Tech',
        branch: branch || 'Computer Science',
        year: year || '1st Year',
        college: college || 'University Campus',
        gradYear: gradYear || '2026',
        cgpa: 7.5
      },
      skills: [],
      interests: [],
      careerGoals: {},
      assessmentResults: { score: 60, completedAt: null },
      progress: {
        completedCourses: [],
        completedSkills: [],
        streakDays: 1,
        hoursSpent: 0,
        monthlyProgress: [{ month: 'Current', score: 60 }]
      },
      projects: [],
      certifications: [],
      resumeLink: ''
    });

    const token = generateToken(newUser._id, newUser.role);
    const userWithoutPass = { ...newUser };
    delete userWithoutPass.password;

    res.status(201).json({
      success: true,
      token,
      user: userWithoutPass,
      message: 'Account registered successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login student or admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter email and password.' });
    }

    const userStore = new FileDB('users');
    const user = userStore.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id, user.role);
    const userWithoutPass = { ...user };
    delete userWithoutPass.password;

    res.json({
      success: true,
      token,
      user: userWithoutPass,
      message: 'Logged in successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Mock password reset token generator
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide email' });
  }
  res.json({
    success: true,
    message: `Password reset instructions have been sent to ${email}. Check your inbox.`
  });
});

// @route   GET /api/auth/me
// @desc    Get current authenticated user profile
router.get('/me', protect, (req, res) => {
  const userWithoutPass = { ...req.user };
  delete userWithoutPass.password;
  res.json({ success: true, user: userWithoutPass });
});

export default router;
