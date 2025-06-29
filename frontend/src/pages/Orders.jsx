import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-15">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-gray-700 border-t border-b flex-col md:flex-row md:justify-between p-5 "
          >
            <div className="flex gap-5 items-start text-sm">
              <img src={item.image[0]} alt="" className="w-16 sm:w-21" />
              <div>
                <p className=" font-medium text-xl">{item.name}</p>
                <div className="items-center flex gap-3 mt-2 text-base text-gray-500 ">
                  <p className="text-lg">
                    {currency}
                    {item.price}.00
                  </p>
                  <p>Quantity: 2</p>
                  <p>Size: M</p>
                </div>
                <div>
                  <p className="mt-2">
                    Order Date:
                    <span span className="text-gray-400">
                      {" "}
                      12/12/2021
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between sm:w-1/2 ">
              <div className="flex items-center gap-2">
                <p className="bg-green-400 rounded-full min-w-2.5 h-2.5"></p>
                <p className="text-lg">Ready To Ship</p>
              </div>
              <button className="text-blue-500 border h-10 px-5 rounded">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
