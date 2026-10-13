import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Star, ExternalLink, Filter, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CourseRecPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        if (res.data?.courses) {
          setCourses(res.data.courses);
        }
      } catch (err) {
        console.log('Error loading courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const displayCourses = courses.length > 0 ? courses : [
    {
      id: 'crs_react_mastery',
      title: 'Modern React 18 & Redux Toolkit Complete Guide',
      platform: 'Udemy',
      skills: ['React', 'JavaScript', 'Redux'],
      level: 'Intermediate',
      duration: '42 hours',
      rating: 4.8,
      priceType: 'Paid',
      url: 'https://udemy.com',
      careerCategory: 'Software Development',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'crs_dsa_java',
      title: 'Data Structures & Algorithms Bootcamp: Zero to Hero',
      platform: 'Coursera',
      skills: ['Data Structures & Algorithms', 'Problem Solving', 'Java'],
      level: 'Beginner',
      duration: '60 hours',
      rating: 4.9,
      priceType: 'Free',
      url: 'https://coursera.org',
      careerCategory: 'Software Development',
      thumbnail: 'https://images.unsplash.com/photo-1516116211223-4c7141940984?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'crs_sql_data',
      title: 'The Complete SQL & Database Mastery for Data Analytics',
      platform: 'edX',
      skills: ['SQL', 'Data Analytics', 'PostgreSQL'],
      level: 'Beginner',
      duration: '25 hours',
      rating: 4.7,
      priceType: 'Free',
      url: 'https://edx.org',
      careerCategory: 'Data Science & Analytics',
      thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'crs_python_data',
      title: 'Python for Data Science, Machine Learning & Analytics',
      platform: 'Coursera',
      skills: ['Python', 'Data Analytics', 'Machine Learning'],
      level: 'Intermediate',
      duration: '35 hours',
      rating: 4.9,
      priceType: 'Paid',
      url: 'https://coursera.org',
      careerCategory: 'Data Science & Analytics',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'crs_aws_devops',
      title: 'AWS Certified Solutions Architect & Docker DevOps',
      platform: 'Udemy',
      skills: ['Cloud Computing (AWS/Azure)', 'Docker & Kubernetes', 'CI/CD Pipelines'],
      level: 'Intermediate',
      duration: '48 hours',
      rating: 4.8,
      priceType: 'Paid',
      url: 'https://udemy.com',
      careerCategory: 'Cloud Infrastructure',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'crs_figma_uiux',
      title: 'Figma UI/UX Design Essentials & Prototype Systems',
      platform: 'YouTube',
      skills: ['Figma / Wireframing', 'Design Systems', 'User Research & Testing'],
      level: 'Beginner',
      duration: '18 hours',
      rating: 4.85,
      priceType: 'Free',
      url: 'https://youtube.com',
      careerCategory: 'Design & User Experience',
      thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&auto=format&fit=crop&q=60'
    }
  ];

  const filteredCourses = displayCourses.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.title.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q));
    const matchLvl = levelFilter === 'All' || c.level === levelFilter;
    const matchPrice = priceFilter === 'All' || c.priceType === priceFilter;
    const matchCat = categoryFilter === 'All' || c.careerCategory === categoryFilter;
    return matchSearch && matchLvl && matchPrice && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-indigo-400" />
          Recommended Course Catalog
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
          Curated learning resources recommended to close your identified skill gaps for <strong>{user?.careerGoals?.preferredCareer || 'Full Stack Developer'}</strong>.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topic or skill (e.g. React, SQL)..."
            className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          {/* Level Filter */}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="glass-input rounded-xl px-3 py-2 text-white bg-slate-900"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Price Filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="glass-input rounded-xl px-3 py-2 text-white bg-slate-900"
          >
            <option value="All">All Pricing</option>
            <option value="Free">Free Audit / Courses</option>
            <option value="Paid">Paid Certifications</option>
          </select>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((c) => (
          <div key={c.id} className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="h-44 w-full relative overflow-hidden bg-slate-900">
                <img 
                  src={c.thumbnail} 
                  alt={c.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold">
                    {c.platform}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    c.priceType === 'Free' ? 'bg-emerald-500/80 text-white' : 'bg-indigo-600/80 text-white'
                  }`}>
                    {c.priceType}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {c.duration}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {c.rating}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {c.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-primary hover:bg-gradient-hover text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Start Learning Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
