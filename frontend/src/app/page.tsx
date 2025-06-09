import React from 'react';
import Navbar from './components/Navbar';
import UploadArea from './components/UploadArea';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      
      <div className='flex flex-1 flex-col items-center justify-center w-full max-w-xl mx-auto px-6'> 
        <div className="flex flex-col items-center justify-center border border-[var(--border-color)] rounded-lg gap-15 p-10 shadow-md">
          <h1 className="text-4xl font-bold text-center">
            Summarize research papers.
          </h1>
          <p className="text-lg text-center text-[var(--dark)]">
            Tired of long, confusing papers? Want to get the gist quickly?
            Upload your research paper as a PDF and get a concise summary in seconds.
          </p>
          
          <UploadArea />
        </div>
      </div>

      <Footer />
    </div>
  );
}
