import { Grain } from "@/components/ui/Grain"
import AnimatedCounter from "@/components/ui/AnimatedCounter"
import { LucideShieldCheck, LucideGlobe, LucideHeartHandshake, LucideScale, LucideShield, LucideUsers, LucideRocket, LucideLeaf, LucideHeart } from "lucide-react"
import { motion } from "framer-motion"

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

export default function About() {
    return (
        <div className="flex flex-col w-full bg-[#f8f6f0] dark:bg-zinc-950 transition-apple relative overflow-hidden font-sans">
            
            {/* Global Animated Film/Paper Grain Overlay */}
            <Grain opacity={0.09} />

            {/* Editorial Header Section (Masthead Style) */}
            <section className="relative min-h-[70svh] flex flex-col justify-end px-4 sm:px-8 md:px-12 pb-12 pt-40 overflow-hidden">
                <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end relative z-10">
                    
                    {/* Main Headline */}
                    <div className="lg:col-span-8 space-y-8">
                        <FadeIn delay={0.1}>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-heritage-terracotta"></div>
                                <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-heritage-navy/70 dark:text-white/70">
                                    A Instituição // Sobre Nós
                                </span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <h1 className="font-serif text-[4.5rem] leading-[0.9] sm:text-[6rem] md:text-[8rem] font-medium text-heritage-navy dark:text-white tracking-tighter">
                                Bureau Social: <br /> <span className="text-heritage-terracotta italic font-normal">Impacto Real</span>.
                            </h1>
                        </FadeIn>
                    </div>

                    {/* Sub-Article / Lead Paragraph */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full border-t border-heritage-navy/20 dark:border-white/20 pt-6 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-12">
                        <FadeIn delay={0.5} direction="left">
                            <p className="text-xl sm:text-2xl text-heritage-navy/80 dark:text-white/80 leading-snug font-medium">
                                "Transformando desafios em oportunidades de impacto positivo através da inovação social em rede."
                            </p>
                        </FadeIn>
                    </div>
                    
                </div>
            </section>

            <div className="w-full border-t border-heritage-navy/10 dark:border-white/10 relative z-20"></div>

            {/* Editorial Content Section - Newspaper columns */}
            <section className="relative min-h-[70vh] flex flex-col justify-center px-4 sm:px-8 md:px-12 py-24 sm:py-32 overflow-hidden bg-[#f5f3ec] dark:bg-zinc-900/50">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-10">
                    
                    {/* Left Column (Image/Photojournalism) */}
                    <div className="md:col-span-6 relative">
                        <FadeIn delay={0.2} triggerOnView className="h-full">
                            <div className="relative border border-heritage-navy/10 dark:border-white/10 p-2 bg-[#f8f6f0] dark:bg-zinc-950 h-[100%]">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
                                    alt="Equipe Bureau"
                                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700 aspect-square md:aspect-auto"
                                />
                                <div className="absolute bottom-2 left-2 right-2 bg-[#f8f6f0]/90 dark:bg-zinc-950/90 backdrop-blur-md p-4 text-xs font-medium text-heritage-navy/70 dark:text-white/70 uppercase tracking-widest border border-heritage-navy/10 dark:border-white/10">
                                    Arquivo // Lisboa, PT
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                    
                    {/* Center Column / Right Column (Body Copy) */}
                    <div className="md:col-span-6 flex flex-col gap-12 md:pl-12 border-t-2 md:border-t-0 md:border-l-2 border-heritage-terracotta pt-8 md:pt-0">
                        <FadeIn delay={0.4} direction="left" triggerOnView>
                            <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Manifesto</span>
                            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-heritage-navy dark:text-white leading-[1] tracking-tight mb-8">
                                A nossa missão como <span className="italic text-heritage-terracotta">IPSS</span> é clara.
                            </h2>
                            <p className="text-lg sm:text-xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium mb-6">
                                <span className="float-left text-6xl leading-[0.8] pr-3 pt-2 font-serif text-heritage-terracotta font-medium">O</span>
                                Instituto Português de Negócios Sociais – Bureau Social é uma associação sem fins lucrativos que promove negócios sociais e preservação cultural. Nossa missão como IPSS é clara: resolver problemas sociais de forma sustentável.
                            </p>
                            <p className="text-lg sm:text-xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                Atuamos na reabilitação de imóveis devolutos para garantir que a população histórica permaneça no coração de Lisboa, lutando ativamente contra a gentrificação extrema que descaracteriza as nossas cidades.
                            </p>
                        </FadeIn>

                        <div className="w-full border-t border-heritage-navy/10 dark:border-white/10"></div>

                        <FadeIn delay={0.6} direction="left" triggerOnView>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                                {[
                                    { label: "IPSS Certificada", icon: LucideShieldCheck },
                                    { label: "Impacto Humano", icon: LucideHeartHandshake },
                                    { label: "Justiça Social", icon: LucideScale },
                                    { label: "Lisboa Local", icon: LucideGlobe }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-4 group">
                                        <div className="w-12 h-12 border-2 border-heritage-navy/20 dark:border-white/20 rounded-full flex items-center justify-center text-heritage-navy dark:text-white group-hover:bg-heritage-terracotta group-hover:border-heritage-terracotta group-hover:text-white transition-all duration-300">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs font-bold text-heritage-navy dark:text-white uppercase tracking-[0.2em]">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <div className="w-full border-t border-heritage-navy/10 dark:border-white/10 relative z-20"></div>

            {/* Impact Areas Section - The Classifieds / Features Grid */}
            <section className="relative z-20">
                
                {/* Section Header */}
                <div className="px-4 sm:px-8 md:px-12 py-16 sm:py-24 bg-[#f8f6f0] dark:bg-zinc-950">
                    <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-6">
                        <FadeIn delay={0.1} triggerOnView>
                            <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">
                                Impacto Social Multidimensional
                            </span>
                        </FadeIn>
                        <FadeIn delay={0.2} triggerOnView>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-heritage-navy dark:text-white tracking-tight">
                                As Nossas Áreas de <span className="text-heritage-terracotta italic font-normal">Impacto</span>.
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.3} triggerOnView>
                            <p className="text-lg text-heritage-navy/70 dark:text-white/70 max-w-2xl mx-auto font-medium">
                                O Bureau Social atua em pilares fundamentais para criar transformação social sustentável e escalável em rede.
                            </p>
                        </FadeIn>
                    </div>
                </div>

                {/* Newspaper Grid Layout - mesma secção com imagens da Homepage */}
                <div className="max-w-[1400px] mx-auto border-t border-x border-heritage-navy/10 dark:border-white/10 border-b relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10">
                        {[
                            {
                                title: "Habitação e Reabilitação",
                                subtitle: "Reabilitação Urbana",
                                icon: LucideShield,
                                image: "/images/pillars/housing.png",
                                desc: "Desenvolvimento de projetos de habitação acessível e reabilitação de edifícios históricos, garantindo que as comunidades locais permaneçam nos centros."
                            },
                            {
                                title: "Tecnologia Social",
                                subtitle: "Aceleração Digital",
                                icon: LucideUsers,
                                image: "/images/pillars/innovation-v2.png",
                                desc: "Desenvolvimento de soluções tecnológicas e metodologias inovadoras para resolver desafios sociais de forma escalável."
                            },
                            {
                                title: "Sustentabilidade",
                                subtitle: "Economia Circular",
                                icon: LucideLeaf,
                                image: "/images/pillars/sustainability.png",
                                desc: "Promoção da economia circular e práticas de construção sustentável, utilizando materiais ecológicos e energia 100% renovável."
                            },
                            {
                                title: "Inclusão e Combate à Pobreza",
                                subtitle: "Combate à Pobreza",
                                icon: LucideHeart,
                                image: "/images/pillars/inclusion.png",
                                desc: "Programas de capacitação profissional, preservação de ofícios tradicionais e integração no mercado de trabalho."
                            },
                            {
                                title: "Empreendedorismo Social",
                                subtitle: "Negócios Sociais",
                                icon: LucideRocket,
                                image: "/images/pillars/entrepreneurship.png",
                                desc: "Incubação e aceleração de negócios sociais que geram impacto positivo e sustentabilidade financeira, capacitando empreendedores locais."
                            }
                        ].map((pillar, i) => (
                            <FadeIn key={i} delay={0.1 + (i * 0.1)} triggerOnView className={`relative overflow-hidden p-8 sm:p-12 transition-colors duration-700 group ${i >= 3 ? 'border-t border-heritage-navy/10 dark:border-white/10' : ''} ${i === 4 ? 'lg:col-span-2' : ''}`}>
                                {/* Hover Image Background - mesmo design da Homepage */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                                    <motion.img 
                                        src={pillar.image} 
                                        alt={pillar.title}
                                        className={`w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000 ease-out ${pillar.title === "Empreendedorismo Social" ? "object-[center_70%]" : ""}`}
                                    />
                                    <div className="absolute inset-0 bg-[#3d3529]/55 dark:bg-[#2a251e]/60 transition-colors duration-700"></div>
                                </div>

                                <div className="relative z-10 flex flex-col h-full justify-between gap-12 group-hover:translate-x-2 transition-transform duration-500">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold text-heritage-terracotta uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500">0{i + 1} // {pillar.subtitle}</span>
                                            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-heritage-navy dark:text-white leading-tight group-hover:text-white transition-colors duration-500">
                                                {pillar.title}
                                            </h3>
                                        </div>
                                        <div className="w-10 h-10 border border-heritage-navy/20 dark:border-white/20 rounded-full flex items-center justify-center text-heritage-navy dark:text-white group-hover:bg-white group-hover:border-white group-hover:text-heritage-navy transition-all duration-500">
                                            <pillar.icon className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <p className="text-sm sm:text-base text-heritage-navy/70 dark:text-white/70 font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500 max-w-md">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stats - Editorial Footer Style */}
            <section className="py-24 px-4 sm:px-8 md:px-12 bg-[#f8f6f0] dark:bg-zinc-950 relative z-20">
                <div className="max-w-[1400px] mx-auto border-y border-heritage-navy/10 dark:border-white/10 py-12">
                    <FadeIn delay={0.2} triggerOnView>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 divide-x-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10">
                            {[
                                { to: 50, suffix: "+", label: "Famílias Apoiadas", color: "text-heritage-navy dark:text-white" },
                                { to: 12, label: "Negócios Sociais", color: "text-heritage-terracotta" },
                                { to: 100, suffix: "%", label: "Energia Renovável", color: "text-heritage-success" },
                                { to: 200, suffix: "+", label: "Capacitados", color: "text-heritage-gold" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center justify-center text-center px-4 space-y-4">
                                    <div className={`text-5xl sm:text-6xl md:text-7xl font-serif font-medium ${stat.color}`}>
                                        <AnimatedCounter to={stat.to} suffix={stat.suffix || ""} duration={1.8} />
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/40">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    )
}
