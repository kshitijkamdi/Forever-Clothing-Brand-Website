import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Login");

  // State Management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    houseNo: "",
    landmark: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: ""
  });

  const onChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, { 
          name, email, password, phone, address 
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome to the collection!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[95%] sm:max-w-[550px] bg-white border border-gray-300 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-100 gap-4 text-gray-800 transition-all duration-500"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <p className="prata-regular text-4xl tracking-tighter">{currentState}</p>
          <hr className="border-none h-[2px] w-10 bg-black" />
        </div>

        {/* --- Identity Section --- */}
        <div className="w-full space-y-4">
          {currentState === "Sign Up" && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black transition-all bg-gray-50/50"
              placeholder="Full Name"
              required
            />
          )}
          
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black transition-all bg-gray-50/50"
            placeholder="Email Address"
            required
          />
          
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black transition-all bg-gray-50/50"
            placeholder="Password"
            required
          />
        </div>

        {/* --- Registration Logistics Section --- */}
        {currentState === "Sign Up" && (
          <div className="w-full flex flex-col gap-4 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-2">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 whitespace-nowrap">Shipping Details</p>
               <hr className="w-full border-gray-100" />
            </div>
            
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="number"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black transition-all bg-gray-50/50"
              placeholder="Phone Number"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input name="houseNo" onChange={onChangeAddress} value={address.houseNo} type="text" className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black bg-gray-50/50" placeholder="House/Bldg No." required />
              <input name="landmark" onChange={onChangeAddress} value={address.landmark} type="text" className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black bg-gray-50/50" placeholder="Landmark" required />
            </div>

            <input name="street" onChange={onChangeAddress} value={address.street} type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black bg-gray-50/50" placeholder="Street Name" required />

            <div className="grid grid-cols-2 gap-4">
              <input name="city" onChange={onChangeAddress} value={address.city} type="text" className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black bg-gray-50/50" placeholder="City" required />
              <input name="state" onChange={onChangeAddress} value={address.state} type="text" className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black bg-gray-50/50" placeholder="State" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input name="zipcode" onChange={onChangeAddress} value={address.zipcode} type="number" className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black bg-gray-50/50" placeholder="Zipcode" required />
              <input name="country" onChange={onChangeAddress} value={address.country} type="text" className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black bg-gray-50/50" placeholder="Country" required />
            </div>
          </div>
        )}

        <div className="w-full flex justify-between text-xs mt-2 px-1">
          <p className="cursor-pointer text-gray-400 hover:text-black transition-all">Forgot password?</p>
          {currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer font-bold underline underline-offset-4">Create account</p>
            : <p onClick={() => setCurrentState('Login')} className="cursor-pointer font-bold underline underline-offset-4">Existing User? Login</p>
          }
        </div>

        <button className="w-full bg-black text-white font-bold py-4 mt-6 rounded-2xl active:scale-95 transition-all uppercase tracking-[0.2em] text-xs shadow-xl shadow-gray-200">
          {currentState === 'Login' ? 'Access Account' : 'Register & Continue'}
        </button>
      </form>
    </div>
  );
};

export default Login;