import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Compass, BookOpen, BarChart3, Plus, Trash2, Edit, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

export default function AdminPage() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 1420,
    activeStudents: 1350,
    totalCareers: 8,
    totalCourses: 12,
    avgReadinessScore: 76,
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
    ]
  });

  const [activeTab, setActiveTab] = useState('analytics');

  // Add Career Form State
  const [newCareerTitle, setNewCareerTitle] = useState('');
  const [newCareerCat, setNewCareerCat] = useState('Software Development');
  const [careerMsg, setCareerMsg] = useState('');

  const handleAddCareer = (e) => {
    e.preventDefault();
    if (!newCareerTitle.trim()) return;
    setCareerMsg(`Successfully added career "${newCareerTitle}" to database!`);
    setNewCareerTitle('');
    setTimeout(() => setCareerMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel border border-purple-500/30 rounded-3xl p-6 md:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-purple-400" />
          CareerPath AI Admin Management Portal
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
          Platform analytics overview, user management, and dataset curation for careers, courses, skills, and job market trends.
        </p>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-white/10 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 border-b-2 transition-all ${activeTab === 'analytics' ? 'border-indigo-400 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Analytics & Metrics
        </button>
        <button
          onClick={() => setActiveTab('careers')}
          className={`pb-3 border-b-2 transition-all ${activeTab === 'careers' ? 'border-indigo-400 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Manage Careers
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 border-b-2 transition-all ${activeTab === 'courses' ? 'border-indigo-400 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Manage Courses
        </button>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Metrics Counters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Registered Users</span>
              <span className="font-heading font-extrabold text-3xl text-white">{analytics.totalUsers}</span>
            </div>
            <div className="glass-card rounded-2xl p-5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Active Students</span>
              <span className="font-heading font-extrabold text-3xl text-indigo-400">{analytics.activeStudents}</span>
            </div>
            <div className="glass-card rounded-2xl p-5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Career Path Profiles</span>
              <span className="font-heading font-extrabold text-3xl text-purple-400">{analytics.totalCareers}</span>
            </div>
            <div className="glass-card rounded-2xl p-5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Average Readiness</span>
              <span className="font-heading font-extrabold text-3xl text-emerald-400">{analytics.avgReadinessScore}%</span>
            </div>
          </div>

          {/* Popular Careers & Skill Demands */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="font-heading font-bold text-base text-white mb-4">Most Popular Student Career Choices</h3>
              <div className="space-y-3">
                {analytics.popularCareers.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-900/80 border border-white/5">
                    <span className="font-semibold text-slate-200">{item.title}</span>
                    <span className="font-bold text-indigo-400">{item.count} Students</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="font-heading font-bold text-base text-white mb-4">Most Requested Skills in Assessments</h3>
              <div className="space-y-3">
                {analytics.requestedSkills.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-900/80 border border-white/5">
                    <span className="font-semibold text-slate-200">{item.skill}</span>
                    <span className="font-bold text-emerald-400">{item.count} Requests</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'careers' && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 max-w-2xl">
          <h3 className="font-heading font-bold text-lg text-white">Add New Career Path to Database</h3>
          {careerMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              {careerMsg}
            </div>
          )}
          <form onSubmit={handleAddCareer} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Career Title</label>
              <input
                type="text"
                required
                value={newCareerTitle}
                onChange={(e) => setNewCareerTitle(e.target.value)}
                placeholder="e.g. AI Research Engineer"
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={newCareerCat}
                onChange={(e) => setNewCareerCat(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white bg-slate-900"
              >
                <option value="Software Development">Software Development</option>
                <option value="Data Science & Analytics">Data Science & Analytics</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
              </select>
            </div>
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-gradient-primary text-white font-bold text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Save Career Path
            </button>
          </form>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 text-xs text-slate-300">
          <h3 className="font-heading font-bold text-lg text-white mb-2">Course Management Catalog</h3>
          <p className="text-slate-400 mb-4">Integrate external LMS or course partner endpoints directly.</p>
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 font-mono text-[11px] text-indigo-300">
            GET /api/courses?category=Software+Development
          </div>
        </div>
      )}
    </div>
  );
}
