export type StackItem = {
  index: string;
  group: string;
  name: string;
  note: string;
};

export const stack: StackItem[] = [
  { index: '01', group: 'Mobile', name: 'Kotlin', note: 'Native Android / APIs / Architecture' },
  { index: '02', group: 'Mobile', name: 'Flutter', note: 'Cross-platform / UI / Product builds' },
  { index: '03', group: 'Backend', name: 'PHP', note: 'Web applications / APIs / MySQL' },
  { index: '04', group: 'Web', name: 'React', note: 'Interfaces / Components / State' },
  { index: '05', group: 'Web', name: 'Vite', note: 'Modern frontend tooling / DX' },
  { index: '06', group: 'UI', name: 'Tailwind', note: 'Design systems / Responsive UI' },
  { index: '07', group: 'Tools', name: 'Git', note: 'Versioning / Reviews / Workflows' }
];

export type ProcessStep = {
  index: string;
  name: string;
  description: string;
};

export const process: ProcessStep[] = [
  { index: '01', name: 'Understand', description: 'Find the actual problem. Remove assumptions.' },
  { index: '02', name: 'Design', description: 'Reduce unnecessary complexity. Make the path obvious.' },
  { index: '03', name: 'Build', description: 'Ship the smallest useful system.' },
  { index: '04', name: 'Test', description: 'Break it before users do. Fix what matters.' },
  { index: '05', name: 'Iterate', description: 'Use feedback as the next specification.' }
];

export type Note = {
  index: string;
  group: string;
  title: string;
  href: string;
};

export const notes: Note[] = [
  {
    index: '01',
    group: 'Mobile',
    title: 'Why Flutter made sense for a school scheduling product.',
    href: '#'
  },
  {
    index: '02',
    group: 'Product',
    title: 'Simple interfaces are often harder to build than complex ones.',
    href: '#'
  },
  {
    index: '03',
    group: 'Architecture',
    title: 'When an offline-first approach is actually worth the trade-offs.',
    href: '#'
  },
  {
    index: '04',
    group: 'Android',
    title: 'Kotlin vs Flutter: choosing based on the product, not the hype.',
    href: '#'
  }
];
