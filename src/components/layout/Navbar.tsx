import { Button } from "@/components/ui/button"
import Magnetic from "@/components/ui/Magnetic"
import { LucideMenu, LucideGlobe, LucideX, LucideChevronDown, LucideLayoutDashboard, LucideFiles, LucideVote, LucideCalendar, LucideUserCircle, LucideArrowUpRight } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "../ThemeToggle"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false)
    const navDropdownRef = useRef<HTMLDivElement>(null)
    const { session } = useAuth()

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navDropdownRef.current && !navDropdownRef.current.contains(e.target as Node)) {
                setIsNavDropdownOpen(false)
            }
        }
        if (isNavDropdownOpen) document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [isNavDropdownOpen])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
        setIsNavDropdownOpen(false)
    }, [location.pathname])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => { document.body.style.overflow = "auto" }
    }, [isMobileMenuOpen])

    const mainLinks = [
        { name: "A Associação", path: "/about" },
        { name: "Tradições", path: "/traditions" },
        { name: "Transparência", path: "/docs" },
        { name: "Assessoria", path: "/assessoria" },
    ]

    const dashboardLinks = [
        { name: "Painel Geral", path: "/dashboard", icon: LucideLayoutDashboard },
        { name: "Documentos", path: "/docs", icon: LucideFiles },
        { name: "Votação", path: "/voting", icon: LucideVote },
        { name: "Eventos", path: "/events", icon: LucideCalendar },
        { name: "Meus Dados", path: "/profile", icon: LucideUserCircle },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <>
            <nav className={cn(
                "fixed top-0 w-full z-50 transition-apple h-20 sm:h-24 flex items-center px-4 sm:px-8 md:px-12 font-sans border-b",
                scrolled || isMobileMenuOpen
                    ? "bg-[#f8f6f0]/95 dark:bg-zinc-950/95 backdrop-blur-md border-heritage-navy/10 dark:border-white/10 shadow-sm"
                    : "bg-transparent border-transparent"
            )}>
                <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
                    
                    {/* Brand / Logo Section */}
                    <div className="flex-1 flex items-center">
                        <Link to="/" className="flex items-center gap-3 relative z-[60] group">
                            <img src="/logo-symbol.png" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:rotate-6 transition-transform duration-500" />
                            <div className="flex flex-col">
                                <span className="text-heritage-navy dark:text-white font-serif font-medium text-xl sm:text-3xl tracking-tighter leading-none group-hover:text-heritage-terracotta transition-colors duration-500">Bureau Social.</span>
                                <span className="text-heritage-terracotta/90 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] mt-1">Sede de Lisboa</span>
                            </div>
                        </Link>
                    </div>

                    {/* Tablet: Menu dropdown (lg até xl) */}
                    <div className="hidden lg:flex xl:hidden items-center justify-center mx-12" ref={navDropdownRef}>
                        <div className="relative">
                            <button
                                onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}
                                className={cn(
                                    "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] py-2 transition-colors",
                                    isNavDropdownOpen ? "text-heritage-terracotta dark:text-white" : "text-heritage-navy/70 dark:text-white/70 hover:text-heritage-terracotta dark:hover:text-white"
                                )}
                            >
                                Menu
                                <LucideChevronDown className={cn("w-4 h-4 transition-transform", isNavDropdownOpen && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                                {isNavDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-1 py-2 min-w-[220px] bg-[#f8f6f0] dark:bg-zinc-950 border border-heritage-navy/10 dark:border-white/10 shadow-xl z-50"
                                    >
                                        {mainLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                onClick={() => setIsNavDropdownOpen(false)}
                                                className={cn(
                                                    "block px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors",
                                                    isActive(link.path) ? "text-heritage-terracotta dark:text-white bg-heritage-terracotta/5 dark:bg-white/5" : "text-heritage-navy/70 dark:text-white/70 hover:text-heritage-terracotta dark:hover:text-white hover:bg-heritage-navy/5 dark:hover:bg-white/5"
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Desktop: Links completos (xl+) */}
                    <div className="hidden xl:flex items-center justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.25em] text-heritage-navy/70 dark:text-white/70 mx-12">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "hover:text-heritage-terracotta dark:hover:text-white transition-colors relative py-2 whitespace-nowrap",
                                    isActive(link.path) && "text-heritage-terracotta dark:text-white"
                                )}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-px bg-heritage-terracotta dark:bg-white"
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ originX: 0 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions Desktop */}
                    <div className="hidden lg:flex items-center justify-end flex-1 gap-6">
                        <div className="flex items-center gap-4 border-r border-heritage-navy/10 dark:border-white/10 pr-6">
                            {false && <ThemeToggle />}
                            <div className="flex items-center gap-2 cursor-pointer hover:text-heritage-terracotta dark:hover:text-white transition-colors group text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-navy/70 dark:text-white/70">
                                <LucideGlobe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                <span>PT</span>
                            </div>
                            <Magnetic>
                                <motion.a
                                    href="https://donate.stripe.com/test_demo"
                                    target="_blank"
                                    className="text-heritage-terracotta hover:text-heritage-terracotta/80 transition-colors flex items-center gap-1.5 group text-[10px] font-bold uppercase tracking-[0.2em]"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta animate-pulse" />
                                    <span>Doar</span>
                                </motion.a>
                            </Magnetic>
                        </div>

                        {session ? (
                            <Magnetic>
                                <Link to="/dashboard">
                                    <Button variant="default" className="bg-heritage-navy dark:bg-white text-white dark:text-heritage-navy rounded-none px-6 h-10 font-bold text-[10px] uppercase tracking-[0.25em] transition-all hover:bg-heritage-terracotta dark:hover:bg-heritage-terracotta dark:hover:text-white border border-transparent">
                                        Portal Ativo
                                    </Button>
                                </Link>
                            </Magnetic>
                        ) : (
                            <Magnetic>
                                <Link to="/auth">
                                    <Button variant="outline" className="border-heritage-navy/20 dark:border-white/20 text-heritage-navy dark:text-white rounded-none px-6 h-10 font-bold text-[10px] uppercase tracking-[0.25em] transition-all hover:bg-heritage-terracotta hover:border-heritage-terracotta hover:text-white dark:hover:bg-heritage-terracotta dark:hover:border-heritage-terracotta dark:hover:text-white bg-transparent">
                                        Acesso Restrito
                                    </Button>
                                </Link>
                            </Magnetic>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex lg:hidden items-center gap-4 relative z-[60]">
                        {false && <ThemeToggle />}
                        <button
                            className="p-2 text-heritage-navy dark:text-white hover:text-heritage-terracotta transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <LucideX className="w-8 h-8" /> : <LucideMenu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Editorial Fullscreen Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[55] bg-[#f8f6f0] dark:bg-zinc-950 flex flex-col pt-24 sm:pt-32 px-4 sm:px-8 md:px-12 overflow-y-auto pb-10 font-sans"
                    >
                        {/* Botão Fechar - visível no menu mobile */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed top-8 right-4 sm:top-10 sm:right-8 z-[60] p-3 text-heritage-navy dark:text-white hover:text-heritage-terracotta hover:bg-heritage-navy/5 dark:hover:bg-white/5 rounded-full transition-colors"
                            aria-label="Fechar menu"
                        >
                            <LucideX className="w-8 h-8" />
                        </button>

                        {/* Branding - logo, nome e frase da empresa */}
                        <div className="max-w-[1400px] mx-auto w-full border-b border-heritage-navy/10 dark:border-white/10 pb-8 mb-8">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col sm:flex-row sm:items-end gap-6 group">
                                <div className="flex items-center gap-4">
                                    <img src="/logo-symbol.png" alt="Bureau Social" className="w-14 h-14 sm:w-16 sm:h-16 object-contain group-hover:rotate-6 transition-transform duration-500" />
                                    <div>
                                        <h2 className="font-serif text-4xl sm:text-5xl font-medium text-heritage-navy dark:text-white tracking-tighter group-hover:text-heritage-terracotta transition-colors duration-500">
                                            Bureau Social.
                                        </h2>
                                        <span className="text-[9px] font-bold text-heritage-terracotta/90 uppercase tracking-[0.3em] mt-1 block">Sede de Lisboa</span>
                                    </div>
                                </div>
                                <p className="text-lg sm:text-xl font-serif italic text-heritage-navy/70 dark:text-white/70 max-w-md leading-relaxed">
                                    Reabilitando o passado,<br />
                                    <span className="text-heritage-navy dark:text-white">Construindo o futuro humano.</span>
                                </p>
                            </Link>
                        </div>

                        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 mt-0">
                            
                            {/* Left Column: Index */}
                            <div className="lg:col-span-8 flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-heritage-terracotta mb-6 flex items-center gap-3 border-b border-heritage-navy/10 dark:border-white/10 pb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta"></div>
                                    Índice Principal
                                </span>
                                
                                <div className="flex flex-col">
                                    {mainLinks.map((link, i) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 + 0.1, duration: 0.5 }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={cn(
                                                    "py-5 sm:py-8 border-b border-heritage-navy/10 dark:border-white/10 flex items-center justify-between group",
                                                )}
                                            >
                                                <div className="flex items-start gap-4 sm:gap-6">
                                                    <span className="text-[10px] sm:text-xs font-bold font-sans text-heritage-navy/30 dark:text-white/30 uppercase tracking-[0.2em] mt-3">0{i + 1}</span>
                                                    <span className={cn(
                                                        "text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tighter transition-colors duration-500",
                                                        isActive(link.path) ? "text-heritage-terracotta" : "text-heritage-navy dark:text-white group-hover:text-heritage-terracotta"
                                                    )}>
                                                        {link.name}
                                                    </span>
                                                </div>
                                                <LucideArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 opacity-0 group-hover:opacity-100 transition-all duration-500 text-heritage-terracotta -rotate-45 group-hover:rotate-0 hidden sm:block" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Utility & Dashboard */}
                            <div className="lg:col-span-4 flex flex-col border-t lg:border-t-0 lg:border-l border-heritage-navy/10 dark:border-white/10 pt-8 lg:pt-0 lg:pl-12">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-heritage-navy/50 dark:text-white/50 mb-6 flex items-center gap-3 border-b border-heritage-navy/10 dark:border-white/10 pb-4">
                                    Portal do Associado
                                </span>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-12">
                                    {dashboardLinks.map((link, i) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + (i * 0.05), duration: 0.4 }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-4 py-4 px-6 border transition-all duration-300 group",
                                                    isActive(link.path)
                                                        ? "bg-heritage-navy dark:bg-white text-white dark:text-heritage-navy border-transparent"
                                                        : "bg-transparent text-heritage-navy/70 dark:text-white/70 border-heritage-navy/10 dark:border-white/10 hover:border-heritage-terracotta hover:text-heritage-terracotta"
                                                )}
                                            >
                                                <link.icon className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                                                <span className="font-semibold text-sm uppercase tracking-[0.1em]">{link.name}</span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {/* Extra Actions */}
                                <div className="mt-auto space-y-6">
                                    <div className="flex gap-4">
                                        <a href="https://donate.stripe.com/test_demo" target="_blank" className="flex-1 bg-heritage-terracotta text-white font-bold uppercase tracking-[0.2em] text-[10px] py-4 text-center hover:bg-heritage-navy transition-colors">
                                            Doar Agora
                                        </a>
                                        {!session && (
                                            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 border-2 border-heritage-navy dark:border-white text-heritage-navy dark:text-white font-bold uppercase tracking-[0.2em] text-[10px] py-4 text-center hover:bg-heritage-terracotta hover:text-white dark:hover:bg-heritage-terracotta dark:hover:text-white transition-colors">
                                                Login Área
                                            </Link>
                                        )}
                                    </div>
                                    <address className="text-sm text-heritage-navy/60 dark:text-white/60 font-serif not-italic">
                                        Império dos Froios, s/n<br />
                                        Lisboa, PT
                                    </address>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
