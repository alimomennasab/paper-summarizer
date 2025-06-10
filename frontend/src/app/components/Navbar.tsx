"use client";

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="bg-[var(--foreground)] text-[var(--background)] p-4 font-extrabold text-2xl">
      <button 
        className="cursor-pointer"
        onClick={handleClick}
      >
        Paper Summarizer
      </button>
    </div>
  );
}

