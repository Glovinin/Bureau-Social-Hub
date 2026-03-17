import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LucideMessageSquare, LucideMail, LucidePhone, LucideArrowRight, LucideSend, LucideMapPin, LucideHelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { logSystemError } from "@/lib/errorLogger"
import { Grain } from "@/components/ui/Grain"

export default function Help() {
    return (
        <div className="min-h-screen bg-[#f8f6f0] dark:bg-zinc-950 relative overflow-hidden font-sans">
            <Grain opacity={0.05} />
            
            {/* Header - Editorial Style */}
            <div className="max-w-5xl mx-auto space-y-12 pt-12 mb-20">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta">Gabinete de Atendimento</span>
                    <div className="h-px flex-1 bg-heritage-navy/10" />
                </div>
                
                <h1 className="text-6xl md:text-8xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.85] tracking-tighter">
                    Central de <span className="italic text-heritage-gold">Apoio</span> e Proximidade.
                </h1>
                
                <p className="max-w-2xl text-xl text-heritage-navy/60 dark:text-white/40 font-serif leading-relaxed italic border-l-2 border-heritage-terracotta pl-8 py-2">
                    "O Bureau Social mantém uma estrutura de escuta ativa. Utilize os canais oficiais para garantir a integridade da sua comunicação."
                </p>
            </div>

            {/* Support Channels - Newspaper Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-heritage-navy/10 dark:border-white/10 mb-24">
                {[
                    { icon: LucideMessageSquare, title: "Chat em Direto", desc: "Comunicação síncrona com a nossa equipa de apoio operacional para dúvidas rápidas.", action: "Abrir Mensageiro", color: "text-heritage-ocean" },
                    { icon: LucideMail, title: "Canal Institucional", desc: "Para submissão formal de propostas, documentos e comunicações que exijam arquivo.", action: "Enviar Email", color: "text-heritage-terracotta" },
                    { icon: LucidePhone, title: "Linha de Urgência", desc: "Apoio telefónico crítico disponível para situações que exijam intervenção imediata.", action: "Ligar Agora", color: "text-heritage-gold" }
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-zinc-900/50 p-12 border border-heritage-navy/5 dark:border-white/5 flex flex-col group hover:bg-heritage-navy transition-all duration-500"
                    >
                        <div className={`w-14 h-14 border border-heritage-navy/10 dark:border-white/10 flex items-center justify-center mb-8 ${item.color} group-hover:bg-white transition-all`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-serif font-medium text-heritage-navy dark:text-white mb-4 group-hover:text-white transition-all">{item.title}</h3>
                        <p className="text-sm text-heritage-navy/50 dark:text-white/40 leading-relaxed font-serif italic mb-10 group-hover:text-white/70 transition-all">{item.desc}</p>
                        <button className="mt-auto flex items-center gap-3 text-heritage-navy dark:text-white font-black uppercase tracking-[0.2em] text-[10px] group-hover:text-heritage-gold transition-all">
                            {item.action} <LucideArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-3" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Contact Form Section - Dossier Style */}
            <div className="grid lg:grid-cols-12 gap-16 mb-24">
                <div className="lg:col-span-12 space-y-12">
                    <div className="bg-white dark:bg-zinc-900 border border-heritage-navy/10 dark:border-white/10 p-12 md:p-20 shadow-2xl relative">
                        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-20">
                            <div className="space-y-10">
                                <div>
                                    <h2 className="text-4xl font-serif font-medium text-heritage-navy dark:text-white mb-6">Exposição à Direção</h2>
                                    <p className="text-sm text-heritage-navy/60 dark:text-white/40 leading-relaxed font-serif italic">
                                        Utilize este formulário para enviar críticas, sugestões ou pedidos de esclarecimento diretamente ao Gabinete Executivo. O tempo médio de resposta é de 48 horas úteis.
                                    </p>
                                </div>
                                
                                <form className="space-y-10" onSubmit={async (e) => {
                                    e.preventDefault()
                                    const form = e.target as HTMLFormElement
                                    const subject = (form[0] as HTMLInputElement).value
                                    const message = (form[1] as HTMLTextAreaElement).value

                                    if (!subject || !message) {
                                        toast.error("Preenchimento obrigatório.")
                                        return
                                    }

                                    const loadingToast = toast.loading("Registando exposição...")
                                    try {
                                        const { data: { session: currentSession } } = await supabase.auth.getSession()
                                        const { error } = await supabase
                                            .from('contact_messages')
                                            .insert({
                                                subject,
                                                message,
                                                user_id: currentSession?.user?.id || null,
                                                status: 'open'
                                            })

                                        if (error) throw error

                                        toast.dismiss(loadingToast)
                                        toast.success("Mensagem arquivada com sucesso.")
                                        form.reset()
                                    } catch (error: any) {
                                        toast.dismiss(loadingToast)
                                        toast.error("Erro no envio.")
                                        logSystemError(error, 'Help.contactFormSubmit')
                                    }
                                }}>
                                    <div className="space-y-4">
                                        <div className="border-b border-heritage-navy/10 pb-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Assunto Ref.</label>
                                        </div>
                                        <input
                                            name="subject"
                                            className="w-full bg-transparent h-12 border-0 border-b border-heritage-navy/10 rounded-none px-0 text-lg font-serif italic focus:outline-none focus:border-heritage-terracotta dark:text-white"
                                            placeholder="Descreva o tema principal..."
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="border-b border-heritage-navy/10 pb-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Mensagem Detalhada</label>
                                        </div>
                                        <textarea
                                            name="message"
                                            className="w-full bg-heritage-sand/10 dark:bg-zinc-950/30 p-8 min-h-[250px] border border-heritage-navy/10 focus:outline-none focus:border-heritage-terracotta font-serif italic text-lg leading-relaxed dark:text-white resize-none"
                                            placeholder="Escreva a sua exposição oficial aqui..."
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-16 bg-heritage-navy text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-heritage-terracotta transition-all flex items-center justify-center gap-4 dark:bg-white dark:text-heritage-navy">
                                        Submeter Mensagem <LucideSend className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>

                            <div className="hidden lg:flex flex-col border-l border-heritage-navy/10 pl-20 justify-between">
                                <div className="space-y-12">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 border border-heritage-navy/10 flex items-center justify-center text-heritage-gold">
                                            <LucideMapPin className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-xl font-serif font-medium text-heritage-navy dark:text-white">Presença Local</h4>
                                        <p className="text-xs text-heritage-navy/60 font-serif italic leading-relaxed">
                                            Atendimento presencial sujeito a marcação prévia.<br />
                                            Rua dos Froios, s/n<br />
                                            Alfama, Lisboa
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 border border-heritage-navy/10 flex items-center justify-center text-heritage-ocean">
                                            <LucideHelpCircle className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-xl font-serif font-medium text-heritage-navy dark:text-white">Perguntas Frequentes</h4>
                                        <p className="text-xs text-heritage-navy/60 font-serif italic leading-relaxed">
                                            Consulte o nosso repositório de documentação para respostas imediatas a processos administrativos e estatutários.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-8 bg-heritage-sand/10 border border-heritage-navy/5">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-heritage-navy/40 mb-2">Horário de Funcionamento</p>
                                    <p className="text-sm font-serif italic text-heritage-navy/80 dark:text-white">Segunda a Sexta: 09h00 — 18h00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
