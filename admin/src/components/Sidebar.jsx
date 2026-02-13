import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col pl-[20%] pt-3 gap-4 text-[15px]">

        <NavLink className="flex items-center border border-gray-300 border-r-0 gap-3 px-3 py-2 rounded-l" to="/add">
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add items</p>
        </NavLink>

        <NavLink className="flex items-center border border-gray-300 border-r-0 gap-3 px-3 py-2 rounded-l" to="/list">
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List items</p>
        </NavLink>

        <NavLink className="flex items-center border border-gray-300 border-r-0 gap-3 px-3 py-2 rounded-l" to="/orders">
          <img className="w-5 h-5" src={assets.parcel_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <NavLink className="flex items-center border border-gray-300 border-r-0 gap-3 px-3 py-2 rounded-l" to="/analysis">
          <img className="w-5 h-5" src={assets.analysis_icon} alt="" />
          <p className="hidden md:block">Analysis</p>
        </NavLink>

        <NavLink className="flex items-center border border-gray-300 border-r-0 gap-3 px-3 py-2 rounded-l" to="/analysis">
          <img className="w-5 h-5" src={assets.analysis_icon} alt="" />
          <p className="hidden md:block">Payments</p>
        </NavLink>

        <NavLink className="flex items-center border border-gray-300 border-r-0 gap-3 px-3 py-2 rounded-l" to="/analysis">
          <img className="w-5 h-5" src={assets.analysis_icon} alt="" />
          <p className="hidden md:block">Contact Us</p>
        </NavLink>

        <NavLink className="flex items-center border border-gray-300 border-r-0 gap-3 px-3 py-2 rounded-l" to="/analysis">
          <img className="w-5 h-5" src={assets.analysis_icon} alt="" />
          <p className="hidden md:block">Admin Settings</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
