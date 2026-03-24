"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { api } from '@/lib/api';
import type { User, Project } from '@/types';

export default function CreatorProfile({ params }: { params: { id: string } }) {
  const { id } = params;
  const [creator, setCreator] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const c = await api<User>(`/users/${id}`);
        if (!mounted) return;
        setCreator(c);
      } catch {}
      try {
        const p = await api<Project[]>(`/users/${id}/projects`);
        if (!mounted) return;
        setProjects(p || []);
      } catch {}
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold">{creator?.name || 'Creator'}</h1>
            <p className="text-sm text-gray-500">{creator?.bio}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <a key={p.id} href={`/projects/${p.slug}`} className="block bg-white rounded-xl border p-4 hover:shadow-sm"> 
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-gray-500">{p.shortDescription}</div>
                </a>
              ))}
              {projects.length === 0 && <div className="text-sm text-gray-500">No projects yet</div>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
