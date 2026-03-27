'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
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
      name: "About Us",
      link: 'about-us'
    },
    {
      name: "Contact Us",
      link: 'contact-us'
    }
  ]

  return (
    <header className="w-full shadow-md bg-white">
      {/* Top Bar - Now with dark text on light background */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-3 flex flex-col md:flex-row justify-between items-center">
        <p className="text-white font-medium text-center text-sm md:text-base">
          Welcome to Tech Repair - Your Trusted Repair Shop
        </p>
        <div className="flex gap-3">
          {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
            <Link key={index} href="#" className="text-white hover:text-gray-200 transition-transform transform hover:scale-110">
              <Icon size={20} />
            </Link>
          ))}
        </div>
      </div>

      {/* Main Navigation Bar - White background with dark text */}
      <div className="bg-white relative w-full border-b border-gray-200">
        <div className="px-6 md:px-12 flex items-center justify-between h-[63px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://ik.imagekit.io/e6xhkk2f6/phoneRepairLogo.png"
              alt="RepairPlus Logo"
              width={180}
              height={100}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-3 focus:outline-none hover:text-blue-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation - Dark text */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href='/' className="text-gray-700 text-lg font-medium hover:text-blue-500 transition-colors">
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setISDropDown(true)}
              onMouseLeave={() => setISDropDown(false)}
            >
              <Link href='/repair-services' className="text-gray-700 text-lg font-medium hover:text-blue-500 transition-colors">
                Repair & Services
              </Link>
              {/* {
                isDropdown && (
                  <RepairServicesDropDown />
                )
              } */}
            </div>
            <Link href='/about-us' className="text-gray-700 text-lg font-medium hover:text-blue-500 transition-colors">
              About Us
            </Link>
            <Link href='/contact-us' className="text-gray-700 text-lg font-medium hover:text-blue-500 transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Contact Info - Dark text */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-blue-500">
              <Phone size={24} className="animate-pulse" />
              <div>
                <p className="text-xs font-medium text-gray-500">Customer Care</p>
                <p className="text-gray-800 font-bold">+44 7700 900123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - White background with dark text */}
        <div
          className={`absolute top-full left-0 w-full bg-white z-50 transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden md:hidden border-b border-gray-200 shadow-lg`}
        >
          <div className="flex flex-col text-center py-4 border-t border-gray-200">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={`/${item.link}`}
                className="text-gray-700 py-3 font-medium hover:bg-gray-50 hover:text-blue-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Contact Info */}
            <div className="py-4 border-t border-gray-200 mt-2">
              <div className="flex items-center justify-center gap-2 text-blue-500">
                <Phone size={20} />
                <div>
                  <p className="text-xs font-medium text-gray-500">Customer Care</p>
                  <p className="text-gray-800 font-bold">1800-56-78-9012</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}