"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Funding } from '@/types';

export default function BackersList({ projectId }: { projectId: string }) {
  const [backers, setBackers] = useState<Funding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api<Funding[]>(`/funding/project/${projectId}`);
        if (!mounted) return;
        setBackers(res || []);
      } catch {
        setBackers([]);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [projectId]);

  if (loading) return <div className="text-sm text-gray-500">Loading backers...</div>;
  if (backers.length === 0) return <div className="text-sm text-gray-500">No backers yet</div>;

  return (
    <div className="space-y-3">
      {backers.map((b) => (
        <div key={b.id} className="flex items-center justify-between border rounded p-3">
          <div>
            <div className="font-medium">{b.user?.name || 'Anonymous'}</div>
            <div className="text-xs text-gray-500">{new Date(b.createdAt).toLocaleString()}</div>
          </div>
          <div className="font-semibold">${b.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
