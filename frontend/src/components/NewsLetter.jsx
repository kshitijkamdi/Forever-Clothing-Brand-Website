import React from 'react'

const NewsLetter = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

  return (
    <div className=' sm:flex-1 items-center justify-center mt-5 py-10'>
        <p className="text-center text-3xl py-8">Subscribe & Get Shopping Vouchers.</p>
        <p className="text-center text-gray-600 pb-8">Subscribe to our our Newsletter and get regular updates associated to the Promotional Offers.</p>
      <form className='items-center text-center'>
        <input type="email" placeholder="Enter your email" className="border border-gray-300 p-2 w-80 mx-auto" />
        <button onSubmit={handleSubmit} type="submit" className="bg-black text-white p-2 w-40 mt-2 ">Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
