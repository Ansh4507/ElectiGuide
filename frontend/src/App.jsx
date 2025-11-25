import React, { useState } from 'react';
import Electives from './components/Electives';
import StudentForm from './components/StudentForm';
import { BookOpen, GraduationCap, LayoutDashboard, User } from 'lucide-react';

export default function App() {
  // 1. STATE: Keeps track of the student's data
  const [preferences, setPreferences] = useState({
    cgpa: '',
    interests: [],
    department: ''
  });

  // 2. STATE: Controls mobile tab switching
  const [activeTab, setActiveTab] = useState('suggestions');

  // 3. HANDLER: Updates the state when the Form changes
  const handlePreferenceUpdate = (newData) => {
    setPreferences(prev => ({ ...prev, ...newData }));
    console.log("Updated Preferences:", newData); // Helpful for debugging
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">ElectiGuide</h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Smart Electives & PBL Marketplace</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
              <User className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto p-6 md:p-8 lg:py-12">
        
        {/* Mobile Tab Buttons (Only shows on small screens) */}
        <div className="md:hidden flex p-1 bg-slate-200 rounded-lg mb-6">
          <button 
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'suggestions' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
          >
            Suggestions
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'profile' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
          >
            My Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Electives List */}
          <section className={`lg:col-span-8 ${activeTab === 'profile' ? 'hidden lg:block' : 'block'}`}>
            <div className="mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h2 className="text-2xl font-bold text-slate-800">Recommended For You</h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] p-4">
               {/* We pass the preferences down to Electives so it can filter the list */}
               <Electives userPreferences={preferences} />
            </div>
          </section>

          {/* RIGHT COLUMN: Student Form */}
          <aside className={`lg:col-span-4 space-y-6 ${activeTab === 'suggestions' ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
              <div className="mb-4 pb-4 border-b border-slate-100">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  Your Preferences
                </h3>
                <p className="text-sm text-slate-500 mt-1">Update details to get AI suggestions.</p>
              </div>
              
              {/* We pass the handler down so the form can update the App's state */}
              <StudentForm onUpdate={handlePreferenceUpdate} />
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 mt-12 py-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-slate-500">Built for your college • Data contributed by students</p>
        </div>
      </footer>
    </div>
  )
}