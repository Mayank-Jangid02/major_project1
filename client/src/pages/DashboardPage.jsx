import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  Target, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  BarChart3, 
  Bot,
  Layers,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import AIChatModal from '../components/AIChatModal';

export default function DashboardPage() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/careers/recommendations');
        if (res.data?.recommendations) {
          setRecommendations(res.data.recommendations);
        }
      } catch (err) {
        // Fallback calculation using client data
        console.log('Loading local fallback dashboard calculations');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Demo fallback recommendation list if API fails
  const displayRecs = recommendations.length > 0 ? recommendations : [
    {
      id: 'car_fullstack',
      title: 'Full Stack Software Developer',
      matchScore: 91,
      salaryRange: { min: 800000, max: 2400000, avg: 1400000 },
      demand: 'Very High',
      growthRate: '+24% YoY',
      whyMatches: ['Strong proficiency in modern JavaScript/React.', 'High quantitative assessment score.']
    },
    {
      id: 'car_dataanalyst',
      title: 'Data Analyst',
      matchScore: 84,
      salaryRange: { min: 600000, max: 1800000, avg: 1050000 },
      demand: 'High',
      growthRate: '+28% YoY',
      whyMatches: ['High interest in statistics and data modeling.', 'Solid SQL query foundations.']
    },
    {
      id: 'car_mlengine',
      title: 'Machine Learning Engineer',
      matchScore: 76,
      salaryRange: { min: 1000000, max: 3200000, avg: 1850000 },
      demand: 'Very High',
      growthRate: '+36% YoY',
      whyMatches: ['Algorithmic problem-solving aptitude.', 'Python foundation.']
    },
    {
      id: 'car_devops',
      title: 'Cloud & DevOps Engineer',
      matchScore: 71,
      salaryRange: { min: 900000, max: 2600000, avg: 1500000 },
      demand: 'High',
      growthRate: '+22% YoY',
      whyMatches: ['Systems thinking and automation interest.']
    }
  ];

  // Skill Comparison Data for Charts
  const chartData = [
    { skill: 'React', Current: 70, Required: 90 },
    { skill: 'JavaScript', Current: 80, Required: 90 },
    { skill: 'SQL', Current: 45, Required: 80 },
    { skill: 'DSA', Current: 65, Required: 85 },
    { skill: 'Python', Current: 50, Required: 75 },
    { skill: 'Communication', Current: 85, Required: 80 }
  ];

  // Skill Gap Table Items
  const skillGaps = [
    { skill: 'React', current: 70, required: 90, gap: 20, priority: 'High' },
    { skill: 'DSA & Algorithms', current: 65, required: 85, gap: 20, priority: 'High' },
    { skill: 'SQL Queries', current: 45, required: 80, gap: 35, priority: 'High' },
    { skill: 'Python Analytics', current: 50, required: 75, gap: 25, priority: 'Medium' }
  ];

  return (
    <div className="space-y-6">
      {/* Student Profile Header Banner */}
      <div className="glass-panel border border-indigo-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Personalized Advisor Dashboard
              </span>
              <span className="text-xs text-slate-400">Synced to Profile</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-white">
              Welcome Back, <span className="text-gradient">{user?.name || 'Alex'}</span>!
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
              {user?.education?.degree || 'B.Tech'} in {user?.education?.branch || 'Computer Science'} • Target Goal: <strong className="text-indigo-300">{user?.careerGoals?.preferredCareer || 'Full Stack Software Developer'}</strong>
            </p>
          </div>

          {/* Aggregate Match & Readiness Badges */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="glass-card p-4 rounded-2xl border border-white/10 text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Career Match</span>
              <span className="font-heading font-extrabold text-3xl text-gradient">82%</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Placement Ready</span>
              <span className="font-heading font-extrabold text-3xl text-emerald-400">74%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Career Match Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              Recommended Career Paths
            </h2>
            <p className="text-xs text-slate-400">Calculated by Machine Learning multi-vector similarity model</p>
          </div>
          <Link to="/app/careers" className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1">
            View All Paths <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayRecs.slice(0, 4).map((career, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Match Rank #{idx + 1}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                    {career.matchScore}% Match
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                  {career.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {career.whyMatches ? career.whyMatches[0] : 'High alignment with your skills and goals.'}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Avg Salary: ₹{(career.salaryRange?.avg / 100000).toFixed(1)} LPA</span>
                <Link
                  to={`/app/careers`}
                  className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Grid: Radar Chart + Skill Gap Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Radar / Bar Overview */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              Skill Level vs Required Benchmark
            </h3>
            <span className="text-xs text-slate-400">Current Profile</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Current Skill" dataKey="Current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Radar name="Required Level" dataKey="Required" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Gap Table */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Skill Gap Matrix
              </h3>
              <Link to="/app/skill-gap" className="text-xs text-indigo-400 hover:underline">
                Full Analysis →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase font-semibold">
                    <th className="py-2.5 px-3">Skill</th>
                    <th className="py-2.5 px-3 text-right">Current</th>
                    <th className="py-2.5 px-3 text-right">Required</th>
                    <th className="py-2.5 px-3 text-right">Gap</th>
                    <th className="py-2.5 px-3 text-center">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {skillGaps.map((g, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-semibold text-white">{g.skill}</td>
                      <td className="py-3 px-3 text-right text-indigo-400">{g.current}%</td>
                      <td className="py-3 px-3 text-right text-slate-300">{g.required}%</td>
                      <td className="py-3 px-3 text-right font-bold text-amber-400">-{g.gap}%</td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          g.priority === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {g.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            <Link
              to="/app/courses"
              className="w-full py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Get Recommended Courses For Skill Gaps
            </Link>
          </div>
        </div>
      </div>

      {/* Placement Readiness Breakdown */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Placement Readiness Evaluation (Overall: 74%)
            </h3>
            <p className="text-xs text-slate-400">Weighted scoring across 6 key campus placement factors</p>
          </div>
          <Link
            to="/app/readiness"
            className="px-4 py-2 rounded-xl bg-gradient-primary text-white text-xs font-semibold flex items-center gap-2"
          >
            Placement Roadmap →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Technical Skills (30%)', score: 75, color: 'bg-indigo-500' },
            { label: 'DSA & Aptitude (20%)', score: 78, color: 'bg-purple-500' },
            { label: 'Projects (15%)', score: 65, color: 'bg-amber-500' },
            { label: 'Resume (10%)', score: 85, color: 'bg-emerald-500' },
            { label: 'Communication (10%)', score: 85, color: 'bg-sky-500' },
            { label: 'Interview Prep (15%)', score: 70, color: 'bg-pink-500' }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-[10px] font-semibold text-slate-400 block mb-1 truncate">{item.label}</span>
              <div className="font-heading font-extrabold text-xl text-white mb-2">{item.score}%</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating AI Chat Assistant Quick Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-primary text-white shadow-2xl shadow-indigo-500/50 hover:scale-110 transition-transform flex items-center gap-3 border border-indigo-400/40"
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="font-heading font-bold text-xs pr-1 hidden md:inline">Ask AI Advisor</span>
      </button>

      <AIChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
