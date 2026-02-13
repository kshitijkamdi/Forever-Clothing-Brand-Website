import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const removeProduct = async (id) => {
    // Confirmation is vital for mobile UX to prevent accidental taps
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/product/remove`,
          { id },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Product removed");
          await fetchList();
        }
      } catch (error) {
        toast.error("Error removing product");
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <header className="flex justify-between items-end mb-10 border-b pb-6">
          <div>
            <h1 className="text-3xl font-light tracking-tighter text-black">Product Gallery</h1>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-1">Inventory Management</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">{list.length} Items</p>
          </div>
        </header>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {list.map((item, index) => (
            <div key={index} className="group relative bg-white border border-gray-100 p-3 rounded-sm hover:shadow-2xl transition-all duration-500">
              
              {/* Image Container with Responsive Delete Button */}
              <div className="relative overflow-hidden aspect-[3/4] bg-gray-50 rounded-sm">
                <img
                  className="w-full h-full object-cover grayscale-[20%] md:grayscale-[20%] md:group-hover:grayscale-0 transition-all duration-700 md:group-hover:scale-105"
                  src={item.image[0]}
                  alt={item.name}
                />
                
                {/* DELETE BUTTON LOGIC:
                  - opacity-100 on mobile (always visible)
                  - md:opacity-0 (hidden on laptop by default)
                  - md:group-hover:opacity-100 (visible on laptop hover)
                */}
                <button
                  onClick={() => removeProduct(item._id)}
                  className="absolute top-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-full shadow-lg transition-all duration-300 active:scale-90 opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-red-50"
                  aria-label="Delete Product"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-red-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </button>
              </div>

              {/* --- INFO SECTION --- */}
              <div className="mt-4 flex justify-between items-start px-1">
                <div className="max-w-[70%]">
                  <h3 className="text-sm font-medium text-gray-900 truncate uppercase tracking-tight">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  {currency}{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;