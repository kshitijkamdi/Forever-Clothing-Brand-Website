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
    <div className="flex flex-col pt-10 border-t">
      {/* --- Heading Section --- */}
      <div className="text-2xl sm:text-3xl font-bold mb-6">
        <Title text1={"OUR"} text2={"INVENTORY"} />
      </div>

      {/* --- Control Bar (Filters Toggle & Sort) --- */}
      <div className="flex justify-between items-center pb-4 border-b">
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

        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border border-gray-300 text-xs px-3 py-2 outline-none bg-white rounded-md cursor-pointer"
        >
          <option value="Relevance">Sort by: Relevance</option>
          <option value="low-high">Sort by: Price (Low to High)</option>
          <option value="high-low">Sort by: Price (High to Low)</option>
        </select>
      </div>

      {/* --- Dropdown Filters Section (Opens below button) --- */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          displayFilter ? "max-h-[500px] opacity-100 mb-8" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 py-6 border-b bg-gray-50 px-4">
          {/* Category Selection */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold border-b pb-1">CATEGORIES</p>
            <div className="flex flex-wrap sm:flex-col gap-3 text-sm text-gray-700">
              {["Men", "Women", "Kids"].map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" value={item} onChange={toggleCategory} className="w-4 h-4" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Type Selection */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold border-b pb-1">TYPE</p>
            <div className="flex flex-wrap sm:flex-col gap-3 text-sm text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" value={item} onChange={toggleSubCategory} className="w-4 h-4" />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Product Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-6">
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
        <div className="w-full text-center py-20 text-gray-400">
          No items found matching your selection.
        </div>
      )}
    </div>
  );
};

export default Collection;