import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {

  const[image1, setImage1]= useState("");
  const[image2, setImage2]= useState("");
  const[image3, setImage3]= useState("");
  const[image4, setImage4]= useState("");

  const[name, setName]= useState("");
  const[description, setDescription]= useState("");
  const[category, setCategory]= useState("Men");
  const[subCategory, setSubCategory]= useState("Topwear");
  const[price, setPrice]= useState("");
  const[bestseller, setBestseller]= useState(false);
  const[sizes, setSizes]=useState([]);

  const onSubmitHandler= async (e)=>{
    e.preventDefault();

    try {
      const formData= new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response= await axios.post(`${backendUrl}/api/product/add`, formData, {headers:{token}});
      //console.log(response.data);\
      
      if(response.data.success){
        toast.success(response.data.message);

        setName("");
        setBestseller("")
        setCategory("")
        setSubCategory("")
        setDescription("")
        setPrice("")
        setSizes("")
        setImage1("")
        setImage2("")
        setImage3("")
        setImage4("")
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(response.data.message);
      
    }
  }


  return (
    <div>
      <p className="text-2xl font-medium">Add Items</p>
      <hr />
      <form onSubmit={onSubmitHandler}>
        <p className="text-xl font-medium mt-6">Product Images</p>
        <div className="flex flex-row gap-3 my-3">
          <label htmlFor="image1">
            <img className="w-30" src={!image1 ? assets.upload_area: URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-30" src={!image2 ? assets.upload_area: URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-30" src={!image3 ? assets.upload_area: URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-30" src={!image4 ? assets.upload_area: URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>

        <div className="gap-3 my-4 mt-6">
          <p className="text-xl font-medium ">Product Name</p>
          <input
            type="text"
            className="border px-3 py-3 border-gray-400 gap-3 my-3 rounded w-full max-w-[500px]"
            placeholder="Type Here"
            required
            onChange={(e)=> setName(e.target.value)} value={name}
          />
        </div>

        <div className="gap-3 my-3 mt-6">
          <p className="text-xl font-medium ">Product Description</p>
          <textarea
            type="text"
            className="border px-3 py-3 border-gray-400 gap-3 my-3 rounded w-full max-w-[500px]"
            placeholder="Describe the product here"
            required
            onChange={(e)=> setDescription(e.target.value)} value={description}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-10 justify-between md:max-w-[500px]">
          <div className="my-2">
            <p className="text-xl font-medium ">Select Category</p>
            <select 
            onChange={(e)=> setCategory(e.target.value)}className="p-2 m-2 mb-4 px-4">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="my-2">
            <p className="text-xl font-medium ">Select Sub-Category</p>
            <select 
            onChange={(e)=> setSubCategory(e.target.value)}className="p-2 m-2 mb-4 px-4">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        <div>
          <p className="mb-2">Product Sizes:</p>
          <div className="flex gap-3  p-2">
            <div className={`${sizes.includes("S") ? "bg-pink-100":"bg-slate-200"} py-2 px-3 border border-gray-300 cursor-pointer`}>
              <p onClick={()=>setSizes(prev=> prev.includes("S") ? prev.filter(item=> item!== "S"): [...prev,"S"])}>S</p>
            </div>
            <div className={`${sizes.includes("M") ? "bg-pink-100":"bg-slate-200"} py-2 px-3 border border-gray-300 cursor-pointer`}>
              <p onClick={()=>setSizes(prev=> prev.includes("M") ? prev.filter(item=> item!== "M"): [...prev,"M"])}>M</p>
            </div>
            <div className={`${sizes.includes("L") ? "bg-pink-100":"bg-slate-200"} py-2 px-3 border border-gray-300 cursor-pointer`}>
              <p onClick={()=>setSizes(prev=> prev.includes("L") ? prev.filter(item=> item!== "L"): [...prev,"L"])}>L</p>
            </div>
            <div className={`${sizes.includes("XL") ? "bg-pink-100":"bg-slate-200"} py-2 px-3 border border-gray-300 cursor-pointer`}>
              <p onClick={()=>setSizes(prev=> prev.includes("XL") ? prev.filter(item=> item!== "XL"): [...prev,"XL"])}>XL</p>
            </div>
            <div className={`${sizes.includes("XXL") ? "bg-pink-100":"bg-slate-200"} py-2 px-3 border border-gray-300 cursor-pointer`}>
              <p onClick={()=>setSizes(prev=> prev.includes("XXL") ? prev.filter(item=> item!== "XXL"): [...prev,"XXL"])}>XXL</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <p className="text-xl font-medium my-2">Price:</p>
          <input 
          onChange={(e)=> setPrice(e.target.value)} value={price} type="number" className="p-2 px-3" />
        </div>

        <div className="flex my-4 gap-3">
          <input 
          onChange={(e)=> setBestseller(prev => !prev)} checked={bestseller} id="bestseller" type="checkbox" className="w-5" />
          <label className="cursor-pointer text-xl" htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button className="bg-black text-white active:bg-gray-700 px-5 py-2 w-30 cursor-pointer" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
