

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation } from "swiper/modules"
import DeviceCard from './DeviceCard'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"

function SeriesSection({ series, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-16"
    >
      <div className="flex items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{series?.name}</h2>
        <div className="h-0.5 flex-grow ml-6 bg-gradient-to-r from-[#34c5f1] to-transparent"></div>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        navigation={true}
        className="device-swiper"
        breakpoints={{
          0: { slidesPerView: 1.2 },
          480: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
        }}
      >
        {series?.devices.map((device) => (
          <SwiperSlide key={device.id} className="!w-auto">
            <DeviceCard device={device} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  )
}

export default SeriesSection