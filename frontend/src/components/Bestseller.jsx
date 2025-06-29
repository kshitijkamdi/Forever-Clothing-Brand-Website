import React from 'react'
import { useState, useContext, useEffect } from "react";
import Title from './Title';
import ProductItem from './ProductItem';
import {ShopContext} from "../context/ShopContext";

//import { products } from '../assets/frontend_assets/assets';

const Bestseller = () => {

    const { products } = useContext(ShopContext);
    const [bestseller, setBestseller] = useState([]);


    useEffect(() => {
        const bestsellerproducts = products.filter(item => item.bestseller);
        setBestseller(bestsellerproducts.slice(0, 5));
    }, [products]);

    return (
<div className='my-10'>
    <div className='text-center py-8 text-3xl'>
        <Title text1={'Best'} text2={'Seller'} />
        <p className='w-75 m-auto text-center text-xs sm:text-sm md:text-base text-gray-600'>This is Kshitij Kamdi, the Creator of Kshitij K Vlogs (Youtube), who also owns this Clothing Business.</p>
    </div>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {bestseller.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
    </div>
</div>
  )
}

export default Bestseller
