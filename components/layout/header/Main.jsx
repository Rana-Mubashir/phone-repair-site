'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Home,
  Clock,
  Mail,
  Phone,
  Search,
  Menu,
  X,
} from "lucide-react";
import RepairServicesDropDown from './RepairServicesDropDown'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdown, setISDropDown] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    {
      name: "Home",
      link: '/'
    },
    {
      name: "Repair & Services",
      link: 'repair-services'
    },
    {
      name: "Stories",
      link: 'stories'
    },
    {
      name: "About Us",
      link: 'about-us'
    },
    {
      name: "Contact Us",
      link: 'contact-us'
    }
  ]

  return (
    <header className="w-full shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#34c5f1] to-[#1e90ff] px-6 py-3 flex flex-col md:flex-row      justify-between items-center ">
        <p className="text-white font-medium text-center text-sm md:text-base">
          Welcome to Repairplus Experts - Your Trusted Repair Shop
        </p>
        <div className="flex gap-3">
          {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
            <Link key={index} href="#" className="text-white hover:text-gray-200 transition-transform transform hover:scale-110">
              <Icon size={20} />
            </Link>
          ))}
        </div>
      </div>

      {/* Middle Section */}
      <div className=" hidden md:flex px-6 md:px-12 py-3  flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/">
          <Image
            src="https://ik.imagekit.io/e6xhkk2f6/phoneRepairLogo.png"
            alt="RepairPlus Logo"
            width={180}
            height={100}
            className="h-auto"
          />
        </Link>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { icon: Home, title: "321, Breaking Street", desc: "New York, USA 10002" },
            { icon: Clock, title: "Opening Time", desc: "Mon - Sat: 09.00 to 18.00" },
            { icon: Mail, title: "Mail Us", desc: "Support@Repairplus.com" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="p-3 border-2 border-gray-300 rounded-full bg-gray-100 hover:bg-[#34c5f1] transition-colors">
                <item.icon size={22} className="text-gray-700 hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#152344] relative w-full">
        <div className="px-6 md:px-12 flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-3 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href='/' className="text-white text-lg font-medium hover:text-[#34c5f1] transition-colors">
              Home
            </Link>
            <div className=""
              onMouseEnter={() => setISDropDown(true)}
              onMouseLeave={() => setISDropDown(false)}
            >
              <Link href='/repair-services' className="text-white text-lg font-medium hover:text-[#34c5f1] transition-colors">
                Repair & Services
              </Link>
              {
                isDropdown && (
                  <RepairServicesDropDown />
                )
              }
            </div>
            <Link href='/stories' className="text-white text-lg font-medium hover:text-[#34c5f1] transition-colors">
              Stories
            </Link>
            <Link href='/about-us' className="text-white text-lg font-medium hover:text-[#34c5f1] transition-colors">
              About Us
            </Link>
            <Link href='/contact-us' className="text-white text-lg font-medium hover:text-[#34c5f1] transition-colors">
              Contact Us
            </Link>

          </nav>

          {/* Contact & Search */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#34c5f1]">
              <Phone size={24} className="animate-pulse" />
              <div>
                <p className="text-xs font-medium text-[#34c5f1]">Customer Care</p>
                <p className="text-white font-bold">1800-56-78-9012</p>
              </div>
            </div>
            <button className="bg-[#34c5f1] text-white p-3 rounded-full hover:bg-[#1e90ff] transition-colors hidden md:block">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-[#152344] z-50 transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden md:hidden`}
        >
          <div className="flex flex-col text-center py-4 border-t border-[#34c5f1]/20">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={`/${item.link}`}
                className="text-white py-3 font-medium hover:bg-[#34c5f1]/20 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}