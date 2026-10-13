import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Target, 
  BookOpen, 
  BarChart3, 
  Award, 
  Bot, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Star,
  Users,
  ShieldCheck,
  Zap,
  GraduationCap
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const testimonials = [
    {
      name: "Rohan Verma",
      role: "Final Year B.Tech CSE",
      college: "IIT Bombay",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      quote: "CareerPath AI identified my exact skill gap in SQL & System Design. Following the recommended roadmap got me placed as a Full Stack Engineer with 18 LPA!"
    },
    {
      name: "Ananya Sharma",
      role: "Recent Graduate",
      college: "Delhi University",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      quote: "The Job Market Analytics dashboard opened my eyes to the high demand for Data Analysts. The course recommendations were 100% aligned with my level."
    },
    {
      name: "Vikramaditya Nair",
      role: "3rd Year Student",
      college: "BITS Pilani",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      quote: "The AI Career Assistant answers all my doubts instantly. I improved my Placement Readiness score from 55% to 88% in 2 months."
    }
  ];

  const faqs = [
    {
      question: "How does CareerPath AI calculate career match scores?",
      answer: "CareerPath AI uses a multi-vector Machine Learning model that cross-analyzes your academic background, self-assessed skill levels, assessment diagnostic scores, and personal career preferences against real-time industry role vectors."
    },
    {
      question: "What is the Placement Readiness Score?",
      answer: "The Placement Readiness score is a weighted composite index evaluating your Technical Skills (30%), DSA & Aptitude (20%), Projects (15%), Resume (10%), Communication (10%), and Mock Interview preparation (15%)."
    },
    {
      question: "Can I use CareerPath AI if I am changing my stream or branch?",
      answer: "Yes! The platform is designed for career switchers and students exploring non-traditional domains. The algorithm highlights foundational bridge courses to close skill gaps effectively."
    },
    {
      question: "Are the course recommendations free or paid?",
      answer: "We aggregate both free high-quality open courses (Coursera Audit, YouTube Masterclasses, edX) and premium certifications (Udemy, AWS, Google Certs) with clear filter toggles."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 lg:px-8 overflow-hidden">
        {/* Glowing Radial Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Data Analytics & Machine Learning
            </span>

            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
              Build Your Career With <span className="text-gradient">Data-Driven Guidance</span>
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
              Discover the right career path, identify your skill gaps, learn what matters, and measure your placement readiness — all in one place.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/auth?mode=signup"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-primary hover:bg-gradient-hover text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.03]"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/app/careers"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 hover:border-indigo-500/50 bg-white/5 hover:bg-white/10 text-white font-semibold text-base flex items-center justify-center gap-2 transition-all"
              >
                <Compass className="w-5 h-5 text-indigo-400" />
                Explore Career Paths
              </Link>
            </div>
          </motion.div>

          {/* Student Career Dashboard Preview Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-5xl mx-auto glass-panel border border-white/15 rounded-3xl p-3 md:p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Top Bar Decoration */}
            <div className="flex items-center justify-between px-4 pb-4 border-b border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-slate-400">careerpath.ai/dashboard</span>
              </div>
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                Live AI Advisor Active
              </span>
            </div>

            {/* Dashboard Mock Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {/* Card 1: Top Recommendation */}
              <div className="glass-card rounded-2xl p-5 text-left border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase text-indigo-400">Top Match</span>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    91% Match
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">Full Stack Software Developer</h3>
                <p className="text-xs text-slate-400 mt-1">High demand across 45,000+ open enterprise roles.</p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Avg Salary:</span>
                  <span className="font-bold text-slate-200">₹14.0 LPA</span>
                </div>
              </div>

              {/* Card 2: Skill Gap Radar */}
              <div className="glass-card rounded-2xl p-5 text-left border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase text-purple-400">Skill Gap Matrix</span>
                  <span className="text-xs font-bold text-slate-400">3 Priority Gaps</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">React.js</span>
                      <span className="text-indigo-400 font-semibold">Current 70% / Req 90%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-primary w-[70%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">SQL Queries</span>
                      <span className="text-amber-400 font-semibold">Current 45% / Req 80%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[45%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Placement Readiness */}
              <div className="glass-card rounded-2xl p-5 text-left border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-emerald-400">Placement Readiness</span>
                    <span className="text-xs font-bold text-emerald-400">Strong</span>
                  </div>
                  <div className="font-heading font-extrabold text-3xl text-white">78%</div>
                  <p className="text-xs text-slate-400 mt-1">Ready for Tier-1 & Product Company Drives</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300 font-semibold">
                  <span>View Placement Action Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 lg:px-8 border-t border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              How CareerPath <span className="text-gradient">AI Works</span>
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              A 4-step intelligent pipeline transforming student profiles into high-paying career outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Student Profiling",
                desc: "Input education background, technical skills, interests, and academic performance.",
                icon: GraduationCap
              },
              {
                step: "02",
                title: "AI Skill Assessment",
                desc: "Take diagnostic quizzes to measure logical aptitude and domain proficiency.",
                icon: Target
              },
              {
                step: "03",
                title: "ML Match & Gap Matrix",
                desc: "Our ML engine compares your profile against 50,000+ industry job requirement vectors.",
                icon: BarChart3
              },
              {
                step: "04",
                title: "Action Roadmap & Prep",
                desc: "Follow curated course recommendations and track your Placement Readiness Score.",
                icon: Award
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="glass-card rounded-2xl p-6 border border-white/10 relative group">
                  <span className="text-3xl font-extrabold text-indigo-500/30 group-hover:text-indigo-400 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center my-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive Platform Features Overview */}
      <section className="py-20 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Everything You Need For <span className="text-gradient">Career Excellence</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            All tools integrated into one seamless personalized advisor environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Career Recommendation System",
              desc: "Analyzes skills, degree, interests, and diagnostic test results to predict top matching careers with match percentages.",
              icon: Compass,
              path: "/app/careers"
            },
            {
              title: "Interactive Skill Gap Matrix",
              desc: "Compare your current skills against industry standard vectors with radar charts and high-priority action items.",
              icon: Target,
              path: "/app/skill-gap"
            },
            {
              title: "Job Market Analytics",
              desc: "Real-time trends, salary brackets, location demand maps, and top fast-growing technical skills.",
              icon: BarChart3,
              path: "/app/job-market"
            },
            {
              title: "Placement Readiness Index",
              desc: "Calculates an aggregated score out of 100 based on Technical, Aptitude, Projects, Resume, and Interview prep.",
              icon: Award,
              path: "/app/readiness"
            },
            {
              title: "Step-Connected Career Roadmap",
              desc: "Stage-by-stage node roadmap guiding you from beginner fundamentals to production projects and interviews.",
              icon: TrendingUp,
              path: "/app/roadmap"
            },
            {
              title: "CareerPath AI Assistant",
              desc: "24/7 AI Chatbot that answers questions tailored specifically to your profile and target goals.",
              icon: Bot,
              path: "/app/ai-assistant"
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="glass-card rounded-2xl p-7 border border-white/10 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
                <Link
                  to={feature.path}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                >
                  Explore Feature
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 lg:px-8 bg-slate-950/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              Loved By <span className="text-gradient">Students Everywhere</span>
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Hear how students landed top product roles using CareerPath AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-indigo-500/40" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">{t.role} • {t.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 px-4 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm">Everything you need to know about the CareerPath AI platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between font-heading font-bold text-sm md:text-base text-white hover:text-indigo-400 transition-colors"
              >
                <span>{faq.question}</span>
                {activeFaq === idx ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 lg:px-8 max-w-6xl mx-auto">
        <div className="glass-panel border border-indigo-500/40 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white max-w-3xl mx-auto leading-tight">
            Ready to Accelerate Your <span className="text-gradient">Career Path?</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto">
            Join thousands of college students making data-driven education decisions and achieving placement success today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/auth?mode=signup"
              className="px-8 py-4 rounded-xl bg-gradient-primary hover:bg-gradient-hover text-white font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/30 transition-all hover:scale-105"
            >
              Get Started Free Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
