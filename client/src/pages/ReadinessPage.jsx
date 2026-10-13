import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, FileText, Check, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ReadinessPage() {
  const { user } = useAuth();

  const [resumeUploaded, setResumeUploaded] = useState(Boolean(user?.resumeLink));
  const [resumeUrl, setResumeUrl] = useState(user?.resumeLink || 'https://drive.google.com/file/d/sample-resume');

  const readinessScore = 74;

  const breakdown = [
    { name: 'Technical Skills (30%)', score: 75, status: 'Strong', color: 'bg-indigo-500' },
    { name: 'DSA & Aptitude (20%)', score: 78, status: 'Good', color: 'bg-purple-500' },
    { name: 'Projects & Portfolio (15%)', score: 65, status: 'Needs Project', color: 'bg-amber-500' },
    { name: 'ATS Resume (10%)', score: 85, status: 'Verified', color: 'bg-emerald-500' },
    { name: 'Communication (10%)', score: 85, status: 'Advanced', color: 'bg-sky-500' },
    { name: 'Interview Prep (15%)', score: 70, status: 'Moderate', color: 'bg-pink-500' }
  ];

  const strengths = [
    "Solid technical foundation in modern React and JavaScript.",
    "Good logical aptitude and quantitative diagnostic score (78%).",
    "High communication skills suitable for team presentations."
  ];

  const areasToImprove = [
    "Increase Data Structures problem-solving speed (Graphs & DP).",
    "SQL aggregations and window query functions.",
    "Build 1 major full-stack capstone project with live deployment URL."
  ];

  const actionPlan = [
    "Complete 30-day DSA LeetCode roadmap focus on Arrays, Trees, and Dynamic Programming.",
    "Add live demo link & GitHub repository link to your E-Commerce project.",
    "Optimize resume formatting for ATS keyword compliance.",
    "Practice 2 peer mock interview sessions before company drive."
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel border border-emerald-500/30 rounded-3xl p-6 md:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider mb-2 inline-block">
              Placement Readiness Module
            </span>
            <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-white">
              Placement Readiness Score: <span className="text-emerald-400">{readinessScore}%</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
              Calculated using weighted industry placement parameters. Ready for Tier-1 enterprise campus hiring drives.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/40 text-center min-w-[150px]">
            <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Status Rating</span>
            <span className="font-heading font-extrabold text-2xl text-emerald-400">HIGH READINESS</span>
          </div>
        </div>
      </div>

      {/* Weighted Category Sliders */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h3 className="font-heading font-bold text-lg text-white mb-4">Readiness Evaluation Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breakdown.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{item.name}</span>
                <span className="font-bold text-white">{item.score}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Areas to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-emerald-950/10">
          <h3 className="font-heading font-bold text-lg text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Key Verified Strengths
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-amber-500/20 bg-amber-950/10">
          <h3 className="font-heading font-bold text-lg text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Areas Requiring Improvement
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {areasToImprove.map((area, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Action Items Plan */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h3 className="font-heading font-bold text-lg text-white mb-4">Recommended Placement Action Plan</h3>
        <div className="space-y-3">
          {actionPlan.map((action, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-200 font-medium pt-0.5">{action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
