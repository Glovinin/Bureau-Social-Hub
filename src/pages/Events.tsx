import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LucideCalendar, LucideMapPin, LucideClock, LucideArrowRight, LucideFilter, LucidePlus } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { logSystemError } from "@/lib/errorLogger"
import { Grain } from "@/components/ui/Grain"

interface Event {
    id: string
    title: string
    description: string
    date: string
    end_date?: string
    location: string
    category: string
    image_url: string
    max_attendees?: number
}

const categoryLabels: Record<string, string> = {
    cultura: "Cultura & Património",
    social: "Impacto & Rede",
    formacao: "Oficinas & Ofícios",
    assembleia: "Governância"
}

export default function Events() {
    const { profile } = useAuth()
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState<string | null>(null)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: true })

            if (error) throw error
            setEvents(data || [])
        } catch (error: any) {
            console.error('Erro ao carregar eventos:', error)
            toast.error('Erro ao carregar eventos')
            logSystemError(error, 'Events.fetchEvents', profile?.id)
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long' })
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
    }

    const filteredEvents = filter
        ? events.filter(e => e.category === filter)
        : events

    return (
        <div className="min-h-screen bg-[#f8f6f0] dark:bg-zinc-950 relative overflow-hidden font-sans pb-24">
            <Grain opacity={0.04} />
            
            <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10 space-y-16">
                {/* Header - Newspaper Grid */}
                <header className="border-b-2 border-heritage-navy dark:border-white pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta">Lisboa • Agenda de Impacto</span>
                                <div className="h-px flex-1 bg-heritage-navy/10 dark:bg-white/10" />
                            </div>
                            <h1 className="text-7xl md:text-9xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.8] tracking-tighter">
                                Agenda <br /><span className="italic">Cultural</span>.
                            </h1>
                        </div>
                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-6 border border-heritage-navy/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30 mb-2">Editoria de Eventos</p>
                                <p className="text-sm font-serif italic text-heritage-navy/70 dark:text-white/50 leading-relaxed">
                                    "A cultura não é um acessório, é a estrutura íntima da reabilitação social."
                                </p>
                            </div>
                            <div className="flex gap-4">
                               <button 
                                  onClick={() => setFilter(null)}
                                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${!filter ? 'bg-heritage-navy text-white' : 'border-heritage-navy/10 text-heritage-navy/40 hover:border-heritage-navy'}`}
                                >
                                  Ver Tudo
                               </button>
                               {profile?.role === 'admin' && (
                                    <button
                                        onClick={() => window.location.href = '/admin?tab=events'}
                                        className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-heritage-terracotta text-white hover:bg-heritage-navy transition-colors"
                                    >
                                        Novo Edital
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Filter Navigation */}
                <nav className="flex flex-wrap gap-8 border-b border-heritage-navy/10 dark:border-white/10 pb-6 overflow-x-auto no-scrollbar">
                    {Object.entries(categoryLabels).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setFilter(filter === key ? null : key)}
                            className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all relative ${filter === key ? 'text-heritage-terracotta' : 'text-heritage-navy/40 hover:text-heritage-navy'}`}
                        >
                            {label}
                            {filter === key && <motion.div layoutId="underline" className="absolute -bottom-[25px] left-0 right-0 h-0.5 bg-heritage-terracotta" />}
                        </button>
                    ))}
                </nav>

                {/* Events Grid - Magazine Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-[500px] rounded-none opacity-20" />
                        ))
                    ) : (
                        filteredEvents.map((e, i) => (
                            <div key={e.id} className="group space-y-8 flex flex-col">
                                <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border border-heritage-navy/5">
                                    <img
                                        src={e.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        alt={e.title}
                                    />
                                </div>
                                <div className="space-y-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-baseline border-b border-heritage-navy/10 dark:border-white/10 pb-4">
                                        <Badge variant="outline" className="rounded-none border-heritage-navy/20 text-heritage-navy/40 font-black uppercase text-[9px] tracking-widest px-0 border-none">
                                            {categoryLabels[e.category] || e.category}
                                        </Badge>
                                        <span className="text-[10px] font-black text-heritage-navy dark:text-white uppercase tracking-widest">{formatDate(e.date)} • {formatTime(e.date)}</span>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <h3 className="text-4xl font-serif text-heritage-navy dark:text-white leading-[0.9] tracking-tight group-hover:italic transition-all duration-300">
                                            {e.title}
                                        </h3>
                                        <p className="text-sm font-serif italic text-heritage-navy/50 dark:text-white/40 leading-relaxed line-clamp-3">
                                            {e.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 pt-4">
                                        <div className="flex items-center gap-3 text-xs font-serif text-heritage-navy/40">
                                           <LucideMapPin className="w-3.5 h-3.5" />
                                           <span>{e.location}</span>
                                        </div>
                                        <button className="w-fit text-[10px] font-black uppercase tracking-[0.3em] text-heritage-terracotta flex items-center gap-4 hover:translate-x-2 transition-transform duration-500">
                                            Solicitar Inscrição <LucideArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {filteredEvents.length === 0 && !isLoading && (
                    <div className="text-center py-32 border border-dashed border-heritage-navy/20">
                        <LucideCalendar className="w-12 h-12 mx-auto text-heritage-navy/10 mb-4" />
                        <p className="font-serif italic text-heritage-navy/40">Sem eventos agendados para esta categoria.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
