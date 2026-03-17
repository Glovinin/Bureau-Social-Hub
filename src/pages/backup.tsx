import { useState } from "react"
import { Grain } from "@/components/ui/Grain"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import PasswordGate from "@/components/PasswordGate"
import {
    LucideBuilding2, LucideCastle, LucideEuro, LucideCalendarClock, LucideMapPin,
    LucideGraduationCap, LucideHammer, LucideCheckCircle2, LucideStar, LucideTarget,
    LucideAward, LucideArrowRight, LucideArrowDownRight, LucideHistory, LucideHome, LucideLeaf,
    LucideGavel, LucideFileText, LucideShieldCheck, LucideBriefcase, LucideTrendingUp,
    LucideShield, LucideListOrdered, LucideBookOpen, LucideChevronDown
} from "lucide-react"
import ModeloInstitucional from "@/components/visuals/ModeloInstitucional"
import MapaOficios from "@/components/visuals/MapaOficios"
import FinanciamentoVisual from "@/components/visuals/FinanciamentoVisual"
import CronogramaVisual from "@/components/visuals/CronogramaVisual"
import ProcessoOperacional from "@/components/visuals/ProcessoOperacional"

// ── Data (unchanged) ──────────────────────────────────────────────
const oficiosDetalhados = {
    culinaria: [
        { nome: "Culinária Portuguesa Tradicional", duracao: "6 meses", horas: "600h (200h teóricas + 400h práticas)", certificacao: "Cozinheiro Tradicional - Nível 4", aplicacao: "Escola de culinária imersiva na Quinta", descricao: "Formação em gastronomia tradicional portuguesa utilizando os produtos locais da região — o arroz das rias (que só cresce naquela água salobra), o azeite (herança direta do Visconde, maior exportador de azeite), o vinho e o pão artesanal dos moinhos históricos.", competencias: ["Receitas tradicionais da Ria de Aveiro", "Preparação de arroz das rias", "Conservação e cura de alimentos", "Apresentação e serviço"], insercao: "Restaurantes, turismo gastronómico, produção própria" },
        { nome: "Produção de Pão Artesanal", duracao: "4 meses", horas: "400h (120h teóricas + 280h práticas)", certificacao: "Padeiro Artesanal - Nível 3", aplicacao: "Produção nos 11 moinhos históricos da região", descricao: "A região possui 11 moinhos antigos de pão e trigo. A formação recupera as técnicas de panificação artesanal com farinhas moídas em mó de pedra, ligando a tradição milenar ao turismo de experiência.", competencias: ["Moagem em mó de pedra", "Fermentação natural", "Fornos a lenha tradicionais", "Receitas regionais de pão"], insercao: "Padarias artesanais, mercados locais, turismo" },
        { nome: "Produção de Vinho", duracao: "6 meses", horas: "600h (200h teóricas + 400h práticas)", certificacao: "Vinicultor Tradicional - Nível 4", aplicacao: "Aproveitamento do lagar de vinho existente nos anexos", descricao: "A Quinta possui um lagar de vinho nos anexos que era parte da fazenda produtiva original. A formação recupera as técnicas de vinificação tradicional, conectando o saber-fazer ancestral com práticas modernas.", competencias: ["Vinificação artesanal", "Gestão de lagar", "Enologia básica", "Harmonização e degustação"], insercao: "Adegas, enoturismo, produção própria" },
        { nome: "Produção de Azeite", duracao: "4 meses", horas: "400h (120h teóricas + 280h práticas)", certificacao: "Oleicultor - Nível 3", aplicacao: "Restauração do lagar de azeite da Quinta", descricao: "O Visconde de Salreu foi o maior exportador de azeite de Portugal. A formação honra esse legado, ensinando as técnicas de produção, desde o cultivo do olival até à prensagem e armazenamento tradicionais.", competencias: ["Cultivo e poda do olival", "Prensagem tradicional", "Classificação de azeites", "Conservação e embalagem"], insercao: "Produção própria, cooperativas, turismo gastronómico" },
        { nome: "Doceiro Tradicional", duracao: "3 meses", horas: "300h (120h teóricas + 180h práticas)", certificacao: "Doceiro Tradicional - Nível 3", aplicacao: "Produção de doçaria conventual e regional", descricao: "Especializado na produção de doçaria tradicional portuguesa e receitas conventuais da região de Aveiro.", competencias: ["Receitas conventuais", "Ponto de açúcar", "Conservação", "Apresentação criativa"], insercao: "Pastelarias gourmet, produção própria" }
    ],
    botanica: [
        { nome: "Jardineiro de Jardins Históricos", duracao: "6 meses", horas: "600h (240h teóricas + 360h práticas)", certificacao: "Jardineiro Paisagista - Nível 4", aplicacao: "Restauro do jardim histórico (proj. Cristina Castelo Branco)", descricao: "Formação especializada no restauro e manutenção de jardins históricos, baseada no pré-projeto da Profª Cristina Castelo Branco. O jardim contém espécies raras do mundo todo, um lago com ponte, estufas e um jardim de inverno.", competencias: ["Restauro de jardins históricos", "Gestão de coleções botânicas raras", "Recuperação de sistemas de rega por gravidade", "Plano de manejo paisagístico"], insercao: "Quintas históricas, câmaras municipais, jardins botânicos" },
        { nome: "Viveirista e Botânico", duracao: "4 meses", horas: "400h (160h teóricas + 240h práticas)", certificacao: "Viveirista - Nível 3", aplicacao: "Propagação de espécies raras nas estufas da Quinta", descricao: "A Quinta possui duas estufas históricas. O viveirista aprende a propagar e cuidar de espécies botânicas raras trazidas de todo o mundo pelo Visconde, seguindo os levantamentos de flora do naturalista português Brotero.", competencias: ["Propagação de espécies raras", "Gestão de estufas históricas", "Catalogação botânica", "Aclimatação de plantas exóticas"], insercao: "Jardins botânicos, viveiros especializados" },
        { nome: "Agricultor Biológico e Sustentável", duracao: "6 meses", horas: "600h (240h teóricas + 360h práticas)", certificacao: "Agricultor Biológico - Nível 4", aplicacao: "Produção sustentável e sequestro de carbono", descricao: "A Quinta visa tornar-se um modelo de quinta sustentável replicável. A formação inclui técnicas de agricultura biológica, compostagem e sequestro carbónico, transformando o espaço numa referência de sustentabilidade.", competencias: ["Rotação de culturas", "Compostagem", "Sequestro de carbono", "Certificação biológica"], insercao: "Exploração própria, cooperativas, consultoria" },
        { nome: "Apicultor", duracao: "3 meses", horas: "300h (120h teóricas + 180h práticas)", certificacao: "Apicultor - Nível 3", aplicacao: "Produção de mel e serviços de polinização", descricao: "Criação de abelhas e produção de mel, contribuindo para a polinização do jardim histórico e das áreas agrícolas da Quinta.", competencias: ["Gestão de colmeias", "Extração de mel", "Produção de cera", "Polinização"], insercao: "Produção própria, cooperativas" },
        { nome: "Ervanário", duracao: "4 meses", horas: "400h (160h teóricas + 240h práticas)", certificacao: "Ervanário - Nível 3", aplicacao: "Horto de plantas aromáticas e medicinais", descricao: "Cultivo, colheita e preparação de plantas aromáticas e medicinais dentro do ecossistema do jardim histórico.", competencias: ["Cultivo de ervas", "Secagem e conservação", "Preparação de infusões", "Óleos essenciais"], insercao: "Produção própria, herbanárias, mercados locais" }
    ],
    artes: [
        { nome: "Músico — Fila Harmónica", duracao: "6 meses", horas: "600h (200h teóricas + 400h práticas)", certificacao: "Formação Musical - Nível 4", aplicacao: "Concertos nos jardins e estufas da Quinta", descricao: "Em parceria com a Banda Visconde de Salreu (escola de música com espaço físico e alunos de 9 a 90 anos), a formação musical inclui concertos temáticos nos jardins — Vivaldi na primavera, repertório de outono no outono — trazendo vida e cultura ao espaço.", competencias: ["Instrumento musical", "Repertório clássico e popular", "Performance ao ar livre", "Produção de eventos musicais"], insercao: "Bandas filarmónicas, escolas de música, eventos" },
        { nome: "Laceira / Rendeira", duracao: "6 meses", horas: "600h (240h teóricas + 360h práticas)", certificacao: "Rendeira - Nível 4", aplicacao: "Preservação dos rendados da região de Aveiro", descricao: "A região é conhecida pelos seus bordados e rendados tradicionais. A formação preserva esta arte centenária da renda de bilros e outras técnicas regionais específicas da zona de Aveiro.", competencias: ["Renda de bilros", "Bordados regionais", "Design de padrões tradicionais", "Acabamentos finos"], insercao: "Produção própria, lojas de artesanato, turismo" },
        { nome: "Decoração Tradicional Portuguesa", duracao: "4 meses", horas: "400h (160h teóricas + 240h práticas)", certificacao: "Artesão Decorador - Nível 3", aplicacao: "Decoração dos espaços restaurados e das unidades Airbnb", descricao: "Formação em decoração de interiores com técnicas e estéticas tradicionais portuguesas — mosaicos, azulejos, bordados de parede, mobiliário rústico e arranjos florais com espécies do jardim.", competencias: ["Decoração de interiores tradicional", "Restauro de mobiliário", "Azulejaria decorativa", "Arranjos florais"], insercao: "Decoração de quintas, turismo rural, eventos" },
        { nome: "Oleiro / Ceramista", duracao: "6 meses", horas: "600h (240h teóricas + 360h práticas)", certificacao: "Oleiro/Ceramista - Nível 4", aplicacao: "Produção de azulejos e vasos para o jardim", descricao: "Modelação e decoração de peças em barro e cerâmica, incluindo azulejos decorativos para os espaços restaurados.", competencias: ["Torno de oleiro", "Modelação manual", "Vidrados", "Pintura cerâmica"], insercao: "Oficina própria, cooperativas de artesanato" },
        { nome: "Tecelão", duracao: "6 meses", horas: "600h (240h teóricas + 360h práticas)", certificacao: "Tecelão - Nível 4", aplicacao: "Produção de têxteis tradicionais", descricao: "Produção de tecidos em tear manual, seguindo padrões tradicionais da região de Aveiro.", competencias: ["Tear de pedais", "Urdidura", "Padrões tradicionais", "Acabamentos têxteis"], insercao: "Oficinas de artes e ofícios, lojas de artesanato" },
        { nome: "Tanoeiro", duracao: "6 meses", horas: "600h (240h teóricas + 360h práticas)", certificacao: "Tanoeiro - Nível 4", aplicacao: "Produção de vasilhame para o lagar de vinho", descricao: "Produção de vasilhame em madeira (pipas, barris) para vinho, conectando com a tradição vinícola da Quinta.", competencias: ["Seleção de madeiras", "Arqueamento", "Montagem de pipas", "Acabamentos"], insercao: "Adegas, produção própria, decoração" }
    ],
    restauro: [
        { nome: "Pedreiro de Alvenaria Tradicional", duracao: "6 meses", horas: "600h (300h teóricas + 300h práticas)", certificacao: "Pedreiro de Alvenaria Tradicional - Nível 4", aplicacao: "Restauro de muros e estruturas em pedra", descricao: "Domina técnicas centenárias de construção em pedra, utilizando argamassas de cal e técnicas de assentamento para o restauro autêntico dos anexos e muros da Quinta.", competencias: ["Leitura de aparelhos de pedra", "Preparação de argamassas de cal", "Técnicas de rejuntamento", "Consolidação de paredes históricas"], insercao: "Empresas de restauro, trabalho autónomo" },
        { nome: "Carpinteiro de Limpos", duracao: "6 meses", horas: "600h (240h teóricas + 360h práticas)", certificacao: "Carpinteiro de Limpos - Nível 4", aplicacao: "Restauro de caixilharias e elementos em madeira", descricao: "Trabalhos finos de carpintaria para restauro de portas, janelas, lambris e forros dos anexos e do palacete.", competencias: ["Restauro de caixilharias", "Marcenaria tradicional", "Técnicas de ensamblagem", "Acabamentos e vernizes"], insercao: "Marcenarias, empresas de restauro" },
        { nome: "Estucador", duracao: "4 meses", horas: "400h (160h teóricas + 240h práticas)", certificacao: "Estucador Ornamentista - Nível 4", aplicacao: "Recuperação de ornamentos do palacete", descricao: "Criação e restauro de elementos decorativos em estuque — molduras, rosetas, cornijas e ornamentos do palacete.", competencias: ["Preparação de gessos e cales", "Modelação de ornamentos", "Restauro de molduras", "Técnicas de douramento"], insercao: "Restauro de edifícios históricos" },
        { nome: "Calceteiro", duracao: "3 meses", horas: "300h (120h teóricas + 180h práticas)", certificacao: "Calceteiro - Nível 3", aplicacao: "Recuperação de pavimentos e caminhos do jardim", descricao: "Arte de assentar pedras em padrões decorativos para os caminhos e pavimentos do jardim histórico.", competencias: ["Preparação de bases", "Corte de pedra", "Padrões decorativos", "Manutenção de calçadas"], insercao: "Câmaras municipais, empresas de construção" },
        { nome: "Corticeiro — Tirador de Cortiça", duracao: "4 meses", horas: "400h (120h teóricas + 280h práticas)", certificacao: "Corticeiro - Nível 4", aplicacao: "Torre do Carvalhal — Extração sustentável de cortiça", descricao: "O sombreiro (sobreiro) é uma árvore endémica do Alentejo que só começa a dar cortiça aos 60 anos. A extração é uma arte técnica muito específica: se feita incorretamente, mata a árvore. Este saber-fazer está em risco de desaparecimento e é um ofício prioritário para a Torre do Carvalhal.", competencias: ["Técnica de descortiçamento", "Avaliação da maturidade do sobreiro", "Ferramentas tradicionais", "Processamento artesanal de cortiça"], insercao: "Herdades alentejanas, indústria corticeira, turismo rural" }
    ]
}

const quintaSalreuFases = [
    { fase: "1", nome: "Estudo e Projeto", periodo: "Meses 1-4", descricao: "Levantamento arquitetónico, estudo estrutural, projeto de arquitetura, licenciamento e projeto de jardim (Cristina Castelo Branco)", orcamento: "€80.000" },
    { fase: "2", nome: "Estrutura e Cobertura", periodo: "Meses 5-12", descricao: "Consolidação estrutural, substituição de cobertura, reforço de paredes, tratamento de madeiras", orcamento: "€380.000" },
    { fase: "3", nome: "Instalações e Restauro", periodo: "Meses 13-20", descricao: "Instalação técnica (elétrica/encanamento), restauro de fachadas, caixilharia, pavimentos e revestimentos", orcamento: "€340.000" },
    { fase: "4", nome: "Paisagismo e Botânica", periodo: "Meses 18-24", descricao: "Restauro do jardim histórico, infraestrutura de água por gravidade, recuperação botânica de espécies raras", orcamento: "€400.000" }
]

const torreCarvalhalFases = [
    { fase: "1", nome: "Estudo e Projeto", periodo: "Meses 1-6", descricao: "Levantamento técnico, projeto de arquitetura, mapeamento das casas e ermida", orcamento: "€60.000" },
    { fase: "2", nome: "Consolidação", periodo: "Meses 7-18", descricao: "Estabilização estrutural da torre, ermida e casas prioritárias", orcamento: "€250.000" },
    { fase: "3", nome: "Restauro e Formação", periodo: "Meses 18-30", descricao: "Restauro integral, formação em ofícios alentejanos e corticeiros", orcamento: "€400.000" },
    { fase: "4", nome: "Operação", periodo: "Meses 30+", descricao: "Turismo de natureza, cortiça, apicultura e turismo rural nas casas", orcamento: "€90.000/ano" }
]

const financiamento = [
    { fonte: "Fundos Europeus (PRR / Portugal 2030)", total: "€1.400k", items: [{ nome: "PRR — Reabilitação", valor: "€800k", desc: "Reabilitação e restauro de patrimónios históricos" }, { nome: "FEADER/PDR", valor: "€300k", desc: "Agricultura sustentável, montado e jardins" }, { nome: "FSE+ / LIFE", valor: "€300k", desc: "Formação profissional, biodiversidade" }] },
    { fonte: "Portugal (IEFP + Turismo)", total: "€400k", items: [{ nome: "IEFP", valor: "€250k", desc: "Formação profissional — certificação" }, { nome: "Turismo PT", valor: "€150k", desc: "Turismo cultural, experiência imersiva" }] },
    { fonte: "Privado (10%)", total: "€200k", items: [{ nome: "Contrapartida Família", valor: "€150k", desc: "10% de contrapartida exigida" }, { nome: "Mecenato", valor: "€50k", desc: "Donativos com benefícios fiscais" }] }
]

const propostas = [
    { opcao: "A", projeto: "Quinta Salreu", honorarios: "€160.000", investimento: "€2.000.000", taxaGestao: "8%", destaque: false, descricao: "Assessoria para o projeto de experiência imersiva em Estarreja (14 unidades, escola de artes e culinária)" },
    { opcao: "B", projeto: "Torre Carvalhal", honorarios: "TBD", investimento: "TBD", taxaGestao: "8%", destaque: false, descricao: "Assessoria para restauro e formação de corticeiros no Alentejo (ermida, montado, casas rurais)" },
    { opcao: "C", projeto: "Programa Integrado", honorarios: "TBD", investimento: "A partir de €2M", taxaGestao: "6,8%", destaque: true, descricao: "Assessoria integrada Norte-Sul: culinária, botânica, música, cortiça e turismo imersivo." }
]

// ── FadeIn Component ──────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "", direction = "up", triggerOnView = true }: any) => {
    const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0
    const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset, x: xOffset }}
            {...(triggerOnView
                ? { whileInView: { opacity: 1, y: 0, x: 0 }, viewport: { once: true, margin: "-50px" } }
                : { animate: { opacity: 1, y: 0, x: 0 } }
            )}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// ── Section Header Component ──────────────────────────────────────
const SectionHeader = ({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) => (
    <div className="px-4 sm:px-8 md:px-12 py-16 sm:py-24 bg-[#f8f6f0] dark:bg-zinc-950 border-b border-heritage-navy/10 dark:border-white/10">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <FadeIn delay={0.1}>
                <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">{label}</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-heritage-navy dark:text-white tracking-tight" dangerouslySetInnerHTML={{ __html: title }} />
            </FadeIn>
            {subtitle && (
                <FadeIn delay={0.3} direction="left">
                    <p className="text-sm uppercase tracking-widest font-semibold text-heritage-navy/50 dark:text-white/50 max-w-xs sm:text-right">{subtitle}</p>
                </FadeIn>
            )}
        </div>
    </div>
)

// ── Accordion Section ─────────────────────────────────────────────
const ExpandableSection = ({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) => {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className="border-b border-heritage-navy/10 dark:border-white/10">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 px-4 sm:px-8 md:px-12 text-left group hover:bg-[#f3f1ea] dark:hover:bg-zinc-900/50 transition-colors">
                <span className="text-lg sm:text-xl font-serif font-medium text-heritage-navy dark:text-white group-hover:text-heritage-terracotta transition-colors">{title}</span>
                <LucideChevronDown className={`w-5 h-5 text-heritage-navy/40 dark:text-white/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <div className="px-4 sm:px-8 md:px-12 pb-12">{children}</div>}
        </div>
    )
}

// ── Main Component ────────────────────────────────────────────────
export default function Assessoria() {
    return (
        <PasswordGate password="#333" disabled>
            <div className="flex flex-col w-full bg-[#f8f6f0] dark:bg-zinc-950 transition-apple relative overflow-hidden font-sans">
                <Grain opacity={0.09} />

                {/* ═══ HERO ═══ */}
                <section className="relative min-h-[70svh] flex flex-col justify-end px-4 sm:px-8 md:px-12 pb-12 pt-40 overflow-hidden">
                    <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end relative z-10">
                        <div className="lg:col-span-8 space-y-8">
                            <FadeIn delay={0.1} triggerOnView={false}>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-heritage-terracotta" />
                                    <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-heritage-navy/70 dark:text-white/70">Proposta de Assessoria // Confidencial</span>
                                </div>
                            </FadeIn>
                            <FadeIn delay={0.3} triggerOnView={false}>
                                <h1 className="font-serif text-[4.5rem] leading-[0.9] sm:text-[6rem] md:text-[8rem] font-medium text-heritage-navy dark:text-white tracking-tighter">
                                    Preservar o <br /><span className="text-heritage-terracotta italic font-normal">Património Familiar</span>.
                                </h1>
                            </FadeIn>
                        </div>
                        <div className="lg:col-span-4 flex flex-col justify-between h-full border-t border-heritage-navy/20 dark:border-white/20 pt-6 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-12">
                            <FadeIn delay={0.5} direction="left" triggerOnView={false}>
                                <p className="text-xl sm:text-2xl text-heritage-navy/80 dark:text-white/80 leading-snug font-medium mb-12">
                                    Um programa inovador que combina a preservação patrimonial com a formação em ofícios tradicionais portugueses.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.7} direction="left" triggerOnView={false}>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    {[{ val: "€2M+", lab: "Investimento" }, { val: "24–30", lab: "Meses" }, { val: "2", lab: "Projetos" }].map((s, i) => (
                                        <div key={i} className="border border-heritage-navy/10 dark:border-white/10 p-3">
                                            <div className="text-xl sm:text-2xl font-serif font-medium text-heritage-navy dark:text-white">{s.val}</div>
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50">{s.lab}</div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                <div className="w-full border-t border-heritage-navy/10 dark:border-white/10 relative z-20" />

                {/* ═══ O PROGRAMA ═══ */}
                <SectionHeader label="Capítulo I" title="O <span class='italic text-heritage-terracotta font-normal'>Programa</span>." subtitle="Visão Geral do Modelo" />

                <section className="px-4 sm:px-8 md:px-12 py-16 sm:py-24 bg-[#f5f3ec] dark:bg-zinc-900/50 relative z-20">
                    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                        <div className="md:col-span-4 border-l-2 border-heritage-terracotta pl-6">
                            <FadeIn><span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Modelo Integrado</span></FadeIn>
                        </div>
                        <div className="md:col-span-8">
                            <FadeIn delay={0.2}>
                                <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium mb-8">
                                    <span className="float-left text-6xl leading-[0.8] pr-3 pt-2 font-serif text-heritage-terracotta font-medium">O</span>
                                    Programa de Preservação e Restauro é uma iniciativa do IPNS que visa recuperar o património histórico familiar através de um modelo que combina restauro, formação profissional e turismo de experiência imersiva.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 border-t border-heritage-navy/10 dark:border-white/10 pt-8">
                                    {[
                                        { icon: LucideHome, titulo: "Preservação", desc: "Restauro de edifícios, jardins históricos e elementos patrimoniais" },
                                        { icon: LucideGraduationCap, titulo: "Formação", desc: "Culinária, botânica, música, rendas e ofícios tradicionais" },
                                        { icon: LucideLeaf, titulo: "Turismo Imersivo", desc: "14 unidades Airbnb, escola, concertos e sequestro de carbono" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col gap-3">
                                            <div className="w-10 h-10 border border-heritage-navy/20 dark:border-white/20 rounded-full flex items-center justify-center text-heritage-terracotta">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-serif text-lg text-heritage-navy dark:text-white">{item.titulo}</h3>
                                            <p className="text-sm text-heritage-navy/60 dark:text-white/60">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Modelo Institucional + Processo Operacional */}
                <section className="px-4 sm:px-8 md:px-12 py-16 bg-[#f8f6f0] dark:bg-zinc-950 border-y border-heritage-navy/10 dark:border-white/10 relative z-20">
                    <div className="max-w-[1400px] mx-auto space-y-16">
                        <FadeIn><ModeloInstitucional /></FadeIn>
                        <div className="border-t border-heritage-navy/10 dark:border-white/10 pt-16">
                            <FadeIn delay={0.2}><ProcessoOperacional /></FadeIn>
                        </div>
                    </div>
                </section>

                {/* ═══ PROJETOS ═══ */}
                <SectionHeader label="Capítulo II" title="Os <span class='italic text-heritage-terracotta font-normal'>Projetos</span>." subtitle="Norte e Sul de Portugal" />

                {/* Quinta do Visconde de Salreu */}
                <section className="relative z-20 bg-[#f5f3ec] dark:bg-zinc-900/50 border-b border-heritage-navy/10 dark:border-white/10">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                        <div className="md:col-span-5 border-l-2 border-heritage-terracotta pl-6 space-y-6">
                            <FadeIn>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-terracotta">Projeto Principal // Norte</span>
                                <h3 className="font-serif text-4xl sm:text-5xl font-medium text-heritage-navy dark:text-white tracking-tight mt-4">Quinta do Visconde de Salreu</h3>
                                <div className="flex items-center gap-2 text-heritage-navy/60 dark:text-white/50 mt-4 text-sm">
                                    <LucideMapPin className="w-4 h-4" /> Salreu, Estarreja, Aveiro
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="border border-heritage-navy/10 dark:border-white/10 p-3 text-center"><div className="text-2xl font-serif font-medium text-heritage-terracotta">€2M</div><div className="text-[9px] font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mt-1">Investimento</div></div>
                                    <div className="border border-heritage-navy/10 dark:border-white/10 p-3 text-center"><div className="text-2xl font-serif font-medium text-heritage-navy dark:text-white">24m</div><div className="text-[9px] font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mt-1">Duração</div></div>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="md:col-span-7 space-y-8">
                            <FadeIn delay={0.2}>
                                <p className="text-lg text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                    A Quinta do Visconde de Salreu constitui um exemplar notável do património rural português do séc. XIX. O Visconde foi o maior exportador de azeite de Portugal e a quinta era uma fazenda produtiva com lagares de azeite e vinho, queijaria e 11 moinhos na região. O projeto visa transformar a Quinta num espaço de experiência imersiva na cultura tradicional portuguesa.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <div className="space-y-3 border-t border-heritage-navy/10 dark:border-white/10 pt-6">
                                    <span className="text-xs font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50">Fases de Implementação</span>
                                    {quintaSalreuFases.map((f, i) => (
                                        <div key={i} className="flex items-center gap-4 py-3 border-b border-dashed border-heritage-navy/10 dark:border-white/10">
                                            <span className="text-lg font-serif font-medium text-heritage-terracotta w-6 text-center">{f.fase}</span>
                                            <div className="flex-1"><span className="font-medium text-heritage-navy dark:text-white">{f.nome}</span> <span className="text-xs text-heritage-navy/50 dark:text-white/50 ml-2">{f.periodo}</span></div>
                                            <span className="font-serif font-medium text-heritage-terracotta text-sm">{f.orcamento}</span>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Torre do Carvalhal */}
                <section className="relative z-20 bg-[#f8f6f0] dark:bg-zinc-950 border-b border-heritage-navy/10 dark:border-white/10">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                        <div className="md:col-span-5 border-l-2 border-heritage-ocean pl-6 space-y-6">
                            <FadeIn>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-ocean">Projeto Alentejo // Sul</span>
                                <h3 className="font-serif text-4xl sm:text-5xl font-medium text-heritage-navy dark:text-white tracking-tight mt-4">Torre do Carvalhal</h3>
                                <div className="flex items-center gap-2 text-heritage-navy/60 dark:text-white/50 mt-4 text-sm">
                                    <LucideMapPin className="w-4 h-4" /> Santiago do Escoural, Montemor-o-Novo
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="border border-heritage-navy/10 dark:border-white/10 p-3 text-center"><div className="text-2xl font-serif font-medium text-heritage-ocean">600 ha</div><div className="text-[9px] font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mt-1">Montado</div></div>
                                    <div className="border border-heritage-navy/10 dark:border-white/10 p-3 text-center"><div className="text-2xl font-serif font-medium text-heritage-navy dark:text-white">30m</div><div className="text-[9px] font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mt-1">Duração</div></div>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="md:col-span-7 space-y-8">
                            <FadeIn delay={0.2}>
                                <p className="text-lg text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                    A Torre do Carvalhal é um símbolo do poder senhorial na arquitetura manuelino-mudéjar alentejana do séc. XVI. A Ermida possui azulejaria comparável apenas à da Universidade de Évora. A propriedade inclui entre 400 e 600 hectares de montado com sobreiros e azinheiras endémicas, inserida na Rede Natura 2000. O grande diferencial é o ofício do Corticeiro — uma arte técnica em risco de desaparecimento.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <div className="space-y-3 border-t border-heritage-navy/10 dark:border-white/10 pt-6">
                                    <span className="text-xs font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50">Cronograma de Intervenção</span>
                                    {torreCarvalhalFases.map((f, i) => (
                                        <div key={i} className="flex items-center gap-4 py-3 border-b border-dashed border-heritage-navy/10 dark:border-white/10">
                                            <span className="text-lg font-serif font-medium text-heritage-ocean w-6 text-center">{f.fase}</span>
                                            <div className="flex-1"><span className="font-medium text-heritage-navy dark:text-white">{f.nome}</span> <span className="text-xs text-heritage-navy/50 dark:text-white/50 ml-2">{f.periodo}</span></div>
                                            <span className="font-serif font-medium text-heritage-ocean text-sm">{f.orcamento}</span>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ═══ OFÍCIOS ═══ */}
                <SectionHeader label="Capítulo III" title="Os <span class='italic text-heritage-terracotta font-normal'>Ofícios</span>." subtitle="21 Saberes Tradicionais em Risco" />

                <section className="relative z-20 bg-[#f5f3ec] dark:bg-zinc-900/50 border-b border-heritage-navy/10 dark:border-white/10">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 py-12">
                        <FadeIn><MapaOficios /></FadeIn>
                    </div>
                    
                    {/* Ofícios por categoria — expandable */}
                    <div className="max-w-[1400px] mx-auto border-t border-heritage-navy/10 dark:border-white/10">
                        {[
                            { titulo: "Culinária e Gastronomia", oficios: oficiosDetalhados.culinaria },
                            { titulo: "Botânica, Jardinismo e Sustentabilidade", oficios: oficiosDetalhados.botanica },
                            { titulo: "Artes e Ofícios Tradicionais", oficios: oficiosDetalhados.artes },
                            { titulo: "Construção e Restauro", oficios: oficiosDetalhados.restauro }
                        ].map((cat, i) => (
                            <ExpandableSection key={i} title={cat.titulo} defaultOpen={i === 0}>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1400px]">
                                    {cat.oficios.map((oficio, j) => (
                                        <Dialog key={j}>
                                            <DialogTrigger asChild>
                                                <button className="text-left w-full border border-heritage-navy/10 dark:border-white/10 p-5 hover:bg-[#f8f6f0] dark:hover:bg-zinc-900 transition-colors group">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <h4 className="font-serif text-base sm:text-lg text-heritage-navy dark:text-white group-hover:text-heritage-terracotta transition-colors">{oficio.nome}</h4>
                                                            <p className="text-xs text-heritage-navy/50 dark:text-white/40 mt-1">{oficio.aplicacao}</p>
                                                        </div>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-heritage-navy/40 dark:text-white/40 shrink-0 border border-heritage-navy/10 dark:border-white/10 px-2 py-0.5">{oficio.duracao}</span>
                                                    </div>
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl bg-[#f8f6f0] dark:bg-zinc-950 border-heritage-navy/20 dark:border-white/20">
                                                <DialogHeader>
                                                    <DialogTitle className="text-3xl font-serif font-medium text-heritage-navy dark:text-white leading-tight">{oficio.nome}</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-6 mt-4">
                                                    <div className="flex flex-wrap gap-3 text-xs">
                                                        <span className="bg-heritage-terracotta/10 text-heritage-terracotta px-3 py-1 font-bold uppercase tracking-wider">{oficio.duracao}</span>
                                                        <span className="bg-heritage-ocean/10 text-heritage-ocean px-3 py-1 font-bold uppercase tracking-wider">{oficio.certificacao}</span>
                                                    </div>
                                                    <p className="text-heritage-navy/70 dark:text-white/60 leading-relaxed">{oficio.descricao}</p>
                                                    <div className="grid md:grid-cols-2 gap-8 border-t border-heritage-navy/10 dark:border-white/10 pt-6">
                                                        <div className="space-y-3">
                                                            <h4 className="text-xs font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50">Competências</h4>
                                                            <ul className="space-y-2">{oficio.competencias.map((c, k) => (<li key={k} className="flex items-center gap-2 text-sm text-heritage-navy/70 dark:text-white/60"><LucideCheckCircle2 className="w-3.5 h-3.5 text-heritage-success shrink-0" />{c}</li>))}</ul>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div className="border-l-2 border-heritage-terracotta pl-4"><span className="text-xs font-bold uppercase tracking-widest text-heritage-navy/40 dark:text-white/40 block mb-1">Carga Horária</span><span className="font-medium text-heritage-navy dark:text-white text-sm">{oficio.horas}</span></div>
                                                            <div className="border-l-2 border-heritage-ocean pl-4"><span className="text-xs font-bold uppercase tracking-widest text-heritage-navy/40 dark:text-white/40 block mb-1">Inserção Profissional</span><span className="font-medium text-heritage-navy dark:text-white text-sm">{oficio.insercao}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    ))}
                                </div>
                            </ExpandableSection>
                        ))}
                    </div>
                </section>

                {/* ═══ FINANCIAMENTO ═══ */}
                <SectionHeader label="Capítulo IV" title="<span class='italic text-heritage-terracotta font-normal'>Financiamento</span>." subtitle="Arquitetura Financeira Diversificada" />

                <section className="relative z-20 bg-[#f5f3ec] dark:bg-zinc-900/50 border-b border-heritage-navy/10 dark:border-white/10">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 py-16 space-y-16">
                        <FadeIn><FinanciamentoVisual /></FadeIn>
                        <FadeIn delay={0.2}>
                            <div className="grid md:grid-cols-3 gap-8 border-t border-heritage-navy/10 dark:border-white/10 pt-12">
                                {financiamento.map((grupo, i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-heritage-navy/10 dark:border-white/10">
                                            <h3 className="text-sm font-bold text-heritage-navy dark:text-white uppercase tracking-wider">{grupo.fonte}</h3>
                                            <span className="text-heritage-terracotta font-serif font-medium text-lg">{grupo.total}</span>
                                        </div>
                                        {grupo.items.map((item, j) => (
                                            <div key={j} className="flex items-center justify-between py-2 border-b border-dashed border-heritage-navy/10 dark:border-white/10">
                                                <div><p className="font-medium text-sm text-heritage-navy dark:text-white">{item.nome}</p><p className="text-xs text-heritage-navy/50 dark:text-white/40">{item.desc}</p></div>
                                                <span className="font-serif font-medium text-heritage-terracotta text-sm shrink-0 ml-4">{item.valor}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.3}><CronogramaVisual /></FadeIn>
                    </div>
                </section>

                {/* ═══ PROPOSTA ═══ */}
                <SectionHeader label="Capítulo V" title="A <span class='italic text-heritage-terracotta font-normal'>Proposta</span>." subtitle="Opções de Assessoria Técnica" />

                <section className="relative z-20 bg-[#f8f6f0] dark:bg-zinc-950 border-b border-heritage-navy/10 dark:border-white/10">
                    <div className="max-w-[1400px] mx-auto border-x border-heritage-navy/10 dark:border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10">
                            {propostas.map((p, i) => (
                                <FadeIn key={i} delay={0.1 + (i * 0.1)} className={`p-8 sm:p-12 flex flex-col gap-8 ${p.destaque ? 'bg-heritage-navy/5 dark:bg-white/5' : ''}`}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-heritage-terracotta uppercase tracking-[0.2em]">Opção {p.opcao}</span>
                                        {p.destaque && <span className="text-[9px] bg-heritage-terracotta text-white px-3 py-1 uppercase tracking-widest font-bold">Recomendada</span>}
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-serif font-medium text-heritage-navy dark:text-white">{p.projeto}</h3>
                                    <div className="space-y-2 border-t border-heritage-navy/10 dark:border-white/10 pt-6">
                                        <div className="flex justify-between"><span className="text-xs uppercase tracking-widest text-heritage-navy/50 dark:text-white/50">Honorários</span><span className="font-serif font-medium text-heritage-terracotta">{p.honorarios}</span></div>
                                        <div className="flex justify-between"><span className="text-xs uppercase tracking-widest text-heritage-navy/50 dark:text-white/50">Investimento</span><span className="font-serif font-medium text-heritage-navy dark:text-white">{p.investimento}</span></div>
                                        <div className="flex justify-between"><span className="text-xs uppercase tracking-widest text-heritage-navy/50 dark:text-white/50">Taxa Gestão</span><span className="font-serif font-medium text-heritage-navy dark:text-white">{p.taxaGestao}</span></div>
                                    </div>
                                    <p className="text-sm text-heritage-navy/60 dark:text-white/60 leading-relaxed mt-auto">{p.descricao}</p>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* KPIs */}
                    <div className="max-w-[1400px] mx-auto border-x border-t border-heritage-navy/10 dark:border-white/10">
                        <FadeIn className="grid grid-cols-2 md:grid-cols-4 divide-x divide-heritage-navy/10 dark:divide-white/10">
                            {[
                                { val: "14", lab: "Unidades Habitacionais", prazo: "24 meses" },
                                { val: "€1.8M", lab: "Financiamento Captado", prazo: "24 meses" },
                                { val: "30+", lab: "Pessoas Capacitadas", prazo: "24 meses" },
                                { val: "25", lab: "Empregos Criados", prazo: "24 meses" }
                            ].map((kpi, i) => (
                                <div key={i} className="p-8 text-center">
                                    <div className="text-4xl sm:text-5xl font-serif font-medium text-heritage-terracotta">{kpi.val}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mt-3">{kpi.lab}</div>
                                    <div className="text-[9px] uppercase tracking-widest text-heritage-navy/30 dark:text-white/30 mt-1">{kpi.prazo}</div>
                                </div>
                            ))}
                        </FadeIn>
                    </div>

                    {/* Próximos Passos + Contacto */}
                    <div className="max-w-[1400px] mx-auto border-x border-t border-b border-heritage-navy/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10">
                        <FadeIn className="p-8 sm:p-12 space-y-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-terracotta">Próximos Passos</span>
                            {[
                                { num: "01", t: "Aprovação do Plano Mestre" },
                                { num: "02", t: "Orçamentação Torre Carvalhal" },
                                { num: "03", t: "Constituição das Entidades" },
                                { num: "04", t: "Captação de Financiamento" },
                                { num: "05", t: "Início das Obras e Formação" }
                            ].map((p, i) => (
                                <div key={i} className="flex items-center gap-4 py-2 border-b border-dashed border-heritage-navy/10 dark:border-white/10">
                                    <span className="font-serif font-medium text-heritage-terracotta text-lg">{p.num}</span>
                                    <span className="text-sm font-medium text-heritage-navy dark:text-white">{p.t}</span>
                                </div>
                            ))}
                        </FadeIn>
                        <FadeIn delay={0.2} className="p-8 sm:p-12 flex flex-col justify-between gap-8">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-terracotta block mb-6">Contacto</span>
                                <p className="text-heritage-navy/60 dark:text-white/60 text-sm font-medium mb-6">Validade da proposta: <span className="text-heritage-navy dark:text-white font-serif">90 dias</span></p>
                                <p className="font-serif text-lg text-heritage-navy dark:text-white">Diego Rocha</p>
                                <p className="text-sm text-heritage-navy/70 dark:text-white/70 mt-1">dmrdiego@gmail.com</p>
                                <p className="text-sm text-heritage-navy/70 dark:text-white/70">+351 931 721 901</p>
                            </div>
                            <div className="border-t border-heritage-navy/10 dark:border-white/10 pt-6">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-heritage-navy/40 dark:text-white/40 block mb-4">Fontes e Referências</span>
                                {["Transcrição da Reunião (Fev/2026)", "Plano Mestre Bureau Social", "PRR / Portugal 2030 / IEFP", "Cristina Castelo Branco & Parceiros"].map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 py-1.5 text-xs text-heritage-navy/60 dark:text-white/50"><span className="text-heritage-navy/30 dark:text-white/30 font-serif">—</span> {f}</div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </section>

            </div>
        </PasswordGate>
    )
}
