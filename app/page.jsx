import React from 'react'
import Hero from '../components/sections/landingPageComponents/heroSection/Main'
import CategorySection from '../components/sections/landingPageComponents/categorySection/Main'
import Aboutus from '../components/sections/landingPageComponents/aboutus/Main'
import CounterSection from '../components/sections/landingPageComponents/counterSection/Main'
import Brands from '../components/sections/landingPageComponents/brands/Main'
import Testimonials from '../components/sections/landingPageComponents/testimonials/Main'
import WorkAndContactSection from '../components/sections/landingPageComponents/works&contactus/Main'
import ChatBot from '../components/sections/landingPageComponents/chatbot/ChatBot'
function page() {
  return (
    <div>
      <Hero />
      <CategorySection />
      <Aboutus />
      <CounterSection />
      {/* <WorkAndContactSection /> */}
      <Testimonials />
      <ChatBot />
      {/* <Brands /> */}
    </div>
  )
}

export default page
