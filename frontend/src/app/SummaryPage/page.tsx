"use client";

import React, { useState, useEffect } from 'react';

export default function SummarizePage(){
    const [summary, setSummary] = useState('');

    useEffect(() => {
        fetch('../../backend/summarize').then(
            res => res.json()
        ).then(
            data => {
                setSummary(data.summary);
            }
        )
    }, []);

    return (
        <div>
            {summary ? summary : "no summary"}
        </div>
    );
}