"use client"
import Work from "./Work"
import ContactUs from "./ContactUs"
import { motion } from "framer-motion"

function Main() {
  return (
    <div className="relative  overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-[#34c5f1]/5 -z-10"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-[#34c5f1]/5 -z-10"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex flex-col lg:flex-row justify-between px-6 md:px-10 py-20 gap-10"
      >
        <Work />
        <ContactUs />
      </motion.div>
    </div>
  )
}

export default Main
