import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-500">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 py-10 sm:py-0 flex justify-center items-center">
        <div className="text-gray-600">
          <div className="flex items-center gap-3">
            <p className="w-8 md:w-11 h-[2px] bg-gray-500"></p>
            <p className="text-sm font-medium md:text-base">Our Bestsellers</p>
          </div>
          <h1 className="prata-regular text-3xl lg:text-5xl sm:py-3">Latest Arrivals</h1>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold md:text-base">Shop Now</p>
            <p className="w-8 md:w-11 h-[1px] bg-gray-500"></p>
          </div>
        </div>
      </div>
        {/* Hero right side */}
        <img src="assets\IMG_20231024_133813.jpg" alt="" className="w-full sm:w-1/2 object-cover" />
    </div>
  );
};

export default Hero;
