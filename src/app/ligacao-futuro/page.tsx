'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MicOff, Grid3X3, Volume2, Plus, Video, Users, Phone } from 'lucide-react';

import Image from 'next/image';

export default function LigacaoFuturo() {
    // ... rest of the code is handled below by specific chunk or I need to rewrite the caller block.
    // Let me provide the specific TargetContent for the caller block.
    const router = useRouter();
    const [callDuration, setCallDuration] = useState(0);
    const [showQuestion, setShowQuestion] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [audioBlocked, setAudioBlocked] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
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
            router.push('/revelacao');
        }, 600);
    };

    const ActionButton = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
        <div className="flex flex-col items-center gap-2">
            <button className="w-[64px] h-[64px] rounded-full bg-[#48484A] flex items-center justify-center transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] focus:ring-2 focus:ring-white">
                <Icon size={28} color="#FFFFFF" />
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
        <main onClick={handlePlayAudio} className={`min-h-screen bg-black w-full overflow-x-hidden flex justify-center transition-opacity duration-700 font-ios select-none ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {audioBlocked && (
                <div className="absolute top-16 left-0 w-full z-50 flex justify-center animate-bounce pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white text-[15px] font-medium shadow-lg border border-white/10 flex items-center gap-2">
                        <Volume2 size={18} /> Toque na tela para ativar o áudio
                    </div>
                </div>
            )}
            <div className="w-full h-screen max-w-[100vw] lg:max-w-[400px] lg:mx-auto lg:rounded-[40px] lg:h-[90vh] lg:my-[5vh] lg:overflow-hidden relative bg-gradient-to-b from-[#1C1C1E] to-[#000000] flex flex-col pt-[env(safe-area-inset-top,44px)] animate-in fade-in duration-500">

                <div className="h-[44px] shrink-0" />

                <div className="flex flex-col flex-1 items-center px-6 relative z-10 transition-opacity duration-700">

                    <div className="flex flex-col items-center mt-4">
                        <div className="w-[120px] h-[120px] rounded-full mb-4 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10 relative">
                            <Image src="/casal.jpg" alt="Amor" fill className="object-cover" />
                        </div>
                        <h1 className="text-[32px] font-semibold text-[#FFFFFF] tracking-tight text-center break-words hyphens-auto leading-tight px-4">
                            Amor ❤️
                        </h1>
                        <p className="text-[16px] font-normal text-[#A0A0A0] mt-1">Conexão Estabelecida</p>

                        {!showQuestion && (
                            <div className="text-[20px] font-light text-[#FFFFFF] tabular-nums mt-1 tracking-wider">
                                {formatTime(callDuration)}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 w-full flex flex-col justify-center items-center relative mt-8 mb-4">
                        {!showQuestion ? (
                            <div className="w-full space-y-4 text-center px-4">
                                <div className="animate-pulse flex items-center justify-center space-x-2 h-12">
                                    <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full bg-[#1C1C1E]/95 backdrop-blur-2xl p-8 rounded-[32px] border border-[#E6C26E]/30 animate-in zoom-in-95 fade-in duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                                <h2 className="text-[#FFFFFF] text-[24px] font-semibold text-center mb-8 leading-tight">Qual método salvou a meta de vocês?</h2>

                                <button
                                    onClick={handleTransition}
                                    className="w-full bg-gradient-to-r from-[#C13C7A] to-[#4B1E6D] text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all focus:ring-2 focus:ring-[#E6C26E] shadow-[0_0_20px_rgba(193,60,122,0.4)] min-h-[56px]"
                                >
                                    <span className="text-2xl">🔓</span> Conheça o App
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ElevenLabs Audio Player */}
                    <audio
                        ref={audioRef}
                        src="/audio-futuro.mp3"
                        autoPlay
                        onEnded={() => setShowQuestion(true)}
                        className="hidden"
                    />

                    <div className={`w-full mb-12 transition-opacity duration-300 ${showQuestion ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
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
                                onClick={() => setShowQuestion(true)}
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
