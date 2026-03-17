import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { LucideTrendingUp, LucideCreditCard, LucideCalendar, LucideVote, LucideArrowRight } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Grain } from "@/components/ui/Grain"

const data = [
    { name: 'Jan', value: 400 },
    { name: 'Fev', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Abr', value: 450 },
    { name: 'Mai', value: 600 },
    { name: 'Jun', value: 550 },
]

export default function Dashboard() {
    const { theme } = useTheme();
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const isDark = theme === "dark";
    const [candidatura, setCandidatura] = useState<any>(null)
    const [activeAssembly, setActiveAssembly] = useState<{ id: string, title: string } | null>(null)

    useEffect(() => {
        const fetchDashboardData = async () => {
            const { data: assemblyData } = await supabase
                .from('assemblies')
                .select('id, title')
                .eq('status', 'open_for_voting')
                .single()
            if (assemblyData) setActiveAssembly(assemblyData)

            if (user) {
                const { data: appData } = await supabase
                    .from('candidaturas')
                    .select('*')
                    .eq('user_id', user.id)
                    .single()

                if (appData) setCandidatura(appData)
            }
        }
        fetchDashboardData()
    }, [user])

    const displayName = profile?.full_name || user?.email?.split('@')[0] || "Visitante";
    const displayRole = profile?.role === 'admin' ? 'Administrador' : (profile?.role === 'member' ? 'Membro Confirmado' : 'Visitante / Pendente');

    const quotaStatus = profile?.quota_status === 'active' ? 'Em dia' : (profile?.quota_status === 'late' ? 'Em atraso' : 'Pendente')
    const quotaColor = profile?.quota_status === 'active' ? 'text-heritage-success' : (profile?.quota_status === 'late' ? 'text-red-500' : 'text-heritage-gold')
    const quotaNext = profile?.quota_next_due ? new Date(profile.quota_next_due).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }) : 'Indefinido'

    const getCategoryLabel = (cat: string) => {
        const categories: Record<string, string> = {
            'fundador': 'Sócio Fundador',
            'efetivo': 'Sócio Efetivo',
            'auxiliar': 'Sócio Auxiliar',
            'contribuinte': 'Sócio Contribuinte',
            'coletiva': 'Pessoa Coletiva'
        }
        return categories[cat] || cat;
    }

    return (
        <div className="min-h-screen bg-[#f8f6f0] dark:bg-zinc-950 relative overflow-hidden font-sans pb-20">
            <Grain opacity={0.04} />
            
            <div className="max-w-7xl mx-auto space-y-12 px-6 pt-12 relative z-10">
                {/* Header - Editorial Style */}
                <header className="border-b-2 border-heritage-navy dark:border-white pb-8">
                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-8">
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta mb-4">Painel de Associado • Edição {new Date().getFullYear()}</p>
                           <h1 className="text-5xl md:text-7xl font-serif font-medium text-heritage-navy dark:text-white leading-none tracking-tighter">
                                Bem-vindo, <span className="italic">{displayName}</span>.
                           </h1>
                        </div>
                        <div className="text-right hidden md:block">
                           <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">Data de Acesso</p>
                           <p className="text-xl font-serif italic text-heritage-navy dark:text-white">
                              {new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
                           </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-heritage-navy/10 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">Nível</span>
                            <Badge variant="outline" className="rounded-none border-heritage-navy text-heritage-navy dark:border-white dark:text-white font-black text-[9px] px-3 py-0.5 uppercase tracking-wider">
                                {displayRole}
                            </Badge>
                        </div>
                        {profile?.member_category && (
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">Categoria</span>
                                <span className="text-xs font-serif italic text-heritage-navy dark:text-white">{getCategoryLabel(profile.member_category)}</span>
                            </div>
                        )}
                        <div className="h-4 w-px bg-heritage-navy/10 dark:bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${profile?.quota_status === 'active' ? 'bg-heritage-success' : 'bg-heritage-gold'}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">Status: {profile?.quota_status === 'active' ? 'Associado Ativo' : 'Pendente'}</span>
                        </div>
                    </div>
                </header>

                {/* Urgent Alerts Section */}
                {(activeAssembly || candidatura) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {activeAssembly && (
                            <div className="p-8 border-2 border-heritage-terracotta bg-heritage-terracotta/[0.03] flex flex-col justify-between group cursor-pointer" onClick={() => navigate('/assembleia/live')}>
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <Badge className="bg-heritage-terracotta text-white rounded-none uppercase text-[9px] font-black px-3 py-1 tracking-widest">Assembleia ao Vivo</Badge>
                                        <div className="w-2 h-2 bg-heritage-terracotta rounded-full animate-pulse" />
                                    </div>
                                    <h3 className="text-3xl font-serif text-heritage-navy dark:text-white leading-tight mb-4">{activeAssembly.title}</h3>
                                    <p className="text-sm font-serif italic text-heritage-navy/60 dark:text-white/50 leading-relaxed">Sua participação é fundamental para a governança do Bureau. A votação encontra-se aberta aos associados.</p>
                                </div>
                                <div className="mt-8 flex items-center justify-between group-hover:translate-x-2 transition-transform duration-500">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-heritage-terracotta">Entrar na Sala de Votação</span>
                                    <LucideArrowRight className="w-5 h-5 text-heritage-terracotta" />
                                </div>
                            </div>
                        )}

                        {candidatura && (
                            <div className="p-8 border border-heritage-navy/20 dark:border-white/20 bg-white dark:bg-zinc-900/50 flex flex-col justify-between group cursor-pointer" onClick={() => navigate(`/candidatura/${candidatura.id}`)}>
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <Badge variant="outline" className="border-heritage-navy/20 text-heritage-navy/60 dark:text-white/40 rounded-none uppercase text-[9px] font-black px-3 py-1 tracking-widest">Estado da Candidatura</Badge>
                                        <span className="text-[10px] font-black text-heritage-navy/40 dark:text-white/30 uppercase tracking-widest">#{candidatura.id.substring(0, 8).toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-3xl font-serif text-heritage-navy dark:text-white leading-tight mb-4">Processo em Análise Técnica</h3>
                                    <p className="text-sm font-serif italic text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                                        Submetido em {new Date(candidatura.created_at).toLocaleDateString()}. Aguarde validação pela assembleia de sócios.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center justify-between group-hover:translate-x-2 transition-transform duration-500">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40">Ver Detalhes do Dossier</span>
                                    <LucideArrowRight className="w-5 h-5 text-heritage-navy/40" />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Performance & Metrics ledger */}
                <section className="border-y border-heritage-navy/10 dark:border-white/10 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { title: "Gestão de Quotas", val: quotaStatus, sub: `Vencimento: ${quotaNext}`, icon: LucideCreditCard, color: quotaColor },
                        { title: "Reforestação CO2", val: "120kg", sub: "+12% incremento mensal", icon: LucideTrendingUp, color: "text-heritage-success" },
                        { title: "Agenda Cultural", val: "02 Ativos", sub: "Azulejaria & Cal viva", icon: LucideCalendar, color: "text-heritage-ocean" },
                        { title: "Votação em Curso", val: "01 Disp.", sub: "Projetos de Reabilitação", icon: LucideVote, color: "text-heritage-gold" },
                    ].map((stat, i) => (
                        <div key={i} className="p-8 space-y-4 hover:bg-white dark:hover:bg-zinc-900 transition-colors duration-500">
                            <div className="flex justify-between items-start">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-heritage-navy/40 dark:text-white/30">{stat.title}</span>
                                <stat.icon className={`w-4 h-4 ${stat.color} opacity-40`} />
                            </div>
                            <div>
                                <div className="text-3xl font-serif text-heritage-navy dark:text-white">{stat.val}</div>
                                <p className="text-[10px] font-serif italic text-heritage-navy/40 dark:text-white/30">{stat.sub}</p>
                            </div>
                            {stat.title === "Gestão de Quotas" && profile?.quota_status !== 'active' && (
                                <button
                                    className="w-full mt-4 border border-heritage-gold text-heritage-gold font-black py-2 uppercase text-[9px] tracking-widest hover:bg-heritage-gold hover:text-heritage-navy transition-all"
                                    onClick={() => toast.info("Direcionando para o Stripe...")}
                                >
                                    Regularizar Situação
                                </button>
                            )}
                        </div>
                    ))}
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Infographic Column */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="p-10 border border-heritage-navy/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-serif text-heritage-navy dark:text-white italic">Métricas de Impacto Social</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 mt-1">Acumulado Semestral 2026</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-heritage-navy dark:bg-heritage-gold" />
                                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Projeção</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[300px] w-full mt-8 grayscale hover:grayscale-0 transition-all duration-700">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#ffffff10" : "#0A1F3010"} />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: isDark ? '#ffffff40' : '#0A1F3040', fontSize: 10, fontWeight: 900 }}
                                        />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: isDark ? '#18181b' : '#ffffff',
                                                borderRadius: '0',
                                                border: '1px solid #0A1F3020',
                                                fontFamily: 'serif'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke={isDark ? "#D4AF37" : "#0A1F30"}
                                            strokeWidth={2}
                                            fillOpacity={0.1}
                                            fill={isDark ? "#D4AF37" : "#0A1F30"}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Side Column - Editorial Card */}
                    <div className="lg:col-span-4">
                        <div className="h-full border border-heritage-navy/10 dark:border-white/10 flex flex-col">
                            <div className="aspect-[4/3] overflow-hidden grayscale">
                                <img
                                    src="https://images.unsplash.com/photo-1549492423-40026e6f4770?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover"
                                    alt="Projeto ativo"
                                />
                            </div>
                            <div className="p-8 flex-1 flex flex-col justify-between bg-heritage-navy text-white">
                                <div className="space-y-6">
                                    <Badge className="bg-heritage-terracotta text-white rounded-none border-none px-3 py-1 font-black uppercase text-[9px] tracking-widest">
                                        Obra em Curso
                                    </Badge>
                                    <h3 className="text-4xl font-serif italic leading-none tracking-tight">Rua dos <br /> Fróis.</h3>
                                    <p className="text-white/50 font-serif text-sm leading-relaxed">
                                        A intervenção de reabilitação tradicional portuguesa segue o cronograma aprovado pela Direção Geral do Património.
                                    </p>
                                </div>

                                <div className="pt-12 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Estado da Reabilitação</span>
                                            <span className="text-sm font-serif italic text-heritage-gold">45%</span>
                                        </div>
                                        <Progress value={45} className="h-0.5 bg-white/10" />
                                    </div>
                                    <button className="w-full py-4 border border-white/20 text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-heritage-navy transition-all duration-500">
                                        Consultar Dossier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
