import { motion } from "framer-motion"
import { LucideFileText, LucideSearch, LucideGraduationCap, LucideHammer, LucideGlobe } from "lucide-react"

export default function ProcessoOperacional() {
    const fases = [
        {
            fase: "Fase 1",
            nome: "Constituição",
            periodo: "1º Semestre 2026",
            icon: LucideFileText,
            color: "heritage-terracotta",
            tasks: ["Aprovação de Estatutos", "Assembleia Constitutiva", "Termo de Cooperação IPNS", "Contrato de Arrendamento"]
        },
        {
            fase: "Fase 2",
            nome: "Diagnóstico",
            periodo: "2º Semestre 2026",
            icon: LucideSearch,
            color: "heritage-ocean",
            tasks: ["Levantamento Técnico", "Plano de Intervenção", "Candidaturas (LIFE/FSE+)", "Mapeamento de Ofícios"]
        },
        {
            fase: "Fase 3",
            nome: "Captação & Formação",
            periodo: "2027",
            icon: LucideGraduationCap,
            color: "heritage-gold",
            tasks: ["Recrutamento de Mestres", "Seleção de Aprendizes", "Módulos Teórico-Práticos", "Certificações Iniciais"]
        },
        {
            fase: "Fase 4",
            nome: "Execução & Restauro",
            periodo: "2027-2028",
            icon: LucideHammer,
            color: "zinc-900",
            tasks: ["Obras de Consolidação", "Trabalhos de Restauro", "Monitorização Técnica", "Início Produção Agrícola"]
        },
        {
            fase: "Fase 5",
            nome: "Operação & ESG",
            periodo: "2028+",
            icon: LucideGlobe,
            color: "heritage-success",
            tasks: ["Abertura ao Público", "Roteiros Turísticos", "Atividade Comercial", "Relatórios de Sustentabilidade"]
        }
    ]

    return (
        <div className="relative p-10 bg-heritage-sand/5 dark:bg-white/5 rounded-[40px] border border-heritage-navy/5 overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-heritage-terracotta/5 blur-[80px]" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-heritage-ocean/5 blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-stretch h-full">
                {fases.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-1 flex flex-col group"
                    >
                        {/* Header da Fase */}
                        <div className="mb-6 flex flex-col items-center md:items-start text-center md:text-left">
                            <div className={`w-14 h-14 rounded-2xl bg-${f.color} flex items-center justify-center shadow-lg shadow-${f.color}/10 mb-4 transition-transform group-hover:scale-110 duration-500`}>
                                <f.icon className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-heritage-navy/40 dark:text-white/30 mb-1">{f.periodo}</span>
                            <h5 className="text-sm font-black text-heritage-navy dark:text-white leading-tight uppercase tracking-widest">{f.nome}</h5>
                        </div>

                        {/* Card de Tarefas */}
                        <div className="flex-1 p-6 bg-white/40 dark:bg-white/5 rounded-3xl border border-heritage-navy/5 backdrop-blur-sm hover:border-heritage-navy/20 dark:hover:border-white/20 transition-all duration-500">
                            <ul className="space-y-4">
                                {f.tasks.map((task, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-${f.color} mt-1.5 flex-shrink-0`} />
                                        <span className="text-[11px] font-bold text-heritage-navy/70 dark:text-white/50 leading-tight">{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Seta de conexão (somente entre fases) */}
                        {i < fases.length - 1 && (
                            <div className="hidden md:flex absolute top-1/2 -right-4 translate-x-1/2 z-20">
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-heritage-navy/5 flex items-center justify-center shadow-md"
                                >
                                    <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-heritage-navy/20 dark:border-white/20 rotate-45 ml-[-2px]" />
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
