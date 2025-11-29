import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, User, Book, Hash, Type, Trophy, AlertCircle, Sparkles } from 'lucide-react';

export default function StudentForm({ onUpdate }) {
  const [formData, setFormData] = useState({ name: '', cgpa: '', department: 'CSE', interests: '' });
  const [isSaved, setIsSaved] = useState(false);
  const [strength, setStrength] = useState(0);

  // 1. Calculate Profile Strength & Auto-Save
  useEffect(() => {
    let score = 0;
    if (formData.name.length > 2) score += 25;
    if (formData.department) score += 25;
    if (formData.cgpa && formData.cgpa > 0 && formData.cgpa <= 10) score += 25;
    if (formData.interests.length > 3) score += 25;
    setStrength(score);

    const processedData = {
      ...formData,
      interests: formData.interests.split(',').map(s => s.trim().toLowerCase()).filter(s => s)
    };
    onUpdate(processedData);

    if (isSaved) setIsSaved(false);
  }, [formData]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleManualSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Helper for dynamic gradient colors
  const getStrengthGradient = () => {
    if (strength < 50) return 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'; // Glowing Red
    if (strength < 100) return 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'; // Glowing Yellow
    return 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]'; // Neon Success
  };

  const getStrengthLabel = () => {
    if (strength < 50) return 'Profile Incomplete';
    if (strength < 100) return 'Almost there...';
    return 'Superstar Profile! 🚀';
  };

  // Helper Component for High-End Inputs
  const InputGroup = ({ icon: Icon, label, ...props }) => (
    <div className="group">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-all duration-300 group-focus-within:scale-110">
          <Icon className="w-4 h-4" />
        </div>
        <input 
          {...props}
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-300 dark:bg-[#05050A] dark:border-white/10 dark:text-white dark:focus:border-violet-500/50 dark:focus:ring-violet-500/10 placeholder:text-slate-400/50"
        />
        {/* Subtle glow effect on focus */}
        <div className="absolute inset-0 rounded-xl bg-violet-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      
      {/* --- GLOWING PROFILE STRENGTH METER --- */}
      <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100 relative overflow-hidden dark:bg-white/5 dark:border-white/5 backdrop-blur-sm">
        {/* Background glow for the card */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity duration-500 ${strength === 100 ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className="flex justify-between items-end mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${strength === 100 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'} transition-colors duration-500`}>
               {strength === 100 ? <Sparkles className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Strength</span>
          </div>
          <span className={`text-lg font-black transition-colors duration-300 ${strength === 100 ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500' : 'text-slate-700 dark:text-white'}`}>
            {strength}%
          </span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden dark:bg-slate-700/50 p-[2px]">
          <div 
            className={`h-full rounded-full transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${getStrengthGradient()}`} 
            style={{ width: `${strength}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
             <p className="text-[10px] text-slate-400 font-medium">{getStrengthLabel()}</p>
             {strength < 100 && <p className="text-[10px] text-violet-500 font-bold animate-pulse">Finish setup +25%</p>}
        </div>
        
        {strength < 100 && (
          <div className="mt-4 flex items-start gap-3 text-[11px] text-slate-500 bg-white/60 p-3 rounded-xl border border-slate-100 dark:bg-white/5 dark:border-white/5 dark:text-slate-400">
            <AlertCircle className="w-4 h-4 text-violet-500 shrink-0" />
            <span className="leading-tight">Add more interests (e.g., "Web, AI, Design") to unlock better AI matches.</span>
          </div>
        )}
      </div>

      {/* --- FORM INPUTS --- */}
      <div className="space-y-5">
        <InputGroup 
          icon={User} label="Full Name" name="name" 
          value={formData.name} onChange={handleChange} placeholder="e.g. Alex Johnson" 
        />

        <div className="group">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors">Department</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors"><Book className="w-4 h-4" /></div>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 appearance-none dark:bg-[#05050A] dark:border-white/10 dark:text-white cursor-pointer transition-all"
            >
              <option value="CSE">Computer Science (CSE)</option>
              <option value="IT">Information Tech (IT)</option>
              <option value="ECE">Electronics (ECE)</option>
              <option value="MECH">Mechanical</option>
            </select>
          </div>
        </div>

        <InputGroup 
          icon={Hash} label="Current CGPA" name="cgpa" type="number" step="0.01" max="10"
          value={formData.cgpa} onChange={handleChange} placeholder="e.g. 8.5" 
        />

        <div className="group">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors">Interests</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors"><Type className="w-4 h-4" /></div>
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g. AI, Web, Finance"
              rows="3"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all dark:bg-[#05050A] dark:border-white/10 dark:text-white resize-none placeholder:text-slate-400/50"
            />
          </div>
        </div>
      </div>

      {/* --- GRADIENT SAVE BUTTON --- */}
      <button 
        onClick={handleManualSave}
        className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] hover:shadow-lg ${
          isSaved 
          ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
          : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-violet-500/30 hover:shadow-violet-500/50 hover:brightness-110'
        }`}
      >
        {isSaved ? (
          <>
            <CheckCircle className="w-5 h-5 animate-bounce" />
            <span>Preferences Saved</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Update Profile</span>
          </>
        )}
      </button>
    </div>
  );
}