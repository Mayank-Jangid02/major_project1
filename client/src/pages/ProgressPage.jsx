import React from 'react';
import { TrendingUp, BookOpen, Award, Flame, Clock, CheckCircle2, Star } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { useAuth } from '../context/AuthContext';

export default function ProgressPage() {
  const { user } = useAuth();

  const monthlyProgress = user?.progress?.monthlyProgress || [
    { month: 'Nov', score: 42 },
    { month: 'Dec', score: 58 },
    { month: 'Jan', score: 71 },
    { month: 'Feb', score: 78 }
  ];

  const milestones = [
    { title: 'Full Stack Web Fundamentals', date: 'Dec 12, 2025', badge: 'Verified' },
    { title: 'Aptitude Diagnostic 78% Score', date: 'Jan 15, 2026', badge: 'Top 15%' },
    { title: 'React 18 & Redux Mastery', date: 'Feb 02, 2026', badge: 'Completed' },
    { title: 'SQL Analytics & Database Certification', date: 'Feb 20, 2026', badge: 'In Progress' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-indigo-400" />
          Progress & Growth Metrics
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
          Historical tracking of your learning hours, assessment scores, completed skill milestones, and readiness progression.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Learning Streak</span>
            <span className="font-heading font-extrabold text-2xl text-white">{user?.progress?.streakDays || 14} Days</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Hours Spent</span>
            <span className="font-heading font-extrabold text-2xl text-white">{user?.progress?.hoursSpent || 48} Hours</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Courses</span>
            <span className="font-heading font-extrabold text-2xl text-white">{(user?.progress?.completedCourses || []).length || 1} Courses</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Readiness</span>
            <span className="font-heading font-extrabold text-2xl text-emerald-400">78%</span>
          </div>
        </div>
      </div>

      {/* Monthly Progress Chart */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h3 className="font-heading font-bold text-lg text-white mb-4">Career Readiness Trend (Over Time)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyProgress}>
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestones List */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h3 className="font-heading font-bold text-lg text-white mb-4">Achievement Milestones</h3>
        <div className="space-y-3">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="font-bold text-xs text-white">{m.title}</h4>
                  <span className="text-[10px] text-slate-400">{m.date}</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
                {m.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
