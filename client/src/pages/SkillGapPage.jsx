import React, { useState } from 'react';
import { Target, ArrowRight, BookOpen, AlertTriangle, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function SkillGapPage() {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState(user?.careerGoals?.preferredCareer || 'Full Stack Software Developer');

  const gapData = [
    {
      skill: 'React.js Framework',
      current: 70,
      required: 90,
      gap: 20,
      priority: 'High',
      actionSteps: [
        'Complete React 18 Advanced Hooks & Redux Toolkit',
        'Build 2 real-world React projects (Dashboard & E-Commerce)',
        'Practice 25 React interview questions on state management'
      ]
    },
    {
      skill: 'Data Structures & Algorithms',
      current: 65,
      required: 85,
      gap: 20,
      priority: 'High',
      actionSteps: [
        'Solve 50 coding problems on Trees, Graphs, and Dynamic Programming',
        'Review Big-O time and space complexity analysis',
        'Participate in 2 timed weekly coding contests'
      ]
    },
    {
      skill: 'SQL & Database Queries',
      current: 45,
      required: 80,
      gap: 35,
      priority: 'High',
      actionSteps: [
        'Master SQL Joins, Window Functions, and Indexing',
        'Practice 30 complex analytical queries on LeetCode SQL',
        'Design a 3NF relational database schema'
      ]
    },
    {
      skill: 'Python Data Analytics',
      current: 50,
      required: 75,
      gap: 25,
      priority: 'Medium',
      actionSteps: [
        'Complete Python Data Analysis with Pandas & NumPy',
        'Perform Exploratory Data Analysis (EDA) on Kaggle datasets',
        'Visualize key trends using Seaborn & Matplotlib'
      ]
    },
    {
      skill: 'Technical Communication',
      current: 85,
      required: 80,
      gap: 0,
      priority: 'Low',
      actionSteps: [
        'Maintain high performance during team presentations',
        'Practice explaining system design choices clearly'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white flex items-center gap-3">
              <Target className="w-7 h-7 text-purple-400" />
              Skill Gap Analysis Matrix
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
              Comparing your current verified skill proficiencies against target industry standards for <strong>{selectedRole}</strong>.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Target Career</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="glass-input rounded-xl px-4 py-2 text-xs text-white bg-slate-900 w-full md:w-64 font-semibold"
            >
              <option value="Full Stack Software Developer">Full Stack Software Developer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Machine Learning Engineer">Machine Learning Engineer</option>
              <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bar Chart Overview */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h3 className="font-heading font-bold text-lg text-white mb-4">Skill Benchmark Comparison (Student vs Industry)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gapData}>
              <XAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="current" name="Current Proficiency" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="required" name="Industry Requirement" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actionable Gap Cards */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-white">Personalized Action Plans</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gapData.map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-bold text-base text-white">{item.skill}</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.priority === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    Priority: {item.priority}
                  </span>
                </div>

                {/* Progress Bar comparison */}
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-400">Current Level: <strong className="text-indigo-400">{item.current}%</strong></span>
                    <span className="text-slate-400">Target Level: <strong className="text-sky-400">{item.required}%</strong></span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                    <div className="bg-indigo-600 h-full" style={{ width: `${item.current}%` }} />
                    <div className="bg-amber-500/40 h-full" style={{ width: `${item.gap}%` }} />
                  </div>
                  <span className="text-[11px] text-amber-400 font-bold block text-right">Target Gap: -{item.gap}%</span>
                </div>

                {/* Action steps */}
                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Recommended Action Steps:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.actionSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-end">
                <Link
                  to="/app/courses"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Find Related Courses →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
