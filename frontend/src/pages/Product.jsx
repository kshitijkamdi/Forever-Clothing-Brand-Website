import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productid } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [animate, setAnimate] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // State to trigger slide-right

  const fetchProductData = async () => {
    const item = products.find((item) => item._id === productid);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
      setTimeout(() => setAnimate(true), 100);
    }
  };

  // Improved handleBack function
  const handleBack = () => {
    setIsExiting(true); // Switch to exit mode
    setAnimate(false);  // Reverse general opacity
    setTimeout(() => {
      navigate(-1);
    }, 600); // Wait for the transition duration
  };

  useEffect(() => {
    setIsExiting(false);
    setAnimate(false);
    fetchProductData();
  }, [productid, products]);

  return productData ? (
    // overflow-x-hidden is crucial to prevent scrollbars during the slide-out
    <div className="overflow-x-hidden">
      <div 
        className={`pt-10 px-4 sm:px-0 transition-all duration-700 ease-in-out transform 
        /* Entrance Logic: Slide Up */
        ${animate && !isExiting ? 'translate-y-0 opacity-100' : ''} 
        ${!animate && !isExiting ? '-translate-y-10 opacity-0' : ''} 
        /* Back Navigation Logic: Slide Right */
        ${isExiting ? 'translate-x-[100%] opacity-0' : ''}`}
      >
        
        {/* ------------------- HEADER SECTION ------------------- */}
        <div className="flex items-center gap-4 mb-6">
          <div onClick={handleBack} className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-all group">
            <img 
                src={assets.dropdown_icon} 
                className="w-3 rotate-180 transition-transform group-hover:-translate-x-1" 
                alt="back" 
            />
            <p className="hidden sm:block text-sm font-medium">BACK</p>
            <h3 className="sm:hidden text-xl font-medium m-0">{productData.name}</h3>
          </div>
        </div>

        {/* ------------------- MAIN CONTENT ------------------- */}
        <div className="flex flex-col sm:flex-row gap-12">
          
          {/*---------- Left: Product Images ------------ */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.5%]">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  key={index}
                  src={item}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border hover:border-black transition-all"
                  alt=""
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img src={image} className="w-full h-auto rounded-sm shadow-lg" alt="" />
            </div>
          </div>

          {/*---------- Right: Product Details ------------ */}
          <div className="flex-1">
            <h1 className="hidden sm:block text-3xl font-medium mt-2">{productData.name}</h1>
            
            <div className="flex items-center justify-between mt-4">
              <p className="text-2xl font-semibold">{currency} {productData.price}</p>
              <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <img key={i} src={assets.star_icon} alt="" className="w-3" />
                ))}
                <img src={assets.star_dull_icon} alt="" className="w-3" />
                <p className="text-xs pl-1 text-gray-500">(122)</p>
              </div>
            </div>

            <p className="text-md text-gray-500 mt-5 leading-relaxed">{productData.description}</p>

            <div className="flex flex-col gap-4 mt-8">
              <p className="font-medium">Select Size:</p>
              <div className="flex gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`w-10 h-10 border flex items-center justify-center rounded-sm transition-all duration-300 ${
                      item === size ? "border-black bg-gray-300 scale-110" : "border-gray-300 bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-10 mb-5">
              <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-10 py-3 text-sm active:scale-95 transition-all uppercase tracking-widest">
                Add to Cart
              </button>
              <button onClick={() => navigate('/cart')} className="border border-black text-black px-10 py-3 text-sm hover:bg-black hover:text-white active:scale-95 transition-all uppercase tracking-widest">
                Go to Cart
              </button>
            </div>

            <hr className="sm:w-4/5 my-6" />
            <div className="text-gray-500 text-sm flex flex-col gap-1.5 italic">
              <p>100% Genuine product quality.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="mt-24 pb-10">
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-pulse text-gray-400 tracking-widest uppercase italic font-bold">Forever</div>
    </div>
  );
};

export default Product;