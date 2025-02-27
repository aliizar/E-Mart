'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const AboutUs = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1 }
    );
  }, []);

  return (
    <div className="min-h-screen mt-4 bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 ref={textRef} className="text-4xl font-bold mb-6 text-center">Welcome to Synthophia Mart</h1>
      
      <p ref={textRef} className="text-lg text-gray-300 max-w-2xl text-center">
        Discover the finest collection of home essentials, ranging from stylish furniture to modern kitchenware. 
        Upgrade your living space with high-quality, durable, and aesthetically pleasing products.
      </p>

      <div className="mt-8 max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-gray-200">Our Mission</h2>
        <p className="text-gray-400 mt-2">
          At Synthophia Mart, we aim to bring innovative, stylish, and sustainable home essentials that enhance your lifestyle.
        </p>
      </div>

      <div className="mt-6 max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-gray-200">Our Vision</h2>
        <p className="text-gray-400 mt-2">
          To become a household name that provides top-tier quality products, creating a perfect blend of modern elegance and functionality.
        </p>
      </div>

      <div ref={imageRef} className="mt-8">
        <Image
           src="https://eshoppingmart.com.pk/wp-content/uploads/2021/05/ESM-Website-Banner-1-1-1536x515.png" 
          alt="About Us Image"
          width={500}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>

    </div>
  );
};

export default AboutUs;
