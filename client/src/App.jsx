import React, { useState } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import CareerRecPage from './pages/CareerRecPage';
import SkillGapPage from './pages/SkillGapPage';
import CourseRecPage from './pages/CourseRecPage';
import JobMarketPage from './pages/JobMarketPage';
import ReadinessPage from './pages/ReadinessPage';
import RoadmapPage from './pages/RoadmapPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import { Menu, X, Sparkles, Bell, User } from 'lucide-react';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }
  return children;
};

// Application Workspace Shell (with Sidebar)
const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex font-sans">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Workspace Top Header Bar */}
        <header className="sticky top-0 z-20 glass-panel border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-heading font-bold text-sm text-slate-300 hidden sm:inline">
              Student Workspace Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/app/profile"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/40 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                {user?.name ? user.name[0].toUpperCase() : 'S'}
              </div>
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline">
                {user?.name || 'Alex'}
              </span>
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="careers" element={<CareerRecPage />} />
            <Route path="skill-gap" element={<SkillGapPage />} />
            <Route path="courses" element={<CourseRecPage />} />
            <Route path="job-market" element={<JobMarketPage />} />
            <Route path="readiness" element={<ReadinessPage />} />
            <Route path="roadmap" element={<RoadmapPage />} />
            <Route path="assessment" element={<OnboardingPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="ai-assistant" element={<DashboardPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/app/*" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
