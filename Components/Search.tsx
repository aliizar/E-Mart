"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaSearch } from "react-icons/fa";
import Form from "next/form";
import SearchReset from "./SearchReset";

export function SearchBar({ query }: { query: string }) {
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(searchBarRef.current, { opacity: 0, y: -20, duration: 1, ease: "power2.out" });
    }, searchBarRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <div ref={searchBarRef} className="w-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-2xl">
        <Form action={"/"} scroll={false} className="searchForm">
          <input
            name="query"
            defaultValue={query}
            type="text"
            placeholder="Search for products..."
            className="w-full p-3 pl-10 pr-20 rounded-full text-black bg-white focus:outline-none shadow-md"
          />
        </Form>
        <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" type="submit">
          <FaSearch />
        </button>
        {query && <SearchReset />}
      </div>
    </div>
  );
}
