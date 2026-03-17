import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    LucideUser,
    LucideHome,
    LucideBriefcase,
    LucideFileText,
    LucideArrowRight,
    LucideArrowLeft,
    LucideCheck,
    LucideSend,
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

const FormInput = ({ label, error, ...props }: any) => (
    <div className="space-y-2 relative group w-full">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] flex justify-between">
            <span className="text-black/50">{label}</span>
            {error && <span className="text-[#E35238]">{error}</span>}
        </label>
        <input 
            {...props}
            className={`w-full bg-transparent border-0 border-b-2 ${error ? 'border-[#E35238]' : 'border-black/10 hover:border-black/30 focus:border-[#E35238]'} py-3 text-2xl font-serif focus:ring-0 transition-colors outline-none placeholder:italic placeholder:text-black/20 ${props.className || ''}`}
        />
    </div>
)

const FormTextarea = ({ label, error, ...props }: any) => (
    <div className="space-y-4 relative group w-full">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] flex justify-between">
            <span className="text-black/50">{label}</span>
            {error && <span className="text-[#E35238]">{error}</span>}
        </label>
        <textarea 
            {...props}
            className={`w-full min-h-[200px] bg-black/[0.02] border ${error ? 'border-[#E35238]' : 'border-black/10 hover:border-black/20 focus:border-[#E35238]'} p-6 text-xl font-serif focus:ring-0 transition-colors outline-none resize-none placeholder:italic placeholder:text-black/20 ${props.className || ''}`}
        />
    </div>
)

const OptionButton = ({ label, selected, onClick }: any) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-6 py-4 border-2 font-black text-[10px] uppercase tracking-widest transition-all ${selected ? 'border-[#E35238] bg-[#E35238] text-white' : 'border-black/10 text-black/50 hover:border-black/30 hover:text-black'}`}
    >
        {label}
    </button>
)

export default function Candidatura() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const { session } = useAuth()

    // Smooth scroll to top on step change
    useEffect(() => {
        if (currentStep > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [currentStep])

    const getSteps = () => {
        const baseSteps = [{ id: 1, title: "Anexo I", subtitle: "Identificação Pessoal", icon: LucideUser }]
        if (formData.type === 'moradia') baseSteps.push({ id: 2, title: "Anexo II", subtitle: "Condições Habitacionais", icon: LucideHome })
        if (['moradia', 'profissional'].includes(formData.type)) baseSteps.push({ id: 3, title: "Anexo III", subtitle: "Qualificação Técnica", icon: LucideBriefcase })
        baseSteps.push({ id: 4, title: "Anexo IV", subtitle: "Manifesto & Termos", icon: LucideFileText })
        return baseSteps.map((s, i) => ({ ...s, stepIndex: i + 1 }))
    }

    const steps = getSteps()

    const validateStep = (stepIdx: number) => {
        const newErrors: Record<string, string> = {}
        const currentStepObj = steps.find(s => s.stepIndex === stepIdx)
        if (!currentStepObj) return true

        if (currentStepObj.id === 1) {
            if (!formData.nome) newErrors.nome = "Obrigatório"
            if (!formData.dataNascimento) newErrors.dataNascimento = "Obrigatório"
            if (!formData.nif) newErrors.nif = "Obrigatório"
            if (!formData.telefone) newErrors.telefone = "Obrigatório"
            if (!formData.email) newErrors.email = "Obrigatório"
        }
        if (currentStepObj.id === 2) {
            if (formData.agregadoTotal < 1) newErrors.agregadoTotal = "Min 1"
            if (!formData.rendimentosTrabalho) newErrors.rendimentosTrabalho = "Obrigatório"
            if (!formData.condicoesAlojamento) newErrors.condicoesAlojamento = "Selecione uma"
        }
        if (currentStepObj.id === 3) {
            if (!formData.oficio) newErrors.oficio = "Obrigatório"
            if (!formData.descricaoOficio) newErrors.descricaoOficio = "Obrigatório"
        }
        if (currentStepObj.id === 4) {
            if (!formData.motivacao) newErrors.motivacao = "Obrigatório"
        }

        setErrors(newErrors)
        
        if (Object.keys(newErrors).length > 0) {
            toast.error("Por favor, preencha os campos obrigatórios.")
        }
        
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (currentStep === 0) {
            setCurrentStep(1)
        } else {
            if (validateStep(currentStep)) {
                setCurrentStep(prev => prev + 1)
            }
        }
    }

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1)
    }

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => {
                const newErrs = { ...prev }
                delete newErrs[field]
                return newErrs
            })
        }
    }

    const handleSubmit = async () => {
        if (!session) {
            toast.error("Login Necessário", {
                description: "Por favor, autentique-se para submeter o seu processo."
            })
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
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error: any) {
            toast.error("Erro ao enviar dossier")
            logSystemError(error, 'Candidatura.handleSubmit', session?.user?.id)
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#F3F0E6] text-black flex flex-col items-center justify-center p-6 relative font-sans">
                <Grain opacity={0.06} />
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl w-full bg-white p-12 md:p-24 border border-black/10 shadow-2xl relative z-10"
                >
                    {/* Decorative Stamp */}
                    <motion.div 
                        initial={{ scale: 2, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: -10 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
                        className="absolute top-8 right-8 md:top-12 md:right-12 w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-[#3D8C61] flex items-center justify-center text-[#3D8C61] opacity-70 mix-blend-multiply pointer-events-none"
                    >
                        <div className="text-center transform rotate-12 flex flex-col items-center justify-center w-full">
                            <span className="block text-[14px] md:text-[18px] font-black uppercase tracking-widest leading-none mb-1">Aprovado</span>
                            <span className="block text-[10px] md:text-sm font-serif italic border-t-2 border-[#3D8C61] pt-1 px-4">{new Date().toLocaleDateString('pt-PT')}</span>
                        </div>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">Processo<br/><span className="italic text-[#3D8C61]">Integrado.</span></h1>
                    
                    <p className="text-xl md:text-2xl font-serif leading-relaxed text-black/60 pt-8 border-t border-black/10 max-w-xl">
                        A sua submissão na classe <strong className="font-sans font-black text-black uppercase text-sm tracking-widest px-2">{formData.type}</strong> foi arquivada com sucesso. A direção técnica avaliará o seu processo a seu tempo.
                    </p>

                    <div className="mt-16">
                        <Magnetic>
                            <button onClick={() => window.location.href = '/dashboard'} className="h-16 px-12 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#E35238] transition-colors flex items-center justify-center w-max">
                                Regressar ao Dossier
                            </button>
                        </Magnetic>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F3F0E6] text-black font-sans selection:bg-[#E35238] selection:text-white relative overflow-hidden">
            <Grain opacity={0.06} />
            
            {/* Step 0: Editorial Selection */}
            {currentStep === 0 && (
                <main className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10 flex flex-col min-h-screen">
                    <header className="border-b-2 border-black pb-12 mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
                        <div className="space-y-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E35238] flex items-center gap-4">
                                Edição Especial <span className="w-12 h-px bg-[#E35238]"></span> Chamada Pública
                            </span>
                            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-medium leading-[0.85] tracking-tighter">
                                A Nossa <br/>
                                <span className="text-[#E35238] italic pr-8 relative">
                                    Comunidade.
                                </span>
                            </h1>
                        </div>
                        <div className="lg:w-1/3 flex flex-col gap-8">
                            <p className="text-xl md:text-2xl font-serif italic text-black/60 leading-relaxed border-l-2 border-black/20 pl-8">
                                "Propomos um modelo de intervenção onde cada talento é um pilar da estrutura. Escolha a sua modalidade de compromisso."
                            </p>
                            <div className="text-[10px] font-black uppercase tracking-widest text-black/40 pl-8">
                                Lisboa, {new Date().toLocaleDateString('pt-PT')}
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 flex-1 border border-black/10">
                        {[
                            { id: 'moradia', num: 'I', title: 'Moradia Artesãos', desc: 'Para mestres que necessitam de base de vida no centro histórico.' },
                            { id: 'profissional', num: 'II', title: 'Corpo Técnico', desc: 'Para profissionais que procuram parcerias institucionais.' },
                            { id: 'associado', num: 'III', title: 'Associado Efetivo', desc: 'Participação ativa na governança e nos rumos da associação.' },
                            { id: 'voluntario', num: 'IV', title: 'Rede Voluntária', desc: 'Doação de tempo para apoio a projetos de impacto local.' }
                        ].map(type => (
                            <button
                                key={type.id}
                                onClick={() => {
                                    updateFormData('type', type.id as CandidatureType)
                                    handleNext()
                                }}
                                className="bg-[#F3F0E6] p-12 flex flex-col items-start text-left group hover:bg-[#1A1A1A] transition-all duration-700 relative overflow-hidden h-full min-h-[400px]"
                            >
                                <span className="text-8xl font-serif text-black/5 group-hover:text-white/5 mb-auto transition-colors mt-4">{type.num}</span>
                                <div className="mt-16 space-y-4 relative z-10 w-full">
                                    <h3 className="text-3xl font-serif font-medium text-black group-hover:text-white transition-colors">{type.title}</h3>
                                    <p className="text-lg font-serif italic text-black/60 group-hover:text-white/50 leading-relaxed transition-colors">{type.desc}</p>
                                </div>
                                <div className="mt-12 absolute bottom-12 left-12 right-12 opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out flex justify-between items-center text-[10px] uppercase font-black tracking-[0.2em] text-[#E35238]">
                                    <span>Iniciar Dossier</span>
                                    <LucideArrowRight className="w-5 h-5" />
                                </div>
                            </button>
                        ))}
                    </div>
                </main>
            )}

            {/* Step > 0: Document Form Area */}
            {currentStep > 0 && (
                <div className="flex flex-col md:flex-row min-h-screen pt-20 md:pt-24">
                    {/* Sidebar / Document Spine */}
                    <div className="md:w-80 border-r border-black/10 p-8 flex flex-col justify-between hidden md:flex relative z-20 bg-[#F3F0E6] sticky top-0 h-screen">
                        <div>
                            <button onClick={prevStep} className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-[#F3F0E6] transition-colors mb-16">
                                <LucideArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="space-y-4 mb-20">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E35238]">Dossier Oficial</div>
                                <div className="font-serif italic text-black/50 text-base">Processo Orgânico <br/>#{new Date().getFullYear()}/{(Math.random()*1000).toFixed(0).padStart(4,'0')}</div>
                                <div className="inline-block px-3 py-1 bg-black/5 text-[9px] font-black uppercase tracking-widest">
                                    Classe: {formData.type}
                                </div>
                            </div>
                            
                            <div className="space-y-10 relative before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-px before:bg-black/10">
                                {steps.map((s, i) => (
                                    <div key={s.id} className={`flex items-start gap-6 relative z-10 transition-all duration-500 ${currentStep === s.stepIndex ? 'opacity-100 translate-x-1' : 'opacity-40 hover:opacity-70 cursor-pointer'}`}
                                         onClick={() => currentStep > s.stepIndex && setCurrentStep(s.stepIndex)}
                                    >
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center min-w-[2rem] bg-[#F3F0E6] transition-colors ${currentStep === s.stepIndex ? 'border-[#E35238] text-[#E35238]' : currentStep > s.stepIndex ? 'border-black bg-black text-[#F3F0E6]' : 'border-black/20 text-transparent'}`}>
                                            {currentStep > s.stepIndex && <LucideCheck className="w-4 h-4" />}
                                            {currentStep === s.stepIndex && <span className="w-2 h-2 rounded-full bg-[#E35238]"></span>}
                                        </div>
                                        <div className="-mt-1">
                                            <span className={`text-[10px] font-black uppercase tracking-widest block transition-colors ${currentStep === s.stepIndex ? 'text-black' : ''}`}>{s.title}</span>
                                            <span className="font-serif italic text-sm mt-1 block">{s.subtitle}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-[9px] uppercase tracking-widest font-black text-black/30 transform -rotate-90 origin-bottom-left absolute bottom-8 left-16">
                            Confidencial &bull; Bureau Social
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col relative z-10 bg-white min-h-screen">
                        <header className="px-6 py-6 border-b border-black/10 flex justify-between items-center md:hidden bg-[#F3F0E6] sticky top-0 z-30">
                            <button onClick={prevStep} className="w-10 h-10 border border-black/20 flex items-center justify-center hover:bg-black hover:text-[#F3F0E6]">
                                <LucideArrowLeft className="w-4 h-4" />
                            </button>
                            <div className="text-[10px] font-black uppercase tracking-widest">Passo 0{currentStep} / 0{steps.length}</div>
                        </header>

                        <div className="flex-1 w-full max-w-4xl p-8 md:p-16 lg:p-24 pb-40 pt-12 md:pt-16 lg:pt-24">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <header className="mb-20">
                                        <h2 className="text-5xl md:text-7xl font-serif text-black tracking-tight leading-none mb-6">
                                            {steps.find(s => s.stepIndex === currentStep)?.title}.
                                        </h2>
                                        <p className="font-serif italic text-black/50 text-xl md:text-2xl border-l-2 border-[#E35238] pl-6">
                                            {steps.find(s => s.stepIndex === currentStep)?.subtitle}
                                        </p>
                                    </header>

                                    {/* 1. IDENTIFICAÇÃO PESSOAL */}
                                    {steps.find(s => s.stepIndex === currentStep)?.id === 1 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                            <div className="md:col-span-2">
                                                <FormInput label="Nome Completo do Cidadão" value={formData.nome} onChange={(e: any) => updateFormData('nome', e.target.value)} error={errors.nome} placeholder="Escreva o seu nome completo..." />
                                            </div>
                                            <FormInput label="Data de Nascimento" type="date" value={formData.dataNascimento} onChange={(e: any) => updateFormData('dataNascimento', e.target.value)} error={errors.dataNascimento} />
                                            <FormInput label="Número de Identificação Fiscal" value={formData.nif} onChange={(e: any) => updateFormData('nif', e.target.value)} error={errors.nif} placeholder="000 000 000" />
                                            <FormInput label="Terminal de Contacto" value={formData.telefone} onChange={(e: any) => updateFormData('telefone', e.target.value)} error={errors.telefone} placeholder="+351 ..." />
                                            <FormInput label="Correio Eletrónico" type="email" value={formData.email} onChange={(e: any) => updateFormData('email', e.target.value)} error={errors.email} placeholder="endereco@mail.pt" />
                                        </div>
                                    )}

                                    {/* 2. HABITAÇÃO */}
                                    {steps.find(s => s.stepIndex === currentStep)?.id === 2 && (
                                        <div className="space-y-16">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                                <FormInput label="Total de Elementos no Agregado" type="number" min="1" value={formData.agregadoTotal} onChange={(e: any) => updateFormData('agregadoTotal', parseInt(e.target.value))} error={errors.agregadoTotal} />
                                                <FormInput label="Rendimento Líquido Mensal Estimado (€)" type="number" value={formData.rendimentosTrabalho} onChange={(e: any) => updateFormData('rendimentosTrabalho', e.target.value)} error={errors.rendimentosTrabalho} placeholder="0.00" />
                                            </div>
                                            <div className="space-y-6">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] flex justify-between">
                                                    <span className="text-black/50">Classificação Atual da Habitação</span>
                                                    {errors.condicoesAlojamento && <span className="text-[#E35238]">{errors.condicoesAlojamento}</span>}
                                                </label>
                                                <div className="flex flex-wrap gap-4">
                                                    {["Condições de Excelência", "Condições Médias / Razoáveis", "Apresenta Degradação", "Risco Iminente / Precária"].map(opt => (
                                                        <OptionButton 
                                                            key={opt} 
                                                            label={opt} 
                                                            selected={formData.condicoesAlojamento === opt} 
                                                            onClick={() => updateFormData('condicoesAlojamento', opt)} 
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* 3. OFÍCIO */}
                                    {steps.find(s => s.stepIndex === currentStep)?.id === 3 && (
                                        <div className="space-y-16">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                                <FormInput label="Domínio Técnico Praticado" value={formData.oficio} onChange={(e: any) => updateFormData('oficio', e.target.value)} error={errors.oficio} placeholder="Ex: Marcenaria Tradicional, Cantaria..." />
                                                <FormInput label="Anos de Execução da Atividade" type="number" value={formData.anosExperiencia} onChange={(e: any) => updateFormData('anosExperiencia', e.target.value)} error={errors.anosExperiencia} placeholder="0" />
                                            </div>
                                            <FormTextarea label="Descrição Detalhada do Método de Trabalho" value={formData.descricaoOficio} onChange={(e: any) => updateFormData('descricaoOficio', e.target.value)} error={errors.descricaoOficio} placeholder="Descreva os materiais usados, técnicas dominadas e tradição da sua arte..." />
                                        </div>
                                    )}

                                    {/* 4. MOTIVAÇÃO & TERMOS */}
                                    {steps.find(s => s.stepIndex === currentStep)?.id === 4 && (
                                        <div className="space-y-16">
                                            <FormTextarea label="Justificação de Requerimento à Associação" value={formData.motivacao} onChange={(e: any) => updateFormData('motivacao', e.target.value)} error={errors.motivacao} placeholder="Explique os motivos profundos que o trazem a pretender integrar o Bureau Social..." />
                                            
                                            <div className="mt-12 p-8 md:p-10 border border-black border-dashed bg-black/[0.02]">
                                                <label className="flex items-start gap-6 cursor-pointer group">
                                                    <div className="relative pt-1">
                                                        <input type="checkbox" checked={formData.aceitaTermos} onChange={e => updateFormData('aceitaTermos', e.target.checked)} className="peer sr-only" />
                                                        <div className="w-6 h-6 border-2 border-black group-hover:border-[#E35238] peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-colors">
                                                            <LucideCheck className={`w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity`} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black block">Termo de Conformidade e Compromisso Prévio</span>
                                                        <p className="text-sm leading-relaxed text-black/60 font-serif italic">
                                                            Declaro firmemente que a totalidade das declarações prestadas corresponde integralmente à verdade. Concedo à Associação do Bureau Social plena autoridade para o processamento dos meus dados enquadrado no protocolo de ingresso e para os fins exclusivos da sua Direção Técnica.
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Footer Controls */}
                        <div className="fixed bottom-0 md:absolute border-t-2 border-black bg-[#F3F0E6] w-full md:w-auto md:inset-x-0 z-30 p-6 flex justify-between items-center px-6 md:px-12">
                            <div className="hidden md:block">
                                <div className="text-[10px] font-black uppercase tracking-widest text-black/30">
                                    Arquivo Geral da Associação
                                </div>
                            </div>
                            <div className="flex w-full md:w-auto justify-end gap-4">
                                {currentStep < steps.length ? (
                                    <button
                                        onClick={handleNext}
                                        className="w-full md:w-auto h-14 md:h-16 px-10 md:px-16 bg-black text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] hover:bg-[#E35238] transition-all flex items-center justify-center gap-4 group"
                                    >
                                        Avançar Para Assinatura <LucideArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!formData.aceitaTermos}
                                        className="w-full md:w-auto h-14 md:h-16 px-10 md:px-16 bg-[#3D8C61] text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] hover:bg-black transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:hover:bg-[#3D8C61]"
                                    >
                                        Submeter Dossier de Candidatura <LucideSend className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
