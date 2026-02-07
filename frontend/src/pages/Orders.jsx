import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  // Use the context values provided by ShopContext
  const { currency, token, backendUrl } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      // Guard clause: If there is no token, don't attempt the request
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/orders/userOrders",
        {}, // Empty body because the userId is extracted from the token in the backend
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrderItems = [];
        
        // Flattening the order items so each item is displayed as an individual row
        response.data.orders.map((order) => {
          order.items.map((item) => {
            // Injecting order-level metadata into the individual item
            item["status"] = order.status;
            item["paymentMethod"] = order.paymentMethod;
            item["payment"] = order.payment;
            item["date"] = order.date;
            allOrderItems.push(item);
          });
        });

        // Reversing to show the most recent orders first
        setOrderData(allOrderItems);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error(error.message);
    }
  };

  // Trigger data fetch whenever the token changes (e.g., after login)
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="mt-8">
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                {/* Image safety check: ensuring item.image exists before accessing index */}
                <img 
                  src={item.image && item.image[0] ? item.image[0] : ""} 
                  alt={item.name} 
                  className="w-16 sm:w-20" 
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="mt-1">
                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  {/* Status Indicator Dot */}
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button 
                  onClick={loadOrderData} 
                  className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50 transition-all"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-10">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;