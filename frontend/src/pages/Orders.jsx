import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/frontend_assets/assets";

const Orders = () => {
  const { currency, token, backendUrl } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const loadOrderData = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(
        backendUrl + "/api/orders/userOrders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrderItems = [];
        response.data.orders.reverse().map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["paymentMethod"] = order.paymentMethod;
            item["payment"] = order.payment;
            item["date"] = order.date;
            item["orderId"] = order._id;
            item["fullOrder"] = order;
            allOrderItems.push(item);
          });
        });
        setOrderData(allOrderItems);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrderHandler = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/orders/status",
        { orderId: orderToCancel, status: "Cancelled" },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order Cancelled Successfully");
        setShowCancelModal(false);
        setOrderToCancel(null);
        setSelectedOrder(null);
        loadOrderData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'packing': return 'bg-orange-400';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="border-t pt-16 min-h-[60vh] px-4 sm:px-0">
      <div className="text-2xl sm:text-3xl mb-10">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="flex flex-col gap-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedOrder(item.fullOrder)}
            className="group py-6 px-4 border border-gray-100 rounded-2xl bg-white hover:border-black hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6 text-sm flex-1">
              <div className="relative overflow-hidden rounded-xl bg-gray-50 shrink-0">
                <img
                  src={item.image && item.image[0] ? item.image[0] : ""}
                  alt={item.name}
                  className="w-20 h-24 object-cover transform transition-transform duration-700 group-hover:scale-125"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Order ID: #{item.orderId?.slice(-8).toUpperCase()}</p>
                <p className="sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-black">{item.name}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 font-medium">
                  <p className="text-gray-900">{currency}{item.price}</p>
                  <p className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px]">Qty: {item.quantity}</p>
                  <p className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px]">Size: {item.size}</p>
                </div>
                <p className="mt-3 text-[11px] text-gray-400">Ordered on: <span className="font-semibold text-gray-600">{new Date(item.date).toDateString()}</span></p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:w-[45%] justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(item.status)}`}></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{item.status}</p>
                  <p className="text-[10px] text-gray-400 uppercase">via {item.paymentMethod}</p>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); loadOrderData(); }} className="bg-black text-white text-[11px] font-black px-6 py-3 rounded-full uppercase shadow-lg">Track Order</button>
            </div>
          </div>
        ))}
      </div>

      {/* --- ORDER DETAIL MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-hidden">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-6 sm:p-12 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
              <h2 className="text-2xl font-light uppercase">Order <span className="font-bold">Summary</span></h2>
              <button onClick={() => setSelectedOrder(null)} className="text-xl text-gray-400 hover:text-black">✕</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.3em]">Items Ordered</p>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-5 border-b border-gray-50 pb-5">
                    <img src={item.image[0]} className="w-20 h-24 object-cover rounded-xl shadow-sm" alt="" />
                    <div className="flex flex-col justify-center">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{currency}{item.price} x {item.quantity}</p>
                      <div className="mt-2 w-fit px-3 py-0.5 bg-gray-100 rounded-full text-[10px] uppercase font-black">{item.size}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-10">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-sm">
                  <p className="text-[10px] font-black uppercase text-gray-300 mb-4 tracking-[0.3em]">Delivery Address</p>
                  <p className="font-bold text-lg mb-1">{selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                  <p className="text-gray-600 leading-relaxed italic">{selectedOrder.address.houseNo}, {selectedOrder.address.landmark}, {selectedOrder.address.street}, {selectedOrder.address.city}, {selectedOrder.address.state}, {selectedOrder.address.country}</p>
                  <p className="mt-4 font-mono text-gray-900">{selectedOrder.address.phone}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-2xl font-light text-black text-right">{currency}{selectedOrder.amount}</p>
                  <div className="flex gap-3 mt-4">
                    {/* Trash Icon Button for Cancel */}
                    {selectedOrder.status !== "Cancelled" && selectedOrder.status !== "Delivered" && (
                      <button 
                        onClick={() => { setOrderToCancel(selectedOrder._id); setShowCancelModal(true); }}
                        className="p-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    )}
                    <button onClick={() => window.print()} className="flex-1 bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-gray-200">Print Invoice</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CANCELLATION CONFIRMATION MODAL --- */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Cancel Order?</h3>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to cancel this order? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowCancelModal(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Go Back</button>
              <button onClick={cancelOrderHandler} className="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white shadow-lg shadow-red-200 transition-all hover:bg-red-600">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;