"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Star, Quote, MapPin, Wrench } from "lucide-react"

function FeaturedTestimonial({ testimonial }) {
  if (!testimonial) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={testimonial.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white p-7 shadow-lg shadow-[#34c5f1]/5 sm:p-9"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#34c5f1]/5 via-transparent to-[#a855f7]/5" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#34c5f1] to-[#a855f7]" />

        <div className="relative flex flex-1 flex-col">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34c5f1]/15 to-[#a855f7]/15">
              <Quote className="h-6 w-6 text-[#1ab5e4]" strokeWidth={1.5} />
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <blockquote className="mb-8 flex-1 text-xl font-medium leading-relaxed text-gray-800 sm:text-[1.35rem] sm:leading-relaxed">
            &ldquo;{testimonial.review}&rdquo;
          </blockquote>

          <div className="flex flex-col gap-5 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34c5f1] to-[#a855f7] text-base font-bold text-white shadow-lg shadow-[#34c5f1]/25">
                {testimonial.initials}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{testimonial.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {testimonial.location}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 px-3.5 py-1.5 text-xs font-semibold text-gray-700">
                {testimonial.device}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-1.5 text-xs font-medium text-gray-600">
                <Wrench className="h-3 w-3" />
                {testimonial.service}
              </span>
              <span className="text-xs font-medium text-gray-400">{testimonial.date}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FeaturedTestimonial
