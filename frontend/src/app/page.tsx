import React from 'react';
import Navbar from './components/Navbar';
import UploadArea from './components/UploadArea';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <UploadArea />
    </div>
  );
}
