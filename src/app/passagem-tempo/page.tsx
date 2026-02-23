'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PassagemTempo() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Fade In after a short delay
        const fadeInTimer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        // Start Exiting Fade after 3 seconds
        const fadeOutTimer = setTimeout(() => {
            setIsExiting(true);
        }, 3500);

        // Navigate to the next screen after fade out completes
        const navTimer = setTimeout(() => {
            router.push('/chamada-amor');
        }, 4500);

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(fadeOutTimer);
            clearTimeout(navTimer);
        };
    }, [router]);

    return (
        <main className={`min-h-[100dvh] bg-black w-full flex items-center justify-center font-ios transition-opacity duration-1000 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
            <div className={`w-full max-w-[480px] mx-auto p-8 flex items-center justify-center text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide italic">
                    "Alguns meses depois..."
                </h1>
            </div>
        </main>
    );
}
