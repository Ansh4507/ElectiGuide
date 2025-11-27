import React, { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';

export default function StudentForm({ onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    cgpa: '',
    department: 'CSE',
    interests: ''
  });

  // New state for the button animation
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const processedData = {
      ...formData,
      interests: formData.interests.split(',').map(s => s.trim().toLowerCase()).filter(s => s)
    };
    onUpdate(processedData);
    
    // Reset the "Saved" state if user types again
    if (isSaved) setIsSaved(false);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleManualSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // Hide "Saved" message after 2 seconds
  };

  return (
    <div className="space-y-4">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
      </div>

      {/* Department Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        >
          <option value="CSE">Computer Science (CSE)</option>
          <option value="IT">Information Tech (IT)</option>
          <option value="ECE">Electronics (ECE)</option>
          <option value="MECH">Mechanical</option>
        </select>
      </div>

      {/* CGPA Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">Current CGPA</label>
        <input
          type="number"
          name="cgpa"
          step="0.01"
          max="10"
          value={formData.cgpa}
          onChange={handleChange}
          placeholder="e.g. 8.5"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
      </div>

      {/* Interests Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">Interests</label>
        <textarea
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          placeholder="e.g. machine learning, web dev"
          rows="3"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
      </div>

      {/* NEW: Interactive Save Button */}
      <button 
        onClick={handleManualSave}
        className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
          isSaved 
          ? 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none'
        }`}
      >
        {isSaved ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Preferences Saved!
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Update Profile
          </>
        )}
      </button>
    </div>
  );
}