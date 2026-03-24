"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Funding } from '@/types';

export default function MyFundingsPage() {
  const [fundings, setFundings] = useState<Funding[]>([]);

  useEffect(() => {
    api<Funding[]>('/users/me/fundings').then(setFundings).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Fundings</h1>
      {fundings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-gray-500">You haven't backed any projects yet</p>
          <Link href="/discover" className="text-sm text-[#7ED957] mt-2 inline-block hover:underline">Discover projects</Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium text-gray-500">Project</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Amount</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {fundings.map(f => (
                <tr key={f.id} className="border-b border-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {f.project ? <Link href={`/projects/${f.project.slug}`} className="hover:text-[#7ED957]">{f.project.title}</Link> : '—'}
                  </td>
                  <td className="px-5 py-3 text-gray-700">{formatCurrency(f.amount)}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      f.status === 'COMPLETED' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>{f.status}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{formatDate(f.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
