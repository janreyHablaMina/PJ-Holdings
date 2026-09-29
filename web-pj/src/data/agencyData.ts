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
    image: "/projects/drivex-showcase.png",
    imagePosition: "object-center",
    tagline: "Premium sports cars. Flexible rentals. A smarter way to move.",
    overview:
      "A complete car rental ecosystem featuring a sleek customer-facing digital flagship and a powerful administrative dashboard for managing fleet operations and reservations seamlessly.",
    disciplines: ["Full-Stack Platform", "Dashboard Architecture", "System Engineering", "UX/UI Design"],
    metrics: "Full System Deployed",
    statement: "Engineering modern mobility through intuitive design and robust administration.",
    link: "https://drivex-carrental.vercel.app/",
  },
  {
    id: "aurelia-atelier",
    title: "Aurelia Maison",
    client: "Aurelia Haute Horlogerie • Geneva",
    category: "Digital Flagships",
    year: "2025",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85",
    tagline: "A digital sanctuary for high-complication horology",
    overview:
      "A bespoke digital flagship conveying the sensory gravity and mechanical precision of independent Swiss watchmaking. Featuring interactive mechanical deconstructions and private client salons.",
    disciplines: ["Art Direction", "Digital Architecture", "WebGL Craft", "Private E-Commerce"],
    metrics: "100% Private Allocations Reserved",
    statement: "Crafting digital spaces that honor century-old tradition through contemporary restraint.",
  },
  {
    id: "elysian-capital",
    title: "Elysian Private Capital",
    client: "Elysian Group • Mayfair, London",
    category: "Brand Identity",
    year: "2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    tagline: "Identity & investor portal for £1.2B European private fund",
    overview:
      "A comprehensive brand repositioning and digital portal engineered for institutional investors, sovereign wealth partners, and generational family offices.",
    disciplines: ["Brand Strategy", "Editorial Typography", "Bespoke Portal", "Design Systems"],
    metrics: "£1.2B Assets Represented",
    statement: "Translating discreet influence into an enduring visual identity.",
  },
  {
    id: "valkyrie-mobility",
    title: "Valkyrie Spatial Studio",
    client: "Valkyrie Automotive • Milan",
    category: "Spatial Design",
    year: "2025",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    tagline: "Immersive 3D bespoke configurator for limited-series electric grand tourers",
    overview:
      "An understated, gallery-inspired digital configurator enabling collectors worldwide to sculpt bespoke material compositions in real-time ray-traced elegance.",
    disciplines: ["Spatial 3D", "Interactive WebGL", "Material Shaders", "Collector Registry"],
    metrics: "Global Launch Sold Out",
    statement: "Merging automotive sculpture with digital fluidity.",
  },
  {
    id: "arcadia-intelligence",
    title: "Arcadia Systems",
    client: "Arcadia Labs • Zurich",
    category: "Ventures",
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
    tagline: "Autonomous neural decision architectures for institutional intelligence",
    overview:
      "Incubated from concept to Series A, Arcadia provides sovereign computation frameworks and high-contrast telemetry interfaces for global scientific and financial leaders.",
    disciplines: ["Venture Architecture", "Interface Engineering", "Product Design", "Go-To-Market"],
    metrics: "CHF 42M Series A Raised",
    statement: "Pioneering the visual language of intelligent systems.",
  },
  {
    id: "solis-residences",
    title: "Solis Pavilion",
    client: "Solis Developments • Kyoto & Tokyo",
    category: "Spatial Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    tagline: "Architectural monograph and private acquisition experience",
    overview:
      "A serene digital exhibition chronicling an exclusive collection of modernist forest villas designed in collaboration with Pritzker-laureate architects.",
    disciplines: ["Editorial Art Direction", "Spatial Walkthroughs", "Private Inquiry Flow"],
    metrics: "All Residences Acquired",
    statement: "A quiet contemplation of space, light, and architectural harmony.",
  },
  {
    id: "kura-botanics",
    title: "Kura Heritage",
    client: "Kura Botanical Laboratories • Paris",
    category: "Brand Identity",
    year: "2024",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85",
    tagline: "Redefining botanical pharmacology through minimalist luxury",
    overview:
      "Brand identity, bespoke packaging geometry, and global digital presence for a luxury scientific skincare atelier.",
    disciplines: ["Packaging Architecture", "Visual Identity", "E-Commerce", "Content Direction"],
    metrics: "International Debut in 14 Markets",
    statement: "Purity of form celebrating elemental natural science.",
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
