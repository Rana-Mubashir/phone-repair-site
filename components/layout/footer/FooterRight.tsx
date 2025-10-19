import { ChevronRight, Home, Phone, Mail, Clock, ArrowRight } from "lucide-react"

function FooterRight() {
  const servicesData = [
    "Smart Phone Repair",
    "Tablets & iPad Repair",
    "Desktop & Laptop",
    "Game System Repair",
    "LCD & LED TV Repair",
    "MP3 & MP4 Player",
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-[#121e3a]/80 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700/30">
      {/* Services Column */}
      <div className="flex flex-col gap-6">
        <h2 className='font-bold text-xl text-white relative after:content-[""] after:absolute after:w-12 after:h-1 after:bg-[#34c5f1] after:left-0 after:bottom-[-8px] after:rounded-full'>
          OUR SERVICES
        </h2>
        <div className="flex flex-col gap-3 text-slate-400">
          {servicesData.map((service) => (
            <div className="flex items-center gap-2 group cursor-pointer" key={service}>
              <ChevronRight
                size={16}
                className="text-[#34c5f1] group-hover:translate-x-1 transition-transform duration-300"
              />
              <p className="group-hover:text-[#34c5f1] transition-colors duration-300">{service}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Column */}
      <div className="flex flex-col gap-6">
        <h2 className='font-bold text-xl text-white relative after:content-[""] after:absolute after:w-12 after:h-1 after:bg-[#34c5f1] after:left-0 after:bottom-[-8px] after:rounded-full'>
          NEWSLETTER
        </h2>
        <div className="flex flex-col gap-4 text-slate-400">
          <p>Subscribe to our newsletter!</p>
          <form className="flex items-center">
            <div className="relative flex-grow">
              <input
                type="email"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-l-md py-2 px-3 text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#34c5f1] placeholder:text-slate-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#34c5f1] hover:bg-[#2ab8e4] text-white p-2 rounded-r-md transition-colors duration-300"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} />
            </button>
          </form>
          <p className="text-xs text-slate-500">We don't send spam and your email is confidential.</p>
        </div>
      </div>

      {/* Contact Info Column */}
      <div className="flex flex-col gap-6">
        <h2 className='font-bold text-xl text-white relative after:content-[""] after:absolute after:w-12 after:h-1 after:bg-[#34c5f1] after:left-0 after:bottom-[-8px] after:rounded-full'>
          CONTACT INFO
        </h2>
        <div className="flex flex-col gap-4 text-slate-400">
          <div className="flex gap-3 group">
            <div className="text-[#34c5f1] mt-1">
              <Home size={18} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white group-hover:text-[#34c5f1] transition-colors duration-300">
                32, Breaking Street,
              </p>
              <p>2nd cros, Newyork, USA 10002</p>
            </div>
          </div>

          <div className="flex gap-3 group">
            <div className="text-[#34c5f1] mt-1">
              <Phone size={18} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white group-hover:text-[#34c5f1] transition-colors duration-300">Call Us</p>
              <p>+321 4567 89 012 & 79 023</p>
            </div>
          </div>

          <div className="flex gap-3 group">
            <div className="text-[#34c5f1] mt-1">
              <Mail size={18} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white group-hover:text-[#34c5f1] transition-colors duration-300">Mail Us</p>
              <p className="hover:text-[#34c5f1] transition-colors duration-300 cursor-pointer">
                Support@Repairplus.com
              </p>
            </div>
          </div>

          <div className="flex gap-3 group">
            <div className="text-[#34c5f1] mt-1">
              <Clock size={18} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white group-hover:text-[#34c5f1] transition-colors duration-300">
                Opening Time
              </p>
              <p>Mon - Sat: 09.00am to 18.00pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterRight

