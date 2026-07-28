import type {
  ServiceItem,
  ProjectItem,
  TechItem,
  Testimonial,
  FAQItem,
  IndustryItem,
} from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'website-design',
    title: 'Website Design',
    shortDesc: 'Bespoke, award-worthy UI/UX designed to mesmerize visitors and communicate instant high-end luxury.',
    fullDesc: 'We craft immersive digital visual systems that command authority. From wireframing to high-fidelity interactive prototypes in Figma, every design decision balances aesthetic brilliance with raw conversion engineering.',
    category: 'design',
    icon: 'Palette',
    features: ['High-Fidelity Figma Systems', 'Micro-Interactions & Motion Design', '3D Element Integration', 'Conversion Path Architecture'],
    deliverables: ['Figma Design System', 'Interactive Prototype', 'Design Asset Kit', 'UX Flow Documentation'],
    typicalTimeline: '2-4 Weeks',
    expectedRoi: '+185% Engagement Rate',
    popular: true
  },
  {
    id: 'website-development',
    title: 'Website Development',
    shortDesc: 'Ultra-fast, scalable web engineering built with React, Next.js, and cutting-edge web infrastructure.',
    fullDesc: 'Sub-second load times, 99.99% uptime, pixel-perfect responsiveness, and clean maintainable codebase. We build custom frontends and backends engineered for enterprise scale.',
    category: 'web',
    icon: 'Code2',
    features: ['60 FPS Butter-Smooth Motion', 'Sub-100ms Serverless Architecture', 'Headless CMS Integration', 'Enterprise Security'],
    deliverables: ['Production Codebase', 'API Architecture', 'Deployment Pipelines', 'Code Documentation'],
    typicalTimeline: '3-6 Weeks',
    expectedRoi: '99+ Lighthouse Score'
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Platforms',
    shortDesc: 'High-converting luxury online stores designed to turn passive browsers into loyal brand advocates.',
    fullDesc: 'Custom Shopify Plus, Headless Commerce, and bespoke shopping experiences built with instant checkout, dynamic cart upsells, multi-currency support, and seamless payment gateways.',
    category: 'web',
    icon: 'ShoppingBag',
    features: ['Headless Shopify & Custom Cart', 'Instant Checkout Workflows', 'Subscription & Loyalty Engine', 'Inventory Sync Integrations'],
    deliverables: ['Complete E-Commerce Store', 'Custom Checkout Flow', 'Payment Gateways', 'Store Manager Training'],
    typicalTimeline: '4-8 Weeks',
    expectedRoi: '+210% Checkout Conversion'
  },
  {
    id: 'business-websites',
    title: 'Business Websites',
    shortDesc: 'Corporate flagships that position your enterprise at the pinnacle of your global market.',
    fullDesc: 'We replace outdated corporate portals with high-impact brand hubs that establish authority, generate enterprise leads, and captivate stakeholders worldwide.',
    category: 'web',
    icon: 'Building2',
    features: ['Enterprise Lead Engines', 'Multi-Language Support', 'Role-Based CMS Access', 'Hardened Security Practices'],
    deliverables: ['Enterprise Web Portal', 'Lead Management Setup', 'Content Strategy Matrix', 'Analytics Dashboard'],
    typicalTimeline: '3-5 Weeks',
    expectedRoi: '3.4x Enterprise Inquiries'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    shortDesc: 'Striking visual storytelling that elevates your marketing collaterals across all physical & digital touchpoints.',
    fullDesc: 'From pitch decks that secure multi-million dollar investments to digital ads and editorial key visuals, we ensure every visual artifact exudes elite craft.',
    category: 'design',
    icon: 'Sparkles',
    features: ['Investor Pitch Decks', 'Key Visuals & Ad Assets', 'Editorial & Print Layouts', 'Social Media Design Systems'],
    deliverables: ['Vector Assets Package', 'Deck Templates', 'Ad Creative Library', 'Print-Ready Specs'],
    typicalTimeline: '1-3 Weeks',
    expectedRoi: '+320% SocialCTR'
  },
  {
    id: 'logo-design',
    title: 'Logo Design',
    shortDesc: 'Iconic, timeless brand marks crafted through geometric precision and psychological alignment.',
    fullDesc: 'A logo should be indelible. We create vector logomarks, wordmarks, and responsive brand emblems designed to scale effortlessly from smartwatch screens to billboard towers.',
    category: 'design',
    icon: 'Compass',
    features: ['Geometric Vector Crafting', 'Iconic Monograms', '3D Animated Logomarks', 'Versatile Format Export Matrix'],
    deliverables: ['Master Logo Suite (SVG, EPS, PNG)', 'Brand Icon Set', 'Logo Usage Guidelines', 'Animation Source Files'],
    typicalTimeline: '1-2 Weeks',
    expectedRoi: 'Instant Brand Recognition'
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    shortDesc: 'Comprehensive visual systems that dictate every color, curve, typography pair, and brand signature.',
    fullDesc: 'We engineer complete identity ecosystems: typography hierarchies, custom palette matrices, brand voice guidelines, and component libraries that unify your company across all channels.',
    category: 'design',
    icon: 'Layers',
    features: ['100+ Page Brand Guidelines', 'Typography & Palette Matrix', 'Brand Voice & Messaging Framework', 'Digital & Print Templates'],
    deliverables: ['Brand Guideline Portal', 'Asset Repository', 'Font Suite', 'Template Libraries'],
    typicalTimeline: '3-5 Weeks',
    expectedRoi: 'Unified Corporate Identity',
    popular: true
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Dominant organic search rankings that capture high-intent buyers and drive compound traffic growth.',
    fullDesc: 'Data-backed technical SEO audits, semantic search optimization, high-authority backlink architecture, and programmatic content engineering that put you on Page #1 for high-value keywords.',
    category: 'growth',
    icon: 'Search',
    features: ['Core Web Vitals Optimization', 'Programmatic SEO Scaling', 'Semantic Schema Markup', 'Authority Link Strategy'],
    deliverables: ['SEO Tech Audit', 'Keyword Master Strategy', 'Monthly Ranking Reports', 'Schema Implementation'],
    typicalTimeline: 'Ongoing / 3-6 Mo Sprints',
    expectedRoi: '+410% Organic Search Revenue'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    shortDesc: 'End-to-end multi-channel growth engines designed to capture market share and maximize Customer LTV.',
    fullDesc: 'Strategic digital marketing frameworks combining programmatic acquisition, high-converting funnel design, retargeting matrices, and lifecycle email automation.',
    category: 'growth',
    icon: 'TrendingUp',
    features: ['Full-Funnel Growth Systems', 'Retention & LTV Engineering', 'Multi-Touch Attribution', 'Conversion Rate Optimization (CRO)'],
    deliverables: ['Funnel Architecture', 'Campaign Workflows', 'Attribution Dashboard', 'A/B Test Suite'],
    typicalTimeline: 'Monthly Retainer',
    expectedRoi: '4.2x Blended ROAS'
  },
  {
    id: 'google-ads',
    title: 'Google Ads & PPC',
    shortDesc: 'Precision-targeted paid search and display campaigns engineered for high ROI and immediate qualified leads.',
    fullDesc: 'We build data-driven Google Search, Display, YouTube, and Performance Max campaigns with AI bid modeling, hyper-specific audience segmentation, and high-converting landing pages.',
    category: 'growth',
    icon: 'Target',
    features: ['AI Bid Management', 'Negative Keyword Shielding', 'Custom Conversion Tracking', 'Landing Page Pairing'],
    deliverables: ['Campaign Structure', 'Ad Copy Suite', 'Conversion Pixel Setup', 'Live ROI Dashboard'],
    typicalTimeline: 'Immediate Setup + Monthly',
    expectedRoi: '380% Average PPC ROI'
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    shortDesc: 'Viral visual storytelling and community management that turns casual followers into brand evangelists.',
    fullDesc: 'High-impact video reels, motion graphics, strategic content pillars, creator collaborations, and active community engagement tailored for LinkedIn, X (Twitter), Instagram, and TikTok.',
    category: 'growth',
    icon: 'Share2',
    features: ['Cinematic Motion Content', 'Content Pillar Matrix', 'Influencer Partner Network', 'Community Growth Playbook'],
    deliverables: ['Content Calendar', '30+ Custom Video/Graphic Posts', 'Monthly Growth Reports', 'Community Guidelines'],
    typicalTimeline: 'Monthly Retainer',
    expectedRoi: '+250% Monthly Engagement'
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    shortDesc: 'Relentless data-driven customer acquisition scaling paid campaigns across Meta, TikTok, and Programmatic.',
    fullDesc: 'Aggressive growth tactics backed by machine learning models, dynamic creative optimization (DCO), cohort analytics, and rigorous rapid-fire creative testing.',
    category: 'growth',
    icon: 'Zap',
    features: ['Dynamic Creative Optimization', 'Cohort & LTV Modeling', 'Server-Side CAPI Setup', 'Rapid Ad Testing Sprints'],
    deliverables: ['Meta & TikTok Ad Setup', '50+ Ad Creative Variants', 'Server-Side Analytics', 'Weekly Growth Calls'],
    typicalTimeline: 'Monthly Retainer',
    expectedRoi: '3.8x Campaign Scale'
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    shortDesc: 'Market positioning, competitive moats, and strategic messaging frameworks that unlock category leadership.',
    fullDesc: 'Before designing a single pixel, we dissect your industry, target persona psychology, pricing leverage, and core differentiation to carve an unassailable brand moat.',
    category: 'design',
    icon: 'Target',
    features: ['Category Positioning Framework', 'Audience Persona Mapping', 'Value Proposition Architecture', 'Go-To-Market Playbook'],
    deliverables: ['Strategic Positioning Deck', 'Messaging Matrix', 'Competitor Landscape Analysis', 'Executive Summary'],
    typicalTimeline: '2-3 Weeks',
    expectedRoi: 'Clear Market Monopolization'
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions & Engineering',
    shortDesc: 'Custom AI agents, LLM integrations, automated workflows, and intelligent Web3/AI web applications.',
    fullDesc: 'Harness state-of-the-art AI to automate customer service, generate dynamic hyper-personalized web experiences, synthesize internal knowledge bases, and deploy autonomous workflows.',
    category: 'ai',
    icon: 'Cpu',
    features: ['Custom LLM Fine-Tuning', 'Autonomous AI Workflows', 'Intelligent Chatbots & Assistants', 'Predictive Analytics Engines'],
    deliverables: ['Custom AI API Pipeline', 'AI Assistant Interface', 'Automation System', 'Model Training Documentation'],
    typicalTimeline: '4-8 Weeks',
    expectedRoi: '80% Reduction in Ops Costs',
    popular: true
  }
];

export const PORTFOLIO_DATA: ProjectItem[] = [
  {
    id: 'aether-aero',
    title: 'Aether Autonomous Aerospace',
    client: 'Aether Dynamics',
    category: 'Web App',
    summary: 'Next-generation aerospace command portal with realtime telemetry, 3D drone fleet visualization, and predictive trajectory AI.',
    heroImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop'
    ],
    metrics: [
      { label: 'Series B Capital Raised', value: '$42M' },
      { label: 'User Engagement Boost', value: '+340%' },
      { label: 'Latency Benchmark', value: '14ms' }
    ],
    tags: ['React', 'Three.js', 'Next.js', 'Tailwind', 'WebSockets'],
    year: '2025',
    deliverables: ['3D Web Portal', 'Design System', 'Telemetry Engine', 'Brand Identity'],
    challenge: 'Aether required an ultra-responsive web platform capable of visualizing 10,000+ autonomous flight trajectories simultaneously while maintaining 60 FPS in browser.',
    solution: 'VMAVIX engineered a custom WebGL GPU-accelerated rendering pipeline integrated with serverless WebSocket streaming and dark luxury UI.'
  },
  {
    id: 'chronos-luxury',
    title: 'Chronos Horology Flagship',
    client: 'Chronos Haute Horlogerie',
    category: 'E-Commerce',
    summary: 'Custom headless e-commerce experience for an ultra-luxury Swiss watchmaker featuring 360-degree high-definition watch customizer.',
    heroImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'
    ],
    metrics: [
      { label: 'Average Order Value', value: '$24,500' },
      { label: 'Checkout Conversion', value: '+215%' },
      { label: 'Global Load Speed', value: '0.4s' }
    ],
    tags: ['Shopify Plus', 'React', 'WebGL 3D', 'Stripe Enterprise'],
    year: '2025',
    deliverables: ['Headless Storefront', 'Interactive 3D Configurator', 'VIP Concierge Portal'],
    challenge: 'Replicate the white-glove, exclusive in-store experience of Geneva watch boutiques inside a digital browser window.',
    solution: 'Designed a dark glassmorphic shopping sanctuary with dynamic lighting shaders and 1-click private sales checkout.'
  },
  {
    id: 'nexus-ai',
    title: 'Nexus Neural Platform',
    client: 'Nexus AI Technologies',
    category: 'AI Platform',
    summary: 'Enterprise generative AI suite interface allowing complex multi-modal LLM workflow composition with real-time streaming nodes.',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop'
    ],
    metrics: [
      { label: 'Active Developers', value: '180,000+' },
      { label: 'Monthly API Requests', value: '1.2 Billion' },
      { label: 'Productivity Lift', value: '4.8x' }
    ],
    tags: ['Next.js 15', 'Python API', 'Tailwind', 'AI Workflow Canvas'],
    year: '2025',
    deliverables: ['Web Application', 'Node Graph Canvas', 'API Documentation Portal'],
    challenge: 'Make highly complex tensor models and node graph workflows feel effortless for non-technical enterprise executives.',
    solution: 'Crafted a sleek node graph interface with automatic node snapping, real-time glowing data streams, and dark neon aesthetics.'
  },
  {
    id: 'hyperion-fintech',
    title: 'Hyperion Wealth Operating System',
    client: 'Hyperion Capital',
    category: 'Web App',
    summary: 'Institution-grade private wealth management dashboard tracking $8B+ in assets with predictive algorithmic portfolio insights.',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
    ],
    metrics: [
      { label: 'Assets Under Management', value: '$8.4B' },
      { label: 'User Satisfaction', value: '99.4%' },
      { label: 'Page Speed Index', value: '99/100' }
    ],
    tags: ['React', 'Node.js', 'Chart.js', 'PostgreSQL', 'AWS'],
    year: '2024',
    deliverables: ['Fintech Web App', 'Security Audit', 'Realtime Charting Suite'],
    challenge: 'Transform clunky legacy banking spreadsheets into a high-octane wealth intelligence hub.',
    solution: 'Built a modular floating card dashboard with dark mode glassmorphism, instant search filtering, and biometric authentication.'
  },
  {
    id: 'solaris-electric',
    title: 'Solaris Hypercar Experience',
    client: 'Solaris EV Motors',
    category: 'Branding',
    summary: 'Full identity overhaul and interactive global web launch for an all-electric hypercar generating 2,000 HP.',
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop'
    ],
    metrics: [
      { label: 'Pre-Orders Generated', value: '2,500+' },
      { label: 'Media Impressions', value: '45M+' },
      { label: 'Conversion Rate', value: '12.8%' }
    ],
    tags: ['Brand Identity', '3D Motion', 'Web Development', 'Digital Campaign'],
    year: '2024',
    deliverables: ['Complete Brand Book', 'Global Web Launch', '3D Sound Design', 'PPC Ads System'],
    challenge: 'Establish immediate prestige to compete directly with Bugatti and Rimac in the electric hypercar domain.',
    solution: 'Formulated a futuristic aurora identity with cinematic web scrolling, audio engine simulation, and VIP order reservation system.'
  }
];

export const TECH_STACK: TechItem[] = [
  { id: 'html', name: 'HTML5', category: 'frontend', iconName: 'FileCode', experienceYears: '10+', usageDescription: 'Semantic, accessible DOM structure optimized for web crawlers.', perfScore: 100 },
  { id: 'css', name: 'CSS3 / Tailwind', category: 'frontend', iconName: 'Palette', experienceYears: '10+', usageDescription: 'Custom aurora styling, GPU hardware acceleration, and glassmorphism.', perfScore: 99 },
  { id: 'js', name: 'JavaScript ES6+', category: 'frontend', iconName: 'Code', experienceYears: '10+', usageDescription: 'High-performance asynchronous scripting and dynamic client interfaces.', perfScore: 98 },
  { id: 'react', name: 'React 19', category: 'frontend', iconName: 'Atom', experienceYears: '8+', usageDescription: 'Concurrent rendering, server components, and dynamic UI state.', perfScore: 100 },
  { id: 'next', name: 'Next.js 15', category: 'frontend', iconName: 'Globe', experienceYears: '6+', usageDescription: 'Server-side rendering, ISR, edge caching, and serverless API routes.', perfScore: 99 },
  { id: 'node', name: 'Node.js', category: 'backend', iconName: 'Server', experienceYears: '8+', usageDescription: 'Scalable event-driven backend microservices and REST/GraphQL APIs.', perfScore: 97 },
  { id: 'python', name: 'Python', category: 'backend', iconName: 'Terminal', experienceYears: '7+', usageDescription: 'AI model inference, data pipelines, PyTorch, and FastAPI endpoints.', perfScore: 98 },
  { id: 'php', name: 'PHP 8+', category: 'backend', iconName: 'Layers', experienceYears: '9+', usageDescription: 'Robust enterprise backend architecture and custom CMS integrations.', perfScore: 94 },
  { id: 'laravel', name: 'Laravel', category: 'backend', iconName: 'Box', experienceYears: '7+', usageDescription: 'Elegant MVC backend framework for complex web apps & APIs.', perfScore: 96 },
  { id: 'wordpress', name: 'WordPress', category: 'backend', iconName: 'Layout', experienceYears: '10+', usageDescription: 'Custom headless WP setups and bespoke Gutenberg blocks.', perfScore: 92 },
  { id: 'figma', name: 'Figma', category: 'design', iconName: 'Figma', experienceYears: '8+', usageDescription: 'Ultra-refined design systems, vector auto-layouts, and prototyping.', perfScore: 100 },
  { id: 'aws', name: 'AWS Cloud', category: 'cloud-ai', iconName: 'Cloud', experienceYears: '8+', usageDescription: 'Global S3 CDN, Lambda serverless, CloudFront, and ECS clusters.', perfScore: 99 },
  { id: 'cloud', name: 'Vercel & Cloudflare', category: 'cloud-ai', iconName: 'Zap', experienceYears: '7+', usageDescription: 'Edge network deployment with zero-latency global CDN edge caching.', perfScore: 100 },
  { id: 'ai', name: 'AI & LLMs', category: 'cloud-ai', iconName: 'Cpu', experienceYears: '4+', usageDescription: 'OpenAI GPT-4o, Claude 3.5 Sonnet, LangChain, and custom RAG agents.', perfScore: 98 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "VMAVIX transformed our digital footprint entirely. Our web conversion shot up by 340% within 30 days of launch. They aren't just developers; they are elite brand architects.",
    author: "Elena Rostova",
    role: "Chief Marketing Officer",
    company: "Aether Dynamics Aerospace",
    companyLogo: "AETHER",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    metrics: "+340% Conversion Increase",
    rating: 5,
    featured: true
  },
  {
    id: '2',
    quote: "The visual luxury and speed VMAVIX delivered for our e-commerce platform left our board speechless. We generated over $2.4M in pre-orders in the first 48 hours.",
    author: "Marc Sterling",
    role: "Founder & CEO",
    company: "Chronos Haute Horlogerie",
    companyLogo: "CHRONOS",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    metrics: "$2.4M Sales in 48 Hours",
    rating: 5,
    featured: true
  },
  {
    id: '3',
    quote: "Working with VMAVIX felt like stepping into the future. Their AI integration shaved 80% off our operational overhead while maintaining a 99.8% customer satisfaction score.",
    author: "Dr. Sarah Chen",
    role: "VP of Product",
    company: "Nexus AI Labs",
    companyLogo: "NEXUS AI",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    metrics: "80% Operational Savings",
    rating: 5
  },
  {
    id: '4',
    quote: "If you want a generic template, hire someone else. If you want an award-winning digital flagship that dominates your industry, VMAVIX is the only option on Earth.",
    author: "Julian Vance",
    role: "Managing Partner",
    company: "Hyperion Capital Management",
    companyLogo: "HYPERION",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    metrics: "$8.4B Managed Portfolios",
    rating: 5
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Why choose VMAVIX over a traditional agency or template website?',
    answer: 'Templates constrain you to someone else\'s layout and usually ship with unused code that slows the site down. VMAVIX builds bespoke: every component is written for your brand and your conversion path, tuned for smooth 60 FPS motion and fast load times on real devices.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How long does a typical VMAVIX project take from kick-off to launch?',
    answer: 'A flagship web launch typically takes 3 to 6 weeks depending on scope, 3D assets, and custom backend logic. We work in rapid 1-week sprints with transparent live staging environments so you see real progress every few days.',
    category: 'Process & Timeline'
  },
  {
    id: 'faq-3',
    question: 'Will our website score high on Google PageSpeed / Lighthouse?',
    answer: 'Yes. We build to a 95+ target on mobile and desktop for performance, accessibility, SEO and best practices, and we share the Lighthouse report before launch. Ultra-fast speeds mean higher Google search rankings and dramatically lower bounce rates.',
    category: 'Technology & AI'
  },
  {
    id: 'faq-4',
    question: 'Can VMAVIX integrate custom Artificial Intelligence into our platform?',
    answer: 'Absolutely. We specialize in deploying LLM chat assistants, AI semantic recommendation engines, autonomous lead scoring workflows, and custom generative AI tools directly into modern React/Next.js applications.',
    category: 'Technology & AI'
  },
  {
    id: 'faq-5',
    question: 'What are your payment terms and project contract structures?',
    answer: 'We typically structure engagements with 50% upfront to reserve sprint bandwidth and 50% upon final sign-off prior to deployment. We also offer flexible monthly retainer structures for long-term marketing, development, and SEO growth.',
    category: 'Pricing'
  },
  {
    id: 'faq-6',
    question: 'Do you offer ongoing technical maintenance and marketing after launch?',
    answer: 'Yes! We provide complete post-launch Concierge SLA packages including security updates, continuous SEO ranking sprints, PPC management, and feature enhancements.',
    category: 'Process & Timeline'
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'fintech',
    name: 'Fintech & Wealth',
    tagline: 'High-security financial flagships',
    description: 'Empowering wealth management, crypto protocols, and neo-banks with ultra-secure, institutional-grade digital experiences.',
    impactMetric: '$14B+ Managed Assets',
    icon: 'Landmark',
    featuredProjectTitle: 'Hyperion Capital OS'
  },
  {
    id: 'luxury-retail',
    name: 'Luxury & E-Commerce',
    tagline: 'Haute couture online sanctuaries',
    description: 'Transforming high-end fashion, horology, and jewelry brands into frictionless digital shopping destinations.',
    impactMetric: '+215% Average Order Value',
    icon: 'Gem',
    featuredProjectTitle: 'Chronos Horology'
  },
  {
    id: 'saas-ai',
    name: 'AI & Enterprise SaaS',
    tagline: 'High-converting software portals',
    description: 'Creating sleek product marketing platforms, developer documentation, and complex node-graph application interfaces.',
    impactMetric: '1.2M Active Users',
    icon: 'Cpu',
    featuredProjectTitle: 'Nexus AI Neural'
  },
  {
    id: 'aerospace',
    name: 'Aerospace & Mobility',
    tagline: 'Futuristic telemetry & hardware',
    description: 'Next-generation web applications for autonomous drones, electric vehicles, and aerospace pioneers.',
    impactMetric: '14ms Realtime Telemetry',
    icon: 'Rocket',
    featuredProjectTitle: 'Aether Dynamics'
  },
  {
    id: 'health-biotech',
    name: 'Health & Biotech',
    tagline: 'Cutting-edge medical innovation',
    description: 'Bridging complex clinical trial research and biotech platforms with accessible, high-trust luxury interfaces.',
    impactMetric: '$85M R&D Funding Raised',
    icon: 'Activity',
    featuredProjectTitle: 'AuraGen Genomics'
  },
  {
    id: 'real-estate',
    name: 'Luxury Real Estate',
    tagline: '3D architectural showcases',
    description: 'Virtual 3D property tours, interactive floor plans, and VIP concierge reservation systems for luxury towers.',
    impactMetric: '$450M Properties Sold',
    icon: 'Building',
    featuredProjectTitle: 'The Penthouse Collection'
  }
];

export const STATS_DATA = [
  { value: '14', label: 'Specialist Services', subtext: 'Design, engineering, growth and AI' },
  { value: '95+', label: 'Lighthouse Target', subtext: 'Performance, SEO and best practices' },
  { value: '2-6', label: 'Week Delivery Sprints', subtext: 'Weekly live staging previews' },
  { value: '24/7', label: 'Support Availability', subtext: 'Direct line to your lead engineer' },
];

/**
 * Section ids in DOM order. Single source of truth for the navbar,
 * the footer links and the scroll-spy hook so they can never drift apart.
 */
export const SECTION_IDS = [
  'hero',
  'about',
  'services',
  'why-us',
  'portfolio',
  'tech-stack',
  'industries',
  'testimonials',
  'faq',
] as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Stack', href: '#tech-stack' },
  { label: 'Industries', href: '#industries' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
] as const;

/**
 * The canonical list of scope options used by the enquiry form.
 * SERVICES_DATA.title values map onto these via `serviceToGoal`, which is
 * what makes "Request <service> proposal" pre-tick the right box.
 */
export const PROJECT_GOALS = [
  'Website Design & UI/UX',
  'Website Development',
  'E-Commerce Platform',
  'Business & Enterprise Website',
  'Logo & Graphic Design',
  'Brand Identity & Strategy',
  'SEO & Organic Growth',
  'Digital Marketing & Paid Ads',
  'AI Solutions & Automation',
] as const;

export type ProjectGoal = (typeof PROJECT_GOALS)[number];

/** Maps every service id in SERVICES_DATA to a valid PROJECT_GOALS entry. */
export const SERVICE_ID_TO_GOAL: Record<string, ProjectGoal> = {
  'website-design': 'Website Design & UI/UX',
  'website-development': 'Website Development',
  'e-commerce': 'E-Commerce Platform',
  'business-websites': 'Business & Enterprise Website',
  'graphic-design': 'Logo & Graphic Design',
  'logo-design': 'Logo & Graphic Design',
  'brand-identity': 'Brand Identity & Strategy',
  'brand-strategy': 'Brand Identity & Strategy',
  seo: 'SEO & Organic Growth',
  'digital-marketing': 'Digital Marketing & Paid Ads',
  'google-ads': 'Digital Marketing & Paid Ads',
  'social-media-marketing': 'Digital Marketing & Paid Ads',
  'performance-marketing': 'Digital Marketing & Paid Ads',
  'ai-solutions': 'AI Solutions & Automation',
};

/** Resolves a service id to its enquiry-form goal, safely. */
export function serviceToGoal(serviceId: string): ProjectGoal | undefined {
  return SERVICE_ID_TO_GOAL[serviceId];
}

export const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $30,000',
  '$30,000+',
] as const;

export const TIMELINE_OPTIONS = [
  'ASAP (2-3 Weeks)',
  '1 Month',
  '2-3 Months',
  'Flexible',
] as const;

