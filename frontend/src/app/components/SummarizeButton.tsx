import React from 'react';
import { useRouter } from 'next/navigation';
import { useUploadContext } from './UploadContext';

type SummarizeButtonProps = {
    uploadedPDF: File | null;
    fileName?: string;
}

export default function SummarizeButton({uploadedPDF, fileName}: SummarizeButtonProps) {
    const router = useRouter();
    const { setFile, setFileName } = useUploadContext();
    const handleClick = () => {
        setFile(uploadedPDF);
        setFileName(fileName?.replace(".pdf", "") ?? null);
        router.push('/SummaryPage');
    }

    return (
    <button 
    className="bg-[var(--foreground)] text-[var(--background)] font-bold text-lg px-4 py-2 rounded hover:bg-[var(--foreground-hover)] transition-colors duration-200"
    onClick={handleClick}
    >
        Summarize Paper
    </button>
    )
}