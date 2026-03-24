"use client";

import { useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import type { Comment } from '@/types';

export default function CommentItem({ comment, onUpdated, onDeleted }: { comment: Comment; onUpdated?: (c: Comment) => void; onDeleted?: (id: string) => void }) {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content);

  async function save() {
    try {
      const updated = await api(`/comments/${comment.id}`, { method: 'PATCH', body: JSON.stringify({ content: text }) });
      setEditing(false);
      onUpdated && onUpdated(updated);
    } catch {
      alert('Failed to update comment');
    }
  }

  async function remove() {
    if (!confirm('Delete comment?')) return;
    try {
      await api(`/comments/${comment.id}`, { method: 'DELETE' });
      onDeleted && onDeleted(comment.id);
    } catch {
      alert('Failed to delete comment');
    }
  }

  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center justify-between gap-4">
        <div className="font-medium">{comment.user?.name || 'Anonymous'}</div>
        <div className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>
      </div>
      {editing ? (
        <div className="mt-2">
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full border rounded p-2" rows={3} />
          <div className="flex gap-2 justify-end mt-2">
            <button onClick={() => setEditing(false)} className="px-3 py-1 border rounded">Cancel</button>
            <button onClick={save} className="px-3 py-1 bg-[#7ED957] text-white rounded">Save</button>
          </div>
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-700">{comment.content}</div>
      )}

      {user && user.id === comment.userId && !editing && (
        <div className="flex gap-2 mt-3">
          <button onClick={() => setEditing(true)} className="text-sm text-gray-500">Edit</button>
          <button onClick={remove} className="text-sm text-red-500">Delete</button>
        </div>
      )}
    </div>
  );
}
