"use client"

import React, { useState } from "react";
import SummarizeButton from "./SummarizeButton";
import { FileUploader } from "react-drag-drop-files";

export default function UploadArea() {
  const [uploadButtonClick, setUploadButtonClick] = useState(false);
  const [closeButtonClick, setCloseButtonClick] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileTypes = ["PDF"];


  const handleSummarizeClick = () => {
    setUploadButtonClick(!uploadButtonClick);
  }

  const handleCloseClick = () => {
    setCloseButtonClick(!closeButtonClick);
    setFile(null);
    setUploadButtonClick(false); 
  }

  const handleFileUpload = (uploadedFile: React.SetStateAction<File | null>) => {
    setFile(uploadedFile);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <button 
        className="p-10 bg-[var(--foreground)] text-[var(--background)] font-bold text-lg px-4 py-2 rounded hover:bg-[var(--foreground-hover)] transition-colors duration-200"
        onClick={handleSummarizeClick}
        >
          Upload Your Paper
        </button>
      </div>
      {uploadButtonClick && (
          // Upload popup
          <div className="absolute bg-[var(--background)] flex flex-col items-center justify-center w-1/2 h-1/2 overflow-hidden border border-[var(--border-color)] rounded-lg p-10 shadow-md gap-5 min-h-[60vh] max-h-[90vh]">
            <h1 className="text-4xl font-bold text-center">
              Upload Your Research Paper
            </h1>
            <p className="text-lg text-[var(--dark)] text-center m-4">
              Please upload your research paper in PDF format.
            </p>
            <FileUploader
              handleChange={handleFileUpload}
              name="pdf"
              types={["PDF"]}
              multiple={false}
              accept=".pdf"
              uploadedLabel="Uploaded Successfully"
            >
              <div className="w-[100%] h-[20vh] border-2 border-dashed border-[var(--border-color)] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer text-center mt-auto mb-auto">
                <p className="text-lg font-semibold text-[var(--dark)] mb-4">
                  Select or drag and drop your paper
                </p>
                <p className="text-sm text-[var(--light-text)]">
                  (Only PDF files accepted)
                </p>
              </div>
            </FileUploader>
            {file && (
                <div className="text-center text-[var(--dark)]">
                  <p className="text-lg font-semibold">File Selected:</p>
                  <p className="text-md">{file.name}</p>
                </div>
              )}
            <div className="flex flex-row justify-center items-center gap-4">
              <button 
                className="bg-[var(--foreground)] text-[var(--background)] font-bold text-lg px-4 py-2 rounded hover:bg-[var(--foreground-hover)] transition-colors duration-200"
                onClick={handleCloseClick}
              >
                Exit
              </button>
              {file && (
                <SummarizeButton uploadedPDF={file} fileName={file.name} />
              )}
            </div>
          </div>
        )}
    </>
  );
}

