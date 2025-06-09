'use client';

import React, { createContext, useContext, useState } from "react";

type UploadContextType = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileName: string | null;
  setFileName: React.Dispatch<React.SetStateAction<string | null>>;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

// Provider component to manage the upload
export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <UploadContext.Provider value={{ file, setFile, fileName, setFileName }}>
      {children}
    </UploadContext.Provider>
  );
};

// Use context to access the upload
export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};

