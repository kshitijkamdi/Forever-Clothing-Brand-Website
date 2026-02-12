import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div className="px-4 sm:px-0">
      {/* Page Header */}
      <div className="text-2xl pt-10 border-t text-center sm:text-left">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Hero Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16 items-center">
        {/* Image with subtle shadow/border for premium look */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.about_img}
            alt="Forever Brand Hero"
            className="w-full h-auto object-cover rounded-sm shadow-sm"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600 leading-relaxed tracking-wide">
          <p>
            Forever is a clothing brand that embodies timeless style, quality
            craftsmanship, and modern elegance. Designed for individuals who
            seek both sophistication and comfort, Forever offers a versatile
            range of fashion essentials that never go out of style.
          </p>
          <p>
            At Forever, we believe that style is eternal, just like the
            confidence it brings. Our designs blend contemporary trends with
            classic silhouettes, ensuring every piece remains relevant season
            after season.
          </p>
          <div className="pt-4">
            <b className="text-gray-900 text-lg uppercase tracking-widest">Our Mission</b>
            <p className="mt-3">
              Our mission is to create timeless, high-quality, and sustainable
              fashion that empowers individuals with confidence and elegance. We
              blend contemporary aesthetics with classic sophistication.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Section Header */}
      <div className="text-xl py-4 border-t mt-20">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* Features Grid - Improved for Desktop height alignment */}
      <div className="grid grid-cols-1 md:grid-cols-3 mb-20">
        <div className="border border-gray-200 px-10 md:px-16 py-12 flex flex-col gap-5 hover:bg-gray-50 transition-all cursor-default group">
          <b className="text-gray-800 uppercase tracking-tighter group-hover:text-black transition-colors">Quality Assurance</b>
          <p className="text-gray-500 text-sm leading-7">
            At Forever, we are committed to delivering the highest standards of
            quality in every piece we create. Each garment undergoes rigorous testing to ensure durability and comfort.
          </p>
        </div>
        
        <div className="border border-gray-200 px-10 md:px-16 py-12 flex flex-col gap-5 hover:bg-gray-50 transition-all cursor-default group">
          <b className="text-gray-800 uppercase tracking-tighter group-hover:text-black transition-colors">Convenience</b>
          <p className="text-gray-500 text-sm leading-7">
            We believe that fashion should fit seamlessly into your lifestyle. From effortless online shopping to smooth delivery, we ensure a hassle-free experience.
          </p>
        </div>

        <div className="border border-gray-200 px-10 md:px-16 py-12 flex flex-col gap-5 hover:bg-gray-50 transition-all cursor-default group">
          <b className="text-gray-800 uppercase tracking-tighter group-hover:text-black transition-colors">Exceptional Service</b>
          <p className="text-gray-500 text-sm leading-7">
            Our customers are at the heart of everything we do. We are dedicated to providing an exceptional shopping experience with personalized support.
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;