# 🎓 CareerPath AI — One-Stop Personalized Career & Education Advisor

**CareerPath AI** is an intelligent, data-driven career guidance platform powered by Data Analytics, Vector Similarity, and Machine Learning microservices. Designed for college students, recent graduates, and job seekers, it helps students discover suitable career paths, analyze skill gaps, follow personalized learning roadmaps, evaluate placement readiness, and converse with an AI career advisor.

---

## 🌟 Key Features

1. **Visually Impressive Modern Landing Page**
   - Hero section with gradient aesthetics, interactive statistics, and student career dashboard preview.
   - Comprehensive sections: How It Works, Features, Testimonials, FAQ accordion, CTA, and Footer.

2. **Authentication & Student Profiling**
   - Sign Up, Login, Forgot Password, Logout, and JWT protected routes.
   - Captures education profile: Degree level, Branch/stream, College, CGPA, and Graduation year.

3. **Multi-Step Student Onboarding & Aptitude Assessment**
   - 5-step wizard covering Education, Skills & Proficiency, Interests, Career Goals, and a 4-question Diagnostic Aptitude Quiz.

4. **Personalized Dashboard**
   - Profile summary, Career Match Score (e.g., **82%**), Top Career Match cards with match percentages.
   - Interactive Radar & Bar charts comparing Current vs. Required skill levels.
   - Skill Gap matrix with priority ratings (High, Medium, Low).
   - Placement Readiness Index (e.g., **74%**) broken down into 6 core factors.

5. **Career Recommendation Module**
   - Vector similarity model ranking career paths (Full Stack Developer 91%, Data Analyst 84%, ML Engineer 76%, Cloud Engineer 71%).
   - Detailed breakdown containing match reasoning, required skills, average salary range, and job demand.

6. **Interactive Skill Gap Matrix**
   - Deep comparison of student skills vs. industry standards.
   - Priority-tagged actionable learning steps (e.g., *Improve Python → Complete Python fundamentals → Practice 50 coding problems → Build 2 Python projects*).

7. **Course Recommendation System**
   - Filterable catalog by level (Beginner/Intermediate/Advanced), pricing (Free/Paid), and duration.
   - Direct course enrollment links for Coursera, Udemy, edX, YouTube, etc.

8. **Job Market Analytics**
   - Interactive Recharts visualizing top in-demand skills, salary curves by experience, location demand tables, and industry sector shares.

9. **Placement Readiness Evaluation**
   - Weighted score formula: Technical Skills (30%), DSA & Aptitude (20%), Projects (15%), Resume (10%), Communication (10%), Interview Prep (15%).
   - Highlights verified strengths, areas to improve, and placement action plans.

10. **CareerPath AI Assistant Chatbot**
    - Profile-aware floating AI Chatbot answering questions in context of student's target career, skill gaps, and learning roadmap.

11. **Visual Step-Connected Career Roadmap**
    - Stage 1 to Stage 5 node-connected roadmap timeline from fundamentals to production capstones and placement.

12. **Progress Tracking & Admin Management Portal**
    - Monthly progress curves, streak counters, learning hours, milestone achievements.
    - Admin portal to monitor users, popular careers, requested skills, and add new career/course entries.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide React, Axios, Canvas Confetti.
- **Backend API**: Node.js, Express.js, JWT Authentication, bcryptjs, MongoDB / Mongoose (with automated fallback to JSON File Storage).
- **ML Microservice**: Python 3.14, FastAPI, Pandas, NumPy, Scikit-Learn.

---

## 📂 Project Folder Structure

```
major_project_1/
├── client/                     # React Vite Frontend Application
│   ├── src/
│   │   ├── components/         # Navbar, Sidebar, Footer, AIChatModal
│   │   ├── pages/              # LandingPage, AuthPage, OnboardingPage, DashboardPage, etc.
│   │   ├── context/            # AuthContext.jsx
│   │   ├── services/           # api.js (Axios API client)
│   │   ├── App.jsx             # React Router Configuration
│   │   ├── index.css           # Custom Glassmorphism & Gradient Design System
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
├── server/                     # Express Node Backend API Server
│   ├── src/
│   │   ├── config/             # db.js (MongoDB + FileDB Driver), jwt.js
│   │   ├── routes/             # authRoutes, userRoutes, careerRoutes, courseRoutes, etc.
│   │   ├── services/           # mlEngine.js (JS Vector Similarity & Scoring Engine)
│   │   ├── seed/               # seedData.js (Populates realistic database entries)
│   │   └── server.js
│   └── package.json
├── ml_service/                 # Python FastAPI Machine Learning Service
│   ├── main.py                 # REST endpoints for ML inference
│   └── requirements.txt
└── README.md
```

---

## 🚀 Quick Setup & Running Instructions

### 1. Run Backend Express API Server

```bash
cd server
npm install
npm run seed     # Seed database with careers, courses, job market, and demo users
npm run dev      # Starts server on http://localhost:5000
```

### 2. Run React Vite Frontend

```bash
cd client
npm install
npm run dev      # Starts frontend on http://localhost:5173
```

### 3. Run Python FastAPI ML Service (Optional Microservice)

```bash
cd ml_service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## 🔑 Demo Account Credentials

- **Student User**: `student@example.com` / `password123`
- **Admin User**: `admin@careerpath.ai` / `admin123`

---

## 🔌 API Endpoints Summary

- `POST /api/auth/register` — Register student account
- `POST /api/auth/login` — Sign in user
- `POST /api/user/onboarding` — Save 5-step onboarding data
- `GET /api/careers/recommendations` — Fetch personalized career match scores
- `GET /api/courses` — Filter courses by level, pricing, and category
- `GET /api/user/readiness` — Get placement readiness score breakdown
- `POST /api/chat` — AI Assistant chat completion
- `POST /api/ml/career-recommendation` — ML career recommendation endpoint
