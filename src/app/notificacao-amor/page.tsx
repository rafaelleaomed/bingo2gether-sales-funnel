'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Battery, Wifi, Signal } from 'lucide-react';

function NotificacaoContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const metaQuery = searchParams.get('meta');
    const metaName = metaQuery || 'sua meta';
    const [currentTime, setCurrentTime] = useState('09:41');
    const [currentDate, setCurrentDate] = useState('Segunda-feira, 1 de Janeiro');
    const [showPush, setShowPush] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
            setCurrentDate(now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }));
        };
        updateTime();
        const timeInterval = setInterval(updateTime, 10000);

        // Show push notification after 2.5 seconds
        const pushTimer = setTimeout(() => {
            setShowPush(true);
            if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                try { navigator.vibrate([200, 100, 200]); } catch { }
            }
        }, 2500);

        return () => {
            clearInterval(timeInterval);
            clearTimeout(pushTimer);
        };
    }, []);

    const handleNotificationClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            router.push(`/whatsapp-amor?meta=${encodeURIComponent(metaName)}`);
        }, 400);
    };

    return (
        <main className={`min-h-[100dvh] bg-black w-full overflow-x-hidden flex justify-center font-ios select-none transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div
                className="w-full h-[100dvh] max-w-[100vw] lg:max-w-[400px] lg:mx-auto lg:rounded-[40px] lg:h-[90vh] lg:my-[5vh] lg:overflow-hidden relative bg-cover bg-center flex flex-col animate-in fade-in duration-700"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80')" }}
            >
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

                {/* Status Bar */}
                <div className="h-[44px] shrink-0 w-full flex justify-between items-center px-6 pt-3 z-50">
                    <div className="text-white text-[15px] font-semibold tracking-wide flex items-center gap-1">
                        <Signal size={16} fill="currentColor" strokeWidth={0} />
                        <span className="text-[14px]">Operadora</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                        <Wifi size={16} />
                        <div className="relative flex items-center">
                            <Battery size={22} strokeWidth={1.5} className="opacity-90" />
                            <div className="absolute left-[2px] w-[14px] h-[8px] bg-white rounded-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Lock Screen Time */}
                <div className="flex flex-col items-center mt-12 w-full px-6 z-10 transition-all duration-700">
                    <h2 className="text-[22px] font-medium text-white/90 drop-shadow-md capitalize">
                        {currentDate}
                    </h2>
                    <h1 className="text-[82px] font-bold text-white tracking-tighter leading-none drop-shadow-lg mt-[-5px]">
                        {currentTime}
                    </h1>
                </div>

                {/* Notifications Area */}
                <div className="flex-1 w-full px-4 pt-10 z-10 flex flex-col">
                    {showPush && (
                        <div
                            onClick={handleNotificationClick}
                            className="w-full bg-[#1C1C1E]/70 backdrop-blur-2xl rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] animate-in slide-in-from-top-4 fade-in duration-500 cursor-pointer active:scale-[0.98] transition-all border border-white/10 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-[20px] h-[20px] rounded-md bg-[#25D366] flex items-center justify-center shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                    </div>
                                    <span className="text-[13px] text-white/70 font-medium">WHATSAPP</span>
                                </div>
                                <span className="text-[13px] text-white/50">agora</span>
                            </div>

                            <h3 className="text-[16px] font-semibold text-white mb-0.5">Amor ❤️</h3>
                            <p className="text-[15px] text-white/90 leading-tight">
                                Amor, recebi ligação do fornecedor de {metaName} mas não pude atender. Ele te ligou aí?
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default function NotificacaoAmor() {
    return (
        <Suspense fallback={
            <div className="min-h-[100dvh] bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
        }>
            <NotificacaoContent />
        </Suspense>
    );
}
