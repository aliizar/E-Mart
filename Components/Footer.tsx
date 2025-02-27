'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1 }
    );
  }, []);

  return (
    <footer ref={footerRef} className="w-full py-6 border-t-2 border-white bg-black text-gray-300 text-center">
      <p className="text-lg font-semibold">Synthophia Mart &copy; {new Date().getFullYear()}</p>
      <div className="flex justify-center gap-6 mt-4">
        <Link href="#" className="hover:text-white transition-all">Privacy Policy</Link>
        <Link href="#" className="hover:text-white transition-all">Terms of Service</Link>
        <Link href="#" className="hover:text-white transition-all">Contact Us</Link>
      </div>
    </footer>
  );
};

export default Footer;
