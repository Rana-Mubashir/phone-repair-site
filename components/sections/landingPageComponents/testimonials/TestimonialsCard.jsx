"use client"

import { motion } from "framer-motion"
import { Star, MapPin } from "lucide-react"

const TestimonialsCard = ({
  name,
  initials,
  location,
  review,
  rating,
  device,
  service,
  date,
  isActive = false,
}) => {
  return (
    <motion.article
      layout
      className={`group relative flex h-full min-h-[220px] cursor-pointer flex-col rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
        isActive
          ? "scale-[1.02] border-[#34c5f1]/40 bg-white shadow-xl shadow-[#34c5f1]/10"
          : "border-gray-100/90 bg-white/90 shadow-sm hover:border-[#34c5f1]/25 hover:shadow-md"
      }`}
    >
      <div
        className={`absolute left-0 top-6 h-10 w-1 rounded-r-full bg-gradient-to-b from-[#34c5f1] to-[#a855f7] transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
      />

      <div className="mb-4 flex items-center justify-between gap-3 pl-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {date}
        </span>
      </div>

      <blockquote className="mb-5 line-clamp-4 flex-1 pl-2 text-sm leading-relaxed text-gray-600">
        &ldquo;{review}&rdquo;
      </blockquote>

      <div className="mb-4 flex flex-wrap gap-1.5 pl-2">
        <span className="rounded-md bg-[#34c5f1]/10 px-2.5 py-1 text-[11px] font-semibold text-[#1ab5e4]">
          {device}
        </span>
        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
          {service}
        </span>
      </div>

      <div className="flex items-center gap-3 border-t border-gray-100 pt-4 pl-2">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-br from-[#34c5f1] to-[#a855f7] shadow-md shadow-[#34c5f1]/20"
              : "bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-[#34c5f1] group-hover:to-[#a855f7]"
          }`}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{name}</p>
          <p className="flex items-center gap-1 truncate text-xs text-gray-500">
            <MapPin className="h-3 w-3 shrink-0" />
            {location}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export default TestimonialsCard
