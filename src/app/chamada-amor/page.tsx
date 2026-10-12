'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Battery, Wifi, Signal } from 'lucide-react';
import Image from 'next/image';

function IncomingAmorCallContent() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState('09:41');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const ringtoneRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const timeInterval = setInterval(updateTime, 10000);

        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            try {
                navigator.vibrate([1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]);
            } catch {
                console.log("Vibration not supported/allowed");
            }
        }

        if (ringtoneRef.current) {
            ringtoneRef.current.play().catch(err => {
                console.log("Audio autoplay prevented by browser. User interaction needed:", err);
            });
        }

        return () => {
            clearInterval(timeInterval);
            if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                try { navigator.vibrate(0); } catch { }
            }
        };
    }, []);

    const handleAccept = () => {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            try { navigator.vibrate(0); } catch { }
        }
        setIsTransitioning(true);
        setTimeout(() => {
            router.push('/ligacao-futuro');
        }, 300);
    };

    const playAudio = () => {
        if (ringtoneRef.current && ringtoneRef.current.paused) {
            ringtoneRef.current.play().catch(err => console.log('Audio fallback failed:', err));
        }
    };

    return (
        <main onClick={playAudio} className={`min-h-[100dvh] bg-black w-full overflow-x-hidden flex justify-center font-ios select-none transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-full h-[100dvh] max-w-[100vw] lg:max-w-[400px] lg:mx-auto lg:rounded-[40px] lg:h-[90vh] lg:my-[5vh] lg:overflow-hidden relative bg-gradient-to-b from-[#1C1C1E] to-[#000000] flex flex-col animate-in fade-in duration-300">
                {/* Status Bar */}
                <div className="h-[44px] shrink-0 w-full flex justify-between items-center px-6 pt-3 z-50">
                    <div className="text-white text-[15px] font-semibold tracking-wide">
                        {currentTime}
                    </div>
                    <div className="flex items-center gap-2 text-white">
                        <Signal size={16} fill="currentColor" strokeWidth={0} />
                        <Wifi size={16} />
                        <div className="relative flex items-center">
                            <Battery size={22} strokeWidth={1.5} className="opacity-90" />
                            <div className="absolute left-[2px] w-[14px] h-[8px] bg-white rounded-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Avatar and Caller Info */}
                <div className="flex flex-col items-center mt-12 w-full px-6 flex-1">
                    <div className="w-[120px] h-[120px] rounded-full mb-4 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10 relative">
                        <Image src="/casal.jpg" alt="Amor" fill className="object-cover" />
                    </div>
                    <h1 className="text-[34px] font-normal text-[#FFFFFF] tracking-tight text-center leading-tight w-full drop-shadow-md">
                        Amor ❤️
                    </h1>
                    <p className="text-[18px] font-normal text-[#FFFFFF]/80 mt-2 tracking-wide animate-pulse">celular chamando...</p>
                </div>

                {/* Bottom Actions */}
                <div className="w-full pb-16 px-8 flex justify-between items-end gap-6 z-10">
                    <div className="flex flex-col items-center gap-2">
                        <button className="w-[75px] h-[75px] rounded-full bg-[#FF3B30] flex items-center justify-center transition-transform duration-200 active:scale-95 focus:ring-2 focus:ring-white">
                            <Phone size={36} color="#FFFFFF" className="rotate-[135deg]" fill="currentColor" />
                        </button>
                        <span className="text-[#FFFFFF] text-[15px] font-medium tracking-wide drop-shadow-md">Recusar</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={handleAccept}>
                        <div className="w-[75px] h-[75px] rounded-full bg-[#34C759] flex items-center justify-center transition-transform duration-200 active:scale-95 animate-bounce shadow-[0_0_20px_rgba(52,199,89,0.5)]">
                            <Phone size={36} color="#FFFFFF" fill="currentColor" className="animate-pulse" />
                        </div>
                        <span className="text-[#FFFFFF] text-[15px] font-medium tracking-wide drop-shadow-md">Atender</span>
                    </div>
                </div>

                <audio
                    ref={ringtoneRef}
                    src="/cellphone-vibrating.mp3"
                    autoPlay
                    loop
                    className="hidden"
                    preload="auto"
                />
            </div>
        </main>
    );
}

export default function ChamadaAmor() {
    return (
        <Suspense fallback={
            <div className="min-h-[100dvh] bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#34C759] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <IncomingAmorCallContent />
        </Suspense>
    );
}
