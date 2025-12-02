import React, { useState, useEffect } from 'react';
import { Star, Code, Cpu, TrendingUp, Filter, ArrowRight, X, CheckCircle, BookOpen, User, Calendar, Sparkles, Flame, Trophy, Award, Layers } from 'lucide-react';

const ALL_ELECTIVES = [
  { 
    id: 1, title: 'Advanced Machine Learning', code: 'CS401', dept: 'CSE', rating: 4.8, students: 120, 
    tags: ['ml', 'ai', 'python', 'data'], icon: Code, color: 'text-violet-600', bg: 'bg-violet-100',
    vibes: ['Heavy Workload', 'Project Heavy'], // <--- NEW
    professor: 'Dr. S. Sharma',
    description: 'Deep dive into neural networks, reinforcement learning, and computer vision. Perfect for students targeting AI research roles.',
    syllabus: ['Neural Networks & Backprop', 'CNNs & RNNs', 'Reinforcement Learning', 'Generative AI (GANs)']
  },
  { 
    id: 2, title: 'Internet of Things (IoT)', code: 'EC305', dept: 'ECE', rating: 4.2, students: 85, 
    tags: ['iot', 'hardware', 'sensors', 'embedded'], icon: Cpu, color: 'text-cyan-600', bg: 'bg-cyan-100',
    vibes: ['Project Heavy'], // <--- NEW
    professor: 'Prof. R. Gupta',
    description: 'Learn to connect physical devices to the internet. Covers sensors, microcontrollers (Arduino/ESP32), and cloud connectivity.',
    syllabus: ['Sensors & Actuators', 'Arduino & Raspberry Pi', 'MQTT Protocol', 'Cloud IoT Platforms']
  },
  { 
    id: 3, title: 'Financial Engineering', code: 'HM201', dept: 'MECH', rating: 4.5, students: 92, 
    tags: ['finance', 'math', 'management', 'economics'], icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100',
    vibes: ['Easy A'], // <--- NEW
    professor: 'Dr. A. Verma',
    description: 'Bridge the gap between engineering and finance. Learn about stock markets, risk analysis, and algorithmic trading.',
    syllabus: ['Time Value of Money', 'Risk Management', 'Derivatives & Options', 'Algorithmic Trading Basics']
  },
  { 
    id: 4, title: 'Full Stack Development', code: 'IT402', dept: 'IT', rating: 4.9, students: 230, 
    tags: ['web', 'react', 'node', 'javascript'], icon: Code, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100',
    vibes: ['Great Prof', 'Project Heavy'], // <--- NEW
    professor: 'Mr. K. Patel',
    description: 'The complete guide to building modern web apps. Master the MERN stack and deploy real-world projects.',
    syllabus: ['React Hooks & State', 'Node.js & Express', 'MongoDB Database', 'Deployment (Vercel/AWS)']
  },
  { 
    id: 5, title: 'Data Structures in Python', code: 'CS201', dept: 'CSE', rating: 4.3, students: 150, 
    tags: ['python', 'algo', 'coding', 'structures'], icon: Code, color: 'text-rose-600', bg: 'bg-rose-100',
    vibes: ['Heavy Workload', 'Great Prof'], // <--- NEW
    professor: 'Ms. L. Das',
    description: 'Master the fundamentals of DSA using Python. Essential for cracking technical interviews at top tech companies.',
    syllabus: ['Arrays & Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'Complexity Analysis']
  },
];

const QUICK_FILTERS = ['All', 'CSE', 'ECE', 'Management', 'Web'];

// --- HELPER: VIBE BADGE COMPONENT ---
const VibeBadge = ({ vibe }) => {
  let styles = '';
  let Icon = Sparkles;

  switch (vibe) {
    case 'Heavy Workload':
      styles = 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]';
      Icon = Flame;
      break;
    case 'Easy A':
      styles = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      Icon = Trophy;
      break;
    case 'Great Prof':
      styles = 'bg-sky-500/10 text-sky-500 border-sky-500/20 shadow-[0_0_10px_rgba(14,165,233,0.1)]';
      Icon = Award;
      break;
    case 'Project Heavy':
      styles = 'bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]';
      Icon = Layers;
      break;
    default:
      styles = 'bg-slate-100 text-slate-500 border-slate-200';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${styles}`}>
      <Icon className="w-3 h-3" />
      {vibe}
    </span>
  );
};

// --- SKELETON LOADER ---
const SkeletonCard = () => (
  <div className="border border-white/40 rounded-[2rem] p-6 bg-white/40 dark:bg-white/5 dark:border-white/5 shadow-sm relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-shimmer dark:via-white/5"></div>
    <div className="space-y-5 relative">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-slate-200/50 rounded-2xl dark:bg-white/10"></div>
        <div className="w-16 h-6 bg-slate-200/50 rounded-lg dark:bg-white/10"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-slate-200/50 rounded w-3/4 dark:bg-white/10"></div>
        <div className="h-4 bg-slate-200/50 rounded w-1/3 dark:bg-white/10"></div>
      </div>
      <div className="flex gap-2 pt-2">
         <div className="h-6 w-12 bg-slate-200/50 rounded dark:bg-white/10"></div>
         <div className="h-6 w-16 bg-slate-200/50 rounded dark:bg-white/10"></div>
      </div>
    </div>
  </div>
);

export default function Electives({ userPreferences }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // NEW: SCROLL LOCK EFFECT
  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to ensure scroll is re-enabled on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCourse]); // Trigger whenever the modal opens/closes

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeFilter, userPreferences]);

  const calculateMatchScore = (courseTags) => {
    const userInterests = userPreferences?.interests || [];
    if (userInterests.length === 0 || userInterests[0] === '') return null;
    let matchCount = 0;
    userInterests.forEach(interest => {
      if (courseTags.some(tag => tag.includes(interest))) matchCount++;
    });
    if (matchCount === 0) return 45;
    const score = 60 + (matchCount * 15);
    return Math.min(score, 98);
  };

  const filteredElectives = ALL_ELECTIVES.filter(course => {
    const matchesQuickFilter = activeFilter === 'All' || course.dept === activeFilter || course.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase());
    let matchesSearch = true;
    if (userPreferences?.interests?.length > 0 && userPreferences.interests[0] !== "") {
      matchesSearch = course.tags.some(tag => userPreferences.interests.some(userInterest => tag.includes(userInterest)));
    }
    return matchesQuickFilter && (activeFilter !== 'All' ? true : matchesSearch);
  }).sort((a, b) => {
    const scoreA = calculateMatchScore(a.tags) || 0;
    const scoreB = calculateMatchScore(b.tags) || 0;
    return scoreB - scoreA;
  });

  return (
    <div className="space-y-8">
      
      {/* FILTER CHIPS (Already has cursor-pointer from button base) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide mask-image-gradient px-1">
        {QUICK_FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`cursor-pointer px-5 py-2.5 text-xs font-bold rounded-full transition-all duration-300 border backdrop-blur-sm ${
              activeFilter === filter 
              ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-transparent shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-105' 
              : 'bg-white/60 text-slate-600 border-white/40 hover:bg-white hover:border-violet-300 hover:text-violet-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredElectives.length === 0 ? (
           <div className="col-span-2 text-center py-20 border border-dashed border-slate-200/50 rounded-[2.5rem] bg-white/30 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm">
             <div className="mx-auto w-20 h-20 bg-gradient-to-br from-slate-100 to-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-slate-200/50 dark:bg-none dark:bg-white/10 dark:shadow-none">
               <Filter className="w-8 h-8 text-slate-400" />
             </div>
             <h3 className="text-lg font-bold text-slate-700 dark:text-white mb-2">No matching courses</h3>
             <p className="text-slate-500 font-medium dark:text-slate-400 mb-6 max-w-xs mx-auto">We couldn't find any electives matching your current filters.</p>
             <button onClick={() => setActiveFilter('All')} className="cursor-pointer text-violet-600 font-bold text-sm bg-violet-50 px-6 py-2 rounded-full hover:bg-violet-100 transition-colors dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-900/50">
                Clear all filters
             </button>
           </div>
        ) : (
          filteredElectives.map((course) => {
            const matchScore = calculateMatchScore(course.tags);
            return (
              <div 
                key={course.id} 
                onClick={() => setSelectedCourse(course)}
                // ADDED: cursor-pointer on the card itself
                className="group relative bg-white/60 border border-white/60 rounded-[2rem] p-6 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-violet-300/50 hover:-translate-y-1 transition-all duration-500 cursor-pointer dark:bg-[#1A1A22]/60 dark:border-white/5 dark:hover:border-violet-500/30 dark:hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] backdrop-blur-sm"
              >
                {/* Match Badge */}
                {matchScore && (
                  <div className="absolute -top-3 right-5 bg-[#0F172A] border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1.5 animate-in zoom-in duration-300 z-10 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {matchScore}% Match
                  </div>
                )}

                <div className="flex justify-between items-start mb-5">
                  <div className={`p-4 rounded-2xl ${course.bg} dark:bg-white/5 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <course.icon className={`w-7 h-7 ${course.color} dark:text-white`} />
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-100/50 dark:bg-amber-500/10 dark:border-amber-500/20 backdrop-blur-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{course.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-800 text-xl mb-1 leading-tight dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4 dark:text-slate-400">{course.code} • {course.dept}</p>

                {/* VIBE CHECK SECTION ON CARD */}
                {course.vibes && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.vibes.map((vibe, idx) => (
                      <VibeBadge key={idx} vibe={vibe} />
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-5">
                  {course.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 bg-slate-100/50 text-slate-500 rounded-lg border border-slate-200/50 dark:bg-white/5 dark:text-slate-300 dark:border-white/5 group-hover:bg-white group-hover:border-violet-200 group-hover:text-violet-600 transition-all">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2 text-slate-400">
                     <User className="w-3.5 h-3.5" />
                     <span className="text-xs font-bold">{course.students} enrolled</span>
                  </div>
                  {/* ADDED: cursor-pointer to the Quick View button */}
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 dark:bg-white/5 dark:text-slate-400 dark:group-hover:bg-violet-500 dark:group-hover:text-white cursor-pointer">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* COMMAND CENTER MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#05050A]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedCourse(null)}
          ></div>

          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 dark:bg-[#0F1014] dark:border dark:border-white/10 ring-1 ring-black/5">
            {/* Modal Header with Gradient */}
            <div className={`p-8 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br from-slate-200 to-slate-400 dark:from-violet-900 dark:to-slate-900`}></div>
              
              <button 
                onClick={() => setSelectedCourse(null)}
                // ADDED: cursor-pointer here for clarity
                className="absolute top-6 right-6 p-2.5 bg-white/40 hover:bg-white rounded-full transition-all dark:bg-white/10 dark:text-white dark:hover:bg-white/20 z-10 backdrop-blur-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-start gap-6 relative z-10">
                <div className="p-5 bg-white rounded-3xl shadow-xl shadow-slate-200/50 dark:bg-[#1A1A22] dark:shadow-none border border-white/20">
                  <selectedCourse.icon className={`w-10 h-10 ${selectedCourse.color}`} />
                </div>
                <div>
                   <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{selectedCourse.title}</h2>
                   <div className="flex flex-wrap items-center gap-3 mt-3">
                     <span className="font-mono bg-slate-900 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg shadow-slate-500/30 dark:shadow-none">{selectedCourse.code}</span>
                     
                     {/* VIBES IN MODAL */}
                     {selectedCourse.vibes && selectedCourse.vibes.map((vibe, idx) => (
                        <VibeBadge key={idx} vibe={vibe} />
                     ))}
                   </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto bg-white/50 dark:bg-[#0F1014]">
               {/* Smart Match Insight */}
               {calculateMatchScore(selectedCourse.tags) && (
                 <div className="p-5 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-violet-50 rounded-2xl border border-violet-100/50 dark:bg-none dark:bg-white/5 dark:border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="flex items-center gap-2 mb-2 relative z-10">
                       <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                       <span className="font-bold text-violet-900 dark:text-violet-300 text-xs uppercase tracking-widest">AI Match Analysis</span>
                    </div>
                    <p className="text-sm text-violet-800 dark:text-slate-300 leading-relaxed relative z-10">
                      We found a <span className="font-bold">{calculateMatchScore(selectedCourse.tags)}% match</span> based on your interest in <span className="font-bold bg-white/80 px-1.5 py-0.5 rounded text-violet-700 shadow-sm dark:bg-white/10 dark:text-white mx-1">{userPreferences.interests.join(' & ')}</span>.
                    </p>
                 </div>
               )}

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-400 mb-4 dark:text-slate-500 uppercase text-[10px] tracking-widest">
                      Course Description
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-300 font-medium">{selectedCourse.description}</p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-400 mb-4 dark:text-slate-500 uppercase text-[10px] tracking-widest">
                      Key Syllabus
                    </h4>
                    <ul className="space-y-3">
                      {selectedCourse.syllabus.map((item, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-3 dark:text-slate-300 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 dark:bg-[#121217] dark:border-white/5">
               <button 
                 onClick={() => setSelectedCourse(null)}
                 className="px-6 py-3.5 font-bold text-sm text-slate-500 hover:bg-slate-200 rounded-xl transition-colors dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white cursor-pointer"
               >
                 Close
               </button>
               <button className="px-8 py-3.5 font-bold text-sm bg-slate-900 text-white rounded-xl shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:scale-105 transition-all dark:bg-white dark:text-black dark:hover:bg-slate-200 cursor-pointer">
                 Add to Plan
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}