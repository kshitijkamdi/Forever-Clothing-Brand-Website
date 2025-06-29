import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-7 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>

      <div className="flex flex-col  items-center md:flex-row pt-10">
        <img
          src={assets.about_img}
          alt="about"
          className="w-full md:max-w-[450px]"
        />

        <div className=" flex flex-col justify-center text-gray-600 p-3 md:w-2/4 gap-6">
          <p>
            Forever is a clothing brand that embodies timeless style, quality
            craftsmanship, and modern elegance. Designed for individuals who
            seek both sophistication and comfort, Forever offers a versatile
            range of fashion essentials that never go out of style. From
            effortlessly chic casual wear to statement pieces that redefine
            luxury, every collection is crafted with premium fabrics and
            attention to detail.
          </p>
          <p>
            At Forever, we believe that style is eternal, just like the
            confidence it brings. Our designs blend contemporary trends with
            classic silhouettes, ensuring every piece remains relevant season
            after season. Sustainability and innovation are at the heart of our
            brand, as we strive to create clothing that not only looks good but
            also feels good—both ethically and aesthetically.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to create timeless, high-quality, and sustainable
            fashion that empowers individuals with confidence and elegance. We
            blend contemporary aesthetics with classic sophistication, ensuring
            that every piece remains stylish beyond trends.
          </p>
        </div>
      </div>

      <div className="text-2xl  p-10 border-t">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>

      <div className="flex flex-col items-center md:flex-row py-5 ">
        <div className="border border-gray-300 px-12 md:px-15 py-12 md:py-12">
          <b>Quality Assuarance</b>
          <p>
            At Forever, we are committed to delivering the highest standards of
            quality in every piece we create. From premium fabrics to meticulous
            craftsmanship, each garment undergoes rigorous testing to ensure
            durability, comfort, and flawless design.
          </p>
        </div>
        <div className="border border-gray-300 px-12 md:px-15 py-12 md:py-12">
          <b>Convenience </b>
          <p>
            We believe that fashion should fit seamlessly into your lifestyle,
            which is why Forever is designed for ultimate convenience. From
            effortless online shopping to smooth delivery and easy returns, we
            ensure a hassle-free experience at every step. 
          </p>
        </div>
        <div className="border border-gray-300 px-12 md:px-15 py-12 md:py-12">
          <b> Exceptional Customer Service</b>
          <p>
            Our customers are at the heart of everything we do. We are dedicated
            to providing an exceptional shopping experience with personalized
            support, prompt assistance, and a commitment to your satisfaction.
            Whether you need styling advice, order assistance, or after-sales
            support, our team is always ready to go the extra mile.
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
