import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="mt-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm text-gray-600">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <img src={assets.logo} className="w-32 mb-6 grayscale hover:grayscale-0 transition-all duration-300" alt="Logo" />
          <p className="w-full md:w-2/3 leading-relaxed">
            Forever is dedicated to bringing you timeless fashion that blends modern trends with classic elegance. Our mission is to empower your style with premium quality and sustainable choices.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-xl font-medium mb-5 text-gray-900 tracking-tight">COMPANY</p>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-black cursor-pointer transition-colors">Home</li>
            <li className="hover:text-black cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-black cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-black cursor-pointer transition-colors">Delivery</li>
            <li className="hover:text-black cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-xl font-medium mb-5 text-gray-900 tracking-tight">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-center sm:text-left">
            <li className="hover:text-black cursor-pointer transition-colors">+91 1234567890</li>
            <li className="hover:text-black cursor-pointer transition-colors lowercase">rk.enterprises@gmail.com</li>
            <li className="text-gray-500 italic">Nagpur | Pune</li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="py-5 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-center text-gray-500 tracking-widest uppercase">
          © 2026 RK Enterprises. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;