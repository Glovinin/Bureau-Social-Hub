import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LucideVote, LucideInfo, LucideCheck, LucideLoader2, LucidePlus, LucideArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { logSystemError } from "@/lib/errorLogger"
import { Grain } from "@/components/ui/Grain"

export default function Voting() {
    const { user } = useAuth()
    const [projects, setProjects] = useState<any[]>([])
    const [userVotes, setUserVotes] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [votingId, setVotingId] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return
            setLoading(true)
            try {
                const { data: projectsData, error: projectsError } = await supabase
                    .from('projects')
                    .select('*')
                    .order('votes', { ascending: false })

                if (projectsError) throw projectsError
                setProjects(projectsData || [])

                const { data: votesData, error: votesError } = await supabase
                    .from('votes')
                    .select('project_id')
                    .eq('user_id', user.id)

                if (votesError && votesError.code !== 'PGRST116') throw votesError
                setUserVotes(votesData ? votesData.map((v: { project_id: string }) => v.project_id) : [])

            } catch (error: any) {
                console.error("Error fetching voting data:", error)
                toast.error("Erro ao carregar votações")
                logSystemError(error, 'Voting.fetchData', user?.id)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user])

    const handleVote = async (projectId: string) => {
        if (!user) return
        setVotingId(projectId)

        try {
            const { error } = await supabase
                .from('votes')
                .insert({
                    user_id: user.id,
                    project_id: projectId,
                    weight: 1
                })

            if (error) throw error

            setUserVotes(prev => [...prev, projectId])
            setProjects(prev => prev.map(p =>
                p.id === projectId
                    ? { ...p, votes: p.votes + 1 }
                    : p
            ))

            toast.success("Voto registrado com sucesso!")

        } catch (error: any) {
            toast.error("Erro ao votar: " + error.message)
            logSystemError(error, 'Voting.handleVote', user?.id)
        } finally {
            setVotingId(null)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8f6f0] dark:bg-zinc-950 relative overflow-hidden font-sans pb-24">
            <Grain opacity={0.04} />
            
            <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10 space-y-16">
                {/* Header - Editorial Style */}
                <header className="border-b-2 border-heritage-navy dark:border-white pb-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-3xl space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta">Governança Participativa</span>
                                <div className="h-px flex-1 bg-heritage-navy/10 dark:bg-white/10" />
                            </div>
                            <h1 className="text-6xl md:text-8xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.85] tracking-tighter">
                                Sua Voz, <br /><span className="italic text-heritage-gold">Nosso Legado</span>.
                            </h1>
                        </div>
                        <div className="md:text-right space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">Referendo Atual</p>
                            <div className="p-4 border border-heritage-navy/10 dark:border-white/10 bg-white/30 dark:bg-zinc-900/40">
                                <p className="text-sm font-serif italic text-heritage-navy dark:text-white">Sessão Plenária 2026.01</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-heritage-navy/40 mt-1">Auditado por CML / IHRU</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Sub-header / Filter toggle (simplified) */}
                <div className="flex justify-between items-center">
                   <p className="text-sm font-serif italic text-heritage-navy/60">Lista de projetos submetidos para aprovação de co-financiamento.</p>
                   {user?.role === 'admin' && (
                        <Button
                            onClick={() => window.location.href = '/admin?tab=projects'}
                            className="bg-heritage-navy text-white rounded-none font-black px-6 uppercase tracking-widest text-[9px] h-10 hover:bg-heritage-terracotta transition-colors"
                        >
                            <LucidePlus className="w-3.5 h-3.5 mr-2" /> Gerir Projetos
                        </Button>
                    )}
                </div>

                {/* Voting Grid - Ledger Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projects.map((p, i) => {
                        const hasVoted = userVotes.includes(p.id)
                        const isVoting = votingId === p.id

                        return (
                            <div 
                                key={p.id}
                                className="group relative border border-heritage-navy/10 dark:border-white/10 bg-white dark:bg-zinc-900 flex flex-col hover:border-heritage-navy dark:hover:border-white transition-colors duration-500"
                            >
                                <div className="p-8 space-y-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div className={`w-12 h-12 border border-heritage-navy/20 flex items-center justify-center transition-colors
                                            ${hasVoted ? 'bg-heritage-navy text-white' : 'text-heritage-navy/40'}`}>
                                            {hasVoted ? <LucideCheck className="w-6 h-6" /> : <LucideVote className="w-6 h-6" />}
                                        </div>
                                        <Badge variant="outline" className="rounded-none border-heritage-navy/10 text-[9px] font-black uppercase tracking-widest px-3 py-1">Projeto #{i+1}</Badge>
                                    </div>

                                    <div className="space-y-4 flex-1">
                                        <h3 className="text-3xl font-serif text-heritage-navy dark:text-white leading-tight">{p.title}</h3>
                                        <p className="text-sm font-serif italic text-heritage-navy/50 dark:text-white/30 leading-relaxed line-clamp-4">
                                            {p.description}
                                        </p>
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-heritage-navy/5">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Quorum de Aprovação</span>
                                            <span className="text-xs font-serif italic text-heritage-navy/60">{p.votes} / {p.goal} v.</span>
                                        </div>
                                        <div className="h-[2px] w-full bg-heritage-navy/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-heritage-navy dark:bg-heritage-gold transition-all duration-1000"
                                                style={{ width: `${Math.min((p.votes / p.goal) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleVote(p.id)}
                                    disabled={hasVoted || isVoting || loading}
                                    className={`w-full py-6 font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-2
                                        ${hasVoted
                                            ? 'bg-heritage-success/10 text-heritage-success cursor-default'
                                            : 'bg-heritage-navy text-white hover:bg-heritage-terracotta'
                                        }
                                    `}>
                                    {isVoting ? (
                                        <LucideLoader2 className="w-4 h-4 animate-spin" />
                                    ) : hasVoted ? (
                                        <>Voto Consignado <LucideCheck className="w-3.5 h-3.5" /></>
                                    ) : (
                                        <>Votar neste Projeto <LucideArrowRight className="w-3.5 h-3.5" /></>
                                    )}
                                </button>
                                
                                {hasVoted && (
                                    <div className="absolute top-4 right-4 pointer-events-none opacity-10">
                                        <div className="w-24 h-24 border-4 border-heritage-navy rounded-full flex items-center justify-center rotate-12">
                                            <span className="text-[10px] font-black uppercase">Voted</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Statutory Disclaimer - Infographic Style */}
                <footer className="mt-24 p-12 lg:p-16 border-t border-heritage-navy/10 dark:border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center italic font-serif">
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-3xl text-heritage-navy dark:text-white tracking-tight">Cláusula de Transparência</h3>
                        <p className="text-lg text-heritage-navy/40 dark:text-white/30 leading-relaxed max-w-2xl">
                            Cada associado em pleno gozo dos seus direitos estatutários detém um voto único por projeto. 
                            O Bureau Social garante o anonimato e a auditabilidade do processo através de registos descentralizados.
                        </p>
                    </div>
                    <div className="text-right">
                        <button className="px-10 py-4 border border-heritage-navy/20 dark:border-white/20 text-heritage-navy dark:text-white text-[10px] font-black uppercase tracking-widest hover:bg-heritage-navy hover:text-white transition-all">
                            Consultar Estatutos
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    )
}
