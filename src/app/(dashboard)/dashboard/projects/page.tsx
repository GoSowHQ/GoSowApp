"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import type { Project } from '@/types';

export default function MyProjectsPage() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (user) api<Project[]>(`/users/${user.id}/projects`).then(setProjects).catch(() => {});
  }, [user]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        <Link href="/projects/new" className="px-5 py-2.5 bg-gray-900 text-white text-sm rounded-lg font-medium hover:bg-gray-800">
          + New Project
        </Link>
      </div>
      {projects.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-16">No projects yet</p>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{p.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{formatCurrency(p.currentAmount)} raised of {formatCurrency(p.goalAmount)}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  p.status === 'ACTIVE' ? 'bg-green-50 text-green-700' :
                  p.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}>{p.status}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
