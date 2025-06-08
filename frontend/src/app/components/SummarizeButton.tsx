import React from 'react';
import { useRouter } from 'next/navigation';
import { useUploadContext } from './UploadContext';

type SummarizeButtonProps = {
    uploadedPDF: File | null;
}

export default function SummarizeButton({uploadedPDF}: SummarizeButtonProps) {
    const router = useRouter();
    const { setFile } = useUploadContext();
    const handleClick = () => {
        setFile(uploadedPDF);
        router.push('/SummaryPage');
    }

    return (
    <button 
    className="p-10 mt-4 bg-[var(--foreground)] text-[var(--background)] font-bold text-lg px-4 py-2 rounded hover:bg-[var(--foreground-hover)] transition-colors duration-200"
    onClick={handleClick}
    >
        Summarize Paper
    </button>
    )
}