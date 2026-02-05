import { Badge } from "@/components/ui/badge"

export default function MapaOficios() {
    const oficiosNorte = [
        "Pedreiro de Cantaria", "Carpinteiro de Limpos", "Estucador", "Azulejista",
        "Ferreiro", "Oleiro", "Cesteiro", "Tecelão",
        "Bordadeira", "Jardineiro", "Viveirista", "Calceteiro"
    ]

    const oficiosSul = [
        "Pedreiro de Cantaria", "Mestre de Taipa", "Mestre de Adobe", "Abobadeiro",
        "Pintor de Cal", "Calceteiro", "Ferreiro", "Oleiro",
        "Pastor/Monteiro", "Apicultor", "Corticeiro", "Carpinteiro"
    ]

    return (
        <div className="grid md:grid-cols-2 gap-8 p-8 bg-heritage-navy text-white rounded-[40px] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-heritage-terracotta/20 blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-heritage-ocean/20 blur-[80px] -ml-32 -mb-32" />

            <div className="space-y-8 relative z-10">
                <div>
                    <Badge className="bg-white/10 text-white border-white/20 mb-4 px-4 py-1 uppercase tracking-widest text-[10px] font-black">Norte e Centro (Salreu)</Badge>
                    <h4 className="text-2xl font-black mb-6">Tradição Litorânea</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {oficiosNorte.map((o, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-[12px] font-bold flex items-center gap-2 hover:bg-white/10 transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta" />
                                {o}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-8 relative z-10">
                <div>
                    <Badge className="bg-white/10 text-white border-white/20 mb-4 px-4 py-1 uppercase tracking-widest text-[10px] font-black">Alentejo (Escoural)</Badge>
                    <h4 className="text-2xl font-black mb-6">Tradição Mediterrânica</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {oficiosSul.map((o, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-[12px] font-bold flex items-center gap-2 hover:bg-white/10 transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full bg-heritage-ocean" />
                                {o}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:col-span-2 mt-8 p-6 bg-white/5 rounded-3xl border border-white/10 text-center relative z-10">
                <p className="text-white/80 text-sm leading-relaxed">
                    <strong className="text-heritage-gold uppercase tracking-widest text-xs block mb-2">Intercâmbio de Saberes Norte-Sul</strong>
                    Os formandos de Estarreja participarão em módulos de <span className="text-heritage-ocean font-bold">Taipa e Adobe</span> no Alentejo,
                    enquanto os aprendizes do Carvalhal viajarão para o Norte para dominar o <span className="text-heritage-terracotta font-bold">Estuque Ornamental e Azulejaria</span>.
                    Esta sinergia garante a preservação da marca comum <span className="italic">"Património Visconde de Salreu"</span>.
                </p>
            </div>
        </div>
    )
}
