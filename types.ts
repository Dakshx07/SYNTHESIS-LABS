export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  link?: string;
  github?: string;
  description?: string;
  tags?: string[];
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: any; 
}

export interface TechItem {
  name: string;
  description: string;
}