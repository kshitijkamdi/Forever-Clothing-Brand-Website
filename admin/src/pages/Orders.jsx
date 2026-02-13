import { useEffect, useState, useRef } from "react";
import { currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const statusOptions = ["Order Placed", "Packing", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Delivery Attempted"];

  const fetchOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(backendUrl + "/api/orders/list", {}, { headers: { token } });
      if (response.data.success) {
        const fetchedOrders = response.data.orders.reverse();
        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  // Filter and Search Logic
  useEffect(() => {
    let temp = orders;
    if (filterStatus !== "All") {
      temp = temp.filter(o => o.status === filterStatus);
    }
    if (searchQuery) {
      temp = temp.filter(o => o._id.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredOrders(temp);
  }, [filterStatus, searchQuery, orders]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/orders/status`, 
        { orderId, status: event.target.value }, 
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrders();
        if (selectedOrder && selectedOrder._id === orderId) {
            setSelectedOrder({...selectedOrder, status: event.target.value});
        }
        toast.success("Status Updated");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const printReceipt = (order) => {
    const printContent = `
      <html>
        <head><title>Receipt - ${order._id}</title></head>
        <body style="font-family: sans-serif; padding: 20px;">
          <h2>Forever - Order Receipt</h2>
          <p>Order ID: ${order._id}</p>
          <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
          <hr/>
          <h3>Customer Details</h3>
          <p>${order.address.firstName} ${order.address.lastName}</p>
          <p>${order.address.street}, ${order.address.city}</p>
          <hr/>
          <h3>Items</h3>
          ${order.items.map(i => `<p>${i.name} x ${i.quantity} (${i.size}) - ${currency}${i.price}</p>`).join('')}
          <h3>Total: ${currency}${order.amount}</h3>
        </body>
      </html>
    `;
    const win = window.open("", "_blank");
    win.document.write(printContent);
    win.document.close();
    win.print();
  };

  useEffect(() => { fetchOrders(); }, [token]);

  return (
    <div className="p-4 sm:p-8 relative">
      <h3 className="text-2xl font-light tracking-widest text-gray-800 mb-8 uppercase">
        Order Management <span className="text-gray-400">/ Dashboard</span>
      </h3>

      {/* --- FILTER & SEARCH BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {["All", ...statusOptions].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 text-xs rounded-full border transition-all whitespace-nowrap ${filterStatus === status ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black'}`}
            >
              {status}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search Order ID..." 
            className="w-full border border-gray-200 px-4 py-2 rounded-lg outline-none focus:border-black text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* --- ORDER LIST --- */}
      <div className="flex flex-col gap-6">
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1.5fr_1fr_1.2fr] gap-6 items-center border border-gray-100 bg-white p-6 rounded-xl hover:border-gray-300 transition-all cursor-pointer"
            onClick={() => setSelectedOrder(order)}
          >
            <img className="w-10 grayscale mx-auto sm:mx-0" src={assets.parcel_icon} alt="" />
            
            <div className="text-sm">
                <p className="font-bold text-gray-900 mb-1">ID: #{order._id.slice(-8)}</p>
                <p className="text-gray-500">{order.address.firstName} {order.address.lastName}</p>
                <p className="text-[10px] text-gray-400">{order.items.length} Items • {new Date(order.date).toDateString()}</p>
            </div>

            <div className="text-xs text-gray-500">
               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.payment ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                 {order.payment ? "PAID" : "UNPAID"}
               </span>
               <p className="mt-2">{order.paymentMethod}</p>
            </div>

            <p className="text-lg font-light text-gray-900">{currency}{order.amount}</p>

            <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="p-2 text-xs bg-gray-50 border rounded outline-none"
              >
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button 
                onClick={() => printReceipt(order)}
                className="text-[10px] font-bold border border-gray-200 py-2 rounded hover:bg-gray-50 transition-all"
              >
                PRINT RECEIPT
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- ORDER DETAIL MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 sm:p-10 animate-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-8 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-tighter">Order Details</h2>
                <p className="text-gray-400 text-xs">ID: {selectedOrder._id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-2xl hover:text-red-500">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Product Info */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Ordered Items</p>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex gap-4 border-b pb-4">
                      <img src={item.image[0]} className="w-16 h-20 object-cover rounded" alt="" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{currency}{item.price} x {item.quantity}</p>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded uppercase">{item.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Status & Address */}
              <div className="space-y-8">
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Shipping Address</p>
                   <p className="font-bold">{selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                   <p className="text-sm text-gray-600 leading-relaxed">
                     {selectedOrder.address.street},<br/>
                     {selectedOrder.address.city}, {selectedOrder.address.state},<br/>
                     {selectedOrder.address.country} - {selectedOrder.address.zipcode}
                   </p>
                   <p className="text-sm font-medium mt-2">{selectedOrder.address.phone}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-4">Actions & Status</p>
                    <select
                        onChange={(e) => statusHandler(e, selectedOrder._id)}
                        value={selectedOrder.status}
                        className="w-full p-3 bg-white border rounded-lg mb-4 outline-none font-bold"
                    >
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button 
                        onClick={() => printReceipt(selectedOrder)}
                        className="w-full bg-black text-white py-3 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all"
                    >
                        Print Full Invoice
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;