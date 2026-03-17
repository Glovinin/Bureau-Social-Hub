import { useState, useMemo, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { LucideSearch, LucideLock, LucideArrowDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { filterDocuments, categoryLabels, type Document } from "@/lib/documentsData"
import { useAuth } from "@/context/AuthContext"
import { Grain } from "@/components/ui/Grain"

const categories = ['todos', 'institucional', 'programa', 'financeiro', 'politica'] as const

export default function Docs() {
    const [activeCategory, setActiveCategory] = useState<string>('todos')
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { profile } = useAuth()

    const handleCategoryChange = (cat: string) => {
        setIsLoading(true)
        setActiveCategory(cat)
        setTimeout(() => setIsLoading(false), 500)
    }

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    const filteredDocs = useMemo(() => {
        return filterDocuments(activeCategory, searchTerm, profile?.role)
    }, [activeCategory, searchTerm, profile?.role])

    const handleDownload = (doc: Document) => {
        toast.success("Documento Localizado", {
            description: `Abrindo ${doc.title} em nova aba...`,
            duration: 2000,
        })
        window.open(doc.path, '_blank')
    }

    return (
        <div className="flex flex-col w-full bg-[#f8f6f0] dark:bg-zinc-950 min-h-screen relative overflow-hidden font-sans">
            <Grain opacity={0.05} />
            
            {/* Masthead Header */}
            <section className="pt-48 pb-20 px-6 border-b border-heritage-navy/20 dark:border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div className="space-y-6 max-w-3xl">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta block border-l-2 border-heritage-terracotta pl-4 ml-1">
                                Registro Público & Institucional
                            </span>
                            <h1 className="text-6xl md:text-8xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.9] tracking-tighter">
                                Central de <br />
                                <span className="italic">Transparência</span>.
                            </h1>
                        </div>
                        <div className="md:text-right space-y-2">
                            <p className="text-xs font-black uppercase tracking-widest text-heritage-navy dark:text-white">Volume III</p>
                            <p className="text-[10px] font-medium text-heritage-navy/40 dark:text-white/40 uppercase tracking-widest">Edição de Março 2026</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-heritage-navy/10 dark:border-white/10 pt-10">
                        <div className="md:col-span-8">
                            <p className="text-xl md:text-2xl text-heritage-navy/60 dark:text-white/50 font-serif leading-relaxed italic">
                                "O direito à informação é o pilar de uma associação forte. Aqui residem as atas, os mapas financeiros e os estatutos que regem a nossa casa comum."
                            </p>
                        </div>
                        <div className="md:col-span-4 flex md:justify-end items-center">
                            {!profile && (
                                <div className="p-4 bg-heritage-navy/5 dark:bg-white/5 border border-heritage-navy/10 dark:border-white/10 text-[9px] font-black uppercase tracking-widest text-heritage-navy/60 dark:text-white/40 max-w-[200px]">
                                    Aviso: Alguns documentos requerem credenciais de associado.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Bar - Newspaper Section Header style */}
            <section className="sticky top-20 z-40 bg-[#f8f6f0]/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-heritage-navy dark:border-white py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex gap-4 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap px-4 py-2 transition-colors ${
                                    activeCategory === cat 
                                    ? "text-heritage-terracotta border-b-2 border-heritage-terracotta" 
                                    : "text-heritage-navy/40 dark:text-white/30 hover:text-heritage-navy dark:hover:text-white"
                                }`}
                            >
                                {categoryLabels[cat]}
                            </button>
                        ))}
                    </div>
                    
                    <div className="relative w-full md:w-80 group">
                        <LucideSearch className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-navy/30 dark:text-white/20" />
                        <input
                            placeholder="PESQUISAR ARQUIVO..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-none pl-8 pr-4 py-2 text-[10px] font-black uppercase tracking-widest focus:outline-none text-heritage-navy dark:text-white placeholder:text-heritage-navy/20 dark:placeholder:text-white/10"
                        />
                    </div>
                </div>
            </section>

            {/* Document List - Table Layout */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Table Headers */}
                    <div className="hidden md:grid grid-cols-12 gap-8 px-6 pb-6 border-b-2 border-heritage-navy/10 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-heritage-navy/30 dark:text-white/20">
                        <div className="col-span-1">Ref</div>
                        <div className="col-span-5">Título do Documento</div>
                        <div className="col-span-2">Categoria</div>
                        <div className="col-span-2">Data Registro</div>
                        <div className="col-span-2 text-right">Ação</div>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="divide-y divide-heritage-navy/10 dark:divide-white/5">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="py-8 grid grid-cols-12 gap-8 px-6">
                                        <div className="col-span-1"><Skeleton className="h-4 w-8" /></div>
                                        <div className="col-span-5"><Skeleton className="h-6 w-3/4" /></div>
                                        <div className="col-span-2"><Skeleton className="h-4 w-20" /></div>
                                        <div className="col-span-4"><Skeleton className="h-4 w-24 ml-auto" /></div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : filteredDocs.length === 0 ? (
                            <div className="py-40 text-center border-b border-heritage-navy/10 dark:border-white/5">
                                <p className="font-serif italic text-2xl text-heritage-navy/20 dark:text-white/10">Nenhum registro localizado no arquivo.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-heritage-navy/10 dark:divide-white/5">
                                {filteredDocs.map((doc, idx) => (
                                    <motion.div
                                        key={doc.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="py-10 group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 px-6 items-center hover:bg-heritage-navy/[0.02] dark:hover:bg-white/[0.01] transition-colors relative h-full"
                                    >
                                        <div className="col-span-1 text-[10px] font-black text-heritage-navy/20 dark:text-white/10">
                                            0{idx + 1}
                                        </div>
                                        
                                        <div className="col-span-1 md:col-span-5 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl md:text-2xl font-serif font-medium text-heritage-navy dark:text-white group-hover:text-heritage-terracotta transition-colors">
                                                    {doc.title}
                                                </h3>
                                                {doc.restricted && (
                                                    <LucideLock className="w-3.5 h-3.5 text-heritage-terracotta/60" />
                                                )}
                                            </div>
                                            <p className="text-xs text-heritage-navy/40 dark:text-white/30 font-medium max-w-sm line-clamp-1">
                                                {doc.description || "Sem descrição adicional disponível no índice."}
                                            </p>
                                        </div>

                                        <div className="col-span-1 md:col-span-2">
                                            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 border border-heritage-navy/10 dark:border-white/10 text-heritage-navy/60 dark:text-white/40">
                                                {categoryLabels[doc.category]}
                                            </span>
                                        </div>

                                        <div className="col-span-1 md:col-span-2 text-[10px] font-black uppercase tracking-[0.2em] text-heritage-navy/40 dark:text-white/20">
                                            {doc.date}
                                        </div>

                                        <div className="col-span-1 md:col-span-2 flex justify-end">
                                            <button
                                                onClick={() => handleDownload(doc)}
                                                className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-heritage-navy dark:text-white hover:text-heritage-terracotta transition-colors group/btn"
                                            >
                                                <span>Visualizar</span>
                                                <LucideArrowDown className="w-3.5 h-3.5 -rotate-45 group-hover/btn:rotate-0 transition-transform" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Footer Archive Note */}
            <section className="py-20 px-6 border-t border-heritage-navy/10 dark:border-white/10 opacity-30">
                <div className="max-w-7xl mx-auto text-center space-y-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-heritage-navy dark:text-white">Fim do Registro Atual</p>
                    <div className="flex justify-center gap-8 text-[8px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">
                        <span>Bureau Social Digital Archiving</span>
                        <span>© 2026</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
