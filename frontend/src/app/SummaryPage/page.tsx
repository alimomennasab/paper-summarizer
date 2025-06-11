"use client";

import React, { useState, useEffect } from 'react';
import { useUploadContext } from '../components/UploadContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingOverlay from '../components/LoadingOverlay';
import { useRouter } from 'next/navigation';

export default function SummarizePage() {
  const [summary, setSummary] = useState('');
  const { file, fileName } = useUploadContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    };

    fetchSummary();
  }, [file]);

  const handleHomeButtonClick = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      {loading && <LoadingOverlay />}
      <Navbar />
      <div className='flex flex-1 flex-col items-center justify-center w-full max-w-2xl mx-auto px-6'>
          {summary && (
            <div className="flex flex-col items-center justify-center border border-[var(--border-color)] rounded-lg gap-6 p-10 shadow-md">
              <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
                &quot;{fileName}&quot; Summary
              </h1>
              <p className='text-md text-center text-[var(--dark)] max-w-2xl'>
                {summary}
              </p>
              <button 
                className="bg-[var(--foreground)] text-[var(--background)] font-bold text-lg px-4 py-2 rounded hover:bg-[var(--foreground-hover)] transition-colors duration-200"
                onClick={handleHomeButtonClick}
              >
                Return Home
              </button>
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
}
