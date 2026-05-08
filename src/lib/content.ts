export type Lang = 'en' | 'es';

export const CONTENT = {
  en: {
    meta: {
      title: 'Allan Aceituno · Fullstack Developer',
      description: 'Fullstack developer with 5+ years building Next.js apps, Node.js backends, WhatsApp automations and design systems.',
    },
    nav: {
      about: 'About',
      experience: 'Experience',
      services: 'What I build',
      projects: 'Projects',
      contact: 'Contact',
    },
    rail: {
      role: 'Fullstack Developer',
      tagline: 'I build digital systems that convert and sell — end-to-end.',
      hire: 'Hire me',
      footer: 'Designed in code · Built with care · © 2026 Allan Aceituno',
    },
    about: {
      heading: 'About',
      tag1: 'HND',
      pkv: { loc: 'El Progreso, HN', now: 'Open to work', tz: 'GMT-6' },
      paras: [
        "I'm <strong>Allan Aceituno</strong>, a fullstack developer with <span class='hl'>5+ years</span> turning business problems into software that <strong>converts and sells</strong>. I design and ship end-to-end — from interfaces and design systems to <strong>microservices, queues and cloud infrastructure</strong>.",
        "Today I lead technology at <strong>Sweepstouch</strong> — kiosks running on thousands of tablets, MMS/SMS opt-in campaigns, referral systems, BullMQ pipelines and real-time analytics. Before that I built the <strong>Microfrontends platform</strong> at Banco Ficohsa with React Query, MUI, Tailwind and Azure infrastructure.",
        "I believe in <span class='hl'>no impossibles</span>: every product is solvable with the right architecture, the right team, and a relentless focus on the user.",
      ],
    },
    services: {
      heading: 'What I build',
      items: [
        { key: 'frontend', title: 'Frontend & UI', desc: 'Pixel-tight Next.js interfaces, microfrontends, component libraries and high-performing landing pages.', stack: 'Next.js · React Query · MUI · Tailwind' },
        { key: 'backend', title: 'Backend & Cloud', desc: 'Robust Node.js services on AWS — queues, sockets, storage, observability, CI/CD and microservices.', stack: 'Node · MongoDB · Redis · S3 · Docker · Azure' },
        { key: 'growth', title: 'Growth & Marketing', desc: 'Email marketing, digital ads, QR + short-link tracking and analytics — products that move the needle.', stack: 'Brevo · Meta · GA4 · UTM · Cloudinary' },
        { key: 'whatsapp', title: 'WhatsApp & SMS Bots', desc: 'Conversational flows, opt-in campaigns, mass messaging and CRM webhooks engineered for scale and conversion.', stack: 'BullMQ · Redis · WhatsApp Cloud API · Twilio' },
        { key: 'n8n', title: 'n8n & Automations', desc: 'Business automations that connect tools, orchestrate flows and remove human bottlenecks across departments.', stack: 'n8n · Webhooks · APIs · Cron · Zapier' },
        { key: 'mobile', title: 'Mobile Development', desc: 'Cross-platform mobile apps with native feel, offline-ready and integrated with secure backends.', stack: 'React Native · Expo · TypeScript' },
      ],
    },
    contact: {
      heading: 'Get in touch',
      lead: "Have a product worth <em>shipping?</em><br/>Let's build it together.",
      body: 'Open to fullstack roles and select freelance projects — WhatsApp/SMS automations, mobile apps, backend systems. Replies within 24 hours.',
      copy: 'Copy email',
      copied: 'Copied!',
      cv: 'Download CV',
      stats: [
        { v: '5+', k: 'years building' },
        { v: '∞', k: 'no impossibles' },
        { v: '<24h', k: 'reply time' },
      ],
    },
    projectsHeading: 'Selected work',
    addProject: 'Add a project',
    socialsHeading: 'Find me online',
    modal: {
      title: 'New project',
      title_label: 'Title',
      desc_label: 'Description',
      tags_label: 'Tech (comma-separated)',
      link_label: 'Link',
      thumb_label: 'Thumbnail URL (optional)',
      cancel: 'Cancel',
      submit: 'Add project',
      title_ph: 'e.g. Sweepstouch Kiosk',
      desc_ph: 'What it does, what you built…',
      tags_ph: 'Next.js, Node, MongoDB',
    },
    toasts: { added: 'Project added', removed: 'Project removed' },
  },
  es: {
    meta: {
      title: 'Allan Aceituno · Desarrollador Fullstack',
      description: 'Desarrollador fullstack con +5 años construyendo apps Next.js, backends Node.js, automatizaciones WhatsApp y sistemas de diseño.',
    },
    nav: {
      about: 'Sobre mí',
      experience: 'Experiencia',
      services: 'Qué construyo',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    rail: {
      role: 'Desarrollador Fullstack',
      tagline: 'Construyo sistemas digitales que convierten y venden — de punta a punta.',
      hire: 'Contrátame',
      footer: 'Diseñado en código · Hecho con cariño · © 2026 Allan Aceituno',
    },
    about: {
      heading: 'Sobre mí',
      tag1: 'HND',
      pkv: { loc: 'El Progreso, HN', now: 'Disponible', tz: 'GMT-6' },
      paras: [
        "Soy <strong>Allan Aceituno</strong>, desarrollador fullstack con <span class='hl'>+5 años</span> convirtiendo problemas de negocio en software que <strong>convierte y vende</strong>. Diseño y entrego de punta a punta — desde interfaces y sistemas de diseño hasta <strong>microservicios, colas e infraestructura cloud</strong>.",
        "Hoy lidero la tecnología en <strong>Sweepstouch</strong> — kioscos en miles de tablets en tiendas, campañas opt-in MMS/SMS, sistemas de referidos, pipelines BullMQ y analítica en tiempo real. Antes construí la <strong>plataforma de Microfrontends</strong> en Banco Ficohsa con React Query, MUI, Tailwind e infraestructura Azure.",
        "Creo en <span class='hl'>no hay imposibles</span>: todo producto se resuelve con la arquitectura correcta, el equipo correcto y obsesión por el usuario.",
      ],
    },
    services: {
      heading: 'Qué construyo',
      items: [
        { key: 'frontend', title: 'Frontend y UI', desc: 'Interfaces Next.js pixel-perfect, microfrontends, librerías de componentes y landings de alto rendimiento.', stack: 'Next.js · React Query · MUI · Tailwind' },
        { key: 'backend', title: 'Backend y Cloud', desc: 'Servicios Node.js robustos en AWS — colas, sockets, storage, observabilidad, CI/CD y microservicios.', stack: 'Node · MongoDB · Redis · S3 · Docker · Azure' },
        { key: 'growth', title: 'Crecimiento y Marketing', desc: 'Email marketing, marketing digital, tracking con QR + short-links y analítica — productos que mueven la aguja.', stack: 'Brevo · Meta · GA4 · UTM · Cloudinary' },
        { key: 'whatsapp', title: 'Bots WhatsApp y SMS', desc: 'Flujos conversacionales, campañas opt-in, mensajería masiva y webhooks CRM diseñados para escala y conversión.', stack: 'BullMQ · Redis · WhatsApp Cloud API · Twilio' },
        { key: 'n8n', title: 'n8n y Automatizaciones', desc: 'Automatizaciones que conectan herramientas, orquestan flujos y eliminan cuellos de botella entre áreas.', stack: 'n8n · Webhooks · APIs · Cron · Zapier' },
        { key: 'mobile', title: 'Desarrollo Móvil', desc: 'Aplicaciones móviles multiplataforma con sensación nativa, offline-ready, integradas a backends seguros.', stack: 'React Native · Expo · TypeScript' },
      ],
    },
    contact: {
      heading: 'Conversemos',
      lead: "¿Tienes un producto listo para <em>despegar?</em><br/>Construyámoslo juntos.",
      body: 'Disponible para roles fullstack y proyectos freelance seleccionados — automatizaciones WhatsApp/SMS, apps móviles, sistemas backend. Respondo en menos de 24 horas.',
      copy: 'Copiar email',
      copied: '¡Copiado!',
      cv: 'Descargar CV',
      stats: [
        { v: '+5', k: 'años construyendo' },
        { v: '∞', k: 'no hay imposibles' },
        { v: '<24h', k: 'respuesta' },
      ],
    },
    projectsHeading: 'Trabajo seleccionado',
    addProject: 'Agregar proyecto',
    socialsHeading: 'Encuéntrame en',
    modal: {
      title: 'Nuevo proyecto',
      title_label: 'Título',
      desc_label: 'Descripción',
      tags_label: 'Tecnologías (separadas por coma)',
      link_label: 'Enlace',
      thumb_label: 'URL de thumbnail (opcional)',
      cancel: 'Cancelar',
      submit: 'Agregar proyecto',
      title_ph: 'ej. Sweepstouch Kiosk',
      desc_ph: 'Qué hace, qué construiste…',
      tags_ph: 'Next.js, Node, MongoDB',
    },
    toasts: { added: 'Proyecto agregado', removed: 'Proyecto eliminado' },
  },
} as const;

export const EXPERIENCE = [
  {
    period: { en: '2025 — Now', es: '2025 — Actual' },
    role: { en: 'Head of IT · Fullstack', es: 'Jefe de IT · Fullstack' },
    company: 'Sweepstouch',
    location: { en: 'Remote', es: 'Remoto' },
    desc: {
      en: 'After leading the platform rebuild, I now own all of Sweepstouch technology — kiosk apps running on thousands of tablets across stores, MMS/SMS opt-in campaign engines, referral systems, BullMQ pipelines, MongoDB at scale, and real-time ops dashboards.',
      es: 'Tras liderar la reconstrucción de la plataforma, ahora dirijo toda la tecnología de Sweepstouch — apps de kiosko en miles de tablets en tiendas, motores de campañas opt-in MMS/SMS, sistemas de referidos, pipelines BullMQ, MongoDB a escala y dashboards de operaciones en tiempo real.',
    },
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'BullMQ', 'AWS S3', 'Twilio', 'Cloudinary'],
    href: 'https://sweepstouch.com',
    links: [],
  },
  {
    period: { en: '2022 — 2024', es: '2022 — 2024' },
    role: { en: 'Frontend Developer', es: 'Frontend Developer' },
    company: 'Banco Ficohsa',
    location: { en: 'SPS, HN', es: 'SPS, HN' },
    desc: {
      en: 'Built a Microfrontends platform powering customer-facing banking products. Led email-marketing initiatives, optimized Core Web Vitals and shipped flows that improved conversion across savings and contact pipelines.',
      es: 'Construí una plataforma de Microfrontends para los productos de cara al cliente del banco. Lideré iniciativas de email marketing, optimicé Core Web Vitals y entregué flujos que mejoraron la conversión en pipelines de ahorro y contactabilidad.',
    },
    tags: ['Next.js', 'React Query', 'TypeScript', 'MUI', 'Tailwind', 'Azure', 'Table Storage', 'Email Marketing'],
    href: 'https://digital.ficohsa.hn/cuenta-ahorro/contactabilidad',
    links: [{ label: 'Cuenta de Ahorro', href: 'https://digital.ficohsa.hn/cuenta-ahorro/contactabilidad' }],
  },
  {
    period: { en: '2021 — 2022', es: '2021 — 2022' },
    role: { en: 'Frontend Developer', es: 'Frontend Developer' },
    company: 'Signscloud',
    location: { en: 'SPS, HN', es: 'SPS, HN' },
    desc: {
      en: 'Built fast React + Vite web apps with TypeScript. Wrote vanilla JS modules for lightweight environments.',
      es: 'Construí web apps rápidas con React + Vite y TypeScript. Escribí módulos en vanilla JS para entornos ligeros.',
    },
    tags: ['React', 'TypeScript', 'Vite', 'Vanilla JS'],
    href: undefined,
    links: [],
  },
];

export const SEED_PROJECTS = [
  {
    id: 'sweepstouch-loyalty',
    title: { en: 'Sweepstouch Loyalty', es: 'Sweepstouch Fidelización' },
    desc: {
      en: 'Customer loyalty & points platform — scan QR, earn points, redeem rewards. Built for scale across hundreds of merchant locations.',
      es: 'Plataforma de puntos y fidelización de clientes — escanea QR, acumula puntos, canjea premios. Diseñada para escalar en cientos de comercios.',
    },
    tags: ['Next.js', 'Node', 'MongoDB', 'Redis'],
    link: 'https://links.sweepstouch.com/?slug=merchant-r-street-lar-azul-55-barueri-sp&sl=SL-ND9WFY',
    initials: 'LY',
  },
  {
    id: 'sweepstouch-optin',
    title: { en: 'MMS/SMS Opt-in', es: 'Opt-in MMS/SMS' },
    desc: {
      en: 'Campaign engine for opt-in MMS/SMS — landing pages per store, tracking, queues, and conversion analytics.',
      es: 'Motor de campañas opt-in MMS/SMS — landings por tienda, tracking, colas y analítica de conversión.',
    },
    tags: ['Node', 'Twilio', 'BullMQ', 'Redis'],
    link: 'https://st.sweepstouch.com/optin?slug=shop-fresh-food-4159-white-plains-rd-bronx-ny-10466-usa',
    initials: 'OP',
  },
  {
    id: 'feria-millon',
    title: { en: 'Feria del Millón', es: 'Feria del Millón' },
    desc: {
      en: 'E-commerce for an art fair — Astro + Node.js microservices, fast static pages, dynamic catalog, payments and tracking.',
      es: 'E-commerce para una feria de arte — Astro + microservicios Node.js, páginas estáticas rápidas, catálogo dinámico, pagos y tracking.',
    },
    tags: ['Astro', 'Node.js', 'Microservices', 'E-commerce'],
    link: 'https://feria-millon.immsai.com/',
    initials: 'FM',
  },
  {
    id: 'ficohsa-contactabilidad',
    title: { en: 'Ficohsa · Cuenta de Ahorro', es: 'Ficohsa · Cuenta de Ahorro' },
    desc: {
      en: 'Customer-facing flow for opening savings accounts at Banco Ficohsa — Microfrontends platform with React Query, MUI and Azure.',
      es: 'Flujo de cliente para abrir cuentas de ahorro en Banco Ficohsa — plataforma de Microfrontends con React Query, MUI y Azure.',
    },
    tags: ['Next.js', 'React Query', 'MUI', 'Azure'],
    link: 'https://digital.ficohsa.hn/cuenta-ahorro/contactabilidad',
    initials: 'FH',
  },
];
