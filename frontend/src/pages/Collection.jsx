import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [displayFilter, setDisplayFilter] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("Relevance");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...category, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...category, e.target.value]);
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

  const sorting = (e) => {
    const sortProduct = filteredProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilteredProducts(sortProduct.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilteredProducts(sortProduct.sort((a, b) => b.price - a.price));
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
    sorting();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-5 my-2">
      {/* Left */}
      {/* Filter */}
      <div className="min-w-60">
        <p
          onClick={() => setDisplayFilter(!displayFilter)}
          className="flex flex-row text-2xl font-medium text-center cursor-pointer border-b"
        >
          Filters
          <br />
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${displayFilter ? "rotate-90" : ""}`}
          ></img>
        </p>

        {/* Category */}
        <div
          className={`border border-gray-300 pl-3 py-3 mt-6 ${
            displayFilter ? "" : "hidden"
          }`}
        >
          <p className="text-xl font-medium">Category</p>

          <div className="flex flex-col text-sm gap-2 font-light text-gray-700 mt-3">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value="Men"
                className="w-3"
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value="Women"
                className="w-3"
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value="Kids"
                className="w-3"
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* wear type */}
        <div
          className={`border border-gray-300 pl-3 py-3 mt-6 ${
            displayFilter ? "" : "hidden"
          }`}
        >
          <p className="text-xl font-medium">Type</p>

          <div className="flex flex-col text-sm gap-2 font-light text-gray-700 mt-3">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value="Topwear"
                className="w-3"
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value="Bottomwear"
                className="w-3"
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value="Winterwear"
                className="w-3"
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1">
        <div className="flex justify-between font-medium ">
          <div className="text-3xl ml-8">
            <Title text1="Our" text2="Inventory" />
          </div>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 p-2 text-sm w-45"
          >
            <option value="Relevance">Sort By: Relevance</option>
            <option value="Popularity">Sort By: Popularity</option>
            <option value="NewestFirst">Sort By: Newest First</option>
            <option value="low-high">Sort By: Price=Low to High</option>
            <option value="high-low">Sort By: Price=High to Low</option>
          </select>
        </div>

        {/* Products Catalogue */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8 ">
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
