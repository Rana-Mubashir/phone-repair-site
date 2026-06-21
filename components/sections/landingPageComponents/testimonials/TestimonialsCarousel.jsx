"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TestimonialsCard from "./TestimonialsCard"
import { testimonials } from "@/data/testimonials"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

function TestimonialsCarousel({ activeTestimonialId, onActiveIndexChange }) {
  const [swiperReady, setSwiperReady] = useState(false)

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-between px-1">
        <p className="text-sm font-semibold text-gray-500">Browse all reviews</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous review"
            className="testimonials-prev flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-[#34c5f1]/40 hover:text-[#1ab5e4] disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            className="testimonials-next flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-[#34c5f1]/40 hover:text-[#1ab5e4] disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        spaceBetween={20}
        slidesPerView={1.15}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 2,
          slideShadows: false,
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{ prevEl: ".testimonials-prev", nextEl: ".testimonials-next" }}
        pagination={{ clickable: true, el: ".testimonials-pagination" }}
        onSwiper={() => setSwiperReady(true)}
        onSlideChange={(swiper) => onActiveIndexChange(swiper.realIndex)}
        breakpoints={{
          640: { slidesPerView: 1.4, spaceBetween: 20 },
          768: { slidesPerView: 1.8, spaceBetween: 24 },
          1024: { slidesPerView: 2.2, spaceBetween: 24 },
          1280: { slidesPerView: 2.6, spaceBetween: 28 },
        }}
        className={`testimonials-swiper transition-opacity duration-500 ${swiperReady ? "opacity-100" : "opacity-0"}`}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={item.id} className="!h-auto">
            <TestimonialsCard {...item} isActive={item.id === activeTestimonialId} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="testimonials-pagination mt-6 flex justify-center gap-2" />
    </div>
  )
}

export default TestimonialsCarousel
