export type StackItem = {
  index: string;
  group: string;
  name: string;
  note: string;
  noteId: string;
};

export const stack: StackItem[] = [
  { index: '01', group: 'Mobile', name: 'Kotlin', note: 'Native Android / APIs / Architecture', noteId: 'Android native / API / Arsitektur' },
  { index: '02', group: 'Mobile', name: 'Flutter', note: 'Cross-platform / UI / Product builds', noteId: 'Lintas platform / UI / Pengembangan produk' },
  { index: '03', group: 'Backend', name: 'PHP', note: 'Web applications / APIs / MySQL', noteId: 'Aplikasi web / API / MySQL' },
  { index: '04', group: 'Web', name: 'React', note: 'Interfaces / Components / State', noteId: 'Antarmuka / Komponen / State' },
  { index: '05', group: 'Web', name: 'Vite', note: 'Modern frontend tooling / DX', noteId: 'Tooling frontend modern / DX' },
  { index: '06', group: 'UI', name: 'Tailwind', note: 'Design systems / Responsive UI', noteId: 'Sistem desain / UI responsif' },
  { index: '07', group: 'Tools', name: 'Git', note: 'Versioning / Reviews / Workflows', noteId: 'Versioning / Review / Alur kerja' }
];

export type ProcessStep = {
  index: string;
  name: string;
  nameId: string;
  description: string;
  descriptionId: string;
};

export const process: ProcessStep[] = [
  { index: '01', name: 'Understand', nameId: 'Pahami', description: 'Find the actual problem. Remove assumptions.', descriptionId: 'Temukan masalah sebenarnya. Singkirkan asumsi.' },
  { index: '02', name: 'Design', nameId: 'Rancang', description: 'Reduce unnecessary complexity. Make the path obvious.', descriptionId: 'Kurangi kerumitan yang tidak perlu. Buat jalurnya jelas.' },
  { index: '03', name: 'Build', nameId: 'Bangun', description: 'Ship the smallest useful system.', descriptionId: 'Rilis sistem terkecil yang benar-benar berguna.' },
  { index: '04', name: 'Test', nameId: 'Uji', description: 'Break it before users do. Fix what matters.', descriptionId: 'Temukan masalah sebelum pengguna. Perbaiki yang penting.' },
  { index: '05', name: 'Iterate', nameId: 'Iterasi', description: 'Use feedback as the next specification.', descriptionId: 'Gunakan umpan balik sebagai spesifikasi berikutnya.' }
];

export type Note = {
  index: string;
  slug: string;
  group: string;
  title: string;
  titleId: string;
  href: string;
  intro: string;
  introId: string;
  points: string[];
  pointsEn: string[];
};

export const notes: Note[] = [
  {
    index: '01',
    slug: 'flutter-for-school-scheduling',
    group: 'Mobile',
    title: 'Why Flutter made sense for a school scheduling product.',
    titleId: 'Kenapa Flutter cocok untuk produk penjadwalan sekolah.',
    href: '/notes/flutter-for-school-scheduling/',
    intro: 'Pilihan teknologi bukan soal ikut tren. Untuk sistem jadwal sekolah, yang paling penting adalah satu pengalaman yang konsisten bagi operator dan guru di perangkat yang berbeda.',
    introId: 'Technology choice is not about following trends. For a school scheduling system, the important thing is a consistent experience for operators and teachers across devices.',
    points: ['Satu codebase membantu fitur bergerak lebih cepat.', 'UI yang konsisten mengurangi beban belajar pengguna.', 'Native integration tetap dipakai saat perangkat membutuhkannya.'],
    pointsEn: ['One codebase helps features move faster.', 'A consistent UI reduces the user learning curve.', 'Native integration is still used where hardware requires it.']
  },
  {
    index: '02',
    slug: 'simple-interfaces',
    group: 'Product',
    title: 'Simple interfaces are often harder to build than complex ones.',
    titleId: 'Antarmuka sederhana sering kali lebih sulit dibangun daripada yang kompleks.',
    href: '/notes/simple-interfaces/',
    intro: 'Antarmuka yang terasa sederhana biasanya adalah hasil dari banyak keputusan yang sengaja disembunyikan dari pengguna. Kerumitannya tetap ada—hanya tidak dipindahkan ke layar.',
    introId: 'An interface that feels simple is usually the result of many decisions deliberately hidden from the user. The complexity remains—it is simply not moved onto the screen.',
    points: ['Tentukan satu aksi utama di setiap layar.', 'Tulis bahasa yang menjawab kebutuhan pengguna.', 'Uji alur, bukan hanya tampilan statis.'],
    pointsEn: ['Define one primary action on every screen.', 'Write language that answers user needs.', 'Test flows, not only static views.']
  },
  {
    index: '03',
    slug: 'offline-first',
    group: 'Architecture',
    title: 'When an offline-first approach is actually worth the trade-offs.',
    titleId: 'Kapan pendekatan offline-first benar-benar sepadan dengan konsekuensinya.',
    href: '/notes/offline-first/',
    intro: 'Offline-first bernilai ketika pekerjaan pengguna tidak boleh berhenti hanya karena koneksi. Namun pola ini perlu dipilih dengan sadar karena sinkronisasi selalu membawa konsekuensi.',
    introId: 'Offline-first is valuable when user work cannot stop simply because of connectivity. But the pattern must be chosen deliberately because synchronisation always has consequences.',
    points: ['Mulai dari pekerjaan yang tetap harus jalan tanpa internet.', 'Jadikan status sinkronisasi terlihat jelas.', 'Rancang konflik data sebelum konflik itu terjadi.'],
    pointsEn: ['Start with work that must continue without internet.', 'Make sync status clearly visible.', 'Design data conflicts before they occur.']
  },
  {
    index: '04',
    slug: 'kotlin-vs-flutter',
    group: 'Android',
    title: 'Kotlin vs Flutter: choosing based on the product, not the hype.',
    titleId: 'Kotlin vs Flutter: memilih dari kebutuhan produk, bukan hype.',
    href: '/notes/kotlin-vs-flutter/',
    intro: 'Tidak ada jawaban universal antara Kotlin dan Flutter. Keputusan yang sehat selalu dimulai dari perangkat, timeline, pengalaman tim, dan risiko produk.',
    introId: 'There is no universal answer between Kotlin and Flutter. A healthy decision starts with devices, timeline, team experience, and product risk.',
    points: ['Pilih Kotlin saat integrasi Android adalah inti produk.', 'Pilih Flutter saat kecepatan lintas-platform lebih penting.', 'Jangan biarkan preferensi teknis mengalahkan kebutuhan pengguna.'],
    pointsEn: ['Choose Kotlin when Android integration is core to the product.', 'Choose Flutter when cross-platform speed matters more.', 'Do not let technical preference outrun user needs.']
  }
];
