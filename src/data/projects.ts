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
    title: ['BE', 'PRESENT'],
    description:
      'Absensi siswa berbasis barcode dan RFID — scan cepat, verifikasi otomatis, data real-time untuk guru dan wali kelas.',
    stack: 'Flutter / API',
    href: '#',
    asset: '/assets/be-present.jpg',
    alt: 'BE Present — aplikasi absensi dengan barcode dan RFID.',
    paper: '#e9e6de'
  },
  {
    index: '02',
    category: 'Mobile',
    year: '2026',
    title: ['BEL', 'SCHOOL'],
    description:
      'Sistem bel sekolah dengan 4 pilihan audio lengkap — bisa difungsikan sebagai mic untuk pengumuman langsung dari aplikasi.',
    stack: 'Flutter / Audio',
    href: '#',
    asset: '/assets/bel-school.jpg',
    alt: 'Bel School — bel sekolah digital dengan 4 audio dan mode mic pengumuman.',
    paper: '#d7d3ca'
  },
  {
    index: '03',
    category: 'Web',
    year: '2026',
    title: ['STAR', 'CUAN'],
    description:
      'Merangkum pendapatan harian dan bulanan khusus para ojol — grafik jelas, ringkas, tanpa ribet.',
    stack: 'React / Vite / Tailwind',
    href: '#',
    asset: '/assets/starcuan.jpg',
    alt: 'Star Cuan — dashboard pendapatan untuk ojol.',
    paper: '#e2dfd6'
  },
  {
    index: '04',
    category: 'Platform',
    year: '2026',
    title: ['KASLY'],
    description:
      'Catat pengeluaran dan pemasukan harian, bulanan, atau periodik — laporan keuangan sederhana untuk siapa saja.',
    stack: 'PHP / MySQL',
    href: '#',
    asset: '/assets/kasly.jpg',
    alt: 'Kasly — pencatatan keuangan pemasukan dan pengeluaran.',
    paper: '#dfd9c8'
  },
  {
    index: '05',
    category: 'Web',
    year: '2026',
    title: ['SYSTEM', 'SCHOOL'],
    description:
      'Portal sekolah all-in-one — pendaftaran online, supervisi guru, perpustakaan digital, kartu pelajar, dan rapor elektronik.',
    stack: 'PHP / MySQL',
    href: '#',
    asset: '/assets/school-web.png',
    alt: 'System School — portal sekolah dengan fitur lengkap.',
    paper: '#c8c5bd'
  },
  {
    index: '06',
    category: 'Platform',
    year: '2026',
    title: ['TAHFIDZ', 'SYSTEM'],
    description:
      'Pencatatan hafalan tahfidz siswa — progress tracking otomatis dengan notifikasi WhatsApp ke orang tua.',
    stack: 'Flutter / API',
    href: '#',
    asset: '/assets/system-tahfidz.png',
    alt: 'Tahfidz System — pencatatan tahfidz dengan notifikasi WhatsApp.',
    paper: '#dcd6c5'
  }
];
