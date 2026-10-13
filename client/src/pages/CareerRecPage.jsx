import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, Filter, TrendingUp, Award, ArrowRight, BookOpen, Map, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CareerRecPage() {
  const { user } = useAuth();
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCareer, setExpandedCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await api.get('/careers/recommendations');
        if (res.data?.recommendations) {
          setCareers(res.data.recommendations);
        }
      } catch (err) {
        console.log('Error fetching careers');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const categories = ['All', 'Software Development', 'Data Science & Analytics', 'Artificial Intelligence', 'Cloud Infrastructure', 'Information Security', 'Design & User Experience', 'Product & Strategy'];

  const filteredCareers = careers.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white flex items-center gap-3">
          <Compass className="w-7 h-7 text-indigo-400" />
          Career Path Recommendations
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
          Analyzed against your degree, skills, interests, and diagnostic aptitude test results using Machine Learning cosine similarity algorithms.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search career role or keyword..."
            className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto custom-scrollbar pb-1">
          {categories.slice(0, 5).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-gradient-primary text-white shadow-md' 
                  : 'bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Career Cards List */}
      <div className="space-y-4">
        {filteredCareers.map((c, idx) => {
          const isExpanded = expandedCareer === c.id;
          return (
            <div key={c.id || idx} className="glass-card rounded-2xl p-6 border border-white/10 transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-heading font-extrabold text-lg shrink-0">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {c.category}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Demand: {c.demand}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-400">
                        Growth: {c.growthRate}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">{c.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-2xl">{c.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Match Score</span>
                    <span className="font-heading font-extrabold text-2xl text-gradient">{c.matchScore}%</span>
                  </div>

                  <button
                    onClick={() => setExpandedCareer(isExpanded ? null : c.id)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5"
                  >
                    {isExpanded ? 'Collapse Details' : 'Explore Deep Dive'}
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Deep-Dive Details */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs animate-fadeIn">
                  {/* Why it matches & Salary */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-200 mb-2 uppercase text-[11px] tracking-wider text-indigo-400">
                        Why This Career Matches Your Profile
                      </h4>
                      <ul className="space-y-1.5 text-slate-300">
                        {c.whyMatches?.map((w, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Average Industry Salary Range</span>
                        <span className="font-bold text-white text-sm">₹{(c.salaryRange?.min / 100000).toFixed(1)} LPA — ₹{(c.salaryRange?.max / 100000).toFixed(1)} LPA</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">Avg ₹{(c.salaryRange?.avg / 100000).toFixed(1)} LPA</span>
                    </div>
                  </div>

                  {/* Required Skills & Skill Gaps */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-200 mb-2 uppercase text-[11px] tracking-wider text-purple-400">
                        Required Core Skills & Benchmark Levels
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {c.requiredSkills?.map((req, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 text-[11px]">
                            {req.name} <strong className="text-indigo-400">({req.requiredLevel}%)</strong>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Link
                        to="/app/roadmap"
                        className="px-4 py-2.5 rounded-xl bg-gradient-primary text-white font-bold text-xs flex items-center gap-2"
                      >
                        <Map className="w-4 h-4" />
                        View Visual Roadmap
                      </Link>
                      <Link
                        to="/app/courses"
                        className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-200 hover:text-white font-semibold text-xs flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        Recommended Courses
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
