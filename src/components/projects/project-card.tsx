"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Project } from '@/types';
import { CATEGORY_LABELS } from '@/types';
import { formatCurrency, daysLeft, percentFunded } from '@/lib/utils';

export default function ProjectCard({ project }: { project: Project }) {
  const percent = percentFunded(project.currentAmount, project.goalAmount);
  const days = project.endDate ? daysLeft(project.endDate) : null;

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
      >
        {/* Image */}
        <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-50 relative flex items-center justify-center">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-4xl">🚀</div>
          )}
          <span className="absolute top-3 left-3 text-xs font-medium bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-gray-700">
            {CATEGORY_LABELS[project.category] || project.category}
          </span>
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart size={14} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 group-hover:text-[#7ED957] transition-colors mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {project.shortDescription || project.description?.substring(0, 100)}
          </p>

          {/* Progress */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
            <motion.div
              className="h-full bg-[#7ED957] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-900">
              {formatCurrency(project.currentAmount)}
              <span className="text-gray-400 font-normal"> of {formatCurrency(project.goalAmount)}</span>
            </span>
            {days !== null && (
              <span className="text-gray-500">{days}d left</span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
            <span>{project.backerCount} backers</span>
            <span className="font-medium text-[#7ED957]">{percent}%</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
