import { motion } from "framer-motion"
import {  Search } from "lucide-react"

function DeviceHeader() {
  return (
    <div className="relative bg-gradient-to-r from-[#0891b2] to-[#34c5f1] py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white opacity-10"></div>
        <div className="absolute right-40 bottom-10 h-32 w-32 rounded-full bg-white opacity-10"></div>
        <div className="absolute left-20 top-20 h-48 w-48 rounded-full bg-white opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Select Your Device</h1>
          <div className="h-1 w-24 bg-white rounded-full mx-auto mb-6"></div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Find your specific device model to get the perfect repair service tailored to your needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-md mx-auto"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for your device..."
              className="w-full py-3 px-5 pr-12 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#34c5f1]/50"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DeviceHeader