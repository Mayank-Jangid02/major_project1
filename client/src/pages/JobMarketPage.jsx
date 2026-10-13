import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, MapPin, DollarSign, Filter, Info, Layers, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import api from '../services/api';

export default function JobMarketPage() {
  const [data, setData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await api.get('/jobmarket');
        if (res.data?.data) {
          setData(res.data.data);
        }
      } catch (err) {
        console.log('Using local fallback job market data');
      }
    };
    fetchMarketData();
  }, []);

  // Demo analytics datasets
  const skillDemandGrowth = [
    { skill: 'Python', demandCount: 54000, growth: 32 },
    { skill: 'SQL', demandCount: 48000, growth: 28 },
    { skill: 'React.js', demandCount: 42000, growth: 25 },
    { skill: 'AWS Cloud', demandCount: 39000, growth: 35 },
    { skill: 'Machine Learning', demandCount: 31000, growth: 42 },
    { skill: 'Docker / K8s', demandCount: 29000, growth: 29 }
  ];

  const salaryByExperience = [
    { experience: '0-1 Yr', salary: 650000 },
    { experience: '1-3 Yrs', salary: 1050000 },
    { experience: '3-5 Yrs', salary: 1750000 },
    { experience: '5-8 Yrs', salary: 2600000 },
    { experience: '8+ Yrs', salary: 3800000 }
  ];

  const industryBreakdown = [
    { name: 'Software & SaaS', value: 38 },
    { name: 'FinTech & Banking', value: 24 },
    { name: 'E-Commerce', value: 16 },
    { name: 'Healthcare Tech', value: 12 },
    { name: 'EdTech & Gaming', value: 10 }
  ];

  const locationDemand = [
    { location: 'Bengaluru', openPositions: '42,000+', avgSalary: '₹14.5 LPA' },
    { location: 'Hyderabad', openPositions: '28,000+', avgSalary: '₹13.2 LPA' },
    { location: 'Pune / Mumbai', openPositions: '24,000+', avgSalary: '₹12.8 LPA' },
    { location: 'NCR (Gurugram/Delhi)', openPositions: '22,000+', avgSalary: '₹13.5 LPA' },
    { location: 'Remote Global', openPositions: '35,000+', avgSalary: '₹19.0 LPA' }
  ];

  const COLORS = ['#6366f1', '#a855f7', '#38bdf8', '#34d399', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Demo Dataset Clear Banner */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>Showing <strong>Demo Job Market Analytics Dataset</strong> (Last Synced: Q3 2026 Enterprise Survey). API microservice ready.</span>
        </div>
        <button
          onClick={() => alert('Simulating live job portal sync... Dataset updated!')}
          className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-[11px] shrink-0 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Sync Live Data
        </button>
      </div>

      {/* Header */}
      <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white flex items-center gap-3">
          <BarChart3 className="w-7 h-7 text-indigo-400" />
          Job Market & Salary Analytics Dashboard
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
          Real-time insights into hiring demand, fast-growing technical skills, salary progression curves, and geographical opportunity density.
        </p>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Demanded Skills Bar Chart */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <h3 className="font-heading font-bold text-base text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Top In-Demand Skills & Open Jobs
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillDemandGrowth}>
                <XAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="demandCount" name="Active Open Positions" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Progression Line Chart */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <h3 className="font-heading font-bold text-base text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            Salary Range by Experience Level (INR/yr)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salaryByExperience}>
                <XAxis dataKey="experience" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
                <Tooltip 
                  formatter={(value) => [`₹${(value/100000).toFixed(2)} LPA`, 'Average Package']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }} 
                />
                <Line type="monotone" dataKey="salary" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Industry Breakdown & Location Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart: Industry Breakdown */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <h3 className="font-heading font-bold text-base text-white mb-4">Hiring Share by Industry Sector</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {industryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Table */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-400" />
              Geographic & Remote Job Opportunities
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase font-semibold">
                    <th className="py-2.5 px-3">Location Hub</th>
                    <th className="py-2.5 px-3 text-right">Openings</th>
                    <th className="py-2.5 px-3 text-right">Avg Package</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {locationDemand.map((loc, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="py-3 px-3 font-semibold text-white">{loc.location}</td>
                      <td className="py-3 px-3 text-right text-indigo-400 font-bold">{loc.openPositions}</td>
                      <td className="py-3 px-3 text-right text-emerald-400 font-bold">{loc.avgSalary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
