"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';

export default function AdminUsersPage() {
  const [data, setData] = useState<any>({ data: [], meta: {} });

  useEffect(() => {
    api('/admin/users').then(setData).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Users ({data.meta.total || 0})</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 font-medium text-gray-500">Name</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Email</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Role</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Provider</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Joined</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((u: any) => (
              <tr key={u.id} className="border-b border-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{u.name}</td>
                <td className="px-5 py-3 text-gray-600">{u.email}</td>
                <td className="px-5 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-full ${u.role === 'ADMIN' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>{u.role}</span></td>
                <td className="px-5 py-3 text-gray-500">{u.provider}</td>
                <td className="px-5 py-3 text-gray-500">{formatDate(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
