export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: "Ventures" | "Digital Flagships" | "Brand Identity" | "Spatial Design";
  year: string;
  image: string;
  tagline: string;
  overview: string;
  disciplines: string[];
  metrics: string;
  statement: string;
  link?: string;
  imagePosition?: string;
  modalImage?: string;
}

export interface MonographPrinciple {
  number: string;
  title: string;
  subtitle: string;
  narrative: string[];
  quote: string;
  image: string;
}

export interface ServicePillar {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface CoreMetric {
  value: number;
  label: string;
  context: string;
  prefix?: string;
  suffix?: string;
  minimumIntegerDigits?: number;
}

export const SELECTED_WORKS: ProjectItem[] = [
  {
    id: "siarb-platform",
    title: "Siarb Events & Academy",
    client: "Siarb • Singapore",
    category: "Ventures",
    year: "2025",
    image: "/projects/siarb.jpg",
    imagePosition: "object-top",
    tagline: "A unified digital platform for premium courses and exclusive events.",
    overview:
      "A sophisticated digital ecosystem engineered for knowledge commerce and event curation. Providing a seamless, high-performance interface for course discovery, intelligent ticketing, and exclusive community engagement.",
    disciplines: ["Platform Architecture", "Event Ticketing", "Knowledge Commerce", "UX/UI Design"],
    metrics: "Platform Deployed",
    statement: "Elevating the digital commerce experience for premier education and events.",
    link: "https://siarb.org.sg/",
  },
  {
    id: "ama-medical-systems",
    title: "AMA Medical Solutions",
    client: "AMA • Healthcare Infrastructure",
    category: "Digital Flagships",
    year: "2025",
    image: "/projects/AMA.jpg",
    imagePosition: "object-center",
    tagline: "A robust digital flagship for premium hospital equipment and medical systems.",
    overview:
      "An enterprise-grade e-commerce platform engineered for the healthcare sector. Facilitating the procurement of advanced hospital equipment through a secure, high-performance, and intuitive digital interface.",
    disciplines: ["Enterprise E-Commerce", "Digital Flagship", "UX/UI Design", "Systems Integration"],
    metrics: "Enterprise Platform Deployed",
    statement: "Modernizing healthcare procurement through reliable digital architecture.",
    link: "https://ama.ourlivedemo.net/",
  },
  {
    id: "prime-bioscience",
    title: "Prime Bioscience",
    client: "Prime Bioscience • Life Sciences",
    category: "Brand Identity",
    year: "2025",
    image: "/projects/primebioscience.jpg",
    imagePosition: "object-center",
    tagline: "A cutting-edge digital presence for advanced life sciences and biotechnology.",
    overview:
      "A comprehensive digital platform designed to communicate complex biotechnological innovations. The system provides intuitive navigation, detailed scientific data presentation, and a refined corporate aesthetic.",
    disciplines: ["Digital Flagship", "Biotech Architecture", "UX/UI Design", "Corporate Identity"],
    metrics: "Global Digital Launch",
    statement: "Translating complex biotechnology into clear, impactful digital experiences.",
    link: "https://primebioscience.com/",
  },
  {
    id: "cupidus-beauty",
    title: "Cupidus Beauty",
    client: "Cupidus • Aesthetics & Lash Studio",
    category: "Brand Identity",
    year: "2025",
    image: "/projects/Cupidus.jpg",
    imagePosition: "object-center",
    tagline: "An elegant digital flagship for premium aesthetic and lash services.",
    overview:
      "A visually captivating digital booking experience designed for the beauty industry. Merging high-end editorial aesthetics with a seamless, frictionless appointment reservation system to elevate the client journey.",
    disciplines: ["Digital Flagship", "Brand Identity", "UX/UI Design", "Booking Architecture"],
    metrics: "Digital Studio Launched",
    statement: "Redefining the digital reservation experience for premium aesthetics.",
    link: "https://lash.ourlivedemo.net/",
  },
  {
    id: "triples-platform",
    title: "Triples Platform",
    client: "Triples • Digital Enterprise",
    category: "Ventures",
    year: "2025",
    image: "/projects/triples.jpg",
    imagePosition: "object-center",
    tagline: "A dynamic digital experience engineered for modern engagement.",
    overview:
      "A sophisticated and highly interactive web platform built to handle robust user engagement. Engineered with performance and scalability in mind, it delivers a seamless experience across all touchpoints.",
    disciplines: ["Digital Flagship", "UX/UI Design", "Systems Engineering", "Brand Identity"],
    metrics: "Global Platform Launched",
    statement: "Fusing bold aesthetics with high-performance digital architecture.",
    link: "https://triples.ourlivedemo.net/",
  },
  {
    id: "neo-leader-crane",
    title: "Neo Leader Crane",
    client: "Neo Leader Crane • Heavy Machinery",
    category: "Digital Flagships",
    year: "2025",
    image: "/projects/neoleadercrane.jpg",
    imagePosition: "object-center",
    tagline: "A robust digital presence for industrial lifting solutions.",
    overview: "A comprehensive corporate platform for heavy machinery and crane services. Engineered to showcase an extensive fleet and technical specifications with industrial precision.",
    disciplines: ["Corporate Website", "Industrial Design", "Technical Catalog"],
    metrics: "Industrial Fleet Platform",
    statement: "Translating heavy industrial capabilities into a precise digital catalog.",
    link: "https://neoleadercrane.com/",
  },
  {
    id: "eden-grace-maids",
    title: "Eden Grace",
    client: "Eden Grace • Domestic Staffing",
    category: "Digital Flagships",
    year: "2025",
    image: "/projects/edengracemaids.jpg",
    imagePosition: "object-center",
    tagline: "A welcoming digital experience for premium domestic staffing.",
    overview: "A user-centric portal connecting families with trusted domestic professionals. Designed with warmth, accessibility, and clear communication in mind.",
    disciplines: ["Service Platform", "UX/UI Design", "Brand Identity"],
    metrics: "Staffing Portal Deployed",
    statement: "Fostering trust and connection through accessible digital design.",
    link: "https://www.edengracemaids.com/",
  },
  {
    id: "aver-asia",
    title: "Aver Asia",
    client: "Aver Asia • Equipment Solutions",
    category: "Digital Flagships",
    year: "2025",
    image: "/projects/averasia.jpg",
    imagePosition: "object-center",
    tagline: "An enterprise-grade platform for regional equipment rental and sales.",
    overview: "A high-performance digital catalog and service portal serving the Southeast Asian industrial sector. Built to streamline equipment discovery and corporate inquiries.",
    disciplines: ["Enterprise Platform", "Catalog Architecture", "UX/UI Design"],
    metrics: "Regional Platform Launched",
    statement: "Streamlining industrial procurement across Southeast Asia.",
    link: "https://averasia.com/",
  },
  {
    id: "sha-startup",
    title: "SHA Startup",
    client: "SHA • Startup Ecosystem",
    category: "Ventures",
    year: "2025",
    image: "/projects/shastartup.jpg",
    imagePosition: "object-center",
    tagline: "A dynamic digital hub for startup innovation and collaboration.",
    overview: "An engaging platform built to foster community, highlight innovation, and connect early-stage ventures with critical resources and networks.",
    disciplines: ["Community Platform", "Brand Identity", "Web Experience"],
    metrics: "Innovation Hub Deployed",
    statement: "Empowering the next generation of founders through a unified digital ecosystem.",
    link: "https://shastartup.com/",
  },
  {
    id: "moove-media",
    title: "Moove Media",
    client: "Moove Media • OOH Advertising",
    category: "Digital Flagships",
    year: "2025",
    image: "/projects/moovemedia.jpg",
    imagePosition: "object-center",
    tagline: "A vibrant showcase for Southeast Asia's leading out-of-home media network.",
    overview: "A bold, visually-driven corporate platform highlighting expansive advertising formats and high-impact campaigns across regional transit networks.",
    disciplines: ["Digital Showcase", "Media Architecture", "Interactive Web"],
    metrics: "Media Network Live",
    statement: "Amplifying physical advertising scale through striking digital presence.",
    link: "https://www.moovemedia.com.sg/",
  },
  {
    id: "redefine-digital",
    title: "Redefine",
    client: "Redefine • Creative Agency",
    category: "Brand Identity",
    year: "2025",
    image: "/projects/redefine.jpg",
    imagePosition: "object-center",
    tagline: "A cutting-edge agency portfolio that pushes creative boundaries.",
    overview: "A highly immersive and interactive digital environment engineered to showcase creative case studies and forward-thinking design narratives.",
    disciplines: ["Creative Portfolio", "Web Motion", "Brand Strategy"],
    metrics: "Agency Platform Live",
    statement: "Redefining creative storytelling through fluid interactive web design.",
    link: "https://staging32.redefine.ourliveserver.net/",
  },
  {
    id: "demo-squad",
    title: "Demo Squad",
    client: "Demo Squad • Demolition Services",
    category: "Digital Flagships",
    year: "2025",
    image: "/projects/demosquad.jpg",
    imagePosition: "object-center",
    tagline: "A powerful corporate presence for professional dismantling and demolition.",
    overview: "A streamlined, authoritative digital presence for a specialized industrial service provider, engineered to communicate safety, expertise, and operational scale.",
    disciplines: ["Corporate Identity", "Industrial Platform", "UX Design"],
    metrics: "Service Platform Deployed",
    statement: "Building authority in the industrial sector through robust digital design.",
    link: "https://demosquad.sg/",
  },
  {
    id: "teachify-ai-lms",
    title: "Teachify AI",
    client: "Teachify • EdTech Solutions",
    category: "Ventures",
    year: "2025",
    image: "/projects/teachify1611.jpg",
    imagePosition: "object-center",
    tagline: "Teach less admin. Inspire more. AI-powered LMS for schools.",
    overview:
      "A next-generation Learning Management System engineered for modern educators and institutions. Features intelligent automated lesson planning, AI grading sheets, and intuitive administrative tools to eliminate paperwork.",
    disciplines: ["AI Integration", "LMS Architecture", "EdTech Platform", "UX/UI Design"],
    metrics: "AI Classroom Engine Deployed",
    statement: "Empowering educators through intelligent automation and human-centric design.",
    link: "https://teachify-web-ai.vercel.app/",
    modalImage: "/projects/teachify169.jpg",
  },
  {
    id: "drivex-car-rental",
    title: "DriveX Car Rental",
    client: "DriveX • Global Mobility",
    category: "Ventures",
    year: "2024",
    image: "/projects/DriveX1611.jpg",
    imagePosition: "object-center",
    tagline: "Premium sports cars. Flexible rentals. A smarter way to move.",
    overview:
      "A complete car rental ecosystem featuring a sleek customer-facing digital flagship and a powerful administrative dashboard for managing fleet operations and reservations seamlessly.",
    disciplines: ["Full-Stack Platform", "Dashboard Architecture", "System Engineering", "UX/UI Design"],
    metrics: "Full System Deployed",
    statement: "Engineering modern mobility through intuitive design and robust administration.",
    link: "https://drivex-carrental.vercel.app/",
  },

];

export const MONOGRAPH_PRINCIPLES: MonographPrinciple[] = [
  {
    number: "01",
    title: "The Architecture of Restraint",
    subtitle: "True luxury is the quiet elimination of the unessential.",
    narrative: [
      "In an era obsessed with digital noise, loud gimmicks, and ephemeral trends, PJ Holdings champions purposeful restraint. We believe that lasting resonance is achieved not by shouting, but by the quiet authority of flawless proportion, editorial typography, and intentional space.",
      "Every project we undertake is treated as an architectural commission: built with structural integrity, timeless visual gravity, and an uncompromising dedication to detail that will endure a decade, not just a season.",
    ],
    quote: "Simplicity is not the absence of clutter; it is the presence of clarity and purpose.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    title: "Venture & Artistic Craft",
    subtitle: "Uniting commercial acumen with uncompromising aesthetics.",
    narrative: [
      "We operate beyond the superficial confines of traditional agencies. As a holding and creative enterprise, we view every digital artifact through the dual lens of cultural impact and enterprise valuation.",
      "Our partners do not come to us for generic templates; they seek an unfair strategic advantage—a digital presence so definitive that it immediately establishes category leadership and commands sovereign prestige.",
    ],
    quote: "Exceptional design is not decoration; it is the physical manifestation of high standards.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    title: "Sculptural Technology",
    subtitle: "Interactive 3D as art rather than distraction.",
    narrative: [
      "We harness WebGL, real-time spatial computing, and modern web frameworks not to perform tricks, but to evoke genuine tactile presence. When light catches a bevel, when a form rotates with weighted inertia, the digital medium transcends screens and touches emotion.",
      "By engineering bespoke rendering pipelines with absolute precision, we deliver silky, cinematic fluidity that honors the viewer's intellect and time.",
    ],
    quote: "When technology is perfected, it ceases to feel like technology—it becomes atmosphere.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
  },
];

export const CAPABILITIES: ServicePillar[] = [
  {
    number: "I",
    title: "Venture Architecture & Product Incubation",
    description:
      "We co-found, invest in, and architect select digital enterprises from foundational thesis to category leadership.",
    deliverables: [
      "Product Strategy & Market Positioning",
      "Full-Stack Web Platforms (Next.js / TypeScript)",
      "High-Scale Cloud & Sovereign Systems",
      "Executive & Investor Narration",
    ],
  },
  {
    number: "II",
    title: "Brand Identity & Editorial Direction",
    description:
      "Sculpting iconic visual languages for institutions, luxury houses, and ambitious venture creators.",
    deliverables: [
      "Bespoke Typography & Monograms",
      "Design Systems & Brand Manuals",
      "Art Direction & Campaign Strategy",
      "Packaging & Physical Touchpoints",
    ],
  },
  {
    number: "III",
    title: "Spatial & Interactive 3D Environments",
    description:
      "Museum-grade 3D web experiences and tactile configurators engineered with cinematic lighting.",
    deliverables: [
      "Custom WebGL & Three.js Architecture",
      "High-Fidelity 3D Product Customizers",
      "Interactive Exhibitions & Pavilions",
      "Hardware-Accelerated Fluid Motion",
    ],
  },
  {
    number: "IV",
    title: "Digital Flagships & Private Portals",
    description:
      "Ultra-private web experiences, collector salons, and high-performance digital commerce.",
    deliverables: [
      "Exclusive Collector Interfaces",
      "Bespoke E-Commerce Systems",
      "Investor & LP Sovereign Portals",
      "Sub-Second Performance Optimization",
    ],
  },
];

export const ENDORSEMENTS = [
  {
    quote:
      "PJ Holdings brought an unprecedented level of dignity and architectural precision to our global identity. They are one of the exceedingly rare groups that truly understand high-end luxury.",
    author: "Henri de Saint-Germain",
    role: "President & Artistic Director",
    institution: "Aurelia Haute Horlogerie, Geneva",
  },
  {
    quote:
      "In private capital, credibility is sovereign. PJ Holdings created an understated digital presence that quietly communicated the depth and discipline of our institution.",
    author: "Arthur Sterling",
    role: "Senior Managing Partner",
    institution: "Elysian Private Capital, London",
  },
  {
    quote:
      "Working with PJ Holdings felt less like hiring a vendor and more like collaborating with master architects. The attention to detail and restraint is extraordinary.",
    author: "Matteo Casiraghi",
    role: "Founding Partner",
    institution: "Valkyrie Motors, Milan",
  },
];

export const CORE_METRICS: CoreMetric[] = [
  {
    value: 580,
    prefix: "₱",
    suffix: "M+",
    label: "Venture Valuation Created",
    context: "Across active portfolio & client holdings",
  },
  {
    value: 8,
    minimumIntegerDigits: 2,
    label: "Annual Client Commissions",
    context: "Strictly limited to ensure uncompromising craft",
  },
  {
    value: 100,
    suffix: "%",
    label: "Senior Leadership Involvement",
    context: "Zero delegation to junior external teams",
  },
  {
    value: 12,
    suffix: "+",
    label: "Years of Collective Mastery",
    context: "Spanning London, Zurich, Milan & Tokyo",
  },
];
