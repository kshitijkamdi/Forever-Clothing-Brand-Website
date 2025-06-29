import React, { useContext } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartValue from "../components/CartValue";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [payMethod, setPayMethod] = useState("cod");

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

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name]: value }));
  };

  const {navigate} = useContext(ShopContext);

  return (
    <form className="flex flex-col sm:flex-row gap-4 pt-5 sm:pt-12 justify-between min-h-[80vh]">
      {/*----------Left Side------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-2xl my-5">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 bg-gray-200 p-2 rounded-lg"
                        required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 bg-gray-200 p-2 rounded-lg"
                        required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 bg-gray-200 p-2 rounded-lg mt-3"
                      required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="street"
          className="border border-gray-300 bg-gray-200 p-2 rounded-lg mt-3"
                      required
        />
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone Number"
          className="border border-gray-300 bg-gray-200 p-2 rounded-lg mt-3"
                      required
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 bg-gray-200 p-2 rounded-lg"
                        required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 bg-gray-200 p-2 rounded-lg"
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
            className="border border-gray-300 bg-gray-200 p-2 rounded-lg"
                        required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}

            required       
                 placeholder="Country"
            className="border border-gray-300 bg-gray-200 p-2 rounded-lg"
                        required
          />
        </div>
      </div>

      {/*----------Right Side------------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartValue />
        </div>

        <div className="mt-12 text-2xl">
          <Title text1={"Payment"} text2={"Method"} />

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <div
                onClick={() => setPayMethod("stripe")}
                className="p-3 px-3 border border-gray-300 rounded-lg"
              >
                <p
                  className={` min-w-3.5 h-1.5 rounded-full ${
                    payMethod === "stripe" ? "bg-green-500" : ""
                  }`}
                />
                <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
              </div>
              <div
                onClick={() => setPayMethod("razorpay")}
                className="p-3 px-3 border border-gray-300 rounded-lg"
              >
                <p
                  className={` min-w-3.5 h-1.5 rounded-full ${
                    payMethod === "razorpay" ? "bg-green-500" : ""
                  }`}
                />
                <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
              </div>
              <div
                onClick={() => setPayMethod("cod")}
                className="p-3 px-3 border border-gray-300 rounded-lg"
              >
                <p
                  className={` min-w-3.5 h-1.5 rounded-full ${
                    payMethod === "cod" ? "bg-green-500" : ""
                  }`}
                />
                <p className="text-sm text-gray-600 font-medium">
                  Cash on Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5 px-3">
          <button onClick={()=>navigate('orders')} className="bg-black text-white px-5 py-2">Place Order</button>
        </div>
      </div>


    </fo>
  );
};

export default PlaceOrder;
