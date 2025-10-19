"use client"
import Aboutus from "./Aboutus"
import WhyChooseUs from "./WhyChooseUs"
import { motion } from "framer-motion"

function Main() {
  return (
    <div className="">
      {/* Background decorative elements */}
      <div className="absolute top-40 left-0 w-full h-[500px] -z-10 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#34c5f1]/5 -left-20 top-0"></div>
        <div className="absolute w-[200px] h-[200px] rounded-full bg-[#34c5f1]/10 right-10 bottom-10"></div>
        <div className="absolute w-[150px] h-[150px] rounded-full bg-gradient-to-r from-[#34c5f1]/5 to-[#34c5f1]/10 left-1/2 top-1/3"></div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto py-20 px-6 md:px-10"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          <Aboutus />
          <WhyChooseUs />
        </div>
      </motion.div>
    </div>
  )
}

export default Main
