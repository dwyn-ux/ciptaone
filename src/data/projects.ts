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
    title: ['SCHOOL', 'WEB'],
    description:
      'A school web platform for publishing announcements, profiles and academic content to students, parents and the public.',
    stack: 'PHP / MySQL',
    href: '#',
    asset: '/assets/project-humas.svg',
    alt: 'School Web interface visual — a school information layout.',
    paper: '#c8c5bd'
  },
  {
    index: '04',
    category: 'Web',
    year: '2026',
    title: ['STAR', 'CUAN'],
    description:
      'A focused web tool to track income, expenses and small business performance with clear daily and monthly summaries.',
    stack: 'React / Vite / Tailwind',
    href: '#',
    asset: '/assets/project-ciptaone.svg',
    alt: 'Star Cuan interface visual — a finance dashboard layout.',
    paper: '#e2dfd6'
  },
  {
    index: '05',
    category: 'Platform',
    year: '2026',
    title: ['KASLY'],
    description:
      'A lightweight cashier and stock platform built for small shops — fast checkout, simple inventory and clear daily reports.',
    stack: 'PHP / MySQL',
    href: '#',
    asset: '/assets/project-humas.svg',
    alt: 'Kasly interface visual — a cashier and stock layout.',
    paper: '#dfd9c8'
  },
  {
    index: '06',
    category: 'Platform',
    year: '2026',
    title: ['TAHFIDZ', 'SYSTEM'],
    description:
      'A tahfidz tracking system for students and supervisors — set targets, log progress and review recitation history in one place.',
    stack: 'Flutter / API',
    href: '#',
    asset: '/assets/project-attendance.svg',
    alt: 'Tahfidz System interface visual — a recitation progress layout.',
    paper: '#dcd6c5'
  }
];
