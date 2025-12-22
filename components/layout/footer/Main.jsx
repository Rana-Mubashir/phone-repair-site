import FooterRight from "./FooterRight"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

function Footer() {
  return (
    <div className="bg-gradient-to-b from-[#152344] to-[#0e1a36] w-full px-4 md:px-8 lg:px-14 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8">
          <div className="w-full lg:w-1/3 flex flex-col gap-6 text-slate-300">
            <img 
            src="https://ik.imagekit.io/e6xhkk2f6/phoneRepairLogoWhite.png" 
            alt="logo" 
            className="w-40 h-auto" 
            />
            <p className="text-sm md:text-base leading-relaxed">
              Repairplus brings 41 years of Digital Repairs experience right to your Device. Our Technicians are
              equipped to help you with solutions that work best.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              Our commitment to bring professionalism, good service & trust to the Phone repair service & maintenance
              business.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-slate-400 hover:text-[#34c5f1] transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <Facebook size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-[#34c5f1] transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <Instagram size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-[#34c5f1] transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <Twitter size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-[#34c5f1] transition-colors duration-300">
                <span className="sr-only">YouTube</span>
                <Youtube size={24} />
              </a>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <FooterRight />
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-6 pt-6">
          <p className="text-center text-slate-400 text-sm md:text-base">
            Copyrights © {new Date().getFullYear()} All Rights Reserved by{" "}
            <span className="text-[#34c5f1] hover:text-[#5ad0f8] transition-colors duration-300 cursor-pointer">
              Indepth Solutions
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer

