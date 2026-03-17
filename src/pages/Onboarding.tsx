import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideCheck, LucideUserPlus, LucideShieldCheck, LucideLoader2, LucideArrowRight, LucideInfo } from "lucide-react"
import { toast } from "sonner"
import { Grain } from "@/components/ui/Grain"

export default function Onboarding() {
    const { session, profile, refreshProfile } = useAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    // Form fields
    const [fullName, setFullName] = useState("")
    const [nif, setNif] = useState("")
    const [phone, setPhone] = useState("")
    const [acceptedTerms, setAcceptedTerms] = useState(false)

    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || "")
            setNif(profile.nif || "")
            setPhone(profile.phone || "")

            // If already member/admin, redirect to dashboard
            if (profile.role !== 'pending') {
                navigate('/dashboard')
            }
        }
    }, [profile, navigate])

    const handleSubmit = async () => {
        if (!fullName || !nif || !phone) {
            toast.error("Por favor, preencha todos os campos obrigatórios.")
            return
        }

        if (!acceptedTerms) {
            toast.error("Você precisa aceitar os termos de associação.")
            return
        }

        setIsLoading(true)

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    nif: nif,
                    phone: phone,
                    role: 'member', // Promote to member
                    quota_status: 'active'
                })
                .eq('id', session?.user.id)

            if (error) throw error

            toast.success("Cadastro concluído com sucesso!")
            await refreshProfile() // Update context
            navigate('/dashboard')

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
            toast.error("Erro ao salvar perfil", { description: errorMessage })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#f8f6f0] dark:bg-zinc-950 relative overflow-hidden font-sans py-24 px-6 flex items-center justify-center">
            <Grain opacity={0.05} />
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-4xl relative z-10"
            >
                {/* Editorial Header */}
                <div className="text-center mb-16 space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-heritage-navy/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta">Registo Institucional</span>
                        <div className="h-px w-12 bg-heritage-navy/20" />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.85] tracking-tighter">
                        Boas-vindas ao <br />
                        <span className="italic text-heritage-ocean">Bureau Social</span>.
                    </h1>
                    <p className="max-w-xl mx-auto text-heritage-navy/50 font-serif italic text-lg leading-relaxed pt-4">
                        "A nossa força reside no compromisso individual de cada associado com a preservação da dignidade humana e do património cultural de Lisboa."
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-heritage-navy dark:border-white bg-white dark:bg-zinc-900 shadow-2xl">
                    {/* Side Column - Information */}
                    <div className="lg:col-span-4 bg-heritage-navy p-10 text-white space-y-12">
                        <div className="space-y-6">
                            <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                                <LucideShieldCheck className="w-6 h-6 text-heritage-gold" />
                            </div>
                            <h3 className="text-2xl font-serif italic text-heritage-gold">Associação Voluntária</h3>
                            <p className="text-xs font-serif leading-relaxed text-white/60">
                                Ao completar este Dossier, assume o estatuto jurídico de <strong>Associado Voluntário</strong>.
                            </p>
                            <ul className="space-y-4 pt-4 border-t border-white/10">
                                {[
                                    "Isenção de quota anual",
                                    "Direito a voto consultivo",
                                    "Acesso a editais e relatórios",
                                    "Prioridade em candidaturas sociais"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[10px] uppercase font-black tracking-widest text-white/80">
                                        <div className="w-1 h-1 bg-heritage-gold rotate-45" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 mb-2">Protocolo</p>
                            <p className="text-[9px] font-medium leading-relaxed opacity-40 uppercase">A sua informação é processada sob as mais rigorosas normas do RGPD e estatutos da associação.</p>
                        </div>
                    </div>

                    {/* Main Column - Form */}
                    <div className="lg:col-span-8 p-10 md:p-16 space-y-12">
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 gap-12">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-heritage-navy/10 pb-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Identificação No Sistema</Label>
                                        <span className="text-[8px] font-serif italic text-heritage-navy/30">* Obrigatório</span>
                                    </div>
                                    <Input
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                        className="h-14 bg-transparent border-0 border-b-2 border-heritage-navy/10 rounded-none px-0 text-xl font-serif italic focus-visible:ring-0 focus-visible:border-heritage-terracotta translate-y-2 dark:text-white"
                                        placeholder="Introduza o seu nome oficial completo"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-heritage-navy/10 pb-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Contribuinte (NIF)</Label>
                                        </div>
                                        <Input
                                            value={nif}
                                            onChange={e => setNif(e.target.value)}
                                            className="h-10 bg-transparent border-0 border-b-2 border-heritage-navy/10 rounded-none px-0 font-serif italic focus-visible:ring-0 focus-visible:border-heritage-terracotta translate-y-1 dark:text-white"
                                            placeholder="Ex: 123456789"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-heritage-navy/10 pb-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Terminal Telefónico</Label>
                                        </div>
                                        <Input
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            className="h-10 bg-transparent border-0 border-b-2 border-heritage-navy/10 rounded-none px-0 font-serif italic focus-visible:ring-0 focus-visible:border-heritage-terracotta translate-y-1 dark:text-white"
                                            placeholder="Ex: +351 912 345 678"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <label className="group cursor-pointer block select-none">
                                    <div className={`p-8 border-2 transition-all duration-500 flex gap-6 ${acceptedTerms ? 'border-heritage-navy bg-heritage-navy/5' : 'border-heritage-navy/10 hover:border-heritage-navy/30'}`}>
                                        <div className="relative pt-1">
                                            <input
                                                type="checkbox"
                                                checked={acceptedTerms}
                                                onChange={e => setAcceptedTerms(e.target.checked)}
                                                className="w-5 h-5 border-2 border-heritage-navy rounded-none text-heritage-navy focus:ring-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-heritage-navy dark:text-white block underline decoration-heritage-terracotta decoration-2 underline-offset-4 mb-2">
                                                Compromisso de Associação
                                            </span>
                                            <p className="text-[10px] leading-relaxed text-heritage-navy/50 font-serif italic">
                                                Declaro que aceito integralmente os Estatutos da Associação Bureau Social e o seu Regulamento Geral, comprometendo-me a agir com integridade e em defesa do bem comum.
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading || !acceptedTerms}
                                className="w-full h-20 rounded-none bg-heritage-navy text-white font-black text-xs uppercase tracking-[0.4em] hover:bg-heritage-terracotta transition-all shadow-xl group disabled:opacity-30 flex items-center justify-center gap-4 dark:bg-white dark:text-heritage-navy"
                            >
                                {isLoading ? (
                                    <LucideLoader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>Finalizar Registo Vitalício</span>
                                        <LucideArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12 opacity-20">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-heritage-navy">Bureau Social Archiving System & Membership Portal</p>
                </div>
            </motion.div>
        </div>
    )
}
