import React, { useState } from 'react';
import { Star, Code, Cpu, TrendingUp, Filter } from 'lucide-react';

const ALL_ELECTIVES = [
  { id: 1, title: 'Advanced Machine Learning', code: 'CS401', dept: 'CSE', rating: 4.8, tags: ['machine learning', 'ai', 'python'], icon: Code },
  { id: 2, title: 'Internet of Things', code: 'EC305', dept: 'ECE', rating: 4.2, tags: ['hardware', 'iot', 'embedded'], icon: Cpu },
  { id: 3, title: 'Financial Engineering', code: 'HM201', dept: 'MECH', rating: 4.5, tags: ['finance', 'math', 'management'], icon: TrendingUp },
  { id: 4, title: 'Full Stack Development', code: 'IT402', dept: 'IT', rating: 4.9, tags: ['web dev', 'react', 'nodejs'], icon: Code },
  { id: 5, title: 'Data Structures in Python', code: 'CS201', dept: 'CSE', rating: 4.3, tags: ['python', 'coding', 'algorithms'], icon: Code },
];

const QUICK_FILTERS = ['All', 'CSE', 'ECE', 'Management', 'Web Dev'];

export default function Electives({ userPreferences }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredElectives = ALL_ELECTIVES.filter(course => {
    // 1. Check Quick Filter (Clickable Chips)
    const matchesQuickFilter = activeFilter === 'All' 
      || course.dept === activeFilter 
      || course.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase());

    // 2. Check User Interest Search (Typed in Form)
    let matchesSearch = true;
    if (userPreferences?.interests?.length > 0 && userPreferences.interests[0] !== "") {
      matchesSearch = course.tags.some(tag => 
        userPreferences.interests.some(userInterest => tag.includes(userInterest))
      );
    }

    return matchesQuickFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* NEW: Quick Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {QUICK_FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
              activeFilter === filter 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center px-2">
        <span className="text-sm text-slate-500 dark:text-slate-400">Found {filteredElectives.length} courses</span>
      </div>

      {filteredElectives.length === 0 ? (
        <div className="text-center py-10 text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 rounded-xl dark:border-slate-800">
          <p>No electives match your filters.</p>
          <button onClick={() => setActiveFilter('All')} className="text-indigo-600 font-medium text-sm mt-2 hover:underline">Clear Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredElectives.map((course) => (
            <div 
              key={course.id} 
              className="group p-4 border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all bg-white cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:hover:border-indigo-500 relative overflow-hidden"
            >
              {/* Optional: "Top Pick" Badge if rating is high */}
              {course.rating >= 4.8 && (
                <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg">TOP PICK</div>
              )}

              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-indigo-50 rounded-md group-hover:bg-indigo-100 transition-colors dark:bg-slate-700 dark:group-hover:bg-slate-600">
                  <course.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex items-center gap-1 text-slate-600 font-medium text-sm dark:text-slate-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {course.rating}
                </div>
              </div>
              
              <h3 className="font-bold text-slate-800 text-lg mb-1 dark:text-slate-100">{course.title}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 dark:text-slate-400">
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded dark:bg-slate-700 dark:text-slate-300">{course.code}</span>
                <span>•</span>
                <span>{course.dept}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {course.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-slate-50 text-slate-600 rounded-full border border-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}