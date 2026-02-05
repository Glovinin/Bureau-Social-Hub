import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import {
    LucideBuilding2,
    LucideCastle,
    LucideEuro,
    LucideCalendarClock,
    LucideMapPin,
    LucideGraduationCap,
    LucideHammer,
    LucideCheckCircle2,
    LucideStar,
    LucideTarget,
    LucideAward,
    LucideArrowRight,
    LucideHistory,
    LucideHome,
    LucideLeaf,
    LucideGavel,
    LucideFileText,
    LucideShieldCheck,
    LucideBriefcase,
    LucideTrendingUp,
    LucideShield
} from "lucide-react"
import PasswordGate from "@/components/PasswordGate"

// Dados detalhados dos ofícios tradicionais com descrições
const oficiosDetalhados = {
    construcao: [
        {
            nome: "Pedreiro de Alvenaria Tradicional",
            duracao: "6 meses",
            horas: "600h (300h teóricas + 300h práticas)",
            certificacao: "Pedreiro de Alvenaria Tradicional - Nível 4",
            aplicacao: "Restauro de muros e estruturas em pedra",
            descricao: "O pedreiro de alvenaria tradicional domina técnicas centenárias de construção em pedra, utilizando argamassas de cal e técnicas de assentamento que garantem a durabilidade e a autenticidade das construções históricas.",
            competencias: ["Leitura de aparelhos de pedra", "Preparação de argamassas de cal", "Técnicas de rejuntamento", "Consolidação de paredes históricas"],
            insercao: "Empresas de restauro, trabalho autónomo"
        },
        {
            nome: "Estucador",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Estucador Ornamentista - Nível 4",
            aplicacao: "Recuperação de ornamentos do palacete",
            descricao: "O estucador é responsável pela criação e restauro de elementos decorativos em estuque, incluindo molduras, rosetas, cornijas e ornamentos característicos da arquitetura portuguesa dos séculos XVIII e XIX.",
            competencias: ["Preparação de gessos e cales", "Modelação de ornamentos", "Restauro de molduras", "Técnicas de douramento"],
            insercao: "Restauro de edifícios históricos, decoração de interiores"
        },
        {
            nome: "Carpinteiro de Limpos",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Carpinteiro de Limpos - Nível 4",
            aplicacao: "Restauro de caixilharias e elementos em madeira",
            descricao: "Especialista em trabalhos finos de carpintaria, restaura e reproduz elementos de madeira como portas, janelas, lambris e forros. Domina técnicas de marcenaria tradicional.",
            competencias: ["Restauro de caixilharias", "Marcenaria tradicional", "Técnicas de ensamblagem", "Acabamentos e vernizes"],
            insercao: "Marcenarias, empresas de restauro, trabalho autónomo"
        },
        {
            nome: "Calceteiro",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Calceteiro - Nível 3",
            aplicacao: "Recuperação de pavimentos históricos",
            descricao: "Domina a arte de assentar pedras em padrões decorativos, utilizando técnicas que remontam a séculos de tradição (calçada portuguesa).",
            competencias: ["Preparação de bases", "Corte de pedra", "Padrões decorativos", "Manutenção de calçadas"],
            insercao: "Câmaras municipais, empresas de construção"
        },
        {
            nome: "Serralheiro Artístico",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Serralheiro Artístico - Nível 4",
            aplicacao: "Restauro de gradeamentos e portões",
            descricao: "Trabalha o ferro forjado, criando e restaurando portões, gradeamentos e elementos decorativos que caracterizam as quintas e solares portugueses.",
            competencias: ["Forja tradicional", "Soldadura artística", "Restauro de ferragens", "Design de elementos decorativos"],
            insercao: "Empresas de serralharia, restauro, trabalho autónomo"
        },
        {
            nome: "Telhador",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Telhador - Nível 3",
            aplicacao: "Manutenção de coberturas do palacete",
            descricao: "Especializado na execução e reparação de coberturas tradicionais portuguesas, incluindo assentamento de telha e estruturas de madeira.",
            competencias: ["Assentamento de telha", "Estruturas de madeira", "Impermeabilização tradicional", "Reparação de coberturas"],
            insercao: "Empresas de construção, trabalho autónomo"
        },
        {
            nome: "Pintor Decorador",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Pintor Decorador - Nível 4",
            aplicacao: "Restauro de acabamentos decorativos",
            descricao: "Artífice especializado em técnicas decorativas de pintura, incluindo marmoreados, fingidos de madeira e douramento.",
            competencias: ["Marmoreados", "Fingidos de madeira", "Douramento", "Pintura decorativa"],
            insercao: "Restauro de interiores, decoração"
        }
    ],
    jardinagem: [
        {
            nome: "Jardineiro Paisagista",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Jardineiro Paisagista - Nível 4",
            aplicacao: "Manutenção do jardim histórico",
            descricao: "Compreende a evolução dos estilos de jardinagem e as técnicas de manutenção que respeitam o carácter original dos espaços históricos.",
            competencias: ["Poda ornamental", "Gestão de coleções botânicas", "Restauro de canteiros", "Sistemas de rega históricos"],
            insercao: "Empresas de jardinagem, Câmaras Municipais"
        },
        {
            nome: "Viveirista",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Viveirista - Nível 3",
            aplicacao: "Produção de plantas na estufa histórica",
            descricao: "Especializado na propagação e cultivo de plantas em viveiro, incluindo sementeira, estacaria e enxertia.",
            competencias: ["Sementeira", "Estacaria", "Enxertia", "Aclimatação de plantas"],
            insercao: "Viveiros, centros de jardinagem"
        },
        {
            nome: "Podador de Árvores",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Podador de Árvores - Nível 3",
            aplicacao: "Manutenção do arvoredo histórico",
            descricao: "Especializado na poda e manutenção de árvores ornamentais e de fruto, garantindo a segurança e a saúde do arvoredo.",
            competencias: ["Poda de formação", "Poda de manutenção", "Trepa de árvores", "Segurança"],
            insercao: "Manutenção de espaços verdes, trabalho autónomo"
        },
        {
            nome: "Agricultor Biológico",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Agricultor Biológico - Nível 4",
            aplicacao: "Produção agrícola sustentável",
            descricao: "Especializado em técnicas de agricultura sustentável e biológica, incluindo rotação de culturas e compostagem.",
            competencias: ["Rotação de culturas", "Compostagem", "Controlo biológico", "Certificação biológica"],
            insercao: "Exploração própria, cooperativas"
        },
        {
            nome: "Apicultor",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Apicultor - Nível 3",
            aplicacao: "Produção de mel e polinização",
            descricao: "Especializado na criação de abelhas e produção de mel e derivados, garantindo a polinização do jardim e pomar.",
            competencias: ["Gestão de colmeias", "Extração de mel", "Produção de cera", "Polinização"],
            insercao: "Produção própria, cooperativas"
        },
        {
            nome: "Ervanário",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Ervanário - Nível 3",
            aplicacao: "Horto de plantas aromáticas",
            descricao: "Especializado no cultivo, colheita e preparação de plantas aromáticas e medicinais.",
            competencias: ["Cultivo de ervas", "Secagem", "Preparação de infusões", "Óleos essenciais"],
            insercao: "Produção própria, herbanárias"
        }
    ],
    artesanais: [
        {
            nome: "Oleiro / Ceramista",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Oleiro/Ceramista - Nível 4",
            aplicacao: "Produção de azulejos e vasos",
            descricao: "Especializado na modelação e decoração de peças em barro e cerâmica, incluindo azulejos para o jardim.",
            competencias: ["Torno de oleiro", "Modelação manual", "Vidrados", "Pintura cerâmica"],
            insercao: "Oficina própria, cooperativas de artesanato"
        },
        {
            nome: "Cesteiro",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Cesteiro - Nível 3",
            aplicacao: "Produção de cestos para colheitas",
            descricao: "Artífice especializado na produção de cestos e objetos em vime, verga e outras fibras naturais.",
            competencias: ["Cestaria em vime", "Técnicas regionais", "Tratamento de fibras", "Design de objetos"],
            insercao: "Produção própria, mercados de artesanato"
        },
        {
            nome: "Tecelão",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Tecelão - Nível 4",
            aplicacao: "Produção de têxteis tradicionais",
            descricao: "Especializado na produção de tecidos em tear manual, seguindo padrões tradicionais.",
            competencias: ["Tear de pedais", "Urdidura", "Padrões tradicionais", "Acabamentos têxteis"],
            insercao: "Oficinas de artes e ofícios, lojas de artesanato"
        },
        {
            nome: "Bordadeira",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Bordadeira - Nível 3",
            aplicacao: "Produção de peças bordadas",
            descricao: "Especialista em técnicas de bordado tradicional português (Viana, Castelo Branco, etc.).",
            competencias: ["Pontos tradicionais", "Design de padrões", "Seleção de fios", "Acabamentos finos"],
            insercao: "Produção própria, cooperativas"
        },
        {
            nome: "Rendeira",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Rendeira - Nível 4",
            aplicacao: "Produção de rendas",
            descricao: "Preservação da arte centenária da renda de bilros e outras técnicas regionais.",
            competencias: ["Renda de bilros", "Renda de agulha", "Técnicas regionais", "Design de padrões"],
            insercao: "Produção própria, cooperativas"
        },
        {
            nome: "Alfaiate",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Alfaiate - Nível 4",
            aplicacao: "Confeção de trajes tradicionais",
            descricao: "Especializado na confeção de vestuário por medida, incluindo trajes tradicionais para eventos.",
            competencias: ["Corte por medida", "Costura manual", "Alfaiataria tradicional", "Ajustes e moldes"],
            insercao: "Ateliers de costura, teatro, cinema"
        },
        {
            nome: "Tanoeiro",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Tanoeiro - Nível 4",
            aplicacao: "Produção de vasilhame em madeira",
            descricao: "Especializado na produção de vasilhame em madeira (pipas, barris) para vinho e decoração.",
            competencias: ["Seleção de madeiras", "Arqueamento", "Montagem de pipas", "Acabamentos"],
            insercao: "Adegas, produção própria, decoração"
        },
        {
            nome: "Doceiro Tradicional",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Doceiro Tradicional - Nível 3",
            aplicacao: "Produção de doçaria conventual",
            descricao: "Especializado na produção de doçaria tradicional portuguesa e receitas conventuais.",
            competencias: ["Receitas conventuais", "Ponto de açúcar", "Conservação", "Apresentação criativa"],
            insercao: "Pastelarias gourmet, produção própria"
        },
        {
            nome: "Latoeiro",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Latoeiro - Nível 3",
            aplicacao: "Utensílios e elementos decorativos",
            descricao: "Especializado no trabalho de folha de flandres e outros metais para fins utilitários e decorativos.",
            competencias: ["Corte de metais", "Dobragem manual", "Soldadura", "Acabamentos"],
            insercao: "Oficinas de artesanato, feiras"
        }
    ]
}

// Detalhes do projeto Quinta Salreu
const quintaSalreuDetails = {
    historia: {
        titulo: "História da Quinta",
        texto: "A Quinta do Visconde de Salreu foi mandada construir no século XIX por Domingos Joaquim da Silva, 1.º Visconde de Salreu, um empresário madeireiro que fez fortuna no Brasil e regressou à sua terra natal para investir no desenvolvimento local. Em 1907, o Visconde ofereceu um edifício escolar à freguesia de Salreu, demonstrando o seu compromisso com a comunidade. A quinta compreende um palacete com torre, um jardim histórico de estilo romântico com elementos construídos característicos da época, coleções botânicas de espécies exóticas trazidas das viagens do Visconde, e uma área agrícola significativa com vista panorâmica para a Ria de Aveiro."
    },
    patrimonio: {
        titulo: "Património a Preservar",
        elementos: [
            { nome: "Palacete com Torre", estado: "Necessita manutenção", descricao: "Edifício principal de arquitetura oitocentista com torre panorâmica" },
            { nome: "Jardim Histórico", estado: "Degradado", descricao: "Jardim de estilo romântico com espécies exóticas raras" },
            { nome: "Estufa e Viveiro", estado: "Degradado", descricao: "Estruturas de apoio à produção de plantas" },
            { nome: "Pérgulas e Estruturas", estado: "Degradado", descricao: "Elementos arquitetónicos do jardim" },
            { nome: "Sistema Hidráulico", estado: "Urgente", descricao: "Reservatórios de água e rede de saneamento" }
        ]
    },
    fases: [
        { fase: "1", nome: "Constituição", periodo: "1º Semestre 2026", descricao: "Criação da associação local, assinatura de contratos e termo de cooperação com IPNS", orcamento: "€15.000" },
        { fase: "2", nome: "Diagnóstico", periodo: "2º Semestre 2026", descricao: "Levantamento técnico completo, mapeamento de competências, preparação de candidaturas", orcamento: "€25.000" },
        { fase: "3", nome: "Formação", periodo: "2027", descricao: "Captação de mestres artesãos, recrutamento e formação de aprendizes locais", orcamento: "€120.000" },
        { fase: "4", nome: "Execução", periodo: "2027-2028", descricao: "Trabalhos de restauro com participação dos aprendizes formados", orcamento: "€350.000" },
        { fase: "5", nome: "Operação", periodo: "2028+", descricao: "Abertura ao público, centro de formação, comercialização de produtos", orcamento: "€80.000/ano" }
    ],
    impacto: [
        { indicador: "Pessoas Formadas", valor: "50", descricao: "Artesãos locais formados em ofícios tradicionais até 2028" },
        { indicador: "Empregos Criados", valor: "15", descricao: "Postos de trabalho diretos permanentes" },
        { indicador: "Área Restaurada", valor: "500 m²", descricao: "Elementos patrimoniais recuperados" },
        { indicador: "Visitantes/Ano", valor: "8.000", descricao: "Estimativa de turismo cultural após abertura" }
    ],
    modelo: {
        titulo: "Modelo Institucional",
        pilares: [
            { nome: "Família Proprietária", descricao: "Mantém a titularidade do imóvel e constitui uma associação local para gerir o património" },
            { nome: "Associação Local (APQVS)", descricao: "Arrendatária e gestora, responsável pela execução do projeto" },
            { nome: "IPNS - Bureau Social", descricao: "Parceiro estratégico, fornece apoio técnico, formação e acesso a redes de financiamento" }
        ]
    }
}

const propostas = [
    { opcao: "A", projeto: "Quinta Salreu", honorarios: "€77.450", desconto: "—", destaque: false, descricao: "Assessoria exclusiva para o projeto da Quinta do Visconde de Salreu" },
    { opcao: "B", projeto: "Torre Carvalhal", honorarios: "€105.850", desconto: "—", destaque: false, descricao: "Assessoria exclusiva para o projeto da Torre do Carvalhal" },
    { opcao: "C", projeto: "Programa Integrado", honorarios: "€170.805", desconto: "15%", destaque: true, descricao: "Assessoria simultânea para ambos os projetos com sinergias e economia" }
]

const financiamento = [
    {
        fonte: "União Europeia", total: "€750k", items: [
            { nome: "LIFE", valor: "€300k", descricao: "Biodiversidade e restauro de jardins históricos" },
            { nome: "FEADER/PDR", valor: "€300k", descricao: "Agricultura sustentável e desenvolvimento rural" },
            { nome: "FSE+", valor: "€150k", descricao: "Formação profissional e inclusão social" }
        ]
    },
    {
        fonte: "Portugal", total: "€200k", items: [
            { nome: "Turismo PT", valor: "€150k", descricao: "Turismo cultural e patrimonial" },
            { nome: "Autarquias", valor: "€50k", descricao: "Apoio ao desenvolvimento local" }
        ]
    },
    {
        fonte: "Privado", total: "€360k", items: [
            { nome: "Mecenato", valor: "€80k", descricao: "Donativos com benefícios fiscais" },
            { nome: "Fundos Próprios", valor: "€280k", descricao: "Investimento da família proprietária" }
        ]
    }
]

const funcionamentoDetails = {
    modalidades: [
        { titulo: "Formação Inicial", duracao: "3 a 6 meses", objetivo: "Destinada a pessoas sem experiência prévia no ofício.", icon: LucideGraduationCap },
        { titulo: "Aperfeiçoamento", duracao: "1 a 3 meses", objetivo: "Para profissionais que pretendam atualizar ou aprofundar competências.", icon: LucideTrendingUp },
        { titulo: "Contexto de Trabalho", duracao: "Variável", objetivo: "Estágios práticos nos trabalhos de restauro da própria Quinta.", icon: LucideBriefcase }
    ],
    componentes: [
        { label: "Teórica", percent: "20%", desc: "Conhecimentos técnicos, históricos e culturais." },
        { label: "Prática", percent: "70%", desc: "Execução de trabalhos sob supervisão de mestres artesãos." },
        { label: "Projeto", percent: "10%", desc: "Trabalho final demonstrando competências adquiridas." }
    ],
    apoios: ["Bolsa de formação mensal", "Subsídio de transporte", "Subsídio de alimentação", "Seguro de acidentes pessoais"]
}

const governancaDetails = {
    niveis: [
        { pilar: "Sócios Fundadores", papel: "Família proprietária. Detém direito de veto em admissões e garante o DNA do projeto." },
        { pilar: "APQVS (Associação)", papel: "Entidade gestora e arrendatária. Responsável pela execução e contratos locais." },
        { pilar: "IPNS (Bureau Social)", papel: "Parceiro estratégico. Captação de recursos, mestres e gestão de impacto." }
    ],
    estatutos: [
        "Natureza jurídica sem fins lucrativos",
        "Resultados integralmente reinvestidos nos fins estatutários",
        "Mandatos de 3 anos para órgãos sociais",
        "Presidente da Direção obrigatoriamente um Sócio Fundador"
    ]
}

const kpiDetails = [
    { meta: "Constituição Associações", kpi: "2 entidades", prazo: "6 meses", icon: LucideFileText },
    { meta: "Financiamento Captado", kpi: "€750.000", prazo: "24 meses", icon: LucideEuro },
    { meta: "Mestres Recrutados", kpi: "10 especialistas", prazo: "18 meses", icon: LucideAward },
    { meta: "Formandos Certificados", kpi: "30 aprendizes", prazo: "24 meses", icon: LucideCheckCircle2 }
]

export default function Assessoria() {
    const [activeTab, setActiveTab] = useState("programa")

    return (
        <PasswordGate password="#333">
            <div className="flex flex-col w-full min-h-screen bg-background">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-mesh opacity-30 dark:opacity-10" />
                    <div className="absolute top-20 right-20 w-96 h-96 bg-heritage-terracotta/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-20 w-64 h-64 bg-heritage-ocean/10 rounded-full blur-[100px]" />

                    <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <Badge className="bg-heritage-gold/20 text-heritage-gold border-heritage-gold/30 px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest mb-6">
                                Proposta de Assessoria Técnica
                            </Badge>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-5xl md:text-7xl font-black text-heritage-navy dark:text-white leading-[0.95] tracking-tighter">
                            Preservar o <br />
                            <span className="text-heritage-terracotta">Património Familiar</span>.
                        </motion.h1>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}
                            className="text-xl md:text-2xl text-heritage-navy/50 dark:text-white/40 max-w-3xl mx-auto font-medium">
                            Um programa inovador que combina a preservação patrimonial com a formação em ofícios tradicionais portugueses, gerando impacto social, ambiental e económico.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-wrap justify-center gap-6 pt-8">
                            <div className="glass-card px-8 py-4 rounded-2xl flex items-center gap-3">
                                <LucideEuro className="w-6 h-6 text-heritage-terracotta" />
                                <div className="text-left">
                                    <p className="text-2xl font-black text-heritage-navy dark:text-white">€1.310.000</p>
                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40 font-bold uppercase tracking-wider">Investimento Total</p>
                                </div>
                            </div>
                            <div className="glass-card px-8 py-4 rounded-2xl flex items-center gap-3">
                                <LucideCalendarClock className="w-6 h-6 text-heritage-ocean" />
                                <div className="text-left">
                                    <p className="text-2xl font-black text-heritage-navy dark:text-white">42 Meses</p>
                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40 font-bold uppercase tracking-wider">Duração Integrada</p>
                                </div>
                            </div>
                            <div className="glass-card px-8 py-4 rounded-2xl flex items-center gap-3">
                                <LucideBuilding2 className="w-6 h-6 text-heritage-gold" />
                                <div className="text-left">
                                    <p className="text-2xl font-black text-heritage-navy dark:text-white">2 Projetos</p>
                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40 font-bold uppercase tracking-wider">Norte + Sul</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Tabs Navigation */}
                <section className="px-6 pb-20">
                    <div className="max-w-7xl mx-auto">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-12">
                                {[
                                    { value: "programa", label: "O Programa", icon: LucideTarget },
                                    { value: "quinta", label: "Quinta Salreu", icon: LucideBuilding2 },
                                    { value: "torre", label: "Torre Carvalhal", icon: LucideCastle },
                                    { value: "oficios", label: "Ofícios", icon: LucideHammer },
                                    { value: "funcionamento", label: "Funcionamento", icon: LucideTrendingUp },
                                    { value: "governanca", label: "Governança", icon: LucideGavel },
                                    { value: "proposta", label: "Proposta & KPIs", icon: LucideStar },
                                    { value: "financiamento", label: "Financiamento", icon: LucideEuro },
                                ].map((tab) => (
                                    <TabsTrigger key={tab.value} value={tab.value}
                                        className="data-[state=active]:bg-heritage-navy data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-heritage-navy px-6 py-3 rounded-2xl font-bold text-sm transition-all">
                                        <tab.icon className="w-4 h-4 mr-2" />
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {/* TAB: O Programa */}
                            <TabsContent value="programa" className="space-y-12">
                                {/* Visão Geral */}
                                <div className="glass-card p-10 rounded-[40px] space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-heritage-terracotta/10 flex items-center justify-center shrink-0">
                                            <LucideTarget className="w-7 h-7 text-heritage-terracotta" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-heritage-navy dark:text-white mb-4">O Que é o Programa</h2>
                                            <p className="text-lg text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                                                O <strong>Programa de Preservação e Restauro</strong> é uma iniciativa do Instituto Português de Negócios Sociais (IPNS) que visa recuperar o património histórico familiar através de um modelo inovador que combina:
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                                        {[
                                            { icon: LucideHome, titulo: "Preservação Patrimonial", desc: "Restauro de edifícios, jardins e elementos históricos utilizando técnicas tradicionais que respeitam a autenticidade" },
                                            { icon: LucideGraduationCap, titulo: "Formação Profissional", desc: "Capacitação da comunidade local em ofícios tradicionais portugueses em risco de desaparecimento" },
                                            { icon: LucideLeaf, titulo: "Sustentabilidade", desc: "Modelo de operação que gera receitas próprias através de turismo, formação e comercialização de produtos" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-heritage-sand/30 dark:bg-white/5 p-6 rounded-3xl">
                                                <item.icon className="w-10 h-10 text-heritage-terracotta mb-4" />
                                                <h3 className="font-black text-lg text-heritage-navy dark:text-white mb-2">{item.titulo}</h3>
                                                <p className="text-sm text-heritage-navy/60 dark:text-white/50">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Como Funciona */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Como Funciona</h3>
                                    <div className="space-y-6">
                                        {[
                                            { num: "1", titulo: "Constituição da Associação Local", desc: "A família proprietária constitui uma associação sem fins lucrativos que assume a gestão do património através de contrato de arrendamento." },
                                            { num: "2", titulo: "Parceria com o IPNS", desc: "O Instituto Português de Negócios Sociais atua como parceiro estratégico, fornecendo apoio técnico na captação de mestres artesãos e na gestão de projetos." },
                                            { num: "3", titulo: "Captação de Financiamento", desc: "Candidatura a fundos europeus (LIFE, FEADER, FSE+) e nacionais, complementados por mecenato e receitas próprias." },
                                            { num: "4", titulo: "Formação e Restauro", desc: "Mestres artesãos formam aprendizes locais que executam os trabalhos de restauro sob supervisão, aprendendo na prática." },
                                            { num: "5", titulo: "Operação Sustentável", desc: "Após o restauro, o espaço abre ao público para visitas, eventos e formação, gerando receitas que garantem a sustentabilidade." }
                                        ].map((step) => (
                                            <div key={step.num} className="flex gap-6">
                                                <div className="w-12 h-12 rounded-full bg-heritage-terracotta text-white flex items-center justify-center font-black text-lg shrink-0">
                                                    {step.num}
                                                </div>
                                                <div className="pt-2">
                                                    <h4 className="font-black text-heritage-navy dark:text-white mb-1">{step.titulo}</h4>
                                                    <p className="text-sm text-heritage-navy/60 dark:text-white/50">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Modelo Institucional Visual */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Modelo Institucional</h3>
                                    <img src="/assessoria/fluxograma_programa_integrado.png" alt="Modelo Institucional" className="w-full rounded-3xl" />
                                </div>

                                {/* Equipa */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Equipa de Projeto</h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {[
                                            { nome: "António José Alves Caixeiro", cargo: "Coordenador Geral", dedicacao: "20%", bio: "Fundador do IPNS, com vasta experiência em projetos de impacto social" },
                                            { nome: "Diego Mendes da Rocha", cargo: "Gestor de Projetos", dedicacao: "60%", bio: "Especialista em gestão de projetos e desenvolvimento comunitário" },
                                            { nome: "Fabiana Berne", cargo: "Responsável Financeiro", dedicacao: "20%", bio: "Experiência em contabilidade e gestão financeira de IPSS" }
                                        ].map((membro, i) => (
                                            <div key={i} className="bg-heritage-sand/30 dark:bg-white/5 p-6 rounded-2xl">
                                                <p className="font-black text-heritage-navy dark:text-white text-lg">{membro.nome}</p>
                                                <p className="text-heritage-terracotta font-bold mb-2">{membro.cargo}</p>
                                                <p className="text-sm text-heritage-navy/60 dark:text-white/50 mb-3">{membro.bio}</p>
                                                <Badge className="bg-heritage-terracotta/10 text-heritage-terracotta border-none">{membro.dedicacao} Dedicação</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TAB: Quinta Salreu (Detalhada) */}
                            <TabsContent value="quinta" className="space-y-12">
                                {/* Header do Projeto */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-10">
                                        <div className="flex-1 space-y-6">
                                            <Badge className="bg-heritage-terracotta/10 text-heritage-terracotta border-none uppercase tracking-widest text-[10px] font-black">
                                                Projeto Principal
                                            </Badge>
                                            <h2 className="text-4xl font-black text-heritage-navy dark:text-white">Quinta do Visconde de Salreu</h2>
                                            <div className="flex items-center gap-2 text-heritage-navy/60 dark:text-white/40">
                                                <LucideMapPin className="w-5 h-5" />
                                                <span className="font-medium">Freguesia de Salreu, Estarreja, Aveiro</span>
                                            </div>
                                            <p className="text-lg text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                                                Exemplar notável do património rural português do século XIX, propriedade do Visconde de Salreu desde a sua construção.
                                            </p>
                                        </div>
                                        <div className="flex gap-8">
                                            <div className="text-center">
                                                <p className="text-4xl font-black text-heritage-terracotta">€590.000</p>
                                                <p className="text-sm font-bold text-heritage-navy/40 dark:text-white/40 uppercase">Investimento</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-4xl font-black text-heritage-navy dark:text-white">30 meses</p>
                                                <p className="text-sm font-bold text-heritage-navy/40 dark:text-white/40 uppercase">Duração</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* História */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <div className="flex items-start gap-4 mb-6">
                                        <LucideHistory className="w-8 h-8 text-heritage-terracotta shrink-0" />
                                        <h3 className="text-2xl font-black text-heritage-navy dark:text-white">História da Quinta</h3>
                                    </div>
                                    <p className="text-heritage-navy/70 dark:text-white/60 leading-relaxed text-lg">
                                        {quintaSalreuDetails.historia.texto}
                                    </p>
                                </div>

                                {/* Património */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Património a Preservar</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {quintaSalreuDetails.patrimonio.elementos.map((elem, i) => (
                                            <div key={i} className="bg-heritage-sand/30 dark:bg-white/5 p-5 rounded-2xl">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-black text-heritage-navy dark:text-white">{elem.nome}</h4>
                                                    <Badge variant="outline" className={
                                                        elem.estado === "Urgente" ? "border-red-500 text-red-500" :
                                                            elem.estado === "Degradado" ? "border-amber-500 text-amber-500" :
                                                                "border-heritage-navy/30 text-heritage-navy/60"
                                                    }>
                                                        {elem.estado}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-heritage-navy/60 dark:text-white/50">{elem.descricao}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Fases do Projeto */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Fases de Implementação</h3>
                                    <div className="space-y-4">
                                        {quintaSalreuDetails.fases.map((fase, i) => (
                                            <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-heritage-sand/20 dark:bg-white/5 rounded-2xl">
                                                <div className="w-14 h-14 rounded-2xl bg-heritage-terracotta text-white flex items-center justify-center font-black text-xl shrink-0">
                                                    {fase.fase}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-4 mb-1">
                                                        <h4 className="font-black text-heritage-navy dark:text-white text-lg">{fase.nome}</h4>
                                                        <Badge variant="outline" className="border-heritage-ocean text-heritage-ocean">{fase.periodo}</Badge>
                                                    </div>
                                                    <p className="text-sm text-heritage-navy/60 dark:text-white/50">{fase.descricao}</p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="text-xl font-black text-heritage-terracotta">{fase.orcamento}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Impacto Esperado */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Impacto Esperado</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {quintaSalreuDetails.impacto.map((item, i) => (
                                            <div key={i} className="bg-heritage-sand/30 dark:bg-white/5 p-6 rounded-3xl text-center">
                                                <p className="text-3xl font-black text-heritage-terracotta">{item.valor}</p>
                                                <p className="font-bold text-heritage-navy dark:text-white mb-1">{item.indicador}</p>
                                                <p className="text-xs text-heritage-navy/50 dark:text-white/40">{item.descricao}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Modelo Institucional */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Estrutura Organizacional</h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {quintaSalreuDetails.modelo.pilares.map((pilar, i) => (
                                            <div key={i} className="bg-heritage-sand/30 dark:bg-white/5 p-6 rounded-2xl border-t-4 border-heritage-terracotta">
                                                <h4 className="font-black text-heritage-navy dark:text-white mb-2">{pilar.nome}</h4>
                                                <p className="text-sm text-heritage-navy/60 dark:text-white/50">{pilar.descricao}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TAB: Torre Carvalhal */}
                            <TabsContent value="torre" className="space-y-12">
                                <div className="glass-card p-10 rounded-[40px]">
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-10">
                                        <div className="flex-1 space-y-6">
                                            <Badge className="bg-heritage-ocean/10 text-heritage-ocean border-none uppercase tracking-widest text-[10px] font-black">
                                                Projeto Complementar
                                            </Badge>
                                            <h2 className="text-4xl font-black text-heritage-navy dark:text-white">Torre do Carvalhal</h2>
                                            <div className="flex items-center gap-2 text-heritage-navy/60 dark:text-white/40">
                                                <LucideMapPin className="w-5 h-5" />
                                                <span className="font-medium">Santiago do Escoural, Montemor-o-Novo, Évora</span>
                                            </div>
                                            <p className="text-lg text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                                                Torre manuelina-mudéjar do século XVI (17 metros de altura) com capela gótica, integrada na Rede Natura 2000 (Sítio de Monfurado). Arquitetura característica do Alentejo com técnicas de taipa e adobe.
                                            </p>
                                        </div>
                                        <div className="flex gap-8">
                                            <div className="text-center">
                                                <p className="text-4xl font-black text-heritage-ocean">€720.000</p>
                                                <p className="text-sm font-bold text-heritage-navy/40 dark:text-white/40 uppercase">Investimento</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-4xl font-black text-heritage-navy dark:text-white">42 meses</p>
                                                <p className="text-sm font-bold text-heritage-navy/40 dark:text-white/40 uppercase">Duração</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-6">História</h3>
                                    <p className="text-heritage-navy/70 dark:text-white/60 leading-relaxed text-lg">
                                        A Torre do Carvalhal foi mandada construir no início do século XVI por <strong>André de Vilalobos e Vasconcelos</strong>, cavaleiro da Ordem de Avis e detentor do morgado do Carvalhal. A construção inicial foi a torre, símbolo de poder senhorial característico da arquitetura manuelino-mudéjar alentejana, com planta quadrangular de aproximadamente 17 metros de altura e três pisos parcialmente abobadados. Em 1569, Nicolau de Castro da Cunha contratou o pedreiro Diogo Velho para construir um corpo residencial adossado à torre, duplicando o volume do edifício.
                                    </p>
                                </div>

                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Ofícios Alentejanos Específicos</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {["Mestre de Taipa", "Mestre de Adobe", "Abobadeiro", "Pintor de Cal", "Corticeiro", "Pastor/Monteiro", "Canteiro de Granito", "Apicultor"].map((oficio, i) => (
                                            <div key={i} className="bg-heritage-ocean/5 dark:bg-white/5 p-5 rounded-2xl border-l-4 border-heritage-ocean">
                                                <p className="font-bold text-heritage-navy dark:text-white">{oficio}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-4 gap-4">
                                    {[
                                        { label: "Área Restaurada", value: "500 m²" },
                                        { label: "Artesãos Formados", value: "30" },
                                        { label: "Empregos Criados", value: "8" },
                                        { label: "Visitantes/Ano", value: "5.000" }
                                    ].map((meta, i) => (
                                        <div key={i} className="glass-card p-6 rounded-3xl text-center">
                                            <p className="text-3xl font-black text-heritage-ocean">{meta.value}</p>
                                            <p className="text-xs font-bold text-heritage-navy/40 dark:text-white/40 uppercase tracking-wider mt-2">{meta.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            {/* TAB: Ofícios (com modais) */}
                            <TabsContent value="oficios" className="space-y-12">
                                <div className="text-center space-y-4 mb-8">
                                    <h2 className="text-4xl font-black text-heritage-navy dark:text-white">Ofícios Tradicionais</h2>
                                    <p className="text-heritage-navy/60 dark:text-white/40 max-w-2xl mx-auto">
                                        Clique em cada ofício para saber mais sobre as competências, duração da formação e aplicação no projeto.
                                    </p>
                                </div>

                                {[
                                    { titulo: "Construção e Restauro", oficios: oficiosDetalhados.construcao, cor: "terracotta" },
                                    { titulo: "Jardinagem e Agricultura", oficios: oficiosDetalhados.jardinagem, cor: "green" },
                                    { titulo: "Ofícios Artesanais", oficios: oficiosDetalhados.artesanais, cor: "amber" }
                                ].map((categoria, i) => (
                                    <div key={i} className="glass-card p-10 rounded-[40px]">
                                        <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-6">{categoria.titulo}</h3>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {categoria.oficios.map((oficio, j) => (
                                                <Dialog key={j}>
                                                    <DialogTrigger asChild>
                                                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                            className="bg-heritage-sand/30 dark:bg-white/5 p-5 rounded-2xl text-left w-full hover:bg-heritage-sand/50 dark:hover:bg-white/10 transition-all group">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h4 className="font-bold text-heritage-navy dark:text-white group-hover:text-heritage-terracotta transition-colors">{oficio.nome}</h4>
                                                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40 mt-1">{oficio.aplicacao}</p>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Badge variant="outline" className="text-xs">{oficio.duracao}</Badge>
                                                                    <LucideArrowRight className="w-4 h-4 text-heritage-navy/30 dark:text-white/30 group-hover:text-heritage-terracotta transition-colors" />
                                                                </div>
                                                            </div>
                                                        </motion.button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-3xl font-black text-heritage-navy dark:text-white leading-tight">{oficio.nome}</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-6">
                                                            <div className="flex flex-wrap gap-3">
                                                                <Badge className="bg-heritage-terracotta/10 text-heritage-terracotta border-none px-4 py-1">{oficio.duracao}</Badge>
                                                                <Badge variant="secondary" className="bg-heritage-ocean/10 text-heritage-ocean border-none px-4 py-1">{oficio.certificacao}</Badge>
                                                                <Badge variant="outline" className="px-4 py-1">{oficio.aplicacao}</Badge>
                                                            </div>

                                                            <p className="text-heritage-navy/70 dark:text-white/60 leading-relaxed text-lg">{oficio.descricao}</p>

                                                            <div className="grid md:grid-cols-2 gap-8">
                                                                <div className="space-y-4">
                                                                    <h4 className="font-bold text-heritage-navy dark:text-white flex items-center gap-2">
                                                                        <LucideAward className="w-5 h-5 text-heritage-terracotta" />
                                                                        Competências
                                                                    </h4>
                                                                    <ul className="space-y-2">
                                                                        {oficio.competencias.map((comp, k) => (
                                                                            <li key={k} className="flex items-center gap-2 text-sm text-heritage-navy/60 dark:text-white/50">
                                                                                <LucideCheckCircle2 className="w-4 h-4 text-heritage-success shrink-0" />
                                                                                {comp}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>

                                                                <div className="space-y-6">
                                                                    <div className="p-4 bg-heritage-sand/30 dark:bg-white/5 rounded-2xl border-l-4 border-heritage-terracotta">
                                                                        <h4 className="text-xs font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/40 mb-1">Carga Horária</h4>
                                                                        <p className="font-bold text-heritage-navy dark:text-white">{oficio.horas}</p>
                                                                    </div>

                                                                    <div className="p-4 bg-heritage-ocean/5 dark:bg-white/5 rounded-2xl border-l-4 border-heritage-ocean">
                                                                        <h4 className="text-xs font-black uppercase tracking-widest text-heritage-navy/40 dark:text-white/40 mb-1">Inserção Profissional</h4>
                                                                        <p className="font-bold text-heritage-navy dark:text-white">{oficio.insercao}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <div className="glass-card p-10 rounded-[40px] bg-heritage-navy dark:bg-zinc-900 text-white text-center">
                                    <p className="text-5xl font-black mb-2">21</p>
                                    <p className="text-xl font-bold mb-2">Ofícios Tradicionais</p>
                                    <p className="text-white/60">Em risco de desaparecimento, a serem transmitidos às novas gerações</p>
                                </div>
                            </TabsContent>

                            {/* TAB: Funcionamento */}
                            <TabsContent value="funcionamento" className="space-y-12">
                                <div className="glass-card p-10 rounded-[40px] space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-heritage-ocean/10 flex items-center justify-center shrink-0">
                                            <LucideGraduationCap className="w-7 h-7 text-heritage-ocean" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-heritage-navy dark:text-white mb-4">Escola de Ofícios: Como Aprendemos</h2>
                                            <p className="text-lg text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                                                A formação é baseada no método "Aprender Fazendo", utilizando o restauro do próprio património como laboratório vivo.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {funcionamentoDetails.modalidades.map((mod, i) => (
                                            <div key={i} className="bg-heritage-sand/30 dark:bg-white/5 p-6 rounded-3xl">
                                                <mod.icon className="w-10 h-10 text-heritage-ocean mb-4" />
                                                <h3 className="font-black text-lg text-heritage-navy dark:text-white mb-1">{mod.titulo}</h3>
                                                <Badge className="bg-heritage-ocean/10 text-heritage-ocean border-none mb-3">{mod.duracao}</Badge>
                                                <p className="text-sm text-heritage-navy/60 dark:text-white/50">{mod.objetivo}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="glass-card p-10 rounded-[40px]">
                                        <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-6">Componentes da Formação</h3>
                                        <div className="space-y-6">
                                            {funcionamentoDetails.componentes.map((comp, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-bold text-heritage-navy dark:text-white">{comp.label}</span>
                                                        <span className="font-black text-heritage-ocean">{comp.percent}</span>
                                                    </div>
                                                    <div className="w-full bg-heritage-navy/5 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                                                        <div className="bg-heritage-ocean h-full" style={{ width: comp.percent }} />
                                                    </div>
                                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40">{comp.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="glass-card p-10 rounded-[40px]">
                                        <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-6">Apoios aos Formandos</h3>
                                        <ul className="space-y-4">
                                            {funcionamentoDetails.apoios.map((apoio, i) => (
                                                <li key={i} className="flex items-center gap-3 text-heritage-navy/70 dark:text-white/60">
                                                    <LucideCheckCircle2 className="w-5 h-5 text-heritage-success shrink-0" />
                                                    <span className="font-medium">{apoio}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-8 p-6 bg-heritage-ocean/5 rounded-2xl border border-heritage-ocean/20">
                                            <p className="text-sm text-heritage-ocean font-bold">Certificação</p>
                                            <p className="text-xs text-heritage-navy/60 dark:text-white/40 mt-1">
                                                Todos os cursos conferem certificado de competências reconhecido, facilitando a inserção profissional posterior.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TAB: Governança */}
                            <TabsContent value="governanca" className="space-y-12">
                                <div className="glass-card p-10 rounded-[40px] space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-heritage-gold/10 flex items-center justify-center shrink-0">
                                            <LucideGavel className="w-7 h-7 text-heritage-gold" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-heritage-navy dark:text-white mb-4">Governança e Transparência</h2>
                                            <p className="text-lg text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                                                Uma estrutura sólida que envolve a família, a comunidade e especialistas.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {governancaDetails.niveis.map((nivel, i) => (
                                            <div key={i} className="bg-heritage-sand/30 dark:bg-white/5 p-6 rounded-3xl border-t-4 border-heritage-gold">
                                                <h3 className="font-black text-lg text-heritage-navy dark:text-white mb-3">{nivel.pilar}</h3>
                                                <p className="text-sm text-heritage-navy/60 dark:text-white/50">{nivel.papel}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Princípios Estatutários (APQVS)</h3>
                                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                        {governancaDetails.estatutos.map((item, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-heritage-gold/20 flex items-center justify-center shrink-0">
                                                    <LucideShieldCheck className="w-4 h-4 text-heritage-gold" />
                                                </div>
                                                <p className="text-heritage-navy/70 dark:text-white/60 font-medium">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-heritage-navy p-10 rounded-[40px] text-white flex flex-col md:flex-row items-center gap-10">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black mb-4">Acordo de Parceria IPNS</h3>
                                        <p className="text-white/60 leading-relaxed">
                                            A parceria é selada através de um Termo de Cooperação Estratégica que define as responsabilidades de assessoria, captação de recursos e supervisão técnica da formação por um período de 42 meses.
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <LucideShield className="w-24 h-24 text-heritage-gold opacity-50" />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TAB: Proposta */}
                            <TabsContent value="proposta" className="space-y-12">
                                <div className="text-center space-y-4 mb-12">
                                    <h2 className="text-4xl font-black text-heritage-navy dark:text-white">Proposta & Metas (KPIs)</h2>
                                    <p className="text-heritage-navy/60 dark:text-white/40 max-w-2xl mx-auto">
                                        O compromisso do IPNS com resultados tangíveis e mensuráveis.
                                    </p>
                                </div>

                                {/* KPIs Section */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                                    {kpiDetails.map((kpi, i) => (
                                        <div key={i} className="glass-card p-6 rounded-3xl text-center border-b-4 border-heritage-terracotta">
                                            <kpi.icon className="w-8 h-8 text-heritage-terracotta mx-auto mb-3" />
                                            <p className="text-2xl font-black text-heritage-navy dark:text-white">{kpi.kpi}</p>
                                            <p className="text-xs font-bold text-heritage-navy/40 dark:text-white/40 uppercase tracking-wider mb-2">{kpi.meta}</p>
                                            <Badge variant="outline" className="text-[10px]">{kpi.prazo}</Badge>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {propostas.map((prop, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                            className={`glass-card p-8 rounded-[32px] text-center relative ${prop.destaque ? 'ring-2 ring-heritage-terracotta' : ''}`}>
                                            {prop.destaque && (
                                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-heritage-terracotta text-white border-none font-bold">
                                                    Recomendada
                                                </Badge>
                                            )}
                                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-heritage-navy/5 dark:bg-white/5 flex items-center justify-center text-3xl font-black text-heritage-navy dark:text-white">
                                                {prop.opcao}
                                            </div>
                                            <h3 className="text-xl font-black text-heritage-navy dark:text-white mb-2">{prop.projeto}</h3>
                                            <p className="text-4xl font-black text-heritage-terracotta mb-2">{prop.honorarios}</p>
                                            {prop.desconto !== "—" && (
                                                <Badge className="bg-heritage-success/20 text-heritage-success border-none mb-4">
                                                    {prop.desconto} Desconto
                                                </Badge>
                                            )}
                                            <p className="text-sm text-heritage-navy/60 dark:text-white/50 mt-4">{prop.descricao}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Estrutura de Honorários */}
                                <div className="glass-card p-10 rounded-[40px] space-y-6">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white">Estrutura de Honorários</h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="p-6 bg-heritage-sand/30 dark:bg-white/5 rounded-2xl">
                                            <p className="text-sm font-bold text-heritage-navy/60 dark:text-white/40 uppercase tracking-wider mb-2">Taxa de Gestão</p>
                                            <p className="text-2xl font-black text-heritage-navy dark:text-white">8%</p>
                                            <p className="text-sm text-heritage-navy/40 dark:text-white/30 mt-2">Faturação mensal sobre investimento executado</p>
                                        </div>
                                        <div className="p-6 bg-heritage-sand/30 dark:bg-white/5 rounded-2xl">
                                            <p className="text-sm font-bold text-heritage-navy/60 dark:text-white/40 uppercase tracking-wider mb-2">Taxa de Sucesso</p>
                                            <p className="text-2xl font-black text-heritage-navy dark:text-white">5%</p>
                                            <p className="text-sm text-heritage-navy/40 dark:text-white/30 mt-2">Sobre financiamento captado com êxito</p>
                                        </div>
                                        <div className="p-6 bg-heritage-sand/30 dark:bg-white/5 rounded-2xl">
                                            <p className="text-sm font-bold text-heritage-navy/60 dark:text-white/40 uppercase tracking-wider mb-2">Serviços Especializados</p>
                                            <p className="text-2xl font-black text-heritage-navy dark:text-white">Tabela</p>
                                            <p className="text-sm text-heritage-navy/40 dark:text-white/30 mt-2">Candidaturas, estudos, relatórios ESG</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Próximos Passos */}
                                <div className="glass-card p-10 rounded-[40px] bg-heritage-navy dark:bg-zinc-900 text-white">
                                    <h3 className="text-2xl font-black mb-8">Próximos Passos</h3>
                                    <div className="grid md:grid-cols-4 gap-6">
                                        {[
                                            { step: "1", label: "Seleção da opção pretendida" },
                                            { step: "2", label: "Reunião de esclarecimento" },
                                            { step: "3", label: "Assinatura do contrato" },
                                            { step: "4", label: "Início dos trabalhos" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-heritage-terracotta flex items-center justify-center font-black shrink-0">
                                                    {item.step}
                                                </div>
                                                <p className="font-medium text-white/80 pt-2">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div>
                                            <p className="text-white/60 font-medium">Validade da proposta</p>
                                            <p className="text-2xl font-black">90 dias</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/60 font-medium">Contacto</p>
                                            <p className="font-bold">Diego Rocha — dmrdiego@gmail.com</p>
                                            <p className="font-bold">+351 931 721 901</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TAB: Financiamento */}
                            <TabsContent value="financiamento" className="space-y-12">
                                <div className="text-center space-y-4 mb-12">
                                    <h2 className="text-4xl font-black text-heritage-navy dark:text-white">Fontes de Financiamento</h2>
                                    <p className="text-heritage-navy/60 dark:text-white/40 max-w-2xl mx-auto">
                                        Estratégia diversificada para garantir a sustentabilidade dos projetos.
                                    </p>
                                </div>

                                <div className="glass-card p-2 rounded-[40px] overflow-hidden mb-12">
                                    <img src="/assessoria/fluxograma_financiamento.png" alt="Fluxograma de Financiamento" className="w-full max-w-3xl mx-auto rounded-[32px]" />
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {financiamento.map((grupo, i) => (
                                        <div key={i} className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-black text-heritage-navy dark:text-white uppercase tracking-wider">{grupo.fonte}</h3>
                                                <Badge className="bg-heritage-terracotta/10 text-heritage-terracotta border-none font-bold">{grupo.total}</Badge>
                                            </div>
                                            {grupo.items.map((item, j) => (
                                                <div key={j} className="glass-card p-5 rounded-2xl">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="font-bold text-heritage-navy dark:text-white">{item.nome}</p>
                                                        <p className="font-black text-heritage-terracotta">{item.valor}</p>
                                                    </div>
                                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40">{item.descricao}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* Cronograma */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Cronograma Integrado</h3>
                                    <img src="/assessoria/fluxograma_cronograma_integrado.png" alt="Cronograma" className="w-full rounded-3xl" />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </div>
        </PasswordGate>
    )
}
