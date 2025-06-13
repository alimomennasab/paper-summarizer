'use client';

import { RefObject } from 'react';
import toPDF from 'react-to-pdf';

type ExportPdfButtonProps = {
    fileName?: string;
    targetRef: RefObject<HTMLElement | null>;
};

export default function ExportPdfButton({ fileName = 'summary', targetRef }: ExportPdfButtonProps) {
    const handleDownload = async () => {
        await toPDF(() => targetRef.current, {
        filename: `${fileName.replace(/ /g, "_")}_summary.pdf`
        });
    };

    return (
        <button
        onClick={handleDownload}
        className="bg-[var(--foreground)] text-[var(--background)] font-bold text-lg px-4 py-2 rounded hover:bg-[var(--foreground-hover)] transition-colors duration-200"
        >
            Export Summary as PDF
        </button>
    );
}
