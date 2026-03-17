import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { LucideMail, LucideLoader2, LucideShieldCheck } from "lucide-react"
import { Grain } from "@/components/ui/Grain"
import { motion } from "framer-motion"

export default function Auth() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin
            }
        })
        if (error) {
            alert(error.message)
        } else {
            setSent(true)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f6f0] dark:bg-zinc-950 px-6 relative overflow-hidden font-sans">
            <Grain opacity={0.07} />
            
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full border-[40px] border-heritage-navy dark:border-white" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-heritage-navy/20 dark:border-white/10 p-10 md:p-16 relative z-10 shadow-[20px_20px_0px_rgba(28,45,64,0.05)] dark:shadow-[20px_20px_0px_rgba(255,255,255,0.02)]"
            >
                {/* Editorial Header */}
                <div className="border-b-2 border-heritage-navy dark:border-white pb-10 mb-12 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-6">
                        <img src="/logo-symbol.png" alt="Bureau Social" className="w-12 h-12 grayscale" />
                        <div className="w-px h-10 bg-heritage-navy/20 dark:border-white/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-heritage-terracotta">Lisboa, Portugal</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-serif font-medium text-heritage-navy dark:text-white tracking-tighter text-center leading-none">
                        Portal do Associado
                    </h1>
                    <div className="w-full flex items-center justify-between mt-8 text-[9px] font-black uppercase tracking-[0.2em] text-heritage-navy/40 dark:text-white/30 border-t border-heritage-navy/10 dark:border-white/10 pt-4">
                        <span>Acesso Restrito</span>
                        <span>Doc. Ref: BS-2026-AUT</span>
                    </div>
                </div>

                {sent ? (
                    <div className="text-center py-8">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-20 h-20 border border-heritage-navy/10 dark:border-white/10 text-heritage-terracotta rounded-full flex items-center justify-center mx-auto mb-8"
                        >
                            <LucideMail className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-2xl font-serif text-heritage-navy dark:text-white mb-4 italic">Verifique o seu correio institucional.</h3>
                        <p className="text-sm text-heritage-navy/60 dark:text-white/40 leading-relaxed max-w-xs mx-auto mb-10">
                            Enviamos um link seguro de acesso para <br />
                            <span className="font-bold text-heritage-navy dark:text-white underline decoration-heritage-terracotta/30">{email}</span>
                        </p>
                        <button
                            onClick={() => setSent(false)}
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-heritage-navy/40 dark:text-white/40 hover:text-heritage-terracotta transition-colors flex items-center gap-2 mx-auto"
                        >
                            <span className="w-4 h-px bg-current" />
                            Tentar outro endereço
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-heritage-navy/60 dark:text-white/50 block">
                                Credencial de Acesso (Email)
                            </label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="exemplo@bureausocial.pt"
                                    className="w-full bg-transparent border-b-2 border-heritage-navy/10 dark:border-white/10 py-4 text-xl font-serif text-heritage-navy dark:text-white placeholder:text-heritage-navy/10 dark:placeholder:text-white/5 focus:outline-none focus:border-heritage-terracotta transition-colors"
                                    required
                                />
                                <div className="absolute bottom-0 left-0 h-0.5 bg-heritage-terracotta w-0 group-focus-within:w-full transition-all duration-500" />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-heritage-navy dark:bg-white text-white dark:text-heritage-navy hover:bg-heritage-terracotta dark:hover:bg-heritage-terracotta dark:hover:text-white rounded-none font-black uppercase tracking-[0.25em] text-[10px] transition-all"
                        >
                            {loading ? <LucideLoader2 className="w-5 h-5 animate-spin" /> : "Requisitar Código Digital"}
                        </Button>

                        <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.2em] text-heritage-navy/30 dark:text-white/20 border-t border-heritage-navy/5 dark:border-white/5 pt-8">
                            <div className="flex items-center gap-2">
                                <LucideShieldCheck className="w-3 h-3" />
                                <span>Segurança Certificada Bureau</span>
                            </div>
                            <span>v3.4.1</span>
                        </div>
                    </form>
                )}
            </motion.div>
            
            {/* Stamp Effect */}
            <div className="fixed bottom-12 right-12 opacity-10 dark:opacity-20 pointer-events-none select-none -rotate-12 hidden lg:block">
                <div className="w-32 h-32 border-4 border-heritage-terracotta rounded-full flex items-center justify-center p-4">
                    <div className="text-center font-black uppercase text-heritage-terracotta text-[10px] tracking-wider">
                        Aprovado<br />Para Uso<br />Interno
                    </div>
                </div>
            </div>
        </div>
    )
}
