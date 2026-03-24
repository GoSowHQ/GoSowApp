"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Video, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/types';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isAuthenticated } = useAuthStore();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    api<Event>(`/events/${slug}`)
      .then(setEvent)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleRegister = async () => {
    if (!event) return;
    setRegistering(true);
    try {
      await api(`/events/${event.id}/register`, { method: 'POST' });
      setEvent({ ...event, _count: { registrations: (event._count?.registrations || 0) + 1 } });
    } catch {}
    setRegistering(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-gray-400" />
        </div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="text-xl font-bold text-gray-900">Event not found</h2>
            <Link href="/events" className="text-sm text-[#7ED957] mt-2 inline-block">Back to events</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6">
            <ArrowLeft size={14} /> Back to events
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 ${
              event.type === 'HACKATHON' ? 'bg-purple-100 text-purple-700' :
              event.type === 'WORKSHOP' ? 'bg-blue-100 text-blue-700' :
              'bg-green-100 text-green-700'
            }`}>
              {event.type.replace('_', ' ')}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

            <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                {formatDate(event.startDate)} — {formatDate(event.endDate)}
              </div>
              <div className="flex items-center gap-2">
                {event.isVirtual ? <Video size={16} className="text-gray-400" /> : <MapPin size={16} className="text-gray-400" />}
                {event.isVirtual ? 'Online' : event.location || 'TBA'}
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                {event._count?.registrations || 0}{event.maxAttendees ? ` / ${event.maxAttendees}` : ''} registered
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                  {event.description}
                </div>
              </div>
            </div>

            {isAuthenticated && (
              <button
                onClick={handleRegister}
                disabled={registering}
                className="px-8 py-3.5 bg-[#7ED957] text-gray-900 rounded-xl text-sm font-semibold hover:bg-[#6ec44a] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {registering && <Loader2 size={14} className="animate-spin" />}
                Register for Event
              </button>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
