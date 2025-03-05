/* eslint-disable @next/next/no-img-element */
"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ProductCardTypes } from "./CardsGrid";

const ProductCard = ({ product } : {product : ProductCardTypes}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!btnRef.current) return;

    const button = btnRef.current;
    const handleMouseEnter = () => {
      gsap.to(button, {
        borderRadius: "50px",
        backgroundColor: "white",
        color: "black",
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        borderRadius: "5px",
        backgroundColor: "transparent",
        color: "white",
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <li className="bg-black p-6 rounded-lg shadow-lg border transition-transform transform hover:scale-105">
      <div className="flex justify-between">
        <p className="text-sm text-gray-400">{product.category}</p>
      </div>

      <div className="flex items-center mt-5 gap-5">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">{product.title}</h3>
        </div>
        
      </div>

      <p className="text-gray-300 mt-3 line-clamp-3">{product.description}</p>

      {product.image && (
          <img
          src={product.image}
          alt="Product"
          className="w-full h-48 object-cover mt-3 rounded-md"
          />
        )}

    <p className="text-green-100 mt-2 line-clamp-3">{`${product.price}$`}</p>
      <div className="flex justify-between gap-3 mt-2">
        <button
          ref={btnRef}
          className="border border-white text-white px-4 py-2 rounded transition-all"
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
