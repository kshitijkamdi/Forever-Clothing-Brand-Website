import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = ({ showSidebar, setShowSidebar, setToken }) => {
  
  const navLinks = [
    { to: "/add", icon: assets.add_icon, label: "Add items" },
    { to: "/list", icon: assets.order_icon, label: "List items" },
    { to: "/orders", icon: assets.parcel_icon, label: "Orders" },
    { to: "/analysis", icon: assets.analysis_icon, label: "Analysis" },
    { to: "/payments", icon: assets.analysis_icon, label: "Payments" }, // Update your assets/routes accordingly
    { to: "/contact", icon: assets.analysis_icon, label: "Contact Us" },
    { to: "/settings", icon: assets.analysis_icon, label: "Admin Settings" },
  ];

  return (
    <>
      {/* Mobile Overlay Background */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] md:hidden transition-opacity ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowSidebar(false)}
      />

      {/* Sidebar: z-[160] ensures it is above the Navbar (z-100) */}
      <div className={`
        fixed md:static top-0 left-0 z-[160] 
        w-[280px] md:w-[18%] min-h-screen 
        bg-white border-r border-gray-100
        transition-transform duration-300
        ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Close Button: Padding ensures it's not tucked under the corner */}
        <div className="flex justify-end p-6 md:hidden">
          <button 
            onClick={() => setShowSidebar(false)} 
            className="text-3xl font-light text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>
        
        <div className="flex flex-col md:pl-[15%] pt-10 md:pt-16 gap-3">
          {navLinks.map((link, index) => (
            <NavLink 
              key={index}
              onClick={() => setShowSidebar(false)}
              className={({isActive}) => `
                flex items-center gap-4 px-6 py-3 transition-all duration-300 group
                ${isActive 
                  ? 'bg-zinc-50 border-r-4 border-black text-black font-bold' 
                  : 'text-gray-400 hover:text-black hover:bg-gray-50'
                }
              `} 
              to={link.to}
            >
              <img className="w-5 h-5 grayscale group-hover:grayscale-0" src={link.icon} alt={link.label} />
              <p className="text-sm tracking-tight uppercase tracking-[0.1em]">{link.label}</p>
            </NavLink>
          ))}

          {/* Mobile Logout (Visible only in Hamburger Menu) */}
          <div className="mt-10 px-6 md:hidden">
             <button 
              onClick={() => setToken("")}
              className="w-full bg-red-50 text-red-500 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest active:scale-95 transition-all"
             >
              Logout Account
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;