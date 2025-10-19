"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Smartphone, Settings, PenToolIcon as Tool, Shield, Zap, CheckCircle } from "lucide-react"
import CountUp from "react-countup"

function Aboutus() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-8 w-full lg:w-1/2 min-h-[800px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading with animated underline */}
      <div>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="h-10 w-2 bg-[#34c5f1] rounded-full"></div>
          <h1 className="text-4xl font-bold">About Us</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-slate-500 mt-4 leading-relaxed"
        >
          Our commitment to bring professionalism, good service & trust to the Phone repair service & maintenance
          business. We take immense pride in sending some of the most professional technicians to your phone to fix
          things that aren't working.
        </motion.p>
      </div>

      {/* Interactive service showcase */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {[
          { icon: <Smartphone className="size-8" />, label: "Screen Repair" },
          { icon: <Settings className="size-8" />, label: "Hardware Fix" },
          { icon: <Tool className="size-8" />, label: "Diagnostics" },
          { icon: <Shield className="size-8" />, label: "Data Recovery" },
          { icon: <Zap className="size-8" />, label: "Battery Replace" },
          { icon: <CheckCircle className="size-8" />, label: "Quality Check" },
        ].map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] group"
          >
            <div className="p-3 rounded-full bg-[#34c5f1]/10 text-[#34c5f1] group-hover:bg-[#34c5f1] group-hover:text-white transition-colors duration-300">
              {service.icon}
            </div>
            <p className="mt-3 font-medium text-center">{service.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated stats section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#34c5f1] to-[#2bb3df] text-white p-8 rounded-2xl"
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10"></div>
        <div className="absolute bottom-0 left-10 w-20 h-20 rounded-full bg-white/5"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6">Our Expertise in Numbers</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-4xl font-bold mb-1">{inView && <CountUp end={8} duration={2} />}+</div>
              <p className="text-white/80">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">
                {inView && <CountUp end={15000} separator="," duration={2.5} />}+
              </div>
              <p className="text-white/80">Devices Repaired</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vision statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative bg-slate-50 p-6 rounded-xl border-l-4 border-[#34c5f1]"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V21L17 19L14 21L12 20L10 21L7 19L3 21Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-medium mb-3">Our Vision</h3>
        <p className="text-slate-600 mb-4">Save time, Save money, With Quality Phone Repair Service</p>
        <p className="text-xl font-medium">
          <span className="text-[#34c5f1]">Purchase - RepairPlus</span> for all your device needs
        </p>
      </motion.div>

      {/* Company values */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-[#34c5f1] rounded-full"></span>
          Our Core Values
        </h3>

        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="text-[#34c5f1] size-5 mt-0.5 flex-shrink-0" />
            <p className="text-slate-600">
              <span className="font-medium text-slate-800">Excellence</span> - We strive for perfection in every repair
            </p>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="text-[#34c5f1] size-5 mt-0.5 flex-shrink-0" />
            <p className="text-slate-600">
              <span className="font-medium text-slate-800">Integrity</span> - Honest pricing and transparent service
            </p>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="text-[#34c5f1] size-5 mt-0.5 flex-shrink-0" />
            <p className="text-slate-600">
              <span className="font-medium text-slate-800">Innovation</span> - Using the latest technology and
              techniques
            </p>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default Aboutus
