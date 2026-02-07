import { createContext, useEffect, useState } from "react";
//import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const delivery_fee = 10;
  const currency = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //add to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select a size");
      return;
    }

    let cartData= structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
    }
    else {
      console.log(error);
      toast.error(error.message);
    }
  };

  //cart item count
  const getCartCount = () => {
    let count = 0;
    for (let item in cartItems) {
      for (let size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            count += Number(cartItems[item][size]);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return count;
  };

  //cart update
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } })
    }
    else {
      console.log(error);
      toast.error(error.message);
    }
  };

  //cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      let cartProduct = products.find((product) => product._id === item);

      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalAmount += cartProduct.price * cartItems[item][size];
          }
        }
        catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalAmount;

  };

  // product data fetch
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setProducts(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) { 
      console.log(error);
      toast.error(error.message);
    }
  }

  // fetch cart data
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        {
          headers: {
            token: token
          }
        }
      );
  
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message || "Failed to fetch cart data.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    getProductsData();
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
      getUserCart(localStorage.getItem("token"))
    }
  },[])

  const value = {
    products,
    delivery_fee,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    getUserCart
    //getCartData,
    // updateCart
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
