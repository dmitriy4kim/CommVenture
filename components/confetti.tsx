'use client';

import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

export default function Confetti() {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Set initial dimensions
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isClient) return null;

    return (
        <ReactConfetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.1}
        />
    );
}
