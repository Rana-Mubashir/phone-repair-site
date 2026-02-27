"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, Mail, MessageSquare, Phone, User, CheckCircle } from "lucide-react"

function ContactUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: "",
          email: "",
          phone: "",
          date: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  const inputClasses =
    "w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34c5f1] focus:border-transparent transition-all duration-200"

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-10 w-full lg:w-1/2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Heading with animated underline */}
      <div className="relative">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="h-10 w-2 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h1 className="text-4xl font-bold">Make An Appointment</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-slate-500 mt-4 leading-relaxed"
        >
          Schedule a repair service with our expert technicians. We'll get back to you within 24 hours.
        </motion.p>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-md"
      >
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-green-500 size-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Appointment Request Sent!</h3>
            <p className="text-slate-600">We'll contact you shortly to confirm your appointment.</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5" />
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  className={inputClasses}
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5" />
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="Phone*"
                  className={inputClasses}
                  required
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5" />
                <input
                  type="date"
                  name="date"
                  value={formState.date}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 text-slate-400 size-5" />
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Message*"
                className={`${inputClasses} min-h-[120px] pt-3`}
                rows={4}
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`w-fit text-white bg-gradient-to-r from-blue-400 to-purple-500  py-3 px-8 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${isSubmitting ? "opacity-80" : ""}`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Now"
              )}
            </motion.button>
          </>
        )}
      </motion.form>
    </motion.div>
  )
}

export default ContactUs
