import React from 'react'


export default function ElectiveCard({ elective }) {
const difficultyColor = elective.difficulty_level === 'high' ? 'bg-red-100 text-red-800' : elective.difficulty_level === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'


return (
<div className="border rounded-lg p-4 flex items-start gap-4">
<div className="flex-1">
<div className="flex items-baseline justify-between">
<h3 className="font-semibold">{elective.name} <span className="text-sm text-slate-500">({elective.code})</span></h3>
<div className={`px-2 py-1 rounded text-xs font-medium ${difficultyColor}`}>{elective.difficulty_level || 'n/a'}</div>
</div>


<p className="text-sm text-slate-600 mt-2">{elective.description}</p>


<div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
<div>Dept: <strong>{elective.department_name || '—'}</strong></div>
<div>Sem: <strong>{elective.semester || '—'}</strong></div>
<div>Avg CGPA: <strong>{elective.avg_cgpa || '—'}</strong></div>
</div>


{elective.prerequisites && elective.prerequisites.length > 0 && (
<div className="mt-3 text-sm text-slate-600">Prereqs: {elective.prerequisites.join(', ')}</div>
)}
</div>


<div className="flex-shrink-0">
<button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Recommend</button>
</div>
</div>
)
}