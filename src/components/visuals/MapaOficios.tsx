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
        <div className="w-full">
            <div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10">
                    
                    {/* Norte e Centro */}
                    <div className="p-8 lg:p-12">
                        <div className="mb-10">
                            <span className="inline-block border border-heritage-terracotta text-heritage-terracotta px-3 py-1 uppercase tracking-widest text-[9px] font-black mb-4">Norte e Centro (Salreu)</span>
                            <h4 className="font-serif text-4xl text-heritage-navy dark:text-white">Tradição Litorânea</h4>
                        </div>
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                            {oficiosNorte.map((o, i) => (
                                <li key={i} className="flex items-baseline gap-3 border-b border-heritage-navy/5 dark:border-white/5 pb-2">
                                    <span className="text-[9px] font-bold text-heritage-terracotta block w-4 flex-shrink-0">{i + 1}.</span>
                                    <span className="text-sm font-serif text-heritage-navy/80 dark:text-white/80">{o}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Alentejo */}
                    <div className="p-8 lg:p-12">
                        <div className="mb-10">
                            <span className="inline-block border border-heritage-ocean text-heritage-ocean px-3 py-1 uppercase tracking-widest text-[9px] font-black mb-4">Alentejo (Escoural)</span>
                            <h4 className="font-serif text-4xl text-heritage-navy dark:text-white">Tradição Mediterrânica</h4>
                        </div>
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                            {oficiosSul.map((o, i) => (
                                <li key={i} className="flex items-baseline gap-3 border-b border-heritage-navy/5 dark:border-white/5 pb-2">
                                    <span className="text-[9px] font-bold text-heritage-ocean block w-4 flex-shrink-0">{i + 1}.</span>
                                    <span className="text-sm font-serif text-heritage-navy/80 dark:text-white/80">{o}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Intercâmbio */}
            <div className="flex justify-center p-8 lg:p-12">
                <div className="max-w-2xl text-center">
                    <strong className="font-sans text-heritage-gold uppercase tracking-[0.2em] text-[10px] block mb-4">Intercâmbio de Saberes Norte-Sul</strong>
                    <p className="font-serif text-lg leading-relaxed text-heritage-navy/70 dark:text-white/70">
                        Os formandos de Estarreja participarão em módulos de <span className="text-heritage-navy dark:text-white italic">Taipa e Adobe</span> no Alentejo, 
                        enquanto os aprendizes do Carvalhal viajarão para o Norte para dominar o <span className="text-heritage-navy dark:text-white italic">Estuque Ornamental e Azulejaria</span>. 
                        Esta sinergia garante a preservação da marca comum <span className="italic text-heritage-navy dark:text-white">"Património Visconde de Salreu"</span>.
                    </p>
                </div>
            </div>
        </div>
    )
}
