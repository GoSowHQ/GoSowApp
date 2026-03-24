"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState(1000);
  const [category, setCategory] = useState('OTHER');
  const { user } = useAuthStore();
  const router = useRouter();

  async function handleCreate(e: any) {
    e.preventDefault();
    if (!user) return router.push('/auth/login');
    try {
      const p = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({ title, description, goalAmount: goal, category }),
      });
      router.push(`/projects/${p.slug}`);
    } catch (err) {
      alert('Failed to create project');
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold mb-4">Create a new project</h1>
            {user ? (
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2 mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Short description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded p-2 mt-1" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Goal amount (USD)</label>
                    <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} className="w-full border rounded p-2 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded p-2 mt-1">
                      <option value="AI_ML">AI / ML</option>
                      <option value="SAAS">SaaS</option>
                      <option value="DEVELOPER_TOOLS">Developer Tools</option>
                      <option value="OPEN_SOURCE">Open Source</option>
                      <option value="HARDWARE">Hardware</option>
                      <option value="WEB3">Web3</option>
                      <option value="MOBILE_APPS">Mobile Apps</option>
                      <option value="HACKATHONS">Hackathons</option>
                      <option value="TECH_EVENTS">Tech Events</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-5 py-2 bg-[#7ED957] text-white rounded-lg">Create project</button>
                </div>
              </form>
            ) : (
              <div className="text-center py-16">
                <p className="text-sm text-gray-500">Please <a href="/auth/login" className="text-[#7ED957]">login</a> to create a project.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
