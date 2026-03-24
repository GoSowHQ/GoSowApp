"use client";

import { motion } from "framer-motion";
import { Lightbulb, Rocket, Users, DollarSign } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Share your idea",
    description:
      "Create a compelling campaign page with your project details, goals, and reward tiers for backers.",
    step: "01",
  },
  {
    icon: Users,
    title: "Build your community",
    description:
      "Share your project with the world. Engage backers with updates and build momentum.",
    step: "02",
  },
  {
    icon: DollarSign,
    title: "Get funded",
    description:
      "Receive secure payments from backers who believe in your vision. No hidden fees.",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Ship your product",
    description:
      "Build and deliver your project. Keep your backers updated on every milestone.",
    step: "04",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#7ED957] tracking-wide uppercase">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 tracking-tight">
            How it works
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            From idea to funded project in four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-px bg-gray-200" />
              )}

              <div className="relative bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all duration-300">
                <span className="text-xs font-mono text-gray-300 absolute top-6 right-6">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-[#7ED957]/10 flex items-center justify-center mb-5">
                  <step.icon size={22} className="text-[#7ED957]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
