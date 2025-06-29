import React from "react";
import { useState, useContext } from "react";
//import NavLink from "./NavLink"
//import assets from '../assets/assets'
import { ShopContext } from "../context/ShopContext";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faBars,
  faArrowLeft,
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
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});

  };

  return (
    <div className="flex justify-between items-center py-4 font-medium">
      <img src="\assets\RK logo.png" alt="" className="w-36" />

      <ul className="hidden sm:flex text-sm text-gray-700 gap-5">
        <NavLink to="/" className="flex flex-col gap-1 items-center">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col gap-1 items-center">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col gap-1 items-center">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col gap-1 items-center">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <FontAwesomeIcon
          onClick={() => setShowSearch(true)}
          className=" cursor-pointer"
          icon={faMagnifyingGlass}
        />

        <div className="relative group">
          
            <FontAwesomeIcon icon={faUser} onClick={()=> token ? null : navigate("/login") } className="cursor-pointer w-5"/>
          {/* Dropdown Menu*/ }
          { token &&
          <div className="group-hover:block hidden dropdown-menu absolute tp-4 right-0">
          <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
            <p className="cursor-pointer hover:text-black">My Profile</p>
            <p onClick={()=>navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
            <p className="cursor-pointer hover:text-black">Settings</p>
            <p onClick={logout} className="cursor-pointer hover:text-black">
              Logout
            </p>
          </div>
        </div>}
        </div>

        <Link to="/cart" className="relative">
          <FontAwesomeIcon className="w-5 min-w-5" icon={faCartShopping} />
          <p className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center">
            {getCartCount()}
          </p>
        </Link>

        <FontAwesomeIcon
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          icon={faBars}
        />
      </div>

      {/** Mobile Menu bar */}
      <div
        className={`absolute top-0 right-0 bottom-0  bg-white overflow-hidden transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 p-4 ">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4"
          >
            <FontAwesomeIcon className="cursor-pointer" icon={faArrowLeft} />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
