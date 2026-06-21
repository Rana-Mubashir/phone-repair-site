"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star } from "lucide-react"
import CountUp from "react-countup"
import RatingSummary from "./RatingSummary"
import FeaturedTestimonial from "./FeaturedTestimonial"
import TestimonialsCarousel from "./TestimonialsCarousel"
import { testimonials, reviewStats } from "@/data/testimonials"

function Main() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.06 })

  const activeTestimonial = testimonials[activeIndex] ?? testimonials[0]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-[#f8fafc] py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#34c5f1]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[#a855f7]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#34c5f1]/20 bg-white px-4 py-1.5 text-sm font-semibold text-[#1ab5e4] shadow-sm">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            Customer Reviews
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Real stories from{" "}
            <span className="bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent">
              real repairs
            </span>
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#34c5f1] to-[#a855f7]" />
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            From water-damaged phones to cracked screens — hear why customers keep coming back
            to Tech Repair.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {[
            {
              label: (
                <>
                  {inView ? <CountUp end={reviewStats.average} decimals={1} duration={2} /> : "0.0"}
                  <Star className="ml-1 inline h-4 w-4 fill-amber-400 text-amber-400" />
                </>
              ),
              sub: "Average rating",
            },
            {
              label: (
                <>
                  {inView ? <CountUp end={reviewStats.totalReviews} duration={2.2} separator="," /> : "0"}+
                </>
              ),
              sub: "Total reviews",
            },
            {
              label: (
                <>
                  {inView ? <CountUp end={reviewStats.recommendPercent} duration={2} /> : "0"}%
                </>
              ),
              sub: "Would recommend",
            },
          ].map(({ label, sub }) => (
            <div
              key={sub}
              className="flex min-w-[140px] flex-col items-center rounded-2xl border border-white/80 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-sm"
            >
              <p className="text-2xl font-bold text-gray-900">{label}</p>
              <p className="mt-1 text-xs font-medium text-gray-500">{sub}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(300px,360px)_1fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <RatingSummary />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex min-w-0 flex-col"
          >
            <FeaturedTestimonial testimonial={activeTestimonial} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="mt-12 lg:mt-16"
        >
          <TestimonialsCarousel
            activeTestimonialId={activeTestimonial.id}
            onActiveIndexChange={setActiveIndex}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Main
