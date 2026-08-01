export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: "web" | "design" | "growth" | "ai";
  icon: string;
  features: string[];
  deliverables: string[];
  typicalTimeline: string;
  expectedRoi: string;
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: "Web App" | "E-Commerce" | "Branding" | "AI Platform" | "Mobile";
  summary: string;
  heroImage: string;
  gallery: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  year: string;
  deliverables: string[];
  liveUrl?: string;
  challenge: string;
  solution: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "design" | "cloud-ai";
  iconName: string;
  experienceYears: string;
  usageDescription: string;
  perfScore: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  /** Headline result, e.g. "+340% Conversion Increase". */
  highlight: string;
  /** Defaults to 5 in the UI when omitted. */
  rating?: number;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Process & Timeline" | "Pricing" | "Technology & AI";
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  impactMetric: string;
  icon: string;
  featuredProjectTitle: string;
}
