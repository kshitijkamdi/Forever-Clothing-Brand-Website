import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartValue from "../components/CartValue";

const Cart = () => {
  const { currency, products, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="pt-10 border-t">
      
      {/* --- Header Section: Aligned in one line --- */}
      <div className="flex items-center gap-4 mb-8">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center cursor-pointer hover:opacity-70 transition-all text-gray-700"
        >
          <img
            src={assets.dropdown_icon}
            className="w-3 rotate-180" // Rotated to point left
            alt="back"
          />
        </div>
        <div className="text-2xl sm:text-3xl">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>
      </div>

      {/* --- Conditional Rendering --- */}
      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <img src={assets.cart_icon} className="w-20 opacity-20" alt="Empty Cart" />
          <p className="text-xl text-gray-500 font-medium">Your cart is empty</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 transition-all"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] sm:grid-cols-[4fr_1fr_0.5fr] items-center gap-4"
                >
                  {/* Product Info */}
                  <div className="flex items-start gap-4">
                    <img src={productData.image[0]} alt="" className="w-16 sm:w-20" />
                    <div>
                      <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>{currency}{productData.price}</p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm">{item.size}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <div className="flex justify-center">
                    <input
                      type="number"
                      onChange={(e) =>
                        e.target.value === "" || e.target.value === "0"
                          ? null
                          : updateQuantity(item._id, item.size, Number(e.target.value))
                      }
                      defaultValue={item.quantity}
                      min={1}
                      className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                    />
                  </div>

                  {/* Delete Icon */}
                  <img
                    src={assets.bin_icon}
                    alt="Delete"
                    className="w-4 sm:w-5 cursor-pointer hover:opacity-75 transition-opacity justify-self-center"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              );
            })}
          </div>

          {/* Checkout Section: Improved for Mobile */}
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartValue />
              <div className="w-full text-end mt-8">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-sm px-8 py-3 w-full sm:w-auto active:bg-gray-700 transition-all"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;