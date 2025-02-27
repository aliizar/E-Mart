/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Button";
import { usePathname } from "next/navigation"; 

export default function HomeItemDisplay() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const pathname = usePathname(); 

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, { opacity: 0, x: -50, duration: 1, ease: "power2.out" });
      gsap.from(imageRef.current, { opacity: 0, x: 50, duration: 1, ease: "power2.out", delay: 0.5 });
    }, containerRef);

    return () => ctx.revert(); 
  }, [pathname]); 

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row items-center justify-between bg-black text-white p-6 rounded-xl shadow-lg">
      <div ref={textRef} className="md:w-1/2 text-center md:text-left p-4">
        <h2 className="text-3xl font-bold mb-4">Welcome to Synthophia Mart</h2>
        <p className="text-lg mb-4">
          Discover the finest collection of home essentials, ranging from stylish furniture to modern kitchenware.
          Upgrade your living space with high-quality, durable, and aesthetically pleasing products.
        </p>
        <Button />
      </div>

      <div ref={imageRef} className="md:w-1/2 flex justify-center p-4">
        <img
          src="https://eshoppingmart.com.pk/wp-content/uploads/2021/05/ESM-Website-Banner-1-1-1536x515.png"
          alt="Home Essentials"
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
    </div>
  );
}
