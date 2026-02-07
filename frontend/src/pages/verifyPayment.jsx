import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';


const verifyPayment = () => {

    const {navigate, token, setCartItems} = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifyPayment = async() => {
        try {
            if(!token) {
                return null;
            }

            const response = await axios.post(`${backendUrl}/api/order/verifyPayment`, { success,orderId }, { headers: { token } });

            if(response.data.success){
                setCartItems({});
                navigate('/orders');
            }
            else{
                navigate('/cart');
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token])

  return (
    <div>
      
    </div>
  )
}

export default verifyPayment;
