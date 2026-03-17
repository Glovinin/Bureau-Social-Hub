import { motion } from "framer-motion"
import { LucideShield, LucideTrendingUp, LucideHome, LucideCastle } from "lucide-react"

interface ModeloInstitucionalProps {
    project?: "quinta" | "torre"
}

export default function ModeloInstitucional({ project }: ModeloInstitucionalProps) {
    const quintaContent = {
        titulo: "Quinta do Visconde de Salreu",
        associacao: "IPSS Banda Visconde de Salreu",
        itens: ["Solar Barroco", "Jardim Romântico", "Culinária & Artes", "Sistema Hídrico por Gravidade"]
    }

    const torreContent = {
        titulo: "Torre do Carvalhal",
        associacao: "Associação APHC",
        itens: ["Torre Manuelina", "Ermida com Azulejaria séc. XVI", "Montado & Cortiça", "Turismo de Natureza"]
    }

    const content = project === "torre" ? torreContent : quintaContent
    const Icon = project === "torre" ? LucideCastle : LucideHome

    return (
        <div className="w-full">
            <div className="border-t border-heritage-navy/20 dark:border-white/20 pt-12 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10">
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6 p-8 text-center">
                        <div className="w-16 h-16 border border-heritage-terracotta flex items-center justify-center rounded-full bg-heritage-terracotta/5">
                            <LucideShield className="w-6 h-6 text-heritage-terracotta" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h4 className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-heritage-navy/40 dark:text-white/40 mb-2">Proprietário</h4>
                            <p className="font-serif text-2xl text-heritage-terracotta italic mb-2">{project === "torre" ? "DOVA" : "Família Visconde de Salreu"}</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col items-center gap-6 p-8 text-center relative group">
                        <div className="w-16 h-16 border border-heritage-terracotta flex items-center justify-center rounded-full bg-heritage-terracotta/5 transition-transform group-hover:scale-105">
                            <img src="/logo-symbol.png" alt="Bureau Social - IPNS" className="w-9 h-9 sm:w-10 sm:h-10 object-contain [filter:brightness(0)_saturate(100%)_invert(48%)_sepia(79%)_saturate(500%)_hue-rotate(350deg)_brightness(95%)_contrast(90%)]" />
                        </div>
                        <div>
                            <h4 className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-heritage-navy/40 dark:text-white/40 mb-2">Coordenador Estratégico</h4>
                            <p className="font-serif text-2xl text-heritage-terracotta italic mb-2">IPNS - Bureau Social</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-6 p-8 text-center">
                        <div className="w-16 h-16 border border-heritage-terracotta flex items-center justify-center rounded-full bg-heritage-terracotta/5">
                            <LucideTrendingUp className="w-6 h-6 text-heritage-terracotta" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h4 className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-heritage-navy/40 dark:text-white/40 mb-2">Resultados</h4>
                            <p className="font-serif text-2xl text-heritage-terracotta italic mb-2">Impacto Integrado</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Projeto em foco — apenas o selecionado */}
            <div className="border-t border-heritage-navy/20 dark:border-white/20">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <Icon className="w-5 h-5 text-heritage-terracotta" strokeWidth={1.5} />
                        <h5 className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-heritage-terracotta">
                            {project === "torre" ? "Projeto Alentejo" : "Projeto Estarreja"}
                        </h5>
                    </div>
                    <h6 className="font-serif text-3xl text-heritage-navy dark:text-white mb-2">{content.titulo}</h6>
                    <span className="inline-block border border-heritage-navy/20 dark:border-white/20 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-heritage-navy/60 dark:text-white/60 mb-8 rounded-full">
                        {content.associacao}
                    </span>
                    <ul className="space-y-4">
                        {content.itens.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-serif text-heritage-navy/80 dark:text-white/80 border-b border-heritage-navy/5 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
            <div className="border-t border-heritage-navy/20 dark:border-white/20 h-4" />
        </div>
    )
}
