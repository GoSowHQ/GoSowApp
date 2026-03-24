"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Check, X } from 'lucide-react';
import type { Project } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<(Project & { creator?: any })[]>([]);

  useEffect(() => {
    api<any[]>('/admin/projects/pending').then(setProjects).catch(() => {});
  }, []);

  const approve = async (id: string) => {
    await api(`/admin/projects/${id}/approve`, { method: 'PATCH' });
    setProjects(projects.filter(p => p.id !== id));
  };

  const reject = async (id: string) => {
    await api(`/admin/projects/${id}/reject`, { method: 'PATCH' });
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pending Projects</h1>
      {projects.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-16">No pending projects</p>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{p.title}</h3>
                <p className="text-xs text-gray-500">by {p.creator?.name || 'Unknown'} · {p.creator?.email}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => approve(p.id)} className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"><Check size={16} /></button>
                <button onClick={() => reject(p.id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><X size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
