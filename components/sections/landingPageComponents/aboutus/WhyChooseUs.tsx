"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CheckCircle, Clock, Award, ThumbsUp, Smartphone, Wrench, ShieldCheck } from "lucide-react"

function WhyChooseUs() {
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

  const reasons = [
    {
      icon: <CheckCircle className="text-blue-600 size-6" />,
      title: "Certified Technicians",
      description: "Our repair specialists undergo rigorous training and certification.",
    },
    {
      icon: <Clock className="text-blue-600 size-6" />,
      title: "Quick Turnaround",
      description: "Most repairs are completed within 24 hours, often while you wait.",
    },
    {
      icon: <Award className="text-blue-600 size-6" />,
      title: "Quality Guarantee",
      description: "All repairs come with our 90-day warranty for your peace of mind.",
    },
    {
      icon: <ThumbsUp className="text-blue-600 size-6" />,
      title: "Competitive Pricing",
      description: "We offer the best value without compromising on quality.",
    },
  ]

  return (
    <motion.div
      className="flex flex-col gap-8 w-full lg:w-1/2 min-h-[800px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Heading with animated underline */}
      <div>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="h-10 w-2 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Us
          </h1>
        </motion.div>
      </div>

      {/* Feature cards */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-4"
      >
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-purple-600 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 text-blue-600 transition-all duration-300">
                {reason.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {reason.title}
                </h3>
                <p className="text-slate-500">{reason.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Our Process Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-md border border-purple-100"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Repair Process
          </span>
        </h3>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium text-lg text-blue-600">Diagnosis</h4>
              <p className="text-slate-500">We thoroughly examine your device to identify all issues.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium text-lg text-purple-600">Transparent Quote</h4>
              <p className="text-slate-500">We provide a clear, no-obligation price quote for all repairs.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium text-lg text-blue-600">Expert Repair</h4>
              <p className="text-slate-500">Our certified technicians fix your device with precision.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
              4
            </div>
            <div>
              <h4 className="font-medium text-lg text-purple-600">Quality Testing</h4>
              <p className="text-slate-500">We thoroughly test your device before returning it to you.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services we offer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl"
      >
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Services We Offer
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 group hover:translate-x-1 transition-transform duration-200">
            <Smartphone className="text-purple-600 size-5" />
            <span className="text-slate-700 group-hover:text-blue-600 transition-colors">Screen Replacement</span>
          </div>
          <div className="flex items-center gap-2 group hover:translate-x-1 transition-transform duration-200">
            <Wrench className="text-blue-600 size-5" />
            <span className="text-slate-700 group-hover:text-purple-600 transition-colors">Hardware Repair</span>
          </div>
          <div className="flex items-center gap-2 group hover:translate-x-1 transition-transform duration-200">
            <ShieldCheck className="text-purple-600 size-5" />
            <span className="text-slate-700 group-hover:text-blue-600 transition-colors">Water Damage</span>
          </div>
          <div className="flex items-center gap-2 group hover:translate-x-1 transition-transform duration-200">
            <Award className="text-blue-600 size-5" />
            <span className="text-slate-700 group-hover:text-purple-600 transition-colors">Software Issues</span>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      {/*  */}
    </motion.div>
  )
}

export default WhyChooseUs