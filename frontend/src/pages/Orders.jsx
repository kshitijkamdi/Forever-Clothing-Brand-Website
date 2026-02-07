import React, { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { products, currency, token, backendUrl } = useContext(ShopContext);

  const [orderData, setOrderData] = React.useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/orders/userOrders', {}, {headers: { token }});
      console.log(response.data);
      if (response.data.success) {
        let allOrderItems = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['paymentMethod'] = order.paymentMethod;
            item['payment']= order.payment;
            item['date'] = order.date;
            allOrderItems.push(item);
          });
          });
        setOrderData(allOrderItems.reverse());
      } else {
        toast.error(response.data.message);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-15">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-gray-700 border-t border-b flex-col md:flex-row md:justify-between p-5 "
          >
            <div className="flex gap-5 items-start text-sm">
              <img src={item.image[0]} alt="" className="w-16 sm:w-21" />
              <div>
                <p className=" font-medium text-xl">{item.name}</p>
                <div className="items-center flex gap-3 mt-1 text-base text-gray-500 ">
                  <p className="text-lg">
                    {currency}
                    {item.price}.00
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <div>
                  <p className="mt-1">
                    Order Date:
                    <span span className="text-gray-400">
                      {" "}
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment:
                    <span span className="text-gray-400">
                     {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between sm:w-1/2 ">
              <div className="flex items-center gap-2">
                <p className="bg-green-400 rounded-full min-w-2.5 h-2.5"></p>
                <p className="text-lg">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="text-blue-500 border h-10 px-5 rounded">
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
