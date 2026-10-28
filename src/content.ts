export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  chips: string[];
  propType: 'consulting' | 'systems' | 'workflows';
}

export interface IndustryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  tag: string;
}

export interface PlanItem {
  tier: 'FREE' | 'PRO' | 'MAX';
  name: string;
  priceLabel: string;
  description: string;
  features: string[];
  ctaLabel: string;
  highlight?: boolean;
}

export interface ContentData {
  studio: {
    name: string;
    founder: string;
    city: string;
    country: string;
    tagline: string;
    phoneFormatted: string;
    phoneRaw: string;
    whatsappNumber: string;
    metaTitle: string;
    metaDescription: string;
  };
  navigation: {
    label: string;
    targetId: string;
  }[];
  hello: {
    microLabel: string;
    headline: [string, string, string];
    subtext: string;
    stats: StatItem[];
    demoCta: string;
    demoNote: string;
    demoItems: {
      input: string[];
      output: string[];
    };
  };
  services: {
    microLabel: string;
    headline: string;
    subtext: string;
    items: ServiceItem[];
  };
  who: {
    microLabel: string;
    headline: string;
    subtext: string;
    turntableLabel: string;
    toggleLabels: {
      manual: string;
      agent: string;
    };
    items: IndustryItem[];
  };
  plans: {
    microLabel: string;
    headline: string;
    subtext: string;
    serviceFilters: { id: string; label: string }[];
    tiersByService: Record<string, PlanItem[]>;
  };
  start: {
    microLabel: string;
    headline: string;
    subtext: string;
    industries: string[];
    placeholders: {
      automationGoal: string;
      name: string;
      phone: string;
    };
    ctaWhatsApp: string;
    ctaCall: string;
    disclaimer: string;
    footerCredit: string;
  };
}

export const content: ContentData = {
  studio: {
    name: "Seven3",
    founder: "Priyam Pachori",
    city: "Jaipur",
    country: "India",
    tagline: "AI Automation Studio",
    phoneFormatted: "+91 82906 44433",
    phoneRaw: "8290644433",
    whatsappNumber: "918290644433",
    metaTitle: "Seven3 | AI automation for Indian businesses",
    metaDescription: "Autonomous business engineering atelier in Jaipur, India. We replace manual busywork with custom AI agents and connected systems.",
  },

  navigation: [
    { label: "HELLO", targetId: "hello" },
    { label: "SERVICES", targetId: "services" },
    { label: "WHO", targetId: "who" },
    { label: "PLANS", targetId: "plans" },
    { label: "START", targetId: "start" },
  ],

  hello: {
    microLabel: "AI AUTOMATION STUDIO · JAIPUR, INDIA",
    headline: ["Busywork", "handed to", "agents."],
    subtext: "Seven3 helps businesses use AI agents to automate daily work: consulting, no-code system connections and custom agentic workflows.",
    stats: [
      { value: 3, suffix: "", label: "services" },
      { value: 5, suffix: "+", label: "industries" },
      { value: 1, suffix: "", label: "studio, Jaipur" },
    ],
    demoCta: "See it work 00:10",
    demoNote: "Demo visualisation",
    demoItems: {
      input: ["Raw WhatsApp Order", "Unsorted Paper Invoice", "Tangled Vendor Email", "Fragmented Lead Notes"],
      output: ["Validated Order Ticket", "Auto-Generated GST Bill", "Automated Instant Reply", "Daily Executive Digest"],
    },
  },

  services: {
    microLabel: "02 WHAT WE DO",
    headline: "Engineered to run your repeat tasks.",
    subtext: "Three distinct intervention layers designed to fit Indian business workflows without disrupting everyday operations.",
    items: [
      {
        id: "consulting",
        number: "01",
        title: "AI Consulting",
        tagline: "Audit & Feasibility Strategy",
        description: "We study how your business runs and show exactly where AI can help it grow.",
        chips: ["Workflow Audit", "ROI Mapping", "Agent Blueprint"],
        propType: "consulting",
      },
      {
        id: "systems",
        number: "02",
        title: "Connect Your Systems",
        tagline: "No-Code & API Bridges",
        description: "We connect your existing ERP, CRM and tools to no-code AI agents (Claude, Gemini) with no rebuild.",
        chips: ["Tally & Busy ERP", "WhatsApp Cloud", "Google Sheets & Zoho"],
        propType: "systems",
      },
      {
        id: "workflows",
        number: "03",
        title: "Custom Agentic Workflows",
        tagline: "Autonomous Execution Chains",
        description: "Purpose-built AI agents and workflows designed around your business.",
        chips: ["Multi-Agent Mesh", "Document Extraction", "Autonomous Follow-ups"],
        propType: "workflows",
      },
    ],
  },

  who: {
    microLabel: "03 WHO IT'S FOR",
    headline: "Built for businesses that run on repeat.",
    subtext: "Every industry carries hours of mechanical friction. Our procedural agents absorb the cognitive overhead.",
    turntableLabel: "TURNTABLE",
    toggleLabels: {
      manual: "Manual (Friction)",
      agent: "With agent (Autonomous)",
    },
    items: [
      {
        id: "manufacturing",
        title: "Manufacturing units",
        subtitle: "Operations & Logistics",
        description: "Order-to-dispatch tracking, inventory updates, supplier follow-ups.",
        metric: "Zero dispatch blindspots",
        tag: "SUPPLY CHAIN",
      },
      {
        id: "fmcg",
        title: "FMCG distributors",
        subtitle: "Distribution & Retailer Network",
        description: "WhatsApp order-taking, stock checks, billing, payment reminders.",
        metric: "Instant catalog orders",
        tag: "DISTRIBUTION",
      },
      {
        id: "legal",
        title: "Legal services & law firms",
        subtitle: "Chambers & Legal Practices",
        description: "Client intake, document collection, hearing-date reminders.",
        metric: "Automated compliance diary",
        tag: "LEGALTECH",
      },
      {
        id: "ca",
        title: "CA firms",
        subtitle: "Audit & Tax Consultancy",
        description: "Client reminders, document collection, notice tracking, reports.",
        metric: "Prompt filing cycles",
        tag: "TAX & AUDIT",
      },
      {
        id: "custom",
        title: "Anyone who wants to automate something",
        subtitle: "Cross-Industry Systems",
        description: "If it repeats, an agent can do it.",
        metric: "Endless automations",
        tag: "UNIVERSAL",
      },
    ],
  },

  plans: {
    microLabel: "04 SERVICE PLANS",
    headline: "Pick a plan.",
    subtext: "Clear engagement models tailored to your operational scale. No long-term lock-in.",
    serviceFilters: [
      { id: "consulting", label: "Consulting" },
      { id: "systems", label: "Connect systems" },
      { id: "workflows", label: "Custom workflows" },
    ],
    tiersByService: {
      consulting: [
        {
          tier: "FREE",
          name: "Audit & Roadmap",
          priceLabel: "Free",
          description: "Intro call and workflow audit checklist to discover low-hanging automation wins.",
          features: [
            "30-min discovery session with Priyam",
            "End-to-end workflow bottleneck audit",
            "Tool stack feasibility review",
            "Actionable agent readiness scorecard",
          ],
          ctaLabel: "Book Free Audit",
        },
        {
          tier: "PRO",
          name: "Applied Architecture",
          priceLabel: "Price shared on contact",
          highlight: true,
          description: "Hands-on monthly work, one live workflow blueprint, updates and ongoing advisory.",
          features: [
            "Complete business systems map",
            "Direct architecture consultation",
            "Tool selection & prompt templates",
            "Bi-weekly refinement calls",
          ],
          ctaLabel: "Get the price",
        },
        {
          tier: "MAX",
          name: "Studio Partnership",
          priceLabel: "Contact me",
          description: "Custom scope, multiple workflows, direct studio priority, and tailored team training.",
          features: [
            "Full operational transformation roadmap",
            "Unlimited department workflow reviews",
            "Leadership automation briefing",
            "Dedicated WhatsApp channel with founder",
          ],
          ctaLabel: "Discuss Scope",
        },
      ],
      systems: [
        {
          tier: "FREE",
          name: "Connector Audit",
          priceLabel: "Free",
          description: "Intro call and API compatibility checklist for your existing business software.",
          features: [
            "ERP & CRM compatibility check",
            "WhatsApp Cloud API readiness guide",
            "Data safety & local storage outline",
            "Step-by-step connection plan",
          ],
          ctaLabel: "Check Compatibility",
        },
        {
          tier: "PRO",
          name: "Production Pipeline",
          priceLabel: "Price shared on contact",
          highlight: true,
          description: "Hands-on monthly work, one live connected system pipeline, updates and fixes.",
          features: [
            "1 production sync bridge deployed",
            "Tally / Busy / CRM bi-directional sync",
            "Automated fallback logging",
            "Zero data loss warranty",
          ],
          ctaLabel: "Get the price",
        },
        {
          tier: "MAX",
          name: "Unified Ecosystem",
          priceLabel: "Contact me",
          description: "Custom scope, multiple system bridges, multi-platform sync, priority support.",
          features: [
            "Multi-system mesh across all branches",
            "High-throughput webhook pipelines",
            "Custom middleware development",
            "24/7 mission-critical monitoring",
          ],
          ctaLabel: "Discuss Scope",
        },
      ],
      workflows: [
        {
          tier: "FREE",
          name: "Workflow Prototype",
          priceLabel: "Free",
          description: "Intro call and workflow audit checklist plus a conceptual agent workflow diagram.",
          features: [
            "45-minute interactive blueprinting",
            "Agent role & guardrail specification",
            "Mock interaction testing script",
            "Implementation difficulty rating",
          ],
          ctaLabel: "Design Prototype",
        },
        {
          tier: "PRO",
          name: "Autonomous Agent",
          priceLabel: "Price shared on contact",
          highlight: true,
          description: "Hands-on monthly work, one live production agent, ongoing prompt updates and fixes.",
          features: [
            "1 bespoke AI agent deployed",
            "Hinglish & Hindi natural language parser",
            "Live ERP / WhatsApp execution",
            "Continuous prompt tuning & accuracy audit",
          ],
          ctaLabel: "Get the price",
        },
        {
          tier: "MAX",
          name: "Multi-Agent Swarm",
          priceLabel: "Contact me",
          description: "Custom scope, multiple coordinated workflows, private LLM fine-tuning, priority support.",
          features: [
            "Multi-agent autonomous department mesh",
            "Custom RAG vector search on your docs",
            "Self-healing error recovery protocols",
            "Direct hotline with Priyam Pachori",
          ],
          ctaLabel: "Discuss Scope",
        },
      ],
    },
  },

  start: {
    microLabel: "05 GET STARTED",
    headline: "Tell us what to automate.",
    subtext: "Share your manual bottleneck. We test feasibility within 24 hours and respond directly on WhatsApp.",
    industries: ["Manufacturing", "FMCG", "Legal", "CA", "Other"],
    placeholders: {
      automationGoal: "e.g., We spend 3 hours daily writing WhatsApp updates and reconciling Tally entries...",
      name: "Your Name / Business Name",
      phone: "Your 10-digit WhatsApp number",
    },
    ctaWhatsApp: "Send on WhatsApp",
    ctaCall: "Call Studio",
    disclaimer: "Your message opens in WhatsApp; nothing is stored on this site.",
    footerCredit: "© Seven3 · Jaipur, India",
  },
};
