import React, { useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBar = () => {

    const { Search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.trim() !== "" && !location.pathname.includes('/collection')) {
            navigate('/collection');
        }
    }

    // This ensures the component is ALWAYS in the DOM so the transition can play
    return (
        <div className={`overflow-hidden transition-all duration-500 ease-in-out bg-gray-50 ${showSearch ? 'max-h-40 opacity-100 border-t border-b border-gray-200' : 'max-h-0 opacity-0 border-none'}`}>
            <div className='text-center'>
                <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                    <input 
                        value={Search} 
                        onChange={handleSearchInput} 
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
        </div>
    )
}

export default SearchBar;