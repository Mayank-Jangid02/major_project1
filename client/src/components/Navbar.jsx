import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Compass, Menu, X, ArrowRight, UserCheck, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              CareerPath <span className="text-gradient">AI</span>
            </span>
            <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Data-Driven Career Advisor
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a>
          <Link to="/app/careers" className="hover:text-indigo-400 transition-colors">Career Paths</Link>
          <Link to="/app/job-market" className="hover:text-indigo-400 transition-colors">Job Market</Link>
          <Link to="/app/courses" className="hover:text-indigo-400 transition-colors">Courses</Link>
          <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
        </div>

        {/* User CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/app/dashboard"
                className="px-4 py-2 rounded-xl bg-gradient-primary hover:bg-gradient-hover text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                Student Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-3.5 py-2 rounded-xl border border-white/10 hover:border-red-500/40 hover:text-red-400 text-slate-300 text-xs font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/auth?mode=login"
                className="px-4 py-2 rounded-xl border border-white/15 hover:border-indigo-500/50 text-slate-200 hover:text-white text-sm font-semibold transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/auth?mode=signup"
                className="px-4 py-2 rounded-xl bg-gradient-primary hover:bg-gradient-hover text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-3 pb-2 text-sm font-medium text-slate-300">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-indigo-400">Home</Link>
          <Link to="/app/careers" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-indigo-400">Career Paths</Link>
          <Link to="/app/job-market" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-indigo-400">Job Market Insights</Link>
          <Link to="/app/courses" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-indigo-400">Courses</Link>
          {user ? (
            <Link
              to="/app/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-4 rounded-xl bg-gradient-primary text-white font-semibold text-center mt-2"
            >
              Open Dashboard
            </Link>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/auth?mode=login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-center rounded-xl border border-white/10 text-slate-200 font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/auth?mode=signup"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-center rounded-xl bg-gradient-primary text-white font-semibold"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
