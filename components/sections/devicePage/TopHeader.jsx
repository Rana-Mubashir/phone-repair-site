import { motion } from "framer-motion"

function DeviceHeader() {
  return (
    <div className="relative bg-gradient-to-r from-[#34c5f1] to-[#a855f7] py-20 overflow-hidden">
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
          <div className="h-1 w-24 bg-gradient-to-r from-white to-purple-200 rounded-full mx-auto mb-6"></div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Find your specific device model to get the perfect repair service tailored to your needs.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default DeviceHeader