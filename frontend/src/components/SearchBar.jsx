import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'


const SearchBar = () => {

    const{ Search, setSearch, showSearch, setShowSearch}= useContext(ShopContext)
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(()=>{
      if(location.pathname.includes('/collection')){
        setVisible(true);
      }
      else{
        setVisible(false);
      }
    }, [location])

  return showSearch && visible ? (
    <div className='border-t border-b border-gray-200 text-center mb-5 '>
      <div className='inline-flex items-center justify-center border border-gray-300 px-5 mb-5 mt-5 py-2 w-1/3 rounded-full'>
        <input  value={Search} onChange={(e)=>setSearch(e.target.value)} className='bg-inherit flex-1 text-black outline-none text-sm' type='text' placeholder={'Search'}/>
        <img src={assets.search_icon}  className='w-4 inline-flex cursor-pointer '/>
      </div>
      <img onClick={()=>setShowSearch(false)} className=" w-4 inline cursor-pointer ml-5" src={assets.cross_icon}/>
    </div>
  ) : null
}

export default SearchBar
