import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import { Grain } from "@/components/ui/Grain"
import AnimatedCounter from "@/components/ui/AnimatedCounter"
import BuildingFacade from "@/assets/building-facade.jpg"
import BuildingDetail from "@/assets/building-detail.jpg"

const formatEuro = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

export default function HousingProject() {
  return (
    <div className="flex flex-col w-full bg-[#f8f6f0] dark:bg-zinc-950 min-h-screen relative overflow-hidden font-sans">
      <Grain opacity={0.05} />

      {/* Editorial Hero */}
      <section className="pt-48 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-2 border-heritage-navy dark:border-white pb-12 mb-12">
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta">Plano de Reabilitação</span>
                <div className="h-px flex-1 bg-heritage-navy/10 dark:bg-white/10" />
              </div>
              <h1 className="text-6xl md:text-9xl font-serif font-medium text-heritage-navy dark:text-white leading-[0.85] tracking-tighter">
                Beco dos <br /> <span className="italic">Fróis</span>.
              </h1>
            </div>
            <div className="md:w-72 space-y-4">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">
                <span>Localização</span>
                <span>Lisboa, PT</span>
              </div>
              <p className="text-sm font-serif italic text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                Santa Maria Maior, Nº 1 a 7. Recuperação de imóvel histórico para artesãos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Image & Stats Grid */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 relative">
              <div className="aspect-[16/10] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-heritage-navy/10">
                <img
                  src={BuildingFacade}
                  alt="Fachada Beco dos Fróis"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-heritage-terracotta text-white p-8 hidden md:block w-64 shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Fase: Licenciamento</p>
                <div className="flex items-end gap-2 mb-2">
                  <AnimatedCounter to={35} suffix="%" className="text-5xl font-serif leading-none" />
                </div>
                <Progress value={35} className="h-1 bg-white/20" />
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-12">
                <div className="pb-8 border-b border-heritage-navy/10 dark:border-white/10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-heritage-navy/40 dark:text-white/30 mb-6">Ficha Técnica Oficial</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-serif italic text-heritage-navy/60 dark:text-white/40">Investimento Estimado</span>
                      <span className="text-xl font-serif text-heritage-navy dark:text-white"><AnimatedCounter to={308000} prefix="€ " format={formatEuro} /></span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-serif italic text-heritage-navy/60 dark:text-white/40">Unidades Habitacionais</span>
                      <span className="text-xl font-serif text-heritage-navy dark:text-white">03 + 1 Oficina</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-serif italic text-heritage-navy/60 dark:text-white/40">Prazo de Execução</span>
                      <span className="text-xl font-serif text-heritage-navy dark:text-white"><AnimatedCounter to={20} suffix=" Meses" /></span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-heritage-navy/40 dark:text-white/30">Estado da Candidatura</h3>
                   <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="rounded-none border-heritage-navy/20 text-heritage-navy/60 uppercase text-[9px] px-3 py-1 font-black">Aprovado C.M.L.</Badge>
                      <Badge variant="outline" className="rounded-none border-heritage-navy/20 text-heritage-navy/60 uppercase text-[9px] px-3 py-1 font-black">Co-Financiamento Europeu</Badge>
                   </div>
                </div>
              </div>

              <div className="pt-12">
                <div className="p-8 bg-heritage-navy/5 border border-heritage-navy/10 dark:bg-white/5 dark:border-white/10">
                   <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30 mb-2">Previsão de Obra</p>
                   <p className="text-2xl font-serif italic text-heritage-navy dark:text-white">Janeiro 2027</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-32 px-6 bg-heritage-navy text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-serif leading-none tracking-tighter italic">Intervenção de <br /> Raiz Tradicional</h2>
            <div className="space-y-8 text-white/70 font-serif text-lg leading-relaxed first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-heritage-terracotta">
              <p>
                O projeto prevê a reabilitação integral mantendo a traça original, com introdução de conforto térmico e acústico contemporâneo. O piso térreo será totalmente dedicado a uma oficina de 60-80m², servindo como atelier de artesanato e espaço de exposição.
              </p>
              <p>
                O uso prioritário de materiais locais como a pedra lioz, madeira de pinho e cal hidráulica portuguesa garante a autenticidade da reconstrução, transformando estas habitações num exemplo vivo de património activo.
              </p>
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-square overflow-hidden grayscale border border-white/10">
                <img src={BuildingDetail} alt="Detalhe de Cantaria" className="w-full h-full object-cover" />
             </div>
             <div className="mt-8 grid grid-cols-2 gap-8 divide-x divide-white/10">
                <div className="pl-0">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Área Oficina</p>
                   <p className="text-2xl font-serif italic text-heritage-terracotta">~80m²</p>
                </div>
                <div className="pl-8">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Tipologia</p>
                   <p className="text-2xl font-serif italic text-heritage-terracotta">T1 & T2</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Funding Ledger */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-heritage-terracotta">Transparência Financeira</span>
            <h2 className="text-4xl md:text-6xl font-serif text-heritage-navy dark:text-white tracking-tighter">Budget & Financiamento</h2>
          </div>

          <div className="border border-heritage-navy/20 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-heritage-navy/10 dark:border-white/10">
              <div className="p-10 border-r border-heritage-navy/10 dark:border-white/10 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">Fundos Europeus (<AnimatedCounter to={49} suffix="%" />)</p>
                <p className="text-3xl font-serif text-heritage-navy dark:text-white"><AnimatedCounter to={150920} prefix="€ " format={formatEuro} /></p>
              </div>
              <div className="p-10 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">IHRU (<AnimatedCounter to={26} suffix="%" />)</p>
                <p className="text-3xl font-serif text-heritage-navy dark:text-white"><AnimatedCounter to={80080} prefix="€ " format={formatEuro} /></p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 border-r border-heritage-navy/10 dark:border-white/10 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">C.M. Lisboa (<AnimatedCounter to={16} suffix="%" />)</p>
                <p className="text-3xl font-serif text-heritage-navy dark:text-white"><AnimatedCounter to={49280} prefix="€ " format={formatEuro} /></p>
              </div>
              <div className="p-10 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/30">Mecenato (<AnimatedCounter to={9} suffix="%" />)</p>
                <p className="text-3xl font-serif text-heritage-navy dark:text-white"><AnimatedCounter to={27720} prefix="€ " format={formatEuro} /></p>
              </div>
            </div>
          </div>
          
          <p className="text-[11px] text-heritage-navy/40 dark:text-white/30 leading-relaxed text-center max-w-2xl mx-auto italic font-serif">
            O modelo financeiro garante a sustentabilidade do projecto mantendo rendas sociais entre €150-€350, protegendo a permanência da comunidade artística local.
          </p>
        </div>
      </section>
    </div>
  )
}
