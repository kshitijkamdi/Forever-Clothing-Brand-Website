import React from 'react'
import { assets } from "../assets/assets"

const Navbar = ({setToken}) => {
  return (
    <div className='items-center flex justify-between px-[4%] py-5'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt=''/>
      <button onClick={()=> setToken("")} className='bg-gray-600 text-white px-5 sm:px-7 py-3 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
