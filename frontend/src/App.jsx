import React from 'react'
import Electives from './components/Electives'
import StudentForm from './components/StudentForm'


export default function App() {
return (
<div className="min-h-screen p-6 md:p-12">
<div className="max-w-6xl mx-auto">
<header className="flex items-center justify-between mb-8">
<h1 className="text-3xl font-extrabold">ElectiGuide</h1>
<p className="text-sm text-slate-600">Smart elective suggestions & PBL marketplace</p>
</header>


<main className="grid grid-cols-1 md:grid-cols-3 gap-6">
<section className="md:col-span-2">
<Electives />
</section>


<aside className="md:col-span-1">
<StudentForm />
</aside>
</main>


<footer className="mt-12 text-center text-sm text-slate-500">
Built for your college. Data contributed by students.
</footer>
</div>
</div>
)
}