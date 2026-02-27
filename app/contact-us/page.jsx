"use client"
import { motion } from "framer-motion"
// import { Calendar } from "@/components/ui/calendar"

import { useInView } from "react-intersection-observer"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Smartphone,
  MessageSquare,
  User,
  Send,
  Facebook,
  Twitter,
  Instagram,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    device: "",
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
          device: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [mapRef, mapInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [hoursRef, hoursInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white py-20 px-6 md:px-10 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Get in Touch
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={heroInView ? { width: 100 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-1 w-24 bg-gradient-to-r from-white to-purple-200 rounded-full mb-6"
            ></motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 max-w-lg"
            >
              Have questions about our repair services? Need to book an appointment? Our team is ready to help you get
              your device back to perfect working condition.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Contact Information & Form Section */}
      <motion.section
        ref={contactRef}
        initial={{ opacity: 0, y: 30 }}
        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto py-16 px-6 md:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="inline-block w-2 h-8 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full mr-3"></span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 text-[#34c5f1] w-fit mb-4">
                    <Phone className="size-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-1">Phone</h3>
                  <p className="text-slate-500">Customer Support</p>
                  <a href="tel:+15551234567" className="bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent font-medium hover:from-[#2ba8d0] hover:to-[#9333ea] transition-all duration-300">
                    +1 (555) 123-4567
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 text-[#a855f7] w-fit mb-4">
                    <Mail className="size-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-1">Email</h3>
                  <p className="text-slate-500">Send us a message</p>
                  <a href="mailto:support@repairplus.com" className="bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent font-medium hover:from-[#2ba8d0] hover:to-[#9333ea] transition-all duration-300">
                    support@repairplus.com
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 text-[#34c5f1] w-fit mb-4">
                    <MapPin className="size-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-1">Location</h3>
                  <p className="text-slate-500">Visit our store</p>
                  <address className="not-italic text-slate-700">
                    123 Repair Street
                    <br />
                    Tech City, TC 12345
                  </address>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 text-[#a855f7] w-fit mb-4">
                    <Clock className="size-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-1">Working Hours</h3>
                  <p className="text-slate-500">Mon - Fri: 9AM - 6PM</p>
                  <p className="text-slate-500">Sat: 10AM - 4PM</p>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-6 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full"></span>
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 text-[#34c5f1] hover:bg-gradient-to-r hover:from-[#34c5f1] hover:to-[#a855f7] hover:text-white transition-all duration-300"
                >
                  <Facebook className="size-5" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 text-[#a855f7] hover:bg-gradient-to-r hover:from-[#34c5f1] hover:to-[#a855f7] hover:text-white transition-all duration-300"
                >
                  <Twitter className="size-5" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 text-[#34c5f1] hover:bg-gradient-to-r hover:from-[#34c5f1] hover:to-[#a855f7] hover:text-white transition-all duration-300"
                >
                  <Instagram className="size-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="inline-block w-2 h-8 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full mr-3"></span>
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-green-500 size-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="text-slate-600 max-w-md">
                  Thank you for contacting us. Our team will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700 mb-1 block">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34c5f1] focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-1 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34c5f1] focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-1 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34c5f1] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="device" className="text-sm font-medium text-slate-700 mb-1 block">
                      Device Type
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5" />
                      <select
                        id="device"
                        name="device"
                        value={formState.device}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34c5f1] focus:border-transparent transition-all duration-200 bg-white"
                        required
                      >
                        <option value="">Select your device</option>
                        <option value="iphone">iPhone</option>
                        <option value="samsung">Samsung</option>
                        <option value="google">Google Pixel</option>
                        <option value="oneplus">OnePlus</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700 mb-1 block">
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-slate-400 size-5" />
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Please describe the issue with your device..."
                      className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34c5f1] focus:border-transparent transition-all duration-200 min-h-[120px]"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full md:w-auto text-white bg-gradient-to-r from-[#34c5f1] to-[#a855f7] py-3 px-8 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:from-[#2ba8d0] hover:to-[#9333ea] ${isSubmitting ? "opacity-80" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Map Section */}
      {/* <motion.section
        ref={mapRef}
        initial={{ opacity: 0, y: 30 }}
        animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto py-10 px-6 md:px-10"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="inline-block w-2 h-8 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full mr-3"></span>
          Find Us
        </h2>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1649760633247!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </motion.section> */}

      {/* Business Hours Section */}
      <motion.section
        ref={hoursRef}
        initial={{ opacity: 0, y: 30 }}
        animate={hoursInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto py-10 px-6 md:px-10"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="inline-block w-2 h-8 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full mr-3"></span>
          Business Hours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { day: "Monday", hours: "9:00 AM - 6:00 PM" },
            { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
            { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
            { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
            { day: "Friday", hours: "9:00 AM - 6:00 PM" },
            { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
            { day: "Sunday", hours: "Closed" },
          ].map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, y: 20 }}
              animate={hoursInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className={`bg-white p-4 rounded-lg shadow-sm flex justify-between items-center ${
                item.day === "Sunday" ? "border-l-4 border-red-400" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className={`size-5 ${item.day === "Sunday" ? "text-red-400" : "text-[#34c5f1]"}`} />
                <span className="font-medium">{item.day}</span>
              </div>
              <span className={`${item.day === "Sunday" ? "text-red-400" : "text-slate-600"}`}>{item.hours}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial={{ opacity: 0, y: 30 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto py-16 px-6 md:px-10"
      >
        <div className="bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Emergency Repair?</h2>
            <p className="text-white/90 text-lg mb-8">
              Don't wait! Our technicians are ready to help with your urgent device repairs. Same-day service available
              for most common issues.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+15551234567"
                className="bg-white bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent font-medium py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] flex items-center gap-2 border border-white text-white"
              >
                <Phone className="size-5 text-white" />
                <span>Call Now</span>
              </a>
              <a
                href="#booking"
                className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center gap-2"
              >
                {/* <Calendar className="size-5" /> */}
                <span>Book Appointment</span>
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}