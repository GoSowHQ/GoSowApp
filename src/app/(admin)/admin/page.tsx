"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FolderOpen, DollarSign, Calendar } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api('/admin/dashboard').then(setStats).catch(() => {});
  }, []);

  const cards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Projects', value: stats.totalProjects, icon: FolderOpen, color: 'bg-green-50 text-green-600' },
    { label: 'Total Raised', value: `$${Number(stats.totalRaised || 0).toLocaleString()}`, icon: DollarSign, color: 'bg-purple-50 text-purple-600' },
    { label: 'Total Events', value: stats.totalEvents, icon: Calendar, color: 'bg-amber-50 text-amber-600' },
  ] : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`w-9 h-9 rounded-lg ${card.color} flex items-center justify-center mb-3`}><card.icon size={16} /></div>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{card.label}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
