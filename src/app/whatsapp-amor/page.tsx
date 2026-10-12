'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Phone, Video, MoreVertical, Paperclip, Mic, Check, CheckCheck } from 'lucide-react';
import Image from 'next/image';

interface Message {
    id: number;
    text: string;
    sender: 'lead' | 'amor';
    timestamp: string;
    status?: 'read' | 'delivered';
}


function WhatsAppAmorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const metaQuery = searchParams.get('meta');
    const metaName = metaQuery ? metaQuery.toLowerCase() : 'sua meta';

    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const chatRef = useRef<HTMLDivElement>(null);

    const MESSAGE_SEQUENCE = [
        { sender: 'amor', text: `Amor, recebi ligação do fornecedor de ${metaName} mas não pude atender. Ele te ligou aí?`, delay: 1000 },
        { sender: 'lead', text: 'Sim, acabei de falar com eles', delay: 2000 },
        { sender: 'lead', text: 'Tiveram um reajuste de valores', delay: 1500 },
        { sender: 'amor', text: 'Reajuste?? De quanto?', delay: 2500 },
        { sender: 'lead', text: 'R$ 3.940 a mais', delay: 2000 },
        { sender: 'amor', text: 'Poxa...', delay: 3000 },
        { sender: 'amor', text: 'A gente consegue dar um jeito', delay: 2000 },
        { sender: 'amor', text: 'Mas toda hora é esse mesmo susto no final do mês.', delay: 3500 },
        { sender: 'amor', text: 'A gente não merecia ficar com esse peso de fazer tudo de improviso, a gente precisa ter mais controle, juntos.', delay: 4000 },
    ];

    // Auto-scroll
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isTyping, showOptions]);

    const getCurrentTime = () => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Run initial sequence
    useEffect(() => {
        let isMounted = true;

        const runSequence = async () => {
            await sleep(1000);

            for (let i = 0; i < MESSAGE_SEQUENCE.length; i++) {
                if (!isMounted) return;

                const msg = MESSAGE_SEQUENCE[i];

                if (msg.sender === 'amor') {
                    setIsTyping(true);
                    await sleep(Math.min(msg.delay * 0.7, 2000));
                    setIsTyping(false);
                } else {
                    await sleep(msg.delay * 0.5);
                }

                if (!isMounted) return;

                setMessages(prev => [...prev, {
                    id: i,
                    text: msg.text,
                    sender: msg.sender as 'lead' | 'amor',
                    timestamp: getCurrentTime(),
                    status: msg.sender === 'lead' ? 'read' : undefined
                }]);

                await sleep(msg.sender === 'amor' ? msg.delay * 0.3 : msg.delay * 0.5);
            }

            if (!isMounted) return;
            setShowOptions(true);
        };

        runSequence();

        return () => { isMounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOptionClick = async (optionIndex: number, optionText: string) => {
        setShowOptions(false);

        // Add lead response
        setMessages(prev => [...prev, {
            id: prev.length,
            text: optionText,
            sender: 'lead',
            timestamp: getCurrentTime(),
            status: 'read'
        }]);

        await sleep(2000);
        setIsExiting(true);
        await sleep(500);
        router.push('/passagem-tempo');
    };

    return (
        <main className={`min-h-[100dvh] bg-[#E5DDD5] w-full flex justify-center font-ios transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-full h-[100dvh] max-w-[100vw] lg:max-w-[480px] lg:mx-auto lg:h-[90vh] lg:my-[5vh] lg:shadow-2xl flex flex-col relative overflow-hidden bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-[#e5ddd5]/90 blend-multiply">

                {/* iOS Status Bar Placeholder */}
                <div className="h-[44px] bg-[#075E54] w-full shrink-0 flex items-end pb-2 px-6 justify-between text-white text-[14px]">
                    <span>{getCurrentTime()}</span>
                    <div className="flex gap-1.5 items-center">
                        <span className="w-4 h-3 rounded-sm bg-white border border-white/50"></span>
                        <span className="w-4 h-3 rounded-sm bg-white border border-white/50"></span>
                        <span className="w-5 h-3 rounded-sm bg-white border border-white/50"></span>
                    </div>
                </div>

                {/* WhatsApp Header */}
                <div className="h-[60px] bg-[#075E54] shrink-0 flex items-center px-2 py-2 text-white shadow-md z-10 w-full">
                    <button className="flex items-center gap-1 active:opacity-60 transition-opacity">
                        <ChevronLeft size={28} />
                        <div className="w-[40px] h-[40px] rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-gray-500 relative shrink-0">
                            {/* Avatar placeholder that looks like a couple playing with a dog or something nice - using Unsplash link */}
                            <Image src="/casal.jpg" alt="Avatar" width={40} height={40} className="object-cover w-full h-full" />
                        </div>
                    </button>

                    <div className="flex-1 ml-3 flex flex-col justify-center overflow-hidden">
                        <h1 className="text-[17px] font-semibold truncate leading-tight">Amor ❤️</h1>
                        {isTyping ? (
                            <p className="text-[13px] text-[#25D366] font-medium truncate leading-tight drop-shadow-sm">digitando...</p>
                        ) : (
                            <p className="text-[13px] text-white/80 leading-tight">online</p>
                        )}
                    </div>

                    <div className="flex items-center gap-5 px-3">
                        <Video size={22} className="active:opacity-60" fill="currentColor" />
                        <Phone size={20} className="active:opacity-60" fill="currentColor" />
                        <MoreVertical size={22} className="active:opacity-60" />
                    </div>
                </div>

                {/* Chat Area */}
                <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-6 pb-[140px] flex flex-col gap-2 relative scroll-smooth">

                    {/* Criptografia notice */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-[#FEF1B3] text-[#71644A] text-[12.5px] py-1.5 px-4 rounded-[10px] text-center max-w-[85%] shadow-sm leading-tight">
                            As mensagens e as chamadas são protegidas com a criptografia de ponta a ponta e ficam somente entre vocês.
                        </div>
                    </div>

                    {/* Messages Loop */}
                    {messages.map((msg, index) => {
                        const isLead = msg.sender === 'lead';

                        // Checar se a proxima mensagem é do mesmo sender pra agrupar cauda
                        const nextMsg = messages[index + 1];
                        const isTail = !nextMsg || nextMsg.sender !== msg.sender;

                        return (
                            <div key={msg.id} className={`flex w-full ${isLead ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                                <div
                                    className={`
                    relative max-w-[80%] px-3 pt-2 pb-1.5 shadow-sm text-[16px] leading-[1.3] flex flex-col
                    ${isLead ? 'bg-[#DCF8C6]' : 'bg-[#FFFFFF]'}
                    ${isLead ? (isTail ? 'rounded-tl-lg rounded-bl-lg rounded-tr-lg rounded-br-none' : 'rounded-lg') : (isTail ? 'rounded-tr-lg rounded-br-lg rounded-tl-lg rounded-bl-none' : 'rounded-lg')}
                  `}
                                >
                                    <span className="text-black break-words select-none whitespace-pre-wrap">{msg.text}</span>
                                    <div className="flex justify-end items-center gap-1 mt-0.5 pointer-events-none float-right ml-2 -mb-0.5">
                                        <span className="text-[11px] text-[#667781] leading-none mb-0.5">{msg.timestamp}</span>
                                        {isLead && (
                                            msg.status === 'read' ? (
                                                <CheckCheck size={14} color="#34B7F1" />
                                            ) : (
                                                <Check size={14} color="#667781" />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Pergunta Options */}
                    {showOptions && (
                        <div className="w-full flex justify-end mt-2 animate-in slide-in-from-bottom-4 fade-in duration-300 pr-1 cursor-pointer">
                            <div className="flex flex-col gap-2 items-end max-w-[85%]">
                                <button onClick={() => handleOptionClick(1, 'A gente PRECISA focar nisso!')} className="bg-[#DCF8C6]/80 text-[#075E54] border border-[#DCF8C6] px-4 py-2 rounded-full font-medium text-[15px] shadow-sm w-full text-right hover:bg-[#DCF8C6] active:scale-95 transition-all">
                                    A gente PRECISA focar nisso!
                                </button>
                                <button onClick={() => handleOptionClick(2, 'Vamos resolver isso!')} className="bg-[#DCF8C6]/80 text-[#075E54] border border-[#DCF8C6] px-4 py-2 rounded-full font-medium text-[15px] shadow-sm w-full text-right hover:bg-[#DCF8C6] active:scale-95 transition-all">
                                    Vamos resolver isso!
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {/* Final Transition Overlay removido pois a var showFinalTransition estava sem uso, o modal não é ativado aqui e sim o redirecionamento */}

                {/* Input Block Fixo */}
                <div className="absolute bottom-0 w-full bg-[#F0F0F0] min-h-[60px] pb-[env(safe-area-inset-bottom,16px)] shrink-0 flex items-end px-2 py-2 gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-10">
                    <div className="flex-1 bg-white rounded-full min-h-[44px] flex items-end mb-1 border border-[#E5E5EA]">
                        <button className="h-[44px] w-[44px] flex items-center justify-center text-[#89959B] shrink-0 active:bg-gray-100 rounded-l-full">
                            <span className="text-[22px]">☺</span>
                        </button>
                        <textarea
                            className="flex-1 resize-none bg-transparent h-[44px] py-3 text-[16px] outline-none text-black placeholder:text-[#89959B]"
                            placeholder="Mensagem"
                            readOnly
                            rows={1}
                        />
                        <button className="h-[44px] w-[44px] flex items-center justify-center text-[#89959B] shrink-0 active:bg-gray-100 focus:outline-none">
                            <Paperclip size={22} className="rotate-[-45deg]" />
                        </button>
                    </div>
                    <button className="w-[48px] h-[48px] rounded-full bg-[#00A884] shrink-0 flex items-center justify-center text-white mb-1 shadow-md active:bg-[#008f6f] active:scale-95 transition-all">
                        <Mic size={22} fill="currentColor" />
                    </button>
                </div>

            </div>
        </main>
    );
}

export default function WhatsAppAmor() {
    return (
        <Suspense fallback={
            <div className="min-h-[100dvh] bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
        }>
            <WhatsAppAmorContent />
        </Suspense>
    );
}
