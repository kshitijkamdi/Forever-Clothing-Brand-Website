import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faBars,
  faArrowLeft,
  faBoxOpen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    setCartItems,
    token,
    setToken,
  } = useContext(ShopContext);

  const logout = () => {
    setVisible(false);
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex justify-between items-center py-5 font-medium border-b border-gray-100">
      
      {/* 1. Logo Navigates to Home */}
      <Link to='/'>
        <img src="/src/assets/frontend_assets/logo.png" alt="Forever Logo" className="w-32 cursor-pointer" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex text-sm text-gray-700 gap-6">
        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
          <NavLink key={item} to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`} className="flex flex-col items-center gap-1 group">
            <p>{item}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-[.active]:block" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <FontAwesomeIcon
          onClick={() => setShowSearch(prev => !prev)}
          className="cursor-pointer text-lg"
          icon={faMagnifyingGlass}
        />

        {/* Desktop User Icon */}
        <div className="relative group hidden sm:block">
          <FontAwesomeIcon
            icon={faUser}
            onClick={() => (token ? null : navigate("/login"))}
            className="cursor-pointer text-lg"
          />
          {token && (
            <div className="group-hover:block hidden absolute top-full right-0 pt-4 z-20">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white shadow-lg border border-gray-100 text-gray-500 rounded text-sm">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <FontAwesomeIcon className="text-lg" icon={faCartShopping} />
          <p className="absolute -top-2 -right-2 bg-black text-white rounded-full w-4 h-4 flex justify-center items-center text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Icon */}
        <FontAwesomeIcon
          onClick={() => setVisible(true)}
          className="text-xl cursor-pointer sm:hidden"
          icon={faBars}
        />
      </div>

      {/** 2 & 3. Exquisite Mobile Menu (80% Width) */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ease-in-out shadow-2xl ${visible ? "w-[80vw]" : "w-0 overflow-hidden"}`}>
        <div className="flex flex-col h-full text-gray-600">
          
          {/* Back Button Header */}
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-6 border-b cursor-pointer bg-gray-50">
            <FontAwesomeIcon icon={faArrowLeft} />
            <p className="font-bold">BACK</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col">
            {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
               <NavLink 
                key={item}
                onClick={() => setVisible(false)} 
                className="py-4 pl-8 border-b text-sm font-semibold tracking-widest hover:bg-gray-50 transition-colors" 
                to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
              >
                {item}
              </NavLink>
            ))}
            
            {/* 2. User Elements inside Hamburger for mobile */}
            {token ? (
              <div className="mt-4 flex flex-col border-t-4 border-gray-50">
                <p className="py-4 pl-8 border-b text-sm font-semibold text-gray-400">ACCOUNT</p>
                <NavLink onClick={() => setVisible(false)} to="/orders" className="py-4 pl-8 border-b flex items-center gap-3">
                  <FontAwesomeIcon icon={faBoxOpen} /> Orders
                </NavLink>
                <p onClick={logout} className="py-4 pl-8 border-b flex items-center gap-3 text-red-500">
                  <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </p>
              </div>
            ) : (
              <NavLink onClick={() => setVisible(false)} to="/login" className="py-4 pl-8 border-b font-bold text-black uppercase">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Overlay Background when menu is open */}
      {visible && <div onClick={() => setVisible(false)} className="fixed inset-0 bg-black/30 z-40 sm:hidden" />}
    </div>
  );
};

export default Navbar;