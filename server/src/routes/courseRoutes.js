import express from 'express';
import { FileDB } from '../config/db.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Get course recommendations filtered by category, level, priceType
router.get('/', (req, res) => {
  try {
    const { category, level, priceType, search } = req.query;
    const courseStore = new FileDB('courses');
    let courses = courseStore.read();

    if (category && category !== 'All') {
      courses = courses.filter(c => c.careerCategory?.toLowerCase().includes(category.toLowerCase()));
    }
    if (level && level !== 'All') {
      courses = courses.filter(c => c.level === level);
    }
    if (priceType && priceType !== 'All') {
      courses = courses.filter(c => c.priceType === priceType);
    }
    if (search) {
      const q = search.toLowerCase();
      courses = courses.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.skills.some(s => s.toLowerCase().includes(q)) ||
        c.platform.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
