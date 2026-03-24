"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, DollarSign, Heart, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';
import { api } from '@/lib/api';
import type { Project, Funding } from '@/types';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [fundings, setFundings] = useState<Funding[]>([]);

  useEffect(() => {
    if (!user) return;
    api<Project[]>(`/users/${user.id}/projects`).then(setProjects).catch(() => {});
    api<Funding[]>('/users/me/fundings').then(setFundings).catch(() => {});
  }, [user]);

  const stats = [
    { label: 'My Projects', value: projects.length, icon: FolderOpen, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Raised', value: `$${projects.reduce((sum, p) => sum + p.currentAmount, 0).toLocaleString()}`, icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Projects Backed', value: fundings.length, icon: Heart, color: 'bg-pink-50 text-pink-600' },
    { label: 'Total Backed', value: `$${fundings.reduce((sum, f) => sum + f.amount, 0).toLocaleString()}`, icon: Bookmark, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {user?.name}</h1>
        <p className="text-sm text-gray-500 mb-8">Here's what's happening with your projects</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={16} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">My Projects</h2>
          <Link href="/projects/new" className="text-sm font-medium text-[#7ED957] hover:underline">
            + Create New
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-semibold text-gray-900 mb-1">No projects yet</h3>
            <p className="text-sm text-gray-500 mb-4">Start your first campaign and bring your idea to life</p>
            <Link href="/projects/new" className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm rounded-lg font-medium hover:bg-gray-800">
              Create Project
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Project</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Raised</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Backers</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <Link href={`/projects/${p.slug}`} className="font-medium text-gray-900 hover:text-[#7ED957]">{p.title}</Link>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        p.status === 'ACTIVE' ? 'bg-green-50 text-green-700' :
                        p.status === 'FUNDED' ? 'bg-blue-50 text-blue-700' :
                        p.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-50 text-gray-600'
                      }`}>{p.status}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-700">${p.currentAmount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-gray-700">{p.backerCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
