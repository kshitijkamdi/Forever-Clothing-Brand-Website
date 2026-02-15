import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // State for the details modal

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
    if (window.confirm("Are you sure you want to permanently delete this item?")) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/product/remove`,
          { id },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Product removed");
          setSelectedItem(null); // Close modal after deletion
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

        {/* --- PRODUCT GRID --- 
            Modified grid: grid-cols-2 for mobile (default)
        */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {list.map((item, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedItem(item)}
              className="group relative bg-white border border-gray-100 p-2 sm:p-3 rounded-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-gray-50 rounded-sm">
                <img
                  className="w-full h-full object-cover transition-all duration-700 md:group-hover:scale-105"
                  src={item.image[0]}
                  alt={item.name}
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row justify-between items-start px-1 gap-1">
                <div className="max-w-full sm:max-w-[70%]">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate uppercase tracking-tight">{item.name}</h3>
                  <p className="text-[10px] text-gray-500 uppercase">{item.category}</p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  {currency}{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- ITEM DETAILS MODAL --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Product Images Area */}
              <div className="md:w-1/2 p-6 bg-gray-50">
                <img 
                  src={selectedItem.image[0]} 
                  alt={selectedItem.name} 
                  className="w-full h-auto object-cover rounded-md shadow-md"
                />
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {selectedItem.image.slice(1).map((img, i) => (
                    <img key={i} src={img} className="aspect-square object-cover rounded border border-gray-200" alt="" />
                  ))}
                </div>
              </div>

              {/* Product Info Area */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] bg-gray-800 text-white px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                    {selectedItem.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-4 leading-tight uppercase">
                    {selectedItem.name}
                  </h2>
                  <p className="text-xl font-light text-gray-600 mt-2">
                    {currency}{selectedItem.price}
                  </p>
                  
                  <div className="mt-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</p>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                      {selectedItem.description || "No description provided for this item."}
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sub-Category</p>
                    <p className="text-gray-600 mt-1 text-sm">{selectedItem.subCategory}</p>
                  </div>
                </div>

                {/* Internal Delete Button */}
                <div className="mt-10 pt-6 border-t">
                  <button
                    onClick={() => removeProduct(selectedItem._id)}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 font-medium group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove from Inventory
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;