"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-20 md:px-16 text-center"
        >
          {/* Background gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7ED957]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7ED957]/10 rounded-full blur-[100px]" />

          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Ready to fund
              <br />
              the future?
            </h2>
            <p className="text-gray-400 mt-5 text-lg max-w-xl mx-auto">
              Whether you&apos;re a creator with a bold idea or a backer looking
              to support innovation, GoSOW is where it starts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button className="group flex items-center gap-2 px-8 py-4 bg-[#7ED957] text-gray-900 rounded-full text-sm font-semibold hover:bg-[#6ec44a] transition-colors">
                Start a Campaign
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="px-8 py-4 border border-gray-700 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Explore Projects
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
