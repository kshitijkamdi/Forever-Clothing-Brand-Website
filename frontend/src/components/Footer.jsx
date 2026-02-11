import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="w-32 mb-5" alt="" />
          <p className="w-full md:w-2/3 text-gray-500 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            perspiciatis ullam? Vitae ad voluptas exercitationem blanditiis
            mollitia odio consectetur nemo sint rerum esse. Obcaecati omnis,
            odit id voluptatum fuga nobis.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-3">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="font-semibold"></li>
            <li className="text-gray-700">Home</li>
            <li className="text-gray-700">About Us</li>
            <li className="text-gray-700">Contact</li>
            <li className="text-gray-700">Delivery</li>
            <li className="text-gray-700">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-3">Get in touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="text-gray-700">+91 1234567890</li>
            <li className="text-gray-700">rk.enterprises@gmail.com</li>
            <li className="text-gray-700">Nagpur | Pune</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 mb-5">
        <p>© 2025 RK Enterprises. All Rights Reserved</p>
        </div>
    </div>
  );
};

export default Footer;
