import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PortfolioData, ContactMessage } from '../types';

const defaultData: PortfolioData = {
  personalInfo: {
    name: 'Charitha Lakshan Edirimanna',
    title: 'Full-Stack Developer',
    tagline: 'Building elegant solutions to complex problems',
    bio: `I'm a passionate full-stack developer with over 2 years of experience crafting modern web applications. I specialize in React, Node.js, Java Spring Boot, SQL and cloud technologies, with a strong focus on creating performant, accessible, and user-friendly interfaces.

When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, or exploring the latest trends in web development. I believe in continuous learning and pushing the boundaries of what's possible on the web.`,
    shortBio: 'Full-Stack Developer passionate about building elegant web applications with React & Node.js.',
    email: 'charithaedirimanna@gmail.com',
    phone: '+94 76 037 7549',
    location: '103/A, Pahalakoratuwa, Hingurakanda, Katuwana',
    github: 'https://github.com/CharithaLakshan2003',
    linkedin: 'https://www.linkedin.com/in/charitha-lakshan-b661b1305/',
    twitter: 'https://twitter.com/charitha_lakshan',
    website: 'https://charithalakshan.dev',
    avatar: '',
  },
  skills: [
    { id: '1', name: 'React', level: 95, category: 'Frontend' },
    { id: '2', name: 'TypeScript', level: 90, category: 'Languages' },
    { id: '3', name: 'Node.js', level: 85, category: 'Backend' },
    { id: '4', name: 'Java', level: 80, category: 'Languages' },
    { id: '5', name: 'PostgreSQL', level: 78, category: 'Database' },
    { id: '6', name: 'MongoDB', level: 75, category: 'Database' },
    { id: '7', name: 'Docker', level: 70, category: 'DevOps' },
    { id: '8', name: 'AWS', level: 68, category: 'DevOps' },
    { id: '9', name: 'GraphQL', level: 72, category: 'Backend' },
    { id: '10', name: 'Tailwind CSS', level: 92, category: 'Frontend' },
    { id: '11', name: 'Next.js', level: 88, category: 'Frontend' },
    { id: '12', name: 'Git', level: 95, category: 'Tools' },
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and an admin dashboard. Built with React, Node.js, and PostgreSQL.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      imageUrl: '',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/alexjohnson/ecommerce',
      featured: true,
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management tool with real-time updates, Kanban boards, and team collaboration features. Supports multiple workspaces and integrations.',
      technologies: ['React', 'TypeScript', 'GraphQL', 'MongoDB', 'Socket.io'],
      imageUrl: '',
      liveUrl: 'https://taskapp.example.com',
      githubUrl: 'https://github.com/alexjohnson/taskmanager',
      featured: true,
    },
    {
      id: '3',
      title: 'AI Content Generator',
      description: 'An AI-powered content generation tool that helps marketers create blog posts, social media content, and email campaigns using OpenAI API.',
      technologies: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Tailwind'],
      imageUrl: '',
      liveUrl: 'https://aicontent.example.com',
      githubUrl: 'https://github.com/alexjohnson/ai-content',
      featured: true,
    },
    {
      id: '4',
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard with 7-day forecasts, weather maps, and location-based alerts. Features animated weather visualizations.',
      technologies: ['React', 'D3.js', 'Weather API', 'Mapbox'],
      imageUrl: '',
      githubUrl: 'https://github.com/alexjohnson/weather-dashboard',
      featured: false,
    },
    {
      id: '5',
      title: 'Portfolio Website',
      description: 'This very portfolio website! Built with React, TypeScript, and Tailwind CSS. Features an admin panel for content management.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
      imageUrl: '',
      githubUrl: 'https://github.com/alexjohnson/portfolio',
      featured: false,
    },
  ],
  experiences: [
    {
      id: '1',
      type: 'work',
      title: 'Senior Frontend Developer',
      organization: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: 'Leading the frontend development of the company\'s main SaaS platform serving 50,000+ users.',
      achievements: [
        'Reduced page load times by 40% through code splitting and lazy loading',
        'Led migration from class components to React hooks across codebase',
        'Mentored 3 junior developers and established coding standards',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
    },
    {
      id: '2',
      type: 'work',
      title: 'Full-Stack Developer',
      organization: 'StartupXYZ',
      location: 'Remote',
      startDate: '2020-06',
      endDate: '2022-02',
      current: false,
      description: 'Built and maintained multiple client-facing web applications from concept to deployment.',
      achievements: [
        'Developed real-time collaboration features using WebSockets',
        'Designed and implemented RESTful APIs serving 1M+ requests daily',
        'Reduced database query times by 50% through optimization',
        'Built automated testing suite achieving 85% code coverage',
      ],
    },
    {
      id: '3',
      type: 'work',
      title: 'Junior Developer',
      organization: 'Digital Agency',
      location: 'New York, NY',
      startDate: '2019-01',
      endDate: '2020-05',
      current: false,
      description: 'Developed responsive websites and web applications for various clients across different industries.',
      achievements: [
        'Delivered 15+ client projects on time and within budget',
        'Implemented accessibility improvements achieving WCAG 2.1 AA compliance',
        'Collaborated with designers to create pixel-perfect implementations',
      ],
    },
    {
      id: '4',
      type: 'education',
      title: 'Bachelor of Science in Computer Science',
      organization: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2015-08',
      endDate: '2019-05',
      current: false,
      description: 'Graduated with honors. Focused on software engineering, algorithms, and web technologies.',
      achievements: [
        'GPA: 3.8/4.0',
        'Senior project: Distributed cache system',
        'Teaching Assistant for Data Structures course',
        'Member of ACM student chapter',
      ],
    },
  ],
};

interface PortfolioStore {
  data: PortfolioData;
  messages: ContactMessage[];
  updatePersonalInfo: (info: Partial<PortfolioData['personalInfo']>) => void;
  updateSkills: (skills: PortfolioData['skills']) => void;
  addSkill: (skill: PortfolioData['skills'][0]) => void;
  updateSkill: (id: string, skill: Partial<PortfolioData['skills'][0]>) => void;
  deleteSkill: (id: string) => void;
  updateProjects: (projects: PortfolioData['projects']) => void;
  addProject: (project: PortfolioData['projects'][0]) => void;
  updateProject: (id: string, project: Partial<PortfolioData['projects'][0]>) => void;
  deleteProject: (id: string) => void;
  updateExperiences: (experiences: PortfolioData['experiences']) => void;
  addExperience: (experience: PortfolioData['experiences'][0]) => void;
  updateExperience: (id: string, experience: Partial<PortfolioData['experiences'][0]>) => void;
  deleteExperience: (id: string) => void;
  addMessage: (message: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      data: defaultData,
      messages: [],
      

      updatePersonalInfo: (info) =>
        set((state) => ({
          data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } },
        })),

      updateSkills: (skills) => set((state) => ({ data: { ...state.data, skills } })),

      addSkill: (skill) =>
        set((state) => ({ data: { ...state.data, skills: [...state.data.skills, skill] } })),

      updateSkill: (id, skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
          },
        })),

      deleteSkill: (id) =>
        set((state) => ({
          data: { ...state.data, skills: state.data.skills.filter((s) => s.id !== id) },
        })),

      updateProjects: (projects) => set((state) => ({ data: { ...state.data, projects } })),

      addProject: (project) =>
        set((state) => ({ data: { ...state.data, projects: [...state.data.projects, project] } })),

      updateProject: (id, project) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
          },
        })),

      deleteProject: (id) =>
        set((state) => ({
          data: { ...state.data, projects: state.data.projects.filter((p) => p.id !== id) },
        })),

      updateExperiences: (experiences) => set((state) => ({ data: { ...state.data, experiences } })),

      addExperience: (experience) =>
        set((state) => ({
          data: { ...state.data, experiences: [...state.data.experiences, experience] },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          data: {
            ...state.data,
            experiences: state.data.experiences.map((e) => (e.id === id ? { ...e, ...experience } : e)),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experiences: state.data.experiences.filter((e) => e.id !== id),
          },
        })),

      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
              read: false,
            },
          ],
        })),

      markMessageRead: (id) =>
        set((state) => ({
          messages: state.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
        })),

      deleteMessage: (id) =>
        set((state) => ({ messages: state.messages.filter((m) => m.id !== id) })),

      // Admin functionality removed
    }),
    {
      name: 'portfolio-storage',
    }
  )
);
