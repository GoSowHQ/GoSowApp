"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { api } from "@/lib/api";

const EVENT_TYPE_LABELS: Record<string, string> = {
  HACKATHON: "Hackathon",
  WORKSHOP: "Workshop",
  MEETUP: "Meetup",
  LAUNCH_PARTY: "Launch Party",
  DEMO_DAY: "Demo Day",
  WEBINAR: "Webinar",
};

const EVENT_COLORS: Record<string, string> = {
  HACKATHON: "bg-purple-500",
  WORKSHOP: "bg-amber-500",
  MEETUP: "bg-blue-500",
  DEMO_DAY: "bg-[#7ED957]",
  WEBINAR: "bg-blue-500",
  LAUNCH_PARTY: "bg-pink-500",
};

interface Event {
  id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
  location: string | null;
  isVirtual: boolean;
  startDate: string;
  endDate: string;
  maxAttendees: number | null;
  _count?: { registrations: number };
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Event[]>('/events')
      .then((data) => {
        setEvents(Array.isArray(data) ? data.slice(0, 3) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function formatEventDate(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    if (s.toDateString() === e.toDateString()) {
      return formatDate(start);
    }
    return `${formatDate(start)} - ${formatDate(end)}`;
  }

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-sm font-medium text-[#7ED957] tracking-wide uppercase">
              Events
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 tracking-tight">
              Upcoming tech events
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg">
              Hackathons, meetups, and demo days for the tech community
            </p>
          </div>
          <Link href="/events">
            <button className="mt-6 md:mt-0 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1 group">
              View all events
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-2 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-1/3" />
                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-10 bg-gray-100 rounded-xl" />
                  </div>
                </div>
              ))
            : events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/events/${event.slug}`}>
                    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer">
                      {/* Color bar */}
                      <div className={`h-2 ${EVENT_COLORS[event.type] || "bg-gray-400"}`} />

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                            {EVENT_TYPE_LABELS[event.type] || event.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-[#7ED957] transition-colors">
                          {event.title}
                        </h3>

                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={14} className="text-gray-400" />
                            {formatEventDate(event.startDate, event.endDate)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={14} className="text-gray-400" />
                            {event.isVirtual ? "Online" : event.location || "TBD"}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users size={14} className="text-gray-400" />
                            {event.maxAttendees || "Unlimited"} attendees
                          </div>
                        </div>

                        <button className="mt-5 w-full text-sm font-medium text-center py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
