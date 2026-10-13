import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Compass, 
  Target, 
  BookOpen, 
  BarChart3, 
  Award, 
  Map, 
  HelpCircle, 
  TrendingUp, 
  Bot, 
  ShieldCheck,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/app/profile', icon: User },
    { label: 'Career Recommendations', path: '/app/careers', icon: Compass },
    { label: 'Skill Gap Analysis', path: '/app/skill-gap', icon: Target },
    { label: 'Recommended Courses', path: '/app/courses', icon: BookOpen },
    { label: 'Job Market Insights', path: '/app/job-market', icon: BarChart3 },
    { label: 'Placement Readiness', path: '/app/readiness', icon: Award },
    { label: 'Career Roadmap', path: '/app/roadmap', icon: Map },
    { label: 'Assessments', path: '/app/assessment', icon: HelpCircle },
    { label: 'Progress Tracking', path: '/app/progress', icon: TrendingUp },
    { label: 'AI Assistant', path: '/app/ai-assistant', icon: Bot },
  ];

  if (user?.role === 'admin') {
    navItems.push({ label: 'Admin Dashboard', path: '/app/admin', icon: ShieldCheck });
  }

  const handleLinkClick = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <aside className={`
      fixed top-0 bottom-0 left-0 z-40 w-64 glass-panel border-r border-white/10 flex flex-col pt-4 pb-6 px-3.5 transition-transform duration-300
      ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Sidebar Header Brand */}
      <div className="px-3 py-3 mb-4 flex items-center justify-between border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-lg text-white tracking-tight">
              CareerPath <span className="text-gradient">AI</span>
            </span>
            <span className="block text-[9px] uppercase font-semibold text-slate-400">Student Workspace</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) => `
                flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group
                ${isActive 
                  ? 'bg-gradient-primary text-white shadow-lg shadow-indigo-500/25 font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}
              `}
            >
              <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate">{item.label}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          );
        })}
      </div>

      {/* User Quick Info & Logout Footer */}
      <div className="pt-4 border-t border-white/10 mt-2 px-1">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30 shrink-0">
              {user?.name ? user.name[0].toUpperCase() : 'S'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'Student'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.education?.degree || 'College Student'}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => { logout(); navigate('/'); }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
