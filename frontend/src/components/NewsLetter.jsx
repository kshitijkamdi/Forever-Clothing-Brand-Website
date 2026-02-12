import React from 'react'

const NewsLetter = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your subscription logic here
    }

  return (
    <div className='text-center py-20 border-t border-b border-gray-100 my-10'>
      {/* Title with slightly more premium tracking */}
      <p className="text-2xl sm:text-3xl font-medium text-gray-800 tracking-tight">
        Subscribe & Get 20% Off
      </p>
      
      {/* Subtext with better line-height */}
      <p className="text-gray-400 mt-3 mb-8 px-4 leading-relaxed">
        Be the first to know about our latest collections and exclusive promotional offers.
      </p>

      {/* Exquisite Input Group */}
      <form 
        onSubmit={handleSubmit} 
        className='w-full sm:w-1/2 flex items-center gap-0 mx-auto border border-gray-300 pl-3 rounded-sm'
      >
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="w-full sm:flex-1 outline-none text-sm py-3 bg-transparent" 
          required
        />
        <button 
          type="submit" 
          className="bg-black text-white text-xs px-10 py-4 active:bg-gray-700 transition-all uppercase tracking-widest font-medium"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsLetter