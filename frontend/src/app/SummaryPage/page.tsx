"use client";

import React, { useState, useEffect } from 'react';
import { useUploadContext } from '../components/UploadContext';

export default function SummarizePage() {
  const [summary, setSummary] = useState('');
  const { file } = useUploadContext();

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
    <div className="p-6">
      {summary ? <p>{summary}</p> : <p>Loading summary...</p>}
    </div>
  );
}
