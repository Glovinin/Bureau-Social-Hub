import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

interface ProcessoOperacionalProps {
    project?: "quinta" | "torre"
}

export default function ProcessoOperacional({ project }: ProcessoOperacionalProps) {
    const fasesQuinta = [
        { fase: "Fase 1", nome: "Constituição", periodo: "1º Semestre 2026", tasks: ["Aprovação de Estatutos", "Assembleia Constitutiva", "Termo de Cooperação IPNS", "Contrato de Arrendamento"] },
        { fase: "Fase 2", nome: "Diagnóstico", periodo: "2º Semestre 2026", tasks: ["Levantamento Técnico", "Plano de Intervenção", "Candidaturas (LIFE/FSE+)", "Mapeamento de Ofícios"] },
        { fase: "Fase 3", nome: "Captação & Formação", periodo: "2026-2027", tasks: ["Recrutamento de Mestres", "Seleção de Aprendizes", "Módulos Teórico-Práticos", "Certificações Iniciais"] },
        { fase: "Fase 4", nome: "Execução", periodo: "2027-2028", tasks: ["Restauro do Palacete e Anexos", "Jardim Histórico", "Sistemas de Água por Gravidade", "Centro de Formação"] },
        { fase: "Fase 5", nome: "Operação & ESG", periodo: "2028+", tasks: ["Abertura ao Público", "Programa de Turismo Cultural", "Comercialização de Produtos Artesanais", "Relatórios de Sustentabilidade"] }
    ]

    const fasesTorre = [
        { fase: "Fase 1", nome: "Constituição", periodo: "1º Semestre 2026", tasks: ["Aprovação de Estatutos", "Assembleia Constitutiva", "Termo de Cooperação IPNS", "Contrato de Arrendamento"] },
        { fase: "Fase 2", nome: "Diagnóstico", periodo: "2º Semestre 2026", tasks: ["Levantamento Técnico", "Plano de Intervenção", "Candidaturas (LIFE/FEADER)", "Mapeamento de Ofícios Alentejanos"] },
        { fase: "Fase 3", nome: "Captação & Formação", periodo: "2026-2027", tasks: ["Recrutamento de Mestres Corticeiros", "Seleção de Aprendizes", "Módulos Teórico-Práticos", "Certificações Iniciais"] },
        { fase: "Fase 4", nome: "Execução", periodo: "2027-2029", tasks: ["Consolidação da Torre e Ermida", "Restauro da Azulejaria Mudejar", "Montado e Cortiça", "Turismo de Natureza"] },
        { fase: "Fase 5", nome: "Operação & ESG", periodo: "2029+", tasks: ["Abertura ao Público", "Ecoturismo e Retiro", "Produção de Cortiça e Mel", "Relatórios de Sustentabilidade"] }
    ]

    const fases = project === "torre" ? fasesTorre : fasesQuinta

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const smoothedProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    return (
        <div className="w-full bg-[#f8f6f0] dark:bg-zinc-950 py-12">
            <div ref={containerRef} className="relative max-w-4xl px-4 sm:px-8 md:px-16 mx-auto">
                {/* Linha de Fundo - The track is at a fixed 24px (left-6) from the container's left padding edge on mobile, and 48px (left-12) on desktop */}
                <div className="absolute left-[32px] sm:left-[48px] md:left-[80px] top-6 bottom-6 w-[1px] bg-heritage-navy/10 dark:bg-white/10" />
                
                {/* Linha Preenchida Animada */}
                <motion.div 
                    className="absolute left-[32px] sm:left-[48px] md:left-[80px] top-6 bottom-6 w-[1px] bg-heritage-navy dark:bg-white origin-top"
                    style={{ scaleY: smoothedProgress }}
                />
                
                {/* Bolinha Seguindo (9px width => offset 4px to center on the 1px line) */}
                <motion.div
                    className="absolute left-[28px] sm:left-[44px] md:left-[76px] w-[9px] h-[9px] rounded-full bg-heritage-navy dark:bg-white z-10 shadow-[0_0_0_6px_rgba(248,246,240,1)] dark:shadow-[0_0_0_6px_rgba(9,9,11,1)]"
                    style={{ 
                        top: useTransform(smoothedProgress, [0, 1], ["1.5rem", "calc(100% - 1.5rem)"]) 
                    }}
                />

                <div className="space-y-16">
                    {fases.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative flex flex-col md:flex-row gap-6 md:gap-12 pl-12 sm:pl-16 md:pl-20 items-start"
                        >
                            {/* Bolinha Estática (Marcação de Etapas - 5px width => offset 2px to center on 1px line. Line is at 16px from content wrap, so left 14px) */}
                            {/* Wait, instead of calculating based on container padding, let's just use absolute positioning from the viewport or fix the relative calculations. */}
                            {/* If Item parent is at padding edge, its left=0. Track is at left=16px. So dot is at left=[14px] */}
                            <div className="absolute left-[14px] sm:left-[14px] md:left-[14px] top-2 w-[5px] h-[5px] rounded-full bg-heritage-navy/20 dark:bg-white/20" />

                            <div className="md:w-1/3 shrink-0 pt-0.5">
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-navy/50 dark:text-white/50 mb-3">{f.fase}</div>
                                <h3 className="font-serif text-3xl md:text-4xl text-heritage-navy dark:text-white mb-3 leading-none tracking-tight">{f.nome}</h3>
                                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-heritage-navy/70 dark:text-white/70">{f.periodo}</p>
                            </div>
                            
                            <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-heritage-navy/10 dark:border-white/10 pt-6 md:pt-1 md:pl-8">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                                    {f.tasks.map((task, idx) => (
                                        <li key={idx} className="flex gap-4 items-start group">
                                            <span className="text-[9px] tabular-nums tracking-widest border border-heritage-navy/20 dark:border-white/20 rounded-full w-4 h-4 flex items-center justify-center font-bold text-heritage-navy/50 dark:text-white/50 shrink-0 mt-[3px] group-hover:border-heritage-navy dark:group-hover:border-white transition-colors">
                                                {idx + 1}
                                            </span>
                                            <span className="text-sm font-medium text-heritage-navy/80 dark:text-white/80 leading-snug">
                                                {task}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
