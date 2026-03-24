"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "GoSOW helped us raise $50K in just two weeks. The tech community here actually understands what you're building.",
    name: "Sarah Chen",
    role: "Founder, NeuralDB",
    avatar: "SC",
    color: "bg-emerald-500",
  },
  {
    quote:
      "As an indie developer, finding backers who believe in developer tools is hard. GoSOW changed that completely.",
    name: "Marcus Rivera",
    role: "Creator, DevStack CLI",
    avatar: "MR",
    color: "bg-sky-500",
  },
  {
    quote:
      "The platform is beautifully designed and the community is incredibly supportive. Best crowdfunding experience I've had.",
    name: "Aisha Patel",
    role: "Backer & Open Source Advocate",
    avatar: "AP",
    color: "bg-[#7ED957]",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#7ED957] tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 tracking-tight">
            Loved by creators
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Hear from the builders and backers who make GoSOW special
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 border border-gray-100"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="text-[#7ED957] fill-[#7ED957]"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-semibold">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
