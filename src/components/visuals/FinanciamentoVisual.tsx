import { motion } from "framer-motion"
import { LucideBuilding2, LucideEuro, LucideStar, LucideTrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FinanciamentoVisual() {
    const fontes = [
        {
            categoria: "União Europeia",
            total: "€750.000",
            icon: LucideBuilding2,
            color: "ocean",
            items: [
                { nome: "LIFE (Biodiversidade/Património)", valor: "€300k" },
                { nome: "FEADER (Agrícola/PDR)", valor: "€300k" },
                { nome: "FSE+ (Formação Social)", valor: "€150k" }
            ]
        },
        {
            categoria: "Portugal",
            total: "€200.000",
            icon: LucideTrendingUp,
            color: "terracotta",
            items: [
                { nome: "Turismo de Portugal", valor: "€150k" },
                { nome: "Autarquias Locais", valor: "€50k" }
            ]
        },
        {
            categoria: "Privado",
            total: "€360.000",
            icon: LucideStar,
            color: "gold",
            items: [
                { nome: "Mecenato Cultural", valor: "€80k" },
                { nome: "Fundos Próprios Família", valor: "€280k" }
            ]
        }
    ]

    return (
        <div className="p-8 bg-heritage-sand/5 dark:bg-zinc-900 rounded-[40px] border border-heritage-navy/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-heritage-ocean via-heritage-terracotta to-heritage-gold opacity-50" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {fontes.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center text-center space-y-6 p-6 bg-white/50 dark:bg-white/5 rounded-3xl border border-heritage-navy/5"
                    >
                        <div className={`w-16 h-16 rounded-2xl bg-heritage-${f.color}/10 flex items-center justify-center`}>
                            <f.icon className={`w-8 h-8 text-heritage-${f.color}`} />
                        </div>

                        <div>
                            <h4 className="font-black text-heritage-navy dark:text-white uppercase text-[10px] tracking-widest mb-1">{f.categoria}</h4>
                            <p className={`text-3xl font-black text-heritage-${f.color}`}>{f.total}</p>
                        </div>

                        <div className="space-y-2 w-full">
                            {f.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2 bg-white dark:bg-zinc-900 rounded-xl border border-heritage-navy/5">
                                    <span className="text-[10px] font-bold text-heritage-navy/60 dark:text-white/40">{item.nome}</span>
                                    <Badge variant="outline" className="text-[10px] font-black border-heritage-navy/10">{item.valor}</Badge>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 p-6 bg-heritage-navy text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <LucideEuro className="w-6 h-6 text-heritage-gold" />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Investimento Total Captado</p>
                        <p className="text-2xl font-black text-heritage-gold">€1.310.000</p>
                    </div>
                </div>
                <div className="h-px md:h-12 w-full md:w-px bg-white/10" />
                <p className="text-xs text-white/60 max-w-md text-center md:text-left">
                    Arquitetura financeira baseada em <strong>Sinergia Integrada</strong>, permitindo o acesso a fundos de maior escala e otimização de custos operacionais em 15%.
                </p>
            </div>
        </div>
    )
}
