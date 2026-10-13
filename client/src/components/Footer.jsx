import React from 'react';
import { Sparkles, Globe, Share2, MessageSquare, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070A10] text-slate-400 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-extrabold text-lg text-white">
              CareerPath <span className="text-gradient">AI</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            One-Stop Personalized Career & Education Advisor powered by Data Analytics and Machine Learning.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/app/careers" className="hover:text-indigo-400 transition-colors">Career Recommendations</Link></li>
            <li><Link to="/app/skill-gap" className="hover:text-indigo-400 transition-colors">Skill Gap Matrix</Link></li>
            <li><Link to="/app/courses" className="hover:text-indigo-400 transition-colors">Course Catalog</Link></li>
            <li><Link to="/app/job-market" className="hover:text-indigo-400 transition-colors">Job Market Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Placement Tools</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/app/readiness" className="hover:text-indigo-400 transition-colors">Placement Readiness Score</Link></li>
            <li><Link to="/app/roadmap" className="hover:text-indigo-400 transition-colors">Visual Career Roadmaps</Link></li>
            <li><Link to="/app/assessment" className="hover:text-indigo-400 transition-colors">Aptitude & Technical Diagnostic</Link></li>
            <li><Link to="/app/ai-assistant" className="hover:text-indigo-400 transition-colors">AI Career Advisor Chat</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Connect</h4>
          <div className="flex items-center gap-3 mb-4">
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 flex items-center justify-center text-slate-300 hover:text-indigo-400 transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 flex items-center justify-center text-slate-300 hover:text-indigo-400 transition-colors">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 flex items-center justify-center text-slate-300 hover:text-indigo-400 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
          <span className="text-[11px] block text-slate-500">
            Enterprise & Student Portal v1.0.0
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 CareerPath AI Platform. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for modern students & job seekers.
        </p>
      </div>
    </footer>
  );
}
