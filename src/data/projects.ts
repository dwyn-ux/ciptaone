export type Project = {
  index: string;
  slug: string;
  category: string;
  year: string;
  title: string[];
  description: string;
  descriptionId: string;
  stack: string;
  href: string;
  asset: string;
  assetLight: string;
  alt: string;
  paper: string;
  highlights: string[];
  highlightsEn: string[];
};

export const projects: Project[] = [
  {
    index: '01',
    slug: 'be-present',
    category: 'Mobile',
    year: '2026',
    title: ['BE', 'PRESENT'],
    description:
      'Absensi siswa berbasis barcode dan RFID — scan cepat, verifikasi otomatis, data real-time untuk guru dan wali kelas.',
    descriptionId:
      'Student attendance through barcode and RFID — fast scans, automatic verification, and real-time data for teachers and homeroom staff.',
    stack: 'Flutter / API',
    href: '/work/be-present/',
    asset: '/assets/project-attendance-pro.png',
    assetLight: '/assets/project-attendance-light.png',
    alt: 'BE Present — aplikasi absensi dengan barcode dan RFID.',
    paper: '#e9e6de',
    highlights: ['Barcode & RFID check-in', 'Verifikasi otomatis', 'Status hadir real-time'],
    highlightsEn: ['Barcode & RFID check-in', 'Automatic verification', 'Real-time attendance status']
  },
  {
    index: '02',
    slug: 'bel-school',
    category: 'Mobile',
    year: '2026',
    title: ['BEL', 'SCHOOL'],
    description:
      'Sistem bel sekolah dengan 4 pilihan audio lengkap — bisa difungsikan sebagai mic untuk pengumuman langsung dari aplikasi.',
    descriptionId:
      'A school bell system with four audio options — also usable as a microphone for live announcements from the app.',
    stack: 'Flutter / Audio',
    href: '/work/bel-school/',
    asset: '/assets/project-bell-pro.png',
    assetLight: '/assets/project-bell-light.png',
    alt: 'Bel School — bel sekolah digital dengan 4 audio dan mode mic pengumuman.',
    paper: '#d7d3ca',
    highlights: ['Jadwal bel terpusat', 'Empat pilihan audio', 'Mode pengumuman langsung'],
    highlightsEn: ['Centralised bell schedule', 'Four audio options', 'Live announcement mode']
  },
  {
    index: '03',
    slug: 'star-cuan',
    category: 'Web',
    year: '2026',
    title: ['STAR', 'CUAN'],
    description:
      'Merangkum pendapatan harian dan bulanan khusus para ojol — grafik jelas, ringkas, tanpa ribet.',
    descriptionId:
      'A clear, low-friction summary of daily and monthly earnings designed for ride-hailing drivers.',
    stack: 'React / Vite / Tailwind',
    href: '/work/star-cuan/',
    asset: '/assets/project-finance-pro.png',
    assetLight: '/assets/project-finance-light.png',
    alt: 'Star Cuan — dashboard pendapatan untuk ojol.',
    paper: '#e2dfd6',
    highlights: ['Ringkasan harian & bulanan', 'Grafik pendapatan jelas', 'Dashboard untuk pekerja ojol'],
    highlightsEn: ['Daily and monthly overview', 'Clear earnings charts', 'Dashboard for ride-hailing drivers']
  },
  {
    index: '04',
    slug: 'kasly',
    category: 'Platform',
    year: '2026',
    title: ['KASLY'],
    description:
      'Catat pengeluaran dan pemasukan harian, bulanan, atau periodik — laporan keuangan sederhana untuk siapa saja.',
    descriptionId:
      'Track daily, monthly, or periodic income and expenses with straightforward reports for anyone.',
    stack: 'PHP / MySQL',
    href: '/work/kasly/',
    asset: '/assets/project-finance-pro.png',
    assetLight: '/assets/project-finance-light.png',
    alt: 'Kasly — pencatatan keuangan pemasukan dan pengeluaran.',
    paper: '#dfd9c8',
    highlights: ['Pencatatan pemasukan', 'Pengeluaran terstruktur', 'Laporan periodik sederhana'],
    highlightsEn: ['Income tracking', 'Structured expenses', 'Simple periodic reports']
  },
  {
    index: '05',
    slug: 'system-school',
    category: 'Web',
    year: '2026',
    title: ['SYSTEM', 'SCHOOL'],
    description:
      'Portal sekolah all-in-one — pendaftaran online, supervisi guru, perpustakaan digital, kartu pelajar, dan rapor elektronik.',
    descriptionId:
      'An all-in-one school portal for enrolment, teacher supervision, digital library, student cards, and electronic report cards.',
    stack: 'PHP / MySQL',
    href: '/work/system-school/',
    asset: '/assets/project-school-pro.png',
    assetLight: '/assets/project-school-light.png',
    alt: 'System School — portal sekolah dengan fitur lengkap.',
    paper: '#c8c5bd',
    highlights: ['Pendaftaran digital', 'Operasional sekolah terpadu', 'Laporan & perpustakaan digital'],
    highlightsEn: ['Digital enrolment', 'Integrated school operations', 'Reports and digital library']
  },
  {
    index: '06',
    slug: 'tahfidz-system',
    category: 'Platform',
    year: '2026',
    title: ['TAHFIDZ', 'SYSTEM'],
    description:
      'Pencatatan hafalan tahfidz siswa — progress tracking otomatis dengan notifikasi WhatsApp ke orang tua.',
    descriptionId:
      'Student memorisation tracking with automatic progress reporting and WhatsApp notifications for parents.',
    stack: 'Flutter / API',
    href: '/work/tahfidz-system/',
    asset: '/assets/project-tahfidz-pro.png',
    assetLight: '/assets/project-tahfidz-light.png',
    alt: 'Tahfidz System — pencatatan tahfidz dengan notifikasi WhatsApp.',
    paper: '#dcd6c5',
    highlights: ['Progress hafalan personal', 'Rekap perkembangan', 'Notifikasi untuk orang tua'],
    highlightsEn: ['Personal memorisation progress', 'Progress recaps', 'Parent notifications']
  }
];
