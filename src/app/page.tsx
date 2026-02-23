'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Plane, Heart, Car, Target, Plus } from 'lucide-react';

export default function CaptureMeta() {
  const router = useRouter();
  const [selectedMeta, setSelectedMeta] = useState<string | null>(null);
  const [customMeta, setCustomMeta] = useState('');
  const [isTypingCustom, setIsTypingCustom] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const predefinedMetas = [
    { id: 'Casa Própria', label: 'Casa Própria / Reforma', icon: Home },
    { id: 'Viagem Internacional', label: 'Viagem Internacional', icon: Plane },
    { id: 'Casamento', label: 'Casamento / Festa', icon: Heart },
    { id: 'Troca de Carro', label: 'Troca de Carro', icon: Car },
    { id: 'Liberdade Financeira', label: 'Reserva & Liberdade', icon: Target },
  ];

  const handleProceed = () => {
    const finalMeta = isTypingCustom && customMeta.trim() ? customMeta.trim() : selectedMeta;
    if (!finalMeta) return;
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/chamada-recebida?meta=${encodeURIComponent(finalMeta)}`);
    }, 500);
  };

  return (
    <main className={`min-h-[100dvh] w-full bg-[#0A0514] flex flex-col items-center justify-center text-white px-6 font-outfit relative overflow-hidden transition-opacity duration-500 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#C13C7A] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#E6C26E] rounded-full blur-[120px] opacity-15 pointer-events-none"></div>

      <div className="z-10 w-full max-w-[400px] flex flex-col items-center animate-in fade-in duration-700">
        <h1 className="text-[28px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 text-center mb-2 leading-tight">
          Toda estrutura começa com um destino comum.
        </h1>
        <p className="text-[#A0A0A0] text-center mb-10 font-dmsans text-[17px]">
          Qual é a principal meta de vocês hoje?
        </p>

        <div className="w-full space-y-3 mb-10">
          {predefinedMetas.map((meta) => {
            const Icon = meta.icon;
            const isSelected = selectedMeta === meta.id && !isTypingCustom;
            return (
              <button
                key={meta.id}
                onClick={() => { setSelectedMeta(meta.id); setIsTypingCustom(false); }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md ${isSelected
                  ? 'bg-white/10 border-[#E6C26E]/50 shadow-[0_0_15px_rgba(230,194,110,0.15)] ring-1 ring-[#E6C26E]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
              >
                <div className={`p-3 rounded-xl transition-colors ${isSelected ? 'bg-[#E6C26E]/20 text-[#E6C26E]' : 'bg-white/5 text-white/70'}`}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className={`text-[17px] font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {meta.label}
                </span>
              </button>
            )
          })}

          {/* Outro field */}
          <div
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md ${isTypingCustom
              ? 'bg-white/10 border-[#C13C7A]/50 shadow-[0_0_15px_rgba(193,60,122,0.15)] ring-1 ring-[#C13C7A]'
              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer'
              }`}
            onClick={() => { setIsTypingCustom(true); setSelectedMeta(null); }}
          >
            <div className={`p-3 rounded-xl transition-colors ${isTypingCustom ? 'bg-[#C13C7A]/20 text-[#C13C7A]' : 'bg-white/5 text-white/70'}`}>
              <Plus size={24} strokeWidth={1.5} />
            </div>
            {isTypingCustom ? (
              <input
                autoFocus
                type="text"
                placeholder="Digite sua meta..."
                className="bg-transparent border-none outline-none text-white text-[17px] w-full font-medium placeholder-white/40 font-dmsans"
                value={customMeta}
                onChange={(e) => setCustomMeta(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleProceed();
                }}
              />
            ) : (
              <span className="text-[17px] font-medium text-white/80">Outra meta...</span>
            )}
          </div>
        </div>

        <button
          onClick={handleProceed}
          disabled={!selectedMeta && (!isTypingCustom || customMeta.trim() === '')}
          className={`w-full min-h-[60px] rounded-2xl font-bold text-[18px] transition-all duration-500 flex items-center justify-center
            ${(selectedMeta || (isTypingCustom && customMeta.trim().length > 0))
              ? 'bg-gradient-to-r from-[#C13C7A] to-[#9D2B5E] text-white shadow-[0_0_20px_rgba(193,60,122,0.3)] hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
            }
          `}
        >
          Visualizar nosso futuro
        </button>
      </div>
    </main>
  );
}
