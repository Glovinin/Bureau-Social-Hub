import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { LucideArrowDown } from "lucide-react"

interface ProximosPassosVisualProps {
    project?: "quinta" | "torre"
}

export default function ProximosPassosVisual({ project }: ProximosPassosVisualProps) {
    const passosQuinta = [
        { num: "01", titulo: "Aprovação do Plano Mestre", desc: "Revisão e validação final da estrutura de custos e do programa de intervenção." },
        { num: "02", titulo: "Constituição da Entidade Gestora", desc: "Formalização da IPSS Banda Visconde de Salreu e arranjo jurídico correspondente." },
        { num: "03", titulo: "Captação de Financiamento", desc: "Submissão de candidaturas PRR/Portugal 2030, IEFP e procura de mecenato." },
        { num: "04", titulo: "Início das Obras e Formação", desc: "Arranque do restauro estrutural e da escola de artes e ofícios." }
    ]

    const passosTorre = [
        { num: "01", titulo: "Aprovação do Plano Mestre", desc: "Revisão e validação final da estrutura de custos e do programa de intervenção." },
        { num: "02", titulo: "Constituição da Entidade Gestora", desc: "Formalização da associação APHC e arranjo jurídico correspondente." },
        { num: "03", titulo: "Captação de Financiamento", desc: "Submissão de candidaturas PRR/Portugal 2030 e fundos europeus para montado e património." },
        { num: "04", titulo: "Início das Obras e Formação", desc: "Arranque da consolidação estrutural e da formação em ofícios alentejanos e corticeiros." }
    ]

    const passosDetails = project === "torre" ? passosTorre : passosQuinta

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const smoothedProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    return (
        <div className="w-full font-sans">
            <div ref={containerRef} className="relative py-8">
                {/* Linha de Fundo - Tracker */}
                <div className="absolute left-[30px] sm:left-[38px] top-8 bottom-8 w-[1px] bg-white/10" />
                
                {/* Linha Animada */}
                <motion.div 
                    className="absolute left-[30px] sm:left-[38px] top-8 bottom-8 w-[1px] bg-heritage-terracotta origin-top"
                    style={{ scaleY: smoothedProgress }}
                />
                
                {/* Ponto Animado Sequencial */}
                <motion.div
                    className="absolute left-[26px] sm:left-[34px] w-[9px] h-[9px] rounded-full bg-heritage-terracotta z-10 ring-[6px] ring-heritage-navy dark:ring-zinc-950"
                    style={{ 
                        top: useTransform(smoothedProgress, [0, 1], ["2rem", "calc(100% - 2rem)"]) 
                    }}
                />

                <div className="space-y-16">
                    {passosDetails.map((passo, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative flex gap-6 sm:gap-10 pl-16 sm:pl-20 items-start"
                        >
                            {/* Bolinha Estática */}
                            <div className="absolute left-[28px] sm:left-[36px] top-2.5 w-[5px] h-[5px] rounded-full bg-white/20" />

                            <div className="font-serif text-3xl font-bold text-heritage-terracotta shrink-0 pt-0.5 sm:pt-0 w-12 border-b border-white/10 pb-4">
                                {passo.num}
                            </div>
                            
                            <div className="pt-1.5 pb-6 border-b border-white/10 w-full">
                                <h4 className="font-serif text-3xl mb-3 text-white tracking-tight">{passo.titulo}</h4>
                                <p className="text-sm font-medium text-white/60 leading-relaxed max-w-lg">
                                    {passo.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* Elemento de Conclusão */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative flex gap-6 sm:gap-10 pl-16 sm:pl-20 items-center justify-start opacity-50 pt-8"
                    >
                        <div className="absolute left-[22px] sm:left-[30px] w-[17px] h-[17px] rounded-full border-2 border-white/20 bg-heritage-navy dark:bg-zinc-950 flex items-center justify-center z-10">
                            <LucideArrowDown className="w-2.5 h-2.5 text-white/50" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
