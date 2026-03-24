"use client";

import { motion } from "framer-motion";
import { Globe, Zap, Shield, TrendingUp, Code, Heart } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Early Access",
    description: "Be the first to use groundbreaking tech products before anyone else.",
  },
  {
    icon: Code,
    title: "Support Open Source",
    description: "Help sustain the open-source projects that power the modern web.",
  },
  {
    icon: TrendingUp,
    title: "Shape the Future",
    description: "Your backing helps decide which innovations reach the market.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Fund solutions that tackle real-world problems across the globe.",
  },
  {
    icon: Shield,
    title: "Transparent & Secure",
    description: "Every dollar is tracked. Secure payments powered by Stripe.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "Join a community of builders, dreamers, and tech enthusiasts.",
  },
];

export default function WhyFundTech() {
  return (
    <section id="why-fund" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#7ED957] tracking-wide uppercase">
            Why GoSOW
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 tracking-tight">
            Why fund tech?
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Back the projects that will define the next decade of technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#7ED957]/10 flex items-center justify-center mb-4">
                <reason.icon size={20} className="text-[#7ED957]" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
