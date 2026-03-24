"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Video } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import type { Event } from '@/types';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Event[]>('/events')
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Tech Events</h1>
            <p className="text-gray-500 mt-2">Hackathons, meetups, and conferences for the tech community</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                  <div className="h-2 bg-gray-100 rounded mb-4 w-1/3" />
                  <div className="h-6 bg-gray-100 rounded mb-3 w-2/3" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold text-gray-900">No events yet</h3>
              <p className="text-sm text-gray-500 mt-1">Check back soon for upcoming tech events</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/events/${event.slug}`}>
                    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                      <div className={`h-2 ${
                        event.type === 'HACKATHON' ? 'bg-purple-500' :
                        event.type === 'WORKSHOP' ? 'bg-blue-500' :
                        event.type === 'MEETUP' ? 'bg-[#7ED957]' :
                        'bg-amber-500'
                      }`} />
                      <div className="p-6">
                        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                          {event.type.replace('_', ' ')}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-4 group-hover:text-[#7ED957] transition-colors">
                          {event.title}
                        </h3>
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={14} className="text-gray-400" />
                            {formatDate(event.startDate)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {event.isVirtual ? <Video size={14} className="text-gray-400" /> : <MapPin size={14} className="text-gray-400" />}
                            {event.isVirtual ? 'Online' : event.location || 'TBA'}
                          </div>
                          {event._count && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Users size={14} className="text-gray-400" />
                              {event._count.registrations} registered
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
