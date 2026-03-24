"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import type { Project } from '@/types';

export default function EditProject({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const router = useRouter();
  const { user } = useAuthStore();
  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [goal, setGoal] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const p = await api<Project>(`/projects/${slug}`);
        if (!mounted) return;
        setProject(p);
        setTitle(p.title);
        setShortDescription(p.shortDescription || '');
        setGoal(p.goalAmount || 0);
      } catch {}
    };
    load();
    return () => { mounted = false; };
  }, [slug]);

  async function save(e: any) {
    e.preventDefault();
    if (!user || !project) return router.push('/auth/login');
    try {
      await api(`/projects/${project.id}`, { method: 'PATCH', body: JSON.stringify({ title, shortDescription, goalAmount: goal }) });
      router.push(`/projects/${project.slug}`);
    } catch {
      alert('Failed to save');
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold mb-4">Edit project</h1>
            {project ? (
              <form onSubmit={save} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2 mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Short description</label>
                  <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="w-full border rounded p-2 mt-1" rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium">Goal</label>
                  <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} className="w-full border rounded p-2 mt-1" />
                </div>
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-[#7ED957] text-white rounded-lg">Save</button>
                </div>
              </form>
            ) : (
              <div className="text-sm text-gray-500">Loading...</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
