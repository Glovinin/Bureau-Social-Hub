import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import PasswordGate from "@/components/PasswordGate"
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
    LucideShield,
    LucideListOrdered,
    LucideBookOpen
} from "lucide-react"
import ModeloInstitucional from "@/components/visuals/ModeloInstitucional"
import MapaOficios from "@/components/visuals/MapaOficios"
import FinanciamentoVisual from "@/components/visuals/FinanciamentoVisual"
import CronogramaVisual from "@/components/visuals/CronogramaVisual"
import ProcessoOperacional from "@/components/visuals/ProcessoOperacional"

// Dados detalhados dos ofícios tradicionais — Artes & Ofícios (atualizado reunião Fev/2026)
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
            { nome: "8 Unidades Habitacionais", estado: "Alta", descricao: "Conversão dos anexos (garagem, lagar, casa de lenha) em 8 unidades turísticas (4×T0 + 4×T1)" },
            { nome: "Estufas e Viveiros", estado: "Média", descricao: "Duas estufas históricas para propagação botânica e recuperação de espécies" },
            { nome: "Palacete Principal", estado: "Preservação", descricao: "Visitação guiada agendada — mantém carácter de casa de família" }
        ]
    },
    fases: [
        { fase: "1", nome: "Projetos e Licenciamento", periodo: "Meses 1-6", descricao: "Levantamento arquitetónico, projeto de arquitetura, engenharia, licenciamento e projeto de jardim (Cristina Castelo Branco)", orcamento: "€80.000" },
        { fase: "2", nome: "Restauro do Solar Principal", periodo: "Meses 7-16", descricao: "Consolidação estrutural, cobertura, caixilharia, instalações técnicas e restauro do solar", orcamento: "€720.000" },
        { fase: "3", nome: "Jardim, Alojamento e Formação", periodo: "Meses 12-20", descricao: "Restauro do jardim histórico, conversão dos anexos em 8 unidades de alojamento (T0 e T1) e arranque do centro de formação", orcamento: "€640.000" },
        { fase: "4", nome: "Equipamento e Arranque", periodo: "Meses 20-24", descricao: "Equipamento das unidades, loja de artesanato, marketing e arranque operacional", orcamento: "€60.000" }
    ],
    receitas: [
        { fonte: "Alojamento (8 un. × €78/noite × 153 dias)", ano1: "€50.000", ano2: "€75.000", ano3: "€95.500" },
        { fonte: "Formação — Cursos longos (54 formandos × €1.200)", ano1: "€25.000", ano2: "€45.000", ano3: "€64.800" },
        { fonte: "Formação — Workshops (300 participantes × €75)", ano1: "€8.000", ano2: "€15.000", ano3: "€22.500" },
        { fonte: "Experiências turísticas (2.000 × €80)", ano1: "€15.000", ano2: "€32.000", ano3: "€48.000" },
        { fonte: "Visitas guiadas (3.000 visitantes × €8)", ano1: "€5.000", ano2: "€14.000", ano3: "€24.000" },
        { fonte: "Eventos culturais + loja", ano1: "€10.000", ano2: "€25.000", ano3: "€45.200" }
    ],
    resultadoOperacional: { receita: "€300k–€350k", custos: "€160k–€190k", resultado: "€130k–€190k", margem: "38–45%", retorno: "~6–8 anos" },
    impacto: [
        { indicador: "Alojamento", valor: "8", descricao: "Unidades turísticas nos anexos (4×T0 + 4×T1)" },
        { indicador: "Formandos/Ano", valor: "54+", descricao: "Certificados IEFP em culinária, jardinismo, música e artes" },
        { indicador: "Emprego Direto", valor: "8–10", descricao: "Postos de trabalho diretos criados" },
        { indicador: "Visitantes/Ano", valor: "3.000", descricao: "Visitantes anuais previstos (Ano 3)" }
    ],
    modelo: {
        pilares: [
            { nome: "Família Proprietária", descricao: "Mantém a titularidade e a residência no palacete. Visitação guiada agendada." },
            { nome: "IPSS Banda Visconde de Salreu", descricao: "IPSS já existente (gestora Raquel), articulada com a prefeitura, com licenças e estrutura constituída." },
            { nome: "IPNS - Bureau Social", descricao: "Parceiro estratégico para captação de recursos, formação e coordenação do projeto." }
        ]
    }
}

// Detalhes do projeto Torre do Carvalhal — atualizado documentos Mar/2026
const torreCarvalhalDetails = {
    historia: {
        titulo: "Torre do Carvalhal",
        texto: "A Torre do Carvalhal é um símbolo do poder senhorial na arquitetura manuelino-mudéjar alentejana do séc. XVI. A Ermida possui azulejaria do século XVI — comparável apenas à da Universidade de Évora. A propriedade inclui entre 400 e 600 hectares de montado com sobreiros e azinheiras endémicas, inserida na Rede Natura 2000 (Sítio Monfurado). É aqui que se pratica o ofício do Corticeiro — a extração de cortiça dos sobreiros centenários, uma arte técnica em risco de desaparecimento. O projeto adopta um modelo de retiro holístico sustentável com 6 eco-lodges construídas em taipa, pedra e cortiça."
    },
    patrimonio: {
        titulo: "Património a Preservar",
        elementos: [
            { nome: "Torre Medieval (150 m²)", estado: "Ruína Avançada", descricao: "Consolidação urgente da estrutura manuelino-mudéjar de 17 metros" },
            { nome: "Ermida e Azulejaria Mudejária (séc. XVI)", estado: "Ruína", descricao: "Azulejaria única, comparável à de Sintra e Universidade de Évora" },
            { nome: "6 Eco-Lodges (taipa/pedra/cortiça)", estado: "Projeto", descricao: "Construção nova com materiais locais, energia solar off-grid e aquecimento a lenha" },
            { nome: "Montado de Sobro (600 ha)", estado: "Bom", descricao: "Sobreiros centenários — produção de cortiça, mel, cogumelos e plantas aromáticas" },
            { nome: "Forno de Cal Histórico", estado: "Abandonado", descricao: "Musealização e sinalização interpretativa — peça única de património industrial" }
        ]
    },
    fases: [
        { fase: "1", nome: "Projetos e Licenciamento", periodo: "Meses 1-8", descricao: "Levantamento técnico, projeto de arquitetura, paisagismo, licenciamento municipal e DGPC, arqueologia preventiva", orcamento: "€80.000" },
        { fase: "2", nome: "Torre Medieval e Ermida", periodo: "Meses 9-20", descricao: "Restauro estrutural da torre + restauro especializado da ermida e azulejaria mudejária", orcamento: "€425.000" },
        { fase: "3", nome: "Eco-Lodges e Infraestrutura", periodo: "Meses 14-26", descricao: "Construção de 6 eco-lodges em taipa/pedra/cortiça + energia solar off-grid, captação de água e saneamento ecológico", orcamento: "€548.000" },
        { fase: "4", nome: "Equipamento e Arranque", periodo: "Meses 26-30", descricao: "Forno de cal, centro interpretativo, equipamentos, marketing e arranque operacional", orcamento: "€147.000" }
    ],
    montado: [
        { atividade: "Produção de cortiça", receita: "Incluso nos pacotes", obs: "Sobreiros centenários, ciclo de 9 anos" },
        { atividade: "Mel e apicultura", receita: "Incluso nos pacotes", obs: "Produto local para os retiros" },
        { atividade: "Cogumelos silvestres", receita: "Incluso nos pacotes", obs: "Colheita sazonal (outono/inverno)" },
        { atividade: "Plantas aromáticas", receita: "Incluso nos pacotes", obs: "Alecrim, tomilho, orégãos" }
    ],
    receitas: [
        { fonte: "Alojamento (6 eco-lodges × €95/noite × 139 dias)", ano1: "€40.000", ano2: "€62.000", ano3: "€79.230" },
        { fonte: "Retiros e experiências (800 participantes × €90)", ano1: "€25.000", ano2: "€50.000", ano3: "€72.000" },
        { fonte: "Formação (32 formandos + 200 workshops)", ano1: "€15.000", ano2: "€30.000", ano3: "€45.000" },
        { fonte: "Visitas guiadas (2.000 visitantes × €12)", ano1: "€8.000", ano2: "€16.000", ano3: "€24.000" },
        { fonte: "Produtos do montado (cortiça, mel, cogumelos)", ano1: "€5.000", ano2: "€10.000", ano3: "€15.000" },
        { fonte: "Eventos e retiros corporativos (6 × €3.000)", ano1: "€6.000", ano2: "€12.000", ano3: "€18.000" }
    ],
    resultadoOperacional: { receita: "€253.000", custos: "€133.000", resultado: "€120.000", margem: "47%", retorno: "~5–7 anos" },
    impacto: [
        { indicador: "Área", valor: "600 ha", descricao: "Montado sob gestão sustentável (Rede Natura 2000)" },
        { indicador: "Eco-Lodges", valor: "6", descricao: "Alojamentos em taipa, pedra e cortiça locais" },
        { indicador: "Formandos/Ano", valor: "32+", descricao: "Azulejaria, taipa, subericultura e cal artesanal" },
        { indicador: "Investimento", valor: "€1,2M", descricao: "Investimento total em 30 meses" }
    ],
    modelo: {
        pilares: [
            { nome: "Proprietário (DOVA)", descricao: "Detém a titularidade e assegura a visão de longo prazo do legado familiar." },
            { nome: "Associação (APHC)", descricao: "Gestora local focada no restauro, cortiça e montado sustentável — parceria com ICNF." },
            { nome: "IPNS + U. Évora", descricao: "Assessoria estratégica, captação de fundos e parceria científica para azulejaria mudejária." }
        ]
    }
}


const propostas = [
    { opcao: "A", projeto: "Quinta Salreu", honorarios: "€120.000", investimento: "€1.500.000", taxaGestao: "8%", desconto: "—", destaque: false, descricao: "Assessoria para o projeto de experiência imersiva em Estarreja (8 unidades, escola de artes e culinária, 24 meses)" },
    { opcao: "B", projeto: "Torre Carvalhal", honorarios: "€96.000", investimento: "€1.200.000", taxaGestao: "8%", desconto: "—", destaque: false, descricao: "Assessoria para restauro e retiro holístico no Alentejo (ermida, 6 eco-lodges, montado, 30 meses)" },
    { opcao: "C", projeto: "Programa Integrado", honorarios: "€183.600", investimento: "€2.700.000", taxaGestao: "6,8%", economia: "€32.400", desconto: "15%", destaque: true, descricao: "Assessoria integrada Norte-Sul: culinária, botânica, música, cortiça e turismo imersivo — poupança de €32.400 vs. projetos separados." }
]

const passosDetails = [
    { num: "01", titulo: "Constituição das Entidades", desc: "Formalização da Associação para a Preservação da Quinta do Visconde de Salreu (IPSS) e protocolo com a APHC para a Torre do Carvalhal." },
    { num: "02", titulo: "Projetos de Arquitetura e Licenciamento", desc: "Início dos projetos de arquitetura, engenharia e paisagismo. Pedidos de licenciamento junto dos municípios e DGPC." },
    { num: "03", titulo: "Candidaturas Portugal 2030 e PRR", desc: "Submissão de candidaturas ao Portugal 2030 (abertura prevista 2.º sem. 2026) e ao PRR — Componente 16 Cultura. Estimativa: €1.200.000–€1.400.000 por projeto." },
    { num: "04", titulo: "Protocolos com Parceiros", desc: "Celebração de protocolos com Banda Visconde de Salreu, IEFP, Câmara Municipal de Estarreja, Câmara de Montemor e Universidade de Évora." },
    { num: "05", titulo: "Arranque das Obras (Mês 7)", desc: "Início do restauro estrutural em ambos os projetos, com imprevistos de 12,6% (Salreu) e 13,8% (Carvalhal) incluídos no orçamento." }
]

const fontesDetails = [
    { titulo: "DOCX_v5 — Quinta Salreu (Mar/2026)", desc: "Documentos v5 com orçamento de €1.500.000, modelo de receitas (€300k–€350k Ano 3), 4 fases de 24 meses e modelo de financiamento PT2030/PRR/IEFP." },
    { titulo: "DOCX_v5 — Torre Carvalhal (Mar/2026)", desc: "Documentos v5 com orçamento de €1.200.000, modelo de receitas (€253k Ano 3), 4 fases de 30 meses e 6 eco-lodges em taipa/pedra/cortiça." },
    { titulo: "Transcrição da Reunião de Adequações (Fev/2026)", desc: "Decisões estratégicas sobre orçamento, mudança de foco para artes/culinária e novo modelo institucional (IPSS)." },
    { titulo: "Portugal 2030 / PRR / IEFP / Turismo PT", desc: "Linhas de financiamento: PT2030 — 65-85%, PRR Cultura — 100% fundo perdido, IEFP — 75-100% formação, Turismo PT — 40-75%." },
    { titulo: "Universidade de Évora / Guedu Atelier / AirDNA", desc: "Referências científicas (azulejaria mudejária), custos de restauro patrimonial em Portugal 2025-2026 e dados de mercado Airbnb/turismo rural." }
]

const financiamento = [
    {
        fonte: "Portugal 2030 + PRR (por projeto)", total: "€1.200k–€1.400k", items: [
            { nome: "Portugal 2030 — Centro/Alentejo", valor: "€700k–€900k", descricao: "Programa Regional de Património e Cultura — taxa 65-85% (majoração zona baixa densidade + IPSS)" },
            { nome: "PRR — Componente 16 Cultura", valor: "€300k–€500k", descricao: "100% fundo perdido — avisos periódicos, adiantamento 30%, decisão em 2-4 meses" },
            { nome: "FEADER / LIFE", valor: "€80k–€150k", descricao: "Agricultura sustentável, montado e biodiversidade (Torre do Carvalhal)" }
        ]
    },
    {
        fonte: "IEFP + Turismo de Portugal (por projeto)", total: "€180k–€350k", items: [
            { nome: "IEFP — Formação Profissional", valor: "€80k–€150k", descricao: "Programas de formação certificada em artes e ofícios — taxa 75-100%, contínuo" },
            { nome: "Turismo de Portugal", valor: "€100k–€200k", descricao: "Linha de Apoio ao Turismo Rural — taxa 50-75%, abertura 1.º sem. 2026" }
        ]
    },
    {
        fonte: "Municipal + Mecenato + Capitais Próprios", total: "€280k–€580k", items: [
            { nome: "Câmara Municipal", valor: "€30k–€80k", descricao: "Apoio a projetos culturais — Estarreja e Montemor-o-Novo" },
            { nome: "Mecenato Cultural", valor: "€50k–€100k", descricao: "Lei do Mecenato (DL 74/99) — benefício fiscal para mecenas" },
            { nome: "Capitais Próprios", valor: "€200k–€400k", descricao: "Investimento dos promotores (10-27% do total) — obrigatório nas candidaturas" }
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
    { meta: "Unidades de Alojamento", kpi: "14 unidades", prazo: "24 meses", icon: LucideFileText, desc: "8 unidades na Quinta Salreu (T0 + T1) + 6 eco-lodges em taipa/pedra na Torre do Carvalhal." },
    { meta: "Investimento Total", kpi: "€2.700.000", prazo: "30 meses", icon: LucideEuro, desc: "€1.500.000 (Salreu, 24 meses) + €1.200.000 (Carvalhal, 30 meses), financiados por PT2030, PRR e IEFP." },
    { meta: "Formandos por Ano", kpi: "86+ pessoas", prazo: "Ano 3", icon: LucideAward, desc: "54+ formandos/ano (Salreu) + 32 formandos/ano (Carvalhal), certificados pelo IEFP." },
    { meta: "Empregos Criados", kpi: "18+ diretos", prazo: "Ano 3", icon: LucideCheckCircle2, desc: "8-10 postos diretos (Salreu) + 8 postos diretos (Carvalhal), com receitas combinadas de €550.000+/ano." }
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
                                    <p className="text-2xl font-black text-heritage-navy dark:text-white">€2.700.000</p>
                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40 font-bold uppercase tracking-wider">Investimento Total (2 Projetos)</p>
                                </div>
                            </div>
                            <div className="glass-card px-8 py-4 rounded-2xl flex items-center gap-3">
                                <LucideCalendarClock className="w-6 h-6 text-heritage-ocean" />
                                <div className="text-left">
                                    <p className="text-2xl font-black text-heritage-navy dark:text-white">24–30 Meses</p>
                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40 font-bold uppercase tracking-wider">Duração Integrada</p>
                                </div>
                            </div>
                            <div className="glass-card px-8 py-4 rounded-2xl flex items-center gap-3">
                                <LucideBuilding2 className="w-6 h-6 text-heritage-gold" />
                                <div className="text-left">
                                    <p className="text-2xl font-black text-heritage-navy dark:text-white">2 Projetos</p>
                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40 font-bold uppercase tracking-wider">Norte (Aveiro) + Sul (Alentejo)</p>
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
                                    { value: "passos", label: "Próximos Passos", icon: LucideListOrdered },
                                    { value: "fontes", label: "Fontes", icon: LucideBookOpen },
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
                                            { icon: LucideHome, titulo: "Preservação Patrimonial", desc: "Restauro de edifícios, jardins históricos e elementos patrimoniais utilizando técnicas tradicionais" },
                                            { icon: LucideGraduationCap, titulo: "Artes, Culinária e Ofícios", desc: "Formação em culinária portuguesa, botânica, música, rendas, decoração e ofícios tradicionais em risco" },
                                            { icon: LucideLeaf, titulo: "Turismo de Experiência Imersiva", desc: "14 unidades Airbnb nos anexos, escola de culinária, concertos nos jardins e sequestro de carbono" }
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
                                            { num: "1", titulo: "Parceria com IPSS Existente", desc: "Para a Quinta Salreu, articulação com a IPSS da Banda Visconde de Salreu (gestora Raquel), que já possui licenças, estrutura e mais de 50 associados." },
                                            { num: "2", titulo: "Parceria com o IPNS", desc: "O Instituto Português de Negócios Sociais (Bureau Social) atua como assessor estratégico na captação de recursos, formação e coordenação do projeto." },
                                            { num: "3", titulo: "Captação de Financiamento", desc: "Candidatura ao PRR/Portugal 2030, IEFP, FEADER e FSE+, complementados por contrapartida da família (10%)." },
                                            { num: "4", titulo: "Formação e Restauro", desc: "Mestres artesãos e especialistas formam aprendizes locais em culinária, botânica, música, restauro e ofícios tradicionais." },
                                            { num: "5", titulo: "Turismo de Experiência Imersiva", desc: "14 unidades Airbnb nos anexos, escola de culinária, concertos nos jardins, turismo rural no Alentejo — gerando receitas sustentáveis." }
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
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <LucideShieldCheck className="w-8 h-8 text-heritage-terracotta" />
                                        <h3 className="text-2xl font-black text-heritage-navy dark:text-white">Modelo Institucional Integrado</h3>
                                    </div>
                                    <ModeloInstitucional />
                                </div>

                                {/* Processo Operacional Visual */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <LucideCheckCircle2 className="w-8 h-8 text-heritage-terracotta" />
                                        <h3 className="text-2xl font-black text-heritage-navy dark:text-white uppercase tracking-tight">O Processo em 5 Fases</h3>
                                    </div>
                                    <ProcessoOperacional />
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
                                                Espaço de experiência imersiva na cultura tradicional portuguesa — culinária, botânica, música e ofícios. O Visconde foi o maior exportador de azeite de Portugal.
                                            </p>
                                        </div>
                                        <div className="flex gap-8">
                                            <div className="text-center">
                                                <p className="text-4xl font-black text-heritage-terracotta">€1.500.000</p>
                                                <p className="text-sm font-bold text-heritage-navy/40 dark:text-white/40 uppercase">Investimento</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-4xl font-black text-heritage-navy dark:text-white">24 meses</p>
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

                                {/* Sustentabilidade Financeira — Quinta Salreu */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-2">Sustentabilidade Financeira</h3>
                                    <p className="text-sm text-heritage-navy/50 dark:text-white/40 mb-8">Projeção de receitas por fonte (operação plena no Ano 3)</p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-heritage-navy/10 dark:border-white/10">
                                                    <th className="text-left py-3 pr-4 font-black text-heritage-navy/60 dark:text-white/40 uppercase text-[10px] tracking-widest">Fonte de Receita</th>
                                                    <th className="text-right py-3 px-3 font-black text-heritage-navy/60 dark:text-white/40 uppercase text-[10px] tracking-widest">Ano 1</th>
                                                    <th className="text-right py-3 px-3 font-black text-heritage-navy/60 dark:text-white/40 uppercase text-[10px] tracking-widest">Ano 2</th>
                                                    <th className="text-right py-3 pl-3 font-black text-heritage-terracotta uppercase text-[10px] tracking-widest">Ano 3</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {quintaSalreuDetails.receitas.map((r, i) => (
                                                    <tr key={i} className="border-b border-heritage-navy/5 dark:border-white/5">
                                                        <td className="py-3 pr-4 text-heritage-navy/70 dark:text-white/60">{r.fonte}</td>
                                                        <td className="py-3 px-3 text-right text-heritage-navy/50 dark:text-white/40">{r.ano1}</td>
                                                        <td className="py-3 px-3 text-right text-heritage-navy/50 dark:text-white/40">{r.ano2}</td>
                                                        <td className="py-3 pl-3 text-right font-black text-heritage-terracotta">{r.ano3}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                        {[
                                            { label: "Receita Total Ano 3", valor: quintaSalreuDetails.resultadoOperacional.receita, color: "text-heritage-terracotta" },
                                            { label: "Custos Operacionais", valor: quintaSalreuDetails.resultadoOperacional.custos, color: "text-heritage-navy dark:text-white" },
                                            { label: "Margem Operacional", valor: quintaSalreuDetails.resultadoOperacional.margem, color: "text-heritage-success" },
                                            { label: "Retorno do Investimento", valor: quintaSalreuDetails.resultadoOperacional.retorno, color: "text-heritage-ocean" },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-heritage-sand/30 dark:bg-white/5 p-4 rounded-2xl text-center">
                                                <p className={`text-2xl font-black ${item.color}`}>{item.valor}</p>
                                                <p className="text-xs text-heritage-navy/40 dark:text-white/40 font-bold uppercase tracking-wider mt-1">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TAB: Torre Carvalhal (Detalhada) */}
                            <TabsContent value="torre" className="space-y-12">
                                {/* Header do Projeto */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-10">
                                        <div className="flex-1 space-y-6">
                                            <Badge className="bg-heritage-ocean/10 text-heritage-ocean border-none uppercase tracking-widest text-[10px] font-black">
                                                Projeto Alentejo
                                            </Badge>
                                            <h2 className="text-4xl font-black text-heritage-navy dark:text-white">{torreCarvalhalDetails.historia.titulo}</h2>
                                            <div className="flex items-center gap-2 text-heritage-navy/60 dark:text-white/40">
                                                <LucideMapPin className="w-5 h-5" />
                                                <span className="font-medium">Santiago do Escoural, Montemor-o-Novo, Évora</span>
                                            </div>
                                            <p className="text-lg text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                                                Património histórico manuelino-mudéjar integrado na Rede Natura 2000, unindo a preservação florestal ao restauro arquitetónico.
                                            </p>
                                        </div>
                                        <div className="flex gap-8">
                                            <div className="text-center">
                                                <p className="text-4xl font-black text-heritage-ocean">€1.200.000</p>
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
                                        <LucideHistory className="w-8 h-8 text-heritage-ocean shrink-0" />
                                        <h3 className="text-2xl font-black text-heritage-navy dark:text-white">{torreCarvalhalDetails.historia.titulo}</h3>
                                    </div>
                                    <p className="text-heritage-navy/70 dark:text-white/60 leading-relaxed text-lg">
                                        {torreCarvalhalDetails.historia.texto}
                                    </p>
                                </div>

                                {/* Património */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Estado de Conservação</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {torreCarvalhalDetails.patrimonio.elementos.map((elem, i) => (
                                            <div key={i} className="bg-heritage-ocean/5 dark:bg-white/5 p-5 rounded-2xl">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-black text-heritage-navy dark:text-white">{elem.nome}</h4>
                                                    <Badge variant="outline" className={
                                                        elem.estado === "Ruína avançada" || elem.estado === "Ruína" ? "border-red-500 text-red-500" :
                                                            elem.estado === "Devoluto" ? "border-amber-500 text-amber-500" :
                                                                "border-heritage-ocean/30 text-heritage-ocean"
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
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Cronograma de Intervenção</h3>
                                    <div className="space-y-4">
                                        {torreCarvalhalDetails.fases.map((fase, i) => (
                                            <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-heritage-ocean/5 dark:bg-white/5 rounded-2xl">
                                                <div className="w-14 h-14 rounded-2xl bg-heritage-ocean text-white flex items-center justify-center font-black text-xl shrink-0">
                                                    {fase.fase}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-4 mb-1">
                                                        <h4 className="font-black text-heritage-navy dark:text-white text-lg">{fase.nome}</h4>
                                                        <Badge variant="outline" className="border-heritage-terracotta text-heritage-terracotta">{fase.periodo}</Badge>
                                                    </div>
                                                    <p className="text-sm text-heritage-navy/60 dark:text-white/50">{fase.descricao}</p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="text-xl font-black text-heritage-ocean">{fase.orcamento}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Metas Torre */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {torreCarvalhalDetails.impacto.map((meta, i) => (
                                        <div key={i} className="glass-card p-6 rounded-3xl text-center">
                                            <p className="text-3xl font-black text-heritage-ocean">{meta.valor}</p>
                                            <p className="text-xs font-bold text-heritage-navy/40 dark:text-white/40 uppercase tracking-wider mt-2">{meta.indicador}</p>
                                            <p className="text-[10px] text-heritage-navy/30 dark:text-white/20 mt-1 uppercase font-bold">{meta.descricao}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Gestão do Montado */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-2">Gestão do Montado de Sobro</h3>
                                    <p className="text-sm text-heritage-navy/50 dark:text-white/40 mb-6">Receitas complementares do montado de 600 hectares (ciclo anual estimado)</p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {torreCarvalhalDetails.montado.map((item, i) => (
                                            <div key={i} className="bg-heritage-ocean/5 dark:bg-white/5 p-5 rounded-2xl flex items-center justify-between">
                                                <div>
                                                    <p className="font-black text-heritage-navy dark:text-white">{item.atividade}</p>
                                                    <p className="text-xs text-heritage-navy/50 dark:text-white/40 mt-1">{item.obs}</p>
                                                </div>
                                                <p className="text-heritage-ocean font-black text-sm text-right shrink-0 ml-4">{item.receita}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 p-4 bg-heritage-ocean/10 rounded-2xl flex items-center justify-between">
                                        <span className="font-black text-heritage-navy dark:text-white">Total Montado (Ano 3)</span>
                                        <span className="font-black text-heritage-ocean">€35.000–€63.000/ano</span>
                                    </div>
                                </div>

                                {/* Sustentabilidade Financeira — Torre Carvalhal */}
                                <div className="glass-card p-10 rounded-[40px]">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-2">Sustentabilidade Financeira</h3>
                                    <p className="text-sm text-heritage-navy/50 dark:text-white/40 mb-8">Projeção de receitas por fonte (operação plena no Ano 3)</p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-heritage-navy/10 dark:border-white/10">
                                                    <th className="text-left py-3 pr-4 font-black text-heritage-navy/60 dark:text-white/40 uppercase text-[10px] tracking-widest">Fonte de Receita</th>
                                                    <th className="text-right py-3 px-3 font-black text-heritage-navy/60 dark:text-white/40 uppercase text-[10px] tracking-widest">Ano 1</th>
                                                    <th className="text-right py-3 px-3 font-black text-heritage-navy/60 dark:text-white/40 uppercase text-[10px] tracking-widest">Ano 2</th>
                                                    <th className="text-right py-3 pl-3 font-black text-heritage-ocean uppercase text-[10px] tracking-widest">Ano 3</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {torreCarvalhalDetails.receitas.map((r, i) => (
                                                    <tr key={i} className="border-b border-heritage-navy/5 dark:border-white/5">
                                                        <td className="py-3 pr-4 text-heritage-navy/70 dark:text-white/60">{r.fonte}</td>
                                                        <td className="py-3 px-3 text-right text-heritage-navy/50 dark:text-white/40">{r.ano1}</td>
                                                        <td className="py-3 px-3 text-right text-heritage-navy/50 dark:text-white/40">{r.ano2}</td>
                                                        <td className="py-3 pl-3 text-right font-black text-heritage-ocean">{r.ano3}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                        {[
                                            { label: "Receita Total Ano 3", valor: torreCarvalhalDetails.resultadoOperacional.receita, color: "text-heritage-ocean" },
                                            { label: "Custos Operacionais", valor: torreCarvalhalDetails.resultadoOperacional.custos, color: "text-heritage-navy dark:text-white" },
                                            { label: "Margem Operacional", valor: torreCarvalhalDetails.resultadoOperacional.margem, color: "text-heritage-success" },
                                            { label: "Retorno do Investimento", valor: torreCarvalhalDetails.resultadoOperacional.retorno, color: "text-heritage-terracotta" },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-heritage-ocean/5 dark:bg-white/5 p-4 rounded-2xl text-center">
                                                <p className={`text-2xl font-black ${item.color}`}>{item.valor}</p>
                                                <p className="text-xs text-heritage-navy/40 dark:text-white/40 font-bold uppercase tracking-wider mt-1">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>


                            {/* TAB: Ofícios (com modais) */}
                            <TabsContent value="oficios" className="space-y-12">
                                {/* Mapa de Ofícios Norte vs Sul */}
                                <div className="space-y-8">
                                    <div className="text-center space-y-4">
                                        <h2 className="text-4xl font-black text-heritage-navy dark:text-white leading-tight">Distribuição de Saberes</h2>
                                        <p className="text-heritage-navy/60 dark:text-white/40 max-w-2xl mx-auto">
                                            O programa cobre as principais tradições construtivas de Portugal, desde as técnicas do Norte e Centro até à sabedoria do Alentejo.
                                        </p>
                                    </div>
                                    <MapaOficios />
                                </div>

                                <div className="text-center space-y-4 pt-12">
                                    <h3 className="text-3xl font-black text-heritage-navy dark:text-white">Catálogo de Especialidade</h3>
                                    <p className="text-heritage-navy/60 dark:text-white/40">
                                        Clique em cada ofício para saber mais sobre as competências e aplicação no projeto.
                                    </p>
                                </div>

                                {[
                                    { titulo: "Culinária e Gastronomia", oficios: oficiosDetalhados.culinaria, cor: "terracotta" },
                                    { titulo: "Botânica, Jardinismo e Sustentabilidade", oficios: oficiosDetalhados.botanica, cor: "green" },
                                    { titulo: "Artes e Ofícios Tradicionais", oficios: oficiosDetalhados.artes, cor: "amber" },
                                    { titulo: "Construção e Restauro", oficios: oficiosDetalhados.restauro, cor: "ocean" }
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
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white mb-8">Princípios Organizacionais (IPSS Banda Visconde)</h3>
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
                                            A parceria é selada através de um Termo de Cooperação Estratégica que define as responsabilidades de assessoria, captação de recursos e supervisão técnica da formação por um período de 24 a 30 meses.
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
                                            <div className="flex flex-col gap-2 mb-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="text-[10px] font-black uppercase text-heritage-navy/40 dark:text-white/40 tracking-widest">Taxa Gestão</span>
                                                    <Badge variant="outline" className="text-xs font-black">{prop.taxaGestao}</Badge>
                                                </div>
                                                {prop.economia && (
                                                    <Badge className="bg-heritage-success/10 text-heritage-success border-none text-[10px] font-black uppercase tracking-wider mx-auto">
                                                        Economia: {prop.economia}
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-heritage-navy/60 dark:text-white/50">{prop.descricao}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Estrutura de Honorários */}
                                <div className="glass-card p-10 rounded-[40px] space-y-6">
                                    <h3 className="text-2xl font-black text-heritage-navy dark:text-white">Componentes de Assessoria</h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="p-6 bg-heritage-sand/30 dark:bg-white/5 rounded-2xl border-t-4 border-heritage-terracotta">
                                            <p className="text-sm font-bold text-heritage-navy/60 dark:text-white/40 uppercase tracking-wider mb-2">Taxa de Gestão</p>
                                            <p className="text-2xl font-black text-heritage-navy dark:text-white">8% <span className="text-sm font-normal text-heritage-navy/40 dark:text-white/40">(ou 6.8%)</span></p>
                                            <p className="text-sm text-heritage-navy/40 dark:text-white/30 mt-2">Remuneração fixa pela gestão mensal e técnica do projeto.</p>
                                        </div>
                                        <div className="p-6 bg-heritage-sand/30 dark:bg-white/5 rounded-2xl border-t-4 border-heritage-terracotta">
                                            <p className="text-sm font-bold text-heritage-navy/60 dark:text-white/40 uppercase tracking-wider mb-2">Taxa de Sucesso</p>
                                            <p className="text-2xl font-black text-heritage-navy dark:text-white">5% <span className="text-sm font-normal text-heritage-navy/40 dark:text-white/40">(ou 4.25%)</span></p>
                                            <p className="text-sm text-heritage-navy/40 dark:text-white/30 mt-2">Remuneração variável indexada ao financiamento captado.</p>
                                        </div>
                                        <div className="p-6 bg-heritage-sand/30 dark:bg-white/5 rounded-2xl border-t-4 border-heritage-terracotta">
                                            <p className="text-sm font-bold text-heritage-navy/60 dark:text-white/40 uppercase tracking-wider mb-2">Serviços Extra</p>
                                            <p className="text-2xl font-black text-heritage-navy dark:text-white">Tabela</p>
                                            <p className="text-sm text-heritage-navy/40 dark:text-white/30 mt-2">Honorários para estudos de arquitetura, candidaturas e relatórios.</p>
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

                                <div className="space-y-8 mb-12">
                                    <div className="flex items-center gap-3">
                                        <LucideEuro className="w-8 h-8 text-heritage-terracotta" />
                                        <h3 className="text-2xl font-black text-heritage-navy dark:text-white">Arquitetura Financeira</h3>
                                    </div>
                                    <FinanciamentoVisual />
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
                                <div className="space-y-8 mt-12">
                                    <div className="flex items-center gap-3">
                                        <LucideCalendarClock className="w-8 h-8 text-heritage-ocean" />
                                        <h3 className="text-2xl font-black text-heritage-navy dark:text-white">Cronograma Integrado de Operação</h3>
                                    </div>
                                    <CronogramaVisual />
                                </div>
                            </TabsContent>

                            {/* TAB: Próximos Passos */}
                            <TabsContent value="passos" className="space-y-12">
                                <div className="text-center space-y-4 mb-12">
                                    <h2 className="text-4xl font-black text-heritage-navy dark:text-white">Próximos Passos</h2>
                                    <p className="text-heritage-navy/60 dark:text-white/40 max-w-2xl mx-auto">
                                        Ações estruturadas para o avanço das assessorias, orçamentação final e formalização jurídica.
                                    </p>
                                </div>

                                <div className="glass-card p-10 rounded-[40px]">
                                    <div className="space-y-6">
                                        {passosDetails.map((passo, i) => (
                                            <div key={i} className="flex gap-6 items-start">
                                                <div className="w-16 h-16 rounded-3xl bg-heritage-navy text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg">
                                                    {passo.num}
                                                </div>
                                                <div className="pt-3">
                                                    <h4 className="font-black text-heritage-navy dark:text-white text-xl mb-2">{passo.titulo}</h4>
                                                    <p className="text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                                                        {passo.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TAB: Fontes */}
                            <TabsContent value="fontes" className="space-y-12">
                                <div className="text-center space-y-4 mb-12">
                                    <h2 className="text-4xl font-black text-heritage-navy dark:text-white">Fontes e Referências</h2>
                                    <p className="text-heritage-navy/60 dark:text-white/40 max-w-2xl mx-auto">
                                        Documentação cruzada e transcrições que embasam os dados orçamentários e estratégicos.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {fontesDetails.map((fonte, i) => (
                                        <div key={i} className="glass-card p-8 rounded-3xl border-t-4 border-heritage-terracotta">
                                            <div className="flex items-center gap-3 mb-4">
                                                <LucideBookOpen className="w-6 h-6 text-heritage-terracotta" />
                                                <h4 className="font-black text-heritage-navy dark:text-white text-lg leading-tight uppercase tracking-tight">{fonte.titulo}</h4>
                                            </div>
                                            <p className="text-sm text-heritage-navy/60 dark:text-white/50 leading-relaxed">
                                                {fonte.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </div >
        </PasswordGate >
    )
}
