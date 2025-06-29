import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {

    const {products }= useContext(ShopContext);
    const [related, setRelated]= useState([]);

    useEffect(()=>{

        if(products.length > 0){

        let ProductCopy = products.slice();

        ProductCopy = ProductCopy.filter((item)=>category === item.category);
        ProductCopy = ProductCopy.filter((item)=>subCategory === item.subCategory);

        setRelated(ProductCopy.slice(0,5));
        }
    },[products])
    
    
  return (
    <div className='my-24'>
      <div className='text-center text-2xl '>
        <Title text1={"Related"} text2={"Products"}/>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
        {related.map((item, index)=>(
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} /> 
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
