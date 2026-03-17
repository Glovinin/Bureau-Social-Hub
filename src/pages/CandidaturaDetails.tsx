import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { logSystemError } from "@/lib/errorLogger"
import { LucideArrowLeft, LucideUser, LucideHome, LucideHammer, LucideCheckCircle, LucideXCircle, LucideDownload, LucideLoader2, LucideFileCheck, LucideFileText, LucideHash, LucideInfo } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { jsPDF } from "jspdf"
import { emailService } from "@/lib/emailService"
import { Grain } from "@/components/ui/Grain"

export default function CandidaturaDetails() {
    const { id } = useParams<{ id: string }>()
    const { user, profile } = useAuth()
    const navigate = useNavigate()
    const [candidatura, setCandidatura] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    // Check permissions & Fetch Data
    useEffect(() => {
        if (!id || !user) return

        const fetchData = async () => {
            setLoading(true)
            try {
                // Fetch Candidatura
                const { data: candData, error: candError } = await supabase
                    .from('candidaturas')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (candError) throw candError

                // Check Permissions: Must be Owner or Admin
                const isOwner = candData.user_id === user.id
                const isAdmin = profile?.role === 'admin'

                if (!isOwner && !isAdmin) {
                    toast.error("Acesso Negado")
                    navigate('/dashboard')
                    return
                }

                setCandidatura(candData)

            } catch (err: any) {
                toast.error("Erro ao carregar detalhes")
                navigate('/dashboard')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id, user, profile, navigate])

    const [isApprovalOpen, setIsApprovalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [approvalData, setApprovalData] = useState({
        nome: '',
        nif: '',
        email: '',
        oficio: '',
        member_number: '',
        member_category: 'efetivo',
        is_exempt: false
    })

    // Pre-fill approval data when candidature loads
    useEffect(() => {
        if (candidatura && candidatura.form_data) {
            const currentYear = new Date().getFullYear()
            const randomCode = Math.floor(Math.random() * 1000).toString().padStart(4, '0')

            let defaultCategory = 'efetivo'
            if (candidatura.type === 'voluntario') defaultCategory = 'auxiliar'
            if (candidatura.type === 'profissional') defaultCategory = 'institucional'
            if (candidatura.type === 'associado') defaultCategory = 'contribuinte'

            setApprovalData({
                nome: candidatura.form_data.nome || '',
                nif: candidatura.form_data.nif || '',
                email: candidatura.form_data.email || '',
                oficio: candidatura.form_data.oficio || '',
                member_number: `M-${currentYear}-${randomCode}`,
                member_category: defaultCategory,
                is_exempt: false
            })
        }
    }, [candidatura])

    const handleConfirmApproval = async () => {
        if (!candidatura || !profile || profile.role !== 'admin' || !user) return

        setIsProcessing(true)
        const loadingToast = toast.loading("Gerando certificado e enviando email...")

        try {
            // 1. Generate PDF
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            })

            doc.setFillColor(250, 248, 245)
            doc.rect(0, 0, 297, 210, 'F')
            doc.setDrawColor(20, 30, 70)
            doc.setLineWidth(2)
            doc.rect(10, 10, 277, 190, 'S')
            doc.setFont("times", "bold")
            doc.setFontSize(40)
            doc.setTextColor(20, 30, 70)
            doc.text("Certificado de Admissão", 148.5, 50, { align: "center" })
            doc.setFont("helvetica", "normal")
            doc.setFontSize(14)
            doc.setTextColor(100, 100, 100)
            doc.text("A Direção do Bureau Social Hub certifica que", 148.5, 70, { align: "center" })
            doc.setFont("times", "bold")
            doc.setFontSize(32)
            doc.setTextColor(212, 163, 115)
            doc.text(approvalData.nome, 148.5, 90, { align: "center" })
            doc.setFont("helvetica", "normal")
            doc.setFontSize(16)
            doc.setTextColor(20, 30, 70)
            doc.text(`Foi admitido como Membro ${approvalData.member_category.charAt(0).toUpperCase() + approvalData.member_category.slice(1)}`, 148.5, 110, { align: "center" })
            doc.text(`Ofício: ${approvalData.oficio}`, 148.5, 125, { align: "center" })
            doc.text(`NIF: ${approvalData.nif}`, 148.5, 135, { align: "center" })
            doc.setFontSize(12)
            doc.text(`Número de Associado: ${approvalData.member_number}`, 148.5, 160, { align: "center" })
            doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-PT')}`, 148.5, 168, { align: "center" })

            doc.save(`Certificado_${approvalData.nome.replace(/\s+/g, '_')}.pdf`)

            // 2. Update DB
            const isVotingCategory = ['fundador', 'efetivo'].includes(approvalData.member_category)

            const { error: candError } = await supabase
                .from('candidaturas')
                .update({ status: 'approved' })
                .eq('id', candidatura.id)
            if (candError) throw candError

            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    role: 'member',
                    member_category: approvalData.member_category,
                    member_number: approvalData.member_number,
                    quota_status: approvalData.is_exempt ? 'active' : 'pending',
                    can_vote: isVotingCategory && approvalData.is_exempt,
                    full_name: approvalData.nome
                })
                .eq('id', candidatura.user_id)
            if (profileError) throw profileError

            await emailService.sendEmail({
                to: approvalData.email,
                subject: `Bem-vindo ao Bureau Social, ${approvalData.nome}!`,
                body: `Olá ${approvalData.nome},\n\nÉ com grande prazer que informamos que sua candidatura foi aprovada!\n\nNúmero: ${approvalData.member_number}\n\nAtenciosamente,\nA Direção`,
                templateId: 'candidature_approved'
            });

            await supabase.from('activity_logs').insert({
                user_id: user.id,
                action_type: 'candidatura_approved',
                details: { candidate_id: candidatura.user_id, member_number: approvalData.member_number }
            })

            setCandidatura({ ...candidatura, status: 'approved' })
            setIsApprovalOpen(false)
            toast.dismiss(loadingToast)
            toast.success("Aprovação Concluída")

        } catch (err: any) {
            toast.dismiss(loadingToast)
            toast.error("Erro na aprovação")
            logSystemError(err, 'CandidaturaDetails.handleConfirmApproval', profile?.id)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleReject = async () => {
        if (!candidatura || !profile || profile.role !== 'admin' || !user) return
        if (!confirm("Tem a certeza que deseja rejeitar esta candidatura?")) return

        try {
            const { error } = await supabase
                .from('candidaturas')
                .update({ status: 'rejected' })
                .eq('id', candidatura.id)
            if (error) throw error
            setCandidatura({ ...candidatura, status: 'rejected' })
            toast.success("Candidatura Rejeitada")
        } catch (err: any) {
            toast.error("Erro ao rejeitar")
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center">
                <LucideLoader2 className="w-8 h-8 animate-spin text-heritage-navy" />
            </div>
        )
    }

    if (!candidatura) return null

    const data = candidatura.form_data || {}
    const isAdmin = profile?.role === 'admin'
    const status = candidatura.status

    return (
        <div className="min-h-screen bg-[#f8f6f0] dark:bg-zinc-950 transition-apple relative overflow-hidden font-sans pb-32">
            <Grain opacity={0.05} />
            
            <div className="container mx-auto px-6 py-20 max-w-5xl relative z-10">
                {/* Dossier Header */}
                <header className="mb-20 space-y-8 border-b-2 border-heritage-navy dark:border-white pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="space-y-4">
                            <button
                                onClick={() => navigate(isAdmin ? '/admin' : '/dashboard')}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-heritage-navy/40 hover:text-heritage-terracotta transition-colors"
                            >
                                <LucideArrowLeft className="w-3 h-3" /> Regressar ao Arquivo
                            </button>
                            <h1 className="text-5xl md:text-7xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.9] tracking-tighter">
                                Dossier <span className="italic text-heritage-terracotta">Individual</span>.
                            </h1>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-mono font-bold text-heritage-navy/20">REF: {candidatura.id.substring(0, 12).toUpperCase()}</span>
                                <div className="h-4 w-px bg-heritage-navy/10" />
                                <Badge className={`rounded-none border-2 px-4 py-1 text-[10px] font-black uppercase tracking-widest ${status === 'approved' ? 'bg-heritage-success/10 border-heritage-success text-heritage-success' : status === 'rejected' ? 'bg-red-50 border-red-500 text-red-500' : 'bg-heritage-navy/5 border-heritage-navy text-heritage-navy'}`}>
                                    {status === 'approved' ? 'Arquivado / Aprovado' : status === 'rejected' ? 'Rejeitado' : 'Em Análise'}
                                </Badge>
                                {candidatura.type && (
                                    <Badge variant="outline" className="rounded-none border-heritage-navy/20 text-heritage-navy/50 text-[10px] uppercase font-bold px-4 py-1">
                                        Modalidade: {candidatura.type}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {status === 'approved' && (
                                <button className="h-14 px-8 bg-heritage-gold text-heritage-navy text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:bg-heritage-navy hover:text-white">
                                    <LucideDownload className="w-4 h-4" /> Descarregar Certificado
                                </button>
                            )}

                            {isAdmin && status === 'submitted' && (
                                <>
                                    <button onClick={handleReject} className="h-14 px-8 border-2 border-red-500 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-red-500 hover:text-white transition-all">
                                        <LucideXCircle className="w-4 h-4" /> Rejeitar
                                    </button>
                                    
                                    <Dialog open={isApprovalOpen} onOpenChange={setIsApprovalOpen}>
                                        <DialogTrigger asChild>
                                            <button className="h-14 px-8 bg-heritage-success text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-heritage-navy transition-all">
                                                <LucideCheckCircle className="w-4 h-4" /> Validar & Aprovar
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-xl bg-white rounded-none border-4 border-heritage-navy p-0 overflow-hidden shadow-2xl">
                                            <div className="bg-heritage-navy text-white p-8">
                                                <DialogTitle className="text-3xl font-serif font-medium">Auto de Admissão</DialogTitle>
                                                <DialogDescription className="text-white/60 font-serif italic">Preencha os dados institucionais para emissão do certificado.</DialogDescription>
                                            </div>
                                            <div className="p-10 space-y-8">
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Nome de Registo</Label>
                                                        <Input value={approvalData.nome} onChange={(e) => setApprovalData({ ...approvalData, nome: e.target.value })} className="rounded-none border-b border-heritage-navy/20 border-t-0 border-x-0 bg-transparent px-0 font-serif italic" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Categoria</Label>
                                                        <Select value={approvalData.member_category} onValueChange={(val) => setApprovalData({ ...approvalData, member_category: val })}>
                                                            <SelectTrigger className="rounded-none border-b border-heritage-navy/20 border-t-0 border-x-0 bg-transparent px-0 font-serif">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent className="rounded-none border-2 border-heritage-navy">
                                                                <SelectItem value="fundador">Fundador</SelectItem>
                                                                <SelectItem value="efetivo">Efetivo</SelectItem>
                                                                <SelectItem value="contribuinte">Contribuinte</SelectItem>
                                                                <SelectItem value="honorario">Honorário</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <button onClick={handleConfirmApproval} className="w-full h-16 bg-heritage-success text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-heritage-navy transition-all">Finalizar Submissão</button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Section: Identificação */}
                        <section className="space-y-8">
                            <div className="flex items-center gap-4">
                                <LucideUser className="w-5 h-5 text-heritage-terracotta" />
                                <h3 className="text-2xl font-serif font-medium text-heritage-navy">I. Identificação Pessoal</h3>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 border border-heritage-navy/10 p-12 shadow-sm space-y-8">
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Nome Completo</span>
                                        <p className="text-xl font-serif italic text-heritage-navy dark:text-white leading-tight">{data.nome || "Não informado"}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Identificação Fiscal (NIF)</span>
                                        <p className="text-xl font-serif text-heritage-navy dark:text-white">{data.nif || "--- --- ---"}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Correio Eletrónico</span>
                                        <p className="text-lg font-serif italic text-heritage-navy/60 dark:text-white/60">{data.email || "Sem endereço"}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Terminal Telefónico</span>
                                        <p className="text-lg font-serif text-heritage-navy/60 dark:text-white/60">{data.telefone || "Sem contacto"}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Perfil Técnico */}
                        {(candidatura.type === 'moradia' || candidatura.type === 'profissional') && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <LucideHammer className="w-5 h-5 text-heritage-gold" />
                                    <h3 className="text-2xl font-serif font-medium text-heritage-navy">II. Perfil de Especialidade</h3>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 border border-heritage-navy/10 p-12 shadow-sm space-y-10">
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Ofício de Referência</span>
                                            <p className="text-2xl font-serif font-medium text-heritage-navy dark:text-white italic">{data.oficio}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Anos de Prática</span>
                                            <p className="text-2xl font-serif text-heritage-navy dark:text-white">{data.anosExperiencia} Anos</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 border-t border-heritage-navy/5 pt-8">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Memorial de Experiência</span>
                                        <p className="text-lg font-serif italic text-heritage-navy/70 dark:text-white/70 leading-relaxed whitespace-pre-wrap">{data.descricaoOficio || "Sem memorial descritivo."}</p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Section: Manifesto */}
                        <section className="space-y-8">
                            <div className="flex items-center gap-4">
                                <LucideFileText className="w-5 h-5 text-heritage-ocean" />
                                <h3 className="text-2xl font-serif font-medium text-heritage-navy">III. Memorial de Motivação</h3>
                            </div>
                            <div className="bg-heritage-sand/10 dark:bg-zinc-900/40 border border-heritage-navy/10 p-12 shadow-inner">
                                <p className="text-xl font-serif italic text-heritage-navy/80 dark:text-white/80 leading-relaxed whitespace-pre-wrap">
                                    {data.motivacao}
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Stats */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="border-2 border-heritage-navy p-10 bg-white dark:bg-zinc-900 space-y-8">
                            <div className="flex items-center gap-3 border-b border-heritage-navy/10 pb-4">
                                <LucideInfo className="w-4 h-4 text-heritage-terracotta" />
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-heritage-navy">Sumário do Processo</h4>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="flex justify-between items-baseline border-b border-heritage-navy/5 pb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Data de Entrada</span>
                                    <span className="text-lg font-serif italic text-heritage-navy dark:text-white">{new Date(candidatura.created_at).toLocaleDateString('pt-PT')}</span>
                                </div>
                                <div className="flex justify-between items-baseline border-b border-heritage-navy/5 pb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Candidatura nº</span>
                                    <span className="text-lg font-serif text-heritage-navy dark:text-white">{candidatura.id.split('-')[0].toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between items-baseline border-b border-heritage-navy/5 pb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">Votos Favoráveis</span>
                                    <span className="text-lg font-serif text-heritage-navy dark:text-white">---</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <div className="p-6 bg-heritage-sand/20 border border-heritage-navy/5 space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Parecer Técnico</p>
                                    <p className="text-xs font-serif italic text-heritage-navy/70 uppercase tracking-widest">Aguardando Revisão da Direção</p>
                                </div>
                            </div>
                        </div>

                        {candidatura.type === 'moradia' && (
                            <div className="border border-heritage-navy/10 p-10 space-y-6">
                                <div className="flex items-center gap-4">
                                    <LucideHome className="w-4 h-4 text-heritage-ocean" />
                                    <h4 className="text-xs font-black uppercase tracking-widest text-heritage-navy">Dossier Habitacional</h4>
                                </div>
                                <div className="space-y-4 text-sm font-serif italic text-heritage-navy/60">
                                    <p>Agregado: {data.agregadoTotal} Pessoas</p>
                                    <p>Situação: {data.condicoesAlojamento}</p>
                                    <p>Rendimentos: {data.rendimentosTrabalho}€</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
