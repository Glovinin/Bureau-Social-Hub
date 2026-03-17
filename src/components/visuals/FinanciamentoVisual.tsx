import { motion } from "framer-motion"
import { LucideBuilding2, LucideStar, LucideTrendingUp } from "lucide-react"
import AnimatedCounter from "@/components/ui/AnimatedCounter"

const formatEuro = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

interface FinanciamentoVisualProps {
    project?: "quinta" | "torre"
}

export default function FinanciamentoVisual({ project }: FinanciamentoVisualProps) {
    const totalQuinta = 1500000
    const totalTorre = 1200000
    const totalValue = project === "torre" ? totalTorre : totalQuinta

    const fontes = [
        {
            categoria: "União Europeia",
            totalValue: 750000,
            icon: LucideBuilding2,
            items: [
                { nome: "PRR (Reabilitação)", valor: "€450k" },
                { nome: "Portugal 2030", valor: "€200k" },
                { nome: "LIFE (Biodiversidade)", valor: "€300k" },
                { nome: "FEADER (Agrícola)", valor: "€300k" },
                { nome: "FSE+ (Formação)", valor: "€150k" }
            ]
        },
        {
            categoria: "Portugal",
            totalValue: 450000,
            icon: LucideTrendingUp,
            items: [
                { nome: "IEFP (Formação)", valor: "€250k" },
                { nome: "Turismo de Portugal", valor: "€150k" },
                { nome: "Apoio Municipal", valor: "€50k" }
            ]
        },
        {
            categoria: "Privado",
            totalValue: 360000,
            icon: LucideStar,
            items: [
                { nome: "Mecenato Cultural", valor: "€80k" },
                { nome: "Fundos Próprios Família", valor: "€280k" }
            ]
        }
    ]

    return (
        <div className="w-full">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-heritage-navy/20 dark:border-white/20 pb-6 gap-6">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-navy/50 dark:text-white/50">Investimento Total Captado</span>
                    <h4 className="font-serif text-5xl md:text-6xl tracking-tighter text-heritage-navy dark:text-white leading-none">
                        <AnimatedCounter to={totalValue} prefix="€" format={formatEuro} duration={2} />
                    </h4>
                </div>
                <p className="text-sm text-heritage-navy/60 dark:text-white/60 max-w-sm md:text-right leading-relaxed">
                    Arquitetura financeira diversificada em PRR, Portugal 2030, IEFP e fundos europeus, compatível com património, formação e território.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-y border-heritage-navy/20 dark:border-white/20 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/20 dark:divide-white/20 bg-white dark:bg-zinc-950">
                {fontes.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 md:p-12 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <f.icon className="w-5 h-5 text-heritage-navy/40 dark:text-white/40" />
                                <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-heritage-navy/50 dark:text-white/50">{f.categoria}</h4>
                            </div>
                            <p className="text-4xl md:text-5xl font-serif text-heritage-navy dark:text-white mb-10 tracking-tight">
                                <AnimatedCounter to={f.totalValue} prefix="€" format={formatEuro} duration={1.5} />
                            </p>
                        </div>

                        <div className="border-t border-heritage-navy/10 dark:border-white/10 pt-6 space-y-4">
                            {f.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center group">
                                    <span className="text-xs font-medium text-heritage-navy/70 dark:text-white/70 group-hover:text-heritage-navy dark:group-hover:text-white transition-colors">{item.nome}</span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 border border-heritage-navy/20 dark:border-white/20 text-heritage-navy/80 dark:text-white/80">{item.valor}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
