import React, { useState } from 'react';
import { Star, Code, Cpu, TrendingUp, Filter, ArrowRight } from 'lucide-react';

const ALL_ELECTIVES = [
  { id: 1, title: 'Advanced Machine Learning', code: 'CS401', dept: 'CSE', rating: 4.8, students: 120, tags: ['ML', 'AI', 'Python'], icon: Code, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 2, title: 'Internet of Things', code: 'EC305', dept: 'ECE', rating: 4.2, students: 85, tags: ['IoT', 'Hardware'], icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 3, title: 'Financial Engineering', code: 'HM201', dept: 'MECH', rating: 4.5, students: 92, tags: ['Finance', 'Math'], icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 4, title: 'Full Stack Development', code: 'IT402', dept: 'IT', rating: 4.9, students: 230, tags: ['Web', 'React', 'Node'], icon: Code, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 5, title: 'Data Structures', code: 'CS201', dept: 'CSE', rating: 4.3, students: 150, tags: ['Python', 'Algo'], icon: Code, color: 'text-pink-500', bg: 'bg-pink-50' },
];

const QUICK_FILTERS = ['All', 'CSE', 'ECE', 'Management', 'Web'];

export default function Electives({ userPreferences }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredElectives = ALL_ELECTIVES.filter(course => {
    const matchesQuickFilter = activeFilter === 'All' || course.dept === activeFilter || course.tags.some(t => t === activeFilter);
    let matchesSearch = true;
    if (userPreferences?.interests?.length > 0 && userPreferences.interests[0] !== "") {
      matchesSearch = course.tags.some(tag => userPreferences.interests.some(userInterest => tag.toLowerCase().includes(userInterest)));
    }
    return matchesQuickFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mask-image-gradient">
        {QUICK_FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all border ${
              activeFilter === filter 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none' 
              : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredElectives.length === 0 ? (
           <div className="col-span-2 text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl dark:border-slate-700">
             <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 dark:bg-slate-800">
               <Filter className="w-6 h-6 text-slate-400" />
             </div>
             <p className="text-slate-500 font-medium dark:text-slate-400">No courses found matching filters.</p>
             <button onClick={() => setActiveFilter('All')} className="text-indigo-600 font-bold text-sm mt-2 hover:underline">Clear all filters</button>
           </div>
        ) : (
          filteredElectives.map((course) => (
            <div 
              key={course.id} 
              className="group relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:shadow-none dark:hover:border-indigo-500/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${course.bg} dark:bg-slate-700`}>
                  <course.icon className={`w-6 h-6 ${course.color}`} />
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/50">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{course.rating}</span>
                </div>
              </div>
              
              <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight dark:text-white group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-4 dark:text-slate-400">{course.code} • {course.dept}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700">
                <span className="text-xs text-slate-400 font-medium">{course.students} students enrolled</span>
                <button className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all dark:bg-slate-700 dark:group-hover:bg-indigo-500">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}