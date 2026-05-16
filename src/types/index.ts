
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  shortBio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  facebook?: string;
  instagram?: string;
  website: string;
  university?: string;
  avatar: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Volunteering {
  id: string;
  clubName: string;
  role: string;
  description: string;
  logo?: string;        // URL to club logo image
  logoFallback?: string; // 1-2 letter initials fallback
  color?: string;       // accent colour for the card
  startDate: string;
  endDate?: string;
  current: boolean;
  link?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  volunteering: Volunteering[];
  gallery: GalleryImage[];
}
