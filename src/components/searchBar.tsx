"use client";
import { useEffect, useState } from "react";

interface SearchbarProps {
  value: string;
  onChange: (e: any) => void;
  onSearch: () => void;
}

export default function Searchbar({ value, onChange, onSearch }: SearchbarProps) {
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50); 
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
      <div
        className={`searchbar flex justify-center py-2 px-10 sticky top-0 z-50 w-full transition-colors duration-300 ${
          scrolled ? "bg-yellow-500 shadow-md" : "bg-transparent"
        }`}
      >
      <input type="search" value={value} onChange={onChange} placeholder="Search by title..." className="border rounded-l-xl p-2 border-neutral-50 w-96 bg-white" />
      <button onClick={onSearch} className="bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer text-white rounded-r-xl border border-neutral-50 p-2 w-28">
        Search
      </button>
    </div>
  );
}
