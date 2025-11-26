import React, { useState, useEffect } from 'react';

export default function StudentForm({ onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    cgpa: '',
    department: 'CSE', // Default
    interests: ''
  });

  // Whenever formData changes, send it to the parent (App.jsx)
  useEffect(() => {
    const processedData = {
      ...formData,
      interests: formData.interests.split(',').map(s => s.trim().toLowerCase()).filter(s => s)
    };
    onUpdate(processedData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
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
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
        />
      </div>

      {/* Interests Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">Interests (Keywords)</label>
        <textarea
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          placeholder="e.g. machine learning, web dev, finance"
          rows="3"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
        />
        <p className="text-xs text-slate-400 mt-1 dark:text-slate-500">Separate keywords with commas.</p>
      </div>
    </div>
  );
}