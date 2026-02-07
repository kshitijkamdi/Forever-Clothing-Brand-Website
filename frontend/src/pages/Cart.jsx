import React from "react";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
//import { set } from 'mongoose';
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartValue from "../components/CartValue";

const Cart = () => {
  const { currency, products, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    
    const tempData = [];

    if(products.length>0){
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
  }, [cartItems,products]);

  return (
    <div className="pt-15 border-t ">
      <div className="text-2xl mb-5">
        <Title text1={"Cart"} text2={"Summary"} />

        <div>
          {cartData.map((item, index) => {
            let cartproducts = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="flex items-center gap-3 border-t border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[3fr_1fr_1fr]"
              >
                <div className="flex items-start gap-3 my-5">
                  <img
                    src={cartproducts.image[0]}
                    alt=""
                    className="w-18 sm:w-20"
                  />

                  <div className=" text-sm sm:text-lg font medium">
                    <p>{cartproducts.name}</p>

                    <div className=" text-sm sm:text-lg text-gray-600 items-center gap-2">
                      <p>
                        {currency}
                        {cartproducts.price}
                      </p>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <input
                    type="number"
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === 0
                        ? null
                        : updateQuantity(item._id, item.size, e.target.value)
                    }
                    defaultValue={item.quantity}
                    min={1}
                    className="max-w-12 items-center text-gray-600 border border-gray-300  ml-5 pl-2"
                  />
                </div>
                <img
                  src={assets.bin_icon}
                  alt=""
                  className="w-6 cursor-pointer "
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartValue />
        </div>
      </div>
      
    </div>
  );
};

export default Cart;
