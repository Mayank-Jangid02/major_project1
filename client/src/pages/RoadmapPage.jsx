import React, { useState } from 'react';
import { Map, CheckCircle2, Circle, Clock, ArrowDown, BookOpen, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RoadmapPage() {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState(user?.careerGoals?.preferredCareer || 'Full Stack Software Developer');

  const roadmaps = {
    'Full Stack Software Developer': [
      {
        stage: 1,
        title: 'Stage 1 — Web Foundations',
        status: 'Completed',
        description: 'Master HTML5, CSS3, ES6+ Modern JavaScript, DOM Manipulation, and Responsive Flexbox/Grid Layouts.',
        skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
        timeframe: 'Weeks 1 - 4'
      },
      {
        stage: 2,
        title: 'Stage 2 — Frontend Frameworks',
        status: 'In Progress',
        description: 'React.js 18 Hooks, Component Architecture, Redux Toolkit, Tailwind CSS, REST API Fetching.',
        skills: ['React', 'Tailwind CSS', 'Redux', 'Axios'],
        timeframe: 'Weeks 5 - 8'
      },
      {
        stage: 3,
        title: 'Stage 3 — Backend Engineering',
        status: 'Next Up',
        description: 'Node.js runtime, Express.js server routing, MongoDB Mongoose ODM, Relational SQL (PostgreSQL).',
        skills: ['Node.js', 'Express', 'MongoDB', 'SQL'],
        timeframe: 'Weeks 9 - 12'
      },
      {
        stage: 4,
        title: 'Stage 4 — DevOps & Tooling',
        status: 'Upcoming',
        description: 'Docker containerization, AWS EC2/S3 deployment, GitHub Actions CI/CD automation.',
        skills: ['Docker', 'AWS', 'CI/CD', 'Linux'],
        timeframe: 'Weeks 13 - 16'
      },
      {
        stage: 5,
        title: 'Stage 5 — Full Stack Projects & Placement Prep',
        status: 'Upcoming',
        description: 'Build 2 capstone projects, System Design fundamentals, LeetCode DSA practice, ATS Resume.',
        skills: ['System Design', 'DSA', 'Capstone Project'],
        timeframe: 'Weeks 17 - 20'
      }
    ],
    'Data Analyst': [
      {
        stage: 1,
        title: 'Stage 1 — Data Foundations',
        status: 'Completed',
        description: 'Advanced Excel formulas, Descriptive Statistics, Data Cleaning & Preprocessing.',
        skills: ['Excel', 'Statistics'],
        timeframe: 'Weeks 1 - 3'
      },
      {
        stage: 2,
        title: 'Stage 2 — Database Querying (SQL)',
        status: 'In Progress',
        description: 'SQL Joins, Aggregations, Subqueries, Window Functions, Indexing.',
        skills: ['SQL', 'PostgreSQL'],
        timeframe: 'Weeks 4 - 7'
      },
      {
        stage: 3,
        title: 'Stage 3 — Python for Data Analysis',
        status: 'Next Up',
        description: 'Pandas, NumPy, Matplotlib, Seaborn for Exploratory Data Analysis (EDA).',
        skills: ['Python', 'Pandas', 'NumPy'],
        timeframe: 'Weeks 8 - 11'
      },
      {
        stage: 4,
        title: 'Stage 4 — Business Intelligence Dashboards',
        status: 'Upcoming',
        description: 'Power BI / Tableau visual stories, KPI metrics, Automated reporting.',
        skills: ['Power BI', 'Tableau'],
        timeframe: 'Weeks 12 - 14'
      }
    ]
  };

  const currentRoadmap = roadmaps[selectedRole] || roadmaps['Full Stack Software Developer'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white flex items-center gap-3">
              <Map className="w-7 h-7 text-indigo-400" />
              Visual Learning Roadmap
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
              Connected step-by-step milestone progression for <strong>{selectedRole}</strong>.
            </p>
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="glass-input rounded-xl px-4 py-2 text-xs text-white bg-slate-900 font-semibold"
          >
            <option value="Full Stack Software Developer">Full Stack Software Developer</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>
        </div>
      </div>

      {/* Roadmap Step Timeline */}
      <div className="relative max-w-4xl mx-auto space-y-6 py-4">
        {currentRoadmap.map((node, idx) => {
          const isCompleted = node.status === 'Completed';
          const isInProgress = node.status === 'In Progress';

          return (
            <div key={idx} className="relative flex items-start gap-6 group">
              {/* Connector Line */}
              {idx < currentRoadmap.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-800 group-hover:bg-indigo-500/50 transition-colors" />
              )}

              {/* Node Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 border z-10 transition-all ${
                isCompleted ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                isInProgress ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30' :
                'bg-slate-900 border-white/10 text-slate-500'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : node.stage}
              </div>

              {/* Card */}
              <div className="flex-1 glass-card rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                    isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    isInProgress ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {node.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {node.timeframe}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white mb-2">{node.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{node.description}</p>

                <div className="flex flex-wrap gap-2">
                  {node.skills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
