export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
  image: string;
}

export const certificates: Certificate[] = [
  {
    id: 'techfest-hackathon-2026',
    title: '2nd Runner Up — CCS TechFest Hackathon 2026',
    issuer: 'Team1 Philippines x Gordon College CCS',
    year: '2026',
    credentialUrl: '#',
    image: '/certificates/hackathon.jpg',
  },
  {
    id: 'lablab-ibm-bob',
    title: 'IBM Bob Hackathon — Outstanding Performance',
    issuer: 'lablab.ai (NativelyAI)',
    year: '2026',
    credentialUrl: 'https://lablab.ai',
    image: '/certificates/lablabai.png',
  },
  {
    id: 'cisco-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    year: '2026',
    credentialUrl: '#',
    image: '/certificates/neta3.png',
  },
  {
    id: 'tesda-css-ncii',
    title: 'Computer Systems Servicing NC II',
    issuer: 'TESDA (Republic of the Philippines)',
    year: '2025',
    credentialUrl: '#',
    image: '/certificates/ncii.png',
  },
  {
    id: 'cisco-ccna-switching',
    title: 'CCNA: Switching, Routing & Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    year: '2025',
    credentialUrl: '#',
    image: '/certificates/neta2.png',
  },
  {
    id: 'cisco-ccna-networks',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    year: '2025',
    credentialUrl: '#',
    image: '/certificates/neta1.png',
  },
];
