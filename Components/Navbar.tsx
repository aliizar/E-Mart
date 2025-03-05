/* eslint-disable @next/next/no-img-element */
'use client';
import gsap from 'gsap';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import NextAuth from "next-auth";
import { authOptions } from "@/auth";
const Navbar = () => {
  const { data: session, status } = useSession();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const signOutBtnRef = useRef<HTMLButtonElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  
  const User = NextAuth(authOptions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set(navRef.current, { y: 0, opacity: 1 });

    tl.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    const button = btnRef.current;
    const signOutButton = signOutBtnRef.current;

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

    if (signOutButton) {
      const handleSignOutHover = () => {
        gsap.to(signOutButton, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleSignOutLeave = () => {
        gsap.to(signOutButton, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      signOutButton.addEventListener("mouseenter", handleSignOutHover);
      signOutButton.addEventListener("mouseleave", handleSignOutLeave);

      return () => {
        signOutButton.removeEventListener("mouseenter", handleSignOutHover);
        signOutButton.removeEventListener("mouseleave", handleSignOutLeave);
      };
    }

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  return (
    <header className='bg-black text-white border-b-[.2px] shadow-2xl blur-0'>
      <nav ref={navRef} className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-bold">
          The <span className="text-gray-400">__</span> Syntopia
        </h1>
        <ul className="hidden md:flex space-x-8 text-sm">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About Us</Link></li>
          {session && (<li><Link href="/productform">Upload Product</Link></li>)}
        </ul>

        {loading ? (
          <div className="w-24 h-10 bg-gray-700 rounded animate-pulse"></div> 
        ) : !session ? (
          <button 
            onClick={() => signIn("google")} 
            ref={btnRef} 
            className="border border-white px-6 py-3 text-sm transition-all"
          >
            Start Marketing ..?
          </button>
        ) : (
          <div className='flex gap-3 items-center'>
            <button 
              onClick={() => signOut()} 
              ref={signOutBtnRef} 
              className="px-6 py-3 text-sm transition-all"
            >
              Sign Out
            </button>
            <Link href={`/profile/${User?.id}`}>
            <img
              src={session.user?.image || ''}
              alt={session.user?.name || "User"}
              className="w-10 h-10 rounded-full border border-white"
            />
            </Link>
           
          </div>
        )}
        
      </nav>
    </header>
  );
};

export default Navbar;
