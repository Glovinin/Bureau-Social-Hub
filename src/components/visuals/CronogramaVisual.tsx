import { motion } from "framer-motion"
import { LucideCalendarClock, LucideCheckCircle2, LucideTarget } from "lucide-react"

export default function CronogramaVisual() {
    const etapas = [
        {
            fase: "I",
            ano: "2026",
            label: "Arranque & Governança",
            desc: "Constituição das Associações (APQVS/APHC), Termos de Cooperação com IPNS e Candidaturas UE.",
            color: "terracotta"
        },
        {
            fase: "II",
            ano: "2027",
            label: "Escola de Ofícios",
            desc: "Recrutamento de Mestres, Início da Formação e Estabilização Estrutural dos Edifícios.",
            color: "ocean"
        },
        {
            fase: "III",
            ano: "2028",
            label: "Restauro & Produção",
            desc: "Execução intensiva dos trabalhos de restauro com participação dos aprendizes e início da produção agrícola.",
            color: "gold"
        },
        {
            fase: "IV",
            ano: "2029",
            label: "Abertura & Impacto",
            desc: "Operação total, abertura ao público, turismo cultural e relatórios de sustentabilidade (ESG).",
            color: "success"
        }
    ]

    return (
        <div className="p-10 bg-heritage-sand/5 dark:bg-white/5 rounded-[40px] border border-heritage-navy/5 relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <LucideCalendarClock className="w-32 h-32 text-heritage-navy dark:text-white" />
            </div>

            <div className="relative z-10 space-y-12">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-heritage-terracotta rounded-full" />
                    <h4 className="text-xl font-black text-heritage-navy dark:text-white uppercase tracking-tight">Linha do Tempo Integrada (42 Meses)</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Linha de conexão horizontal */}
                    <div className="absolute top-6 left-0 w-full h-px bg-dashed-border opacity-20 hidden md:block" />

                    {etapas.map((e, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative flex flex-col items-center md:items-start text-center md:text-left space-y-4"
                        >
                            <div className={`w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border-4 border-heritage-${e.color} flex items-center justify-center font-black text-lg shadow-lg relative z-10`}>
                                {e.fase}
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-1">
                                    <span className="text-2xl font-black text-heritage-navy dark:text-white">{e.ano}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest text-heritage-${e.color}`}>{e.label}</span>
                                </div>
                                <p className="text-[11px] text-heritage-navy/60 dark:text-white/40 leading-relaxed font-medium">
                                    {e.desc}
                                </p>
                            </div>

                            {i === etapas.length - 1 && (
                                <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-heritage-success/10 text-heritage-success rounded-full">
                                    <LucideTarget className="w-3 h-3" />
                                    <span className="text-[10px] font-black uppercase">Meta Alcançada</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-heritage-navy/5 flex items-center gap-4 text-heritage-navy/40 dark:text-white/20 italic text-[11px]">
                <LucideCheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <p>O cronograma é partilhado entre os dois projetos para otimizar a movimentação de mestres artesãos e equipamentos de restauro.</p>
            </div>
        </div>
    )
}
