export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
}

export const certificates: Certificate[] = [
  {
    id: 'meta-frontend',
    title: 'Front-End Developer Professional',
    issuer: 'Meta',
    year: '2025',
    credentialUrl: 'https://coursera.org/verify/example-meta',
  },
  {
    id: 'gcp-ux',
    title: 'UX Design Professional Certificate',
    issuer: 'Google',
    year: '2024',
    credentialUrl: 'https://coursera.org/verify/example-google',
  },
  {
    id: 'aws-dev',
    title: 'Certified Developer — Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
    credentialUrl: 'https://aws.amazon.com/verification/example',
  },
  {
    id: 'awwwards-motion',
    title: 'Motion Design for the Web',
    issuer: 'Awwwards Academy',
    year: '2023',
    credentialUrl: 'https://awwwards.com/academy/certificate/example',
  },
  {
    id: 'fcc-algos',
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    year: '2022',
    credentialUrl: 'https://freecodecamp.org/certification/example',
  },
];
