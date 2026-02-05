import { motion } from "framer-motion"
import { LucideShield, LucideTrendingUp, LucideHome, LucideCastle, LucideCheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ModeloInstitucional() {
    return (
        <div className="relative p-8 bg-heritage-sand/10 dark:bg-white/5 rounded-[40px] border border-heritage-navy/5 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                {/* Proprietário */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-3xl bg-heritage-terracotta flex items-center justify-center shadow-xl shadow-heritage-terracotta/20">
                        <LucideShield className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                        <h4 className="font-black text-heritage-navy dark:text-white uppercase text-xs tracking-widest mb-1">Proprietário Comum</h4>
                        <p className="font-bold text-heritage-terracotta">Visconde de Salreu</p>
                    </div>
                    <div className="h-10 w-px bg-dashed-border" />
                </motion.div>

                {/* IPNS */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-[32px] bg-heritage-navy dark:bg-white flex items-center justify-center shadow-2xl">
                        <img src="/logo-bureau.svg" alt="IPNS" className="w-16 h-16 invert dark:invert-0" />
                    </div>
                    <div className="text-center">
                        <h4 className="font-black text-heritage-navy dark:text-white uppercase text-xs tracking-widest mb-1">IPNS - Bureau Social</h4>
                        <p className="font-bold text-heritage-navy/60 dark:text-white/40">Coordenador Estratégico</p>
                    </div>
                </motion.div>

                {/* Resultados */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-3xl bg-heritage-gold flex items-center justify-center shadow-xl shadow-heritage-gold/20">
                        <LucideTrendingUp className="w-10 h-10 text-heritage-navy" />
                    </div>
                    <div className="text-center">
                        <h4 className="font-black text-heritage-navy dark:text-white uppercase text-xs tracking-widest mb-1">Resultados</h4>
                        <p className="font-bold text-heritage-gold">Impacto Integrado</p>
                    </div>
                </motion.div>
            </div>

            {/* Projetos Norte e Sul */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 relative z-10">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-heritage-navy/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-heritage-terracotta/10 flex items-center justify-center">
                            <LucideHome className="w-5 h-5 text-heritage-terracotta" />
                        </div>
                        <h5 className="font-black text-heritage-navy dark:text-white uppercase text-xs tracking-widest">Projeto Norte</h5>
                    </div>
                    <h6 className="text-xl font-black text-heritage-navy dark:text-white mb-2">Quinta de Salreu</h6>
                    <Badge className="bg-heritage-sand/50 text-heritage-navy border-none mb-4">Associação Local: APQVS</Badge>
                    <ul className="space-y-2">
                        {["Solar Barroco", "Ofícios Norte", "Jardim Romântico"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-heritage-navy/60 dark:text-white/40">
                                <LucideCheckCircle2 className="w-4 h-4 text-heritage-success" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-heritage-navy/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-heritage-ocean/10 flex items-center justify-center">
                            <LucideCastle className="w-5 h-5 text-heritage-ocean" />
                        </div>
                        <h5 className="font-black text-heritage-navy dark:text-white uppercase text-xs tracking-widest">Projeto Sul</h5>
                    </div>
                    <h6 className="text-xl font-black text-heritage-navy dark:text-white mb-2">Torre do Carvalhal</h6>
                    <Badge className="bg-heritage-sand/50 text-heritage-navy border-none mb-4">Associação Local: APHC</Badge>
                    <ul className="space-y-2">
                        {["Torre Manuelina", "Ofícios Alentejo", "Montado & Natura"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-heritage-navy/60 dark:text-white/40">
                                <LucideCheckCircle2 className="w-4 h-4 text-heritage-success" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Background elements (Decorative lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                <path d="M 16% 100 L 16% 250 M 84% 100 L 84% 250" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-heritage-navy" />
                <path d="M 50% 200 L 25% 300 M 50% 200 L 75% 300" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-heritage-navy" />
            </svg>
        </div>
    )
}
