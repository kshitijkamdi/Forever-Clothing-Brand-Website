import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productid } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    // Optimized finding logic
    const item = products.find((item) => item._id === productid);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productid, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      
      {/* --- Back Button --- */}
      <div 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 mb-6 cursor-pointer w-fit hover:opacity-70 transition-all"
      >
<img 
    src={assets.dropdown_icon} 
    className="w-3 transform rotate-90" // Added transform and ensured rotate-90
    alt="back" 
    style={{ transform: 'rotate(-180deg)' }} // Inline style as a fail-safe
  />        <p className="text-sm font-medium">BACK</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-12">
        {/*----------Product Image------------ */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.5%]">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border hover:border-black"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/*----------Product Details------------ */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="text-sm pl-2">(122)</p>
          </div>
          <p className="text-2xl font-semibold mt-5">
            {currency} {productData.price}
          </p>
          <p className="text-md text-gray-500 mt-5 leading-relaxed">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 mt-8">
            <p className="font-medium">Select Size:</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`w-10 h-10 border bg-gray-100 flex items-center justify-center rounded-sm transition-all ${
                    item === size ? "border-black bg-gray-300" : "border-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => addToCart(productData._id, size)} 
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-8 mb-5"
          >
            ADD TO CART
          </button>

          <hr className="sm:w-4/5 my-5" />

          <div className="text-gray-500 text-sm flex flex-col gap-1">
            <p>100% Genuine product quality.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* --- Description & Review Section --- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
          </p>
        </div>
      </div>
      
      {/* -------------------Related Products------------------- */}
      <div className="mt-24">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
      </div>
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;