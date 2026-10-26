export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectCategory =
  | 'All'
  | 'Developer Tool & CLI'
  | 'Fullstack & Mobile'
  | 'Hardware & IoT'
  | 'Robotics & Simulation'
  | 'Game Development'
  | 'Libraries & Packages'
  | 'Web Application';

export type Project = {
  id: string;
  title: string;
  client?: string;
  year: string;
  category: ProjectCategory;
  discipline: string;
  role: string;
  summary: string;
  description?: string;
  tags: string[];
  stack: string[];
  image: string;
  imageAlt?: string;
  metrics: ProjectMetric[];
  challenge?: string;
  approach?: string;
  outcome?: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type ArchiveProject = {
  id: string;
  title: string;
  client?: string;
  year: string;
  category: ProjectCategory;
  discipline: string;
  summary: string;
  tags: string[];
  image: string;
  imageAlt?: string;
  href?: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  year: string;
  credentialId: string;
  href: string;
  credentialUrl?: string;
  image: string;
  skills: string[];
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  location: string;
};

export type RecognitionItem = {
  title: string;
  detail: string;
  year: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  deliverables: string[];
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export type NavLink = {
  id: string;
  label: string;
};

export type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
};
