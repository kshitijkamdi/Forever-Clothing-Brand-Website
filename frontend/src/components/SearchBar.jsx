import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const { Search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Updated to exact path check for better reliability
        if (location.pathname === '/collection') {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    // Return null immediately if either condition isn't met
    if (!showSearch || !visible) {
        return null;
    }

    return (
        <div className='border-t border-b border-gray-200 text-center bg-gray-50'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input 
                    value={Search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className='flex-1 outline-none bg-inherit text-sm' 
                    type='text' 
                    placeholder='Search'
                />
                <img src={assets.search_icon} className='w-4 cursor-pointer' alt="search" />
            </div>
            <img 
                onClick={() => setShowSearch(false)} 
                className="inline w-3 cursor-pointer ml-3 opacity-60 hover:opacity-100" 
                src={assets.cross_icon} 
                alt="close"
            />
        </div>
    );
}

export default SearchBar;