import { Link } from "react-router-dom"
import { LucideArrowUpRight } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#f8f6f0] dark:bg-zinc-950 border-t border-heritage-navy/10 dark:border-white/10 transition-colors pt-16 sm:pt-24 font-sans relative overflow-hidden">
            {/* Ambient Editorial Paper Texture (Subtle) */}
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none -z-10 opacity-30 dark:opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
                {/* Top Section / Massive Branding */}
                <div className="border-b border-heritage-navy/10 dark:border-white/10 pb-12 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold text-heritage-terracotta uppercase tracking-[0.3em]">O Diário do Impacto</span>
                        </div>
                        <Link to="/">
                            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-heritage-navy dark:text-white tracking-tighter hover:text-heritage-terracotta transition-colors duration-500">
                                Bureau Social.
                            </h2>
                        </Link>
                    </div>
                    
                    <p className="text-xl font-serif italic text-heritage-navy/70 dark:text-white/70 max-w-sm sm:text-right leading-relaxed">
                        Reabilitando o passado,<br />
                        <span className="text-heritage-navy dark:text-white">Construindo o futuro humano.</span>
                    </p>
                </div>

                {/* Newspaper Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10 mb-16">
                    
                    {/* Index / Sections */}
                    <div className="md:col-span-3 pr-8 flex flex-col border-b md:border-b-0 border-heritage-navy/10 dark:border-white/10 pb-8 md:pb-0">
                        <h4 className="font-semibold text-heritage-navy dark:text-white uppercase tracking-[0.25em] text-[10px] mb-8 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-heritage-navy dark:bg-white"></div>
                            Índice Editorial
                        </h4>
                        <ul className="space-y-4 text-heritage-navy/80 dark:text-white/80 font-medium">
                            <li><Link to="/about" className="hover:text-heritage-terracotta transition-colors flex items-center justify-between group text-lg">A Associação <LucideArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li className="w-full h-px bg-heritage-navy/5 dark:bg-white/5"></li>
                            <li><Link to="/project" className="hover:text-heritage-terracotta transition-colors flex items-center justify-between group text-lg">Projecto Moradia <LucideArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li className="w-full h-px bg-heritage-navy/5 dark:bg-white/5"></li>
                            <li><Link to="/traditions" className="hover:text-heritage-terracotta transition-colors flex items-center justify-between group text-lg">Tradições Vivas <LucideArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="md:col-span-3 md:px-8 flex flex-col border-b md:border-b-0 border-heritage-navy/10 dark:border-white/10 pb-8 md:pb-0">
                        <h4 className="font-semibold text-heritage-navy dark:text-white uppercase tracking-[0.25em] text-[10px] mb-8 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-heritage-navy dark:bg-white"></div>
                            Documentos
                        </h4>
                        <ul className="space-y-4 text-heritage-navy/80 dark:text-white/80 font-medium">
                            <li><Link to="/docs" className="hover:text-heritage-terracotta transition-colors flex items-center justify-between group text-lg">Transparência <LucideArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li className="w-full h-px bg-heritage-navy/5 dark:bg-white/5"></li>
                            <li><Link to="/legal" className="hover:text-heritage-terracotta transition-colors flex items-center justify-between group text-lg">Política & Termos <LucideArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li className="w-full h-px bg-heritage-navy/5 dark:bg-white/5"></li>
                            <li><Link to="/help" className="hover:text-heritage-terracotta transition-colors flex items-center justify-between group text-lg">Contacto Directo <LucideArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div className="md:col-span-6 md:pl-8 flex flex-col justify-between">
                        <div>
                            <h4 className="font-semibold text-heritage-navy dark:text-white uppercase tracking-[0.25em] text-[10px] mb-8 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-heritage-navy dark:bg-white"></div>
                                Sede Editorial
                            </h4>
                            <address className="text-lg text-heritage-navy/70 dark:text-white/70 font-serif leading-relaxed not-italic mb-8">
                                Império dos Froios, s/n<br />
                                Centro Histórico — Lisboa, PT<br />
                                <a href="mailto:direcao@institutoipss.pt" className="hover:text-heritage-terracotta transition-colors not-italic mt-2 inline-block text-heritage-navy dark:text-white font-sans text-sm font-medium border-b border-heritage-navy/20 dark:border-white/20 pb-0.5">direcao@institutoipss.pt</a>
                            </address>
                        </div>
                        
                        <div className="pt-8 border-t border-heritage-navy/10 dark:border-white/10 flex gap-6">
                            {/* Updated social media links per recent rules: LinkedIn, Instagram, YouTube */}
                            <a href="#" className="text-xs font-bold uppercase tracking-widest text-heritage-navy dark:text-white hover:text-heritage-terracotta transition-colors">LinkedIn</a>
                            <span className="text-heritage-navy/20 dark:text-white/20">•</span>
                            <a href="#" className="text-xs font-bold uppercase tracking-widest text-heritage-navy dark:text-white hover:text-heritage-terracotta transition-colors">Instagram</a>
                            <span className="text-heritage-navy/20 dark:text-white/20">•</span>
                            <a href="#" className="text-xs font-bold uppercase tracking-widest text-heritage-navy dark:text-white hover:text-heritage-terracotta transition-colors">YouTube</a>
                        </div>
                    </div>

                </div>

                {/* Colophon & Copyright */}
                <div className="border-t-2 border-heritage-navy/20 dark:border-white/20 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-4">
                        <img src="/logo-symbol.png" alt="Logotipo Oficial" className="w-8 h-8 opacity-50 grayscale" />
                        <span className="text-[9px] font-bold text-heritage-navy/40 dark:text-white/40 uppercase tracking-[0.3em]">
                            © {new Date().getFullYear()} Inst. Português de Negócios Sociais
                        </span>
                    </div>
                    <span className="text-[9px] font-bold text-heritage-navy/30 dark:text-white/30 uppercase tracking-[0.3em]">
                        Edição Online Definitiva
                    </span>
                </div>
            </div>
        </footer>
    )
}
