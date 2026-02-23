'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, ChevronDown, Lock, Shield, Sparkles, Plane, Home, Target, ArrowRight } from 'lucide-react';

export default function SalesPage() {
    const router = useRouter();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<'anual' | 'mensal' | 'vitalicio'>('anual');

    const faqs = [
        { q: "Já tentei planilha e não deu certo. Por que isso funcionaria?", a: "Planilhas não engajam porque não mostram progresso visual nem são gamificadas. O Bingo2Gether transforma a meta num jogo on-line compartilhado, onde cada número carimbado vira uma vitória." },
        { q: "E se a gente ganhar salários diferentes?", a: "Temos um Algoritmo de Justiça integrado. O app calcula e distribui de forma inteligente as parcelas (números do bingo) baseando-se na renda proporcional de cada um, evitando brigas por dinheiro." },
        { q: "Meu parceiro não gosta de falar de dinheiro...", a: "Comece sozinh@! Quando ele(a) vir o seu bingo preenchendo, a curiosidade e o gatilho visual farão com que queiram participar. O design gamificado tira o peso da palavra 'finanças'." },
        { q: "Eu pago pelos dois no plano PRO?", a: "Sim! Um único plano PRO na sua conta serve para sincronizar o casal inteiro. Você assina, e convida de graça." },
    ];

    const scrollToPlanos = () => {
        document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-[100dvh] w-full bg-[#050014] text-white font-dmsans overflow-x-hidden relative selection:bg-brand-magenta/30 selection:text-white pb-32">
            {/* Bg Grid & Glows */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="absolute top-0 left-[-20%] w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] bg-brand-purple rounded-full blur-[140px] opacity-20 mix-blend-screen pointer-events-none" />
            <div className="absolute top-[30%] right-[-30%] w-[100vw] h-[100vw] max-w-[600px] max-h-[600px] bg-brand-magenta rounded-full blur-[120px] opacity-15 mix-blend-screen pointer-events-none" />

            {/* Container */}
            <div className="relative z-10 w-full max-w-[480px] mx-auto px-5 sm:px-6">

                {/* 1. HEADLINE */}
                <section className="pt-24 pb-16 flex flex-col items-center text-center w-full animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    <div className="bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 border border-brand-gold/20 text-brand-gold px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide uppercase mb-8 flex items-center gap-2 backdrop-blur-md shadow-[0_0_20px_rgba(230,194,110,0.15)]">
                        <Sparkles size={14} className="animate-pulse" /> Solução para Casais
                    </div>
                    <h1 className="text-[40px] sm:text-[46px] font-outfit font-bold leading-[1.05] mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-sm">
                        A constância que falta nas finanças de vocês.
                    </h1>
                    <p className="text-[17px] text-white/70 leading-relaxed mb-10 max-w-[340px] mx-auto">
                        O método gamificado que acaba com o improviso invisível e transforma metas chatas de dividir num jogo on-line a dois.
                    </p>

                    <button
                        onClick={scrollToPlanos}
                        className="w-full bg-white text-black font-semibold min-h-[60px] rounded-[20px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] text-[18px]"
                    >
                        Estruturar o Futuro Agora <ArrowRight size={18} />
                    </button>
                    <p className="mt-4 text-[13px] text-white/40 font-medium tracking-wide">Junte-se a 12.000+ casais seguros.</p>
                </section>

                {/* 2. O PROBLEMA INVISÍVEL */}
                <section className="py-16 w-full flex flex-col gap-5">
                    <h2 className="text-[28px] font-outfit font-bold text-center mb-6 leading-tight">Por que as metas a dois fracassam?</h2>

                    <div className="bg-[#110B22]/60 border border-white/5 rounded-[28px] p-6 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)] flex gap-4 items-start relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors"></div>
                        <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-red-500/10 to-red-900/10 border border-red-500/10 flex items-center justify-center shrink-0 shadow-inner">
                            <span className="text-2xl">🙊</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-[19px] font-semibold text-white/95 mb-2 font-outfit">O Silêncio Mortal</h3>
                            <p className="text-[15px] text-white/60 leading-relaxed">
                                72% dos casais evitam dores financeiras. O desconforto enterra os sonhos muito antes deles sequer nascerem.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#110B22]/60 border border-white/5 rounded-[28px] p-6 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)] flex gap-4 items-start relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors"></div>
                        <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-orange-500/10 to-orange-900/10 border border-orange-500/10 flex items-center justify-center shrink-0 shadow-inner">
                            <span className="text-2xl">💀</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-[19px] font-semibold text-white/95 mb-2 font-outfit">Cemitério de Planilhas</h3>
                            <p className="text-[15px] text-white/60 leading-relaxed">
                                Excel não tem apelo tátil, é frio e sem recompensas. Planilhas perdem no quesito retenção de dopamina e vocês desistem.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. REVELAÇÃO DA TRANSIÇÃO */}
                <section className="py-20 w-full text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[100px] bg-brand-gold/10 blur-[80px]" />
                    <h2 className="text-[32px] font-outfit font-bold mb-6 text-brand-gold relative z-10 drop-shadow-md">Improviso gera atrito.</h2>
                    <p className="text-[18px] text-white/80 leading-relaxed max-w-[340px] mx-auto relative z-10">
                        Vocês não precisam "juntar o que sobra". Precisa-se de um taboeiro justo, que recompense cada esforço <strong>sem castigar no orçamento de quem recebe menos</strong>.
                    </p>
                </section>

                {/* 4. O MECANISMO BINGO */}
                <section className="py-16 w-full flex flex-col">
                    <h2 className="text-[36px] font-outfit font-bold mb-12 text-center leading-[1.1]">Como o app<br />muda o jogo</h2>

                    {/* MOCKUP 3D DO BINGO */}
                    <div className="w-full relative shrink-0 aspect-square bg-[#110B22]/80 backdrop-blur-2xl rounded-[36px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] mb-12 p-8 flex flex-col items-center justify-center overflow-hidden">
                        {/* Glows */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/20 rounded-full blur-[50px] mix-blend-screen"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-magenta/30 rounded-full blur-[50px] mix-blend-screen"></div>

                        {/* Title Bar Virtual */}
                        <div className="w-full flex justify-between items-center mb-6 px-2 relative z-10">
                            <div className="text-[14px] font-outfit text-white/90 font-bold uppercase tracking-widest drop-shadow-md">Viagem Japão</div>
                            <div className="bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[12px] px-3 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(230,194,110,0.2)]">14/200</div>
                        </div>

                        {/* Grid Virtual CSS */}
                        <div className="grid grid-cols-5 gap-2 w-full max-w-[280px] relative z-10">
                            {Array.from({ length: 20 }).map((_, i) => {
                                const isGoldAccent = [2, 7, 12, 18].includes(i);
                                const isMagentaAccent = [0, 4, 15].includes(i);
                                return (
                                    <div key={i} className={`aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center text-[13px] font-bold transition-all duration-500 relative overflow-hidden
                                    ${isGoldAccent ? 'bg-gradient-to-br from-brand-gold to-yellow-600 border border-yellow-300 text-[#4B1E6D] scale-105 shadow-[0_0_20px_rgba(230,194,110,0.6),inset_0_2px_4px_rgba(255,255,255,0.5)] z-10' :
                                            isMagentaAccent ? 'bg-gradient-to-br from-brand-magenta to-brand-purple text-white border border-pink-400/50 scale-[1.03] shadow-[0_0_15px_rgba(193,60,122,0.5),inset_0_1px_2px_rgba(255,255,255,0.3)] z-10' :
                                                'bg-white/5 border border-white/5 text-white/30 shadow-inner'}`}
                                    >
                                        {isGoldAccent || isMagentaAccent ? (
                                            <>
                                                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
                                                <span className="drop-shadow-md text-[16px]">✓</span>
                                            </>
                                        ) : (
                                            i + 1
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* 1. Bingo */}
                        <div className="bg-gradient-to-br from-brand-purple/20 to-[#110B22]/60 border border-brand-purple/30 rounded-[28px] p-6 relative overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                            <div className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-brand-magenta to-brand-purple h-full shadow-[0_0_15px_rgba(193,60,122,0.8)]"></div>
                            <h3 className="text-[20px] font-outfit font-bold mb-2 text-white">Como Funciona o Bingo Financeiro?</h3>
                            <p className="text-[15px] text-white/70 leading-relaxed">
                                Toda a meta do casal é dividida em <strong className="text-white">cartelas de bingo</strong>. Simples assim. À medida que o dinheiro entra no mês daquele objetivo, os números são ativamente sorteados e cortados na tela de vocês. E o melhor de tudo: quem carimbar o último número da cartela e fizer <strong className="text-brand-magenta drop-shadow-[0_0_5px_rgba(193,60,122,0.8)]">BINGO</strong> ganha um prêmio <em className="text-white/50 text-[13px]">(uma recompensa só para dois combinada no início do jogo!)</em>.
                            </p>
                        </div>

                        {/* 2. Algoritmo */}
                        <div className="bg-gradient-to-br from-brand-gold/10 to-[#110B22]/60 border border-brand-gold/20 rounded-[28px] p-6 relative overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                            <div className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-brand-gold to-yellow-600 h-full shadow-[0_0_15px_rgba(230,194,110,0.8)]"></div>
                            <h3 className="text-[20px] font-outfit font-bold mb-2 text-white">Fim da Injustiça Salarial</h3>
                            <p className="text-[15px] text-white/70 leading-relaxed">
                                E se um ganhar o dobro do outro? Sem estresse. Vocês ajustam no app quanto cada um ganha. A partir daí, nosso algoritmo secreto entra em ação em todas as cartelas: ele designa as casinhas de maior valor para a pessoa de maior renda. <strong className="text-brand-gold drop-shadow-[0_0_5px_rgba(230,194,110,0.5)]">A proporção justa é blindada.</strong> Vocês mantêm o espírito de time, sem sufocar e sem fazer conta.
                            </p>
                        </div>

                        {/* 3. AI Coach */}
                        <div className="bg-gradient-to-br from-[#110B22]/80 to-[#110B22]/40 border border-white/10 rounded-[28px] p-6 relative overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                            <div className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-white to-white/30 h-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                            <h3 className="text-[20px] font-outfit font-bold mb-2 text-white">Seu Oráculo Financeiro Pessoal</h3>
                            <p className="text-[15px] text-white/70 leading-relaxed">
                                Nosso <strong className="text-white">Coach IA</strong> faz mais do que mostrar gráficos. Ele lança <strong className="text-white">desafios interativos</strong> no meio da semana! Perdeu o desafio ou descumpriu algo? Paga uma prenda, ou pior: é obrigado a sortear na hora um novo número e depositar na cartela. O perdedor pode até se irritar no dia, mas o prêmio final nunca sai perdendo.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5. MULTIPLAS METAS CARDS */}
                <section className="py-12 w-full flex flex-col gap-4">
                    <h2 className="text-[28px] font-outfit font-bold text-center mb-6 leading-tight">Uma cartela para<br />cada sonho</h2>

                    <div className="w-full bg-gradient-to-br from-[#1C1A2E] to-[#120D22] border border-white/10 rounded-[28px] p-6 relative overflow-hidden group">
                        <Plane className="text-white/10 w-32 h-32 absolute -bottom-4 -right-4 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                                <Plane className="text-blue-400" size={24} />
                            </div>
                            <h3 className="font-outfit font-bold text-[22px] mb-2">Viagens Inesquecíveis</h3>
                            <p className="text-white/60 text-[15px] leading-relaxed mb-4">Diga adeus ao "vamos ver". Preencha a cartela e garantam a passagem sem recorrer a 12x no cartão.</p>
                            <div className="text-blue-400 font-bold tracking-wide text-sm">Destino Pago →</div>
                        </div>
                    </div>

                    <div className="w-full bg-gradient-to-br from-[#2E1A2B] to-[#1A0D1D] border border-white/10 rounded-[28px] p-6 relative overflow-hidden group">
                        <Home className="text-white/10 w-32 h-32 absolute -bottom-4 -right-4 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-brand-magenta/20 rounded-full flex items-center justify-center mb-4">
                                <Home className="text-brand-magenta" size={24} />
                            </div>
                            <h3 className="font-outfit font-bold text-[22px] mb-2">O Primeiro Apê</h3>
                            <p className="text-white/60 text-[15px] leading-relaxed mb-4">Construam o fundo de entrada tijolo por tijolo. Vocês acompanham o progresso subindo todo mês.</p>
                            <div className="text-brand-magenta font-bold tracking-wide text-sm">Chaves na Mão →</div>
                        </div>
                    </div>

                    <div className="w-full bg-gradient-to-br from-[#2E281A] to-[#1D180D] border border-white/10 rounded-[28px] p-6 relative overflow-hidden group">
                        <Target className="text-white/10 w-32 h-32 absolute -bottom-4 -right-4 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mb-4">
                                <Target className="text-brand-gold" size={24} />
                            </div>
                            <h3 className="font-outfit font-bold text-[22px] mb-2">Casamento Limpo</h3>
                            <p className="text-white/60 text-[15px] leading-relaxed mb-4">Chegar no altar sem começar a vida a dois cobertos de dívidas e ressentimentos financeiros.</p>
                            <div className="text-brand-gold font-bold tracking-wide text-sm">Festa Paga →</div>
                        </div>
                    </div>
                </section>

                {/* 6. FREE VS PRO */}
                <section className="py-20 w-full">
                    <h2 className="text-[32px] font-outfit font-bold text-center mb-10 leading-tight">Escolham o pacote<br />do sucesso</h2>

                    <div className="bg-[#110B22]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-[inset_0_1px_10px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.5)] relative">
                        {/* Glow back */}
                        <div className="absolute top-0 right-0 w-[160px] h-full bg-brand-gold/5 blur-[40px] pointer-events-none" />

                        {/* Header */}
                        <div className="grid grid-cols-[1fr_75px_75px] border-b border-white/5 bg-white/5 p-5 items-end relative z-10">
                            <div className="font-outfit text-white/40 text-[13px] uppercase tracking-wider font-bold">Resumo</div>
                            <div className="text-center font-outfit font-bold text-white/50 text-[15px]">Free</div>
                            <div className="text-center font-outfit font-bold text-brand-gold text-[16px] drop-shadow-[0_0_8px_rgba(230,194,110,0.5)]">PRO</div>
                        </div>

                        {/* Rows */}
                        {[
                            { name: "Progressão de Bingo Completa", free: true, pro: true },
                            { name: "Algoritmo de Divisão Salarial", free: true, pro: true },
                            { name: "Coach IA Oráculo", free: "3/mês", pro: "Eterno" },
                            { name: "Sincronização Nuvem p/ Casais", free: false, pro: true },
                            { name: "Skins e Temas Personalizados", free: false, pro: true },
                            { name: "Previsões Inteligentes ETA", free: false, pro: true },
                        ].map((feature, i) => (
                            <div key={i} className="grid grid-cols-[1fr_75px_75px] border-b border-white/5 p-5 items-center hover:bg-white/5 transition-colors relative z-10">
                                <div className="text-[14px] text-white/90 leading-snug pr-2 font-medium">{feature.name}</div>
                                <div className="flex justify-center text-white/30 text-[13px] font-bold">
                                    {typeof feature.free === 'boolean' ? (feature.free ? <Check size={18} className="text-white/40" /> : <X size={18} />) : feature.free}
                                </div>
                                <div className="flex justify-center text-brand-gold text-[13px] font-bold">
                                    {typeof feature.pro === 'boolean' ? (feature.pro ? <Check size={18} /> : <X size={18} />) : feature.pro}
                                </div>
                            </div>
                        ))}

                        {/* Footer PRO Anchor */}
                        <div className="bg-gradient-to-br from-brand-purple/50 to-brand-magenta/30 p-8 flex flex-col items-center justify-center text-center gap-2 border-t border-brand-magenta/40 relative z-10 shadow-[inner_0_20px_40px_rgba(193,60,122,0.2)]">
                            <Shield className="text-brand-gold mb-2" size={32} />
                            <p className="font-outfit font-extrabold text-[20px] text-white tracking-wide">1 ASSINATURA. 2 ACESSOS.</p>
                            <p className="text-[15px] text-white/70">O PRO conecta as duas contas automaticamente na nuvem sem tarifas extras.</p>
                        </div>
                    </div>
                </section>

                {/* 7. PLANOS */}
                <section id="planos" className="py-12 w-full flex flex-col gap-4 relative">

                    {/* Anual */}
                    <div
                        onClick={() => setSelectedPlan('anual')}
                        className={`w-full relative cursor-pointer transition-all duration-300 ${selectedPlan === 'anual' ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-70 grayscale-[30%]'}`}
                    >
                        {selectedPlan === 'anual' && <div className="absolute -inset-1 bg-gradient-to-br from-brand-magenta via-brand-purple to-brand-gold rounded-[38px] blur-lg opacity-40 animate-pulse"></div>}

                        <div className={`w-full relative bg-gradient-to-br from-[#1B142D] to-[#0A0516] rounded-[34px] border shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.5)] p-1 overflow-hidden transition-all ${selectedPlan === 'anual' ? 'border-brand-gold' : 'border-white/10'}`}>
                            {selectedPlan === 'anual' && <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[60px] pointer-events-none"></div>}

                            <div className="absolute top-5 right-5 bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-brand-gold/20 flex gap-1 items-center">
                                <Sparkles size={12} /> Mais Popular
                            </div>

                            <div className="p-7">
                                <h3 className="text-[28px] font-outfit font-bold text-white mb-1">PRO Anual</h3>
                                <p className="text-white/50 text-[15px] mb-6">O plano que une propósito e desconto.</p>

                                <div className="flex items-start gap-1 mb-2">
                                    <span className="text-[20px] text-brand-gold/80 mt-1 font-bold">R$</span>
                                    <span className="text-[64px] font-outfit font-extrabold leading-[0.85] text-white tracking-tighter">16<span className="text-[32px]">,66</span></span>
                                    <span className="text-[15px] text-white/50 self-end mb-1 font-medium">/mês*</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-green-500/20 text-green-400 text-[12px] font-bold px-2 py-0.5 rounded">-44% OFF</span>
                                    <span className="text-[14px] text-white/40">*R$ 199,90 / ano</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mensal & Vitalício */}
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <div
                            onClick={() => setSelectedPlan('mensal')}
                            className={`w-full bg-[#110B22]/60 backdrop-blur-md rounded-[28px] p-5 text-center cursor-pointer transition-all duration-300 border ${selectedPlan === 'mensal' ? 'border-white scale-100 opacity-100' : 'border-white/5 scale-[0.98] opacity-60'}`}
                        >
                            <h3 className="text-[16px] font-outfit font-semibold text-white/80 mb-2">Mensal Flex</h3>
                            <div className="text-[28px] font-outfit font-bold text-white tracking-tight">R$ 29<span className="text-[16px] text-white/50">,90</span></div>
                        </div>
                        <div
                            onClick={() => setSelectedPlan('vitalicio')}
                            className={`w-full bg-[#110B22]/60 backdrop-blur-md rounded-[28px] p-5 text-center cursor-pointer transition-all duration-300 border relative overflow-hidden ${selectedPlan === 'vitalicio' ? 'border-brand-gold scale-100 opacity-100 shadow-[0_0_20px_rgba(230,194,110,0.2)]' : 'border-brand-gold/20 scale-[0.98] opacity-60 grayscale-[30%]'}`}
                        >
                            <h3 className="text-[16px] font-outfit font-semibold text-brand-gold mb-2">Vitalício</h3>
                            <div className="text-[28px] font-outfit font-bold text-brand-gold tracking-tight">R$ 399<span className="text-[16px] text-brand-gold/60">,90</span></div>
                        </div>
                    </div>

                    {/* Botão de Assinatura Dinâmico */}
                    <div className="mt-6">
                        <a
                            href={
                                selectedPlan === 'anual' ? 'https://buy.stripe.com/bJe9AS6WV4lE12AfaO0Fi01' :
                                    selectedPlan === 'vitalicio' ? 'https://buy.stripe.com/14A28q3KJg4maDafaO0Fi02' :
                                        'https://buy.stripe.com/aFaeVc3KJf0ih1ygeS0Fi00'
                            }
                            className="w-full bg-gradient-to-r from-brand-gold to-yellow-600 text-[#2A1604] font-extrabold min-h-[64px] rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(230,194,110,0.3)] text-[18px]"
                        >
                            <Lock size={18} /> {selectedPlan === 'anual' ? 'Assinar Anual Agora' : selectedPlan === 'vitalicio' ? 'Garantir Acesso Vitalício' : 'Assinar Mensal'}
                        </a>
                        <a
                            href="https://bingotogether.lovable.app"
                            className="w-full mt-4 text-[14px] text-white/50 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 pb-4 inline-block text-center"
                        >
                            Começar gratuitamente agora
                        </a>
                    </div>
                </section>

                {/* 8. FAQ */}
                <section className="py-16 w-full">
                    <h2 className="text-[30px] font-outfit font-bold text-center mb-10">Dúvidas Frequentes</h2>

                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#110B22]/60 backdrop-blur-md border border-white/5 rounded-[24px] overflow-hidden transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-brand-gold/30 rounded-[24px]"
                                >
                                    <span className="font-semibold font-outfit text-[17px] text-white/95 pr-6">{faq.q}</span>
                                    <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 bg-white/10' : ''}`}>
                                        <ChevronDown className="w-5 h-5 text-white/70" />
                                    </div>
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-[300px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}`}>
                                    <p className="text-[15.5px] text-white/60 leading-relaxed pt-2 border-t border-white/5 mt-2">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 9. CTA FINAL */}
                <section className="py-16 flex flex-col items-center text-center w-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-brand-purple/20 blur-[80px]" />

                    <p className="text-[24px] font-outfit font-medium text-white/90 mb-10 italic max-w-[400px] leading-tight relative z-10 drop-shadow-md">
                        "Não somos uma planilha crua. Somos o sistema estrutural que mantém vocês conectados."
                    </p>

                    <button
                        onClick={scrollToPlanos}
                        className="w-full relative z-10 bg-white text-black font-bold min-h-[64px] rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_15px_40px_rgba(255,255,255,0.2)] text-[20px]"
                    >
                        Criar Conta do Casal <ArrowRight size={20} className="ml-1" />
                    </button>

                    <div className="mt-6 flex items-center gap-4 text-[13px] text-white/40 font-medium relative z-10">
                        <span className="flex items-center gap-1.5"><Shield size={14} /> Seguro</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                        <span className="flex items-center gap-1.5"><Lock size={14} /> Cancele Fácil</span>
                    </div>
                </section>

            </div>
        </main>
    );
}
