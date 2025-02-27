import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const Button = () => {
    const btnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const tl = gsap.timeline();

    

    const button = btnRef.current;
    if (button) {
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
    }

    return () => {
      tl.kill();
    };

  }, []);
  return (
    <button ref={btnRef} className="border border-white px-6 py-3 text-sm transition-all">
          Shop Now
    </button>
  )
}

export default Button
