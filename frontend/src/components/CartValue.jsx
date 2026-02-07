import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
//import { Navigate } from "react-router-dom";

const CartValue = () => {
  const { currency, delivery_fee, getCartAmount,navigate } = useContext(ShopContext);

  return (
    <div className="w-full ">
      <div className="flex mt-2 justify-between text-2xl">
        <Title text1={"Cart"} text2={"Billing"} />
      </div>

      <div className="flex flex-col gap-3 mt-5 border border-gray-300 p-5 rounded-lg">
        <div className="flex justify-between">
          <p>Subtotal:</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee:</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr className="bg-gray-600" />
        <div className="flex justify-between font-bold mt-2 text-xl">
          <p>Total:</p>
          <p>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </p>
        </div>
      </div>
    </div> 
  );
};

export default CartValue;
