'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckCircle, Sparkles, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

// Tipagem segura para os trackers
type TrackerWindow = {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
};

function ObrigadoContent() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(0);
    const [confettiPieces] = useState(() =>
        Array.from({ length: 24 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 1.5,
            dur: 1.5 + Math.random() * 1.5,
            color: ['#E6C26E', '#C13C7A', '#7B3FA0', '#FFFFFF'][Math.floor(Math.random() * 4)],
            size: 6 + Math.random() * 8,
        }))
    );
    const firedRef = useRef(false);

    // Parâmetros vindos da Stripe (via URL de redirect configurada no Stripe Dashboard)
    const plan = searchParams.get('plan') || 'anual';
    const planLabel = plan === 'vitalicio' ? 'Vitalício' : plan === 'mensal' ? 'Mensal' : 'Anual';
    const planValue = plan === 'vitalicio' ? 399.90 : plan === 'mensal' ? 29.90 : 199.90;

    useEffect(() => {
        // Dispara somente uma vez para não duplicar eventos
        if (firedRef.current) return;
        firedRef.current = true;

        const win = window as unknown as TrackerWindow;

        // ——— Meta Pixel: Purchase ———
        if (win.fbq) {
            win.fbq('track', 'Purchase', {
                value: planValue,
                currency: 'BRL',
                content_name: `Plano ${planLabel} Bingo2Gether`,
                content_type: 'product',
            });
        }

        // ——— Google Analytics 4: purchase ———
        if (win.gtag) {
            win.gtag('event', 'purchase', {
                transaction_id: `stripe_${Date.now()}`,
                value: planValue,
                currency: 'BRL',
                items: [{
                    item_id: `plan_${plan}`,
                    item_name: `Plano ${planLabel} Bingo2Gether`,
                    price: planValue,
                    quantity: 1,
                }],
            });
        }

        // Animação sequencial dos elementos
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 900),
            setTimeout(() => setStep(3), 1600),
        ];
        return () => timers.forEach(clearTimeout);
    }, [plan, planLabel, planValue]);

    return (
        <main className="min-h-[100dvh] w-full bg-[#050014] text-white overflow-hidden flex flex-col items-center justify-center relative px-6 py-16 font-outfit">

            {/* Background glows */}
            <div className="absolute top-0 left-[-20%] w-[120vw] h-[120vw] max-w-[700px] max-h-[700px] bg-[#7B3FA0] rounded-full blur-[160px] opacity-25 mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 right-[-20%] w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] bg-[#C13C7A] rounded-full blur-[140px] opacity-20 mix-blend-screen pointer-events-none" />

            {/* Confetti */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {confettiPieces.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            left: `${p.x}%`,
                            top: '-20px',
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            backgroundColor: p.color,
                            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                            animationName: 'confettiFall',
                            animationDuration: `${p.dur}s`,
                            animationDelay: `${p.delay}s`,
                            animationTimingFunction: 'linear',
                            animationFillMode: 'forwards',
                            opacity: 0,
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes confettiFall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
            `}</style>

            {/* Card Central */}
            <div
                className={`relative z-10 w-full max-w-[420px] mx-auto flex flex-col items-center text-center gap-8 transition-all duration-700 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {/* Ícone */}
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E6C26E] to-[#C13C7A] flex items-center justify-center shadow-[0_0_60px_rgba(230,194,110,0.4)]">
                        <CheckCircle size={48} className="text-white drop-shadow-md" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center animate-bounce shadow-lg">
                        <Sparkles size={14} className="text-black" />
                    </div>
                </div>

                {/* Texto principal */}
                <div className={`flex flex-col gap-3 transition-all duration-700 delay-200 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 border border-brand-gold/30 text-brand-gold px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide uppercase inline-flex items-center gap-2 mx-auto">
                        <Star size={12} className="fill-brand-gold" /> Plano {planLabel} Ativado
                    </div>
                    <h1 className="text-[36px] sm:text-[42px] font-bold leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                        Vocês estão<br />dentro do jogo! 🎯
                    </h1>
                    <p className="text-[16px] text-white/65 leading-relaxed max-w-[340px] mx-auto">
                        A assinatura foi confirmada com sucesso. Verifiquem o e-mail de cadastro para acessar o app e criar a primeira cartela do casal.
                    </p>
                </div>

                {/* Cards de próximos passos */}
                <div className={`w-full flex flex-col gap-3 transition-all duration-700 delay-500 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

                    {[
                        { emoji: '📱', title: 'Abram o app', desc: 'Acessem bingo2gether-app.vercel.app no celular de vocês dois.' },
                        { emoji: '🎯', title: 'Criem a meta', desc: 'Escolham o primeiro grande sonho do casal e batizem a cartela.' },
                        { emoji: '🥂', title: 'Primeiro brinde', desc: 'Carimbem o primeiro número juntos. O progresso já começa!' },
                    ].map((item, i) => (
                        <div key={i} className="w-full bg-white/5 border border-white/8 rounded-2xl p-4 flex gap-4 items-start text-left backdrop-blur-md hover:bg-white/8 transition-colors">
                            <span className="text-2xl shrink-0 mt-0.5">{item.emoji}</span>
                            <div>
                                <p className="font-semibold text-white text-[15px] mb-0.5">{item.title}</p>
                                <p className="text-white/50 text-[13px] leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}

                    {/* CTA Principal */}
                    <Link
                        href="https://bingo2gether-app.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-brand-gold to-yellow-600 text-[#2A1604] font-extrabold min-h-[60px] rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(230,194,110,0.3)] text-[17px] mt-2"
                    >
                        Abrir o App Agora <ArrowRight size={18} />
                    </Link>

                    <p className="text-[12px] text-white/30 text-center mt-2">
                        Dúvidas?{' '}
                        <a href="https://bingo2gether-app.vercel.app/contato" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60 transition-colors">
                            Fale com o suporte
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default function ObrigadoPage() {
    return (
        <Suspense fallback={null}>
            <ObrigadoContent />
        </Suspense>
    );
}
