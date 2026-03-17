import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    LucideUser,
    LucideHome,
    LucideBriefcase,
    LucideHeart,
    LucideArrowRight,
    LucideArrowLeft,
    LucideCheck,
    LucideSend,
    LucideHash,
    LucideFileText
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { logSystemError } from "@/lib/errorLogger"
import { Grain } from "@/components/ui/Grain"
import Magnetic from "@/components/ui/Magnetic"

type CandidatureType = 'moradia' | 'profissional' | 'associado' | 'voluntario'

interface FormData {
    type: CandidatureType
    nome: string
    dataNascimento: string
    nacionalidade: string
    nif: string
    telefone: string
    email: string
    moradaAtual: string
    codigoPostal: string
    localidade: string
    agregadoTotal: number
    tipoAlojamento: string
    rendaAtual: string
    condicoesAlojamento: string
    rendimentosTrabalho: string
    oficio: string
    anosExperiencia: string
    comoAprendeu: string
    descricaoOficio: string
    portfolioLinks: string
    fotosTrabalho: string[]
    planoTrabalho: string
    disponivelEnsinar: string
    horasEnsino: string
    motivacao: string
    aceitaTermos: boolean
}

const initialFormData: FormData = {
    type: 'moradia',
    nome: "",
    dataNascimento: "",
    nacionalidade: "",
    nif: "",
    telefone: "",
    email: "",
    moradaAtual: "",
    codigoPostal: "",
    localidade: "",
    agregadoTotal: 1,
    tipoAlojamento: "",
    rendaAtual: "",
    condicoesAlojamento: "",
    rendimentosTrabalho: "",
    oficio: "",
    anosExperiencia: "",
    comoAprendeu: "",
    descricaoOficio: "",
    portfolioLinks: "",
    fotosTrabalho: [],
    planoTrabalho: "",
    disponivelEnsinar: "",
    horasEnsino: "",
    motivacao: "",
    aceitaTermos: false
}

export default function Candidatura() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const { session } = useAuth()

    const getSteps = () => {
        const baseSteps = [{ id: 1, title: "Anexo I: Identificação", icon: LucideUser }]
        if (formData.type === 'moradia') baseSteps.push({ id: 2, title: "Anexo II: Condições Habitacionais", icon: LucideHome })
        if (['moradia', 'profissional'].includes(formData.type)) baseSteps.push({ id: 3, title: "Anexo III: Qualificação Técnica", icon: LucideBriefcase })
        baseSteps.push({ id: 4, title: "Anexo IV: Manifesto de Motivação", icon: LucideHeart })
        return baseSteps.map((s, i) => ({ ...s, stepIndex: i + 1 }))
    }

    const steps = getSteps()

    const validateStep = (stepIdx: number) => {
        const newErrors: Record<string, string> = {}
        const currentStepObj = steps.find(s => s.stepIndex === stepIdx)
        if (!currentStepObj) return true

        if (currentStepObj.id === 1) {
            if (!formData.nome) newErrors.nome = "Campo obrigatório"
            if (!formData.dataNascimento) newErrors.dataNascimento = "Campo obrigatório"
            if (!formData.nif) newErrors.nif = "Campo obrigatório"
            if (!formData.telefone) newErrors.telefone = "Campo obrigatório"
            if (!formData.email) newErrors.email = "Campo obrigatório"
        }
        if (currentStepObj.id === 2) {
            if (formData.agregadoTotal < 1) newErrors.agregadoTotal = "Mínimo 1"
            if (!formData.rendimentosTrabalho) newErrors.rendimentosTrabalho = "Campo obrigatório"
        }
        if (currentStepObj.id === 3) {
            if (!formData.oficio) newErrors.oficio = "Campo obrigatório"
            if (!formData.descricaoOficio) newErrors.descricaoOficio = "Campo obrigatório"
        }
        if (currentStepObj.id === 4) {
            if (!formData.motivacao) newErrors.motivacao = "Campo obrigatório"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (currentStep === 0) {
            setCurrentStep(1)
        } else {
            if (validateStep(currentStep)) {
                setCurrentStep(prev => prev + 1)
                window.scrollTo(0, 0)
            }
        }
    }

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1)
    }

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (!session) {
            toast.error("Login Necessário")
            return
        }
        try {
            const { error } = await supabase
                .from('candidaturas')
                .insert({
                    user_id: session.user.id,
                    status: 'submitted',
                    type: formData.type,
                    form_data: formData
                })
            if (error) throw error
            setSubmitted(true)
        } catch (error: any) {
            toast.error("Erro ao enviar")
            logSystemError(error, 'Candidatura.handleSubmit', session?.user?.id)
        }
    }

    if (submitted) {
        return (
            <div className="flex flex-col w-full min-h-screen bg-[#f8f6f0] items-center justify-center p-6 text-center">
                <Grain opacity={0.05} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-2 border-heritage-navy p-12 bg-white max-w-lg shadow-2xl relative z-10">
                    <div className="w-16 h-16 border-2 border-heritage-success flex items-center justify-center mx-auto mb-8">
                        <LucideCheck className="w-8 h-8 text-heritage-success" />
                    </div>
                    <h1 className="text-4xl font-serif font-medium text-heritage-navy mb-6">Processo Recebido.</h1>
                    <p className="text-heritage-navy/60 font-serif italic mb-10 leading-relaxed">
                        A sua candidatura como <span className="font-bold text-heritage-terracotta capitalize">{formData.type}</span> foi integrada no nosso sistema de arquivo e será analisada pela direção técnica em breve.
                    </p>
                    <button onClick={() => window.location.href = '/dashboard'} className="w-full py-4 bg-heritage-navy text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-heritage-terracotta transition-all">Regressar ao Dossier Ativo</button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f8f6f0] dark:bg-zinc-950 transition-apple relative overflow-hidden font-sans">
            <Grain opacity={0.05} />
            
            {/* Step 0: Editorial Selection */}
            {currentStep === 0 && (
                <div className="container mx-auto px-6 py-32 max-w-7xl relative z-10">
                    <header className="mb-20 space-y-8 border-b-2 border-heritage-navy dark:border-white pb-12">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta">Chamada de Participação</span>
                            <div className="h-px flex-1 bg-heritage-navy/10" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.85] tracking-tighter">
                            A Nossa <span className="italic text-heritage-ocean">Comunidade</span>.
                        </h1>
                        <p className="max-w-2xl text-xl text-heritage-navy/60 dark:text-white/40 font-serif leading-relaxed italic">
                            "Propomos um modelo de intervenção onde cada talento é um pilar da estrutura. Escolha a sua modalidade de compromisso."
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-heritage-navy/10 dark:border-white/10">
                        {[
                            { id: 'moradia', label: 'Moradia Artesãos', icon: LucideHome, desc: 'Para mestres que necessitam de base de vida no centro histórico.' },
                            { id: 'profissional', label: 'Corpo Técnico', icon: LucideBriefcase, desc: 'Para profissionais que procuram parcerias institucionais.' },
                            { id: 'associado', label: 'Associado Efetivo', icon: LucideUser, desc: 'Participação ativa na governança e nos rumos da associação.' },
                            { id: 'voluntario', label: 'Rede Voluntária', icon: LucideHeart, desc: 'Doação de tempo para apoio a projetos de impacto local.' }
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => {
                                    updateFormData('type', type.id as CandidatureType)
                                    handleNext()
                                }}
                                className="group relative p-12 bg-white dark:bg-zinc-900 border border-heritage-navy/5 dark:border-white/5 hover:bg-heritage-navy transition-all duration-500 text-left flex flex-col min-h-[400px]"
                            >
                                <div className="w-12 h-12 border border-heritage-navy/20 dark:border-white/20 flex items-center justify-center text-heritage-navy dark:text-white mb-8 group-hover:bg-white group-hover:text-heritage-navy transition-all">
                                    <type.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-serif font-medium text-heritage-navy dark:text-white group-hover:text-heritage-gold transition-colors mb-4">{type.label}</h3>
                                <p className="text-sm text-heritage-navy/50 dark:text-white/40 leading-relaxed font-serif italic mb-8 group-hover:text-white/70">{type.desc}</p>
                                <div className="mt-auto pt-6 flex items-center text-heritage-navy dark:text-white font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0">
                                    Iniciar Dossier <LucideArrowRight className="w-4 h-4 ml-4" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Application Wizard - Paper Style */}
            {currentStep > 0 && (
                <div className="container mx-auto px-6 py-20 max-w-5xl relative z-10 min-h-screen flex flex-col">
                    <header className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-heritage-navy/20 pb-8 gap-4">
                        <div className="flex items-center gap-6">
                            <button onClick={prevStep} className="w-10 h-10 border border-heritage-navy/20 flex items-center justify-center hover:bg-heritage-navy hover:text-white transition-all">
                                <LucideArrowLeft className="w-4 h-4" />
                            </button>
                            <div>
                                <h2 className="text-4xl font-serif font-medium text-heritage-navy dark:text-white">
                                    {steps.find(s => s.stepIndex === currentStep)?.title}
                                </h2>
                                <p className="text-[10px] font-black uppercase tracking-widest text-heritage-terracotta mt-2">
                                    Requisição de Candidatura: {formData.type}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-5xl font-serif italic text-heritage-navy/10 dark:text-white/10">0{currentStep} — 0{steps.length}</span>
                        </div>
                    </header>

                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-zinc-900 border border-heritage-navy/10 dark:border-white/10 p-12 md:p-16 shadow-2xl flex-1 mb-20"
                    >
                        {/* Step content */}
                        <div className="max-w-3xl space-y-12">
                            {/* 1. DADOS PESSOAIS */}
                            {steps.find(s => s.stepIndex === currentStep)?.id === 1 && (
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="md:col-span-2 space-y-4">
                                        <div className="flex justify-between items-end border-b border-heritage-navy/10 pb-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Nome Completo do Candidato</Label>
                                            {errors.nome && <span className="text-[8px] font-black uppercase text-red-500">{errors.nome}</span>}
                                        </div>
                                        <Input value={formData.nome} onChange={e => updateFormData('nome', e.target.value)} className="h-12 bg-transparent border-0 border-b border-heritage-navy/10 rounded-none px-0 text-lg font-serif italic focus-visible:ring-0 focus-visible:border-heritage-terracotta dark:text-white" placeholder="..." />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-heritage-navy/10 pb-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Data de Nascimento</Label>
                                        </div>
                                        <Input type="date" value={formData.dataNascimento} onChange={e => updateFormData('dataNascimento', e.target.value)} className="h-10 bg-transparent border-0 border-b border-heritage-navy/10 rounded-none px-0 font-serif dark:text-white" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-heritage-navy/10 pb-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">NIF Institucional</Label>
                                        </div>
                                        <Input value={formData.nif} onChange={e => updateFormData('nif', e.target.value)} className="h-10 bg-transparent border-0 border-b border-heritage-navy/10 rounded-none px-0 font-serif dark:text-white" placeholder="123 456 789" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-heritage-navy/10 pb-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Terminal de Contacto</Label>
                                        </div>
                                        <Input value={formData.telefone} onChange={e => updateFormData('telefone', e.target.value)} className="h-10 bg-transparent border-0 border-b border-heritage-navy/10 rounded-none px-0 font-serif dark:text-white" placeholder="+351 ..." />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-heritage-navy/10 pb-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Correio Eletrónico</Label>
                                        </div>
                                        <Input type="email" value={formData.email} onChange={e => updateFormData('email', e.target.value)} className="h-10 bg-transparent border-0 border-b border-heritage-navy/10 rounded-none px-0 font-serif dark:text-white" placeholder="exemplo@mail.pt" />
                                    </div>
                                </div>
                            )}

                            {/* 2. HABITAÇÃO */}
                            {steps.find(s => s.stepIndex === currentStep)?.id === 2 && (
                                <div className="space-y-12">
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 mb-2 block border-b border-heritage-navy/10 pb-2">Total do Agregado Familiar</Label>
                                            <Input type="number" min="1" value={formData.agregadoTotal} onChange={e => updateFormData('agregadoTotal', parseInt(e.target.value))} className="h-10 bg-transparent border-0 border-b border-heritage-navy/10 rounded-none px-0 font-serif text-lg dark:text-white" />
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 mb-2 block border-b border-heritage-navy/10 pb-2">Rendimento Líquido Estimado (€)</Label>
                                            <Input type="number" value={formData.rendimentosTrabalho} onChange={e => updateFormData('rendimentosTrabalho', e.target.value)} className="h-10 bg-transparent border-0 border-b border-heritage-navy/10 rounded-none px-0 font-serif text-lg dark:text-white" placeholder="0.00" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 mb-6 block border-b border-heritage-navy/10 pb-2">Estado Atual da Instalação Habitacional</Label>
                                        <div className="flex flex-wrap gap-4">
                                            {["Boas", "Razoáveis", "Más", "Precárias"].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => updateFormData('condicoesAlojamento', opt)}
                                                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${formData.condicoesAlojamento === opt ? 'bg-heritage-navy text-white border-heritage-navy' : 'bg-transparent text-heritage-navy/40 border-heritage-navy/10 hover:border-heritage-navy'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 3. OFÍCIO */}
                            {steps.find(s => s.stepIndex === currentStep)?.id === 3 && (
                                <div className="space-y-12">
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 border-b border-heritage-navy/10 pb-2 block">Ofício Dominante</Label>
                                            <Input value={formData.oficio} onChange={e => updateFormData('oficio', e.target.value)} className="h-10 bg-transparent border-0 border-b border-heritage-navy/10 rounded-none px-0 font-serif italic text-lg dark:text-white" placeholder="Ex: Mestre de Canteiro" />
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 border-b border-heritage-navy/10 pb-2 block">Anos de Atividade</Label>
                                            <Input value={formData.anosExperiencia} onChange={e => updateFormData('anosExperiencia', e.target.value)} className="h-10 bg-transparent border-0 border-b border-heritage-navy/10 rounded-none px-0 font-serif text-lg dark:text-white" type="number" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 border-b border-heritage-navy/10 pb-2 block">Memorial Descritivo da Técnica e Experiência</Label>
                                        <Textarea value={formData.descricaoOficio} onChange={e => updateFormData('descricaoOficio', e.target.value)} className="h-48 bg-heritage-sand/10 border border-heritage-navy/10 rounded-none font-serif italic p-6 leading-relaxed dark:text-white" placeholder="Descreva pormenorizadamente..." />
                                    </div>
                                </div>
                            )}

                            {/* 4. MOTIVAÇÃO */}
                            {steps.find(s => s.stepIndex === currentStep)?.id === 4 && (
                                <div className="space-y-12">
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 border-b border-heritage-navy/10 pb-2 block">Manifesto de Motivação</Label>
                                        <Textarea value={formData.motivacao} onChange={e => updateFormData('motivacao', e.target.value)} className="h-48 bg-heritage-sand/10 border border-heritage-navy/10 rounded-none font-serif italic p-6 leading-relaxed dark:text-white" placeholder="Escreva sobre o seu interesse..." />
                                    </div>
                                    
                                    <div className="p-8 border-2 border-heritage-navy/10 bg-heritage-sand/5 space-y-4">
                                        <label className="flex items-start gap-6 cursor-pointer">
                                            <input type="checkbox" checked={formData.aceitaTermos} onChange={e => updateFormData('aceitaTermos', e.target.checked)} className="mt-1 w-5 h-5 border-2 border-heritage-navy rounded-none text-heritage-navy focus:ring-0" />
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy block">Termo de Responsabilidade</span>
                                                <p className="text-[10px] leading-relaxed text-heritage-navy/50 font-serif italic">
                                                    Declaro sob compromisso de honra que a informação prestada é expressão da verdade e autorizo o seu processamento institucional no âmbito do processo de seleção do Bureau Social.
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Wizard controls */}
                        <div className="mt-16 pt-12 border-t-2 border-heritage-navy flex justify-between items-center">
                            <div className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/30">
                                Bureau Social // Arquivo {new Date().getFullYear()}
                            </div>
                            <div className="flex gap-4">
                                {currentStep < steps.length ? (
                                    <Magnetic>
                                        <button
                                            onClick={handleNext}
                                            className="h-16 px-12 bg-heritage-navy text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-heritage-terracotta transition-all flex items-center gap-4 dark:bg-white dark:text-heritage-navy"
                                        >
                                            Prosseguir <LucideArrowRight className="w-4 h-4" />
                                        </button>
                                    </Magnetic>
                                ) : (
                                    <Magnetic>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!formData.aceitaTermos}
                                            className="h-16 px-12 bg-heritage-success text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-heritage-navy transition-all flex items-center gap-4 disabled:opacity-30"
                                        >
                                            Submeter Dossier <LucideSend className="w-4 h-4" />
                                        </button>
                                    </Magnetic>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
