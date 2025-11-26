import React, { useState, useEffect } from 'react';
import Electives from './components/Electives';
import StudentForm from './components/StudentForm';
import { BookOpen, GraduationCap, LayoutDashboard, User, Moon, Sun } from 'lucide-react';

export default function App() {
  const [preferences, setPreferences] = useState({ cgpa: '', interests: [], department: '' });
  const [activeTab, setActiveTab] = useState('suggestions');
  
  // 1. STATE: Dark Mode
  const [isDark, setIsDark] = useState(false);

  // 2. EFFECT: Apply the 'dark' class to the HTML tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handlePreferenceUpdate = (newData) => {
    setPreferences(prev => ({ ...prev, ...newData }));
  };

  return (
    // Added dark:bg-slate-950 and dark:text-white here
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 dark:bg-slate-950 dark:text-white transition-colors duration-300">
      
      {/* Navbar with dark mode styles */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 dark:bg-slate-950/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ElectiGuide</h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block dark:text-slate-400">Smart Electives & PBL Marketplace</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* 3. TOGGLE BUTTON */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 dark:bg-slate-800 dark:border-slate-700">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-8 lg:py-12">
        <div className="md:hidden flex p-1 bg-slate-200 rounded-lg mb-6 dark:bg-slate-800">
          <button 
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'suggestions' ? 'bg-white shadow-sm text-indigo-600 dark:bg-slate-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Suggestions
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'profile' ? 'bg-white shadow-sm text-indigo-600 dark:bg-slate-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400'}`}
          >
            My Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className={`lg:col-span-8 ${activeTab === 'profile' ? 'hidden lg:block' : 'block'}`}>
            <div className="mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Recommended For You</h2>
            </div>
            {/* Added dark:bg-slate-900 and dark:border-slate-800 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] p-4 dark:bg-slate-900 dark:border-slate-800">
               <Electives userPreferences={preferences} />
            </div>
          </section>

          <aside className={`lg:col-span-4 space-y-6 ${activeTab === 'suggestions' ? 'hidden lg:block' : 'block'}`}>
            {/* Added dark:bg-slate-900 and dark:border-slate-800 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24 dark:bg-slate-900 dark:border-slate-800">
              <div className="mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-lg flex items-center gap-2 dark:text-white">
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  Your Preferences
                </h3>
                <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">Update details to get AI suggestions.</p>
              </div>
              <StudentForm onUpdate={handlePreferenceUpdate} />
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 mt-12 py-8 bg-white dark:bg-slate-950 dark:border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">Built for your college • Data contributed by students</p>
        </div>
      </footer>
    </div>
  )
}