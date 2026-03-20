import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Target, Compass, BarChart2, CheckCircle2, 
  Zap, ArrowUpRight, Sun, Moon, Activity, ShieldCheck, Cpu 
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('brand');
  const [isDark, setIsDark] = useState(false);

  // Live Metrics State for Immersion Showcase
  const [liveMetrics, setLiveMetrics] = useState({
    cost: 2450320.00,
    margin: 12.4,
    savings: 142050.00,
    efficiency: 94.2
  });

  // Toggle Theme Logic
  const toggleTheme = () => setIsDark(!isDark);

  // Smooth scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['brand', 'essence', 'culture', 'typography', 'immersion', 'copywriting'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Data Simulator (Updates every 2.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        cost: prev.cost + (Math.random() > 0.5 ? (Math.random() * 500) : -(Math.random() * 200)),
        margin: +(prev.margin + (Math.random() * 0.2 - 0.1)).toFixed(2),
        savings: prev.savings + (Math.random() > 0.3 ? (Math.random() * 300) : 0),
        efficiency: +(prev.efficiency + (Math.random() * 0.4 - 0.2)).toFixed(1)
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  // Dinamic Classes
  const themeClasses = {
    bg: isDark ? 'bg-[#020617]' : 'bg-[#FAFAFA]',
    text: isDark ? 'text-slate-100' : 'text-slate-900',
    textMuted: isDark ? 'text-slate-400' : 'text-slate-500',
    card: isDark ? 'bg-slate-900/30 border-slate-800 shadow-inner' : 'bg-[#FDFBF7] border-slate-200/60 shadow-inner',
    nav: isDark ? 'bg-[#020617]/80 border-slate-800' : 'bg-white/80 border-slate-100',
    sidebar: isDark ? 'bg-[#020617] border-slate-800' : 'bg-[#FAFAFA] border-slate-200',
    border: isDark ? 'border-slate-800' : 'border-slate-200',
    selection: isDark ? 'selection:bg-[#C6A8FF] selection:text-white' : 'selection:bg-[#4FD1C5] selection:text-white'
  };

  const menuItems = [
    { id: 'brand', label: '01. Identidade' },
    { id: 'essence', label: '02. Essência' },
    { id: 'culture', label: '03. Cultura' },
    { id: 'typography', label: '04. Tipografia' },
    { id: 'immersion', label: '05. Imersão' },
    { id: 'copywriting', label: '06. Copywriting' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${themeClasses.bg} ${themeClasses.text} ${themeClasses.selection}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;700;800&display=swap');
        
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .text-gradient {
          background: linear-gradient(135deg, #FFB997 0%, #4FD1C5 50%, #C6A8FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${isDark ? '#334155' : '#E2E8F0'}; 
          border-radius: 10px; 
        }
      `}} />

      {/* Navigation - Top Bar */}
      <nav className={`fixed top-0 left-0 right-0 backdrop-blur-md z-50 border-b transition-colors duration-500 ${themeClasses.nav}`}>
        <div className="w-full px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('brand')}>
            {/* Nav Logo */}
            <svg viewBox="0 0 100 100" className="w-8 h-8 transition-transform group-hover:rotate-12">
                <defs>
                    <linearGradient id="navGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFB997"/>
                        <stop offset="50%" stopColor="#4FD1C5"/>
                        <stop offset="100%" stopColor="#C6A8FF"/>
                    </linearGradient>
                </defs>
                <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="none" stroke="url(#navGrad)" strokeWidth="5" strokeLinejoin="round" />
                <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="url(#navGrad)" strokeWidth="3" strokeLinejoin="round" opacity="0.75" />
            </svg>
            <span className="font-montserrat font-extrabold tracking-wider text-sm">TONDARA</span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className={`lg:hidden text-xs font-mono uppercase tracking-widest ${themeClasses.textMuted}`}>
              Menu ↓
            </span>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation (Desktop Only) */}
      <aside className={`fixed left-0 top-20 bottom-0 w-[260px] border-r hidden lg:flex flex-col py-10 px-6 z-40 transition-colors duration-500 custom-scrollbar overflow-y-auto ${themeClasses.sidebar}`}>
        <div className="mb-8">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-slate-400">Guia de Marca 2.0</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollTo(item.id)} 
              className={`text-left text-sm font-inter py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                activeSection === item.id 
                  ? (isDark ? 'bg-slate-800/80 text-white font-semibold shadow-inner' : 'bg-white text-slate-900 font-semibold shadow-sm border border-slate-200/50') 
                  : `hover:bg-slate-100/50 dark:hover:bg-slate-800/30 ${themeClasses.textMuted} font-medium`
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#4FD1C5] to-[#C6A8FF] shadow-[0_0_8px_rgba(79,209,197,0.8)]"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="block text-[10px] uppercase tracking-widest font-semibold mb-2 text-[#4FD1C5]">Status do Sistema</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4FD1C5] animate-pulse"></span>
              <span className={`text-xs font-mono ${themeClasses.textMuted}`}>Brand Core V2.0 Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:pl-[280px] pt-32 pb-24 font-inter transition-all duration-500">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* SECTION 01: BRAND & LOGO */}
          <section id="brand" className="min-h-[80vh] flex flex-col justify-center mb-32 pt-12">
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-px w-12 ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
              <span className={`uppercase tracking-widest text-xs font-semibold ${themeClasses.textMuted}`}>Guia da Marca 2.0</span>
            </div>
            
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-16 leading-tight max-w-5xl">
              Seus dados já têm a resposta.<br/>
              <span className={`block mt-6 text-2xl md:text-3xl lg:text-4xl font-light leading-snug ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                Nós estruturamos a base de dados, <br className="hidden md:block"/>
                <span className={isDark ? 'text-white font-bold' : 'text-slate-900 font-bold'}>para que o crescimento seja inevitável.</span>
              </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white border border-slate-200 shadow-sm p-10 md:p-14 rounded-3xl flex flex-col items-center justify-center relative group hover:-translate-y-1 transition-transform duration-500">
                <span className="absolute top-6 left-6 font-mono text-[10px] text-slate-400 uppercase tracking-widest">01. Tradicional</span>
                <div className="w-24 h-24 mb-6 transform group-hover:scale-105 transition-transform duration-700">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                      <defs>
                          <linearGradient id="lightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#FFB997"/>
                              <stop offset="50%" stopColor="#4FD1C5"/>
                              <stop offset="100%" stopColor="#C6A8FF"/>
                          </linearGradient>
                      </defs>
                      <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="none" stroke="url(#lightGrad)" strokeWidth="4.5" strokeLinejoin="round" />
                      <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="url(#lightGrad)" strokeWidth="2.5" strokeLinejoin="round" opacity="0.8" />
                  </svg>
                </div>
                <h2 className="font-montserrat text-2xl font-extrabold tracking-[0.15em] text-slate-900">TONDARA</h2>
              </div>

              <div className="bg-[#020617] border border-slate-800 shadow-2xl p-10 md:p-14 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#FFB997] via-[#4FD1C5] to-[#C6A8FF] opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <span className="absolute top-6 left-6 font-mono text-[10px] text-slate-500 uppercase tracking-widest">02. Versão Dark</span>
                <div className="w-24 h-24 mb-6 transform group-hover:scale-105 transition-transform duration-700 relative z-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(79,209,197,0.3)]">
                      <defs>
                          <linearGradient id="darkGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#FFB997"/>
                              <stop offset="50%" stopColor="#4FD1C5"/>
                              <stop offset="100%" stopColor="#C6A8FF"/>
                          </linearGradient>
                      </defs>
                      <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="none" stroke="url(#darkGrad)" strokeWidth="4.5" strokeLinejoin="round" />
                      <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="url(#darkGrad)" strokeWidth="2.5" strokeLinejoin="round" opacity="0.8" />
                  </svg>
                </div>
                <h2 className="font-montserrat text-2xl font-extrabold tracking-[0.15em] text-white relative z-10">TONDARA</h2>
              </div>

              <div className="bg-[#FDFBF7] border border-slate-200/50 shadow-inner p-10 md:p-14 rounded-3xl flex flex-col items-center justify-center relative group hover:-translate-y-1 transition-transform duration-500">
                <span className="absolute top-6 left-6 font-mono text-[10px] text-slate-400 uppercase tracking-widest">03. Monocromático</span>
                <div className="w-24 h-24 mb-6 transform group-hover:-rotate-12 transition-transform duration-500">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400">
                      <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" />
                      <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="font-montserrat text-2xl font-extrabold tracking-[0.15em] text-slate-400">TONDARA</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h3 className="font-montserrat font-bold text-xl mb-4">O Símbolo</h3>
                <p className={`${themeClasses.textMuted} leading-relaxed font-light text-lg`}>
                  O duplo hexágono concêntrico foca no núcleo da geometria. Representa a infraestrutura, a clareza e a força da engenharia de dados. Uma estética clean e minimalista que descansa os olhos, garante legibilidade perfeita em qualquer escala e transparece autoridade instantânea.
                </p>
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-xl mb-4">A Paleta Tecnológica</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: 'Salmão Rosado', hex: '#FFB997' },
                    { name: 'Turquesa', hex: '#4FD1C5' },
                    { name: 'Lilás Claro', hex: '#C6A8FF' }
                  ].map((color) => (
                    <div key={color.hex} className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-full shadow-lg flex-shrink-0 border border-white/10" style={{backgroundColor: color.hex}}></div>
                      <div className="font-mono text-xs opacity-70">{color.name}<br/>{color.hex}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 02: ESSENCE */}
          <section id="essence" className={`mb-32 pt-24 border-t ${themeClasses.border}`}>
            <div className="mb-16">
              <span className="text-gradient font-montserrat font-bold tracking-widest uppercase text-sm">02. Nossa Essência</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div className={`p-10 md:p-12 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:-translate-y-1 ${themeClasses.card}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <Target className="text-[#FFB997]" size={24} />
                </div>
                <h3 className="font-montserrat text-2xl font-bold mb-6">Missão</h3>
                <p className={`${themeClasses.textMuted} leading-relaxed font-light text-lg`}>
                  Transformar o caos de dados em inteligência estratégica — e a invisibilidade digital em presença que gera negócios — entregando para empresas a infraestrutura completa de software, dados e IA.
                </p>
              </div>

              <div className={`p-10 md:p-12 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:-translate-y-1 ${themeClasses.card}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <Compass className="text-[#C6A8FF]" size={24} />
                </div>
                <h3 className="font-montserrat text-2xl font-bold mb-6">Visão</h3>
                <p className={`${themeClasses.textMuted} leading-relaxed font-light text-lg`}>
                  Ser a principal referência em engenharia de dados e estratégia digital para o Brasil central, expandindo a inteligência da Tondara para todo o território nacional.
                </p>
              </div>
            </div>

            <blockquote className="border-l-4 border-[#4FD1C5] pl-8 md:pl-12 py-4">
              <p className="font-montserrat text-2xl md:text-4xl font-light leading-snug">
                "A arquitetura invisível<br className="hidden md:block" /> <span className="font-bold">do crescimento.</span>"
              </p>
            </blockquote>
          </section>

          {/* SECTION 03: CULTURE */}
          <section id="culture" className={`mb-32 pt-24 border-t ${themeClasses.border}`}>
            <div className="mb-16 max-w-3xl">
              <span className="text-gradient font-montserrat font-bold tracking-widest uppercase text-sm">03. Valores</span>
              <h2 className="font-montserrat text-4xl font-bold mt-4 mb-6">Cultura GROW</h2>
              <p className={`${themeClasses.textMuted} leading-relaxed font-light text-lg`}>
                A Tondara opera sob a filosofia <strong className={isDark ? 'text-white' : 'text-slate-900'}>GROW</strong>: crescimento contínuo, consistente e sustentável. Não buscamos velocidade — buscamos fundação sólida que permite escalar sem quebrar. Cada decisão, cada entrega, cada relacionamento com cliente segue esses princípios:
              </p>
            </div>

            <div className="space-y-6">
              {[
                { char: 'G', title: 'Gerar com Base Real', icon: <BarChart2 size={18} />, color: '#FFB997', desc: 'Antes de resolver, entendemos. Antes de decidir, medimos.' },
                { char: 'R', title: 'Resultado Mensurável', icon: <CheckCircle2 size={18} />, color: '#4FD1C5', desc: 'Cada projeto tem métrica de sucesso definida. Se não podemos medir, não implementamos.' },
                { char: 'O', title: 'Operação como Parceiro', icon: <Zap size={18} />, color: '#FFB997', desc: 'A parceria não termina na entrega — ela começa nela. A infraestrutura intelectual que cresce junto com o seu negócio.' },
                { char: 'W', title: 'Win Sustentável', icon: <ArrowUpRight size={18} />, color: '#C6A8FF', desc: 'Quanto mais tempo juntos, mais inteligente fica a operação. O melhor mês da Tondara com você é sempre o próximo.' }
              ].map((item) => (
                <div key={item.char} className={`group transition-all duration-500 p-8 md:p-10 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row gap-6 md:items-center hover:-translate-y-1 ${themeClasses.card}`}>
                  <div className={`text-6xl font-montserrat font-extrabold transition-all duration-500 w-20 ${isDark ? 'text-slate-800 group-hover:text-slate-700' : 'text-slate-100 group-hover:text-gradient'}`}>
                    {item.char}
                  </div>
                  <div>
                    <h3 className="font-montserrat text-xl font-bold mb-2 flex items-center gap-3">
                      {item.title}
                      <span style={{color: item.color}}>{item.icon}</span>
                    </h3>
                    <p className={`${themeClasses.textMuted} font-light`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 04: TYPOGRAPHY */}
          <section id="typography" className={`mb-32 pt-24 border-t ${themeClasses.border}`}>
            <div className="mb-16">
              <span className="text-gradient font-montserrat font-bold tracking-widest uppercase text-sm">04. Tipografia do Silêncio</span>
              <h2 className="font-montserrat text-4xl font-bold mt-4">Voz Visual</h2>
            </div>

            <div className="mb-20">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-montserrat text-3xl font-bold">Montserrat</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-mono border ${themeClasses.border} ${themeClasses.textMuted}`}>Títulos / Display</span>
              </div>
              <p className={`${themeClasses.textMuted} font-light text-lg mb-10 max-w-2xl leading-relaxed`}>
                Usada essencialmente nos pesos Light e Regular. Quando damos espaço à Montserrat (line-height alto), ela transmite a tranquilidade de uma galeria de arte ou de um estúdio minimalista.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:-translate-y-1 ${themeClasses.card}`}>
                  <div className={`${themeClasses.textMuted} font-mono text-sm mb-4`}>Light / 300</div>
                  <div className="font-montserrat font-light text-3xl leading-relaxed">Menos é mais.</div>
                </div>
                <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:-translate-y-1 ${themeClasses.card}`}>
                  <div className={`${themeClasses.textMuted} font-mono text-sm mb-4`}>Regular / 400</div>
                  <div className="font-montserrat font-normal text-3xl leading-relaxed">Arquitetura de dados.</div>
                </div>
                <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:-translate-y-1 ${themeClasses.card}`}>
                  <div className={`${themeClasses.textMuted} font-mono text-sm mb-4`}>Semi-Bold / 600</div>
                  <div className="font-montserrat font-semibold text-3xl leading-relaxed">Crescimento Contínuo.</div>
                </div>
              </div>

              <div className={`p-10 md:p-12 rounded-3xl border relative overflow-hidden transition-colors duration-500 ${themeClasses.card}`}>
                <p className={`font-montserrat font-normal text-xl md:text-2xl leading-loose tracking-widest break-all ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
                  abcdefghijklmnopqrstuvwxyz<br/>
                  0123456789!@#$%&()
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-inter text-3xl font-bold">Inter</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-mono border ${themeClasses.border} ${themeClasses.textMuted}`}>Corpo / UI / Tabelas</span>
              </div>
              <p className={`${themeClasses.textMuted} font-light text-lg mb-10 max-w-2xl leading-relaxed`}>
                Para ler relatórios e orçamentos sem dor de cabeça. A fonte Inter, aplicada sobre o nosso fundo Algodão Cru (<code className="font-mono text-[#C6A8FF]">#FDFBF7</code>), gera o contraste ideal — claro e relaxante.
              </p>

              <div className={`p-10 md:p-14 rounded-3xl relative overflow-hidden border transition-colors duration-500 ${themeClasses.card}`}>
                <span className={`uppercase tracking-widest text-xs font-semibold mb-8 block ${themeClasses.textMuted}`}>Exemplo de leitura (Regular 400)</span>
                <p className="font-inter font-normal text-lg md:text-xl leading-relaxed max-w-3xl">
                  O alívio começa aqui. Transformamos planilhas e documentos dispersos numa interface limpa e tátil. A Tondara organiza o seu negócio para que a sua equipe tenha clareza dos objetivos e resultados.
                </p>
              </div>

              <div className="mt-24">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="font-montserrat text-3xl font-bold">Interface Tátil</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono border ${themeClasses.border} ${themeClasses.textMuted}`}>UX / UI Guidelines</span>
                </div>
                
                <p className={`${themeClasses.textMuted} font-light text-lg mb-12 max-w-4xl leading-relaxed`}>
                  No setor de construção e tecnologia, onde há muitas variáveis, uma interface limpa evita erros e traz segurança na tomada de decisão. O foco absoluto da Tondara é <strong>reduzir o esforço mental do usuário</strong> para que ele foque apenas na execução e no resultado.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:-translate-y-1 ${themeClasses.card}`}>
                    <h4 className="font-montserrat font-bold text-lg mb-3 text-[#FFB997]">Zero Aditivos</h4>
                    <p className={`${themeClasses.textMuted} text-sm leading-relaxed font-light`}>Sem sombras desnecessárias ou gradientes complexos. A forma segue rigidamente a função.</p>
                  </div>
                  <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:-translate-y-1 ${themeClasses.card}`}>
                    <h4 className="font-montserrat font-bold text-lg mb-3 text-[#4FD1C5]">Ingredientes Puros</h4>
                    <p className={`${themeClasses.textMuted} text-sm leading-relaxed font-light`}>Apenas os dados e métricas que realmente importam para aquela tela específica. Nada de ruído visual.</p>
                  </div>
                  <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:-translate-y-1 ${themeClasses.card}`}>
                    <h4 className="font-montserrat font-bold text-lg mb-3 text-[#C6A8FF]">Clareza Instantânea</h4>
                    <p className={`${themeClasses.textMuted} text-sm leading-relaxed font-light`}>Metas e resultados apresentados de forma direta, com a análise já mastigada em componentes fáceis.</p>
                  </div>
                </div>

                <div className={`p-2 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} flex flex-col xl:flex-row gap-4`}>
                  <div className="flex-1 p-8 md:p-10">
                    <span className="uppercase tracking-widest text-xs font-semibold text-slate-400 mb-8 block">Resumo das Diretrizes</span>
                    <ul className="space-y-8">
                      <li className="flex gap-5">
                        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-mono text-sm font-bold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white shadow-sm text-slate-700'}`}>1</div>
                        <div>
                          <h5 className="font-montserrat font-bold mb-1 text-lg">Bento Grid</h5>
                          <p className={`${themeClasses.textMuted} text-sm font-light leading-relaxed`}>Organização espacial modular. Cria caixas de contenção lógicas que focam o olhar do usuário (Organização e Foco).</p>
                        </div>
                      </li>
                      <li className="flex gap-5">
                        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-mono text-sm font-bold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white shadow-sm text-slate-700'}`}>2</div>
                        <div>
                          <h5 className="font-montserrat font-bold mb-1 text-lg">Glassmorphism Suave</h5>
                          <p className={`${themeClasses.textMuted} text-sm font-light leading-relaxed`}>Uso estratégico de desfoque (blur) e fundos translúcidos para gerar hierarquia (Profundidade e Clareza) sem pesar.</p>
                        </div>
                      </li>
                      <li className="flex gap-5">
                        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-mono text-sm font-bold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white shadow-sm text-slate-700'}`}>3</div>
                        <div>
                          <h5 className="font-montserrat font-bold mb-1 text-lg">Estética Linear/SaaS</h5>
                          <p className={`${themeClasses.textMuted} text-sm font-light leading-relaxed`}>Design "wireframe" moderno. Bordas finas (1px), fontes mono para dados e extrema precisão (Minimalismo).</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className={`flex-1 p-6 md:p-10 flex items-center justify-center relative overflow-hidden rounded-2xl ${isDark ? 'bg-[#020617]' : 'bg-[#FAFAFA]'} border ${themeClasses.border}`}>
                    <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#FFB997] via-[#4FD1C5] to-[#C6A8FF] opacity-50 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className={`relative z-10 w-full max-w-md p-3 md:p-4 rounded-3xl border ${isDark ? 'bg-slate-800/40 border-slate-700/50 shadow-2xl' : 'bg-white/60 border-white shadow-[0_20px_40px_rgba(0,0,0,0.05)]'} backdrop-blur-2xl grid grid-cols-2 gap-3 md:gap-4 transition-transform hover:scale-105 duration-700 cursor-default`}>
                      <div className={`col-span-2 p-5 md:p-6 rounded-2xl border ${isDark ? 'bg-slate-900/90 border-slate-700/50' : 'bg-white/90 border-slate-200/50 shadow-sm'} backdrop-blur-md`}>
                        <div className="flex justify-between items-center mb-4">
                          <span className={`text-[10px] md:text-xs uppercase tracking-widest font-semibold ${themeClasses.textMuted}`}>Progresso da Obra</span>
                          <ArrowUpRight size={16} className="text-[#4FD1C5]" />
                        </div>
                        <h4 className={`font-montserrat text-3xl md:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>78.4%</h4>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                           <div className="w-[78.4%] h-full bg-gradient-to-r from-[#4FD1C5] to-[#C6A8FF] rounded-full relative">
                             <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                           </div>
                        </div>
                      </div>
                      <div className={`col-span-1 p-5 md:p-6 rounded-2xl border ${isDark ? 'bg-[#4FD1C5]/10 border-[#4FD1C5]/20' : 'bg-[#4FD1C5]/5 border-[#4FD1C5]/20 shadow-sm'} flex flex-col justify-between aspect-[4/3] md:aspect-square`}>
                        <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-[#4FD1C5]">Status Tátil</span>
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#4FD1C5] animate-pulse shadow-[0_0_8px_rgba(79,209,197,0.6)]"></div>
                            <span className="font-inter font-semibold text-sm md:text-base text-[#4FD1C5]">No Prazo</span>
                          </div>
                          <span className="font-mono text-[10px] md:text-xs text-[#4FD1C5]/80 uppercase">Update: Agora</span>
                        </div>
                      </div>
                      <div className={`col-span-1 p-5 md:p-6 rounded-2xl border ${isDark ? 'bg-slate-900/90 border-slate-700/50' : 'bg-white/90 border-slate-200/50 shadow-sm'} backdrop-blur-md flex flex-col justify-between aspect-[4/3] md:aspect-square`}>
                        <span className={`text-[10px] md:text-xs uppercase tracking-widest font-semibold ${themeClasses.textMuted}`}>Desvios (R$)</span>
                        <div>
                          <h4 className={`font-montserrat text-3xl md:text-4xl font-light tracking-tight ${themeClasses.textMuted}`}>0<span className="text-sm md:text-base ml-1 font-mono">,00</span></h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 05: IMMERSION */}
          <section id="immersion" className={`mb-32 pt-24 border-t ${themeClasses.border}`}>
            <div className="mb-16">
              <span className="text-gradient font-montserrat font-bold tracking-widest uppercase text-sm">05. Imersão da Marca</span>
              <h2 className="font-montserrat text-4xl font-bold mt-4">Autoridade Visual em Tempo Real</h2>
              <p className={`${themeClasses.textMuted} font-light text-lg mt-6 max-w-3xl leading-relaxed`}>
                A teoria aplicada. Abaixo, demonstramos como nossas diretrizes de <strong>Zero Aditivos</strong>, <strong>Ingredientes Puros</strong> e <strong>Clareza Instantânea</strong> se comportam com dados vivos. Uma interface hi-tech que descansa os olhos e cartões de visita que exigem respeito imediato.
              </p>
            </div>

            <div className="space-y-24">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="font-montserrat text-2xl font-bold">Interfaces Táteis</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono border ${themeClasses.border} ${themeClasses.textMuted} flex items-center gap-2`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Live System
                  </span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className={`p-8 rounded-3xl border shadow-lg relative overflow-hidden transition-all duration-700 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-[#FDFBF7] border-slate-200/60'}`}>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFB997]">01. Bento Grid / Foco</span>
                      <Activity size={16} className="text-slate-400 opacity-50" />
                    </div>
                    <div className={`p-6 rounded-2xl border transition-colors ${isDark ? 'bg-[#020617]/50 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <span className={`font-inter font-medium text-xs mb-3 block uppercase tracking-wider ${themeClasses.textMuted}`}>Custo Real vs Projetado</span>
                      <div className="font-montserrat font-semibold text-4xl md:text-5xl tracking-tight flex items-baseline gap-1 transition-all duration-500">
                        <span className="text-xl text-slate-400 font-light">R$</span>
                        <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>
                          {liveMetrics.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#4FD1C5] bg-[#4FD1C5]/10 w-fit px-3 py-1 rounded-full">
                        <ShieldCheck size={14} /> Dentro da margem segura
                      </div>
                    </div>
                  </div>

                  <div className={`p-8 rounded-3xl border shadow-lg relative overflow-hidden transition-all duration-700 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-[#FDFBF7] border-slate-200/60'}`}>
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#4FD1C5]/20 to-[#C6A8FF]/20 blur-3xl rounded-full pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#4FD1C5]">02. Glassmorphism / Profundidade</span>
                      <Cpu size={16} className="text-[#4FD1C5] opacity-80" />
                    </div>
                    <div className={`p-6 rounded-2xl border backdrop-blur-xl transition-colors ${isDark ? 'bg-slate-800/40 border-[#4FD1C5]/20' : 'bg-white/60 border-[#4FD1C5]/20 shadow-[0_10px_30px_rgba(79,209,197,0.05)]'} relative z-10`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-inter font-medium text-xs text-[#4FD1C5] uppercase tracking-wider">IA: Previsão de Margem Livre</span>
                        <div className="p-1.5 rounded-full bg-[#4FD1C5]/20 animate-pulse">
                          <ArrowUpRight size={14} className="text-[#4FD1C5]" />
                        </div>
                      </div>
                      <div className="font-montserrat font-semibold text-4xl md:text-5xl tracking-tight text-[#4FD1C5] flex items-baseline gap-1 transition-all duration-300">
                        <span>+{liveMetrics.margin.toFixed(2)}</span>
                        <span className="text-2xl font-light">%</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-8 rounded-3xl border shadow-lg relative overflow-hidden transition-all duration-700 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-[#FDFBF7] border-slate-200/60'}`}>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#C6A8FF]">03. Linear SaaS / Precisão</span>
                    </div>
                    <div className={`p-6 rounded-xl border-l-2 transition-colors ${isDark ? 'border-[#C6A8FF] bg-[#020617]' : 'border-[#C6A8FF] bg-white shadow-sm'}`}>
                      <div className="flex justify-between items-end mb-4">
                        <span className={`font-inter text-xs uppercase tracking-wider ${themeClasses.textMuted}`}>Eficiência Operacional</span>
                        <span className={`font-mono text-xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{liveMetrics.efficiency.toFixed(1)}%</span>
                      </div>
                      <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <div 
                          className="h-full bg-[#C6A8FF] transition-all duration-1000 ease-out"
                          style={{ width: `${liveMetrics.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-8 rounded-3xl border shadow-lg relative overflow-hidden transition-all duration-700 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-[#FDFBF7] border-slate-200/60'}`}>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">04. Ingredientes Puros / Clareza</span>
                    </div>
                    <div className="flex flex-col justify-center h-[100px]">
                      <span className={`font-inter font-light text-sm mb-1 ${themeClasses.textMuted}`}>Economia gerada por otimização:</span>
                      <div className={`font-montserrat font-bold text-3xl md:text-4xl tracking-tight ${isDark ? 'text-green-400' : 'text-green-600'} transition-all duration-500`}>
                        + R$ {liveMetrics.savings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-200/50 dark:border-slate-800/50">
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="font-montserrat text-2xl font-bold">Stationery & Print</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono border ${themeClasses.border} ${themeClasses.textMuted}`}>Cartão Premium</span>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#4FD1C5] pl-2">01. Variante Executiva (Noturna)</span>
                    <div className="w-full aspect-[1.586/1] rounded-xl shadow-2xl relative overflow-hidden group bg-[#020617] border border-slate-800 transition-transform duration-700 hover:scale-[1.02] flex flex-col justify-between p-8 md:p-10">
                      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                      <svg viewBox="0 0 100 100" className="absolute -right-24 -bottom-24 w-96 h-96 opacity-[0.02] group-hover:opacity-[0.04] transition-all duration-1000 group-hover:rotate-6 pointer-events-none">
                          <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                          <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="white" strokeWidth="1" strokeLinejoin="round" />
                      </svg>
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FFB997] via-[#4FD1C5] to-[#C6A8FF] opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                      <div className="relative z-10 flex items-center gap-4">
                        <svg viewBox="0 0 100 100" className="w-6 h-6">
                            <defs>
                                <linearGradient id="card1Grad" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FFB997"/>
                                    <stop offset="50%" stopColor="#4FD1C5"/>
                                    <stop offset="100%" stopColor="#C6A8FF"/>
                                </linearGradient>
                            </defs>
                            <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="none" stroke="url(#card1Grad)" strokeWidth="5" strokeLinejoin="round" />
                            <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="url(#card1Grad)" strokeWidth="3" strokeLinejoin="round" opacity="0.8"/>
                        </svg>
                        <h3 className="font-montserrat font-extrabold tracking-[0.2em] text-white text-sm md:text-base">TONDARA</h3>
                      </div>
                      <div className="relative z-10 w-full">
                        <h4 className="font-montserrat font-bold text-xl md:text-2xl text-white mb-1.5 tracking-tight">Leiryelton Oliveira</h4>
                        <p className="font-mono text-[#4FD1C5] text-[10px] md:text-xs uppercase tracking-widest mb-6">Data Engineer / Co-Founder</p>
                        <div className="w-full h-px bg-gradient-to-r from-slate-700 to-transparent mb-6 opacity-50"></div>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                          <div className="font-inter font-light text-[10px] md:text-xs text-slate-400 flex flex-col gap-1.5">
                            <span className="hover:text-white transition-colors cursor-pointer">leiryelton@tondara.com.br</span>
                            <span className="hover:text-white transition-colors cursor-pointer">+55 11 99448-8407</span>
                          </div>
                          <span className="font-mono text-[8px] md:text-[9px] text-slate-600 tracking-widest uppercase text-right">
                            ID: LEO.001 // BR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 pl-2">02. Variante Minimalista (Algodão Cru)</span>
                    <div className="w-full aspect-[1.586/1] rounded-xl shadow-lg relative overflow-hidden group bg-[#FDFBF7] border border-slate-200 transition-transform duration-700 hover:scale-[1.02] p-8 md:p-10">
                      <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.25]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                      <div className="absolute top-8 left-8 font-mono text-[8px] text-slate-400 tracking-[0.2em] uppercase z-10">
                        Infraestrutura de Dados
                      </div>
                      <div className="absolute top-8 right-8 font-mono text-[8px] text-slate-400 tracking-[0.2em] uppercase z-10">
                        TNDR.SYS
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="w-16 h-16 md:w-20 md:h-20 mb-5 transform group-hover:scale-105 transition-transform duration-700">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400 drop-shadow-sm">
                              <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                              <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <h3 className="font-montserrat font-extrabold tracking-[0.25em] text-slate-400 text-lg md:text-xl">TONDARA</h3>
                      </div>
                      <div className="absolute bottom-8 left-0 w-full text-center z-10">
                        <span className="font-montserrat font-semibold text-[9px] md:text-[10px] text-slate-400 tracking-[0.3em] uppercase">
                          tondara.com.br
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 06: COPYWRITING */}
          <section id="copywriting" className={`mb-32 pt-24 border-t ${themeClasses.border}`}>
            <div className="mb-16">
              <span className="text-gradient font-montserrat font-bold tracking-widest uppercase text-sm">06. Voz da Marca</span>
              <h2 className="font-montserrat text-4xl font-bold mt-4">Voz & Copywriting</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-20">
              {[
                { id: "01", title: "Protagonismo do Cliente", desc: "Comece pela dor real dele, não pela nossa tecnologia." },
                { id: "02", title: "Chamada para Ação", desc: "Todo post deve guiar para o diagnóstico gratuito." },
                { id: "03", title: "Simplicidade Técnica", desc: "Não confunda o cliente com excesso de termos de TI." },
                { id: "04", title: "Prova em Números", desc: "Dados são nossa autoridade. Use-os sempre." },
                { id: "05", title: "Foco no Lucro", desc: "Fale de 'margem' e 'custo/m²', não de 'código'." },
                { id: "06", title: "Concisão", desc: "Frases curtas transmitem mais clareza e autoridade." }
              ].map((rule) => (
                <div key={rule.id} className={`flex gap-6 border-b pb-6 ${themeClasses.border}`}>
                  <span className="font-montserrat font-bold text-slate-400 text-xl">{rule.id}</span>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">{rule.title}</h4>
                    <p className={`${themeClasses.textMuted} font-light text-sm`}>{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-10 md:p-14 rounded-3xl relative overflow-hidden border transition-colors duration-500 ${themeClasses.card}`}>
              <span className={`uppercase tracking-widest text-xs font-semibold mb-8 block ${themeClasses.textMuted}`}>Exemplo de Tom de Voz</span>
              <div className="font-inter font-normal text-lg md:text-xl leading-relaxed space-y-6 relative z-10">
                <p><strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>70%</strong> das construtoras ainda gerenciam obras com planilhas soltas.</p>
                <p>O preço do m² subiu <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>13,4%</strong> — e o INCC não para. Se sua margem não é monitorada em tempo real, você está perdendo lucro agora.</p>
                <p>Na Tondara, construímos a inteligência que faz seus dados trabalharem pela sua obra.</p>
                <div className="pt-6">
                  <button className="group relative rounded-full p-[2px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(79,209,197,0.25)] cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFB997] via-[#4FD1C5] to-[#C6A8FF] rounded-full"></div>
                    <div className={`relative flex items-center gap-3 px-8 py-4 rounded-full font-montserrat font-bold text-xs uppercase tracking-[0.15em] transition-colors ${isDark ? 'bg-slate-900' : 'bg-[#FDFBF7]'}`}>
                      <span className="bg-gradient-to-r from-[#FFB997] via-[#4FD1C5] to-[#C6A8FF] bg-clip-text text-transparent">Crescimento Contínuo</span>
                      <ChevronRight size={16} strokeWidth={2.5} className="text-[#4FD1C5] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FINAL SIGNATURE */}
          <div className="py-32 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="font-montserrat text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Seus dados falam.<br/>
              <span className="text-gradient">A Tondara traduz.</span>
            </h2>
          </div>

        </div>
        
        <footer className={`mt-32 py-12 text-center transition-colors duration-500 border-t ${themeClasses.border} ${isDark ? 'bg-[#020617]' : 'bg-transparent'}`}>
          <p className={`text-sm ${themeClasses.textMuted}`}>TONDARA © 2026. A Inteligência do Negócio.</p>
        </footer>
      </main>
      
    </div>
  );
}