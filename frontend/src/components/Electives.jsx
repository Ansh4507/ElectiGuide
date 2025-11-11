import React, { useEffect, useState } from 'react'
import ElectiveCard from './ElectiveCard'


const API = import.meta.env.VITE_API_URL || ''


export default function Electives() {
const [electives, setElectives] = useState([])
const [loading, setLoading] = useState(true)
const [query, setQuery] = useState('')


useEffect(() => {
fetch(`${API}/api/electives`).then(r => r.json()).then(data => {
setElectives(data)
setLoading(false)
}).catch(err => {
console.error(err)
setLoading(false)
})
}, [])


const filtered = electives.filter(e =>
e.name.toLowerCase().includes(query.toLowerCase()) ||
e.code.toLowerCase().includes(query.toLowerCase()) ||
(e.department_name || '').toLowerCase().includes(query.toLowerCase())
)


return (
<div className="bg-white p-6 rounded-2xl shadow">
<div className="flex items-center justify-between mb-4">
<h2 className="text-xl font-semibold">Electives</h2>
<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, code or dept" className="border rounded px-3 py-1 text-sm" />
</div>


{loading ? (
<div className="py-8 text-center text-sm text-slate-500">Loading electives…</div>
) : (
<div className="space-y-4">
{filtered.length === 0 && <div className="text-sm text-slate-500">No electives found.</div>}
{filtered.map(e => <ElectiveCard key={e.id} elective={e} />)}
</div>
)}
</div>
)
}