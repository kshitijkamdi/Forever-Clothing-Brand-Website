import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  
  // Updated state: stores objects like { size: "S", stock: 10 }
  const [sizeData, setSizeData] = useState([]);

  const toggleSize = (size) => {
    setSizeData((prev) => {
      const exists = prev.find((item) => item.size === size);
      if (exists) {
        // If size is deselected, remove it
        return prev.filter((item) => item.size !== size);
      } else {
        // If size is selected, add it with default stock of 0
        return [...prev, { size, stock:"" }];
      }
    });
  };

  const handleStockChange = (size, stock) => {
    setSizeData((prev) =>
      prev.map((item) =>
        item.size === size ? { ...item, stock: Number(stock) } : item
      )
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      
      // Sending the size and stock data as a JSON string
      formData.append("sizes", JSON.stringify(sizeData));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setBestseller(false);
        setCategory("Men");
        setSubCategory("Topwear");
        setDescription("");
        setPrice("");
        setSizeData([]);
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-4xl p-5">
      <h1 className="text-3xl font-light tracking-tighter text-black uppercase mb-4">
        Add <span className="font-bold">Items</span>
      </h1>
      <hr className="mb-8" />
      
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-8">
        {/* --- Image Section --- */}
        {/* --- Image Section --- */}
<section>
  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4">
    Product Gallery
  </p>
  
  {/* flex-wrap ensures it fits on mobile screens */}
  <div className="flex flex-wrap gap-4">
    {[image1, image2, image3, image4].map((img, index) => {
      const setter = [setImage1, setImage2, setImage3, setImage4][index];
      return (
        <label key={index} htmlFor={`image${index + 1}`} className="cursor-pointer group">
          <div className="w-20 h-28 sm:w-28 sm:h-36 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-black transition-all relative">
            
            {/* If no image, show a clean upload icon/area */}
            {!img ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <img className="w-6 opacity-20" src={assets.upload_area} alt="" />
                <span className="text-[8px] font-bold text-gray-300 uppercase tracking-tighter">Slot {index + 1}</span>
              </div>
            ) : (
              <img className="w-full h-full object-cover" src={URL.createObjectURL(img)} alt="" />
            )}

            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <input 
            onChange={(e) => setter(e.target.files[0])} 
            type="file" 
            id={`image${index + 1}`} 
            hidden 
            accept="image/*"
          />
        </label>
      )
    })}
  </div>
  <p className="text-[10px] text-gray-400 mt-3 italic">
    * Support for .jpg, .png, and .webp (Best aspect ratio 3:4)
  </p>
</section>

        {/* --- Product Details --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:border-black outline-none" placeholder="Type Here" required />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Price</p>
                <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:border-black outline-none" placeholder="0.00" required />
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Product Description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:border-black outline-none min-h-[100px]" placeholder="Describe the product" required />
        </div>

        {/* --- Dynamic Sizes & Inventory Section --- */}
        <section>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4">Inventory Management (Size & Stock)</p>
          <div className="flex flex-col gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`${sizeData.some(item => item.size === size) ? "bg-black text-white" : "bg-white text-gray-400"} px-5 py-2 border rounded-lg cursor-pointer font-bold transition-all active:scale-95`}
                >
                  {size}
                </div>
              ))}
            </div>

            {/* Render input fields for selected sizes */}
            {sizeData.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2 animate-in fade-in slide-in-from-top-2">
                {sizeData.map((item) => (
                  <div key={item.size} className="flex flex-col gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-50">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Qty for {item.size}</p>
                    <input
                      type="number"
                      min="0"
                      value={item.stock}
                      onChange={(e) => handleStockChange(item.size, e.target.value)}
                      className="w-full border-b border-gray-200 outline-none focus:border-black text-sm py-1"
                      placeholder="Pieces"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-wrap gap-10">
            <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Category</p>
                <select onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl outline-none cursor-pointer">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Sub-Category</p>
                <select onChange={(e) => setSubCategory(e.target.value)} className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl outline-none cursor-pointer">
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                </select>
            </div>
            <div className="flex items-center gap-3 mt-6">
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" className="w-5 h-5 accent-black cursor-pointer" />
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 cursor-pointer" htmlFor="bestseller">Mark as Bestseller</label>
            </div>
        </div>

        <button className="w-full sm:w-64 bg-black text-white py-4 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-gray-200" type="submit">
          Add Product to Collection
        </button>
      </form>
    </div>
  );
};

export default Add;