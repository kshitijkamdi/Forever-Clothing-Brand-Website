import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { currency } from "../App";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  const removeProduct = async(id)=>{
    
    try {
      const response= await axios.post(`${backendUrl}/api/product/remove`, {id}, {headers:{token}});

      if(response.data.success){
          toast.success(response.data.message);
          await fetchList();
      }
      else{
      console.log(error);
      toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }

  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div>
        <div className="mb-2">
          <p className="text-2xl">All Products list</p>

          <div className="flex flex-col gap-3">
            <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center p-3 border border-gray-300 bg-gray-300">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b className="text-center">Action</b>
            </div>

            {/*Products list*/}
            {list.map((item, index)=>(
              <div key={index} className="grid grid-cols grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] border items-center gap-2 p-2 border-gray-300 ">
                  <img className="w-15" src={item.image[0] } alt=""/>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{currency}{item.price}</p>
                  <p onClick={()=>removeProduct(item._id)} className="md:text-center text-right cursor-pointer text-2xl">X</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
