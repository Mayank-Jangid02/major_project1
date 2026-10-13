import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, ArrowLeft, Award, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user, updateOnboarding } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Education
  const [education, setEducation] = useState({
    degree: user?.education?.degree || 'B.Tech',
    branch: user?.education?.branch || 'Computer Science',
    year: user?.education?.year || '3rd Year',
    cgpa: user?.education?.cgpa || 8.4,
    gradYear: user?.education?.gradYear || '2026',
    college: user?.education?.college || 'National Institute of Technology'
  });

  // Step 2: Skills
  const [skills, setSkills] = useState([
    { name: 'JavaScript', level: 'Intermediate', score: 75 },
    { name: 'React', level: 'Intermediate', score: 70 },
    { name: 'SQL', level: 'Beginner', score: 45 },
    { name: 'Data Structures & Algorithms', level: 'Intermediate', score: 65 },
    { name: 'Python', level: 'Beginner', score: 50 },
    { name: 'Communication', level: 'Advanced', score: 85 }
  ]);
  const [newSkillName, setNewSkillName] = useState('');

  // Step 3: Interests
  const availableInterests = [
    'Software Development', 'Data Science', 'Artificial Intelligence',
    'Cybersecurity', 'Cloud Computing', 'UI/UX', 'Product Management',
    'Finance', 'Marketing', 'Business', 'Research'
  ];
  const [selectedInterests, setSelectedInterests] = useState(user?.interests || ['Software Development', 'Data Science']);

  // Step 4: Career Goals
  const [careerGoals, setCareerGoals] = useState({
    preferredCareer: user?.careerGoals?.preferredCareer || 'Full Stack Software Developer',
    industry: user?.careerGoals?.industry || 'FinTech / SaaS',
    preferredRole: user?.careerGoals?.preferredRole || 'Full Stack Engineer',
    expectedSalary: user?.careerGoals?.expectedSalary || '1,400,000 INR',
    preferredLocation: user?.careerGoals?.preferredLocation || 'Bengaluru / Remote',
    higherStudies: user?.careerGoals?.higherStudies || 'No',
    remotePreference: user?.careerGoals?.remotePreference || 'Hybrid'
  });

  // Step 5: Diagnostic Assessment Quiz
  const quizQuestions = [
    {
      id: 'q1',
      question: 'Which data structure operates on a First-In, First-Out (FIFO) principle?',
      options: ['Stack', 'Queue', 'Tree', 'Graph'],
      correctAnswer: 1
    },
    {
      id: 'q2',
      question: 'In SQL, which clause filters rows AFTER an aggregation GROUP BY operation?',
      options: ['WHERE', 'HAVING', 'ORDER BY', 'SELECT'],
      correctAnswer: 1
    },
    {
      id: 'q3',
      question: 'Complete the logical series: 3, 7, 15, 31, 63, ?',
      options: ['125', '127', '129', '131'],
      correctAnswer: 1
    },
    {
      id: 'q4',
      question: 'What is the primary function of Supervised Learning in Machine Learning?',
      options: ['Clustering unlabelled points', 'Mapping input data to target labels', 'Reward-based navigation', 'Dimensionality reduction'],
      correctAnswer: 1
    }
  ];
  const [answers, setAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const handleSkillLevelChange = (skillName, newLevel) => {
    let score = 40;
    if (newLevel === 'Intermediate') score = 70;
    if (newLevel === 'Advanced') score = 95;

    setSkills(prev => prev.map(s => s.name === skillName ? { ...s, level: newLevel, score } : s));
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    if (skills.some(s => s.name.toLowerCase() === newSkillName.toLowerCase())) return;
    setSkills(prev => [...prev, { name: newSkillName.trim(), level: 'Intermediate', score: 70 }]);
    setNewSkillName('');
  };

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAnswerSelect = (questionId, optionIdx) => {
    setAnswers({ ...answers, [questionId]: optionIdx });
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate quiz score
      let correct = 0;
      quizQuestions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) correct++;
      });
      const finalScore = Math.round((correct / quizQuestions.length) * 100);
      setQuizScore(finalScore);

      updateOnboarding({
        education,
        skills,
        interests: selectedInterests,
        careerGoals,
        assessmentResults: { score: finalScore, completedAt: new Date().toISOString() }
      });

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        navigate('/app/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] py-12 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-3xl glass-panel border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative z-10">
        {/* Wizard Header */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-white">Student Career Assessment Wizard</h2>
              <p className="text-xs text-slate-400">Step {currentStep} of 5 — {
                currentStep === 1 ? 'Education Profile' :
                currentStep === 2 ? 'Skills & Proficiency' :
                currentStep === 3 ? 'Career Interests' :
                currentStep === 4 ? 'Career Goals' : 'Diagnostic Aptitude Assessment'
              }</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full">
            {currentStep * 20}% Completed
          </span>
        </div>

        {/* Wizard Progress Bar */}
        <div className="w-full h-2 bg-slate-900 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-300"
            style={{ width: `${currentStep * 20}%` }}
          />
        </div>

        {/* STEP 1: EDUCATION */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-white mb-4">Step 1 — Verify Academic Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Program</label>
                <input
                  type="text"
                  value={education.degree}
                  onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Branch / Specialization</label>
                <input
                  type="text"
                  value={education.branch}
                  onChange={(e) => setEducation({ ...education, branch: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Current Academic Year</label>
                <select
                  value={education.year}
                  onChange={(e) => setEducation({ ...education, year: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white bg-slate-900"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Current CGPA / Percentage</label>
                <input
                  type="number"
                  step="0.1"
                  max="10"
                  value={education.cgpa}
                  onChange={(e) => setEducation({ ...education, cgpa: parseFloat(e.target.value) || 7.0 })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SKILLS & PROFICIENCY */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-white mb-2">Step 2 — Select & Rate Your Skills</h3>
            <p className="text-xs text-slate-400 mb-4">Rate your proficiency level (Beginner, Intermediate, Advanced) for each technical skill.</p>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {skills.map((s) => (
                <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-xs font-semibold text-slate-200">{s.name}</span>
                  <div className="flex gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => handleSkillLevelChange(s.name, lvl)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          s.level === lvl 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Add custom skill (e.g. AWS, Docker, Figma)..."
                className="flex-1 glass-input rounded-xl px-4 py-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
              >
                + Add Skill
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: INTERESTS */}
        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-white mb-2">Step 3 — Select Your Career Interests</h3>
            <p className="text-xs text-slate-400 mb-4">Choose domain areas you enjoy exploring or want to build a career in.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableInterests.map(interest => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`p-3.5 rounded-xl border text-left font-semibold text-xs transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-gradient-primary border-indigo-400 text-white shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span>{interest}</span>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 4: CAREER GOALS */}
        {currentStep === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-white mb-4">Step 4 — Define Your Career Preferences</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Target Career</label>
                <select
                  value={careerGoals.preferredCareer}
                  onChange={(e) => setCareerGoals({ ...careerGoals, preferredCareer: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white bg-slate-900"
                >
                  <option value="Full Stack Software Developer">Full Stack Software Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                  <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                  <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                  <option value="Product Manager">Product Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Desired Industry</label>
                <input
                  type="text"
                  value={careerGoals.industry}
                  onChange={(e) => setCareerGoals({ ...careerGoals, industry: e.target.value })}
                  placeholder="FinTech, SaaS, Healthcare, AI..."
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Salary Expectation</label>
                <input
                  type="text"
                  value={careerGoals.expectedSalary}
                  onChange={(e) => setCareerGoals({ ...careerGoals, expectedSalary: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Work Preference</label>
                <select
                  value={careerGoals.remotePreference}
                  onChange={(e) => setCareerGoals({ ...careerGoals, remotePreference: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white bg-slate-900"
                >
                  <option value="Remote">Remote Only</option>
                  <option value="On-Site">On-Site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 5: APTITUDE ASSESSMENT QUIZ */}
        {currentStep === 5 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-white mb-1">Step 5 — Diagnostic Career Assessment</h3>
            <p className="text-xs text-slate-400 mb-4">Answer 4 quick technical & logical questions to calibrate your match score.</p>

            <div className="space-y-4">
              {quizQuestions.map((q, qIdx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-900/90 border border-white/10">
                  <p className="text-xs font-bold text-white mb-3">{qIdx + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleAnswerSelect(q.id, optIdx)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                            isSelected 
                              ? 'bg-indigo-600 border-indigo-400 text-white font-bold' 
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            Back
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-xl bg-gradient-primary hover:bg-gradient-hover text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/25"
          >
            {currentStep === 5 ? 'Complete Onboarding & Calculate Match' : 'Continue Step'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
