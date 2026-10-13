import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, GraduationCap, Building2, BookOpen, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, loading, user } = useAuth();

  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    degree: 'B.Tech',
    branch: 'Computer Science',
    year: '3rd Year',
    college: '',
    gradYear: '2026'
  });

  useEffect(() => {
    if (searchParams.get('mode')) {
      setMode(searchParams.get('mode'));
    }
  }, [searchParams]);

  useEffect(() => {
    if (user && !loading) {
      navigate('/app/dashboard');
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate('/app/dashboard');
      } else {
        setErrorMsg(res.message || 'Login failed. Please check credentials.');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setErrorMsg('Please fill in all required registration fields.');
        return;
      }
      const res = await register(formData);
      if (res.success) {
        navigate('/onboarding');
      } else {
        setErrorMsg(res.message || 'Registration failed.');
      }
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotMsg(`Instructions sent to ${forgotEmail}. Check your inbox.`);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-xl glass-panel border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-extrabold text-2xl text-white">
              CareerPath <span className="text-gradient">AI</span>
            </span>
          </Link>
          <h2 className="font-heading font-bold text-xl text-white">
            {mode === 'login' ? 'Welcome Back Student' : 'Create Your Student Profile'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' 
              ? 'Access your personalized career match, skill gaps, and placement score' 
              : 'Join thousands of students building data-driven career success'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-900/80 rounded-xl border border-white/10 mb-6 text-xs font-bold">
          <button
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`py-2.5 rounded-lg transition-all ${mode === 'login' ? 'bg-gradient-primary text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`py-2.5 rounded-lg transition-all ${mode === 'signup' ? 'bg-gradient-primary text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Register Student Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Johnson"
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password *</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setForgotModal(true)}
                  className="text-[11px] text-indigo-400 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500"
              />
            </div>
          </div>

          {/* Registration Student Education Metadata */}
          {mode === 'signup' && (
            <div className="pt-2 border-t border-white/10 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block">
                Education Profile
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Degree Level</label>
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white bg-slate-900"
                  >
                    <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                    <option value="B.Sc / BCA">B.Sc / BCA</option>
                    <option value="M.Tech / M.E.">M.Tech / M.E.</option>
                    <option value="MCA / M.Sc">MCA / M.Sc</option>
                    <option value="MBA / BBA">MBA / BBA</option>
                    <option value="Other Degree">Other Degree</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Branch / Stream</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    placeholder="Computer Science, IT, Data Science..."
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">College / University</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="e.g. NIT / National University"
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Graduation Year</label>
                  <select
                    name="gradYear"
                    value={formData.gradYear}
                    onChange={handleChange}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white bg-slate-900"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="Graduated">Already Graduated</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-primary hover:bg-gradient-hover text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all mt-4"
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In to Dashboard' : 'Continue to Skill Assessment')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          <span>Demo Credentials available out of the box: </span>
          <span className="font-mono text-indigo-300 font-semibold">student@example.com</span> / <span className="font-mono text-indigo-300">password123</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel border border-white/10 rounded-2xl p-6 text-left">
            <h3 className="font-heading font-bold text-lg text-white mb-2">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-4">Enter your student email address to receive password recovery instructions.</p>
            {forgotMsg ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                {forgotMsg}
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-primary text-white font-semibold text-xs"
                >
                  Send Reset Link
                </button>
              </form>
            )}
            <button
              onClick={() => { setForgotModal(false); setForgotMsg(''); }}
              className="mt-3 w-full py-2 rounded-xl border border-white/10 text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
