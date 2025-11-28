import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, User, Book, Hash, Type } from 'lucide-react';

export default function StudentForm({ onUpdate }) {
  const [formData, setFormData] = useState({ name: '', cgpa: '', department: 'CSE', interests: '' });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
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

  // Helper component for Inputs
  const InputGroup = ({ icon: Icon, label, ...props }) => (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 dark:text-slate-400">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
        <input 
          {...props}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-indigo-500/40"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <InputGroup 
        icon={User} label="Full Name" name="name" 
        value={formData.name} onChange={handleChange} placeholder="e.g. Alex Johnson" 
      />

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 dark:text-slate-400">Department</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Book className="w-4 h-4" /></div>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
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

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 dark:text-slate-400">Interests</label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-slate-400"><Type className="w-4 h-4" /></div>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="e.g. AI, Web, Finance"
            rows="3"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>
      </div>

      <button 
        onClick={handleManualSave}
        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 ${
          isSaved 
          ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:brightness-110'
        }`}
      >
        {isSaved ? <><CheckCircle className="w-4 h-4" /> Saved Successfully</> : <><Save className="w-4 h-4" /> Update Profile</>}
      </button>
    </div>
  );
}