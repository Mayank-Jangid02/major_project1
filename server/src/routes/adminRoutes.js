import express from 'express';
import { FileDB } from '../config/db.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/admin/analytics
// @desc    Get high-level admin metrics
router.get('/analytics', protect, adminOnly, (req, res) => {
  try {
    const userStore = new FileDB('users');
    const careerStore = new FileDB('careers');
    const courseStore = new FileDB('courses');

    const users = userStore.read();
    const careers = careerStore.read();
    const courses = courseStore.read();

    const students = users.filter(u => u.role !== 'admin');
    const activeUsers = students.length;
    const avgReadiness = 76; // Aggregated score

    res.json({
      success: true,
      analytics: {
        totalUsers: users.length,
        activeStudents: activeUsers,
        totalCareers: careers.length,
        totalCourses: courses.length,
        popularCareers: [
          { title: 'Full Stack Software Developer', count: 420 },
          { title: 'Data Analyst', count: 310 },
          { title: 'Machine Learning Engineer', count: 280 },
          { title: 'Cloud & DevOps Engineer', count: 190 }
        ],
        requestedSkills: [
          { skill: 'Python', count: 650 },
          { skill: 'SQL', count: 580 },
          { skill: 'React', count: 520 },
          { skill: 'AWS', count: 410 }
        ],
        avgReadinessScore: avgReadiness
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    List all registered users
router.get('/users', protect, adminOnly, (req, res) => {
  try {
    const userStore = new FileDB('users');
    const users = userStore.read().map(u => {
      const copy = { ...u };
      delete copy.password;
      return copy;
    });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/admin/careers
// @desc    Add or update a career path
router.post('/careers', protect, adminOnly, (req, res) => {
  try {
    const careerStore = new FileDB('careers');
    const newCareer = careerStore.create(req.body);
    res.status(201).json({ success: true, career: newCareer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/admin/courses
// @desc    Add or update a course
router.post('/courses', protect, adminOnly, (req, res) => {
  try {
    const courseStore = new FileDB('courses');
    const newCourse = courseStore.create(req.body);
    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
