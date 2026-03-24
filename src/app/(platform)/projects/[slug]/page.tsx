"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import type { Project, Reward, Comment } from '@/types';
import { formatCurrency, percentFunded, daysLeft } from '@/lib/utils';
import RewardTier from '@/components/projects/reward-tier';
import CommentItem from '@/components/comments/comment-item';
import BackersList from '@/components/projects/backers-list';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const p = await api<Project>(`/projects/${slug}`);
        if (!mounted) return;
        setProject(p);
        const c = await api<Comment[]>(`/projects/${p.id}/comments`);
        setComments(c || []);
        // show funded toast if redirect from Stripe
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          if (params.get('funded') === 'true') {
            alert('Thanks — your contribution completed successfully.');
            // remove query param
            window.history.replaceState({}, '', window.location.pathname);
          }
        }
      } catch (e) {
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [slug]);

  const [showAmountBox, setShowAmountBox] = useState(false);
  const [customAmount, setCustomAmount] = useState<number | ''>('');

  async function handleBack(amount: number, rewardId?: string) {
    if (!user) return router.push('/auth/login');
    try {
      const res = await api('/funding/checkout', {
        method: 'POST',
        body: JSON.stringify({ projectId: project?.id, amount, rewardId }),
      });
      if (res && res.url) window.location.href = res.url;
    } catch (err) {
      alert('Failed to start checkout');
    }
  }

  async function submitComment() {
    if (!user) return router.push('/auth/login');
    if (!commentText.trim() || !project) return;
    try {
      await api(`/projects/${project.id}/comments`, { method: 'POST', body: JSON.stringify({ content: commentText }) });
      setCommentText('');
      const updated = await api<Comment[]>(`/projects/${project.id}/comments`);
      setComments(updated || []);
    } catch {
      alert('Failed to post comment');
    }
  }

  if (loading) return (
    <div>
      <Navbar />
      <main className="pt-24 px-6 max-w-4xl mx-auto">Loading...</main>
      <Footer />
    </div>
  );

  if (!project) return (
    <div>
      <Navbar />
      <main className="pt-24 px-6 max-w-4xl mx-auto">Project not found</main>
      <Footer />
    </div>
  );

  const percent = percentFunded(project.currentAmount, project.goalAmount);
  const days = project.endDate ? daysLeft(project.endDate) : null;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                <p className="text-sm text-gray-500 mb-4">by {project.creator?.name || 'Unknown'}</p>
                <p className="text-gray-700 mb-6">{project.description}</p>

                <h3 className="text-lg font-semibold mb-2">Rewards</h3>
                <div className="space-y-3">
                  {(project.rewards || []).map((r: Reward) => (
                    <RewardTier key={r.id} reward={r} onSelect={(amount) => handleBack(amount, r.id)} />
                  ))}

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Custom amount</div>
                        <div className="text-sm text-gray-500">Enter any contribution</div>
                      </div>
                      <div className="text-right">
                        <button onClick={() => setShowAmountBox((s) => !s)} className="px-3 py-1 border rounded">Give custom</button>
                      </div>
                    </div>
                    {showAmountBox && (
                      <div className="mt-3">
                        <input type="number" value={customAmount} onChange={(e) => setCustomAmount(Number(e.target.value))} className="w-full border rounded p-2" placeholder="Amount USD" />
                        <div className="flex justify-end mt-2">
                          <button onClick={() => { if (customAmount && project) handleBack(Number(customAmount)); }} className="px-4 py-2 bg-[#7ED957] text-white rounded-lg">Continue</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <aside className="w-full md:w-80">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="w-full h-3 bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <div className="h-full bg-[#7ED957]" style={{ width: `${percent}%` }} />
                  </div>
                  <div className="text-sm font-semibold">{formatCurrency(project.currentAmount)} <span className="font-normal text-gray-500">of {formatCurrency(project.goalAmount)}</span></div>
                  {days !== null && <div className="text-sm text-gray-500 mt-1">{days} days left</div>}
                  <div className="mt-4">
                    <button onClick={() => handleBack(Math.max(5, Math.round(project.goalAmount * 0.05)), undefined)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg">Back this project</button>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border mb-4">
                  <h4 className="text-sm font-semibold mb-2">Creator</h4>
                  <div className="text-sm text-gray-700">{project.creator?.name}</div>
                  <div className="text-sm text-gray-500 mt-2">View profile: <a href={`/creators/${project.creator?.id}`} className="text-[#7ED957]">Profile</a></div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="text-sm font-semibold mb-2">Backers</h4>
                  <BackersList projectId={project.id} />
                </div>
              </aside>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Comments</h3>
            {user ? (
              <div className="mb-4">
                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full border rounded p-2" rows={3} />
                <div className="flex justify-end mt-2">
                  <button onClick={submitComment} className="px-4 py-2 bg-[#7ED957] text-white rounded-lg">Post comment</button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 mb-4">Please <a href="/auth/login" className="text-[#7ED957]">login</a> to comment.</div>
            )}

            <div className="space-y-4">
              {comments.map((c) => (
                <CommentItem key={c.id} comment={c} onUpdated={(updated) => setComments((prev) => prev.map(x => x.id === updated.id ? updated : x))} onDeleted={(id) => setComments((prev) => prev.filter(x => x.id !== id))} />
              ))}
              {comments.length === 0 && <div className="text-sm text-gray-500">No comments yet</div>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
