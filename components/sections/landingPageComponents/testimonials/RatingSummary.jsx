"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { Star } from "lucide-react"
import { ratingBreakdown, reviewStats, trustHighlights } from "@/data/testimonials"

function RatingSummary() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#152344] via-[#121e3a] to-[#0e1a36] p-7 shadow-xl shadow-[#152344]/20 sm:p-8 lg:sticky lg:top-24"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#34c5f1]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#a855f7]/15 blur-3xl" />

      <div className="relative">
        <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#34c5f1]">
              Overall rating
            </p>
            <div className="mt-2 flex items-end justify-center gap-2 sm:justify-start">
              <span className="text-6xl font-bold leading-none text-white">
                {inView ? (
                  <CountUp end={reviewStats.average} decimals={1} duration={2} />
                ) : (
                  "0.0"
                )}
              </span>
              <span className="mb-2 text-lg font-medium text-slate-400">/ 5</span>
            </div>
            <div className="mt-3 flex justify-center gap-1 sm:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-400">
              {reviewStats.totalReviews.toLocaleString()}+ verified reviews
            </p>
          </div>

          <div className="hidden h-24 w-px shrink-0 bg-slate-700/80 sm:block" />

          <div className="w-full flex-1 space-y-2.5">
            {ratingBreakdown.map(({ stars, percent }, index) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-3 text-xs font-medium text-slate-400">{stars}</span>
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700/60">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${percent}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#34c5f1] to-[#a855f7]"
                  />
                </div>
                <span className="w-8 text-right text-xs text-slate-500">{percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-slate-700/60 pt-6">
          {trustHighlights.map(({ label, description }) => (
            <div
              key={description}
              className="rounded-xl border border-slate-700/50 bg-slate-800/30 px-4 py-3 text-center backdrop-blur-sm"
            >
              <p className="text-lg font-bold text-white">{label}</p>
              <p className="text-xs text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RatingSummary
