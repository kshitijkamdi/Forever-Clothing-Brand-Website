import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row text-center justify-around text-gray-600 md:text-base text-xs sm:text-sm py-10 gap-12 sm:gap-2'> 
      <div>
        <img src={assets.exchange_icon} className='w-12 mx-auto  mb-5' alt="" />
        <p className="font-semibold">Easy Exchange</p>
        <p className='text-gray-700'>Hassle free exchange process</p>
      </div>

      <div>
        <img src={assets.quality_icon} className="w-12 mx-auto mb-5" alt="" />
        <p className="font-semibold">7 Days Replacement Policy</p>
        <p className='text-gray-700'>We provide easy Replacement policy.</p>
      </div>

      <div>
        <img src={assets.support_img} className="w-12 mx-auto mb-5" alt="" />
        <p className="font-semibold">Customer Support</p>
        <p className='text-gray-700'>We provide 24/7 Customer Feedback</p>
      </div>
    </div>
  )
}

export default OurPolicy
