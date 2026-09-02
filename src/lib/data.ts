export interface Project {
  id: string;
  featured: boolean;
  icon: string;
  label: string;
  tag: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  status: 'In Development' | 'Complete' | 'Production Ready';
}

export interface Service {
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface Stat {
  number: string;
  label: string;
}

export interface PortfolioData {
  hero: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    description: string;
  };
  about: {
    heading: string;
    text: string;
    stats: Stat[];
  };
  services: Service[];
  projects: Project[];
  contact: {
    email: string;
    github: string;
    instagram: string;
  };
  testimonials: Testimonial[];
  blog: BlogPost[];
  profileImage: string;
  cv: string;
}

export const defaultData: PortfolioData = {
  hero: {
    tag: 'Software Engineer & Full Stack Developer',
    titleLine1: 'I design',
    titleLine2: 'digital',
    titleLine3: 'experiences',
    description:
      'Crafting modern, user-centered websites that merge visual beauty with functional precision.',
  },
  about: {
    heading: 'A designer who thinks in systems, not just screens.',
    text: "I'm a software engineer passionate about building robust, scalable systems and intuitive digital experiences. My work spans full-stack development, API design, cloud infrastructure, and AI integration — always exploring emerging technologies that solve real-world problems.",
    stats: [
      { number: '3+', label: 'Years Learning' },
      { number: '10+', label: 'Projects Built' },
      { number: '∞', label: 'Curiosity' },
    ],
  },
  services: [
    { title: 'UX / UI Design', description: 'Clear, usable interfaces designed around user goals — from wireframes to polished prototypes.' },
    { title: 'Frontend Development', description: 'Responsive, accessible interfaces built with modern tooling and clean, maintainable code.' },
    { title: 'Branding & Identity', description: 'Consistent visual systems that give brands a distinct, memorable presence across every touchpoint.' },
  ],
  projects: [
    {
      id: 'p1', featured: true, icon: '⚡', label: 'Production Ready', tag: 'Fintech / Full Stack',
      title: 'MOBIBIT-AFRICA',
      description: 'A revolutionary fintech solution bridging mobile money and Bitcoin for financial inclusion across Africa. Deposit via MTN MoMo, Airtel Money & Orange Money — convert fiat to BTC via Lightning Network — spend through a virtual card. Key strength: Blockchain + Mobile Money.',
      tech: ['Python', 'FastAPI', 'React 18', 'PostgreSQL', 'Lightning'], github: 'https://github.com/DalcoveDev/MOBIBIT-AFRICA', demo: '', image: '/images/4N0A9359.JPG', status: 'Production Ready',
    },
    {
      id: 'p2', featured: false, icon: '⚡', label: 'Automation', tag: 'Automation / n8n',
      title: 'EjoFlow',
      description: 'AI chat application integrating n8n workflows with Gmail automation. Features Kinyarwanda language support, automated email processing & extensible workflow system. Key strength: n8n Integration.',
      tech: ['TypeScript', 'Node.js', 'n8n', 'Gmail API'], github: 'https://github.com/DalcoveDev/EjoFlow', demo: '', image: '/images/4N0A9385.JPG', status: 'In Development',
    },
    {
      id: 'p3', featured: false, icon: '🧭', label: 'AI Powered', tag: 'AI / Tourism',
      title: 'WandaWise',
      description: 'Tourism platform empowering tour guides with safe, scalable AI-driven exploration.',
      tech: ['JavaScript', 'AI', 'Tourism'], github: 'https://github.com/DalcoveDev/wandawise', demo: '', image: '/images/4N0A9519.JPG', status: 'In Development',
    },
    {
      id: 'p4', featured: false, icon: '💬', label: 'AI Chat', tag: 'AI / Full Stack',
      title: 'Next.js AI Chatbot',
      description: 'Open-source AI chatbot with multi-LLM support (xAI, OpenAI, Fireworks), NextAuth.js, Vercel Postgres persistence & shadcn/ui. Key strength: Modern Web + AI.',
      tech: ['TypeScript', 'Next.js 14', 'AI SDK', 'NextAuth'], github: 'https://github.com/DalcoveDev/nextjs-ai-chatbot', demo: '', image: '/images/4N0A9548.JPG', status: 'Production Ready',
    },
    {
      id: 'p5', featured: false, icon: '🏛️', label: 'Emergency', tag: 'Backend / Emergency',
      title: 'INKINGI Rescue',
      description: 'Emergency response coordination API connecting citizens, rescuers & authorities in real-time. Enterprise-grade architecture with NestJS. Key strength: Enterprise Architecture.',
      tech: ['TypeScript', 'NestJS', 'PostgreSQL', 'JWT'], github: 'https://github.com/DalcoveDev/INKINGIRESCURE_backend', demo: '', image: '/images/4N0A9732.JPG', status: 'Production Ready',
    },
    {
      id: 'p6', featured: false, icon: '🏛️', label: 'AI Guide', tag: 'AI / Government',
      title: 'GOV Guide AI',
      description: 'AI-powered government services guide with Python ML fundamentals, practical code examples & learning pathways. Key strength: Civic Tech.',
      tech: ['JavaScript', 'Vite', 'Tailwind', 'Python'], github: 'https://github.com/DalcoveDev/GOV_GUIDE-AI', demo: '', image: '/images/4N0A9733.JPG', status: 'In Development',
    },
    {
      id: 'p7', featured: false, icon: '📖', label: 'Wellness', tag: 'Frontend / UX',
      title: 'Bible Guide',
      description: 'Emotion-based Bible verse discovery — find scripture matched to your current feelings and life experiences. Key strength: Design & UX.',
      tech: ['HTML', 'UI/UX', 'Accessibility'], github: 'https://github.com/DalcoveDev/Bible-Guide', demo: '', image: '/images/4N0A9745.JPG', status: 'Complete',
    },
    {
      id: 'p8', featured: false, icon: '🐍', label: 'Educational', tag: 'Python / Education',
      title: 'PYTHON-FOR-AI',
      description: 'Educational resource teaching Python fundamentals for AI and machine learning. Practical code examples & learning pathway structure. Key strength: Teaching Skills.',
      tech: ['Python', 'AI/ML', 'Education'], github: 'https://github.com/DalcoveDev/PYTHON-FOR-AI', demo: '', image: '/images/4N0A9747.JPG', status: 'In Development',
    },
  ],
  blog: [
    {
      id: 'b1',
      title: 'How Mobile Money + Bitcoin Can Transform Africa\'s Financial Future',
      excerpt: 'Exploring how bridging mobile money platforms like MTN MoMo and Airtel Money with Bitcoin via the Lightning Network can bring financial inclusion to millions of unbanked Africans.',
      category: 'Fintech',
      date: 'Aug 15, 2026',
      readTime: '8 min read',
      image: '/images/4N0A9359.JPG',
      tags: ['Bitcoin', 'Lightning Network', 'Mobile Money', 'Africa'],
    },
    {
      id: 'b2',
      title: 'Building AI Chatbots with Multi-LLM Support in Next.js',
      excerpt: 'A deep dive into building production-ready AI chatbots that support multiple language models (xAI, OpenAI, Fireworks) with streaming responses, authentication, and database persistence.',
      category: 'AI',
      date: 'Jul 28, 2026',
      readTime: '12 min read',
      image: '/images/4N0A9548.JPG',
      tags: ['AI', 'Next.js', 'LLM', 'TypeScript'],
    },
    {
      id: 'b3',
      title: 'Why Every Developer Should Learn Python for AI in 2026',
      excerpt: 'Python remains the dominant language for AI and machine learning. Here\'s a practical roadmap for developers looking to add AI skills to their toolkit — from fundamentals to real projects.',
      category: 'AI',
      date: 'Jul 10, 2026',
      readTime: '6 min read',
      image: '/images/4N0A9747.JPG',
      tags: ['Python', 'AI/ML', 'Education', 'Roadmap'],
    },
    {
      id: 'b4',
      title: 'n8n + Gmail: Automating Workflows with AI-Powered Chat',
      excerpt: 'How I built EjoFlow — an AI chat application that integrates n8n workflows with Gmail automation, supporting Kinyarwanda language processing for local users in Rwanda.',
      category: 'Automation',
      date: 'Jun 22, 2026',
      readTime: '10 min read',
      image: '/images/4N0A9385.JPG',
      tags: ['n8n', 'Automation', 'Gmail', 'Kinyarwanda'],
    },
    {
      id: 'b5',
      title: 'Building Emergency Response Systems with NestJS Architecture',
      excerpt: 'Lessons learned building INKINGI Rescue — an enterprise-grade emergency coordination API connecting citizens, rescuers, and authorities in real-time using NestJS and PostgreSQL.',
      category: 'Backend',
      date: 'Jun 5, 2026',
      readTime: '9 min read',
      image: '/images/4N0A9732.JPG',
      tags: ['NestJS', 'PostgreSQL', 'Enterprise', 'Civic Tech'],
    },
    {
      id: 'b6',
      title: 'Lightning Network Explained: Instant Bitcoin Payments for Africa',
      excerpt: 'A beginner-friendly guide to the Lightning Network — how it enables instant, low-cost Bitcoin transactions and why it\'s crucial for financial inclusion across the African continent.',
      category: 'Fintech',
      date: 'May 18, 2026',
      readTime: '7 min read',
      image: '/images/1001028563.jpg',
      tags: ['Bitcoin', 'Lightning', 'Fintech', 'Africa'],
    },
  ],
  testimonials: [
    {
      quote: 'Dalcove delivered an exceptional fintech solution that bridges mobile money and Bitcoin. His understanding of both blockchain technology and African financial systems is remarkable.',
      name: 'Jean-Pierre Habimana',
      role: 'Fintech Entrepreneur',
      avatar: '/images/1001028563.jpg',
    },
    {
      quote: 'Working with Dalcove on our AI tourism platform was a game-changer. He brought fresh ideas and built a system that truly empowers local tour guides.',
      name: 'Claudine Uwimana',
      role: 'Tourism Tech Lead',
      avatar: '/images/1001028575.jpg',
    },
    {
      quote: 'His emergency response API was built with enterprise-grade architecture from day one. Dalcove thinks in systems, not just features — exactly what civic tech needs.',
      name: 'Eric Mugisha',
      role: 'Civic Tech Advocate',
      avatar: '/images/1001028579.jpg',
    },
  ],
  contact: {
    email: 'hello@example.com',
    github: 'https://github.com/DalcoveDev/',
    instagram: 'https://instagram.com/DalcoveDev',
  },
  profileImage: '/images/d2.jpg',
  cv: '/INGABIRE_DALCOVE_Resume_Real_for_all.pdf',
};
