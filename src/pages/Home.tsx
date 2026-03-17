import { Link } from "react-router-dom";
import { Grain } from "@/components/ui/Grain";
import Magnetic from "@/components/ui/Magnetic";
import { LucideArrowDownRight, LucideShield, LucideUsers, LucideRocket, LucideLeaf, LucideHeart } from "lucide-react";
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HomeContent {
    hero: {
        title: string;
        subtitle: string;
    };
    mission: {
        title: string;
        text: string;
    };
}

interface CMSItem {
    section_key: string;
    content: Record<string, string>;
}

// Webflow-style fade-in animation component
const FadeIn = ({ children, delay = 0, className = "", direction = "up", triggerOnView = false }: any) => {
    const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
    const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;

    if (triggerOnView) {
        return (
            <motion.div
                initial={{ opacity: 0, y: yOffset, x: xOffset }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
                className={className}
            >
                {children}
            </motion.div>
        )
    }
    
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset, x: xOffset }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function Home() {
    const missionRef = useRef<HTMLElement>(null)
    const missionBgRef = useRef<HTMLDivElement>(null)

    const [content, setContent] = useState<HomeContent>({
        hero: {
            title: "Tradição que <br /> <span class='text-heritage-terracotta italic font-normal'>Reabilita</span>.",
            subtitle: "Atuamos no coração histórico de Lisboa para preservar a alma dos bairros através da reabilitação urbana e inclusão social."
        },
        mission: {
            title: "O lucro humano <br />em <span class='italic'>Lisboa</span>.",
            text: "Reabilitamos edifícios devolutos para garantir que o artesão, o fadista e o idoso continuem a ser os donos das ruas de Alfama e Graça."
        }
    })

    useEffect(() => {
        const fetchCMS = async () => {
            const { data } = await supabase.from('cms_content').select('*')
            if (data && data.length > 0) {
                const mapped = data.reduce((acc: Record<string, Record<string, string>>, item: CMSItem) => {
                    acc[item.section_key] = item.content
                    return acc
                }, {})

                setContent((prev: HomeContent) => ({
                    hero: { ...prev.hero, ...mapped.hero },
                    mission: { ...prev.mission, ...mapped.mission }
                }))
            }
        }
        fetchCMS()
    }, [])

    useEffect(() => {
        const section = missionRef.current
        const bg = missionBgRef.current
        if (!section || !bg) return
        const ctx = gsap.context(() => {
            gsap.fromTo(
                bg,
                { yPercent: -15 },
                {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                    },
                }
            )
        }, section)
        return () => ctx.revert()
    }, [])

    return (
        <div className="flex flex-col w-full bg-[#f8f6f0] dark:bg-zinc-950 transition-apple relative overflow-hidden font-sans">
            
            {/* Global Animated Film/Paper Grain Overlay */}
            <Grain opacity={0.09} />

            {/* Editorial Hero Section (Masthead Style) */}
            <section className="relative min-h-[90svh] flex flex-col justify-end px-4 sm:px-8 md:px-12 pb-12 pt-32 overflow-hidden">
                <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end relative z-0">
                    
                    {/* Main Headline */}
                    <div className="lg:col-span-8 space-y-8">
                        <FadeIn delay={0.1}>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-heritage-terracotta"></div>
                                <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-heritage-navy/70 dark:text-white/70">
                                    Edição Especial // Lisboa
                                </span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <h1
                                className="font-serif text-[4.5rem] leading-[0.9] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] font-medium text-heritage-navy dark:text-white tracking-tighter"
                                dangerouslySetInnerHTML={{ __html: content.hero.title }}
                            />
                        </FadeIn>
                    </div>

                    {/* Sub-Article / Lead Paragraph */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full border-t border-heritage-navy/20 dark:border-white/20 pt-6 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-12">
                        <FadeIn delay={0.5} direction="left">
                            <p className="text-xl sm:text-2xl text-heritage-navy/80 dark:text-white/80 leading-snug font-medium mb-12">
                                {content.hero.subtitle}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.7} direction="left">
                            <div className="w-full">
                                <span className="block text-[10px] uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mb-3 font-semibold">Tome Ação</span>
                                <Magnetic>
                                    <Link to="/candidatura" className="block outline-none group">
                                        <div className="flex items-center justify-between border-b-2 border-heritage-navy dark:border-white pb-3 group-hover:border-heritage-terracotta transition-colors duration-500 cursor-pointer">
                                            <span className="text-xl sm:text-2xl font-serif font-medium text-heritage-navy dark:text-white group-hover:text-heritage-terracotta transition-colors duration-500">
                                                Associe-se ao Bureau
                                            </span>
                                            <div className="w-8 h-8 rounded-full border border-heritage-navy/20 dark:border-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 group-hover:bg-heritage-terracotta group-hover:border-heritage-terracotta group-hover:text-white">
                                                <LucideArrowDownRight className="w-4 h-4 text-heritage-navy dark:text-white group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </Link>
                                </Magnetic>
                            </div>
                        </FadeIn>
                    </div>
                    
                </div>
            </section>

            <div className="w-full border-t border-heritage-navy/10 dark:border-white/10"></div>

            {/* Mission Section - The Editorial Feature */}
            <section ref={missionRef} className="relative min-h-[70vh] flex flex-col justify-center px-4 sm:px-8 md:px-12 py-24 sm:py-32 overflow-hidden">
                {/* Mission background image com parallax */}
                <div
                    ref={missionBgRef}
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.25] sm:opacity-[0.35] dark:opacity-[0.15] mix-blend-multiply dark:mix-blend-screen"
                    style={{
                        backgroundImage: "url('/body.jpg')",
                        height: "120%",
                        top: "-10%",
                    }}
                    aria-hidden
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f8f6f0] via-transparent to-[#f8f6f0] dark:from-zinc-950 dark:via-transparent dark:to-zinc-950 pointer-events-none" />
                <div className="absolute inset-0 z-0 bg-[#f8f6f0]/40 dark:bg-zinc-950/60 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-10">
                    
                    {/* Left Column (Metadata) */}
                    <div className="md:col-span-2 sm:col-span-1 border-t-2 md:border-t-0 md:border-l-2 border-heritage-terracotta pt-4 md:pt-0 md:pl-6 bg-transparent">
                        <FadeIn delay={0.1} direction="left" triggerOnView>
                            <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">A Nossa Visão</span>
                            <span className="text-heritage-navy dark:text-white font-serif italic text-lg opacity-80">Por que existimos?</span>
                        </FadeIn>
                    </div>
                    
                    {/* Center Column (Huge Headline) */}
                    <div className="md:col-span-6">
                        <FadeIn delay={0.3} triggerOnView>
                            <h2
                                className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-medium text-heritage-navy dark:text-white leading-[0.95] tracking-tight"
                                dangerouslySetInnerHTML={{ __html: content.mission.title }}
                            />
                        </FadeIn>
                    </div>
                    
                    {/* Right Column (Body Copy) */}
                    <div className="md:col-span-4 flex items-end">
                        <FadeIn delay={0.5} direction="left" triggerOnView>
                            <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                <span className="float-left text-6xl leading-[0.8] pr-3 pt-2 font-serif text-heritage-terracotta font-medium">{content.mission.text.charAt(0)}</span>
                                {content.mission.text.substring(1)}
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Pillars - The Classifieds / Features Grid */}
            <section className="border-t border-heritage-navy/10 dark:border-white/10 relative z-20">
                
                {/* Section Header */}
                <div className="border-b border-heritage-navy/10 dark:border-white/10 px-4 sm:px-8 md:px-12 py-8 bg-[#f5f3ec] dark:bg-zinc-900">
                    <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <FadeIn delay={0.1} triggerOnView>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-heritage-navy dark:text-white tracking-tight">
                                Atuação <span className="text-heritage-terracotta italic">Multidimensional</span>.
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.3} direction="left" triggerOnView>
                            <p className="text-sm uppercase tracking-widest font-semibold text-heritage-navy/50 dark:text-white/50 max-w-xs sm:text-right">
                                5 Pilares Fundamentais de Impacto
                            </p>
                        </FadeIn>
                    </div>
                </div>

                {/* Newspaper Grid Layout */}
                <div className="max-w-[1400px] mx-auto border-x border-heritage-navy/10 dark:border-white/10 border-b">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10">
                        
                        {[
                            {
                                title: "Habitação Social",
                                subtitle: "Reabilitação Urbana",
                                icon: LucideShield,
                                image: "/images/pillars/housing.png",
                                desc: "Projetos de habitação acessível nos centros históricos para proteger residentes locais da gentrificação extrema, preservando a identidade bairrista."
                            },
                            {
                                title: "Tecnologia e Inovação",
                                subtitle: "Aceleração Digital",
                                icon: LucideUsers,
                                image: "/images/pillars/innovation-v2.png",
                                desc: "Construindo pontes digitais entre as gerações antigas e as novas tecnologias para resolução de desafios sociais modernos."
                            },
                            {
                                title: "Sustentabilidade",
                                subtitle: "Economia Circular",
                                icon: LucideLeaf,
                                image: "/images/pillars/sustainability.png",
                                desc: "Implementação de materiais ecológicos e energia 100% renovável em todas as nossas obras e iniciativas cotidianas."
                            },
                            {
                                title: "Inclusão Social",
                                subtitle: "Combate à Pobreza",
                                icon: LucideHeart,
                                image: "/images/pillars/inclusion.png",
                                desc: "Capacitação profissional e preservação de ofícios tradicionais que dão vida à história pulsante de Lisboa."
                            },
                            {
                                title: "Empreendedorismo",
                                subtitle: "Negócios Sociais",
                                icon: LucideRocket,
                                image: "/images/pillars/entrepreneurship.png",
                                desc: "Incubação de startups com impacto social positivo: transformar ideias inovadoras em sustento real para as comunidades vulneráveis."
                            }
                        ].map((pillar, i) => (
                            <FadeIn key={i} delay={0.1 + (i * 0.1)} triggerOnView className={`relative overflow-hidden p-8 sm:p-12 transition-colors duration-700 group ${i >= 3 ? 'border-t border-heritage-navy/10 dark:border-white/10' : ''} ${i === 4 ? 'lg:col-span-2' : ''}`}>
                                {/* Hover Image Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                                    <motion.img 
                                        src={pillar.image} 
                                        alt={pillar.title}
                                        className={`w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000 ease-out ${pillar.title === "Empreendedorismo" ? "[object-position:center_70%]" : ""}`}
                                    />
                                    {/* Overlay cor papel vintage leve — imagem visível, texto ainda legível */}
                                    <div className="absolute inset-0 bg-[#3d3529]/55 dark:bg-[#2a251e]/60 transition-colors duration-700"></div>
                                </div>

                                <div className="relative z-10 flex flex-col h-full justify-between gap-12 group-hover:translate-x-2 transition-transform duration-500">
                                    
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold text-heritage-terracotta uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500">0{i + 1} // {pillar.subtitle}</span>
                                            {/* Texto fica branco em hover */}
                                            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-heritage-navy dark:text-white leading-tight group-hover:text-white transition-colors duration-500">
                                                {pillar.title}
                                            </h3>
                                        </div>
                                        {/* Ícone inverte as cores e fica branco e azul escuro no hover */}
                                        <div className="w-10 h-10 border border-heritage-navy/20 dark:border-white/20 rounded-full flex items-center justify-center text-heritage-navy dark:text-white group-hover:bg-white group-hover:border-white group-hover:text-heritage-navy transition-all duration-500">
                                            <pillar.icon className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Descrição fica branca em hover */}
                                    <p className="text-sm sm:text-base text-heritage-navy/70 dark:text-white/70 font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500 max-w-md">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
