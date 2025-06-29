import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
          if(currentState === "Sign Up"){

            const response = await axios.post(`${backendUrl}/api/user/register`, {name, email, password});
            //console.log(response.data);

            if(response.data.success){
              setToken(response.data.token);
              localStorage.setItem("token", response.data.token)
            }
            else{
              toast.error(response.data.message);
            }
          }
          else{
            const response = await axios.post(`${backendUrl}/api/user/login`, { email, password});
            //console.log(response.data);

            if(response.data.success){
              setToken(response.data.token);
              localStorage.setItem("token", response.data.token)
            }
            else{
              toast.error(response.data.message);
            }
          }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(token){
    navigate("/")
  }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-5 w-[70%] sm:max-w-[96%] items-center justify-between mx-auto mt-20"
    >
      <div className="inline-flex items-center ">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[2.5px] w-8 gap-2 ml-2 bg-gray-700" />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          placeholder="Name"
          className="w-[70%] px-3 py-2 h-12 border border-gray-300 rounded-lg px-5"
          onChange={(e)=>setName(e.target.value)}
          value={name}
          required
        />
      )}
      <input
        type="text"
        placeholder="Email"
        className="w-[70%] px-3 py-2 h-12 border border-gray-300 rounded-lg px-5"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        required
      />
      <input
        type="text"
        placeholder="Password"
        className="w-[70%] px-3 py-2 h-12 border border-gray-300 rounded-lg px-5"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        required
      />

      <div className="flex w-[70%] sm:flex-row justify-between items-center">
        <p className="text-blue-500 cursor-pointer">Forgot Password?</p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="text-gray-800 cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="text-gray-800 cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>

      {currentState === "Login" ? (
        <button className="bg-black text-white px-10 py-2  rounded-sm required active:bg-gray-800">
          Sign In
        </button>
      ) : (
        <button className="bg-black text-white px-10 py-2  rounded-sm required active:bg-gray-800">
          Sign Up
        </button>
      )}
    </form>
  );
};

export default Login;
