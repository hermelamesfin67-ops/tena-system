'use client';
import { useState } from 'react';
import { Plus, Search, Bell, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MedicineForm } from '@/features/medicines/create';

const actions = [{
    key: 'medicines',
    title: 'Create medicine',
    desc: 'Add core medicine details and categories',
    tag: 'Drug model'
},
{
    key: 'translations',
    title: 'Add medicine translation',
    desc: 'Create localized patient-facing information',
    tag: 'DrugTranslation model'
},
{
    key: 'languages',
    title: 'Create language',
    desc: 'Enable another language for content',
    tag: 'Language model'
}] as const;

export default function Home() {
    const [view, setView] = useState<'home' | 'medicines' | 'translations' | 'languages'>('home');
    const [notice, setNotice] = useState('');
    return <main className="min-w-0 flex-1 bg-white px-6 py-7 lg:px-10">
        <header className="mb-8 flex items-start justify-between gap-4">
            <div>
                <p className="mb-3 text-sm text-slate-500">
                    <span className="font-medium text-brand">Content Management</span>
                    <span className="mx-2">/</span>
                    {view === 'home' ? 'Overview' : view === 'medicines' ? 'Create Medicine' : view === 'translations' ? 'Add Translation' : 'Create Language'}</p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    {view === 'home' ? 'Medicine content management' : view === 'medicines' ? 'Create Medicine' : view === 'translations' ? 'Add Medicine Translation' : 'Create Language'}
                </h1>
                <p className="mt-2 text-sm text-slate-500">Manage medicine records, languages, and reviewed localized content.</p>
            </div>
            <Button variant="outline" size="icon" aria-label="Notifications"><Bell size={18} /></Button></header>
        {notice &&
            <div role="status" className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {notice}
                <button className="ml-3 underline" onClick={() => setNotice('')}>Dismiss</button>
            </div>}
        {view === 'home' ? <>
            <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{actions.map(a =>
                <button key={a.key} onClick={() => setView(a.key)} className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-brand">{a.tag}</span>
                        <ChevronRight className="text-slate-400 transition group-hover:translate-x-1" size={18} />
                    </div><h2 className="font-semibold text-slate-900">{a.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{a.desc}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand"><Plus size={16} /> Open form</span></button>)}
            </div>
            <section className="rounded-xl border border-slate-200 p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div><h2 className="font-semibold text-slate-900">Getting started</h2>
                        <p className="mt-1 text-sm text-slate-500">Suggested sequence for adding localized content.</p>
                    </div>
                    <div className="relative w-full sm:w-64"><Search className="absolute left-3 top-2.5 text-slate-400" size={16} /><Input className="pl-9" placeholder="Search admin actions" onChange={e => {
                        const v = e.target.value.toLowerCase();
                        if (v.includes('language')) setView('languages');
                        else if (v.includes('translation')) setView('translations');
                        else if (v.includes('medicine')) setView('medicines');

                    }} />
                    </div>
                </div>
                <ol className="grid gap-4 md:grid-cols-3">{['Create the medicine record', 'Add translations for active languages', 'Review and publish approved content']
                    ?.map((s, i) =>
                        <li key={s} className="flex gap-3 rounded-lg bg-slate-50 p-4">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-brand ring-1 ring-slate-200">{i + 1}</span>
                            <span className="pt-1 text-sm text-slate-700">{s}</span>
                        </li>
                    )}
                </ol>
            </section>
        </> :
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
                    {view === 'medicines' && <MedicineForm />}
                </section>
                <aside className="h-fit rounded-xl border border-emerald-100 bg-emerald-50/60 p-5">
                </aside>
            </div>
        }
        <footer className="mt-10 border-t border-slate-100 pt-5 text-xs text-slate-400">
            TenaTech · Medicine information management
        </footer>
    </main>
}
