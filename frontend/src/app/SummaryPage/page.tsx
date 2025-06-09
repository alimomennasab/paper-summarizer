"use client";

import React, { useState, useEffect } from 'react';
import { useUploadContext } from '../components/UploadContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SummarizePage() {
  const [summary, setSummary] = useState('');
  const { file, fileName } = useUploadContext();

  useEffect(() => {
    const fetchSummary = async () => {
      if (!file) {
        console.error("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch('http://localhost:5001/summarize', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        setSummary(data.summary);

      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Failed to fetch summary.");
      }
    };

    fetchSummary();
  }, [file]);

  return (
    <div className="flex flex-col h-screen w-screen">
        <Navbar />
        <div className='flex flex-1 flex-col items-center justify-center w-full max-w-2xl mx-auto px-6'>
            <h1 className="text-2xl font-bold mb-6">
                &quot;{fileName}&quot; Summary
            </h1>
            {summary ?
                <p className='text-md text-center text-[var(--dark)] max-w-2xl'>
                    {summary}
                </p> : 
                <p className='text-md text-center text-[var(--dark)] max-w-2xl'>
                    {/* Loading summary... */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            } 
        </div>
        <Footer />
    </div>
  );
}
