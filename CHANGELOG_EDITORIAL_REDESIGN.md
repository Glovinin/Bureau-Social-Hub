# 📰 Changelog: Editorial Redesign — Bureau Social Hub
> Branch: `feat/editorial-redesign` | Data: Março 2026

---

## 🎯 Visão Geral do Redesign

Este conjunto de alterações transforma o Bureau Social Hub numa experiência digital inspirada no **jornalismo editorial clássico português** — rigor tipográfico de jornal de referência, com a elegância e responsividade do design moderno.

O redesign mantém toda a identidade da associação (missão, conteúdo, rotas) mas eleva radicalmente a qualidade visual, tornando cada página uma **edição especial** do seu impacto social.

---

## 🧱 Design System Estabelecido

### Paleta "Heritage"
| Token | Valor | Uso |
|-------|-------|-----|
| `heritage-navy` | `hsl(210 40% 15%)` | Textos principais, fundos |
| `heritage-terracotta` | `hsl(15 65% 55%)` | CTAs, acentos, destaques |
| `heritage-gold` | `hsl(42 78% 60%)` | Badges, KPIs, ícones |
| `heritage-ocean` | `hsl(195 40% 45%)` | Links secundários |
| `heritage-sand` | `hsl(40 33% 92%)` | Fundos suaves |

### Tipografia
- **Serif** (Playfair Display / Georgia) → Títulos editoriais, quotes, capítulos
- **Sans-serif** (Inter) → Corpo de texto, labels, UI
- **Tamanhos responsivos**: `4rem` (mobile) → `10rem` (desktop) para headings hero
- **Tracking editorial**: `tracking-[0.3em]` em labels, `tracking-tighter` em títulos

### Fundo Papel
- Cor base: `#f8f6f0` (paper cream, Light Mode)
- Dark Mode: `zinc-950`
- Grain overlay animado em todas as páginas (`opacity: 0.09`)

---

## 📄 Componentes Criados (Novos)

### `src/components/ui/Grain.tsx`
Overlay de textura de papel animado (SVG fractalNoise), aplicado globalmente nas páginas editoriais para simular o grão de papel impresso.

### `src/components/ui/FadeIn.tsx`
Componente reutilizável de animação de entrada, suportando:
- `direction`: `up`, `down`, `left`, `right`
- `triggerOnView`: ativa a animação ao entrar no viewport
- `delay`: controle preciso de sequência

### `src/components/ui/AnimatedCounter.tsx`
Contador numérico animado com efeito de contagem progressiva ao entrar no viewport. Usado em KPIs e métricas de impacto.

### `src/components/ui/Magnetic.tsx`
Efeito magnético nos botões CTA — o elemento "atrai" o cursor suavemente ao passar por cima. Usado nos CTAs principais.

### `src/components/ui/CursorFollower.tsx`
Cursor customizado que segue o movimento do rato com lag suave, reforçando a sensação premium.

### `src/components/ui/ScrollReveal.tsx`
Wrapper para revelação progressiva de elementos durante scroll, baseado em Intersection Observer.

### `src/components/ui/sheet.tsx`
Componente Sheet (drawer lateral) usado na página Assessoria para mostrar detalhes dos ofícios tradicionais sem sair da página.

### `src/components/ScrollToTop.tsx`
Scroll automático para o topo da página ao navegar entre rotas.

### `src/components/SmoothScroll.tsx`
Scroll suavizado com `lenis` para toda a aplicação.

### `src/components/visuals/ProximosPassosVisual.tsx`
Visual dos próximos passos do projeto Assessoria — timeline interativa.

---

## 🔄 Componentes Redesenhados

### `src/components/layout/Navbar.tsx`
**Antes**: Navbar simples com links horizontais e logo.

**Depois**:
- Menu mobile **full-screen editorial** — ocupa 100% do ecrã com animação blur+slide
- Estrutura **grid 12 colunas** no menu mobile: Índice Principal (col-span-8) + Portal do Associado (col-span-4)
- Links de navegação em **tipografia serif 4-7rem** com numeração `01`, `02`...
- Animação **stagger** nos links (cada item entra com delay progressivo)
- Desktop: **Active link indicator** com linha underline animada
- Tablet (lg→xl): Dropdown compacto para ecrans intermédios
- Indicador de doação com **pulsing dot** terracotta
- Botões com estado dinâmico: `Portal Ativo` (logado) / `Acesso Restrito` (visitante)

### `src/components/layout/Footer.tsx`
**Antes**: Footer simples com links.

**Depois**:
- **Branding massivo**: título `Bureau Social.` em 7rem, serif, com label "O Diário do Impacto"
- **Grid jornalístico 12 colunas**: Índice Editorial | Documentos | Sede Editorial
- Separadores com **bullet points** (·) e `LucideArrowUpRight` em hover
- Endereço em `<address>` semântico com estilo serif italic
- **Colophon** tipográfico com logo, copyright e "Edição Online Definitiva"
- Redes sociais: LinkedIn, Instagram, YouTube (Twitter/GitHub removidos)
- Textura de papel SVG como background sutil

---

## 📃 Páginas Redesenhadas

### `src/pages/Home.tsx` — Homepage

**Estrutura**: 3 secções principais

#### 1. Hero — "Masthead Style"
- Grid 12 colunas: Headline (col-span-8) + Sidebar editorial (col-span-4)
- **H1 tipográfico** em 10rem (desktop), serif, com italic terracotta
- Label "Edição Especial // Lisboa" em uppercase tracking
- Subtítulo separado por border-left com animação `direction="left"`
- CTA "Associe-se ao Bureau" com arrow que roda 45° em hover + Magnetic wrapper
- **Hero image** com parallax GSAP (yPercent −15 → +15 no scroll)
- Drop capital (letra capital) na letra inicial do texto de missão

#### 2. Mission — "The Editorial Feature"
- Background image com **parallax GSAP** via `ScrollTrigger`
- Gradiente overlay para legibilidade
- Drop capital serif terracotta na primeira letra
- Grid: Metadata (col-span-2) | Headline (col-span-6) | Body (col-span-4)

#### 3. Pillars Grid — "The Classifieds"
- **5 Pilares** em grid newspaper: `grid-cols-3` desktop, `grid-cols-2` tablet
- Cada card: hover revela **imagem de fundo** com scale(1.1→1) + overlay
- Todos os textos ficam brancos em hover (transição suave 700ms)
- Numeração editorial `01 //`, `02 //` nos labels
- Ícone inverte: `border+text-navy` → `bg-white+text-navy`

---

### `src/pages/Assessoria.tsx` — Página de Assessoria

A maior página do projeto (~85KB, 1089 linhas). Redesenhada de tabs para **scroll contínuo editorial**.

#### Estrutura Geral
- **Progress bar** fino na parte superior (animado com `useSpring`)
- **Sidebar de índice sticky** (left, col-span-3, hidden mobile)
- **Conteúdo principal** em col-span-9 com secções separadas por bordas
- Hero editorial idêntico ao da Homepage, com headline "Preservar o Património."

#### Secções (11 capítulos)
| ID | Título | Visual Key |
|----|--------|------------|
| `#programa` | O Programa de Preservação | 3-column feature grid |
| `#modelo` | Modelo Institucional | `<ModeloInstitucional />` custom visual |
| `#processo` | Processo Operacional | `<ProcessoOperacional />` 5-step visual |
| `#quinta` | Quinta do Visconde de Salreu | Cards de património + cronograma |
| `#torre` | Torre do Carvalhal | Cards com badges de estado |
| `#oficios` | Artes & Ofícios Tradicionais | `<MapaOficios />` + Sheet drawers |
| `#funcionamento` | Funcionamento | Modalidades + componentes % |
| `#governanca` | Governança | 3 pilares + estatutos |
| `#proposta` | Proposta & KPIs | 3 opções + 4 KPIs |
| `#financiamento` | Financiamento | `<FinanciamentoVisual />` + `<CronogramaVisual />` |
| `#passos` | Próximos Passos | `<ProximosPassosVisual />` timeline |

#### Navegação Editorial
- Índice sticky com **active state por scroll** (Intersection-like com `window.scrollY`)
- Borda esquerda terracotta no item ativo
- Scroll smooth ao clicar nos links do índice

#### Sheet Drawer dos Ofícios
- Lista de 20+ ofícios organizados em 4 categorias
- Cada ofício abre um **Sheet lateral** com: descrição completa, competências, duração, certificação, inserção no mercado
- Tooltip "Clique para ver detalhes" aparece em hover
- Sheet com scroll e tipografia editorial

---

### `src/pages/CandidaturaDetails.tsx`
- Redesenho do layout para estilo editorial
- Separação clara entre informações do candidato e ações do admin
- Integração de geração de PDF e notificações por email no fluxo de aprovação

### `src/pages/About.tsx`
- Redesenhada no estilo editorial (hero, tipografia serif, grid newspaper)

### `src/pages/Traditions.tsx`
- Lista expandida de profissões tradicionais portuguesas
- Layout editorial com categorias

### Outras Páginas Atualizadas
`Auth.tsx`, `Dashboard.tsx`, `Docs.tsx`, `Events.tsx`, `Help.tsx`, `HousingProject.tsx`, `Onboarding.tsx`, `Profile.tsx`, `Voting.tsx`, `AssemblyLive.tsx`, `Candidatura.tsx`

---

## 🧩 Componentes Visuais (Visuals)

| Componente | Descrição |
|------------|-----------|
| `ModeloInstitucional.tsx` | Diagrama dos 3 pilares institucionais |
| `MapaOficios.tsx` | Mapa visual das categorias de ofícios |
| `FinanciamentoVisual.tsx` | Breakdown visual das fontes de financiamento |
| `CronogramaVisual.tsx` | Timeline visual das fases do projeto |
| `ProcessoOperacional.tsx` | 5 fases sequenciais do processo |
| `ProximosPassosVisual.tsx` | Próximos passos em timeline interativa |

---

## 🖼️ Assets Adicionados

| Ficheiro | Uso |
|----------|-----|
| `public/body.jpg` | Background image da secção Mission com parallax |
| `public/hero-image.webp` | Imagem alternativa para o hero |
| `public/hero.jpg` | Hero image original |
| `public/images/pillars/` | Imagens dos 5 pilares (hover reveal na homepage) |

---

## 📦 Dependências Adicionadas

```json
{
  "framer-motion": "^11.x",
  "gsap": "^3.x",
  "@gsap/react": "^2.x",
  "lenis": "^1.x"
}
```

---

## 🎨 Princípios de Design Aplicados

### Editorial Newspaper Aesthetic
1. **Tipografia hierárquica**: Serif para headlines, sans-serif para corpo
2. **Grid jornalístico**: 12 colunas flexíveis com gutters generosos
3. **Drop capitals**: Letra capital nos parágrafos de abertura de secção
4. **Labels editoriais**: Uppercase, tracking alargado, separador `//`
5. **Numeração de artigos**: `01 //`, `02 //` como indexadores visuais
6. **Separadores**: bordas finas (`border-heritage-navy/10`) em vez de cards com sombra

### Animações Micro-editoriais
1. **FadeIn sequencial** (stagger) nos elementos de cada secção
2. **Parallax** na imagem da secção Mission (GSAP ScrollTrigger)
3. **Progress bar** fino no topo da página Assessoria
4. **Scale + opacity** nas imagens dos pillars em hover
5. **Rotate arrow** nos CTAs de navegação
6. **Active link underline** com `scaleX 0→1` na navbar

### Responsividade
- **Mobile first**: layout single column com tipografia escalada
- **Breakpoints**: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- **Menu mobile**: full-screen editorial em vez de dropdown
- **Sidebar Assessoria**: hidden mobile, sticky desktop

---

## ✅ Checklist de Qualidade

| Item | Status |
|------|--------|
| Dark Mode completo | ✅ |
| Responsivo (mobile/tablet/desktop) | ✅ |
| Animações suaves (60fps) | ✅ |
| Tipografia editorial | ✅ |
| Grid newspaper | ✅ |
| Hero editorial | ✅ |
| Navbar editorial | ✅ |
| Footer editorial | ✅ |
| Design System documentado | ✅ |
| Acessibilidade semântica (`address`, `section`, `h1-h4`) | ✅ |

---

*Branch: `feat/editorial-redesign` — Bureau Social Hub © 2026*
