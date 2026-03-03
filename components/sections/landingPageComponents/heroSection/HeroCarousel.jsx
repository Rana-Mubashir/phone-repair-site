"use client"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import { ChevronRight, Search, ArrowRight, Smartphone, MapPin } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    src: "https://img.freepik.com/free-photo/checking-current-laptop-circuit-board_1098-13759.jpg",
    alt: "Laptop circuit board repair",
  },
  {
    src: "https://media.istockphoto.com/id/625135580/photo/laptop-disassembling-with-screwdriver-at-repair.jpg?s=1024x1024&w=is&k=20&c=SRQy9lxXhn2mHAthxIRBht3HLCRc6os5lfrOgSj3TuA=",
    alt: "Laptop disassembly repair",
  },
  {
    src: "https://images.foolproofonline.info/images/repair_computer.m3-w800-16-9.jpg",
    alt: "Computer repair service",
  },
]

const HeroCarousel = () => {
  const [searchValue, setSearchValue] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative w-full h-[400px] sm:h-[650px] md:h-[600px] lg:h-[650px] xl:h-[600px] 2xl:h-[650px] overflow-hidden">
      {/* Navigation buttons */}
      <div
        className="absolute top-1/2 left-4 md:left-6 z-10 transform -translate-y-1/2 opacity-0 transition-opacity duration-500"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <button className="prev-btn bg-white/10 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg border border-white/20 group">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 rotate-180 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>
      <div
        className="absolute top-1/2 right-4 md:right-6 z-10 transform -translate-y-1/2 opacity-0 transition-opacity duration-500"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <button className="next-btn bg-white/10 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg border border-white/20 group">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass:
            "inline-block w-2 h-2 bg-white/50 rounded-full mx-1.5 transition-all duration-300 cursor-pointer",
          bulletActiveClass: "!w-8 !bg-white",
        }}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        effect="fade"
        loop
        className="w-full h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Image with zoom effect on active slide */}
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-[10000ms] ease-out"
              style={{ transform: activeIndex === index ? "scale(1.05)" : "scale(1)" }}
            >
              <img src={slide.src || "/placeholder.svg"} alt={slide.alt} className="w-full h-full object-cover" />
            </div>

            {/* Gradient overlay with improved colors */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50">
              <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row h-full items-center justify-center lg:justify-between gap-6 lg:gap-8 py-8 lg:py-12">
                  {/* Left column - Text content with animations */}
                  <div className="w-full lg:w-1/2 text-left space-y-4 lg:space-y-6 lg:pr-8 mt-8 lg:mt-0">
                    <div
                      className="space-y-2 lg:space-y-3 opacity-0 transform translate-y-4 transition-all duration-1000 delay-300"
                      style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(1rem)" }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium tracking-wide shadow-lg shadow-purple-700/20">
                          Professional Repair Service
                        </span>
                        <div className="h-px bg-gradient-to-r from-white/40 to-transparent flex-grow"></div>
                      </div>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
                        Expert Device{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                          Repair
                        </span>{" "}
                        Solutions
                      </h1>
                    </div>

                    <p
                      className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-xl opacity-0 transform translate-y-4 transition-all duration-1000 delay-500"
                      style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(1rem)" }}
                    >
                      Get your devices fixed by certified technicians with quick turnaround times and quality guaranteed
                      repairs. We specialize in all major brands and models.
                    </p>

                    <div
                      className="flex flex-wrap gap-3 lg:gap-4 pt-1 lg:pt-2 opacity-0 transform translate-y-4 transition-all duration-1000 delay-700"
                      style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(1rem)" }}
                    >
                      <Link href='/repair-services'>
                        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl text-sm lg:text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-indigo-600/30 flex items-center gap-2 group">
                          <span>Start Repair</span>
                          <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </Link>
                      <Link href='/about-us'>
                      <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl text-sm lg:text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900">
                        Our Services
                      </button>
                      </Link>
                    </div>
                  </div>

                  {/* Right column - Search box with animations */}
                  <div
                    className="w-full lg:w-5/12 opacity-0 transform translate-y-4 transition-all duration-1000 delay-900 hidden md:block"
                    style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(1rem)" }}
                  >
                    <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl lg:rounded-2xl p-5 lg:p-8 border border-white/20 shadow-2xl relative overflow-hidden group">
                      {/* Decorative elements */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl"></div>
                      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl"></div>

                      <div className="relative">
                        <h3 className="text-white text-xl lg:text-2xl font-bold mb-1 lg:mb-2">Find Your Device Repair</h3>
                        <p className="text-gray-300 text-sm lg:text-base mb-4 lg:mb-6">Quick, reliable fixes for all your devices</p>

                        <div className="space-y-4 lg:space-y-6">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                              <Search className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                              placeholder="What device needs repair?"
                              className="w-full bg-white/90 text-gray-900 border-0 rounded-xl pl-10 lg:pl-12 p-3 lg:p-4 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-sm lg:text-base"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-3 lg:gap-4">
                            <div className="flex items-center space-x-3 lg:space-x-4 text-white bg-white/10 hover:bg-white/20 rounded-xl p-3 lg:p-4 transition-all duration-300 cursor-pointer group/item">
                              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 lg:p-3 rounded-lg transition-colors duration-300 shadow-lg">
                                <Smartphone className="h-5 w-5 lg:h-6 lg:w-6 group-hover/item:scale-110 transition-transform duration-300" />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm lg:text-base">Express Diagnosis</h4>
                                <p className="text-xs lg:text-sm text-gray-300">Get a quick assessment of your device</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 lg:space-x-4 text-white bg-white/10 hover:bg-white/20 rounded-xl p-3 lg:p-4 transition-all duration-300 cursor-pointer group/item">
                              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 lg:p-3 rounded-lg transition-colors duration-300 shadow-lg">
                                <MapPin className="h-5 w-5 lg:h-6 lg:w-6 group-hover/item:scale-110 transition-transform duration-300" />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm lg:text-base">Find Service Center</h4>
                                <p className="text-xs lg:text-sm text-gray-300">Locate repair centers near you</p>
                              </div>
                            </div>
                          </div>

                          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-600/30 text-sm lg:text-lg flex items-center justify-center space-x-2 group/btn">
                            <span>Start Your Repair</span>
                            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination with improved styling */}
      <div
        className="custom-pagination absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex justify-center opacity-0 transition-opacity duration-1000 delay-1000"
        style={{ opacity: isLoaded ? 1 : 0 }}
      ></div>
    </div>
  )
}

export default HeroCarousel