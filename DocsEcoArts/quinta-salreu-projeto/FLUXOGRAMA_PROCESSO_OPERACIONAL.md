%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#044050', 'secondaryColor': '#788b92'}}}%%
flowchart TD
    subgraph FASE1["📋 FASE 1: CONSTITUIÇÃO (2026)"]
        F1_1["1.1 Elaboração dos<br/>Estatutos da Associação Local"]
        F1_2["1.2 Assembleia Constitutiva<br/>(Família Proprietária)"]
        F1_3["1.3 Registo na<br/>Conservatória"]
        F1_4["1.4 Assinatura do Termo<br/>de Cooperação com IPNS"]
        F1_5["1.5 Contrato de Arrendamento<br/>Quinta → Associação"]
        
        F1_1 --> F1_2 --> F1_3 --> F1_4 --> F1_5
    end

    subgraph FASE2["🔍 FASE 2: DIAGNÓSTICO E PLANEAMENTO (2026)"]
        F2_1["2.1 Levantamento do<br/>Estado de Conservação"]
        F2_2["2.2 Identificação de<br/>Necessidades de Restauro"]
        F2_3["2.3 Mapeamento de<br/>Competências Locais"]
        F2_4["2.4 Elaboração do<br/>Plano de Intervenção"]
        F2_5["2.5 Candidaturas a<br/>Financiamento (LIFE, FSE+)"]
        
        F2_1 --> F2_2 --> F2_3 --> F2_4 --> F2_5
    end

    subgraph FASE3["👷 FASE 3: CAPTAÇÃO E FORMAÇÃO (2026-2027)"]
        F3_1["3.1 Recrutamento de<br/>Mestres Artesãos"]
        F3_2["3.2 Seleção de<br/>Aprendizes Locais"]
        F3_3["3.3 Programa de Formação<br/>em Ofícios Tradicionais"]
        F3_4["3.4 Formação em<br/>Restauro Patrimonial"]
        F3_5["3.5 Certificação de<br/>Competências"]
        
        F3_1 --> F3_2 --> F3_3 --> F3_4 --> F3_5
    end

    subgraph FASE4["🔨 FASE 4: EXECUÇÃO DOS PROJETOS (2027-2028)"]
        F4_1["4.1 Restauro do<br/>Palacete e Torre"]
        F4_2["4.2 Recuperação do<br/>Jardim Histórico"]
        F4_3["4.3 Reabilitação dos<br/>Sistemas de Água"]
        F4_4["4.4 Instalação do Centro<br/>de Formação"]
        F4_5["4.5 Implementação de<br/>Agricultura Sustentável"]
        
        F4_1 --> F4_2 --> F4_3 --> F4_4 --> F4_5
    end

    subgraph FASE5["🎯 FASE 5: OPERAÇÃO E SUSTENTABILIDADE (2028+)"]
        F5_1["5.1 Abertura ao<br/>Público"]
        F5_2["5.2 Programa de<br/>Turismo Cultural"]
        F5_3["5.3 Comercialização de<br/>Produtos Artesanais"]
        F5_4["5.4 Formação Contínua<br/>de Novos Artesãos"]
        F5_5["5.5 Monitorização e<br/>Relatórios ESG"]
        
        F5_1 --> F5_2 --> F5_3 --> F5_4 --> F5_5
    end

    FASE1 --> FASE2 --> FASE3 --> FASE4 --> FASE5
