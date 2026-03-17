import { Grain } from "@/components/ui/Grain"
import { motion } from "framer-motion"
import { LucideArrowDownRight, LucideFileText, LucideMail, LucideScale, LucideShieldCheck } from "lucide-react"

const policySections = [
    {
        title: "Quem Somos",
        text: "O Bureau Social atua como plataforma institucional, programática e editorial dedicada à reabilitação patrimonial, inclusão social e preservação de saberes tradicionais. Esta página estabelece as regras gerais de utilização do site e explica de forma transparente como tratamos os dados pessoais recolhidos através de formulários, contactos diretos e navegação digital."
    },
    {
        title: "Que Dados Recolhemos",
        text: "Podemos recolher dados de identificação e contacto, como nome, email, telefone, localidade, perfil profissional e informação submetida em candidaturas ou pedidos de contacto. Também podem ser recolhidos dados técnicos mínimos de navegação, como endereço IP, dispositivo, idioma e páginas visitadas, sempre dentro do necessário para funcionamento, segurança e melhoria do serviço."
    },
    {
        title: "Para Que Finalidades",
        text: "Os dados são utilizados para responder a pedidos, gerir candidaturas, analisar perfis de participação em programas, enviar comunicações institucionais relacionadas com a atividade do Bureau Social e cumprir obrigações legais ou administrativas. Não utilizamos os dados para fins incompatíveis com a relação estabelecida com o utilizador."
    },
    {
        title: "Conservação e Partilha",
        text: "Os dados são conservados apenas pelo tempo necessário à finalidade para que foram recolhidos ou pelo prazo exigido por lei. Poderão ser partilhados com parceiros técnicos ou institucionais apenas quando tal for indispensável à análise de candidaturas, execução de programas, cumprimento legal ou operação segura da plataforma, sempre com critérios de necessidade e confidencialidade."
    },
    {
        title: "Direitos do Titular",
        text: "Nos termos aplicáveis, o titular pode solicitar acesso, retificação, atualização, oposição, limitação do tratamento ou eliminação dos seus dados, quando legalmente admissível. Também pode retirar consentimentos previamente prestados e pedir esclarecimentos sobre a forma como a informação está a ser tratada."
    },
    {
        title: "Cookies e Navegação",
        text: "Este site pode utilizar cookies técnicos e funcionais para garantir desempenho, segurança e continuidade da experiência de navegação. Sempre que sejam utilizados mecanismos adicionais de medição, personalização ou terceiros, o utilizador deverá ser informado de forma clara e adequada."
    }
]

const termsSections = [
    {
        title: "Objeto do Site",
        text: "O site do Bureau Social apresenta informação institucional, programas, candidaturas, conteúdos editoriais e páginas de apoio à atividade da associação. Os conteúdos disponibilizados têm caráter informativo e operacional e podem ser atualizados, reorganizados ou removidos sem aviso prévio sempre que tal resulte da evolução do projeto ou de exigências legais."
    },
    {
        title: "Utilização Aceitável",
        text: "Ao utilizar este site, o utilizador compromete-se a fazê-lo de forma lícita, diligente e compatível com a boa-fé. Não é permitida a utilização do site para fins ilícitos, tentativas de intrusão, recolha indevida de dados, envio de comunicações abusivas ou qualquer comportamento que comprometa a segurança, reputação ou funcionamento da plataforma."
    },
    {
        title: "Formulários e Candidaturas",
        text: "Sempre que um utilizador submeta uma candidatura, pedido de informação ou contacto, declara que os dados fornecidos são verdadeiros, atuais e submetidos de forma voluntária. O Bureau Social reserva-se o direito de solicitar informação complementar, rejeitar submissões manifestamente incompletas ou encerrar processos que revelem falsidade, abuso ou utilização imprópria."
    },
    {
        title: "Propriedade Intelectual",
        text: "Salvo indicação em contrário, os textos, composições, design, marcas, imagens, elementos gráficos e conteúdos editoriais presentes neste site pertencem ao Bureau Social ou são utilizados com autorização. A reprodução, adaptação, distribuição ou reutilização sem autorização prévia é proibida, exceto nos casos legalmente permitidos."
    },
    {
        title: "Responsabilidade",
        text: "O Bureau Social procura assegurar que a informação disponibilizada está correta, atual e funcional, mas não garante ausência absoluta de erros, interrupções ou indisponibilidades. Na medida permitida por lei, não poderá ser responsabilizado por danos resultantes de falhas técnicas externas, uso indevido da plataforma ou decisões tomadas exclusivamente com base em conteúdos informativos do site."
    },
    {
        title: "Alterações e Lei Aplicável",
        text: "A Política de Privacidade e os Termos e Condições podem ser atualizados sempre que a atividade, a lei aplicável ou a estrutura do site o exijam. Em caso de litígio, aplica-se a lei portuguesa, sem prejuízo dos direitos imperativos que assistam ao utilizador enquanto titular de dados ou consumidor, quando aplicável."
    }
]

const FadeIn = ({ children, delay = 0, className = "", direction = "up", triggerOnView = false }: any) => {
    const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0
    const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0

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

export default function Legal() {
    return (
        <div className="flex flex-col w-full bg-[#f8f6f0] dark:bg-zinc-950 transition-apple relative overflow-hidden font-sans">
            <Grain opacity={0.09} />

            <section className="relative min-h-[78svh] flex flex-col justify-end px-4 sm:px-8 md:px-12 pb-12 pt-36 overflow-hidden">
                <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end relative z-10">
                    <div className="lg:col-span-8 space-y-8">
                        <FadeIn delay={0.1}>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-heritage-terracotta"></div>
                                <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-heritage-navy/70 dark:text-white/70">
                                    Edição Legal // Bureau Social
                                </span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <h1 className="font-serif text-[4rem] leading-[0.92] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-medium text-heritage-navy dark:text-white tracking-tighter">
                                Privacidade <br />
                                <span className="text-heritage-terracotta italic font-normal">e Condições</span>.
                            </h1>
                        </FadeIn>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-between h-full border-t border-heritage-navy/20 dark:border-white/20 pt-6 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-12">
                        <FadeIn delay={0.5} direction="left">
                            <p className="text-xl sm:text-2xl text-heritage-navy/80 dark:text-white/80 leading-snug font-medium mb-12">
                                Transparência editorial, proteção de dados e regras de utilização do site, escritas com clareza e sem juridiquês desnecessário.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.7} direction="left">
                            <div className="w-full">
                                <span className="block text-[10px] uppercase tracking-widest text-heritage-navy/50 dark:text-white/50 mb-3 font-semibold">
                                    Última Atualização
                                </span>
                                <div className="flex items-center justify-between border-b-2 border-heritage-navy dark:border-white pb-3">
                                    <span className="text-xl sm:text-2xl font-serif font-medium text-heritage-navy dark:text-white">
                                        17 de março de 2026
                                    </span>
                                    <LucideFileText className="w-5 h-5 text-heritage-terracotta" />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <div className="w-full border-t border-heritage-navy/10 dark:border-white/10"></div>

            <section className="relative flex flex-col justify-center px-4 sm:px-8 md:px-12 py-24 sm:py-32 overflow-hidden">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-10">
                    <div className="md:col-span-3 border-t-2 md:border-t-0 md:border-l-2 border-heritage-terracotta pt-4 md:pt-0 md:pl-6">
                        <FadeIn delay={0.1} direction="left" triggerOnView>
                            <span className="text-heritage-navy/60 dark:text-white/60 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-2">
                                Nota Editorial
                            </span>
                            <span className="text-heritage-navy dark:text-white font-serif italic text-lg opacity-80">
                                Leitura clara, compromisso sério.
                            </span>
                        </FadeIn>
                    </div>

                    <div className="md:col-span-9">
                        <FadeIn delay={0.3} triggerOnView>
                            <p className="text-xl sm:text-2xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                <span className="float-left text-6xl leading-[0.8] pr-3 pt-2 font-serif text-heritage-terracotta font-medium">E</span>
                                sta página reúne, num só lugar, a Política de Privacidade e os Termos e Condições de utilização do site do Bureau Social. O objetivo é garantir uma leitura acessível, transparente e suficientemente rigorosa sobre a forma como recolhemos dados, para que fins os tratamos e em que termos o utilizador pode navegar, contactar-nos ou submeter candidaturas através da plataforma.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <section className="border-t border-heritage-navy/10 dark:border-white/10 relative z-20 bg-[#f5f3ec] dark:bg-zinc-900">
                <div className="border-b border-heritage-navy/10 dark:border-white/10 px-4 sm:px-8 md:px-12 py-8">
                    <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <FadeIn delay={0.1} triggerOnView>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-heritage-navy dark:text-white tracking-tight">
                                Política de <span className="text-heritage-terracotta italic">Privacidade</span>.
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.3} direction="left" triggerOnView>
                            <p className="text-sm uppercase tracking-widest font-semibold text-heritage-navy/50 dark:text-white/50 max-w-xs sm:text-right">
                                Recolha, utilização, conservação e direitos
                            </p>
                        </FadeIn>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto border-x border-heritage-navy/10 dark:border-white/10 border-b">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10 dark:divide-white/10">
                        {policySections.map((section, index) => (
                            <FadeIn
                                key={section.title}
                                delay={0.1 + index * 0.05}
                                triggerOnView
                                className={`p-8 sm:p-10 md:p-12 ${index >= 2 ? "md:border-t border-heritage-navy/10 dark:border-white/10" : ""}`}
                            >
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-full border border-heritage-navy/10 dark:border-white/10 flex items-center justify-center shrink-0">
                                        <LucideShieldCheck className="w-5 h-5 text-heritage-terracotta" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-serif text-heritage-navy dark:text-white leading-tight">
                                        {section.title}
                                    </h3>
                                </div>
                                <p className="text-base sm:text-lg text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                    {section.text}
                                </p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-heritage-navy/10 dark:border-white/10 relative z-20 bg-[#f8f6f0] dark:bg-zinc-950">
                <div className="border-b border-heritage-navy/10 dark:border-white/10 px-4 sm:px-8 md:px-12 py-8">
                    <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <FadeIn delay={0.1} triggerOnView>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-heritage-navy dark:text-white tracking-tight">
                                Termos & <span className="text-heritage-terracotta italic">Condições</span>.
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.3} direction="left" triggerOnView>
                            <p className="text-sm uppercase tracking-widest font-semibold text-heritage-navy/50 dark:text-white/50 max-w-xs sm:text-right">
                                Regras gerais de acesso, uso e responsabilidade
                            </p>
                        </FadeIn>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto border-x border-heritage-navy/10 dark:border-white/10 border-b">
                    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-heritage-navy/10 dark:divide-white/10">
                        {termsSections.map((section, index) => (
                            <FadeIn
                                key={section.title}
                                delay={0.1 + index * 0.05}
                                triggerOnView
                                className={`p-8 sm:p-10 md:p-12 ${index >= 3 ? "lg:border-t border-heritage-navy/10 dark:border-white/10" : ""}`}
                            >
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-full border border-heritage-navy/10 dark:border-white/10 flex items-center justify-center shrink-0">
                                        <LucideScale className="w-5 h-5 text-heritage-terracotta" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-serif text-heritage-navy dark:text-white leading-tight">
                                        {section.title}
                                    </h3>
                                </div>
                                <p className="text-base sm:text-lg text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium">
                                    {section.text}
                                </p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 sm:px-8 md:px-12 bg-[#f5f3ec] dark:bg-zinc-900 border-t border-b border-heritage-navy/10 dark:border-white/10 relative z-20">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
                    <FadeIn delay={0.1} triggerOnView className="md:col-span-4 border border-heritage-navy/10 dark:border-white/10 p-8 sm:p-10 bg-white/70 dark:bg-zinc-950/40">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-heritage-navy/50 dark:text-white/50 block mb-4">
                            Contacto
                        </span>
                        <h3 className="text-3xl font-serif text-heritage-navy dark:text-white mb-4">
                            Exercício de Direitos
                        </h3>
                        <p className="text-base text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium mb-8">
                            Para pedidos de acesso, retificação, eliminação de dados ou esclarecimentos sobre estas condições, o contacto institucional deve ser realizado por escrito.
                        </p>
                        <a
                            href="mailto:direcao@institutoipss.pt"
                            className="inline-flex items-center gap-3 border-b border-heritage-navy/30 dark:border-white/30 pb-2 text-sm font-bold uppercase tracking-widest text-heritage-navy dark:text-white hover:text-heritage-terracotta hover:border-heritage-terracotta transition-colors"
                        >
                            <LucideMail className="w-4 h-4" />
                            direcao@institutoipss.pt
                        </a>
                    </FadeIn>

                    <FadeIn delay={0.2} triggerOnView className="md:col-span-8 border border-heritage-navy/10 dark:border-white/10 p-8 sm:p-10 md:p-12 bg-[#f8f6f0] dark:bg-zinc-950">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-heritage-navy/50 dark:text-white/50 block mb-4">
                            Fecho Editorial
                        </span>
                        <h3 className="text-4xl sm:text-5xl font-serif text-heritage-navy dark:text-white tracking-tight leading-tight mb-6">
                            Transparência jurídica com <span className="text-heritage-terracotta italic">leitura humana</span>.
                        </h3>
                        <p className="text-lg sm:text-xl text-heritage-navy/70 dark:text-white/70 leading-relaxed font-medium mb-8">
                            O Bureau Social compromete-se a rever estes textos sempre que a lei, a estrutura do site ou a natureza dos serviços o exijam. O objetivo é simples: proteger o utilizador, clarificar responsabilidades e manter uma relação institucional séria, legível e contemporânea.
                        </p>
                        <div className="flex items-center gap-3 text-sm uppercase tracking-widest font-bold text-heritage-navy/70 dark:text-white/70">
                            <span>Versão em vigor</span>
                            <LucideArrowDownRight className="w-4 h-4 text-heritage-terracotta" />
                            <span>Março 2026</span>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    )
}
