import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { LucideCheckCircle2, LucideTarget } from "lucide-react"
import { useRef } from "react"

interface CronogramaVisualProps {
    project?: "quinta" | "torre"
}

export default function CronogramaVisual({ project }: CronogramaVisualProps) {
    const etapasQuinta = [
        { fase: "I", ano: "2026", label: "Arranque & Governança", desc: "Constituição da IPSS Banda Visconde de Salreu, Termo de Cooperação com IPNS e Candidaturas UE.", color: "terracotta" },
        { fase: "II", ano: "2027", label: "Escola de Ofícios", desc: "Recrutamento de Mestres, Início da Formação e Estabilização Estrutural do Palacete e Anexos.", color: "ocean" },
        { fase: "III", ano: "2028", label: "Restauro & Produção", desc: "Execução intensiva dos trabalhos de restauro com participação dos aprendizes e início da produção agrícola.", color: "gold" },
        { fase: "IV", ano: "2029", label: "Abertura & Impacto", desc: "Operação total, abertura ao público, turismo cultural e relatórios de sustentabilidade (ESG).", color: "success" }
    ]

    const etapasTorre = [
        { fase: "I", ano: "2026", label: "Arranque & Governança", desc: "Constituição da Associação APHC, Termo de Cooperação com IPNS e Candidaturas UE.", color: "terracotta" },
        { fase: "II", ano: "2027", label: "Escola de Ofícios", desc: "Recrutamento de Mestres Corticeiros, Início da Formação e Consolidação Estrutural da Torre e Ermida.", color: "ocean" },
        { fase: "III", ano: "2028", label: "Restauro & Montado", desc: "Execução intensiva dos trabalhos de restauro da azulejaria e gestão do montado com participação dos aprendizes.", color: "gold" },
        { fase: "IV", ano: "2029", label: "Abertura & Impacto", desc: "Operação total, ecoturismo, produção de cortiça e mel, e relatórios de sustentabilidade (ESG).", color: "success" }
    ]

    const etapas = project === "torre" ? etapasTorre : etapasQuinta

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const smoothedProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    return (
        <div className="w-full">
            <div className="mb-12 flex items-center justify-between border-b border-heritage-navy/20 dark:border-white/20 pb-4">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-navy/50 dark:text-white/50">{project === "torre" ? "30" : "24"} Meses</span>
                    <h4 className="font-serif text-2xl text-heritage-navy dark:text-white">Linha do Tempo</h4>
                </div>
            </div>

            <div ref={containerRef} className="relative px-4 sm:px-8 max-w-4xl mx-auto py-8">
                {/* Linha de Fundo - Tracker */}
                <div className="absolute left-[32px] sm:left-[48px] top-8 bottom-8 w-[1px] bg-heritage-navy/10 dark:bg-white/10" />
                
                {/* Linha Animada */}
                <motion.div 
                    className="absolute left-[32px] sm:left-[48px] top-8 bottom-8 w-[1px] bg-heritage-navy dark:bg-white origin-top"
                    style={{ scaleY: smoothedProgress }}
                />
                
                {/* Ponto Animado Sequencial */}
                <motion.div
                    className="absolute left-[28px] sm:left-[44px] w-[9px] h-[9px] rounded-full bg-heritage-navy dark:bg-white z-10 shadow-[0_0_0_6px_rgba(248,246,240,1)] dark:shadow-[0_0_0_6px_rgba(9,9,11,1)]"
                    style={{ 
                        top: useTransform(smoothedProgress, [0, 1], ["2rem", "calc(100% - 2rem)"]) 
                    }}
                />

                <div className="space-y-16">
                    {etapas.map((e, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative flex flex-col md:flex-row gap-4 md:gap-12 pl-12 sm:pl-16 items-start"
                        >
                            {/* Bolinha Estática */}
                            <div className="absolute left-[14px] sm:left-[14px] top-2 w-[5px] h-[5px] rounded-full bg-heritage-navy/20 dark:bg-white/20" />

                            <div className="md:w-1/3 shrink-0 pt-0.5">
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-navy/50 dark:text-white/50 mb-3">Fase {e.fase}</div>
                                <h3 className="font-serif text-4xl text-heritage-navy dark:text-white mb-2 leading-none tracking-tight">{e.ano}</h3>
                                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-heritage-navy/70 dark:text-white/70">{e.label}</p>
                            </div>
                            
                            <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-heritage-navy/10 dark:border-white/10 pt-4 md:pt-1 md:pl-8">
                                <p className="text-sm font-medium text-heritage-navy/80 dark:text-white/80 leading-relaxed mb-4">
                                    {e.desc}
                                </p>
                                {i === etapas.length - 1 && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-heritage-navy/20 dark:border-white/20 bg-transparent text-heritage-navy dark:text-white">
                                        <LucideTarget className="w-3 h-3" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Meta Alcançada</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-12 flex items-center gap-3 text-heritage-navy/60 dark:text-white/60 italic text-xs border-t border-heritage-navy/10 dark:border-white/10 pt-6">
                <LucideCheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <p>O cronograma articula restauro, formação e operação para otimizar a movimentação de mestres artesãos e equipamentos.</p>
            </div>
        </div>
    )
}
