import React, { useState } from 'react'


const API = import.meta.env.VITE_API_URL || ''


export default function StudentForm(){
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [departmentId, setDepartmentId] = useState(1)
const [year, setYear] = useState(3)
const [skills, setSkills] = useState('')
const [msg, setMsg] = useState(null)


async function submit(e){
e.preventDefault()
setMsg(null)
const payload = { name, email, department_id: Number(departmentId), year: Number(year), skills: skills.split(',').map(s=>s.trim()).filter(Boolean) }
try{
const res = await fetch(`${API}/api/students`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
const data = await res.json()
if (res.ok){
setMsg({ type: 'success', text: 'Saved student ✔' })
setName(''); setEmail(''); setSkills('')
} else {
setMsg({ type: 'error', text: data.error || 'Failed' })
}
}catch(err){
console.error(err)
setMsg({ type: 'error', text: 'Network error' })
}
}


return (
    <div className="bg-white p-6 rounded-2xl shadow">
<h3 className="font-semibold mb-3">Add / Update Student</h3>
<form onSubmit={submit} className="space-y-3 text-sm">
<div>
<label className="block text-slate-600">Name</label>
<input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Full name" required />
</div>
<div>
<label className="block text-slate-600">Email</label>
<input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full border rounded px-3 py-2" placeholder="you@college.edu" required />
</div>
<div className="grid grid-cols-2 gap-2">
<div>
<label className="block text-slate-600">Department</label>
<select value={departmentId} onChange={e=>setDepartmentId(e.target.value)} className="w-full border rounded px-3 py-2">
<option value={1}>CSE</option>
<option value={2}>ECE</option>
<option value={3}>IT</option>
<option value={4}>IntCSE</option>
</select>
</div>
<div>
<label className="block text-slate-600">Year</label>
<select value={year} onChange={e=>setYear(e.target.value)} className="w-full border rounded px-3 py-2">
<option value={1}>1</option>
<option value={2}>2</option>
<option value={3}>3</option>
<option value={4}>4</option>
</select>
</div>
</div>


<div>
<label className="block text-slate-600">Skills (comma separated)</label>
<input value={skills} onChange={e=>setSkills(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="cloud, docker, react" />
</div>


<div className="flex items-center gap-2">
<button className="px-4 py-2 bg-green-600 text-white rounded">Save student</button>
{msg && <div className={`${msg.type==='success' ? 'text-green-600' : 'text-red-600'} text-sm`}>{msg.text}</div>}
</div>
</form>
</div>
)
}