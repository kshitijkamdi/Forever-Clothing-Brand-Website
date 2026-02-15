import React, { useState } from 'react';
import { assets } from '../assets/assets';
const Navbar = ({ setToken, setShowSidebar, showSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className='flex items-center justify-between px-[4%] py-4 bg-white border-b border-gray-100 top-0 z-[100]'>
      
      {/* LEFT: Logo & Hamburger (Mobile Only) */}
      <div className='flex items-center gap-4'>
        <img 
          onClick={() => setShowSidebar(!showSidebar)}
          src={assets.menu_icon} 
          className='w-5 cursor-pointer md:hidden' 
          alt="menu" 
        />
        <img className='w-28 sm:w-32' src={assets.logo} alt='logo'/>
      </div>

      {/* RIGHT: Search & Logout */}
      <div className='flex items-center gap-6'>
        
        {/* Animated Search Bar */}
        <div className={`flex items-center bg-gray-50 rounded-full transition-all duration-300 overflow-hidden ${showSearch ? 'w-40 sm:w-64 px-3 py-2 border' : 'w-0'}`}>
          <input 
            type="text" 
            placeholder="Search items..." 
            className="bg-transparent outline-none text-xs w-full ml-2"
          />
        </div>
        
        <img 
          onClick={() => setShowSearch(!showSearch)}
          src={assets.search_icon} 
          className='w-5 cursor-pointer hover:scale-110 transition-all' 
          alt="search" 
        />

        {/* Logout (Hidden on Mobile, moved to Sidebar) */}
        <button 
          onClick={() => setToken("")} 
          className='hidden md:block bg-zinc-900 text-white px-8 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar;