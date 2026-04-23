import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PortfolioData, ContactMessage } from '../types';

const defaultData: PortfolioData = {
  personalInfo: {
    name: 'Charitha Lakshan Edirimanna',
    title: 'Full-Stack Developer',
    tagline: 'Building elegant solutions to complex problems',
    bio: `I'm a Computer Science undergraduate at the University of Colombo School of Computing (UCSC), passionate about transforming ideas into elegant digital solutions. I specialize in modern web technologies and love building applications that make a difference. I specialize in React, Next.js, Java Spring Boot, SQL and cloud technologies, with a strong focus on creating performant, accessible, and user-friendly interfaces.`,
    shortBio: 'Full-Stack Developer passionate about building elegant web applications with React, Next.js, Java Spring Boot, SQL and cloud technologies.',
    email: 'charithaedirimanna@gmail.com',
    phone: '+94 76 037 7549',
    location: '103/A, Pahalakoratuwa, Hingurakanda, Katuwana',
    github: 'https://github.com/CharithaLakshan2003',
    linkedin: 'https://www.linkedin.com/in/charitha-lakshan-b661b1305/',
    facebook: 'https://www.facebook.com/charitha.lakshan.528',
    instagram: 'https://www.instagram.com/charitha_edirimanna?igsh=aHg4bnBmZzhmNmc1',
    website: 'https://charithalakshan.dev',
      university: 'University of Colombo School of Computing (UCSC)',
    avatar: '/avatar.jpg',
  },
  skills: [
    { id: '1', name: 'React', level: 95, category: 'Frontend' },
    { id: '2', name: 'TypeScript', level: 90, category: 'Languages' },
    { id: '3', name: 'Next.js', level: 85, category: 'Frontend/Backend' },
    { id: '4', name: 'Java', level: 80, category: 'Languages' },
    { id: '5', name: 'Spring Boot', level: 88, category: 'Backend' },
    { id: '6', name: 'PostgreSQL', level: 78, category: 'Database' },
    { id: '7', name: 'MongoDB', level: 75, category: 'Database' },
    { id: '8', name: 'Docker', level: 70, category: 'DevOps' },
    { id: '9', name: 'AWS', level: 68, category: 'DevOps' },
    { id: '10', name: 'GraphQL', level: 72, category: 'Backend' },
    { id: '11', name: 'Tailwind CSS', level: 92, category: 'Frontend' },
    { id: '12', name: 'Git', level: 95, category: 'Tools' }
  ],
  projects: [
    {
      id: '1',
      title: 'swiftlogistics E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management, and an admin dashboard. Built with FastAPI, Uvicorn, RabbitMQ, Pika, SQLite, PyJWT, Docker, WebSockets and HTML/CSS/JS. ',
      technologies: ['FastAPI', 'Uvicorn', 'RabbitMQ', 'Pika', 'SQLite', 'PyJWT', 'Docker', 'WebSockets', 'HTML', 'CSS', 'JS'],
      imageUrl: './Swiftlogistics.png',
      liveUrl: '',
      githubUrl: 'https://github.com/CharithaLakshan2003/swiftlogistics-middleware-platform.git',
      featured: true,
    },
    {
      id: '2',
      title: 'Cricket Club Management System',
      description: 'A web application for managing cricket clubs, including player profiles, match scheduling, and performance analytics. Built with HTML, CSS, JavaScript, PHP and mySQL.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'mySQL'],
      imageUrl: './CricCompiler.png',
      liveUrl: '',
      githubUrl: 'https://github.com/CharithaLakshan2003/CricCompiler-2nd-year-project.git',
      featured: true,
    },
  ],
  experiences: [
    // {
    //   id: '1',
    //   type: 'work',
    //   title: 'Senior Frontend Developer',
    //   organization: 'TechCorp Inc.',
    //   location: 'San Francisco, CA',
    //   startDate: '2022-03',
    //   endDate: '',
    //   current: true,
    //   description: 'Leading the frontend development of the company\'s main SaaS platform serving 50,000+ users.',
    //   achievements: [
    //     'Reduced page load times by 40% through code splitting and lazy loading',
    //     'Led migration from class components to React hooks across codebase',
    //     'Mentored 3 junior developers and established coding standards',
    //     'Implemented CI/CD pipeline reducing deployment time by 60%',
    //   ],
    // },
    // {
    //   id: '2',
    //   type: 'work',
    //   title: 'Full-Stack Developer',
    //   organization: 'StartupXYZ',
    //   location: 'Remote',
    //   startDate: '2020-06',
    //   endDate: '2022-02',
    //   current: false,
    //   description: 'Built and maintained multiple client-facing web applications from concept to deployment.',
    //   achievements: [
    //     'Developed real-time collaboration features using WebSockets',
    //     'Designed and implemented RESTful APIs serving 1M+ requests daily',
    //     'Reduced database query times by 50% through optimization',
    //     'Built automated testing suite achieving 85% code coverage',
    //   ],
    // },
    // {
    //   id: '3',
    //   type: 'work',
    //   title: 'Junior Developer',
    //   organization: 'Digital Agency',
    //   location: 'New York, NY',
    //   startDate: '2019-01',
    //   endDate: '2020-05',
    //   current: false,
    //   description: 'Developed responsive websites and web applications for various clients across different industries.',
    //   achievements: [
    //     'Delivered 15+ client projects on time and within budget',
    //     'Implemented accessibility improvements achieving WCAG 2.1 AA compliance',
    //     'Collaborated with designers to create pixel-perfect implementations',
    //   ],
    // },
    {
      id: '4',
      type: 'education',
      title: 'Bachelor of Science in Computer Science',
      organization: 'University of Colombo School of Computing',
      location: 'Colombo 07, Sri Lanka',
      startDate: '2024-05',
      endDate: '2027-05',
      current: false,
      description: 'Focused on software engineering, algorithms, and web technologies.',
      achievements: [
        'GPA: 3.0/4.0',
        'Senior project: Distributed cache system',
        'Member of ISACA student chapter',
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
    (set) => ({
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
