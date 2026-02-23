'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Revelacao() {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [totalSum, setTotalSum] = useState(0);
    const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
    const targetSum = 20100;

    // Bingo grid simulation with 25 squares
    const gridValues = [
        800, 1000, 500, 1200, 700,
        600, 900, 1100, 800, 500,
        1500, 700, 800, 1000, 600,
        900, 850, 1200, 550, 750,
        1000, 650, 1100, 500, 800
    ]; // Sum = 21000

    useEffect(() => {
        // Math logic to simulate progressive calculation up to 20,100
        let current = 0;
        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 850) + 100; // Increment dynamically

            if (current >= targetSum) {
                current = targetSum;
                clearInterval(interval);
            }
            setTotalSum(current);

            // Select random squares to 'stamp'
            setDrawnNumbers(prev => {
                const newArr = [...prev];
                if (newArr.length < 25 && Math.random() > 0.4) {
                    const randomSquare = Math.floor(Math.random() * 25);
                    if (!newArr.includes(randomSquare)) {
                        newArr.push(randomSquare);
                    }
                }
                return newArr;
            });

        }, 150);

        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            router.push('/sales');
        }, 600);
    };

    return (
        <main className={`min-h-[100dvh] w-full bg-[#050014] text-white flex flex-col justify-center items-center p-6 relative overflow-hidden transition-opacity duration-700 font-outfit ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

            {/* Background Ambience Cosmic */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[150vw] h-[150vw] max-w-[800px] max-h-[800px] bg-brand-magenta rounded-full blur-[140px] opacity-30 mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[100vw] h-[100vw] max-w-[600px] max-h-[600px] bg-brand-purple rounded-full blur-[120px] opacity-20 mix-blend-screen pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-[480px] mx-auto flex flex-col items-center">

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both flex flex-col items-center w-full">

                    <h1 className="text-[28px] sm:text-[34px] font-bold text-center leading-[1.15] mb-4 text-balance drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                        A forma mais previsível de bater metas financeiras a dois.
                    </h1>
                    <p className="text-[17px] font-dmsans text-center text-white/60 mb-10 max-w-[300px]">
                        Transforme o conflito em um jogo de progresso cumulativo.
                    </p>

                    {/* Valor animado */}
                    <div className="mb-10 text-center font-outfit h-[120px] flex flex-col items-center justify-center relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-brand-gold/10 blur-[50px] pointer-events-none" />
                        <span className="text-brand-gold text-[15px] font-bold tracking-[0.2em] uppercase relative z-10 mb-1 drop-shadow-[0_0_8px_rgba(230,194,110,0.5)]">
                            Valor Acumulado
                        </span>
                        <h2 className="text-[48px] sm:text-[64px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold to-white tracking-tight drop-shadow-sm tabular-nums relative z-10">
                            R$ {totalSum.toLocaleString('pt-BR')}
                        </h2>
                        {totalSum === targetSum && (
                            <div className="flex items-center gap-2 mt-2 animate-bounce">
                                <span className="text-brand-gold font-extrabold text-[20px] tracking-wide drop-shadow-[0_0_12px_rgba(230,194,110,0.8)]">BINGO!</span>
                                <span className="text-white/90 font-medium text-[16px]">Meta atingida 🎉</span>
                            </div>
                        )}
                    </div>

                    {/* Bingo Grid */}
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-3 sm:p-4 bg-[#110B22]/80 backdrop-blur-2xl rounded-[28px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] w-full aspect-square max-w-[360px] mb-12 mx-auto relative overflow-hidden">
                        {gridValues.map((val, idx) => {
                            const isDrawn = drawnNumbers.includes(idx);
                            const isGoldAccent = [12, 18, 2, 7].includes(idx) && isDrawn;

                            return (
                                <div
                                    key={idx}
                                    className={`
                     w-full h-full rounded-xl sm:rounded-2xl flex flex-col items-center justify-center font-bold transition-all duration-500 relative overflow-hidden
                     ${isDrawn
                                            ? isGoldAccent ? 'bg-gradient-to-br from-brand-gold to-yellow-600 text-[#4B1E6D] shadow-[0_0_20px_rgba(230,194,110,0.6),inset_0_2px_4px_rgba(255,255,255,0.5)] scale-105 border border-yellow-300 z-10' : 'bg-gradient-to-br from-brand-magenta to-brand-purple text-white shadow-[0_0_15px_rgba(193,60,122,0.5),inset_0_1px_2px_rgba(255,255,255,0.3)] scale-[1.03] border border-pink-400/50 z-10'
                                            : 'bg-white/5 text-white/30 scale-95 border border-white/5 shadow-inner'
                                        }
                    `}
                                >
                                    {isDrawn && <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>}
                                    {isDrawn ? (
                                        <span className={`text-xl sm:text-2xl drop-shadow-md ${isGoldAccent ? 'text-[#4B1E6D]' : 'text-white'}`}>✓</span>
                                    ) : (
                                        <>
                                            <span className="text-[9px] sm:text-[10px] uppercase font-bold opacity-40 -mb-1">R$</span>
                                            <span className="text-[13px] sm:text-[15px] tracking-tight">{val}</span>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className={`transition-all duration-1000 w-full flex justify-center ${totalSum >= targetSum ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                        <button
                            onClick={handleNext}
                            className="w-full relative group bg-gradient-to-r from-brand-gold to-yellow-600 text-[#2A1604] font-extrabold py-5 px-8 flex items-center justify-center gap-3 active:scale-95 transition-all text-[18px] rounded-[22px] shadow-[0_15px_30px_rgba(230,194,110,0.3)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                            <span className="relative z-10 flex items-center gap-2">🔐 Construir com método <span className="animate-pulse">→</span></span>
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}
