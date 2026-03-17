import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideUser, LucideMail, LucidePhone, LucideMapPin, LucideShield, LucideEdit, LucideSave, LucideX, LucideCamera, LucideArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { logSystemError } from "@/lib/errorLogger"
import { Grain } from "@/components/ui/Grain"

export default function Profile() {
    const { user, profile, refreshProfile } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        full_name: profile?.full_name || "",
        phone: profile?.phone || "",
        nif: profile?.nif || ""
    })

    const displayName = profile?.full_name || "Utilizador"
    const displayRole = profile?.role === 'admin' ? 'Administrador' : (profile?.role === 'member' ? 'Associado Confirmado' : 'Pendente')
    const displayEmail = profile?.email || user?.email || "Sem email"
    const displayPhone = profile?.phone || "Não definido"
    const displayNif = profile?.nif || "Não definido"
    const displayMemberNumber = profile?.member_number || "Não atribuído"
    const displayCategory = profile?.member_category || "Não definido"

    const handleEdit = () => {
        setFormData({
            full_name: profile?.full_name || "",
            phone: profile?.phone || "",
            nif: profile?.nif || ""
        })
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const handleSave = async () => {
        if (!profile?.id) return

        setIsSaving(true)
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.full_name,
                    phone: formData.phone,
                    nif: formData.nif
                })
                .eq('id', profile.id)

            if (error) throw error

            await refreshProfile()
            setIsEditing(false)
            toast.success('Perfil atualizado com sucesso!')
        } catch (error: any) {
            console.error('Erro ao salvar perfil:', error)
            toast.error('Erro ao salvar perfil')
            logSystemError(error, 'Profile.handleSave', profile?.id)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8f6f0] dark:bg-zinc-950 relative overflow-hidden font-sans pb-24">
            <Grain opacity={0.04} />
            
            <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10 space-y-12">
                {/* Header - Editorial Style */}
                <header className="border-b-2 border-heritage-navy dark:border-white pb-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-3xl space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta">Registo Institucional</span>
                                <div className="h-px flex-1 bg-heritage-navy/10 dark:bg-white/10" />
                            </div>
                            <h1 className="text-6xl md:text-8xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.85] tracking-tighter">
                                Meus <span className="italic text-heritage-ocean">Dados</span>.
                            </h1>
                        </div>
                        <div className="flex gap-4">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        className="h-12 px-8 text-[10px] font-black uppercase tracking-widest border border-heritage-navy/20 text-heritage-navy/60 hover:bg-heritage-navy/5 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="h-12 px-8 text-[10px] font-black uppercase tracking-widest bg-heritage-success text-white hover:bg-heritage-navy transition-all"
                                    >
                                        {isSaving ? 'Gravando...' : 'Gravar Alterações'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEdit}
                                    className="h-12 px-8 text-[10px] font-black uppercase tracking-widest bg-heritage-navy text-white hover:bg-heritage-terracotta transition-all"
                                >
                                    Editar Dossier
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Main Dossier Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="border border-heritage-navy/10 dark:border-white/10 bg-white dark:bg-zinc-900 p-10 md:p-16">
                            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
                                <div className="w-48 h-64 bg-heritage-sand dark:bg-zinc-800 border-2 border-heritage-navy/5 grayscale flex items-center justify-center relative group overflow-hidden shrink-0">
                                    <LucideUser className="w-24 h-24 text-heritage-navy/20" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-heritage-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 cursor-pointer">
                                        <LucideCamera className="w-4 h-4 text-white" />
                                        <span className="text-[10px] font-black uppercase text-white">Alterar Foto</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-8 flex-1 text-center md:text-left pt-2">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-heritage-navy/30">Identificação No Sistema</p>
                                        {isEditing ? (
                                            <Input
                                                value={formData.full_name}
                                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                className="text-4xl font-serif italic bg-transparent border-0 border-b-2 border-heritage-navy/10 rounded-none h-16 px-0 focus-visible:ring-0 focus-visible:border-heritage-terracotta"
                                            />
                                        ) : (
                                            <h2 className="text-5xl font-serif text-heritage-navy dark:text-white transition-all">{displayName}</h2>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                                        <Badge variant="outline" className="rounded-none border-heritage-navy text-heritage-navy font-black text-[9px] uppercase tracking-widest px-4 py-1">{displayRole}</Badge>
                                        <div className="h-4 w-px bg-heritage-navy/10" />
                                        <span className="text-xs font-serif italic text-heritage-navy/60">Associado Nº {displayMemberNumber}</span>
                                    </div>

                                    {!isEditing && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-heritage-navy/5">
                                            {[
                                                { label: "Canal de Contacto", val: displayEmail, icon: LucideMail },
                                                { label: "Terminal Telefónico", val: displayPhone, icon: LucidePhone },
                                                { label: "Sede de Residência", val: "Lisboa, Portugal", icon: LucideMapPin },
                                                { label: "NIF Institucional", val: displayNif, icon: LucideShield }
                                            ].map((item, i) => (
                                                <div key={i} className="space-y-1">
                                                    <p className="text-[9px] font-black uppercase text-heritage-navy/30 tracking-widest flex items-center gap-2">
                                                        <item.icon className="w-3 h-3" /> {item.label}
                                                    </p>
                                                    <p className="text-sm font-serif italic text-heritage-navy/70 truncate">{item.val}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 border-t border-heritage-navy/5">
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Terminal Móvel</Label>
                                        <Input
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+351 900 000 000"
                                            className="rounded-none border-heritage-navy/10 h-12 focus-visible:ring-heritage-terracotta"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Contribuinte Fiscal (NIF)</Label>
                                        <Input
                                            value={formData.nif}
                                            onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                                            placeholder="123456789"
                                            className="rounded-none border-heritage-navy/10 h-12 focus-visible:ring-heritage-terracotta"
                                        />
                                    </div>
                                    <div className="space-y-4 lg:col-span-2">
                                        <p className="text-[10px] font-serif italic text-heritage-navy/40">* Outros dados sensíveis como morada e e-mail institucional devem ser alterados via requerimento à secretaria.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="p-10 border border-heritage-navy/10 space-y-6 hover:bg-white transition-colors duration-500">
                                <h3 className="text-2xl font-serif text-heritage-navy italic">Segurança do Dossier</h3>
                                <p className="text-sm font-serif text-heritage-navy/50 leading-relaxed">Assegure a integridade da sua conta através da renovação periódica da sua chave de acesso encriptada.</p>
                                <button className="w-full py-4 border border-heritage-navy/10 text-[10px] font-black uppercase tracking-widest text-heritage-navy hover:bg-heritage-navy hover:text-white transition-all">Redefinir Password</button>
                            </div>
                            <div className="p-10 border border-heritage-navy/10 space-y-6 hover:bg-white transition-colors duration-500">
                                <h3 className="text-2xl font-serif text-heritage-navy italic">Comunicações</h3>
                                <p className="text-sm font-serif text-heritage-navy/50 leading-relaxed">Configure a recepção física ou digital de editais, convites para assembleia e newsletters culturais.</p>
                                <button className="w-full py-4 border border-heritage-navy/10 text-[10px] font-black uppercase tracking-widest text-heritage-navy hover:bg-heritage-navy hover:text-white transition-all">Preferências de Envio</button>
                            </div>
                        </div>
                    </div>

                    {/* Side Column - Status & Cards */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Membership Card Visual */}
                        <div className="aspect-[1.586/1] w-full bg-heritage-navy p-10 text-white relative flex flex-col justify-between overflow-hidden shadow-2xl">
                             <div className="absolute top-0 right-0 opacity-10 scale-150 -mr-12 -mt-12">
                                <LucideShield className="w-48 h-48" />
                             </div>
                             
                             <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-heritage-gold mb-1">Bureau Social</p>
                                    <p className="text-[8px] font-serif italic opacity-50">Lisboa, Portugal</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Cartão de Sócio</p>
                                </div>
                             </div>

                             <div className="relative z-10">
                                <p className="text-lg font-serif italic mb-1">{displayName}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">NIF {displayNif}</p>
                             </div>

                             <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-4">
                                <div>
                                    <p className="text-[7px] font-black uppercase tracking-widest opacity-30 mb-1">Nº Identificador</p>
                                    <p className="text-xs font-black tracking-widest">{displayMemberNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[7px] font-black uppercase tracking-widest opacity-30 mb-1">Validade</p>
                                    <p className="text-xs font-black tracking-widest">12 / 2026</p>
                                </div>
                             </div>
                        </div>

                        {/* Status Ledger */}
                        <div className="p-10 border border-heritage-navy bg-heritage-navy text-white space-y-8">
                             <div>
                                <h3 className="text-3xl font-serif italic text-heritage-gold leading-tight mb-2">Estado de <br /> Quotas</h3>
                                <Badge className={`${profile?.quota_status === 'active' ? 'bg-heritage-success' : 'bg-heritage-gold'} text-heritage-navy border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-none`}>
                                    {profile?.quota_status === 'active' ? 'Situação Regular' : 'Ações Pendentes'}
                                </Badge>
                             </div>
                             
                             <p className="text-sm font-serif italic text-white/60 leading-relaxed">
                                A sua contribuição permite ao Bureau Social manter o apoio jurídico e técnico às comunidades históricas de Lisboa.
                             </p>

                             <button className="w-full py-4 bg-white text-heritage-navy text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-heritage-gold transition-colors">
                                Liquidar Pendências <LucideArrowRight className="w-4 h-4" />
                             </button>
                             
                             <div className="pt-4 text-center border-t border-white/10">
                                <p className="text-[8px] font-black uppercase tracking-widest opacity-20">Certificado IPSS #2026-X12</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
