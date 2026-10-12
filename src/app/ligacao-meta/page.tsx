'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MicOff, Grid3X3, Volume2, Plus, Video, Users, Phone, Target, Home, Plane, Car, Gem, Battery, Wifi, Signal } from 'lucide-react';

// Custom SVG para Alianças (Casamento)
const RingsIcon = ({ className = "", size = 24, strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
    </svg>
);

function LigacaoContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const metaQuery = searchParams.get('meta');
    const metaName = metaQuery || 'Nossa Meta';

    // Choose icon based on meta name mapping
    const lowerMeta = metaName.toLowerCase();
    let CallerIcon: React.ElementType = Target;
    if (lowerMeta.includes('casa') || lowerMeta.includes('reforma') || lowerMeta.includes('constru')) CallerIcon = Home;
    else if (lowerMeta.includes('viag') || lowerMeta.includes('euro') || lowerMeta.includes('disney')) CallerIcon = Plane;
    else if (lowerMeta.includes('casament') || lowerMeta.includes('festa') || lowerMeta.includes('noiv')) CallerIcon = RingsIcon;
    else if (lowerMeta.includes('carro') || lowerMeta.includes('moto') || lowerMeta.includes('veicul')) CallerIcon = Car;
    else if (lowerMeta.includes('joia') || lowerMeta.includes('ouro')) CallerIcon = Gem;

    const [callDuration, setCallDuration] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentTime, setCurrentTime] = useState('09:41');
    const [audioBlocked, setAudioBlocked] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Set dynamic local time for the status bar
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const timeInterval = setInterval(updateTime, 10000); // update every 10s is enough

        const timer = setInterval(() => {
            setCallDuration((prev) => prev + 1);
        }, 1000);

        if (audioRef.current) {
            audioRef.current.play().catch(err => {
                console.log("Autoplay blocked:", err);
                setAudioBlocked(true);
            });
        }

        return () => {
            clearInterval(timeInterval);
            clearInterval(timer);
        };
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTransition = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            router.push(`/notificacao-amor?meta=${encodeURIComponent(metaName)}`);
        }, 500);
    };

    const ActionButton = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
        <div className="flex flex-col items-center gap-2">
            <button className="w-[64px] h-[64px] rounded-full bg-[#48484A] flex items-center justify-center transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] focus:ring-2 focus:ring-white">
                <Icon size={28} color="#FFFFFF" strokeWidth={1.5} />
            </button>
            <span className="text-[#FFFFFF] text-[13px] font-normal">{label}</span>
        </div>
    );

    const handlePlayAudio = () => {
        if (audioRef.current && audioBlocked) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setAudioBlocked(false);
                }).catch(err => console.log("Still blocked:", err));
            }
        }
    };

    return (
        <main onClick={handlePlayAudio} className={`min-h-[100dvh] bg-black w-full overflow-x-hidden flex justify-center transition-opacity duration-500 font-ios select-none ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {audioBlocked && (
                <div className="absolute top-16 left-0 w-full z-50 flex justify-center animate-bounce pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white text-[15px] font-medium shadow-lg border border-white/10 flex items-center gap-2">
                        <Volume2 size={18} /> Toque na tela para ativar o áudio
                    </div>
                </div>
            )}
            <div className="w-full h-[100dvh] max-w-[100vw] lg:max-w-[400px] lg:mx-auto lg:rounded-[40px] lg:h-[90vh] lg:my-[5vh] lg:overflow-hidden relative bg-gradient-to-b from-[#1C1C1E] to-[#000000] flex flex-col animate-in fade-in duration-300">

                {/* Status Bar (iOS Simulation) */}
                <div className="h-[44px] shrink-0 w-full flex justify-between items-center px-6 pt-3 z-50">
                    <div className="text-white text-[15px] font-semibold tracking-wide">
                        {currentTime}
                    </div>
                    <div className="flex items-center gap-2 text-white">
                        <Signal size={16} fill="currentColor" strokeWidth={0} />
                        <Wifi size={16} />
                        <div className="relative flex items-center">
                            <Battery size={22} strokeWidth={1.5} className="opacity-90" />
                            {/* Simulated battery fill */}
                            <div className="absolute left-[2px] w-[14px] h-[8px] bg-white rounded-sm"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center px-6 relative z-10 transition-opacity duration-700">
                    {/* Caller Info */}
                    <div className="flex flex-col items-center mt-6 w-full">
                        <div className="w-[110px] h-[110px] rounded-full mb-4 overflow-hidden shadow-[0_0_30px_rgba(230,194,110,0.15)] border border-[#E6C26E]/30 flex items-center justify-center bg-gradient-to-br from-[#2C2C2E] to-[#1C1C1E]">
                            <div className="text-[#E6C26E] animate-pulse">
                                <CallerIcon size={48} strokeWidth={1.5} />
                            </div>
                        </div>
                        <h1 className="text-[32px] font-semibold text-[#FFFFFF] tracking-tight text-center break-words hyphens-auto leading-tight w-full line-clamp-2 px-2">
                            {metaName}
                        </h1>
                        <p className="text-[17px] font-normal text-[#A0A0A0] mt-1">ligação em andamento...</p>

                        <div className="text-[20px] font-light text-[#FFFFFF] tabular-nums mt-1 tracking-wider">
                            {formatTime(callDuration)}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 w-full flex flex-col justify-center items-center relative mt-6 mb-4">
                        {/* Audio visualization */}
                        <div className="w-full flex flex-col justify-center items-center h-full animate-in fade-in duration-500 mt-4">
                            <div className="w-[80%] h-[120px] rounded-3xl border border-[#48484A]/30 flex items-center justify-center bg-[#1C1C1E]/50 shadow-inner">
                                <div className="flex gap-1.5 justify-center items-center h-16 relative">
                                    {/* Static/CSS simulation of Voice Waveform to give feedback */}
                                    {[...Array(15)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 bg-gradient-to-t from-[#E6C26E] to-[#C13C7A] rounded-full animate-pulse"
                                            style={{
                                                height: `${Math.random() * 60 + 20}%`,
                                                animationDelay: `${i * 0.1}s`,
                                                animationDuration: '0.8s',
                                                animationDirection: 'alternate-reverse'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <audio
                                ref={audioRef}
                                src="/ligacao1.mp3"
                                autoPlay
                                playsInline
                                onEnded={handleTransition}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="w-full mb-10 transition-opacity duration-300">
                        <div className="grid grid-cols-3 gap-y-6 gap-x-8 px-6 mb-10 justify-items-center">
                            <ActionButton icon={MicOff} label="mudo" />
                            <ActionButton icon={Grid3X3} label="teclado" />
                            <ActionButton icon={Volume2} label="alto-falante" />
                            <ActionButton icon={Plus} label="adicionar" />
                            <ActionButton icon={Video} label="FaceTime" />
                            <ActionButton icon={Users} label="contatos" />
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={handleTransition}
                                className="w-[72px] h-[72px] rounded-full bg-[#FF3B30] flex items-center justify-center transition-transform duration-200 active:scale-95 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                                aria-label="Desligar"
                            >
                                <Phone size={36} color="#FFFFFF" className="rotate-[135deg]" fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

// Wrapper to suspend useSearchParams requirement in Next.js 14 App Router
export default function LigacaoMeta() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black w-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#E6C26E] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <LigacaoContent />
        </Suspense>
    );
}
