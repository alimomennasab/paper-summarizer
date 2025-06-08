'use client';

import React, { createContext, useContext, useState } from "react";

type UploadContextType = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

// Provider component to manage the upload
export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <UploadContext.Provider value={{ file, setFile }}>
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

