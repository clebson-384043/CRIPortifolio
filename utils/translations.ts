

import { Language } from '../types';

export const t = {
  [Language.EN]: {
    nav: { portfolio: "Portfolio", about: "Founder Profile", services: "Services", portal: "Client Portal", cases: "Case Studies" },
    footer: { copyright: "2025 NEXU AI. All rights reserved.", tagline: "Specializing in Generative AI, Python, SharePoint, and Enterprise Portals." },
    hero: {
        avail: "Available for New Projects",
        title1: "Building the Future with",
        title2: "Intelligent Solutions",
        desc: "Senior AI Technical Lead & Consultant. Specializing in Generative AI, SharePoint modernization, Python automation, and enterprise-grade portals.",
        btnPoc: "Try Functional POCs",
        btnCase: "View Case Studies",
        tech: "Technology Expertise"
    },
    services: {
        title: "Specialized Consultancy",
        subtitle: "End-to-end technical expertise. From strategic architecture to production-grade implementation.",
        offerings: [
          {
            title: "Generative AI & RAG",
            desc: "Advanced RAG architectures using Azure OpenAI and Gemini. Implementation of vector databases and semantic search to empower business data with AI.",
            tags: ["Azure OpenAI", "Gemini", "RAG", "Vector DB", "LangChain"]
          },
          {
            title: "Legacy Modernization & APIs",
            desc: "Bridging the gap between cutting-edge LLMs and legacy systems (ERP, SAP, Mainframe). Design of secure API Gateways and integration layers.",
            tags: ["API Management", "Legacy Integration", "SAP Connectors", "Hybrid Cloud"]
          },
          {
            title: "Cloud Architecture (Azure)",
            desc: "Definition of scalable cloud architectures, Technical Roadmaps (ADRs), and Well-Architected Framework reviews. Focus on security and cost efficiency.",
            tags: ["Azure", "Architecture Design", "Security", "FinOps", "Scalability"]
          },
          {
            title: "Intelligent Automation (Python)",
            desc: "Complex process orchestration combining Power Automate for triggers and Python (Azure Functions) for heavy logic and data processing.",
            tags: ["Python", "Azure Functions", "Power Automate", "Process Optimization"]
          },
          {
            title: "SharePoint & Copilot Studio",
            desc: "Modern digital workplaces. Custom Copilot agents for M365 and robust Power Platform applications to enhance employee productivity.",
            tags: ["Copilot Studio", "SharePoint Online", "Power Platform", "SPFx"]
          },
          {
            title: "DevOps & Tech Governance",
            desc: "Establishment of CI/CD pipelines, code quality standards (SonarQube), and technical mentorship for development teams. Engineering excellence.",
            tags: ["DevOps", "CI/CD", "Governance", "Mentorship", "Quality QA"]
          }
        ],
        ctaTitle: "Ready to transform your business?",
        ctaBtn: "Schedule Technical Discovery"
    },
    cases: {
      title: "Featured Projects",
      subtitle: "A selection of enterprise solutions delivering real business value through AI and Cloud innovation.",
      filters: { all: "All", ai_data_auto: "AI & Data Automation", ai_data: "AI & Data", ai_auto: "AI & Automation" },
      labelChallenge: "Challenge",
      labelSolution: "Solution",
      labelResult: "Results",
      items: [
        {
          id: 12,
          category: "AI_AUTOMATION",
          title: "Intelligent Assistant for Request Analysis",
          client: "Legal",
          challenge: "The legal sector faced a high volume of requests and a lack of intelligent tools to assist in analysis, resulting in manual, slow, and error-prone processes.",
          solution: "Implementation of an AI assistant, integrated with the legal system, for document analysis, draft suggestions, decision-making support, and compliance verification, ensuring security and agility.",
          result: "Significant reduction in operational time, standardization of procedures, increased productivity, and greater security and compliance in requests.",
          tech: ["Azure OpenAI", "Azure Functions", "WebApp", "SQL Database", "Application Gateway"]
        },
        {
          id: 11,
          category: "AI_AUTOMATION",
          title: "Automated Contract Analysis",
          client: "Legal / Procurement",
          challenge: "Contract review was performed manually, consuming time and prone to failures in identifying critical clauses and compliance.",
          solution: "Automated solution for contract upload and analysis, with AI-driven clause extraction and validation, and delivery of structured reports via Teams or email.",
          result: "Significant reduction in review time, standardization of analyses, and greater accuracy in identifying contractual risks.",
          tech: ["Azure OpenAI", "Azure AI Document Intelligence", "Power Apps", "Azure Functions", "Logic Apps", "SharePoint"]
        },
        {
          id: 10,
          category: "AI_AUTOMATION",
          title: "Intelligent Automation for Career Management",
          client: "Human Resources (HR)",
          challenge: "The process of mapping and analyzing competencies was manual, prone to errors, and time-consuming to consolidate information.",
          solution: "Creation of an App with intelligent PDF reading via AI and OCR, automated data extraction, and integration with Power Apps, Logic Apps, and Dataverse for data updates.",
          result: "Significant reduction in processing time, higher data reliability, and automation of the career information update flow.",
          tech: ["Power Apps", "Azure OpenAI", "OCR", "Dataverse", "SharePoint"]
        },
        {
          id: 9,
          category: "AI_DATA_AUTOMATION",
          title: "Intelligent Contract Analysis with Generative AI",
          client: "Legal / Procurement",
          challenge: "Contract analysis was manual, slow, and prone to errors, requiring individual searches and verifications across multiple files and systems, which limited team productivity and accuracy.",
          solution: "Automation of contract analysis using Generative AI, integrating structured and unstructured data in Databricks, a web interface with chat for intelligent and centralized queries, and dynamic processing of contracts and attachments.",
          result: "Drastic reduction in analysis time, increased accuracy, centralization of information, and scalability across multiple business areas.",
          tech: ["Databricks", "GPT (LLM)", "Python", "FastAPI", "React", "Azure Storage", "Vector Search"]
        },
        {
          id: 8,
          category: "AI_DATA",
          title: "Intelligent Assistant for Corporate Queries",
          client: "IT Sector",
          challenge: "Users lacked fast and intelligent access to corporate documents and standards, relying on manual searches and inefficient processes.",
          solution: "Generative AI environment integrating Copilot Studio with SharePoint Portals, allowing users to query corporate documents via a chatbot in Microsoft Teams.",
          result: "Significant reduction in information search time, increased productivity, and a foundation for decisions regarding the definitive adoption of the solution.",
          tech: ["Copilot Studio", "SharePoint", "Teams"]
        },
        {
          id: 7,
          category: "AI_AUTOMATION",
          title: "Intelligent Compliance Report Processing",
          client: "Legal / Compliance",
          challenge: "Compliance report reviews were performed manually by lawyers, requiring high operational effort and posing risks of inconsistencies and a lack of structured indicators.",
          solution: "Automation of the review process using Generative AI, Power Apps interface for upload, automatic analysis, historical pattern extraction, and smart reporting. Integrates Azure OpenAI, Azure Search, and SharePoint.",
          result: "Significant reduction in operational effort, standardization of reports, increased transparency, and agility in compliance decisions.",
          tech: ["Azure OpenAI", "Power Apps", "Logic Apps", "Azure Search", "SharePoint", "Dataverse"]
        },
        {
          id: 6,
          category: "AI_AUTOMATION",
          title: "Intelligent Assistant for Managers and Employees",
          client: "HR / Personnel Administration",
          challenge: "Managers and employees struggled to get access to information about corporate travel and attendance, relying on manual queries and poorly integrated portals.",
          solution: "GenAI Chatbot integrated with Teams that uses automations to extract data from SharePoint, processes documents with OCR, and provides contextualized answers based on user location.",
          result: "Significant reduction in information search time, higher accuracy in responses, and increased efficiency in support.",
          tech: ["Azure OpenAI", "Azure Search", "OCR", "SharePoint", "Copilot Studio", "Teams"]
        },
        {
          id: 5,
          category: "AI_AUTOMATION",
          title: "Intelligent IT Support Assistant",
          client: "IT Sector",
          challenge: "IT users struggled to get fast and accurate answers, facing limitations from traditional chatbots and manual processes.",
          solution: "Generative AI chatbot using Azure OpenAI and Azure Search, integrated with Teams, learning from the ServiceNow knowledge base to provide contextualized responses.",
          result: "85% reduction in information search time and significant increase in support efficiency.",
          tech: ["Azure OpenAI", "Azure Search", "Copilot Studio", "Teams", "Azure Functions"]
        }
      ]
    },
    about: {
        title: "Founder Profile",
        subtitle: "Founder & Principal Architect",
        summary: "After more than a decade architecting critical systems for industry giants like ArcelorMittal, I founded NEXU AI with a clear mission: to bridge the gap between corporate complexity and AI innovation. I don't just write code; I design resilient strategies that integrate the new wave of Artificial Intelligence with the systems that already run your business.",
        location: "Global Remote / Brazil",
        contact: "Discuss Your Project",
        expTitle: "Corporate Background & Authority",
        eduTitle: "Academic Foundation",
        skillsTitle: "Technical & Strategic Pillars",
        downloadCv: "Download Full Profile",
        lblCerts: "Key Certifications",
        brandAssets: "Brand Assets",
        downloadLogo: "Download Logo (High Res PNG)",
        values: [
          { title: "Business First", desc: "Technology is a means, not an end. Every line of code must drive ROI." },
          { title: "Security & Governance", desc: "Innovation without control is risk. I bring enterprise-grade compliance to AI." },
          { title: "Legacy Integration", desc: "I respect your existing infrastructure. I build bridges, not silos." }
        ],
        jobs: [
            {
                role: "Tech Lead & Solution Architect",
                company: "ArcelorMittal Sistemas",
                period: "Nov 2020 - Present",
                desc: "Led the AI innovation cell for a global steel giant. Responsible for defining the architectural standards (ADRs) that govern how AI interacts with mission-critical SAP and ERP data."
            },
            {
                role: "Senior Systems Analyst",
                company: "Vetta",
                period: "Apr 2015 - Oct 2020",
                desc: "Spearheaded digital transformation projects, orchestrating the shift to Azure Cloud and modernizing corporate intranets for efficiency and scale."
            },
            {
                role: "Infrastructure Analyst",
                company: "Ativas Data Center",
                period: "Jun 2014 - Mar 2015",
                desc: "Built a solid foundation in infrastructure and server management, providing the deep technical grounding necessary for modern cloud architecture."
            }
        ],
        education: [
            {
                degree: "Bachelor in Information Systems",
                school: "PUC Minas",
                period: "2009 - 2012"
            }
        ],
        certs: [
            "Core Solutions of Microsoft SharePoint Server",
            "Scrum Foundation Professional",
            "Enabling Office 365 Services"
        ]
    },
    portal: {
        auth: "Authenticating Client Access...",
        menuTitle: "Available Demos",
        exit: "Exit Portal",
        pocChat: "🤖 AI Consultant Chat",
        pocVoice: "🎙️ Live Voice Agent",
        pocImage: "🎨 Image Studio (Pro/Edit)",
        pocVeo: "🎬 Veo Video Gen",
        pocSearch: "🔍 Smart Search & Maps",
        credits: "Credits",
        loginTitle: "Client Access",
        loginDesc: "Sign in to access exclusive AI demos and POCs.",
        loginBtn: "Sign in with Google",
        lowCredits: "Insufficient Credits",
        cost: "Cost"
    },
    chat: {
        title: "Gemini 3 Pro Consultant",
        thinking: "Thinking Mode: Enabled",
        placeholder: "Ask about AI strategy, SharePoint code, or Python scripts...",
        send: "Send",
        init: "Hello! I am your virtual AI Consultant powered by Gemini 3.0 Pro. How can I help you improve your business processes today?",
        system: "You are an expert AI consultant helping a client. You are knowledgeable about SharePoint, Python, and GenAI. Use 'Thinking' to plan complex answers."
    },
    voice: {
        title: "Gemini Live Agent",
        ready: "Ready to connect",
        init: "Initializing audio...",
        connecting: "Connecting to Gemini Live...",
        connected: "Connected! Speak now.",
        start: "Start Live Session",
        end: "End Conversation",
        desc: "Powered by Gemini 2.5 Flash Native Audio. Uses raw PCM streaming over WebSockets for ultra-low latency."
    },
    image: {
        title: "Image Studio",
        genMode: "Generating with Gemini 3 Pro Image (High Fidelity).",
        editMode: "Editing with Gemini 2.5 Flash Image (Nano Banana).",
        btnGen: "Generate New",
        btnEdit: "Edit Existing",
        size: "Size",
        ratio: "Aspect Ratio",
        descGen: "Describe the image...",
        descEdit: "How should we modify this image?",
        placeGen: "A futuristic data center in a rainforest...",
        placeEdit: "Add a robot in the background, make it sunset...",
        actionGen: "Generate Image",
        actionEdit: "Edit Image",
        proc: "Processando...",
        result: "Result will appear here"
    },
    veo: {
        title: "Veo Video Generator",
        desc: "Create 1080p videos from text prompts using Google's most advanced video model.",
        empty: "Your cinematic masterpiece awaits",
        status: "Submitting job to Veo 3.1...",
        place: "A cyberpunk cat driving a neon motorcycle...",
        btn: "Generate",
        billing: "Pricing & Billing Information"
    },
    research: {
        title: "Grounded Research",
        btnSearch: "Google Search",
        btnMaps: "Google Maps",
        placeSearch: "What are the latest trends in React 19?",
        placeMaps: "Italian restaurants near San Francisco",
        btnQuery: "Pesquisar",
        analysis: "AI Analysis",
        cit: "Citations",
        err: "Error retrieving information."
    }
  },
  [Language.PT]: {
    nav: { portfolio: "Portfólio", about: "Perfil do Fundador", services: "Serviços", portal: "Área do Cliente", cases: "Projetos & Cases" },
    footer: { copyright: "2025 NEXU AI. Todos os direitos reservados.", tagline: "Especializado em IA Generativa." },
    hero: {
        avail: "Disponível para Novos Projetos",
        title1: "Construindo o Futuro com",
        title2: "Soluções Inteligentes",
        desc: "Líder Técnico Sênior de IA & Consultor. Especialista em IA Generativa, modernização de SharePoint, automação em Python e portais empresariais.",
        btnPoc: "Testar POCs Funcionais",
        btnCase: "Ver Estudos de Caso",
        tech: "Expertise Tecnológica"
    },
    services: {
        title: "Consultoria Especializada",
        subtitle: "Seis pilares de excelência técnica para transformar seu negócio digital.",
        offerings: [
          {
            title: "IA Generativa & RAG",
            desc: "Arquitetura RAG avançada com Azure OpenAI e Gemini. Implementação de bancos vetoriais e busca semântica para empoderar dados de negócio com IA.",
            tags: ["Azure OpenAI", "Gemini", "RAG", "Vector DB", "LangChain"]
          },
          {
            title: "Modernização de Legados & APIs",
            desc: "Integração segura entre LLMs de ponta e sistemas legados (ERP, SAP, Mainframe). Design de API Gateways robustos e camadas de conectividade.",
            tags: ["Gestão de API", "Integração Legada", "Conectores SAP", "Nuvem Híbrida"]
          },
          {
            title: "Arquitetura Cloud (Azure)",
            desc: "Definição de arquiteturas escaláveis, Roadmaps Técnicos (ADRs) e revisões Well-Architected. Foco total em segurança, resiliência e eficiência de custos.",
            tags: ["Azure", "Design de Arquitetura", "Segurança", "FinOps", "Escalabilidade"]
          },
          {
            title: "Automação Inteligente (Python)",
            desc: "Orquestração de processos complexos combinando Power Automate para gatilhos e Python (Azure Functions) para lógica pesada e processamento de dados.",
            tags: ["Python", "Azure Functions", "Power Automate", "Otimização"]
          },
          {
            title: "SharePoint & Copilot Studio",
            desc: "Workplaces digitais modernos. Agentes Copilot personalizados para M365 e aplicações Power Platform robustas para produtividade.",
            tags: ["Copilot Studio", "SharePoint Online", "Power Platform", "SPFx"]
          },
          {
            title: "DevOps & Governança Tech",
            desc: "Estabelecimento de pipelines CI/CD, padrões de qualidade de código (SonarQube) e mentoria técnica para times de desenvolvimento.",
            tags: ["DevOps", "CI/CD", "Governança", "Mentoria", "QA"]
          }
        ],
        ctaTitle: "Pronto para transformar seu negócio?",
        ctaBtn: "Agendar Discovery Técnica"
    },
    cases: {
      title: "Projetos em Destaque",
      subtitle: "Uma seleção de soluções corporativas entregando valor real através de inovação em IA e Cloud.",
      filters: { all: "Todos", ai_data_auto: "IA & Automação de Dados", ai_data: "IA & Dados", ai_auto: "IA & Automação" },
      labelChallenge: "Desafio",
      labelSolution: "Solução",
      labelResult: "Resultados",
      items: [
        {
          id: 12,
          category: "AI_AUTOMATION",
          title: "Assistente Inteligente para Análise de Solicitações",
          client: "Jurídico",
          challenge: "O setor jurídico enfrentava alto volume de solicitações e ausência de ferramentas inteligentes para auxiliar nas análises, resultando em processos manuais, lentos e sujeitos a erros.",
          solution: "Implementação de assistente com IA, integrado ao sistema do jurídico, para análise de documentos, sugestão de minutas, apoio à tomada de decisão e verificação de conformidade, garantindo segurança e agilidade.",
          result: "Redução expressiva do tempo operacional, padronização de procedimentos, aumento da produtividade e maior segurança e conformidade nas solicitações.",
          tech: ["Azure OpenAI", "Azure Functions", "WebApp", "SQL Database", "Application Gateway"]
        },
        {
          id: 11,
          category: "AI_AUTOMATION",
          title: "Análise Automatizada de Contratos",
          client: "Jurídico / Compras",
          challenge: "A revisão de contratos era feita manualmente, consumindo tempo e sujeita a falhas na identificação de cláusulas críticas e conformidade.",
          solution: "Solução automatizada para upload e análise de contratos, com extração e validação de cláusulas via IA, envio de relatórios estruturados por Teams ou e-mail.",
          result: "Redução expressiva do tempo de revisão, padronização das análises e maior assertividade na identificação de riscos contratuais.",
          tech: ["Azure OpenAI", "Azure AI Document Intelligence", "Power Apps", "Azure Functions", "Logic Apps", "SharePoint"]
        },
        {
          id: 10,
          category: "AI_AUTOMATION",
          title: "Automação Inteligente para Gestão de Carreiras",
          client: "Recursos Humanos (RH)",
          challenge: "O processo de mapeamento e análise de competências era manual, sujeito a erros e demandava tempo para consolidar informações.",
          solution: "Criar uma App com leitura inteligente de PDFs via IA e OCR, extração automatizada de dados e integração com Power Apps, Logic Apps e Dataverse para atualização dos dados.",
          result: "Redução significativa do tempo de processamento, maior confiabilidade dos dados e automação do fluxo de atualização de informações de carreira.",
          tech: ["Power Apps", "Azure OpenAI", "OCR", "Dataverse", "SharePoint"]
        },
        {
          id: 9,
          category: "AI_DATA_AUTOMATION",
          title: "Análise Inteligente de Contratos com IA Generativa",
          client: "Jurídico / Compras",
          challenge: "A análise de contratos era manual, lenta e sujeita a erros, exigindo buscas e verificações individuais em múltiplos arquivos e sistemas, o que limitava a produtividade e a assertividade das equipes.",
          solution: "Automatização da análise contratual com IA generativa, integrando dados estruturados e não estruturados no Databricks, interface web com chat para consultas inteligentes e centralizadas, e processamento dinâmico de contratos e anexos.",
          result: "Redução drástica do tempo de análise, aumento da precisão, centralização das informações e escalabilidade para múltiplas áreas de negócio.",
          tech: ["Databricks", "GPT (LLM)", "Python", "FastAPI", "React", "Azure Storage", "Vector Search"]
        },
        {
          id: 8,
          category: "AI_DATA",
          title: "Assistente Inteligente para Consultas Corporativas",
          client: "TI",
          challenge: "Usuários não tinham acesso rápido e inteligente a documentos e normas corporativas, dependendo de buscas manuais e processos pouco eficientes.",
          solution: "Ambiente de IA generativa, integrando Copilot Studio com Portais do Sharepoint, permitindo que usuários consultem documentos corporativos via chatbot no Microsoft Teams.",
          result: "Redução significativa do tempo de busca por informações, maior produtividade e base para decisões sobre adoção definitiva da solução.",
          tech: ["Copilot Studio", "SharePoint", "Teams"]
        },
        {
          id: 7,
          category: "AI_AUTOMATION",
          title: "Processamento Inteligente de Relatórios de Compliance",
          client: "Jurídico / Compliance",
          challenge: "A revisão de relatórios de compliance era feita manualmente por advogados, demandando alto esforço operacional e apresentando risco de inconsistências e falta de indicadores estruturados.",
          solution: "Automação do processo de revisão com IA generativa, interface Power Apps para upload, análise automática dos documentos, extração de padrões históricos e geração de relatórios inteligentes, integrando Azure OpenAI, Azure Search e SharePoint.",
          result: "Redução significativa do esforço operacional, padronização dos relatórios, aumento da transparência e agilidade nas decisões de compliance.",
          tech: ["Azure OpenAI", "Power Apps", "Logic Apps", "Azure Search", "SharePoint", "Dataverse"]
        },
        {
          id: 6,
          category: "AI_AUTOMATION",
          title: "Assistente Inteligente para Atendimento de Gestores e Empregados",
          client: "RH / Administração de Pessoal",
          challenge: "Gestores e empregados tinham dificuldade para acessar informações sobre viagens corporativas e frequência, dependendo de consultas manuais e portais pouco integrados.",
          solution: "Chatbot com IA generativa integrado ao Teams, que utiliza automações para extrair dados do SharePoint, processa documentos com OCR e fornece respostas contextualizadas conforme a localidade do usuário.",
          result: "Redução significativa no tempo de busca por informações, maior assertividade nas respostas e aumento da eficiência no atendimento a gestores e empregados.",
          tech: ["Azure OpenAI", "Azure Search", "OCR", "SharePoint", "Copilot Studio", "Teams"]
        },
        {
          id: 5,
          category: "AI_AUTOMATION",
          title: "Assistente Inteligente para Suporte em TI",
          client: "Tecnologia da Informação",
          challenge: "Usuários de TI tinham dificuldade para obter respostas rápidas e precisas, enfrentando limitações dos chatbots tradicionais e processos manuais.",
          solution: "Chatbot com IA generativa usando Azure OpenAI e Azure Search, integrado ao Teams, que aprende com a base de conhecimento do ServiceNow e responde de forma contextualizada.",
          result: "Redução de até 85% no tempo de busca por informações e aumento expressivo na eficiência do suporte ao usuário.",
          tech: ["Azure OpenAI", "Azure Search", "Copilot Studio", "Teams", "Azure Functions"]
        }
      ]
    },
    about: {
        title: "Perfil do Fundador",
        subtitle: "Fundador & Arquiteto Principal",
        summary: "Após mais de uma década arquitetando sistemas críticos para gigantes da indústria como a ArcelorMittal, fundei a NEXU AI com uma missão clara: diminuir a lacuna entre a complexidade corporativa e a inovação em IA. Eu não apenas entrego código; desenho estratégias resilientes que integram a nova onda de Inteligência Artificial aos sistemas que já rodam o seu negócio.",
        location: "Atuação Global / Base Brasil",
        contact: "Discutir Projeto",
        expTitle: "Background Corporativo & Autoridade",
        eduTitle: "Base Acadêmica",
        skillsTitle: "Pilares Técnicos e Estratégicos",
        downloadCv: "Baixar Perfil Completo",
        lblCerts: "Certificações Chave",
        brandAssets: "Identidade Visual",
        downloadLogo: "Baixar Logo (Alta Resolução PNG)",
        values: [
          { title: "Negócio Primeiro", desc: "Tecnologia é meio, não fim. Cada linha de código deve gerar retorno (ROI)." },
          { title: "Segurança & Governança", desc: "Inovação sem controle é risco. Trago o compliance corporativo para a IA." },
          { title: "Integração Legada", desc: "Respeito sua infraestrutura existente. Construo pontes para o futuro, não silos isolados." }
        ],
        jobs: [
            {
                role: "Tech Lead & Solution Architect",
                company: "ArcelorMittal Sistemas",
                period: "Nov 2020 - Presente",
                desc: "Liderança da célula de inovação em IA para uma gigante mundial. Responsável por definir os padrões de arquitetura (ADRs) que governam como a IA interage com dados críticos de SAP e ERP."
            },
            {
                role: "Senior Systems Analyst",
                company: "Vetta",
                period: "Abr 2015 - Out 2020",
                desc: "Frente de transformação digital, orquestrando a mudança para Cloud Azure e modernizando intranets corporativas para eficiência e escala."
            },
            {
                role: "Infrastructure Analyst",
                company: "Ativas Data Center",
                period: "Jun 2014 - Mar 2015",
                desc: "Construção de base sólida em infraestrutura e servidores, fornecendo o \"chão de fábrica\" técnico necessário para a arquitetura em nuvem moderna."
            }
        ],
        education: [
            {
                degree: "Graduação em Sistemas de Informação",
                school: "PUC Minas",
                period: "2009 - 2012"
            }
        ],
        certs: [
            "Core Solutions of Microsoft SharePoint Server",
            "Scrum Foundation Professional",
            "Enabling Office 365 Services"
        ]
    },
    portal: {
        auth: "Autenticando Acesso do Cliente...",
        menuTitle: "Demos Disponíveis",
        exit: "Sair do Portal",
        pocChat: "🤖 Chat Consultor IA",
        pocVoice: "🎙️ Agente de Voz ao Vivo",
        pocImage: "🎨 Estúdio de Imagem (Pro/Edit)",
        pocVeo: "🎬 Geração de Vídeo Veo",
        pocSearch: "🔍 Busca Inteligente e Mapas",
        credits: "Créditos",
        loginTitle: "Acesso Restrito",
        loginDesc: "Faça login para acessar demos e POCs exclusivas de IA.",
        loginBtn: "Entrar com Google",
        lowCredits: "Créditos Insuficientes",
        cost: "Custo"
    },
    chat: {
        title: "Consultor Gemini 3 Pro",
        thinking: "Modo Pensamento: Ativado",
        placeholder: "Pergunte sobre estratégia de IA, código SharePoint ou scripts Python...",
        send: "Enviar",
        init: "Olá! Sou seu consultor virtual de IA powered by Gemini 3.0 Pro. Como posso ajudar a melhorar seus processos de negócio hoje?",
        system: "Você é um consultor especialista em IA ajudando um cliente. Você conhece SharePoint, Python e GenAI. Use 'Pensamento' para planejar respostas complexas. Responda em Português."
    },
    voice: {
        title: "Agente Gemini Live",
        ready: "Pronto para conectar",
        init: "Inicializando áudio...",
        connecting: "Conectando ao Gemini Live...",
        connected: "Conectado! Pode falar.",
        start: "Iniciar Sessão ao Vivo",
        end: "Encerrar Conversa",
        desc: "Desenvolvido com Gemini 2.5 Flash Native Audio. Usa streaming PCM via WebSockets para latência ultrabaixa."
    },
    image: {
        title: "Estúdio de Imagem",
        genMode: "Gerando com Gemini 3 Pro Image (Alta Fidelidade).",
        editMode: "Editando com Gemini 2.5 Flash Image (Nano Banana).",
        btnGen: "Gerar Novo",
        btnEdit: "Editar Existente",
        size: "Tamanho",
        ratio: "Proporção",
        descGen: "Descreva a imagem...",
        descEdit: "Como devemos modificar esta imagem?",
        placeGen: "Um data center futurista em uma floresta tropical...",
        placeEdit: "Adicione um robô ao fundo, faça parecer pôr do sol...",
        actionGen: "Gerar Imagem",
        actionEdit: "Editar Imagem",
        proc: "Processando...",
        result: "O resultado aparecerá aqui"
    },
    veo: {
        title: "Gerador de Vídeo Veo",
        desc: "Crie vídeos 1080p a partir de texto usando o modelo de vídeo mais avançado do Google.",
        empty: "Sua obra-prima cinematográfica aguarda",
        status: "Enviando trabalho para o Veo 3.1...",
        place: "Um gato cyberpunk dirigindo uma moto neon...",
        btn: "Gerar",
        billing: "Informações de Preços e Faturamento"
    },
    research: {
        title: "Pesquisa Fundamentada",
        btnSearch: "Pesquisa Google",
        btnMaps: "Pesquisa Google Maps",
        placeSearch: "Quais as últimas tendências do React 19?",
        placeMaps: "Restaurantes italianos próximos a San Francisco",
        btnQuery: "Pesquisar",
        analysis: "Análise de IA",
        cit: "Citações",
        err: "Erro ao recuperar informações."
    }
  }
};
