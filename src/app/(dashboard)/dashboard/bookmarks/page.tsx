"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import ProjectCard from '@/components/projects/project-card';
import type { Project } from '@/types';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    api<any[]>('/users/me/bookmarks').then(setBookmarks).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Projects</h1>
      {bookmarks.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-16">No bookmarked projects</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarks.map((b) => (
            <ProjectCard key={b.id} project={b.project} />
          ))}
        </div>
      )}
    </div>
  );
}
