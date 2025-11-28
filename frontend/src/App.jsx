import React, { useState, useEffect } from 'react';
import Electives from './components/Electives';
import StudentForm from './components/StudentForm';
import { BookOpen, GraduationCap, LayoutDashboard, User, Moon, Sun, Sparkles } from 'lucide-react';

export default function App() {
  const [preferences, setPreferences] = useState({ cgpa: '', interests: [], department: '' });
  const [activeTab, setActiveTab] = useState('suggestions');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const handlePreferenceUpdate = (newData) => {
    setPreferences(prev => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white dark:bg-slate-950 dark:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-purple-900 dark:opacity-20"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-indigo-900 dark:opacity-20"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-pink-900 dark:opacity-20"></div>
      </div>

      {/* --- GLASS NAVBAR --- */}
      <nav className="sticky top-4 z-50 mx-4 md:mx-auto max-w-6xl rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg shadow-slate-200/50 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none transition-all">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">ElectiGuide</h1>
              <p className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400">Student Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition-all"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto p-6 md:p-8 lg:py-12">
        
        {/* Mobile Tabs */}
        <div className="md:hidden flex p-1.5 bg-white/50 backdrop-blur-md border border-white/40 rounded-xl mb-6 dark:bg-slate-900/50 dark:border-slate-800">
          {['suggestions', 'profile'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-bold capitalize rounded-lg transition-all ${activeTab === tab ? 'bg-white shadow-sm text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Suggestions */}
          <section className={`lg:col-span-8 ${activeTab === 'profile' ? 'hidden lg:block' : 'block'}`}>
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg dark:bg-indigo-900/30">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Recommended Courses</h2>
            </div>
            
            {/* Glass Container */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/40 border border-white/40 p-6 min-h-[600px] dark:bg-slate-900/60 dark:shadow-none dark:border-slate-800">
               <Electives userPreferences={preferences} />
            </div>
          </section>

          {/* RIGHT: Profile Form */}
          <aside className={`lg:col-span-4 space-y-6 ${activeTab === 'suggestions' ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-slate-200/40 border border-white/40 sticky top-28 dark:bg-slate-900/80 dark:shadow-none dark:border-slate-800">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="p-2 bg-pink-100 rounded-lg dark:bg-pink-900/30">
                   <LayoutDashboard className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Your Profile</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Customize your feed</p>
                </div>
              </div>
              <StudentForm onUpdate={handlePreferenceUpdate} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}