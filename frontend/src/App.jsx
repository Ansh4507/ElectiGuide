import React, { useState, useEffect } from 'react';
import Electives from './components/Electives';
import StudentForm from './components/StudentForm';
import { BookOpen, GraduationCap, LayoutDashboard, User, Moon, Sun, Sparkles, Bell, Zap, X, Search, Command, TrendingUp } from 'lucide-react';

export default function App() {
  const [preferences, setPreferences] = useState({ cgpa: '', interests: [], department: '' });
  const [activeTab, setActiveTab] = useState('suggestions');
  const [isDark, setIsDark] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  // Trigger a welcome toast on load
  useEffect(() => {
    setNotification({ title: 'System Online', message: 'AI Recommendation Engine is active.' });
    const timer = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handlePreferenceUpdate = (newData) => {
    setPreferences(prev => ({ ...prev, ...newData }));
    // Trigger toast on update
    setNotification({ title: 'Profile Updated', message: 'Recommendations refreshed based on new data.' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-fuchsia-500 selection:text-white dark:bg-[#05050A] dark:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* --- LAYER 1: VIBRANT BLOBS --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-500/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob dark:bg-violet-900/20"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000 dark:bg-fuchsia-900/20"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000 dark:bg-cyan-900/20"></div>
      </div>

      {/* --- LAYER 2: TECH GRID OVERLAY --- */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10 pointer-events-none brightness-100 contrast-150"></div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 pointer-events-none mask-image-gradient"></div>

      {/* --- GLASS NAVBAR --- */}
      <nav className="sticky top-4 z-50 mx-4 md:mx-auto max-w-6xl rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-violet-200/10 dark:bg-[#121217]/70 dark:border-white/10 dark:shadow-none transition-all duration-300">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2.5 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 rounded-xl shadow-lg shadow-violet-500/30 group-hover:rotate-12 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-white dark:to-slate-400 group-hover:to-violet-400 transition-all">ElectiGuide</h1>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-500">Live Beta</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors hidden sm:block">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl bg-white/50 border border-white/60 hover:bg-white text-slate-600 dark:bg-slate-800/50 dark:border-white/10 dark:text-slate-400 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-white dark:bg-[#05050A] flex items-center justify-center">
                <User className="w-5 h-5 text-violet-600 dark:text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto p-6 md:p-8 lg:py-10">
        
        {/* NEW: ULTRA-PREMIUM HERO SECTION (Replaces Banner) */}
        <div className="mb-12 animate-in slide-in-from-bottom-5 fade-in duration-700">
           <div className="max-w-3xl">
             <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
               Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Next Passion.</span>
             </h1>
             <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl">
               Our AI analyzes your interests, CGPA, and career goals to recommend electives that actually matter.
             </p>

             {/* FAKE SEARCH / COMMAND BAR (Visual Only) */}
             <div className="relative group max-w-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative flex items-center bg-white dark:bg-[#121217] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 shadow-xl shadow-slate-200/50 dark:shadow-none">
                   <Search className="w-5 h-5 text-slate-400 mr-3" />
                   <input 
                      type="text" 
                      placeholder="Try searching for 'Python', 'Finance', or 'Robotics'..." 
                      className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-white placeholder:text-slate-400"
                      disabled // Disabled because the real search is in the sidebar logic
                   />
                   <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-white/10 rounded-lg border border-slate-200 dark:border-white/5">
                      <Command className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">K</span>
                   </div>
                </div>
             </div>

             {/* TRENDING TAGS */}
             <div className="flex flex-wrap items-center gap-3 mt-6 text-sm">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium text-xs uppercase tracking-wider">
                   <TrendingUp className="w-3.5 h-3.5" /> Trending:
                </div>
                {['Machine Learning', 'Blockchain', 'Game Design', 'Marketing'].map(tag => (
                   <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-white hover:border-violet-300 hover:text-violet-600 transition-all cursor-pointer">
                      {tag}
                   </span>
                ))}
             </div>
           </div>
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden flex p-1.5 bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl mb-6 dark:bg-slate-800/40 dark:border-white/10">
          {['suggestions', 'profile'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-bold capitalize rounded-xl transition-all duration-300 ${activeTab === tab ? 'bg-white shadow-lg shadow-violet-200/50 text-violet-600 dark:bg-slate-700 dark:text-violet-400 dark:shadow-none' : 'text-slate-500 dark:text-slate-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Suggestions */}
          <section className={`lg:col-span-8 ${activeTab === 'profile' ? 'hidden lg:block' : 'block'} animate-in slide-in-from-left-5 duration-700 delay-100`}>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-violet-100 dark:bg-slate-800 dark:border-slate-700">
                  <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Recommended Courses</h2>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/50 dark:text-emerald-400">
                AI Active
              </span>
            </div>
            
            {/* Main Card Container */}
            <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 p-6 min-h-[600px] dark:bg-[#121217]/60 dark:border-white/5 relative overflow-hidden">
               {/* Shine effect on container */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
               <Electives userPreferences={preferences} />
            </div>
          </section>

          {/* RIGHT: Profile Form */}
          <aside className={`lg:col-span-4 space-y-6 ${activeTab === 'suggestions' ? 'hidden lg:block' : 'block'} animate-in slide-in-from-right-5 duration-700 delay-200`}>
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl shadow-violet-200/20 border border-white/60 sticky top-28 dark:bg-[#121217]/80 dark:border-white/10 dark:shadow-none">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-200/60 pb-4 dark:border-white/10">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg shadow-md shadow-pink-500/20">
                   <LayoutDashboard className="w-5 h-5 text-white" />
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

      {/* --- TOAST NOTIFICATION (Bottom Right) --- */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-[60] max-w-sm w-full animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-md dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-2xl shadow-violet-500/20 flex gap-4 items-center">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full shrink-0">
               <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{notification.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="ml-auto text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
          </div>
        </div>
      )}
    </div>
  )
}