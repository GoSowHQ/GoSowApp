"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { formatCurrency, daysLeft, percentFunded } from "@/lib/utils";
import Link from "next/link";
import { api } from "@/lib/api";

const CATEGORY_LABELS: Record<string, string> = {
  AI_ML: "AI / ML",
  SAAS: "SaaS",
  DEVELOPER_TOOLS: "Developer Tools",
  OPEN_SOURCE: "Open Source",
  HARDWARE: "Hardware",
  WEB3: "Web3",
  MOBILE_APPS: "Mobile Apps",
  HACKATHONS: "Hackathons",
  TECH_EVENTS: "Tech Events",
  OTHER: "Other",
};

const CATEGORY_COLORS: Record<string, string> = {
  AI_ML: "from-purple-500/10 to-purple-500/5",
  SAAS: "from-pink-500/10 to-pink-500/5",
  DEVELOPER_TOOLS: "from-amber-500/10 to-amber-500/5",
  OPEN_SOURCE: "from-blue-500/10 to-blue-500/5",
  HARDWARE: "from-teal-500/10 to-teal-500/5",
  WEB3: "from-green-500/10 to-green-500/5",
  OTHER: "from-gray-500/10 to-gray-500/5",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  AI_ML: "🧠",
  SAAS: "🎨",
  DEVELOPER_TOOLS: "⚡",
  OPEN_SOURCE: "📊",
  HARDWARE: "🔬",
  WEB3: "🔐",
  MOBILE_APPS: "📱",
  HACKATHONS: "🏆",
  TECH_EVENTS: "🎤",
  OTHER: "💡",
};

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  category: string;
  currentAmount: number;
  goalAmount: number;
  backerCount: number;
  endDate: string | null;
  creator: { id: string; name: string; avatarUrl: string | null };
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/projects?limit=6')
      .then((data) => {
        setProjects(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="featured" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#7ED957] tracking-wide uppercase">
            Featured
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 tracking-tight">
            Trending projects
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Discover the most exciting tech projects being built right now
          </p>
        </motion.div>

        {/* Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-1.5 bg-gray-100 rounded-full" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => {
              const percent = percentFunded(project.currentAmount, project.goalAmount);
              const days = project.endDate ? daysLeft(project.endDate) : null;
              const color = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.OTHER;
              const emoji = CATEGORY_EMOJIS[project.category] || CATEGORY_EMOJIS.OTHER;
              const label = CATEGORY_LABELS[project.category] || project.category;

              return (
                <motion.div key={project.id} variants={cardVariants}>
                  <Link href={`/projects/${project.slug}`}>
                    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer">
                      {/* Card Image Area */}
                      <div
                        className={`h-44 bg-gradient-to-br ${color} flex items-center justify-center relative`}
                      >
                        <span className="text-5xl">{emoji}</span>
                        <button
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Heart size={16} className="text-gray-500" />
                        </button>
                        <span className="absolute top-4 left-4 text-xs font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-gray-700">
                          {label}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[#7ED957] transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight
                            size={18}
                            className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          {project.shortDescription || project.title}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                          <motion.div
                            className="h-full bg-[#7ED957] rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>

                        {/* Funding Info */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(project.currentAmount)}{" "}
                            <span className="text-gray-400 font-normal">
                              of {formatCurrency(project.goalAmount)}
                            </span>
                          </span>
                          {days !== null && (
                            <span className="text-gray-500">{days}d left</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                          <span>{project.backerCount} backers</span>
                          <span className="font-medium text-[#7ED957]">
                            {percent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/discover">
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50 transition-all">
              View all projects
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
