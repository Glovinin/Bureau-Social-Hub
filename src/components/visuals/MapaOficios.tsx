interface MapaOficiosProps {
    project?: "quinta" | "torre"
}

export default function MapaOficios({ project }: MapaOficiosProps) {
    const oficiosQuinta = [
        "Culinária Tradicional", "Pão Artesanal", "Vinho e Azeite", "Doceiro",
        "Jardineiro Histórico", "Viveirista", "Agricultor Biológico", "Apicultor",
        "Músico", "Rendeira", "Decorador", "Oleiro", "Tecelão", "Tanoeiro",
        "Pedreiro", "Carpinteiro", "Estucador", "Calceteiro"
    ]

    const oficiosTorre = [
        "Pedreiro de Cantaria", "Mestre de Taipa", "Mestre de Adobe", "Carpinteiro",
        "Pintor de Cal", "Calceteiro", "Corticeiro", "Azulejista",
        "Ferreiro", "Oleiro", "Pastor/Monteiro", "Apicultor"
    ]

    const oficios = project === "torre" ? oficiosTorre : oficiosQuinta
    const titulo = project === "torre" ? "Tradição Mediterrânica" : "Tradição Litorânea"
    const subtitulo = project === "torre" ? "Ofícios do Alentejo" : "Ofícios da Ria de Aveiro"

    return (
        <div className="w-full">
            <div className="p-8 lg:p-12">
                <div className="mb-10">
                    <span className="inline-block border border-heritage-terracotta text-heritage-terracotta px-3 py-1 uppercase tracking-widest text-[9px] font-black mb-4">{subtitulo}</span>
                    <h4 className="font-serif text-4xl text-heritage-navy dark:text-white">{titulo}</h4>
                </div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {oficios.map((o, i) => (
                        <li key={i} className="flex items-baseline gap-3 border-b border-heritage-navy/5 dark:border-white/5 pb-2">
                            <span className="text-[9px] font-bold text-heritage-terracotta block w-4 flex-shrink-0">{i + 1}.</span>
                            <span className="text-sm font-serif text-heritage-navy/80 dark:text-white/80">{o}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
