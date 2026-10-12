# 🎯 Bingo2Gether — Funil de Vendas Interativo e Imersivo (Sales Funnel Case)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://bingo2gether-funnel.vercel.app/)

> **Case de Engenharia de Conversão (CRO) & Psicologia Comportamental para Finanças de Casais.**  
> Uma experiência interativa de storytelling guiado e áudio imersivo que transforma a discussão fria sobre dinheiro em cumplicidade lúdica.

🔗 **Acesse a Demonstração Ao Vivo:** [https://bingo2gether-funnel.vercel.app/](https://bingo2gether-funnel.vercel.app/)

---

## 💡 O Desafio de Negócio & CRO

Finanças a dois é o principal motivo de atrito e estresse entre parceiros:
- **72% dos casais evitam conversas sobre finanças** pelo medo de brigas ou cobranças.
- **Planilhas tradicionais fracassam** porque exigem esforço cognitivo alto, não oferecem dopamina visual e são percebidas como um "trabalho extra".
- **Páginas de vendas comuns falham** ao tentar vender apps de finanças com foco apenas em listas de recursos frios.

### A Solução
O **Bingo2Gether Sales Funnel** foi estruturado em uma narrativa cinematográfica e sensorial de 5 etapas, utilizando **Design Emocional**, **Gatilhos Visuais** e **Simulação de Comunicação a Dois**:

1. **Captura da Meta (`/`):** O usuário define o sonho comum do casal (Ex: *Viagem Internacional*, *Casa Própria*, *Casamento*).
2. **Imersão Sensorial (`/chamada-recebida` e `/ligacao-meta`):** Uma chamada interativa simulada com áudio envolvente conecta o usuário diretamente ao impacto emocional da meta conquistada.
3. **Ponte de Realidade (`/passagem-tempo` & `/revelacao`):** Demonstração do custo do silêncio financeiro vs. o poder de poupar jogando bingo colaborativo com o Algoritmo de Justiça.
4. **Oferta e Fechamento (`/sales`):** Apresentação dos planos PRO (Mensal Flex, Anual e Vitalício) com ancoragem de valor, garantia e checkout seguro direto no Stripe.

---

## 🛠️ Tecnologias Utilizadas

- **Framework Web:** [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Hydration)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) com tipagem estrita
- **Estilização & Design System:** [Tailwind CSS](https://tailwindcss.com/) com temas escuros premium (Deep Violet & Gold), blur effects e micro-interações
- **Ícones & UI Elements:** [Lucide Icons](https://lucide.dev/)
- **Áudio & Multimídia:** Web Audio API & HTML5 Audio otimizados para mobile
- **Integração de Pagamento:** Stripe Payment Links & Stripe Checkout com suporte a Cartão, PIX e Boleto
- **Qualidade & Testes E2E:** [Playwright](https://playwright.dev/) para auditoria automatizada de jornadas e CRO mobile

---

## 📐 Arquitetura de Rotas

```
src/app/
├── page.tsx               # [Etapa 1] Seleção e personalização de metas
├── chamada-recebida/      # [Etapa 2] UI de chamada telefônica imersiva
├── ligacao-meta/          # [Etapa 2] Reprodução do áudio guiado com waveform
├── passagem-tempo/        # [Etapa 3] Transição temporal e quebra de padrão
├── revelacao/             # [Etapa 3] Demonstração do tabuleiro de Bingo
├── sales/                 # [Etapa 4] Oferta PRO, alternância de planos e checkout Stripe
├── obrigado/              # [Etapa 5] Página pós-compra e ativação do casal
└── api/subscribe/         # Endpoint serverless de captura de leads gratuitos
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ ou superior
- NPM, Yarn ou PNPM

### Instalação
```bash
# Clone o repositório
git clone https://github.com/rafaelleaomed/bingo2gether-sales-funnel.git

# Acesse a pasta
cd bingo2gether-sales-funnel

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Testes Automatizados com Playwright
```bash
# Executa a auditoria E2E no funil
python test_funnel_audit.py
```

---

## 👨‍💻 Autor & Portfólio

Desenvolvido por **Rafael Leão**  
- **GitHub:** [@rafaelleaomed](https://github.com/rafaelleaomed)  
- **Produto Principal:** [Bingo2Gether](https://bingotogether.lovable.app)
