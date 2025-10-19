import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Search } from "lucide-react"
import Link from "next/link"

function DeviceCard({ device }) {
  return (
    <Link href={`/repair-options/${device._id}`}>
      <motion.div
        whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        <div className="p-6 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white h-48">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={device?.image}
            alt={device?.name}
            className="h-36 w-36 object-contain"
          />
        </div>
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">{device?.name}</h3>
            <ChevronRight size={16} className="text-[#34c5f1]" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default DeviceCard