import { Grain } from "@/components/ui/Grain"
import Magnetic from "@/components/ui/Magnetic"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { LucideArrowDownRight, LucideChevronDown } from "lucide-react"

const craftCategories = [
    {
        title: "Ofícios da Construção",
        description: "Mestres que preservam a identidade física de Lisboa.",
        items: ["Pedreiros especializados em alvenarias", "Carpinteiros de estruturas e casquinha", "Serralheiros de ferro forjado", "Azulejistas e Estucadores", "Canteiros de lioz e granito"],
        image: "/images/traditions/construction.png",
        number: "01"
    },
    {
        title: "Artes Performáticas & Fado",
        description: "A alma sonora e teatral dos bairros históricos.",
        items: ["Fadistas e Cantores residentes", "Guitarristas (Guitarra Portuguesa)", "Atores de Teatro Popular", "Contadores de Histórias e Memória Oral"],
        image: "/images/traditions/fado.png",
        number: "02"
    },
    {
        title: "Artesanato & Têxteis",
        description: "O saber feito à mão que veste a tradição.",
        items: ["Bordadeiras (Viana, Castelo Branco)", "Rendeiras de Bilros", "Tecelões de teares tradicionais", "Sapateiros e Correeiros artesanais"],
        image: "/images/traditions/textiles.png",
        number: "03"
    },
    {
        title: "Artes Visuais & Plásticas",
        description: "Novos olhares sobre técnicas ancestrais.",
        items: ["Pintores de Arte Tradicional e Mural", "Escultores em pedra e madeira", "Ceramistas e Oleiros", "Ilustradores de Património"],
        image: "/images/traditions/ceramics.png",
        number: "04"
    }
]

const glossary = [
    {
        category: "1. Têxteis e Vestuário",
        professions: [
            { name: "Alfaiate", desc: "Corta, prova e monta peças por medida, ajustando cada linha ao corpo e ao gesto de quem a veste. É um ofício de rigor, elegância e leitura minuciosa da forma humana." },
            { name: "Costureira / Modista", desc: "Transforma tecido em vestido, blusa, saia ou casaco com sensibilidade para caimento, detalhe e acabamento. Une técnica, desenho e escuta atenta do corpo feminino." },
            { name: "Bordadeira", desc: "Desenha com linha aquilo que a mão não diz em voz alta: flores, símbolos, memórias e ornamentos. O seu trabalho acrescenta tempo, delicadeza e identidade a cada peça." },
            { name: "Tecelão / Tecelã", desc: "Opera o tear como quem compõe uma arquitetura de fios, tensão e ritmo. Cada trama nasce da relação entre matéria-prima, padrão, cadência e saber acumulado." },
            { name: "Rendeira", desc: "Constrói rendas de bilros, agulha ou outros pontos tradicionais com precisão quase musical. O vazio e o cheio tornam-se desenho, leveza e património transmitido de geração em geração." },
            { name: "Tapeceiro", desc: "Cria superfícies têxteis decorativas de grande presença visual, muitas vezes inspiradas em motivos históricos, populares ou religiosos. O resultado é simultaneamente utilitário, ornamental e narrativo." },
            { name: "Chapeleiro", desc: "Modela feltro, palha ou outros materiais para criar chapéus com forma, estrutura e personalidade. É um ofício onde técnica, moda e caráter se encontram sobre a cabeça de quem usa." }
        ]
    },
    {
        category: "2. Calçado e Couro",
        professions: [
            { name: "Sapateiro", desc: "Faz, adapta e repara calçado com atenção à marcha, ao conforto e à durabilidade. Conhece a sola, a forma, o couro e o desgaste do pé como poucos ofícios conhecem o corpo." },
            { name: "Marroquineiro", desc: "Trabalha o couro fino para criar malas, bolsas, carteiras e pequenos objetos de uso diário. É um ofício de precisão, corte limpo, costura firme e acabamento silenciosamente luxuoso." },
            { name: "Correeiro", desc: "Produz correias, arreios e peças de couro pensadas para tração, montaria e esforço continuado. O seu saber exige resistência estrutural, segurança e profundo conhecimento do material." },
            { name: "Estofador", desc: "Reveste cadeiras, sofás e cabeceiras, devolvendo conforto, proporção e presença a cada peça. Trabalha entre a estrutura invisível do móvel e a superfície que o olhar e o corpo reconhecem." }
        ]
    },
    {
        category: "3. Cerâmica e Olaria",
        professions: [
            { name: "Oleiro", desc: "Molda o barro em peças utilitárias que nascem do gesto, da água e da rotação. Em cada forma há uma intimidade antiga entre a mão, a terra e o fogo." },
            { name: "Ceramista", desc: "Explora a cerâmica como linguagem artística, decorativa ou funcional, testando volumes, esmaltes e temperaturas. O seu trabalho cruza tradição material e expressão contemporânea." },
            { name: "Azulejista", desc: "Produz azulejos e composições cerâmicas que revestem, protegem e embelezam a arquitetura portuguesa. É um ofício essencial para a continuidade de uma das marcas visuais do país." },
            { name: "Pintor de Azulejos", desc: "Decora à mão cada peça com motivos geométricos, florais, narrativos ou devocionais. A sua precisão transforma superfícies cerâmicas em painéis de memória e luz." }
        ]
    },
    {
        category: "4. Madeira e Mobiliário",
        professions: [
            { name: "Marceneiro", desc: "Constrói móveis com encaixe, proporção e acabamento fino, respeitando o caráter de cada madeira. É um ofício onde utilidade e desenho convivem com discrição e engenho." },
            { name: "Carpinteiro", desc: "Trabalha a madeira estrutural na construção de portas, janelas, escadas, coberturas e interiores. O seu saber sustenta edifícios inteiros, mesmo quando quase ninguém o vê." },
            { name: "Entalhador", desc: "Esculpe madeira para criar ornamentos, relevos e elementos devocionais ou decorativos. Cada corte exige paciência, pulso e um olhar treinado para profundidade e sombra." },
            { name: "Torneiro de Madeira", desc: "Usa o torno para dar origem a colunas, pés, taças, puxadores e outras peças de secção circular. A simetria nasce aqui do movimento contínuo e do controlo absoluto da ferramenta." },
            { name: "Cesteiro", desc: "Entrelaça vime, junco, cana ou verga para criar cestos, alcofas e estruturas leves de grande resistência. É um saber ligado ao quotidiano, à agricultura e à elegância do gesto manual." },
            { name: "Restaurador", desc: "Recupera peças antigas sem apagar o tempo que nelas ficou inscrito. Mais do que reparar, lê materiais, técnicas e marcas de uso para devolver dignidade ao objeto." }
        ]
    },
    {
        category: "5. Metais",
        professions: [
            { name: "Ferreiro", desc: "Domina a forja, o calor e o golpe para transformar o ferro em ferramenta, estrutura e ornamento. O seu trabalho tem peso, ritmo e uma beleza nascida da resistência." },
            { name: "Serralheiro", desc: "Produz grades, guardas, portões, ferragens e estruturas metálicas com rigor técnico e sentido construtivo. É um ofício que une proteção, desenho e funcionalidade urbana." },
            { name: "Caldeireiro", desc: "Molda chapa e metal para criar recipientes, depósitos, condutas e corpos técnicos de elevada precisão. Trabalha com escala, resistência e inteligência de montagem." },
            { name: "Ourives", desc: "Trabalha metais preciosos com minúcia extrema para criar peças de alto valor simbólico e material. Cada detalhe exige precisão milimétrica, controlo técnico e apuro estético." },
            { name: "Joalheiro", desc: "Desenha e monta joias onde a matéria se encontra com afeto, rito e distinção. O seu trabalho combina composição, lapidação, encaixe e linguagem pessoal." },
            { name: "Latoeiro", desc: "Modela o latão e outros metais maleáveis para criar peças utilitárias ou decorativas de grande durabilidade. O brilho final depende tanto da técnica como da mão que o conduz." },
            { name: "Funileiro", desc: "Especializa-se no corte, dobra e união de chapas finas para fabricar peças, recipientes e coberturas leves. É um ofício preciso, silencioso e altamente técnico." }
        ]
    },
    {
        category: "6. Pedra",
        professions: [
            { name: "Canteiro", desc: "Talha a pedra para criar degraus, molduras, cunhais, colunas e elementos arquitetónicos duradouros. O seu trabalho exige leitura do bloco, força controlada e grande sentido de medida." },
            { name: "Calceteiro", desc: "Assenta pedra a pedra para compor a calçada portuguesa, desenhando padrões que organizam o chão da cidade. É um ofício exigente, físico e profundamente ligado à identidade urbana." },
            { name: "Pedreiro Tradicional", desc: "Constrói e repara paredes, muros e estruturas com técnicas antigas, argamassas compatíveis e leitura empírica da obra. O seu saber mantém de pé aquilo que o tempo insiste em provar." }
        ]
    },
    {
        category: "7. Alimentação e Ervanária",
        professions: [
            { name: "Ervanário", desc: "Conhece plantas, raízes, flores e folhas pelo seu valor medicinal, aromático e ritual. O seu ofício vive entre a botânica popular, o cuidado doméstico e a memória da terra." },
            { name: "Padeiro Tradicional", desc: "Trabalha fermentação natural, tempo de repouso, forno e farinha para produzir pão com caráter e profundidade. Cada broa ou molete traz consigo comunidade, rotina e técnica apurada." },
            { name: "Confeiteiro / Doceiro", desc: "Prepara doces conventuais, festivos ou regionais com precisão de ponto, textura e apresentação. O açúcar aqui não é excesso: é herança, celebração e ofício refinado." },
            { name: "Queijeiro", desc: "Conduz leite, coalho, cura e maturação até alcançar textura, aroma e identidade próprios. O seu saber depende do tempo, do ambiente e de uma leitura sensível da matéria viva." },
            { name: "Salsicheiro", desc: "Produz enchidos e carnes curadas através de tempero, enchimento, secagem e conservação. É um ofício de sabor, técnica e profundo conhecimento de transformação alimentar." }
        ]
    },
    {
        category: "8. Construção Tradicional",
        professions: [
            { name: "Estucador", desc: "Executa rebocos finos, molduras, rosetas e superfícies decorativas que dão espessura estética aos interiores históricos. Trabalha entre a técnica construtiva e a arte ornamental." },
            { name: "Caiador", desc: "Aplica cal com saber antigo, garantindo proteção, respirabilidade e luminosidade às paredes. A brancura final parece simples, mas depende de preparação, mistura e mão experiente." },
            { name: "Telheiro", desc: "Produz ou assenta telhas e soluções de cobertura que protegem a casa do tempo e do clima. O seu ofício é decisivo para a longevidade e autenticidade dos edifícios tradicionais." },
            { name: "Vidraceiro", desc: "Corta, ajusta e instala vidro em caixilharias, divisórias e elementos decorativos, equilibrando transparência, encaixe e segurança. É um ofício de delicadeza material e precisão absoluta." }
        ]
    },
    {
        category: "9. Outros Ofícios",
        professions: [
            { name: "Relojoeiro", desc: "Repara mecanismos de grande precisão, devolvendo tempo útil a relógios que atravessam décadas. É um ofício de paciência, lupa, silêncio e respeito pela engenharia minúscula." },
            { name: "Encadernador", desc: "Costura, cola, reforça e reveste livros, cadernos e documentos para lhes devolver corpo e longevidade. O seu trabalho preserva conhecimento material, não apenas conteúdo." },
            { name: "Tipógrafo", desc: "Compõe e imprime com tipos móveis, tinta e pressão controlada, mantendo viva a materialidade clássica da palavra impressa. Cada página carrega o peso físico do gesto gráfico." },
            { name: "Luthier / Organeiro", desc: "Constrói, afina e repara instrumentos musicais, ajustando madeira, metal, ressonância e equilíbrio sonoro. Trabalha onde a matéria deixa de ser objeto e se torna voz." },
            { name: "Tanoeiro", desc: "Monta barris, tonéis e pipas com madeira curvada, cintas e encaixes exatos. O seu saber influencia diretamente a conservação e, muitas vezes, o sabor do que ali amadurece." },
            { name: "Barbeiro Tradicional", desc: "Oferece corte, barba e cuidado pessoal num ritual de proximidade e conversa que sempre foi mais do que serviço. O seu espaço é também lugar de encontro, estilo e sociabilidade." },
            { name: "Amolador", desc: "Afia facas, tesouras, navalhas e ferramentas, devolvendo corte, precisão e vida útil aos objetos. É um ofício humilde à primeira vista, mas essencial para o trabalho de muitos outros." }
        ]
    }
]

const FadeIn = ({ children, delay = 0, className = "", direction = "up", triggerOnView = false }: any) => {
    const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
    const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;

    if (triggerOnView) {
        return (
            <motion.div
                initial={{ opacity: 0, y: yOffset, x: xOffset }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
                className={className}
            >
                {children}
            </motion.div>
        )
    }
    
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset, x: xOffset }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function Traditions() {
    return (
        <div className="flex flex-col w-full bg-[#f8f6f0] dark:bg-zinc-950 transition-apple relative overflow-hidden font-sans">
            
            <Grain opacity={0.09} />

            {/* Editorial Header Section */}
            <section className="relative min-h-[70svh] flex flex-col justify-end px-4 sm:px-8 md:px-12 pb-12 pt-40 overflow-hidden">
                <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end relative z-10">
                    
                    <div className="lg:col-span-8 space-y-8">
                        <FadeIn delay={0.1}>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-heritage-terracotta"></div>
                                <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-heritage-navy/70 dark:text-white/70">
                                    Património Vivo // Ofícios
                                </span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <h1 className="font-serif text-[4.5rem] leading-[0.9] sm:text-[6rem] md:text-[8rem] font-medium text-heritage-navy dark:text-white tracking-tighter">
                                Saberes que <br /> <span className="text-heritage-terracotta italic font-normal">Edificam Lisboa</span>.
                            </h1>
                        </FadeIn>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-between h-full border-t border-heritage-navy/20 dark:border-white/20 pt-6 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-12">
                        <FadeIn delay={0.5} direction="left">
                            <p className="text-xl sm:text-2xl text-heritage-navy/80 dark:text-white/80 leading-snug font-medium mb-12">
                                Um programa de residência para quem preserva a alma da cidade. Você ensina, o bairro acolhe.
                            </p>
                        </FadeIn>
                        
                        <FadeIn delay={0.7} direction="left">
                            <div className="w-full">
                                <span className="block text-[10px] uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mb-3 font-semibold">Registo</span>
                                <Link to="/candidatura" className="block outline-none group">
                                    <div className="flex items-center justify-between border-b-2 border-heritage-navy dark:border-white pb-3 group-hover:border-heritage-terracotta transition-colors duration-500 cursor-pointer">
                                        <span className="text-xl font-serif font-medium text-heritage-navy dark:text-white group-hover:text-heritage-terracotta transition-colors duration-500">
                                            Candidatar-se como Mestre
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-heritage-navy/20 dark:border-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 group-hover:bg-heritage-terracotta group-hover:border-heritage-terracotta group-hover:text-white">
                                            <LucideArrowDownRight className="w-4 h-4 text-heritage-navy dark:text-white group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                    
                </div>
            </section>

            <div className="w-full border-t border-heritage-navy/10 dark:border-white/10 relative z-20"></div>

            {/* Introduction Section */}
            <section className="relative flex flex-col justify-center px-4 sm:px-8 md:px-12 py-24 overflow-hidden bg-[#f5f3ec] dark:bg-zinc-900/50">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-10 items-center">
                    
                    <div className="md:col-span-4 border-t-2 md:border-t-0 md:border-l-2 border-heritage-terracotta pt-4 md:pt-0 md:pl-6 bg-transparent h-full">
                        <FadeIn delay={0.1} direction="left" triggerOnView>
                            <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">Preservação</span>
                            <h2 className="font-serif text-3xl sm:text-4xl text-heritage-navy dark:text-white tracking-tight leading-tight">A Nossa Herança.</h2>
                        </FadeIn>
                    </div>
                    
                    <div className="md:col-span-8">
                        <FadeIn delay={0.3} triggerOnView>
                            <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium mb-6">
                                <span className="float-left text-6xl leading-[0.8] pr-3 pt-2 font-serif text-heritage-terracotta font-medium">P</span>
                                ortugal possui um rico património de ofícios tradicionais que representa séculos de conhecimento acumulado e transmitido de geração em geração. Estas profissões, que outrora constituíam a base da economia local, encontram-se hoje em risco de desaparecimento.
                            </p>
                            <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                O Programa Moradia Artesãos do Bureau Social visa preservar este património através da criação de condições para que os mestres destes ofícios possam continuar a exercer a sua atividade e transmitir os seus conhecimentos às novas gerações.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Crafts Grid - The Classifieds / Features Grid */}
            <section className="border-t border-heritage-navy/10 dark:border-white/10 relative z-20 bg-[#f8f6f0] dark:bg-zinc-950">
                <div className="max-w-[1400px] mx-auto border-x border-heritage-navy/10 dark:border-white/10 border-b">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10">
                        {craftCategories.map((craft, i) => (
                            <FadeIn key={i} delay={0.1 + (i * 0.1)} triggerOnView className={`relative overflow-hidden group ${i >= 2 ? 'border-t border-heritage-navy/10 dark:border-white/10' : ''}`}>
                                {/* Upper Image Area */}
                                <div className="h-80 sm:h-96 md:h-[28rem] w-full overflow-hidden relative border-b border-heritage-navy/10 dark:border-white/10">
                                    <div className="absolute inset-0 z-10 transition-colors duration-700 pointer-events-none mix-blend-multiply dark:mix-blend-screen bg-heritage-navy/10 dark:bg-zinc-950/20" />
                                    <img
                                        src={craft.image}
                                        alt={craft.title}
                                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />
                                    <div className="absolute top-4 right-4 bg-[#f8f6f0]/90 dark:bg-zinc-950/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-heritage-navy/70 dark:text-white/70 uppercase tracking-widest border border-heritage-navy/10 dark:border-white/10 z-20">
                                        Cat {craft.number}
                                    </div>
                                </div>
                                {/* Lower Text Area */}
                                <div className="p-8 sm:p-12 transition-colors duration-700 hover:bg-[#f3efdf] dark:hover:bg-zinc-900 flex flex-col justify-between h-auto flex-1 gap-12">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl sm:text-4xl font-serif font-medium text-heritage-navy dark:text-white leading-tight">
                                            {craft.title}
                                        </h3>
                                        <p className="text-lg text-heritage-terracotta italic font-serif">
                                            {craft.description}
                                        </p>
                                    </div>
                                    <div className="space-y-8 pt-4 border-t border-heritage-navy/10 dark:border-white/10 flex-col flex justify-between h-full">
                                        <ul className="space-y-3">
                                            {craft.items.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <span className="text-heritage-navy/40 dark:text-white/40 font-serif">—</span>
                                                    <span className="text-base font-medium text-heritage-navy/80 dark:text-white/80">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <div className="pt-4 mt-auto">
                                            <Link 
                                                to="/candidatura"
                                                className="inline-flex items-center justify-between w-full border-b border-heritage-navy/20 dark:border-white/20 pb-3 group/btn hover:border-heritage-terracotta transition-colors duration-500"
                                            >
                                                <span className="text-xs font-bold uppercase tracking-widest text-heritage-navy dark:text-white group-hover/btn:text-heritage-terracotta transition-colors">
                                                    Candidatar-me nesta área
                                                </span>
                                                <LucideArrowDownRight className="w-4 h-4 text-heritage-navy/50 dark:text-white/50 group-hover/btn:text-heritage-terracotta transition-colors" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categorized Professions Glossary Section */}
            <section className="px-4 sm:px-8 md:px-12 py-32 bg-[#f5f3ec] dark:bg-zinc-900 border-b border-heritage-navy/10 dark:border-white/10 relative z-20">
                <div className="max-w-[1400px] mx-auto space-y-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-heritage-navy/10 dark:border-white/10 pb-8 gap-6">
                        <div className="space-y-2">
                            <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block">Apuramento Geral</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-heritage-navy dark:text-white tracking-tight">
                                Compêndio de Ofícios.
                            </h2>
                        </div>
                        <p className="text-sm uppercase tracking-widest font-semibold text-heritage-navy/50 dark:text-white/50 max-w-xs md:text-right">
                            Índice Classificado das Vocações Resgatadas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
                        {glossary.map((cat, idx) => (
                            <FadeIn key={idx} delay={0.1 + (idx * 0.05)} triggerOnView className="space-y-6">
                                <h3 className="text-xl sm:text-2xl font-serif text-heritage-navy dark:text-white border-l-2 border-heritage-terracotta pl-4">
                                    {cat.category}
                                </h3>
                                <div className="space-y-0 border-y border-heritage-navy/10 dark:border-white/10 divide-y divide-heritage-navy/10 dark:divide-white/10">
                                    {cat.professions.map((prof, pIdx) => (
                                        <details key={pIdx} className="group cursor-pointer transition-colors duration-300 hover:bg-heritage-navy/5 dark:hover:bg-white/5 block">
                                            <summary className="flex items-center justify-between py-4 pr-4 pl-2 font-medium text-heritage-navy/90 dark:text-white/90 list-none text-base">
                                                <span>{prof.name}</span>
                                                <LucideChevronDown className="w-4 h-4 text-heritage-navy/40 dark:text-white/40 transition-transform group-open:rotate-180" />
                                            </summary>
                                            <div className="px-2 pb-5 pt-1 text-sm text-heritage-navy/70 dark:text-white/70 font-medium leading-relaxed font-serif italic border-t border-dashed border-heritage-navy/10 dark:border-white/10">
                                                {prof.desc}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action - Newspaper Feature Box */}
            <section className="py-32 px-4 sm:px-8 md:px-12 bg-[#f8f6f0] dark:bg-zinc-950 relative z-20 flex justify-center">
                <FadeIn delay={0.2} triggerOnView className="w-full max-w-[1000px]">
                    <div className="border border-heritage-navy/20 dark:border-white/20 p-2 sm:p-4 bg-white dark:bg-zinc-900 shadow-2xl pb-16 relative">
                        {/* Corner markers mimicking print plates */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-heritage-navy/40 dark:border-white/40 -ml-1 -mt-1" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-heritage-navy/40 dark:border-white/40 -mr-1 -mt-1" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-heritage-navy/40 dark:border-white/40 -ml-1 -mb-1" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-heritage-navy/40 dark:border-white/40 -mr-1 -mb-1" />

                        <div className="border border-heritage-navy/10 dark:border-white/10 p-10 sm:p-16 text-center space-y-10 relative overflow-hidden h-full flex flex-col items-center justify-center">
                            
                            <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.3em] text-[10px] block border-b border-heritage-navy/20 dark:border-white/20 pb-2 mb-4 w-32 mx-auto">Chamada Oficial</span>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-heritage-navy dark:text-white tracking-tight leading-tight max-w-2xl">
                                "Você ensina, <br /> <span className="italic text-heritage-terracotta">você mora.</span>"
                            </h2>
                            <p className="text-lg text-heritage-navy/70 dark:text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
                                Se domina um destes ofícios e quer voltar a viver no centro de Lisboa, junte-se ao Programa Moradia Artesãos e preserve as nossas raízes.
                            </p>

                            <div className="flex flex-col gap-4 text-left mx-auto w-full max-w-lg mt-8 border border-heritage-navy/10 dark:border-white/10 p-6 bg-[#f5f3ec] dark:bg-zinc-950/50">
                                {[
                                    "Isenção de renda p/ 8h de oficinas mensais.",
                                    "Moradia reabilitada no coração de Lisboa.",
                                    "Integração exclusiva numa comunidade de mestres."
                                ].map((point, i) => (
                                    <div key={i} className="flex items-start gap-4 text-base font-semibold text-heritage-navy text-left dark:text-white/90">
                                        <span className="text-heritage-terracotta font-serif font-bold italic mt-0.5">{(i + 1)}.</span>
                                        {point}
                                    </div>
                                ))}
                            </div>

                            <Magnetic>
                                <Link 
                                    to="/candidatura" 
                                    className="inline-flex items-center gap-4 bg-heritage-navy dark:bg-white text-white dark:text-heritage-navy h-16 px-10 text-xs sm:text-sm font-bold uppercase tracking-widest mt-8 hover:bg-heritage-terracotta hover:text-white transition-colors duration-500"
                                >
                                    Iniciar Candidatura
                                    <LucideArrowDownRight className="w-4 h-4" />
                                </Link>
                            </Magnetic>

                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    )
}
