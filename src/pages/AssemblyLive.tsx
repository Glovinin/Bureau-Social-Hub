import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { logSystemError } from "@/lib/errorLogger"
import {
    LucideCheckCircle2,
    LucideXCircle,
    LucideMinusCircle,
    LucideLoader2,
    LucideGavel,
    LucideCalendarDays,
    LucideClock,
    LucideChevronRight,
    LucideVote,
    LucideMessageSquare,
    LucideUsers,
    LucideLogIn,
    LucideFileText,
    LucideInfo,
    LucideRadio,
    LucideTrophy,
    LucideCircle
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { Grain } from "@/components/ui/Grain"

interface Assembly {
    id: string
    title: string
    date: string
    status: 'scheduled' | 'open_for_voting' | 'closed' | 'completed'
}

interface AssemblyItem {
    id: string
    title: string
    description: string
    type: 'discussion' | 'voting_simple' | 'election'
    order_index: number
}

interface UserVote {
    assembly_item_id: string
    vote_option: 'approve' | 'reject' | 'abstain'
}

export default function AssemblyLive() {
    const { profile } = useAuth()
    const [activeAssembly, setActiveAssembly] = useState<Assembly | null>(null)
    const [agendaItems, setAgendaItems] = useState<AssemblyItem[]>([])
    const [userVotes, setUserVotes] = useState<UserVote[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [votingItem, setVotingItem] = useState<string | null>(null)
    const [attendanceCount, setAttendanceCount] = useState(0)
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [isCheckingIn, setIsCheckingIn] = useState(false)
    const [elapsedTime, setElapsedTime] = useState("00:00:00")

    // Poll for active assembly and data
    const fetchLiveData = async () => {
        try {
            const { data: assemblyData, error: assemblyError } = await supabase
                .from('assemblies')
                .select('*')
                .eq('status', 'open_for_voting')
                .single()

            if (assemblyError || !assemblyData) {
                setActiveAssembly(null)
                setIsLoading(false)
                return
            }

            setActiveAssembly(assemblyData)

            const { data: itemsData, error: itemsError } = await supabase
                .from('assembly_items')
                .select('*')
                .eq('assembly_id', assemblyData.id)
                .order('order_index', { ascending: true })

            if (itemsError) throw itemsError
            setAgendaItems(itemsData || [])

            if (profile) {
                const { data: votesData, error: votesError } = await supabase
                    .from('votes')
                    .select('assembly_item_id, vote_option')
                    .eq('user_id', profile.id)
                    .in('assembly_item_id', itemsData?.map((i: any) => i.id) || [])

                if (votesError) throw votesError
                setUserVotes(votesData || [])

                const { data: attendanceData } = await supabase
                    .from('assembly_attendances')
                    .select('id')
                    .eq('assembly_id', assemblyData.id)
                    .eq('user_id', profile.id)
                    .single()

                setIsCheckedIn(!!attendanceData)
            }

            const { data: allAttendance } = await supabase
                .from('assembly_attendances')
                .select('id')
                .eq('assembly_id', assemblyData.id)

            setAttendanceCount(allAttendance?.length || 0)

        } catch (err: any) {
            console.error("Error fetching live assembly data:", err)
            logSystemError(err, 'AssemblyLive.fetchLiveData', profile?.id)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchLiveData()
        const interval = setInterval(fetchLiveData, 10000)
        return () => clearInterval(interval)
    }, [profile])

    useEffect(() => {
        if (!activeAssembly) return

        const updateTimer = () => {
            const start = new Date(activeAssembly.date).getTime()
            const now = Date.now()
            const diff = Math.max(0, now - start)

            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setElapsedTime(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            )
        }

        updateTimer()
        const timerInterval = setInterval(updateTimer, 1000)
        return () => clearInterval(timerInterval)
    }, [activeAssembly])

    const handleVote = async (itemId: string, option: 'approve' | 'reject' | 'abstain') => {
        if (!profile || !activeAssembly) return

        if (!profile.can_vote || profile.quota_status !== 'active') {
            toast.error("A sua categoria ou status de quota não permite votar nesta assembleia.")
            return
        }

        setVotingItem(itemId)
        const weight = profile.member_category === 'fundador' ? 3 : 1

        try {
            const { error } = await supabase
                .from('votes')
                .insert([{
                    user_id: profile.id,
                    assembly_item_id: itemId,
                    vote_option: option,
                    weight: weight,
                    project_id: null
                }])

            if (error) {
                if (error.code === '23505') {
                    toast.error("Você já votou neste item.")
                } else {
                    throw error
                }
            } else {
                toast.success("Voto registrado com sucesso!")
                setUserVotes([...userVotes, { assembly_item_id: itemId, vote_option: option }])
            }
        } catch (err: any) {
            toast.error("Erro ao registrar voto")
            logSystemError(err, 'AssemblyLive.handleVote', profile?.id)
        } finally {
            setVotingItem(null)
        }
    }

    const handleCheckIn = async () => {
        if (!profile || !activeAssembly || isCheckedIn) return
        setIsCheckingIn(true)

        try {
            const { error } = await supabase
                .from('assembly_attendances')
                .insert([{
                    assembly_id: activeAssembly.id,
                    user_id: profile.id
                }])

            if (error) {
                if (error.code === '23505') {
                    toast.info("Você já está registado nesta assembleia.")
                    setIsCheckedIn(true)
                } else {
                    throw error
                }
            } else {
                toast.success("Presença registada com sucesso!")
                setIsCheckedIn(true)
                setAttendanceCount(prev => prev + 1)
            }
        } catch (err: any) {
            toast.error("Erro ao registar presença")
            logSystemError(err, 'AssemblyLive.handleCheckIn', profile?.id)
        } finally {
            setIsCheckingIn(false)
        }
    }

    const handleGenerateMinutes = async () => {
        if (!activeAssembly || !profile || profile.role !== 'admin') return
        const loadingToast = toast.loading("Gerando Ata consolidada...")

        try {
            const { data: attendance, error: attError } = await supabase
                .from('assembly_attendances')
                .select(`
                    id,
                    user_id,
                    profiles:user_id (full_name, member_number, member_category)
                `)
                .eq('assembly_id', activeAssembly.id)

            if (attError) throw attError

            const { data: votes, error: votesError } = await supabase
                .from('votes')
                .select('*')
                .in('assembly_item_id', agendaItems.map(i => i.id))

            if (votesError) throw votesError

            const doc = new jsPDF()
            const primaryColor = "#1B2B44"

            doc.setFillColor(primaryColor)
            doc.rect(0, 0, 210, 40, 'F')
            doc.setTextColor(255, 255, 255)
            doc.setFontSize(22)
            doc.setFont("helvetica", "bold")
            doc.text("ATA DE ASSEMBLEIA GERAL", 105, 20, { align: "center" })
            doc.setFontSize(10)
            doc.text(`BUREAU SOCIAL HUB - REABILITAÇÃO E TRADIÇÃO`, 105, 30, { align: "center" })

            doc.setTextColor(60, 60, 60)
            doc.setFontSize(12)
            doc.text(`Assembleia: ${activeAssembly.title}`, 20, 50)
            doc.text(`Data: ${new Date(activeAssembly.date).toLocaleString('pt-PT')}`, 20, 57)
            doc.text(`Local: Portal Digital Bureau Social`, 20, 64)
            doc.text(`Quórum: ${attendance.length} Associados Registados`, 20, 71)

            doc.setFont("helvetica", "bold")
            doc.text("1. LISTA DE PRESENÇAS", 20, 85)
            const attendeeRows = attendance.map((at: any) => [
                at.profiles?.full_name || "Desconhecido",
                at.profiles?.member_number || "-",
                at.profiles?.member_category || "Membro"
            ])

                ; (doc as any).autoTable({
                    startY: 90,
                    head: [['Nome Completo', 'Nº Sócio', 'Categoria']],
                    body: attendeeRows,
                    theme: 'striped',
                    headStyles: { fillStyle: primaryColor }
                })

            let currentY = (doc as any).lastAutoTable.finalY + 15
            doc.setFont("helvetica", "bold")
            doc.text("2. DELIBERAÇÕES E VOTAÇÕES", 20, currentY)
            currentY += 10

            agendaItems.forEach((item, index) => {
                if (currentY > 250) {
                    doc.addPage()
                    currentY = 20
                }

                const itemVotes = votes.filter((v: any) => v.assembly_item_id === item.id)
                const approves = itemVotes.filter((v: any) => v.vote_option === 'approve').reduce((acc: number, v: any) => acc + (v.weight || 1), 0)
                const rejects = itemVotes.filter((v: any) => v.vote_option === 'reject').reduce((acc: number, v: any) => acc + (v.weight || 1), 0)
                const abstains = itemVotes.filter((v: any) => v.vote_option === 'abstain').reduce((acc: number, v: any) => acc + (v.weight || 1), 0)
                const total = approves + rejects + abstains

                doc.setFontSize(11)
                doc.setFont("helvetica", "bold")
                doc.text(`${index + 1}. ${item.title}`, 25, currentY)
                currentY += 7
                doc.setFont("helvetica", "normal")
                doc.setFontSize(10)
                doc.text(`Resultado: ${approves} Favor | ${rejects} Contra | ${abstains} Abstenções (Peso Total: ${total})`, 30, currentY)

                const resultText = total > 0 && approves > (rejects + abstains) ? "APROVADO" : "REJEITADO / NÃO DELIBERADO"
                doc.setFont("helvetica", "bold")
                doc.text(`Conclusão: ${resultText}`, 30, currentY + 6)
                currentY += 18
            })

            doc.save(`Ata_${activeAssembly.title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`)
            toast.dismiss(loadingToast)
            toast.success("Ata gerada com sucesso!")

        } catch (err: any) {
            toast.dismiss(loadingToast)
            toast.error("Erro ao gerar ata")
        }
    }

    const hasVoted = (itemId: string) => userVotes.some(v => v.assembly_item_id === itemId)
    const getMyVote = (itemId: string) => userVotes.find(v => v.assembly_item_id === itemId)?.vote_option

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#f8f6f0]">
                <LucideLoader2 className="w-10 h-10 animate-spin text-heritage-navy" />
            </div>
        )
    }

    if (!activeAssembly) {
        return (
            <div className="min-h-screen bg-[#f8f6f0] dark:bg-zinc-950 flex flex-col items-center justify-center p-12 text-center transition-all">
                <Grain opacity={0.05} />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl space-y-12"
                >
                    <div className="relative group">
                        <div className="absolute -inset-8 bg-heritage-navy/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        <LucideGavel className="w-20 h-20 text-heritage-navy/10 dark:text-white/10 mx-auto" />
                    </div>

                    <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-navy/30 dark:text-white/30">Sala de Plenário</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.9] tracking-tighter italic">
                            Sem Sessões <span className="block text-heritage-terracotta not-italic">Ativas.</span>
                        </h2>
                    </div>
                    
                    <p className="text-xl font-serif italic text-heritage-navy/60 dark:text-white/60 max-w-lg mx-auto leading-relaxed">
                        De momento, os sistemas de votação encontram-se em repouso. Consulte o Diário de Notificações para agendamentos futuros.
                    </p>

                    <button
                        onClick={fetchLiveData}
                        className="h-16 px-12 border-2 border-heritage-navy dark:border-white text-heritage-navy dark:text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-heritage-navy hover:text-white transition-all transform hover:-translate-y-1"
                    >
                        Atualizar Estado
                    </button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f8f6f0] dark:bg-zinc-950 transition-apple pb-40 font-sans relative overflow-hidden">
            <Grain opacity={0.05} />

            {/* Editorial Masthead */}
            <div className="container mx-auto px-6 pt-20 pb-12">
                <div className="flex flex-col items-center text-center space-y-8 border-b-2 border-heritage-navy/10 dark:border-white/10 pb-16">
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-heritage-navy/40 dark:text-white/40">
                        <span>Edição Especial</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta animate-pulse" />
                        <span>Transmissão em Direto</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-medium text-heritage-navy dark:text-white leading-[0.85] tracking-tighter">
                        Diário da <span className="italic text-heritage-terracotta">Assembleia</span>.
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] font-black uppercase tracking-widest text-heritage-navy/30">Assembleia Geral</span>
                            <span className="text-xl font-serif italic text-heritage-navy dark:text-white">{activeAssembly.title}</span>
                        </div>
                        <div className="w-px h-10 bg-heritage-navy/10 dark:bg-white/10 hidden md:block" />
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] font-black uppercase tracking-widest text-heritage-navy/30">Data do Plenário</span>
                            <span className="text-xl font-serif italic text-heritage-navy dark:text-white">{new Date(activeAssembly.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="w-px h-10 bg-heritage-navy/10 dark:bg-white/10 hidden md:block" />
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] font-black uppercase tracking-widest text-heritage-navy/30">Referência Única</span>
                            <span className="text-xl font-mono text-heritage-navy/40 uppercase tracking-tighter">{activeAssembly.id.substring(0, 8)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Left Sidebar: Stats & Info Box */}
                <aside className="lg:col-span-4 space-y-12">
                    <div className="border-4 border-heritage-navy p-10 bg-white dark:bg-zinc-900 shadow-[20px_20px_0px_0px_rgba(27,43,68,0.05)] space-y-10 sticky top-32">
                        <div className="flex items-center justify-between border-b border-heritage-navy/10 pb-6 uppercase">
                            <div className="flex items-center gap-3">
                                <LucideRadio className="w-4 h-4 text-heritage-terracotta animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.2em] text-heritage-navy">Estado da Sessão</span>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-heritage-success" />
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-2">
                                <span className="text-[9px] font-black uppercase tracking-widest text-heritage-navy/30">Quórum Verificado</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-serif font-medium text-heritage-navy dark:text-white tracking-tighter">{attendanceCount}</span>
                                    <span className="text-xs font-serif italic text-heritage-navy/40 uppercase">Delegados</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[9px] font-black uppercase tracking-widest text-heritage-navy/30">Cronómetro Digital</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-serif font-medium text-heritage-navy dark:text-white tracking-tighter">{elapsedTime}</span>
                                    <LucideClock className="w-4 h-4 text-heritage-gold" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-heritage-navy/5">
                            {!isCheckedIn ? (
                                <button
                                    onClick={handleCheckIn}
                                    disabled={isCheckingIn}
                                    className="w-full h-16 bg-heritage-terracotta text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-heritage-navy translate-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
                                >
                                    {isCheckingIn ? "Validando..." : "Registar Presença"}
                                </button>
                            ) : (
                                <div className="p-6 bg-heritage-success/5 border border-heritage-success/20 flex flex-col items-center text-center space-y-2">
                                    <LucideCheckCircle2 className="w-8 h-8 text-heritage-success" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-heritage-success">Presença Registada no Arquivo</span>
                                    <p className="text-xs font-serif italic text-heritage-navy/40 italic">O seu terminal está habilitado a deliberar.</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-[#f8f6f0] p-6 text-[9px] font-serif italic leading-relaxed text-heritage-navy/50">
                            "A participação plena assegura a transparência democrática. Todos os votos são encriptados e arquivados no Livro de Atas Digital."
                        </div>
                    </div>
                </aside>

                {/* Right Column: Agenda Items */}
                <div className="lg:col-span-8 space-y-20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-grow bg-heritage-navy/10" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-navy/30">Ordem de Trabalhos Consolidada</span>
                        <div className="h-px flex-grow bg-heritage-navy/10" />
                    </div>

                    <div className="space-y-32">
                        {agendaItems.map((item, index) => {
                            const voted = hasVoted(item.id)
                            const myVote = getMyVote(item.id)
                            const isVotingType = item.type === 'voting_simple' || item.type === 'election'
                            
                            return (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative grid grid-cols-1 md:grid-cols-12 gap-8"
                                >
                                    {/* Vertical Index Column */}
                                    <div className="md:col-span-1 flex flex-col items-center">
                                        <span className="text-[10px] font-black text-heritage-navy/20 dark:text-white/20 mb-4 uppercase tabular-nums">Pauta {String(index + 1).padStart(2, '0')}</span>
                                        <div className="w-0.5 flex-grow bg-heritage-navy/5 relative">
                                            {voted && <div className="absolute top-0 left-0 w-full bg-heritage-success transition-all duration-1000 h-full" />}
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="md:col-span-11 space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <Badge className="bg-transparent border-heritage-navy/20 text-heritage-navy/40 rounded-none px-4 py-1 text-[9px] font-black uppercase tracking-widest">
                                                    {item.type}
                                                </Badge>
                                                {voted && (
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-heritage-success flex items-center gap-2">
                                                        <LucideFileCheck className="w-3 h-3" /> Digitalmente Assinado
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-4xl md:text-5xl font-serif font-medium text-heritage-navy dark:text-white leading-[1] italic tracking-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-lg font-serif italic text-heritage-navy/70 dark:text-white/70 leading-relaxed max-w-3xl border-l border-heritage-navy/10 pl-8 ml-2">
                                                {item.description || "O plenário abre discussão sobre este ponto da ordem de trabalhos para deliberação futura."}
                                            </p>
                                        </div>

                                        {isVotingType && (
                                            <div className="pt-8">
                                                <AnimatePresence mode="wait">
                                                    {voted ? (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="inline-flex items-center gap-8 p-8 border-2 border-heritage-success/20 bg-heritage-success/5"
                                                        >
                                                            <div className="space-y-1">
                                                                <span className="text-[9px] font-black uppercase tracking-widest text-heritage-success/60">Voto do Associado</span>
                                                                <p className="text-3xl font-serif font-medium italic text-heritage-navy dark:text-white">
                                                                    {myVote === 'approve' && 'Parecer Favorável'}
                                                                    {myVote === 'reject' && 'Parecer Contra'}
                                                                    {myVote === 'abstain' && 'Abstenção de Voto'}
                                                                </p>
                                                            </div>
                                                            <LucideTrophy className="w-12 h-12 text-heritage-success opacity-20" />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
                                                        >
                                                            <button
                                                                onClick={() => handleVote(item.id, 'approve')}
                                                                disabled={!!votingItem}
                                                                className="h-20 bg-heritage-navy text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-heritage-success transition-all group overflow-hidden relative"
                                                            >
                                                                <LucideCheckCircle2 className="w-5 h-5 group-hover:scale-125 transition-transform" />
                                                                A Favor
                                                                <div className="absolute inset-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleVote(item.id, 'reject')}
                                                                disabled={!!votingItem}
                                                                className="h-20 border-2 border-heritage-navy/20 text-heritage-navy text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:border-red-500 hover:text-red-500 transition-all"
                                                            >
                                                                <LucideXCircle className="w-5 h-5" />
                                                                Contra
                                                            </button>
                                                            <button
                                                                onClick={() => handleVote(item.id, 'abstain')}
                                                                disabled={!!votingItem}
                                                                className="h-20 border-b border-heritage-navy/20 text-heritage-navy/40 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:text-heritage-navy transition-all"
                                                            >
                                                                <LucideMinusCircle className="w-5 h-5" />
                                                                Abster
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>
                                </motion.article>
                            )
                        })}
                    </div>

                    {/* Admin Archive Section */}
                    {profile?.role === 'admin' && (
                        <motion.section 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="mt-40 p-16 border-[10px] border-heritage-navy bg-white dark:bg-zinc-900 space-y-12 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <LucideGavel className="w-32 h-32 text-heritage-navy/5 -rotate-12" />
                            </div>
                            
                            <div className="space-y-4 max-w-xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta">Gabinete de Presidência</span>
                                <h3 className="text-5xl font-serif font-medium text-heritage-navy dark:text-white leading-tight italic">Consolidação e <span className="not-italic">Arquivo Final.</span></h3>
                                <p className="text-xl font-serif italic text-heritage-navy/60 dark:text-white/60">Após a conclusão de todos os pontos da ordem de trabalhos, a Direção deve proceder à emissão do documento oficial de Ata.</p>
                            </div>

                            <div className="flex flex-wrap gap-8">
                                <button
                                    className="h-20 px-12 bg-heritage-navy text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-heritage-gold transition-all shadow-xl transform hover:-translate-y-1"
                                    onClick={handleGenerateMinutes}
                                >
                                    Gerar Ata Consolidada
                                </button>
                                <button
                                    className="h-20 px-12 border-2 border-heritage-navy text-heritage-navy text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500 hover:border-red-500 hover:text-white transition-all shadow-lg"
                                    onClick={() => toast.warning("Encerrar Assembleia em Definitivo?", {
                                        description: "Esta ação impedirá quaisquer novas deliberações digitais.",
                                        action: { label: "Selar Arquivo", onClick: () => { } }
                                    })}
                                >
                                    Selar Livro de Atas
                                </button>
                            </div>
                        </motion.section>
                    )}
                </div>
            </main>
        </div>
    )
}
