import React, { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [displayFilter, setDisplayFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("Relevance");
  const [showSortMenu, setShowSortMenu] = useState(false);



  const sortOptions = [
  { label: "Relevance", value: "Relevance" },
  { label: "Popularity", value: "Popularity" },
  { label: "Newest", value: "NewestFirst" },
  { label: "Price: Low to High", value: "low-high" },
  { label: "Price: High to Low", value: "high-low" },
];

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilteredProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = filteredProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col pt-10 border-t relative">
      
      {/* --- Heading & Control Bar Section --- */}
      {/* On sm (laptop) and above, this flexes to a row to put title and filters on one line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        
        <div className="text-2xl sm:text-3xl">
          <Title text1={"OUR"} text2={"INVENTORY"} />
        </div>

        {/* Controls Container */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pb-4 sm:pb-0 border-b sm:border-none">
          
          {/* Filter Toggle Button */}
          <div
            onClick={() => setDisplayFilter(!displayFilter)}
            className="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition-all"
          >
            <p className="text-sm font-bold uppercase">Filters</p>
            <img
              className={`h-3 transition-transform ${displayFilter ? "rotate-180" : ""}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </div>

          <div className="relative inline-block text-left">
  {/* The "Placeholder" Trigger */}
  <div 
    onClick={() => setShowSortMenu(!showSortMenu)}
    className="flex items-center gap-3 border border-gray-300 px-4 py-2 rounded-md cursor-pointer bg-white hover:border-black transition-all min-w-[180px] justify-between"
  >
    <p className="text-sm font-medium text-gray-400">
      Sort by: <span className="text-black ml-1 uppercase text-xs tracking-wider">
        {sortOptions.find(o => o.value === sortType)?.label || "Relevance"}
      </span>
    </p>
    <img 
      src={assets.dropdown_icon} 
      className={`h-2 transition-transform duration-300 ${showSortMenu ? 'rotate-180' : ''}`} 
      alt="" 
    />
  </div>

  {/* The Pop-up Menu */}
  {showSortMenu && (
    <>
      {/* Invisible overlay to close menu when clicking outside */}
      <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)}></div>
      
      <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 shadow-2xl rounded-md z-20 overflow-hidden animate-in fade-in slide-in-from-top-1">
        {sortOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => {
              setSortType(option.value);
              setShowSortMenu(false);
            }}
            className={`px-4 py-3 text-xs uppercase tracking-widest cursor-pointer transition-colors ${
              sortType === option.value 
              ? "bg-gray-100 font-bold text-black" 
              : "text-gray-500 hover:bg-gray-50 hover:text-black"
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </>
  )}
</div>
        </div>
      </div>

      {/* --- Dropdown Filters (Popup style on Desktop) --- */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out z-10 ${
          displayFilter ? "max-h-[500px] opacity-100 mb-8" : "max-h-0 opacity-0"
        } ${displayFilter && "sm:absolute sm:top-[110px] sm:right-0 sm:w-auto sm:shadow-lg sm:border sm:rounded-lg"}`}
      >
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 py-6 border-b bg-gray-50 px-6 sm:bg-white">
          {/* Category Selection */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold border-b pb-1 text-gray-500 tracking-widest">CATEGORIES</p>
            <div className="flex flex-wrap sm:flex-col gap-3 text-sm text-gray-700">
              {["Men", "Women", "Kids"].map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                  <input type="checkbox" value={item} onChange={toggleCategory} className="w-4 h-4 accent-black" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Type Selection */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold border-b pb-1 text-gray-500 tracking-widest">TYPE</p>
            <div className="flex flex-wrap sm:flex-col gap-3 text-sm text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                  <input type="checkbox" value={item} onChange={toggleSubCategory} className="w-4 h-4 accent-black" />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Product Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {filteredProducts.map((item, index) => (
          <ProductItem
            key={index}
            name={item.name}
            id={item._id}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>

      {/* --- Empty State --- */}
      {filteredProducts.length === 0 && (
        <div className="w-full text-center py-24 text-gray-400 font-medium">
          No items found matching your selection.
        </div>
      )}
    </div>
  );
};

export default Collection;