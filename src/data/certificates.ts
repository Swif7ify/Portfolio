export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  image: string;
}

export const certificates: Certificate[] = [
  {
    id: 'upou-iesm-2026',
    title: 'Industrial Electronics for Semiconductor Manufacturing (Foundation)',
    issuer: 'University of the Philippines Open University',
    year: '2026',
    credentialUrl: 'https://ascend.upou.edu.ph/mod/simplecertificate/verify.php?code=d785337f-e36f-42be-8da8-852aa772326d',
    image: '/certificates/IESM.png',
  },
  {
    id: 'upou-ism-2026',
    title: 'Introduction to Semiconductor Manufacturing',
    issuer: 'University of the Philippines Open University',
    year: '2026',
    credentialUrl: 'https://ascend.upou.edu.ph/mod/simplecertificate/verify.php?code=541e4f1d-0ef4-4075-b661-073e28a02a81',
    image: '/certificates/ISM.png',
  },
  {
    id: 'upou-smp-2026',
    title: 'Semiconductor Materials Physics (Foundation)',
    issuer: 'University of the Philippines Open University',
    year: '2026',
    credentialUrl: 'https://ascend.upou.edu.ph/mod/simplecertificate/verify.php?code=b9eb498c-5589-4e24-9042-b1a38df92e1e',
    image: '/certificates/SMP.png',
  },
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
