import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-7 border-t">
        <Title text1={"Contact"} text2={"Us"} />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-10 my-10 pt-10 mb-10">
        <img src={assets.contact_img} alt="contact" className="w-full md:max-w-[450px]" />
        
        <div className=" flex flex-col justify-center items-start p-3 gap-6">
          <p className='text-gray-600 text-2xl font-medium'>Our Store</p>
          <p className='text-gray-500 '>Green Park Apartment, <br/> Katraj, Pune</p>
          <p className='text-gray-600 my-5'>Phone: +1 (555) 123-4567  <br/>Email: support@foreverclothing.com</p>
          <p className='text-gray-600 text-2xl font-medium'>Career At RK Enterprises</p>
          <button className='border border-black hover:bg-black hover:text-white transition duration-500 px-5 py-3'>Explore Jobs</button>
        </div>
    </div>

    <NewsLetter/>
    </div>
  )
}

export default Contact
