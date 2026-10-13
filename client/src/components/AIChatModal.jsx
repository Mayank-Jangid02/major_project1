import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, User, CornerDownLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function AIChatModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello ${user?.name || 'Student'}! 👋 I am your personalized **CareerPath AI Assistant**.\n\nI have loaded your profile details (${user?.education?.degree || 'College'} student interested in ${user?.careerGoals?.preferredCareer || 'Tech Careers'}). How can I assist your career or education decisions today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const samplePrompts = [
    "Which career path is suitable for me?",
    "What skills do I need for Data Analyst?",
    "How to improve my placement readiness?",
    "Create a 3-month learning roadmap for me."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const newMsg = { sender: 'user', text: messageText };
    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat', { message: messageText });
      if (res.data?.reply) {
        setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: 'I am analyzing your profile data to formulate the best recommendation. Please check your dashboard tabs!' }]);
      }
    } catch (err) {
      // Local fallback response engine
      const lower = messageText.toLowerCase();
      let reply = `Based on your profile as a ${user?.education?.degree || 'student'}, I recommend focusing on your core target career **${user?.careerGoals?.preferredCareer || 'Full Stack Software Developer'}**.\n\nKey next steps:\n1. Solve 2 DSA coding problems daily.\n2. Complete 1 full-stack capstone project.\n3. Verify your Skill Gap matrix on the sidebar.`;
      
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div className="w-full max-w-2xl glass-panel border border-indigo-500/30 rounded-2xl flex flex-col h-[600px] max-h-[90vh] shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
                CareerPath AI Assistant
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Profile Synced
                </span>
              </h3>
              <p className="text-xs text-slate-400">Ask questions about careers, skill gaps, or learning roadmaps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-white/5 flex gap-2 overflow-x-auto custom-scrollbar">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] font-medium text-slate-300 hover:text-indigo-300 bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/40 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all"
            >
              ✨ {prompt}
            </button>
          ))}
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/40">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-primary text-white rounded-tr-none shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 text-slate-300 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-900/90 border border-white/10 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2 text-xs text-slate-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                Analyzing your profile & synthesizing guidance...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Assistant anything about your career path..."
            className="flex-1 glass-input rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-slate-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-primary hover:bg-gradient-hover text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
