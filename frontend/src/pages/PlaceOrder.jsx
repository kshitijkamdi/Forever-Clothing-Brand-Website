import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartValue from "../components/CartValue";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const PlaceOrder = () => {
  const [payMethod, setPayMethod] = useState("cod");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleBack = () => {
    setIsExiting(true);
    setAnimate(false);
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            setCartItems({});
            setShowSuccessModal(true);
            setTimeout(() => navigate("/orders"), 3500);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        address: formData,
      };

      switch (payMethod) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/orders/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            setShowSuccessModal(true);
            setTimeout(() => navigate("/orders"), 3500);
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const stripeResponse = await axios.post(
            backendUrl + "/api/orders/stripe",
            orderData,
            { headers: { token } }
          );
          if (stripeResponse.data.success) {
            window.location.replace(stripeResponse.data.sessionUrl);
          } else {
            toast.error(stripeResponse.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/orders/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Exquisite Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in duration-300 max-w-sm mx-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-5xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Order Placed!</h2>
              <p className="text-gray-500 mt-2 leading-relaxed">
                Thank you for shopping with Forever. Your exquisite pieces are being prepared.
              </p>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full animate-[progress_3s_linear]" style={{ width: '100%' }}></div>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Redirecting to your orders...</p>
          </div>
        </div>
      )}

      {/* Main Form Content */}
      <form
        onSubmit={onSubmitHandler}
        className={`flex flex-col sm:flex-row gap-4 pt-5 sm:pt-12 justify-between min-h-[80vh] px-4 sm:px-0 transition-all duration-500 ease-in-out transform 
        ${animate && !isExiting ? "translate-x-0 opacity-100" : ""} 
        ${!animate && !isExiting ? "translate-x-20 opacity-0" : ""} 
        ${isExiting ? "translate-x-[100%] opacity-0" : ""}`}
      >
        {/*----------Left Side (Delivery Info)------------ */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="flex items-center">
            <div
              onClick={handleBack}
              className="flex items-center cursor-pointer hover:opacity-70 transition-all text-gray-700 mr-4 group"
            >
              <img
                src={assets.dropdown_icon}
                className="w-3 rotate-180 transition-transform group-hover:-translate-x-1"
                alt="back"
              />
            </div>
            <div className="text-2xl sm:text-2xl my-5">
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>
          </div>
          
          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First Name"
              className="border border-gray-300 bg-gray-50 p-2.5 rounded-lg w-full focus:outline-black"
              required
            />
            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 bg-gray-50 p-2.5 rounded-lg w-full focus:outline-black"
              required
            />
          </div>

          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 bg-gray-50 p-2.5 rounded-lg mt-1 focus:outline-black"
            required
          />
          <input
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Street"
            className="border border-gray-300 bg-gray-50 p-2.5 rounded-lg mt-1 focus:outline-black"
            required
          />

          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="border border-gray-300 bg-gray-50 p-2.5 rounded-lg w-full focus:outline-black"
              required
            />
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className="border border-gray-300 bg-gray-50 p-2.5 rounded-lg w-full focus:outline-black"
              required
            />
          </div>

          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="number"
              placeholder="Zipcode"
              className="border border-gray-300 bg-gray-50 p-2.5 rounded-lg w-full focus:outline-black"
              required
            />
            <input
              type="text"
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              placeholder="Country"
              className="border border-gray-300 bg-gray-50 p-2.5 rounded-lg w-full focus:outline-black"
              required
            />
          </div>

          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="number"
            placeholder="Phone Number"
            className="border border-gray-300 bg-gray-50 p-2.5 rounded-lg mt-1 focus:outline-black"
            required
          />
        </div>

        {/*----------Right Side (Payment)------------ */}
        <div className="mt-8 w-full sm:max-w-[500px]">
          <div className="mt-8">
            <CartValue />
          </div>

          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="flex flex-col lg:flex-row gap-3 mt-4">
              <div
                onClick={() => setPayMethod("stripe")}
                className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-md hover:bg-gray-50 transition-colors"
              >
                <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod === "stripe" ? "bg-green-500 border-green-500" : "border-gray-400"}`} />
                <img src={assets.stripe_logo} alt="Stripe" className="h-4 mx-4" />
              </div>
              <div
                onClick={() => setPayMethod("razorpay")}
                className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-md hover:bg-gray-50 transition-colors"
              >
                <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod === "razorpay" ? "bg-green-500 border-green-500" : "border-gray-400"}`} />
                <img src={assets.razorpay_logo} alt="Razorpay" className="h-4 mx-4" />
              </div>
              <div
                onClick={() => setPayMethod("cod")}
                className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-md hover:bg-gray-50 transition-colors"
              >
                <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod === "cod" ? "bg-green-500 border-green-500" : "border-gray-400"}`} />
                <p className="text-xs text-gray-500 font-bold uppercase mx-4 tracking-tighter">Cash on Delivery</p>
              </div>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm active:bg-gray-800 transition-all uppercase tracking-widest hover:bg-gray-900 shadow-lg"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;