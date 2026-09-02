import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST() {
  try {
    // Create portfolio_data table
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_data (
        id SERIAL PRIMARY KEY,
        key VARCHAR(50) UNIQUE NOT NULL,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Insert default data if not exists
    const exists = await sql`SELECT COUNT(*) as count FROM portfolio_data WHERE key = 'portfolio'` as { count: string }[];
    
    if (exists[0].count === '0') {
      const defaultData = {
        hero: {
          tag: 'Web Designer & Frontend Developer',
          titleLine1: 'I design',
          titleLine2: 'digital',
          titleLine3: 'experiences',
          description: 'Crafting modern, user-centered websites that merge visual beauty with functional precision.',
        },
        about: {
          heading: 'A designer who thinks in systems, not just screens.',
          text: "Currently pursuing my university studies, I'm passionate about building digital experiences that feel intuitive and alive. My work spans UI/UX design, frontend development, and continuous exploration of emerging technologies that solve real-world problems.",
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
            description: 'A revolutionary fintech solution bridging mobile money and Bitcoin for financial inclusion across Africa.',
            tech: ['Python', 'FastAPI', 'React 18', 'PostgreSQL', 'Lightning'],
            github: 'https://github.com/DalcoveDev/MOBIBIT-AFRICA', demo: '',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
            status: 'Production Ready',
          },
          {
            id: 'p2', featured: false, icon: '⚡', label: 'Automation', tag: 'Automation / n8n',
            title: 'EjoFlow',
            description: 'AI chat application integrating n8n workflows with Gmail automation.',
            tech: ['TypeScript', 'Node.js', 'n8n', 'Gmail API'],
            github: 'https://github.com/DalcoveDev/EjoFlow', demo: '',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
            status: 'In Development',
          },
          {
            id: 'p3', featured: false, icon: '🧭', label: 'AI Powered', tag: 'AI / Tourism',
            title: 'WandaWise',
            description: 'Tourism platform empowering tour guides with safe, scalable AI-driven exploration.',
            tech: ['JavaScript', 'AI', 'Tourism'],
            github: 'https://github.com/DalcoveDev/wandawise', demo: '',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop',
            status: 'In Development',
          },
          {
            id: 'p4', featured: false, icon: '💬', label: 'AI Chat', tag: 'AI / Full Stack',
            title: 'Next.js AI Chatbot',
            description: 'Open-source AI chatbot with multi-LLM support.',
            tech: ['TypeScript', 'Next.js 14', 'AI SDK', 'NextAuth'],
            github: 'https://github.com/DalcoveDev/nextjs-ai-chatbot', demo: '',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
            status: 'Production Ready',
          },
          {
            id: 'p5', featured: false, icon: '🏛️', label: 'Emergency', tag: 'Backend / Emergency',
            title: 'INKINGI Rescue',
            description: 'Emergency response coordination API connecting citizens, rescuers & authorities.',
            tech: ['TypeScript', 'NestJS', 'PostgreSQL', 'JWT'],
            github: 'https://github.com/DalcoveDev/INKINGIRESCURE_backend', demo: '',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop',
            status: 'Production Ready',
          },
          {
            id: 'p6', featured: false, icon: '🏛️', label: 'AI Guide', tag: 'AI / Government',
            title: 'GOV Guide AI',
            description: 'AI-powered government services guide with Python ML fundamentals.',
            tech: ['JavaScript', 'Vite', 'Tailwind', 'Python'],
            github: 'https://github.com/DalcoveDev/GOV_GUIDE-AI', demo: '',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop',
            status: 'In Development',
          },
          {
            id: 'p7', featured: false, icon: '📖', label: 'Wellness', tag: 'Frontend / UX',
            title: 'Bible Guide',
            description: 'Emotion-based Bible verse discovery.',
            tech: ['HTML', 'UI/UX', 'Accessibility'],
            github: 'https://github.com/DalcoveDev/Bible-Guide', demo: '',
            image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=500&fit=crop',
            status: 'Complete',
          },
          {
            id: 'p8', featured: false, icon: '🐍', label: 'Educational', tag: 'Python / Education',
            title: 'PYTHON-FOR-AI',
            description: 'Educational resource teaching Python fundamentals for AI and machine learning.',
            tech: ['Python', 'AI/ML', 'Education'],
            github: 'https://github.com/DalcoveDev/PYTHON-FOR-AI', demo: '',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop',
            status: 'In Development',
          },
        ],
        contact: {
          email: 'hello@example.com',
          github: 'https://github.com/DalcoveDev/',
          instagram: 'https://instagram.com/DalcoveDev',
        },
      };

      await sql`INSERT INTO portfolio_data (key, data) VALUES ('portfolio', ${JSON.stringify(defaultData)}::jsonb)`;
    }

    return NextResponse.json({ success: true, message: 'Database initialized!' });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
