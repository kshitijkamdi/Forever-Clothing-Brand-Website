import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productid } = useParams();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productid) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    console.log("Product ID from URL:", productid);
    fetchProductData();
  }, [productid, products]);

  return productData ? (
    <div className="border-t-2 pt-10 tansition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/*----------Product Image------------ */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full   sm:w-[18.5%]">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/*----------Product Details------------ */}
        <div className="flex-1 ">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex items-center gap-3 mt-1.5 ">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="text-sm pl-2">(122)</p>
          </div>
          <p className="text-2xl font-semibold mt-2">
            {currency} {productData.price}
          </p>
          <p className="text-md text-gray-500 mt-3">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 mt-10">
            <p className="text-xl">Select Size:</p>
            <div className="flex gap-2 mt-1">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`w-10 h-10 mx-3 my-3 border bg-gray-200 border-gray-250 rounded-sm ${
                    item === size ? "border-black" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 ">
            <button onClick={()=> addToCart(productData._id, size)} className="text-white text-xl bg-black active:bg-gray-400 w-40 h-10 mx-5 mt-4">
              Add to Cart
            </button>
          </div>

          <hr className="w-20 sm:w-4/5 my-5 h-2px" />

          <div className="text-gray-500 text-sm">
            <p>100% Genuine product quality.</p>
            <p>COD Available</p>
            <p>Easy Return and Exchange Policy.</p>
          </div>
        </div>
      </div>

      <div className="mt-20 mb-5">
        <b className="px-5 py-3 border border-gray-500 text-sm mx-2 w-20">
          Description
        </b>
        <b className="px-5 py-3 border border-gray-500 text-sm w-20">
          Reviews (122)
        </b>
        <div className="flex flex-col text-sm text-gray-500 mt-10">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A minima
            facilis voluptates laborum enim quam itaque fugiat necessitatibus
            laboriosam? Laborum dolore ea hic iste sint! Dolores molestias
            nesciunt omnis doloremque.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A minima
            facilis voluptates laborum enim quam itaque fugiat necessitatibus
            laboriosam? Laborum dolore ea hic iste sint! Dolores molestias
            nesciunt omnis doloremque.
          </p>
        </div>
      </div>
      
      {/* -------------------Related Products------------------- */}
      <div>
              <RelatedProducts  category={productData.category} subCategory={productData.subCategory}/>
      </div>
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;
