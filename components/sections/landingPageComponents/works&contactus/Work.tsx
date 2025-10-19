"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"

function Work() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const beforeAfterPairs = [
    {
      before: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/before-1.jpg.webp",
      after: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/after-1.jpg.webp",
      label: "Screen Repair",
    },
    {
      before: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/before-2.jpg.webp",
      after: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/after-2.jpg.webp",
      label: "Water Damage",
    },
    {
      before: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/before-3.jpg.webp",
      after: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/after-3.jpg.webp",
      label: "Battery Replacement",
    },
    {
      before: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/before-4.jpg.webp",
      after: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/after-4.jpg.webp",
      label: "Button Repair",
    },
  ]

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-10 w-full lg:w-1/2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading with animated underline */}
      <div className="relative">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="h-10 w-2 bg-[#34c5f1] rounded-full"></div>
          <h1 className="text-4xl font-bold">Works Before & After</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-slate-500 mt-4 leading-relaxed"
        >
          See the difference our expert repair services make with these before and after examples.
        </motion.p>
      </div>

      {/* Before & After Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {beforeAfterPairs.map((pair, index) => (
          <motion.div key={index} variants={itemVariants} className="flex flex-col gap-3">
            <div className="relative group">
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-md w-1/2">
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                    Before
                  </div>
                  <img
                    src={pair.before || "/placeholder.svg"}
                    alt={`Before ${pair.label}`}
                    className="w-full h-[120px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="relative overflow-hidden rounded-md w-1/2">
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                    After
                  </div>
                  <img
                    src={pair.after || "/placeholder.svg"}
                    alt={`After ${pair.label}`}
                    className="w-full h-[120px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#34c5f1] text-white rounded-full p-1 shadow-lg">
                <ArrowRight className="size-4" />
              </div>
            </div>
            <p className="text-center font-medium text-slate-700">{pair.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Work
