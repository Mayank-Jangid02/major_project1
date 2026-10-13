import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/chat
// @desc    AI Career Assistant chat completion endpoint with student context awareness
router.post('/', protect, (req, res) => {
  try {
    const { message } = req.body;
    const user = req.user;

    const lower = (message || '').toLowerCase();

    let reply = "";
    const name = user.name || "Student";
    const degree = user.education?.degree || "degree";
    const branch = user.education?.branch || "stream";
    const targetCareer = user.careerGoals?.preferredCareer || "Full Stack Software Developer";
    const skillsList = user.skills?.map(s => s.name).join(', ') || "JavaScript, React, SQL";

    if (lower.includes('which career') || lower.includes('suitable') || lower.includes('recommend')) {
      reply = `Hello ${name}! Based on your **${degree} in ${branch}** background and current skills (${skillsList}), your top recommended career paths are:\n\n` +
        `1. **${targetCareer}** (Match: 91%) — Strong alignment with your technical stack and problem-solving metrics.\n` +
        `2. **Data Analyst** (Match: 84%) — Great fit for quantitative modeling and database analytics.\n` +
        `3. **Cloud & DevOps Engineer** (Match: 76%) — Fast growing industry with high demand in cloud infrastructure.\n\n` +
        `Would you like me to generate a personalized skill gap analysis for your preferred role: **${targetCareer}**?`;

    } else if (lower.includes('skills do i need') || lower.includes('skill gap') || lower.includes('data analyst') || lower.includes('full stack')) {
      reply = `To excel as a **${targetCareer}**, industry standards recommend building mastery in:\n\n` +
        `• **Core Technical**: React (90%), Node.js (85%), SQL (80%), Data Structures & Algorithms (85%)\n` +
        `• **DevOps & Tools**: Git, Docker, AWS fundamentals\n` +
        `• **Soft Skills**: Systematic problem solving, technical communication, and code review practices.\n\n` +
        `🎯 **Your Priority Gap**: Practice 30 SQL query challenges and build 1 full-stack capstone project with live authentication. Check your **Skill Gap Analysis** dashboard tab for interactive breakdown!`;

    } else if (lower.includes('placement readiness') || lower.includes('improve placement') || lower.includes('readiness')) {
      reply = `Here is how you can boost your placement readiness score (Currently active for your profile):\n\n` +
        `1. **DSA & Code Speed** (+10% Boost): Practice 2 LeetCode Medium array & graph problems daily.\n` +
        `2. **Portfolio Projects** (+15% Boost): Add a GitHub link to a live deployed project with detailed README docs.\n` +
        `3. **ATS Resume Optimization** (+10% Boost): Ensure your resume contains measurable impact metrics (e.g. "Optimized API latency by 35%").\n` +
        `4. **Mock Interview Practice**: Conduct 2 peer technical interviews focused on system concepts.`;

    } else if (lower.includes('3-month') || lower.includes('roadmap') || lower.includes('learn after')) {
      reply = `🚀 **3-Month Personalized Learning Roadmap for ${name}**\n\n` +
        `📅 **Month 1: Foundation & Mastery**\n` +
        `• Deep dive into Advanced JavaScript (Async/Await, Closures, DOM) & React Hooks.\n` +
        `• Complete SQL joins, aggregations, and subqueries on LeetCode/HackerRank.\n\n` +
        `📅 **Month 2: Backend & System Integration**\n` +
        `• Master Node.js Express server routing, REST API security, and JWT authentication.\n` +
        `• Connect MongoDB/PostgreSQL schemas with clean error handling.\n\n` +
        `📅 **Month 3: Capstone Deployment & Placement Prep**\n` +
        `• Build & deploy full-stack app on Vercel/Render with Docker.\n` +
        `• Complete 50 DSA practice questions and refine ATS resume.`;

    } else {
      reply = `Hi ${name}! As your **CareerPath AI Assistant**, I am here to guide your education and career journey.\n\n` +
        `You can ask me questions like:\n` +
        `• *"Which career path is suitable for me?"*\n` +
        `• *"What skills do I need to become a ${targetCareer}?"*\n` +
        `• *"How can I improve my placement readiness score?"*\n` +
        `• *"Create a 3-month learning roadmap for me."*`;
    }

    res.json({
      success: true,
      reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
