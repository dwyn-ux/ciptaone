export type Project = {
  index: string;
  category: string;
  year: string;
  title: string[];
  description: string;
  stack: string;
  href: string;
  asset: string;
  alt: string;
  paper: string;
};

export const projects: Project[] = [
  {
    index: '01',
    category: 'Mobile',
    year: '2026',
    title: ['BE', 'SCHEDULE'],
    description:
      'Automatic school scheduling system designed around teachers, subjects, constraints and the messy reality of school timetables.',
    stack: 'Flutter / Algorithm',
    href: '#',
    asset: '/assets/project-schedule.svg',
    alt: 'BE Schedule interface visual — a constraint-based timetable grid.',
    paper: '#e9e6de'
  },
  {
    index: '02',
    category: 'Mobile',
    year: '2026',
    title: ['BE', 'PRESENT'],
    description:
      'Attendance workflow connecting barcode scanning, photo verification and parent notifications into one focused experience.',
    stack: 'Flutter / API',
    href: '#',
    asset: '/assets/project-attendance.svg',
    alt: 'BE Present interface visual — a circular scan confirmation mark.',
    paper: '#d7d3ca'
  },
  {
    index: '03',
    category: 'Web',
    year: '2026',
    title: ['CIPTA', 'ONE'],
    description:
      'A digital studio identity for building mobile applications, websites and security-focused solutions.',
    stack: 'React / Vite / Tailwind',
    href: '#',
    asset: '/assets/project-ciptaone.svg',
    alt: 'Cipta One studio identity mark — a perspective diagram with central node.',
    paper: '#c8c5bd'
  },
  {
    index: '04',
    category: 'Platform',
    year: '2026',
    title: ['HUMAS', 'SUITE'],
    description:
      'A practical communications workspace for distributing content, generating certificates and turning activities into reports.',
    stack: 'PHP / React / MySQL',
    href: '#',
    asset: '/assets/project-humas.svg',
    alt: 'Humas Suite interface visual — a media distribution layout.',
    paper: '#e2dfd6'
  }
];
