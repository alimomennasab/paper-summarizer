"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useUploadContext } from '../components/UploadContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingOverlay from '../components/LoadingOverlay';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import ExportPdfButton from '../components/ExportPdfButton';

export default function SummarizePage() {
  const [summary, setSummary] = useState('');
  const { file, fileName } = useUploadContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);

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
      <div ref={targetRef} className='flex flex-1 flex-col items-center justify-center w-full max-w-2xl mx-auto px-6'>
          {summary && (
            <div className="flex flex-col items-center justify-center border border-[var(--border-color)] rounded-lg gap-6 p-10 shadow-md">
              <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
                &quot;{fileName}&quot; Summary
              </h1>
              <div className="max-w-2xl text-[var(--dark)]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: (props) => <h1 className="text-2xl font-bold mt-6 mb-2 text-[var(--foreground)]" {...props} />,
                    h2: (props) => <h2 className="text-xl font-semibold mt-4 mb-1 text-[var(--foreground)]" {...props} />,
                    h3: (props) => <h3 className="text-lg font-semibold mt-3 mb-1 text-[var(--foreground)]" {...props} />,
                    strong: (props) => <strong className="font-bold text-[var(--foreground)]" {...props} />,
                    ul: (props) => <ul className="list-disc pl-6 mb-4" {...props} />,
                    ol: (props) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                    li: (props) => <li className="mb-1" {...props} />,
                    p: (props) => <p className="mb-3 text-[var(--dark)]" {...props} />,
                  }}
                >
                  {summary}
                </ReactMarkdown>
              </div>
              <div className="flex flex-row justify-center items-center gap-4">
                <button 
                  className="bg-[var(--foreground)] text-[var(--background)] font-bold text-lg px-4 py-2 rounded hover:bg-[var(--foreground-hover)] transition-colors duration-200"
                  onClick={handleHomeButtonClick}
                >
                  Return Home
                </button>
                <ExportPdfButton fileName={fileName ?? undefined} targetRef={targetRef} />
              </div>
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
}
