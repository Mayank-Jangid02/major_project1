import React, { useState } from 'react';
import { User, Mail, GraduationCap, Building2, BookOpen, Award, FileText, Plus, Edit2, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    degree: user?.education?.degree || 'B.Tech',
    branch: user?.education?.branch || 'Computer Science',
    year: user?.education?.year || '3rd Year',
    college: user?.education?.college || 'National Institute of Technology',
    preferredCareer: user?.careerGoals?.preferredCareer || 'Full Stack Software Developer',
    resumeLink: user?.resumeLink || 'https://drive.google.com/file/d/sample-resume'
  });

  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      education: {
        degree: formData.degree,
        branch: formData.branch,
        year: formData.year,
        college: formData.college
      },
      careerGoals: {
        ...user?.careerGoals,
        preferredCareer: formData.preferredCareer
      },
      resumeLink: formData.resumeLink
    });

    setSavedMsg('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Profile Card */}
      <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8 bg-slate-900/90 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary text-white font-extrabold text-2xl flex items-center justify-center border-2 border-indigo-400 shadow-xl shadow-indigo-500/30 shrink-0">
              {user?.name ? user.name[0].toUpperCase() : 'S'}
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
                {user?.name || 'Alex Johnson'}
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Student Account
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                {user?.email || 'student@example.com'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {user?.education?.degree || 'B.Tech'} in {user?.education?.branch || 'Computer Science'} • {user?.education?.college || 'National Institute of Technology'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-all"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {savedMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 text-center">
          {savedMsg}
        </div>
      )}

      {/* Edit Form or Readonly Overview */}
      {isEditing ? (
        <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white mb-4">Edit Profile & Academic Background</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Program</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Branch / Stream</label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">College / University</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Career Goal</label>
              <input
                type="text"
                value={formData.preferredCareer}
                onChange={(e) => setFormData({ ...formData, preferredCareer: e.target.value })}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ATS Resume Google Drive / PDF Link</label>
              <input
                type="text"
                value={formData.resumeLink}
                onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl bg-gradient-primary text-white font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Save Profile Changes
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Verified Skills */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Verified Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(user?.skills || []).map((s, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-200">
                  {s.name} <strong className="text-indigo-400">({s.level})</strong>
                </span>
              ))}
            </div>
          </div>

          {/* Projects & Certifications */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Portfolio Projects & Resume
            </h3>
            <div className="space-y-3 text-xs">
              {(user?.projects || []).map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                  <h4 className="font-bold text-white">{p.title}</h4>
                  <p className="text-slate-400 mt-0.5">{p.description}</p>
                </div>
              ))}
              <div className="pt-2">
                <a
                  href={user?.resumeLink || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" /> View Deployed ATS Resume Document →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
