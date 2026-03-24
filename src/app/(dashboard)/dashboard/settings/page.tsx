"use client";

import { useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const { user, loadUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      await api('/users/me', { method: 'PATCH', body: JSON.stringify({ name, bio }) });
      await loadUser();
      setSuccess(true);
    } catch {}
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-lg space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7ED957]/50 focus:border-[#7ED957]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7ED957]/50 focus:border-[#7ED957]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input type="email" value={user?.email || ''} disabled
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-500" />
        </div>
        {success && <p className="text-sm text-green-600">Profile updated!</p>}
        <button onClick={handleSave} disabled={loading}
          className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2">
          {loading && <Loader2 size={14} className="animate-spin" />} Save Changes
        </button>
      </div>
    </div>
  );
}
