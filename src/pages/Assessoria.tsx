import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion, useScroll, useSpring } from "framer-motion"
import PasswordGate from "@/components/PasswordGate"
import { 
    LucideBuilding2, LucideCastle, LucideEuro, LucideCalendarClock, LucideMapPin, 
    LucideGraduationCap, LucideHammer, LucideCheckCircle2, LucideStar, LucideTarget, 
    LucideAward, LucideArrowRight, LucideHistory, LucideHome, LucideLeaf, 
    LucideGavel, LucideFileText, LucideShieldCheck, LucideBriefcase, LucideTrendingUp, 
    LucideShield, LucideListOrdered, LucideBookOpen, LucideArrowDownRight, LucideUsers 
} from "lucide-react"
import ModeloInstitucional from "@/components/visuals/ModeloInstitucional"
import MapaOficios from "@/components/visuals/MapaOficios"
import FinanciamentoVisual from "@/components/visuals/FinanciamentoVisual"
import CronogramaVisual from "@/components/visuals/CronogramaVisual"
import ProcessoOperacional from "@/components/visuals/ProcessoOperacional"
import ProximosPassosVisual from "@/components/visuals/ProximosPassosVisual"
import { Grain } from "@/components/ui/Grain"
import { FadeIn } from "@/components/ui/FadeIn"
import AnimatedCounter from "@/components/ui/AnimatedCounter"

const oficiosDetalhados = {
    culinaria: [
        {
            nome: "Culinária Portuguesa Tradicional",
            duracao: "6 meses",
            horas: "600h (200h teóricas + 400h práticas)",
            certificacao: "Cozinheiro Tradicional - Nível 4",
            aplicacao: "Escola de culinária imersiva na Quinta",
            descricao: "Formação em gastronomia tradicional portuguesa utilizando os produtos locais da região — o arroz das rias (que só cresce naquela água salobra), o azeite (herança direta do Visconde, maior exportador de azeite), o vinho e o pão artesanal dos moinhos históricos.",
            competencias: ["Receitas tradicionais da Ria de Aveiro", "Preparação de arroz das rias", "Conservação e cura de alimentos", "Apresentação e serviço"],
            insercao: "Restaurantes, turismo gastronómico, produção própria"
        },
        {
            nome: "Produção de Pão Artesanal",
            duracao: "4 meses",
            horas: "400h (120h teóricas + 280h práticas)",
            certificacao: "Padeiro Artesanal - Nível 3",
            aplicacao: "Produção nos 11 moinhos históricos da região",
            descricao: "A região possui 11 moinhos antigos de pão e trigo. A formação recupera as técnicas de panificação artesanal com farinhas moídas em mó de pedra, ligando a tradição milenar ao turismo de experiência.",
            competencias: ["Moagem em mó de pedra", "Fermentação natural", "Fornos a lenha tradicionais", "Receitas regionais de pão"],
            insercao: "Padarias artesanais, mercados locais, turismo"
        },
        {
            nome: "Produção de Vinho",
            duracao: "6 meses",
            horas: "600h (200h teóricas + 400h práticas)",
            certificacao: "Vinicultor Tradicional - Nível 4",
            aplicacao: "Aproveitamento do lagar de vinho existente nos anexos",
            descricao: "A Quinta possui um lagar de vinho nos anexos que era parte da fazenda produtiva original. A formação recupera as técnicas de vinificação tradicional, conectando o saber-fazer ancestral com práticas modernas.",
            competencias: ["Vinificação artesanal", "Gestão de lagar", "Enologia básica", "Harmonização e degustação"],
            insercao: "Adegas, enoturismo, produção própria"
        },
        {
            nome: "Produção de Azeite",
            duracao: "4 meses",
            horas: "400h (120h teóricas + 280h práticas)",
            certificacao: "Oleicultor - Nível 3",
            aplicacao: "Restauração do lagar de azeite da Quinta",
            descricao: "O Visconde de Salreu foi o maior exportador de azeite de Portugal. A formação honra esse legado, ensinando as técnicas de produção, desde o cultivo do olival até à prensagem e armazenamento tradicionais.",
            competencias: ["Cultivo e poda do olival", "Prensagem tradicional", "Classificação de azeites", "Conservação e embalagem"],
            insercao: "Produção própria, cooperativas, turismo gastronómico"
        },
        {
            nome: "Doceiro Tradicional",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Doceiro Tradicional - Nível 3",
            aplicacao: "Produção de doçaria conventual e regional",
            descricao: "Especializado na produção de doçaria tradicional portuguesa e receitas conventuais da região de Aveiro.",
            competencias: ["Receitas conventuais", "Ponto de açúcar", "Conservação", "Apresentação criativa"],
            insercao: "Pastelarias gourmet, produção própria"
        }
    ],
    botanica: [
        {
            nome: "Jardineiro de Jardins Históricos",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Jardineiro Paisagista - Nível 4",
            aplicacao: "Restauro do jardim histórico (proj. Cristina Castelo Branco)",
            descricao: "Formação especializada no restauro e manutenção de jardins históricos, baseada no pré-projeto da Profª Cristina Castelo Branco. O jardim contém espécies raras do mundo todo, um lago com ponte, estufas e um jardim de inverno.",
            competencias: ["Restauro de jardins históricos", "Gestão de coleções botânicas raras", "Recuperação de sistemas de rega por gravidade", "Plano de manejo paisagístico"],
            insercao: "Quintas históricas, câmaras municipais, jardins botânicos"
        },
        {
            nome: "Viveirista e Botânico",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Viveirista - Nível 3",
            aplicacao: "Propagação de espécies raras nas estufas da Quinta",
            descricao: "A Quinta possui duas estufas históricas. O viveirista aprende a propagar e cuidar de espécies botânicas raras trazidas de todo o mundo pelo Visconde, seguindo os levantamentos de flora do naturalista português Brotero.",
            competencias: ["Propagação de espécies raras", "Gestão de estufas históricas", "Catalogação botânica", "Aclimatação de plantas exóticas"],
            insercao: "Jardins botânicos, viveiros especializados"
        },
        {
            nome: "Agricultor Biológico e Sustentável",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Agricultor Biológico - Nível 4",
            aplicacao: "Produção sustentável e sequestro de carbono",
            descricao: "A Quinta visa tornar-se um modelo de quinta sustentável replicável. A formação inclui técnicas de agricultura biológica, compostagem e sequestro carbónico, transformando o espaço numa referência de sustentabilidade.",
            competencias: ["Rotação de culturas", "Compostagem", "Sequestro de carbono", "Certificação biológica"],
            insercao: "Exploração própria, cooperativas, consultoria"
        },
        {
            nome: "Apicultor",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Apicultor - Nível 3",
            aplicacao: "Produção de mel e serviços de polinização",
            descricao: "Criação de abelhas e produção de mel, contribuindo para a polinização do jardim histórico e das áreas agrícolas da Quinta.",
            competencias: ["Gestão de colmeias", "Extração de mel", "Produção de cera", "Polinização"],
            insercao: "Produção própria, cooperativas"
        },
        {
            nome: "Ervanário",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Ervanário - Nível 3",
            aplicacao: "Horto de plantas aromáticas e medicinais",
            descricao: "Cultivo, colheita e preparação de plantas aromáticas e medicinais dentro do ecossistema do jardim histórico.",
            competencias: ["Cultivo de ervas", "Secagem e conservação", "Preparação de infusões", "Óleos essenciais"],
            insercao: "Produção própria, herbanárias, mercados locais"
        }
    ],
    artes: [
        {
            nome: "Músico — Fila Harmónica",
            duracao: "6 meses",
            horas: "600h (200h teóricas + 400h práticas)",
            certificacao: "Formação Musical - Nível 4",
            aplicacao: "Concertos nos jardins e estufas da Quinta",
            descricao: "Em parceria com a Banda Visconde de Salreu (escola de música com espaço físico e alunos de 9 a 90 anos), a formação musical inclui concertos temáticos nos jardins — Vivaldi na primavera, repertório de outono no outono — trazendo vida e cultura ao espaço.",
            competencias: ["Instrumento musical", "Repertório clássico e popular", "Performance ao ar livre", "Produção de eventos musicais"],
            insercao: "Bandas filarmónicas, escolas de música, eventos"
        },
        {
            nome: "Laceira / Rendeira",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Rendeira - Nível 4",
            aplicacao: "Preservação dos rendados da região de Aveiro",
            descricao: "A região é conhecida pelos seus bordados e rendados tradicionais. A formação preserva esta arte centenária da renda de bilros e outras técnicas regionais específicas da zona de Aveiro.",
            competencias: ["Renda de bilros", "Bordados regionais", "Design de padrões tradicionais", "Acabamentos finos"],
            insercao: "Produção própria, lojas de artesanato, turismo"
        },
        {
            nome: "Decoração Tradicional Portuguesa",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Artesão Decorador - Nível 3",
            aplicacao: "Decoração dos espaços restaurados e das unidades Airbnb",
            descricao: "Formação em decoração de interiores com técnicas e estéticas tradicionais portuguesas — mosaicos, azulejos, bordados de parede, mobiliário rústico e arranjos florais com espécies do jardim.",
            competencias: ["Decoração de interiores tradicional", "Restauro de mobiliário", "Azulejaria decorativa", "Arranjos florais"],
            insercao: "Decoração de quintas, turismo rural, eventos"
        },
        {
            nome: "Oleiro / Ceramista",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Oleiro/Ceramista - Nível 4",
            aplicacao: "Produção de azulejos e vasos para o jardim",
            descricao: "Modelação e decoração de peças em barro e cerâmica, incluindo azulejos decorativos para os espaços restaurados.",
            competencias: ["Torno de oleiro", "Modelação manual", "Vidrados", "Pintura cerâmica"],
            insercao: "Oficina própria, cooperativas de artesanato"
        },
        {
            nome: "Tecelão",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Tecelão - Nível 4",
            aplicacao: "Produção de têxteis tradicionais",
            descricao: "Produção de tecidos em tear manual, seguindo padrões tradicionais da região de Aveiro.",
            competencias: ["Tear de pedais", "Urdidura", "Padrões tradicionais", "Acabamentos têxteis"],
            insercao: "Oficinas de artes e ofícios, lojas de artesanato"
        },
        {
            nome: "Tanoeiro",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Tanoeiro - Nível 4",
            aplicacao: "Produção de vasilhame para o lagar de vinho",
            descricao: "Produção de vasilhame em madeira (pipas, barris) para vinho, conectando com a tradição vinícola da Quinta.",
            competencias: ["Seleção de madeiras", "Arqueamento", "Montagem de pipas", "Acabamentos"],
            insercao: "Adegas, produção própria, decoração"
        }
    ],
    restauro: [
        {
            nome: "Pedreiro de Alvenaria Tradicional",
            duracao: "6 meses",
            horas: "600h (300h teóricas + 300h práticas)",
            certificacao: "Pedreiro de Alvenaria Tradicional - Nível 4",
            aplicacao: "Restauro de muros e estruturas em pedra",
            descricao: "Domina técnicas centenárias de construção em pedra, utilizando argamassas de cal e técnicas de assentamento para o restauro autêntico dos anexos e muros da Quinta.",
            competencias: ["Leitura de aparelhos de pedra", "Preparação de argamassas de cal", "Técnicas de rejuntamento", "Consolidação de paredes históricas"],
            insercao: "Empresas de restauro, trabalho autónomo"
        },
        {
            nome: "Carpinteiro de Limpos",
            duracao: "6 meses",
            horas: "600h (240h teóricas + 360h práticas)",
            certificacao: "Carpinteiro de Limpos - Nível 4",
            aplicacao: "Restauro de caixilharias e elementos em madeira",
            descricao: "Trabalhos finos de carpintaria para restauro de portas, janelas, lambris e forros dos anexos e do palacete.",
            competencias: ["Restauro de caixilharias", "Marcenaria tradicional", "Técnicas de ensamblagem", "Acabamentos e vernizes"],
            insercao: "Marcenarias, empresas de restauro"
        },
        {
            nome: "Estucador",
            duracao: "4 meses",
            horas: "400h (160h teóricas + 240h práticas)",
            certificacao: "Estucador Ornamentista - Nível 4",
            aplicacao: "Recuperação de ornamentos do palacete",
            descricao: "Criação e restauro de elementos decorativos em estuque — molduras, rosetas, cornijas e ornamentos do palacete.",
            competencias: ["Preparação de gessos e cales", "Modelação de ornamentos", "Restauro de molduras", "Técnicas de douramento"],
            insercao: "Restauro de edifícios históricos"
        },
        {
            nome: "Calceteiro",
            duracao: "3 meses",
            horas: "300h (120h teóricas + 180h práticas)",
            certificacao: "Calceteiro - Nível 3",
            aplicacao: "Recuperação de pavimentos e caminhos do jardim",
            descricao: "Arte de assentar pedras em padrões decorativos para os caminhos e pavimentos do jardim histórico.",
            competencias: ["Preparação de bases", "Corte de pedra", "Padrões decorativos", "Manutenção de calçadas"],
            insercao: "Câmaras municipais, empresas de construção"
        },
        {
            nome: "Corticeiro — Tirador de Cortiça",
            duracao: "4 meses",
            horas: "400h (120h teóricas + 280h práticas)",
            certificacao: "Corticeiro - Nível 4",
            aplicacao: "Torre do Carvalhal — Extração sustentável de cortiça",
            descricao: "O sombreiro (sobreiro) é uma árvore endémica do Alentejo que só começa a dar cortiça aos 60 anos. A extração é uma arte técnica muito específica: se feita incorretamente, mata a árvore. Este saber-fazer está em risco de desaparecimento e é um ofício prioritário para a Torre do Carvalhal.",
            competencias: ["Técnica de descortiçamento", "Avaliação da maturidade do sobreiro", "Ferramentas tradicionais", "Processamento artesanal de cortiça"],
            insercao: "Herdades alentejanas, indústria corticeira, turismo rural"
        }
    ]
}

// Detalhes do projeto Quinta Salreu — atualizado reunião Fev/2026
const quintaSalreuDetails = {
    historia: {
        titulo: "História da Quinta",
        texto: "A Quinta do Visconde de Salreu constitui um exemplar notável do património rural português do século XIX. O Visconde foi o maior exportador de azeite de Portugal e a quinta era uma fazenda produtiva com lagares de azeite e vinho, queijaria e 11 moinhos de pão na região. A propriedade compreende um palacete com torre, jardim histórico romântico com espécies exóticas raras de todo o mundo, lago com ponte, estufas, e uma área agrícola integrada na paisagem da Ria de Aveiro. O projeto visa transformar a Quinta num espaço de experiência imersiva na cultura tradicional portuguesa."
    },
    patrimonio: {
        titulo: "Património a Preservar",
        elementos: [
            { nome: "Jardim Histórico", estado: "Urgente", descricao: "Restauro completo do jardim (proj. Cristina Castelo Branco) — lago, ponte, estufas, espécies raras" },
            { nome: "Sistema Hídrico por Gravidade", estado: "Urgente", descricao: "Recuperação dos dutos de irrigação por gravidade (sem energia elétrica na época)" },
            { nome: "Lagares de Azeite e Vinho", estado: "Alta", descricao: "Restauro dos lagares nos anexos para produção e experiência turística" },
            { nome: "14 Unidades Habitacionais", estado: "Alta", descricao: "Conversão dos anexos (garagem, lagar, casa de lenha) em 14 unidades Airbnb" },
            { nome: "Estufas e Viveiros", estado: "Média", descricao: "Duas estufas históricas para propagação botânica e recuperação de espécies" },
            { nome: "Palacete Principal", estado: "Preservação", descricao: "Visitação guiada agendada — mantém carácter de casa de família" }
        ]
    },
    fases: [
        { fase: "1", nome: "Estudo e Projeto", periodo: "Meses 1-4", descricao: "Levantamento arquitetónico, estudo estrutural, projeto de arquitetura, licenciamento e projeto de jardim (Cristina Castelo Branco)", orcamento: "€80.000" },
        { fase: "2", nome: "Estrutura e Cobertura", periodo: "Meses 5-12", descricao: "Consolidação estrutural, substituição de cobertura, reforço de paredes, tratamento de madeiras", orcamento: "€380.000" },
        { fase: "3", nome: "Instalações e Restauro", periodo: "Meses 13-20", descricao: "Instalação técnica (elétrica/encanamento), restauro de fachadas, caixilharia, pavimentos e revestimentos", orcamento: "€340.000" },
        { fase: "4", nome: "Paisagismo e Botânica", periodo: "Meses 18-24", descricao: "Restauro do jardim histórico, infraestrutura de água por gravidade, recuperação botânica de espécies raras", orcamento: "€400.000" }
    ],
    impacto: [
        { indicador: "Alojamento", valor: "14", descricao: "Unidades habitacionais criadas nos anexos (Airbnb)" },
        { indicador: "Capacitação", valor: "30+", descricao: "Pessoas formadas em artes, culinária e ofícios" },
        { indicador: "Emprego", valor: "25", descricao: "Postos de trabalho diretos no restauro" },
        { indicador: "Sustentável", valor: "Sim", descricao: "Quinta sustentável replicável com sequestro de carbono" }
    ],
    modelo: {
        pilares: [
            { nome: "Família Proprietária", descricao: "Mantém a titularidade e a residência no palacete. Visitação guiada agendada." },
            { nome: "IPSS Banda Visconde de Salreu", descricao: "IPSS já existente (gestora Raquel), articulada com a prefeitura, com licenças e estrutura constituída." },
            { nome: "IPNS - Bureau Social", descricao: "Parceiro estratégico para captação de recursos, formação e coordenação do projeto." }
        ]
    }
}

// Detalhes do projeto Torre do Carvalhal — atualizado reunião Fev/2026
const torreCarvalhalDetails = {
    historia: {
        titulo: "História da Torre",
        texto: "A Torre do Carvalhal é um símbolo do poder senhorial na arquitetura manuelino-mudéjar alentejana do séc. XVI. A Ermida possui azulejaria mudejar do século XVI — comparável à de Sintra e Universidade de Évora. A propriedade inclui entre 600 e 800 hectares de montado com sobreiros e azinheiras endémicas, várias casas e construções dentro da propriedade, e está inserida na Rede Natura 2000 (Sítio Monfurado). O grande diferencial é o ofício do Corticeiro — a extração de cortiça dos sobreiros centenários, uma arte técnica em risco de desaparecimento."
    },
    patrimonio: {
        titulo: "Património a Preservar",
        elementos: [
            { nome: "Torre Principal", estado: "Ruína Avançada", descricao: "Consolidação urgente da estrutura manuelina de 17 metros" },
            { nome: "Ermida com Azulejaria séc. XVI", estado: "Ruína", descricao: "Azulejaria mudejar única, comparável à de Sintra e Universidade de Évora" },
            { nome: "10 Unidades Turismo Rural", estado: "Devoluto", descricao: "Casas dentro dos 600-800 ha — potencial para turismo rural e experiências patrimoniais" },
            { nome: "Montado (600-800 ha)", estado: "Bom", descricao: "Sobreiros e azinheiras endémicos — produção de cortiça, percursos interpretativos e turismo de natureza off-grid" },
            { nome: "Forno de Cal Histórico", estado: "Abandonado", descricao: "Musealização e sinalização interpretativa — peça única de património industrial alentejano" },
            { nome: "Infraestrutura Hídrica", estado: "Abandonado", descricao: "Sistema de irrigação a restaurar para o jardim e horta" }
        ]
    },
    fases: [
        { fase: "1", nome: "Estudo e Projeto", periodo: "Meses 1-6", descricao: "Levantamento técnico, projeto de arquitetura, mapeamento das casas e ermida", orcamento: "€60.000" },
        { fase: "2", nome: "Consolidação", periodo: "Meses 7-18", descricao: "Estabilização estrutural da torre, ermida e casas prioritárias", orcamento: "€250.000" },
        { fase: "3", nome: "Restauro e Formação", periodo: "Meses 18-30", descricao: "Restauro integral, formação em ofícios alentejanos e corticeiros", orcamento: "€400.000" },
        { fase: "4", nome: "Operação", periodo: "Meses 30+", descricao: "Turismo de natureza, cortiça, apicultura e turismo rural nas casas", orcamento: "€90.000/ano" }
    ],
    impacto: [
        { indicador: "Área", valor: "600-800 ha", descricao: "Hectares de montado sob gestão sustentável" },
        { indicador: "Capacitação", valor: "30", descricao: "Artesãos e corticeiros formados" },
        { indicador: "Alojamento", valor: "10", descricao: "Unidades para turismo rural e experiências patrimoniais" },
        { indicador: "Rede Natura", valor: "100%", descricao: "Inserção em área de proteção ambiental" }
    ],
    modelo: {
        pilares: [
            { nome: "Proprietário (DOVA)", descricao: "Detém a titularidade e assegura a visão de longo prazo do legado." },
            { nome: "Associação (APHC)", descricao: "Gestora local focada no restauro, cortiça e montado sustentável." },
            { nome: "IPNS + Rede de Mestres", descricao: "Especialistas em técnicas alentejanas e corticeiros que coordenam a formação." }
        ]
    }
}

const propostas = [
    { opcao: "A", projeto: "Quinta Salreu", honorarios: "€160.000", investimento: "€2.070.000", taxaGestao: "8%", desconto: "—", destaque: false, descricao: "Assessoria para o projeto de experiência imersiva em Estarreja (14 unidades, escola de artes e culinária, 30 meses)" },
    { opcao: "B", projeto: "Torre Carvalhal", honorarios: "TBD", investimento: "€2.900.000", taxaGestao: "8%", desconto: "—", destaque: false, descricao: "Assessoria para restauro e formação no Alentejo (10 unidades, 600-800 ha montado, ermida, 36 meses)" },
    { opcao: "C", projeto: "Programa Integrado", honorarios: "TBD", investimento: "€4.970.000", taxaGestao: "6,8%", economia: "TBD", desconto: "15%", destaque: true, descricao: "Assessoria integrada Norte-Sul: culinária, botânica, música, cortiça e turismo imersivo em dois territórios." }
]

// passosDetails moved to ProximosPassosVisual component
const fontesDetails = [
    { titulo: "Transcrição da Reunião de Adequações (Fev/2026)", desc: "Decisões estratégicas sobre orçamento (€2M Quinta), mudança de foco para artes/culinária e novo modelo institucional (IPSS)." },
    { titulo: "Plano Mestre Bureau Social", desc: "Diretrizes operacionais e estruturais para o IPNS e seus projetos de preservação patrimonial e impacto social." },
    { titulo: "Programa PRR / Portugal 2030 / IEFP", desc: "Linhas de financiamento europeias e nacionais para qualificação do património, turismo e formação profissional." },
    { titulo: "Cristina Castelo Branco & Parceiros", desc: "Referências de projeto de restauro botânico e arquitetónico." }
]

const financiamento = [
    {
        fonte: "Fundos Europeus (PRR / Portugal 2030)", total: "€1.400k", items: [
            { nome: "PRR — Reabilitação", valor: "€800k", descricao: "Fundo Europeu para reabilitação e restauro de patrimónios históricos" },
            { nome: "FEADER/PDR", valor: "€300k", descricao: "Agricultura sustentável, montado e jardins históricos" },
            { nome: "FSE+ / LIFE", valor: "€300k", descricao: "Formação profissional, biodiversidade e conservação" }
        ]
    },
    {
        fonte: "Portugal (IEFP + Turismo)", total: "€400k", items: [
            { nome: "IEFP", valor: "€250k", descricao: "Programa de formação profissional — certificação de artes e ofícios" },
            { nome: "Turismo PT", valor: "€150k", descricao: "Turismo cultural, experiência imersiva e Airbnb" }
        ]
    },
    {
        fonte: "Privado (10%)", total: "€200k", items: [
            { nome: "Contrapartida Família", valor: "€150k", descricao: "10% de contrapartida exigida pela família proprietária" },
            { nome: "Mecenato", valor: "€50k", descricao: "Donativos com benefícios fiscais, prémios de sustentabilidade" }
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
        { pilar: "Família Proprietária (Sócios Fundadores)", papel: "A família mantém a titularidade e residência no palacete. Visitantes acedem apenas por marcação. Garantem o DNA do projeto e o legado histórico." },
        { pilar: "IPSS Banda Visconde de Salreu", papel: "IPSS já constituída com licenças, estrutura e mais de 50 associados. Gestora: Raquel (presidente da Câmara da Banda). Articulação direta com a prefeitura." },
        { pilar: "IPNS — Bureau Social", papel: "Assessor estratégico para captação de recursos (PRR, IEFP), coordenação técnica, formação e marcação." }
    ],
    estatutos: [
        "IPSS Banda Visconde de Salreu como entidade gestora já constituída",
        "Mínimo de 50 associados exigido para a estrutura operaçónal",
        "Resultados integralmente reinvestidos nos fins estatutários",
        "Articulação com a prefeitura para licenciamentos e apoios",
        "Direito de veto da família proprietária para proteção do legado histórico"
    ]
}

const kpiDetails = [
    { meta: "Unidades Habitacionais", kpi: "14 unidades", prazo: "30 meses", icon: LucideFileText, desc: "Conversão dos anexos da Quinta em 14 unidades de alojamento Airbnb." },
    { meta: "Financiamento Captado", kpi: "€2.070.000", prazo: "30 meses", icon: LucideEuro, desc: "Captação via PRR/Portugal 2030, IEFP e fundos europeus (FEADER, FSE+, LIFE)." },
    { meta: "Pessoas Capacitadas", kpi: "30+ pessoas", prazo: "30 meses", icon: LucideAward, desc: "Formação em culinária, botânica, música, artes, cortiça e restauro." },
    { meta: "Empregos Criados", kpi: "25 postos", prazo: "30 meses", icon: LucideCheckCircle2, desc: "Postos de trabalho diretos no restauro, operação e turismo de experiência." }
]


export default function Assessoria() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const [activeSection, setActiveSection] = useState("programa")

    useEffect(() => {
        const handleScroll = () => {
            const offset = 280 // altura navbar + margem para considerar secção "ativa"
            const scrollPos = window.scrollY + offset
            let current = sections[0].id
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i].id)
                if (el && el.offsetTop <= scrollPos) {
                    current = sections[i].id
                    break
                }
            }
            setActiveSection(prev => prev !== current ? current : prev)
        }
        const tid = setTimeout(handleScroll, 100) // aguarda DOM
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => {
            clearTimeout(tid)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const sections = [
        { id: "programa", label: "O Programa" },
        { id: "paraquem", label: "Para Quem É" },
        { id: "modelo", label: "Modelo Institucional" },
        { id: "processo", label: "Processo Operacional" },
        { id: "quinta", label: "Quinta Salreu" },
        { id: "torre", label: "Torre Carvalhal" },
        { id: "oficios", label: "Artes & Ofícios" },
        { id: "funcionamento", label: "Funcionamento" },
        { id: "governanca", label: "Governança" },
        { id: "proposta", label: "Proposta & KPIs" },
        { id: "financiamento", label: "Financiamento" },
        { id: "passos", label: "Próximos Passos" },
    ]

    return (
        <PasswordGate password="#333" disabled>
            <div className="flex flex-col w-full bg-[#f8f6f0] dark:bg-zinc-950 transition-colors duration-500 relative font-sans text-heritage-navy dark:text-white">
                <Grain opacity={0.09} />
                
                {/* Progress bar editorial style */}
                <motion.div className="fixed top-0 left-0 right-0 h-1 bg-heritage-terracotta origin-left z-50 mix-blend-multiply" style={{ scaleX }} />

                {/* Editorial Hero Section (Masthead Style) */}
                <section className="relative min-h-[90svh] flex flex-col justify-end px-4 sm:px-8 md:px-12 pb-12 pt-32 overflow-hidden border-b border-heritage-navy/10 dark:border-white/10">
                    <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end relative z-10">
                        {/* Main Headline */}
                        <div className="lg:col-span-8 space-y-8">
                            <FadeIn delay={0.1}>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-heritage-terracotta"></div>
                                    <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-heritage-navy/70 dark:text-white/70">
                                        Caderno Especial // Assessoria Técnica
                                    </span>
                                </div>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <h1 className="font-serif text-[4rem] leading-[0.9] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-medium text-heritage-navy dark:text-white tracking-tighter">
                                    Preservar o <br />
                                    <span className="text-heritage-terracotta italic font-normal">Património Familiar</span>.
                                </h1>
                            </FadeIn>
                        </div>

                        {/* Sub-Article / Lead Paragraph */}
                        <div className="lg:col-span-4 flex flex-col justify-between h-full border-t border-heritage-navy/20 dark:border-white/20 pt-6 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-12">
                            <FadeIn delay={0.5} direction="left">
                                <p className="text-xl sm:text-2xl text-heritage-navy/80 dark:text-white/80 leading-snug font-medium mb-6">
                                    Serviço de assessoria técnica para projetos de património histórico — restauro, financiamento, formação em ofícios tradicionais, governança e coordenação de parceiros.
                                </p>
                                <p className="text-lg font-serif italic text-heritage-navy/70 dark:text-white/70 leading-snug border-l-2 border-heritage-terracotta/50 pl-4 mb-12">
                                    Contratem-nos para vos ajudar a captar financiamento, coordenar o projeto e montar a formação.
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.7} direction="left">
                                <div className="w-full">
                                    <span className="block text-[10px] uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mb-3 font-semibold">Resumo Executivo</span>
                                    <div className="grid grid-cols-2 gap-4 pb-3">
                                        <div>
                                            <p className="font-serif text-2xl font-medium text-heritage-navy dark:text-white">€4.970.000</p>
                                            <p className="text-xs uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 font-semibold mb-1">Programa Integrado</p>
                                        </div>
                                        <div>
                                            <p className="font-serif text-2xl font-medium text-heritage-navy dark:text-white">30-36 Meses</p>
                                            <p className="text-xs uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 font-semibold mb-1">Duração Integrada</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 relative">
                    
                    {/* Left Sidebar Table of Contents (Sticky) */}
                    <div className="hidden lg:block lg:col-span-3 border-r border-heritage-navy/10 dark:border-white/10 p-12 relative bg-[#f8f6f0]/80 dark:bg-zinc-950/80 backdrop-blur-md">
                        <div className="sticky top-32 space-y-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-terracotta mb-6">Índice da Edição</h4>
                            {sections.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={cn(
                                        "block group py-1 pl-3 -ml-3 border-l-2 transition-colors",
                                        activeSection === item.id
                                            ? "border-heritage-terracotta"
                                            : "border-transparent"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "text-sm font-semibold transition-colors",
                                            activeSection === item.id
                                                ? "text-heritage-terracotta dark:text-heritage-terracotta"
                                                : "text-heritage-navy/50 dark:text-white/50 group-hover:text-heritage-navy dark:group-hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Areas */}
                    <div className="col-span-1 lg:col-span-9 flex flex-col bg-transparent">
                        
                        {/* Section: O Programa */}
                        <section id="programa" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 relative">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-terracotta pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Visão Geral</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">O Programa de Preservação</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            <span className="float-left text-6xl leading-[0.8] pr-3 pt-2 font-serif text-heritage-terracotta font-medium">I</span>
                                            niciativa do Instituto Português de Negócios Sociais (IPNS) que visa recuperar o património histórico familiar através de um modelo inovador que combina preservação, formação e turismo imersivo.
                                        </p>
                                        <p className="text-lg text-heritage-navy/60 dark:text-white/60 font-medium leading-relaxed border-l-2 border-heritage-terracotta/50 pl-6">
                                            O Bureau Social não entra como dono do património nem substitui a família proprietária — atua como assessor técnico e estratégico, ajudando a transformar património em projeto viável, financiável e operável.
                                        </p>
                                        <p className="text-base text-heritage-navy/70 dark:text-white/70 font-medium leading-relaxed italic">
                                            O Bureau Social entra para tornar executável um projeto que, sem assessoria, ficaria disperso entre restauro, burocracia, formação, financiamento e operação. Ajudamos patrimónios familiares e projetos locais a sair da intenção e virar programa executável.
                                        </p>
                                        <div className="mt-8 pt-6 border-t border-heritage-navy/10 dark:border-white/10 space-y-3">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-navy/50 dark:text-white/50 mb-4">O que deve ficar explícito</p>
                                            <ul className="space-y-2 text-sm text-heritage-navy/70 dark:text-white/70">
                                                <li className="flex gap-2"><span className="text-heritage-terracotta font-bold">1.</span> O património continua a pertencer e a ser orientado pelos seus donos e estruturas locais.</li>
                                                <li className="flex gap-2"><span className="text-heritage-terracotta font-bold">2.</span> O Bureau Social entra para apoiar, coordenar e viabilizar.</li>
                                                <li className="flex gap-2"><span className="text-heritage-terracotta font-bold">3.</span> A formação em ofícios é parte do modelo de reabilitação, impacto e sustentabilidade — não um acessório.</li>
                                                <li className="flex gap-2"><span className="text-heritage-terracotta font-bold">4.</span> O financiamento é montado a partir de programas compatíveis com património, formação, turismo e terceiro setor.</li>
                                                <li className="flex gap-2"><span className="text-heritage-terracotta font-bold">5.</span> Cada projeto é desenhado à medida do lugar, da família e da entidade gestora.</li>
                                            </ul>
                                        </div>
                                    </FadeIn>
                                </div>
                            </div>
                            
                            <FadeIn triggerOnView direction="up">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-heritage-navy/10 dark:border-white/10">
                                    <div className="space-y-4">
                                        <LucideHome className="w-8 h-8 text-heritage-terracotta" />
                                        <h3 className="font-serif text-2xl font-medium text-heritage-navy dark:text-white">Preservação Patrimonial</h3>
                                        <p className="text-heritage-navy/60 dark:text-white/60">Restauro de edifícios, jardins históricos e elementos patrimoniais utilizando técnicas tradicionais.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <LucideGraduationCap className="w-8 h-8 text-heritage-ocean" />
                                        <h3 className="font-serif text-2xl font-medium text-heritage-navy dark:text-white">Artes, Culinária e Ofícios</h3>
                                        <p className="text-heritage-navy/60 dark:text-white/60">Formação em culinária, botânica, música, e ofícios em risco.</p>
                                    </div>
                                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                                        <LucideLeaf className="w-8 h-8 text-heritage-gold" />
                                        <h3 className="font-serif text-2xl font-medium text-heritage-navy dark:text-white">Turismo Imersivo</h3>
                                        <p className="text-heritage-navy/60 dark:text-white/60">14 unidades Airbnb, escola de culinária e concertos nos jardins.</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </section>

                        {/* Section: Para quem é */}
                        <section id="paraquem" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 relative bg-[#f5f3ec] dark:bg-zinc-900">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-ocean pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Público-Alvo</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">Para Quem É</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            A assessoria do Bureau Social dirige-se a quem tem património histórico mas precisa de apoio técnico para o estruturar, financiar e operar.
                                        </p>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-navy/50 dark:text-white/50 mb-3">O cliente ideal reconhece-se nestas situações</p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                "Tenho património, mas não tenho uma estrutura técnica montada.",
                                                "Preciso de ajuda para captar financiamento.",
                                                "Preciso de ajuda para organizar parceiros, formação e execução.",
                                                "Preciso de um modelo para reabilitar sem perder a identidade do lugar."
                                            ].map((frase, i) => (
                                                <blockquote key={i} className="text-sm font-serif italic text-heritage-navy/70 dark:text-white/70 border-l-2 border-heritage-terracotta/40 pl-4 py-1">
                                                    "{frase}"
                                                </blockquote>
                                            ))}
                                        </div>
                                    </FadeIn>
                                </div>
                            </div>
                            <FadeIn triggerOnView direction="up">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-heritage-navy/10 dark:border-white/10">
                                    <div className="p-6 border border-heritage-navy/10 dark:border-white/10 bg-white dark:bg-zinc-950">
                                        <LucideHome className="w-8 h-8 text-heritage-terracotta mb-4" />
                                        <h3 className="font-serif text-xl font-medium text-heritage-navy dark:text-white mb-2">Famílias Proprietárias</h3>
                                        <p className="text-sm text-heritage-navy/60 dark:text-white/60">Quintas, torres, herdades e imóveis históricos que precisam de estruturação técnica.</p>
                                    </div>
                                    <div className="p-6 border border-heritage-navy/10 dark:border-white/10 bg-white dark:bg-zinc-950">
                                        <LucideShield className="w-8 h-8 text-heritage-ocean mb-4" />
                                        <h3 className="font-serif text-xl font-medium text-heritage-navy dark:text-white mb-2">IPSS e Associações</h3>
                                        <p className="text-sm text-heritage-navy/60 dark:text-white/60">Entidades que podem assumir a gestão operacional com apoio técnico.</p>
                                    </div>
                                    <div className="p-6 border border-heritage-navy/10 dark:border-white/10 bg-white dark:bg-zinc-950">
                                        <LucideBuilding2 className="w-8 h-8 text-heritage-gold mb-4" />
                                        <h3 className="font-serif text-xl font-medium text-heritage-navy dark:text-white mb-2">Entidades Gestoras</h3>
                                        <p className="text-sm text-heritage-navy/60 dark:text-white/60">Associações locais e estruturas que coordenam património e comunidade.</p>
                                    </div>
                                    <div className="p-6 border border-heritage-navy/10 dark:border-white/10 bg-white dark:bg-zinc-950 sm:col-span-2 lg:col-span-1">
                                        <LucideTarget className="w-8 h-8 text-heritage-terracotta mb-4" />
                                        <h3 className="font-serif text-xl font-medium text-heritage-navy dark:text-white mb-2">Parceiros Institucionais</h3>
                                        <p className="text-sm text-heritage-navy/60 dark:text-white/60">Câmaras, universidades e entidades que precisam de clarificar o papel do Bureau Social.</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </section>

                        {/* Section: Modelo Institucional */}
                        <section id="modelo" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 relative bg-[#f8f6f0] dark:bg-zinc-950">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-ocean pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Estrutura</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">Modelo Institucional</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            Uma parceria integrada entre os proprietários e a comunidade, coordenada com a expertise do IPNS e projetada para escalar impacto em rede.
                                        </p>
                                    </FadeIn>
                                </div>
                            </div>
                            
                            <FadeIn triggerOnView direction="up">
                                <ModeloInstitucional />
                            </FadeIn>
                        </section>
                        
                        {/* Section: Processo Operacional */}
                        <section id="processo" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 relative">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-gold pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Implementação</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">Processo Operacional</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            Desenvolvimento minucioso estruturado em 5 fases sequenciais para garantir execução sustentável.
                                        </p>
                                    </FadeIn>
                                </div>
                            </div>

                            <FadeIn triggerOnView direction="up">
                                <ProcessoOperacional />
                            </FadeIn>
                        </section>

                        {/* Section: Quinta Salreu */}
                        <section id="quinta" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 bg-[#f5f3ec] dark:bg-zinc-900 relative">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-navy dark:border-white pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Projeto Principal</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">Quinta do Visconde de Salreu</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            {quintaSalreuDetails.historia.texto}
                                        </p>
                                    </FadeIn>
                                </div>
                            </div>

                            <FadeIn triggerOnView direction="up">
                                <div className="grid grid-cols-2 gap-4 pb-8 mb-8 border-b border-heritage-navy/10 dark:border-white/10">
                                    <div>
                                        <p className="font-serif text-3xl font-medium text-heritage-terracotta">€2.070.000</p>
                                        <p className="text-[10px] uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 font-bold mb-1">Investimento</p>
                                    </div>
                                    <div>
                                        <p className="font-serif text-3xl font-medium text-heritage-navy dark:text-white">30 meses</p>
                                        <p className="text-[10px] uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 font-bold mb-1">Duração</p>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn triggerOnView direction="up">
                                <h3 className="font-serif text-2xl mb-6">Património a Preservar</h3>
                                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                    {quintaSalreuDetails.patrimonio.elementos.map((elem, i) => (
                                        <div key={i} className="p-6 bg-[#f8f6f0] dark:bg-zinc-950 border border-heritage-navy/10 dark:border-white/10">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="font-bold text-sm tracking-wide">{elem.nome}</h4>
                                                <Badge variant="outline" className={`text-[10px] rounded-none ${elem.estado === "Urgente" ? "border-red-500 text-red-500" : "border-heritage-navy/30 dark:border-white/30"}`}>
                                                    {elem.estado}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-heritage-navy/60 dark:text-white/60 leading-relaxed">{elem.descricao}</p>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>

                            <FadeIn triggerOnView direction="up">
                                <h3 className="font-serif text-2xl mb-6">Cronograma & Orçamento</h3>
                                <div className="border border-heritage-navy/10 dark:border-white/10 divide-y divide-heritage-navy/10 dark:divide-white/10">
                                    {quintaSalreuDetails.fases.map((fase, i) => (
                                        <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <span className="text-[10px] uppercase tracking-widest font-bold text-heritage-terracotta mb-1 block">Fase {fase.fase} // {fase.periodo}</span>
                                                <h4 className="font-bold text-sm mb-2">{fase.nome}</h4>
                                                <p className="text-xs text-heritage-navy/60 dark:text-white/60 leading-relaxed max-w-lg">{fase.descricao}</p>
                                            </div>
                                            <div className="text-right whitespace-nowrap">
                                                <p className="font-serif text-2xl text-heritage-navy dark:text-white">{fase.orcamento}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </section>

                        {/* Section: Torre Carvalhal */}
                        <section id="torre" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 bg-[#f5f3ec] dark:bg-zinc-900 relative">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-ocean pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Projeto Alentejo</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">{torreCarvalhalDetails.historia.titulo}</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            {torreCarvalhalDetails.historia.texto}
                                        </p>
                                    </FadeIn>
                                </div>
                            </div>

                            <FadeIn triggerOnView direction="up">
                                <h3 className="font-serif text-2xl mb-6">Estado de Conservação</h3>
                                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                    {torreCarvalhalDetails.patrimonio.elementos.map((elem, i) => (
                                        <div key={i} className="p-6 bg-heritage-ocean/5 dark:bg-ocean/10 border border-heritage-ocean/10">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="font-bold text-sm tracking-wide">{elem.nome}</h4>
                                                <Badge variant="outline" className={`text-[10px] rounded-none border-heritage-ocean text-heritage-ocean`}>
                                                    {elem.estado}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-heritage-navy/60 dark:text-white/60 leading-relaxed">{elem.descricao}</p>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>

                            <FadeIn triggerOnView direction="up">
                                <h3 className="font-serif text-2xl mb-6">Cronograma de Intervenção</h3>
                                <div className="border border-heritage-navy/10 dark:border-white/10 divide-y divide-heritage-navy/10 dark:divide-white/10">
                                    {torreCarvalhalDetails.fases.map((fase, i) => (
                                        <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <span className="text-[10px] uppercase tracking-widest font-bold text-heritage-ocean mb-1 block">Fase {fase.fase} // {fase.periodo}</span>
                                                <h4 className="font-bold text-sm mb-2">{fase.nome}</h4>
                                                <p className="text-xs text-heritage-navy/60 dark:text-white/60 leading-relaxed max-w-lg">{fase.descricao}</p>
                                            </div>
                                            <div className="text-right whitespace-nowrap">
                                                <p className="font-serif text-2xl text-heritage-navy dark:text-white">{fase.orcamento}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </section>

                        {/* Section: Artes & Ofícios */}
                        <section id="oficios" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 bg-[#f5f3ec] dark:bg-zinc-900 relative">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-gold pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Escola</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">Artes & Ofícios <br/><span className="italic font-normal">Tradicionais</span></h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            O programa cobre as principais tradições construtivas e culturais de Portugal, garantindo que o saber ancestral é transmitido às novas gerações.
                                        </p>
                                    </FadeIn>
                                </div>
                            </div>

                            <FadeIn triggerOnView direction="up">
                                <div className="mb-16">
                                    <MapaOficios />
                                </div>
                            </FadeIn>

                            <div className="space-y-0">
                                {[
                                    { titulo: "Culinária e Gastronomia", oficios: oficiosDetalhados.culinaria, icon: LucideStar },
                                    { titulo: "Botânica, Jardinismo e Sustentabilidade", oficios: oficiosDetalhados.botanica, icon: LucideLeaf },
                                    { titulo: "Artes e Ofícios Tradicionais", oficios: oficiosDetalhados.artes, icon: LucideHammer },
                                    { titulo: "Construção e Restauro", oficios: oficiosDetalhados.restauro, icon: LucideCastle }
                                ].map((categoria, i) => (
                                    <FadeIn triggerOnView direction="up" key={i}>
                                        <div className="border-t border-heritage-navy/20 dark:border-white/20 pt-12 pb-16 mt-0">
                                            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
                                                <div className="md:w-1/3 shrink-0 flex items-start gap-4">
                                                    <div className="w-8 h-8 rounded-full border border-heritage-navy/10 dark:border-white/10 flex items-center justify-center shrink-0">
                                                        <categoria.icon className="w-4 h-4 text-heritage-navy/60 dark:text-white/60" />
                                                    </div>
                                                    <h3 className="font-serif text-3xl text-heritage-navy dark:text-white leading-tight">{categoria.titulo}</h3>
                                                </div>
                                                <div className="md:w-2/3 w-full grid sm:grid-cols-2 gap-x-12 gap-y-0">
                                                    {categoria.oficios.map((oficio, j) => (
                                                        <Sheet key={j}>
                                                            <SheetTrigger asChild>
                                                                <button
                                                                    className="text-left w-full group py-5 border-b border-heritage-navy/10 dark:border-white/10 last:border-b-0 sm:last:border-b relative"
                                                                    title="Clique para ver detalhes"
                                                                >
                                                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-heritage-terracotta text-white text-[10px] font-bold uppercase tracking-widest rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow-xl whitespace-nowrap after:absolute after:left-1/2 after:-translate-x-1/2 after:top-full after:border-4 after:border-transparent after:border-t-heritage-terracotta">
                                                                        Clique para ver detalhes
                                                                    </span>
                                                                    <div className="flex items-start justify-between gap-4">
                                                                        <div>
                                                                            <h4 className="font-bold text-sm text-heritage-navy dark:text-white group-hover:text-heritage-terracotta transition-colors leading-snug">{oficio.nome}</h4>
                                                                            <p className="text-[10px] font-bold text-heritage-navy/40 dark:text-white/40 mt-1 uppercase tracking-widest leading-relaxed line-clamp-1">{oficio.aplicacao}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-3 shrink-0 pt-0.5">
                                                                            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 border border-heritage-navy/20 dark:border-white/20 whitespace-nowrap">{oficio.duracao}</span>
                                                                            <LucideArrowRight className="w-4 h-4 text-heritage-navy/30 dark:text-white/30 group-hover:text-heritage-navy dark:group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200" />
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            </SheetTrigger>
                                                            <SheetContent side="right" className="w-full max-w-2xl font-sans rounded-none border-l-2 border-heritage-navy dark:border-white bg-[#f8f6f0] dark:bg-zinc-950 overflow-y-auto p-8 pt-14">
                                                                <SheetHeader>
                                                                    <SheetTitle className="font-serif text-4xl text-heritage-navy dark:text-white leading-tight mb-2">{oficio.nome}</SheetTitle>
                                                                </SheetHeader>
                                                                <div className="space-y-6 mt-4">
                                                                    <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider">
                                                                        <span className="px-3 py-1 border border-heritage-navy/20 dark:border-white/20 text-heritage-navy dark:text-white">{oficio.duracao}</span>
                                                                        <span className="px-3 py-1 border border-heritage-navy/20 dark:border-white/20 text-heritage-navy dark:text-white">{oficio.certificacao}</span>
                                                                        <span className="px-3 py-1 border border-heritage-navy/20 dark:border-white/20 text-heritage-navy/60 dark:text-white/60">{oficio.aplicacao}</span>
                                                                    </div>

                                                                    <p className="text-heritage-navy/80 dark:text-white/80 leading-relaxed text-lg font-serif italic border-l block border-heritage-navy/20 dark:border-white/20 pl-6 my-8">{oficio.descricao}</p>

                                                                    <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-heritage-navy/10 dark:border-white/10">
                                                                        <div>
                                                                            <h4 className="font-bold text-[10px] uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mb-4 flex items-center gap-2">
                                                                                Competências
                                                                            </h4>
                                                                            <ul className="space-y-3">
                                                                                {oficio.competencias.map((comp, k) => (
                                                                                    <li key={k} className="flex items-start gap-3 text-sm font-medium text-heritage-navy/80 dark:text-white/80">
                                                                                        <span className="text-[10px] tabular-nums font-bold tracking-widest text-heritage-navy/30 dark:text-white/30 pt-0.5">{k + 1}</span>
                                                                                        {comp}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>

                                                                        <div className="space-y-8">
                                                                            <div>
                                                                                <h4 className="font-bold text-[10px] uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mb-2">Carga Horária</h4>
                                                                                <p className="font-serif text-2xl">{oficio.horas}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h4 className="font-bold text-[10px] uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mb-2">Inserção Profissional</h4>
                                                                                <p className="font-serif text-2xl leading-tight">{oficio.insercao}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SheetContent>
                                                        </Sheet>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </section>

                        {/* Section: Funcionamento */}
                        <section id="funcionamento" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 relative">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-ocean pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Pedagogia</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">Funcionamento <br/>da Escola</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            Metodologia assente no princípio "Aprender Fazendo", utilizando os imóveis a restaurar como laboratórios reais de obra.
                                        </p>
                                    </FadeIn>
                                </div>
                            </div>

                            <FadeIn triggerOnView direction="up">
                                <div className="border border-heritage-navy/10 dark:border-white/10 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-heritage-navy/10 dark:divide-white/10">
                                    {funcionamentoDetails.modalidades.map((mod, i) => (
                                        <div key={i} className="p-6">
                                            <mod.icon className="w-8 h-8 text-heritage-ocean mb-4" />
                                            <h3 className="font-serif text-xl mb-1">{mod.titulo}</h3>
                                            <p className="text-[10px] uppercase tracking-widest text-heritage-ocean font-bold mb-3">{mod.duracao}</p>
                                            <p className="text-xs text-heritage-navy/60 dark:text-white/60">{mod.objetivo}</p>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>

                            <FadeIn triggerOnView direction="up">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-heritage-navy/50 dark:text-white/50 mt-12 mb-6">Componentes da Formação</p>
                                <div className="grid sm:grid-cols-3 gap-6">
                                    {funcionamentoDetails.componentes.map((c, i) => (
                                        <div key={i} className="p-6 bg-white/50 dark:bg-zinc-900/50 border border-heritage-navy/10 dark:border-white/10">
                                            <h4 className="font-serif text-lg text-heritage-navy dark:text-white mb-1">{c.label}</h4>
                                            <p className="text-3xl font-serif text-heritage-ocean dark:text-heritage-gold mb-2">
                                                <AnimatedCounter to={parseInt(c.percent, 10)} suffix="%" duration={1.2} />
                                            </p>
                                            <p className="text-xs text-heritage-navy/60 dark:text-white/60">{c.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </section>

                        {/* Section: Governança */}
                        <section id="governanca" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 bg-[#f5f3ec] dark:bg-zinc-900 relative">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-gold pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Estrutura Social</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">Governança e Transparência</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            Uma estrutura sólida de pesos e contrapesos que envolve a família proprietária, a comunidade através das IPSS locais, e o IPNS como entidade coordenadora.
                                        </p>
                                    </FadeIn>
                                </div>
                            </div>

                            <FadeIn triggerOnView direction="up">
                                <div className="space-y-6">
                                    {governancaDetails.niveis.map((nivel, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-zinc-950 border border-heritage-navy/10 dark:border-white/10">
                                            <div className="sm:w-1/3 border-b sm:border-b-0 sm:border-r border-heritage-navy/10 dark:border-white/10 pb-4 sm:pb-0 sm:pr-6">
                                                <h3 className="font-serif text-xl">{nivel.pilar}</h3>
                                            </div>
                                            <div className="sm:w-2/3">
                                                <p className="text-sm text-heritage-navy/60 dark:text-white/60 leading-relaxed">{nivel.papel}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </section>

                        {/* Section: Proposta */}
                        <section id="proposta" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 relative">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-terracotta pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Acordo IPNS</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">Proposta Financeira</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            Modelos de assessoria desenhados para assegurar a sustentabilidade e viabilidade do restauro monumental.
                                        </p>
                                    </FadeIn>
                                </div>
                            </div>

                            {/* KPIs com contador animado */}
                            <FadeIn triggerOnView direction="up">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                                    {kpiDetails.map((kpi, i) => {
                                        const Icon = kpi.icon
                                        return (
                                            <div key={i} className="p-6 border border-heritage-navy/10 dark:border-white/10 bg-white dark:bg-zinc-950">
                                                <Icon className="w-6 h-6 text-heritage-terracotta mb-4" />
                                                <div className="font-serif text-3xl md:text-4xl font-medium text-heritage-navy dark:text-white mb-2">
                                                    {i === 0 && <AnimatedCounter to={14} suffix=" unidades" duration={1.5} />}
                                                    {i === 1 && <AnimatedCounter to={1800000} prefix="€" format={(n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} duration={2} />}
                                                    {i === 2 && <AnimatedCounter to={30} suffix="+ pessoas" duration={1.5} />}
                                                    {i === 3 && <AnimatedCounter to={25} suffix=" postos" duration={1.5} />}
                                                </div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-heritage-navy/50 dark:text-white/50">{kpi.meta}</p>
                                            <p className="text-xs text-heritage-navy/40 dark:text-white/40 mt-1">{kpi.prazo}</p>
                                        </div>
                                    );
                                    })}
                                </div>
                            </FadeIn>

                            <FadeIn triggerOnView direction="up">
                                <div className="grid md:grid-cols-3 gap-6 mb-16">
                                    {propostas.map((prop, i) => (
                                        <div key={i} className={`p-8 border flex flex-col justify-between ${prop.destaque ? 'border-heritage-terracotta bg-[#f5f3ec] dark:bg-zinc-900 shadow-xl relative' : 'border-heritage-navy/10 dark:border-white/10'}`}>
                                            {prop.destaque && (
                                                <div className="absolute top-0 right-0 bg-heritage-terracotta text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 -mt-3 -mr-3 transform rotate-3">
                                                    Recomendado
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-sm font-bold uppercase tracking-widest text-heritage-navy/40 dark:text-white/40 mb-4">Opção {prop.opcao}</div>
                                                <h3 className="font-serif text-2xl mb-2">{prop.projeto}</h3>
                                                <p className="text-xs text-heritage-navy/60 dark:text-white/60 min-h-[60px]">{prop.descricao}</p>
                                            </div>
                                            
                                            <div className="mt-8 pt-6 border-t border-heritage-navy/10 dark:border-white/10">
                                                <div className="mb-4">
                                                    <p className="text-[10px] uppercase tracking-widest text-heritage-navy/40 dark:text-white/40 font-bold">Honorários Base</p>
                                                    <p className={`font-serif text-3xl ${prop.destaque ? 'text-heritage-terracotta' : ''}`}>{prop.honorarios}</p>
                                                </div>
                                                <div className="flex justify-between items-center text-sm border-t border-heritage-navy/5 dark:border-white/5 pt-2">
                                                    <span className="text-heritage-navy/60 dark:text-white/60">Taxa de Gestão</span>
                                                    <span className="font-bold">{prop.taxaGestao}</span>
                                                </div>
                                                {prop.economia && (
                                                    <div className="flex justify-between items-center text-sm border-t border-heritage-navy/5 dark:border-white/5 pt-2 mt-2">
                                                        <span className="text-heritage-navy/60 dark:text-white/60">Economia</span>
                                                        <span className="font-bold text-green-600 dark:text-green-400">{prop.economia}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </section>

                        {/* Section: Financiamento */}
                        <section id="financiamento" className="p-8 md:p-16 lg:p-24 border-b border-heritage-navy/10 dark:border-white/10 bg-[#f5f3ec] dark:bg-zinc-900 relative">
                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-16">
                                <div className="md:col-span-4 border-t-2 border-heritage-gold pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Capitais</span>
                                        <h2 className="font-serif text-4xl leading-tight text-heritage-navy dark:text-white">Fontes de Financiamento</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8 flex flex-col gap-10">
                                    <FadeIn triggerOnView direction="left">
                                        <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                            Estratégia diversificada alavancando os fundos do PRR e PT2030 para reabilitação do património classificado.
                                        </p>
                                    </FadeIn>
                                </div>
                            </div>
                            
                            <FadeIn triggerOnView direction="up">
                                <div className="mb-16">
                                    <FinanciamentoVisual />
                                </div>
                            </FadeIn>
                            
                            <FadeIn triggerOnView direction="up">
                                <div className="mb-8">
                                    <CronogramaVisual />
                                </div>
                            </FadeIn>
                        </section>

                        {/* Section: Próximos Passos */}
                        <section id="passos" className="p-8 md:p-16 lg:p-24 relative overflow-hidden bg-heritage-navy dark:bg-zinc-950 text-white group/section">
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src="https://images.unsplash.com/photo-1555819206-8949f38ea96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                                    alt="Portuguese Heritage"
                                    className="w-full h-full object-cover opacity-10 grayscale group-hover/section:scale-105 transition-transform duration-[10s] ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-heritage-navy via-heritage-navy/95 to-transparent dark:from-zinc-950 dark:via-zinc-950/95" />
                            </div>

                            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 relative z-10">
                                <div className="md:col-span-4 border-t-2 border-heritage-terracotta pt-4">
                                    <FadeIn triggerOnView>
                                        <span className="text-white/50 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Ação</span>
                                        <h2 className="font-serif text-4xl leading-tight text-white">Próximos Passos</h2>
                                    </FadeIn>
                                </div>
                                <div className="md:col-span-8">
                                    <FadeIn triggerOnView direction="up">
                                        <div className="-mt-8">
                                            <ProximosPassosVisual />
                                        </div>
                                    </FadeIn>

                                    <FadeIn triggerOnView direction="up">
                                        <p className="text-base text-white/70 mb-6 leading-relaxed">
                                            A Assessoria apresenta o Bureau Social como parceiro técnico de famílias proprietárias e entidades gestoras que precisam de ajuda para preservar património, captar financiamento e estruturar programas de formação e operação. Não é uma página para investidores externos — é para potenciais clientes de assessoria.
                                        </p>
                                        <p className="text-xl sm:text-2xl font-serif text-white/90 mb-8 italic">
                                            Converse connosco para avaliar como podemos ajudar o seu projeto de património.
                                        </p>
                                        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Contato do Assessor</p>
                                                <p className="font-serif text-xl">Diego Rocha</p>
                                                <p className="text-white/60 text-sm">dmrdiego@gmail.com</p>
                                            </div>
                                            <div className="sm:text-right">
                                                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Validade da Proposta</p>
                                                <p className="font-serif text-3xl text-heritage-terracotta">90 Dias</p>
                                            </div>
                                        </div>
                                    </FadeIn>
                                </div>
                            </div>
                        </section>
                        
                    </div>
                </div>
            </div>
        </PasswordGate>
    )
}
