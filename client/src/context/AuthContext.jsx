import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const DEFAULT_DEMO_USER = {
  _id: 'user_demo_101',
  name: 'Alex Johnson',
  email: 'student@example.com',
  role: 'student',
  education: {
    degree: 'B.Tech',
    branch: 'Computer Science',
    year: '3rd Year',
    cgpa: 8.4,
    gradYear: '2026',
    college: 'National Institute of Technology'
  },
  skills: [
    { name: 'JavaScript', level: 'Intermediate', score: 75 },
    { name: 'React', level: 'Intermediate', score: 70 },
    { name: 'SQL', level: 'Beginner', score: 45 },
    { name: 'Data Structures & Algorithms', level: 'Intermediate', score: 65 },
    { name: 'Python', level: 'Beginner', score: 50 },
    { name: 'Communication', level: 'Advanced', score: 85 }
  ],
  interests: ['Software Development', 'Data Science', 'Artificial Intelligence'],
  careerGoals: {
    preferredCareer: 'Full Stack Software Developer',
    industry: 'FinTech / SaaS',
    preferredRole: 'Frontend / Full Stack Engineer',
    expectedSalary: '1,400,000 INR',
    preferredLocation: 'Bengaluru / Remote',
    higherStudies: 'No',
    remotePreference: 'Hybrid'
  },
  assessmentResults: {
    score: 78,
    completedAt: new Date().toISOString()
  },
  progress: {
    completedCourses: ['Modern React 18 & Redux Toolkit Complete Guide'],
    completedSkills: ['HTML', 'CSS', 'JavaScript'],
    streakDays: 14,
    hoursSpent: 48,
    monthlyProgress: [
      { month: 'Nov', score: 42 },
      { month: 'Dec', score: 58 },
      { month: 'Jan', score: 71 },
      { month: 'Feb', score: 78 }
    ]
  },
  projects: [
    { title: 'E-Commerce Platform', description: 'Full stack shopping cart with React & Node', techStack: ['React', 'Node.js', 'MongoDB'] }
  ]
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('careerpath_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
  });

  const [token, setToken] = useState(() => localStorage.getItem('careerpath_token') || 'demo_jwt_token_123');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('careerpath_user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('careerpath_token', res.data.token);
        localStorage.setItem('careerpath_user', JSON.stringify(res.data.user));
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      // Fallback demo login if server offline
      if (email === 'admin@careerpath.ai') {
        const adminUser = { ...DEFAULT_DEMO_USER, name: 'CareerPath Admin', email, role: 'admin' };
        setUser(adminUser);
        return { success: true };
      }
      const demoUser = { ...DEFAULT_DEMO_USER, email };
      setUser(demoUser);
      return { success: true, message: 'Logged in using client mode' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', formData);
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('careerpath_token', res.data.token);
        localStorage.setItem('careerpath_user', JSON.stringify(res.data.user));
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const newUser = {
        ...DEFAULT_DEMO_USER,
        name: formData.name,
        email: formData.email,
        education: {
          degree: formData.degree || 'B.Tech',
          branch: formData.branch || 'Computer Science',
          year: formData.year || '1st Year',
          college: formData.college || 'University Campus',
          gradYear: formData.gradYear || '2026',
          cgpa: 8.0
        }
      };
      setUser(newUser);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('careerpath_token');
    localStorage.removeItem('careerpath_user');
  };

  const updateOnboarding = async (onboardingData) => {
    try {
      const res = await api.post('/user/onboarding', onboardingData);
      if (res.data?.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      setUser(prev => ({
        ...prev,
        ...onboardingData,
        education: { ...prev.education, ...onboardingData.education }
      }));
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/user/profile', profileData);
      if (res.data?.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      setUser(prev => ({ ...prev, ...profileData }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateOnboarding, updateProfile, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
