export type Bilingual = { en: string; id: string };

export const playstore = {
  eyebrow: { en: 'NEW SERVICE / PLAY STORE RELEASE', id: 'LAYANAN BARU / RILIS PLAY STORE' },
  titleLines: [
    { en: 'SHIP IT', id: 'RILIS' },
    { en: 'TO THE', id: 'KARYA KAMU' },
    { en: 'PLAY STORE.', id: 'DI PLAY STORE.' }
  ],
  intro: {
    en: 'You built the app. We handle the Google Play paperwork, policy checks, and submission — so your app goes live without the back-and-forth.',
    id: 'Aplikasi sudah jadi. Kami urus administrasi Google Play, pemeriksaan kebijakan, dan proses submit — supaya aplikasi kamu live tanpa bolak-balik.'
  },
  facts: [
    { value: '7–14', label: { en: 'DAYS TO LIVE', id: 'HARI HINGGA LIVE' } },
    { value: '100%', label: { en: 'YOUR ACCOUNT', id: 'AKUN TETAP MILIKMU' } },
    { value: '2×', label: { en: 'REVISI INCLUDED', id: 'REVISI TERMASUK' } }
  ],
  problemTitle: {
    en: 'A working app is only half the job.',
    id: 'Aplikasi yang jalan hanya setengah dari pekerjaan.'
  },
  problemBody: {
    en: 'Google Play rejects apps for missing privacy policies, wrong metadata, untracked permissions, and unclear screenshots. Most first-time submissions get stuck there — not in the code.',
    id: 'Google Play menolak aplikasi karena kebijakan privasi yang belum ada, metadata yang keliru, izin yang tidak tercatat, dan screenshot yang membingungkan. Kebanyakan submit pertama mandek di situ — bukan di kodenya.'
  },
  problems: [
    {
      en: 'Account setup & verification',
      id: 'Setup & verifikasi akun developer'
    },
    {
      en: 'Data safety & privacy policy',
      id: 'Data safety & kebijakan privasi'
    },
    {
      en: 'Listing, screenshots & ASO copy',
      id: 'Listing, screenshot & copy ASO'
    },
    {
      en: 'Review rejection & resubmission',
      id: 'Penolakan review & submit ulang'
    }
  ],
  packagesTitle: {
    en: 'Pick the lane that fits your release.',
    id: 'Pilih jalur yang pas untuk rilis kamu.'
  },
  packagesBody: {
    en: 'Transparent pricing. No hidden fees. For packages using your own account, the USD 25 Google registration is paid directly to Google — the Akun Cipta One package already uses ours.',
    id: 'Harga transparan, tanpa biaya tersembunyi. Untuk paket dengan akun kamu sendiri, biaya pendaftaran Google USD 25 dibayar langsung ke Google — paket Akun Cipta One sudah memakai akun kami.'
  },
  processTitle: {
    en: 'Four steps from APK to live URL.',
    id: 'Empat langkah dari APK ke tautan live.'
  },
  steps: [
    {
      index: '01',
      name: { en: 'AUDIT', id: 'AUDIT' },
      desc: {
        en: 'We review your build, permissions, and assets against current Google Play policy.',
        id: 'Kami periksa build, izin, dan aset kamu terhadap kebijakan Google Play terbaru.'
      }
    },
    {
      index: '02',
      name: { en: 'PREPARE', id: 'PERSIAPKAN' },
      desc: {
        en: 'Listing copy, screenshots, privacy policy, data safety form, and release track setup.',
        id: 'Copy listing, screenshot, kebijakan privasi, form data safety, dan setup jalur rilis.'
      }
    },
    {
      index: '03',
      name: { en: 'SUBMIT', id: 'SUBMIT' },
      desc: {
        en: 'We upload the bundle and submit for review, then monitor the Play Console daily.',
        id: 'Kami unggah bundle dan submit untuk review, lalu pantau Play Console setiap hari.'
      }
    },
    {
      index: '04',
      name: { en: 'GO LIVE', id: 'LIVE' },
      desc: {
        en: 'Your app goes public, with a short handover note and 14 days of post-release support.',
        id: 'Aplikasi tayang, lengkap dengan catatan serah terima dan dukungan 14 hari pasca-rilis.'
      }
    }
  ],
  prepareTitle: {
    en: 'What you need to hand over.',
    id: 'Yang perlu kamu siapkan.'
  },
  prepare: [
    { en: 'Signed AAB or APK build', id: 'Build AAB atau APK yang sudah di-sign' },
    { en: 'App icon 512×512 PNG', id: 'Ikon aplikasi PNG 512×512' },
    { en: '2–8 screenshots (phone / tablet)', id: '2–8 screenshot (ponsel / tablet)' },
    { en: 'Short description + full description', id: 'Deskripsi singkat + deskripsi lengkap' },
    { en: 'Access to your Play Console (not needed for Akun Cipta One)', id: 'Akses ke Play Console (tidak perlu untuk Akun Cipta One)' },
    { en: 'A support email & website (can be a landing page)', id: 'Email dukungan & website (boleh landing page)' }
  ],
  faqTitle: { en: 'Before you pay.', id: 'Sebelum kamu bayar.' },
  faqs: [
    {
      q: { en: 'Is the Google Play account mine?', id: 'Apakah akun Google Play tetap milik saya?' },
      a: {
        en: 'For Starter, Pro, and Skala — yes. We work inside your Play Console with the access you grant. The Akun Cipta One package is the exception: the app is published under our developer account.',
        id: 'Untuk Starter, Pro, dan Skala — ya. Kami bekerja di dalam Play Console kamu dengan akses yang kamu berikan. Paket Akun Cipta One adalah pengecualian: aplikasi diterbitkan memakai akun developer kami.'
      }
    },
    {
      q: { en: 'What is the Akun Cipta One package?', id: 'Apa itu paket Akun Cipta One?' },
      a: {
        en: 'It is the fastest route to launch: we publish 1 app under Cipta One’s Google Play developer account for Rp 100.000. You skip the USD 25 registration and account verification. The developer account remains ours; app transfer options can be discussed separately.',
        id: 'Jalur tercepat untuk rilis: kami mempublikasikan 1 aplikasi dengan akun developer Google Play Cipta One seharga Rp 100.000. Kamu tidak perlu bayar USD 25 atau lewat verifikasi akun. Akun developer tetap milik kami; opsi transfer aplikasi bisa didiskusikan terpisah.'
      }
    },
    {
      q: { en: 'How long does the review take?', id: 'Berapa lama proses review-nya?' },
      a: {
        en: 'Preparation takes 1–3 working days. Google review usually takes 1–7 days and is outside our control. Complex policies or appeals can take longer.',
        id: 'Persiapan 1–3 hari kerja. Review Google biasanya 1–7 hari dan di luar kendali kami. Kebijakan yang kompleks atau banding bisa lebih lama.'
      }
    },
    {
      q: { en: 'What if Google rejects the app?', id: 'Bagaimana kalau aplikasi ditolak Google?' },
      a: {
        en: 'We read the rejection reason, fix the listing or build issue with you, and resubmit. Akun Cipta One and Starter include 1 resubmission, Pro includes 2, Skala is unlimited during the engagement.',
        id: 'Kami baca alasan penolakan, perbaiki listing atau masalah build bersama kamu, lalu submit ulang. Akun Cipta One dan Starter dapat 1x submit ulang, Pro 2x, Skala tanpa batas selama masa kerja.'
      }
    },
    {
      q: { en: 'Is the USD 25 developer fee included?', id: 'Apakah biaya developer USD 25 termasuk?' },
      a: {
        en: 'No. Google charges that directly when the developer account is created. Our fee covers the release work only. The Akun Cipta One package already uses our account, so there is no USD 25 charge for you.',
        id: 'Tidak. Google menagihnya langsung saat akun developer dibuat. Biaya kami hanya untuk pekerjaan rilis. Paket Akun Cipta One sudah memakai akun kami, jadi kamu tidak perlu membayar USD 25.'
      }
    },
    {
      q: { en: 'Can I choose the payment method?', id: 'Bisa pilih metode pembayaran?' },
      a: {
        en: 'Yes. Checkout is powered by Duitku — virtual account, QRIS, e-wallet, and card channels appear based on what is active on our merchant account.',
        id: 'Bisa. Checkout memakai Duitku — virtual account, QRIS, e-wallet, dan kartu muncul sesuai yang aktif di akun merchant kami.'
      }
    },
    {
      q: { en: 'When do you start?', id: 'Kapan kamu mulai mengerjakan?' },
      a: {
        en: 'As soon as the payment is confirmed. You will get an email and a WhatsApp message with the next steps and a shared checklist.',
        id: 'Begitu pembayaran terkonfirmasi. Kamu akan menerima email dan pesan WhatsApp berisi langkah berikutnya serta checklist bersama.'
      }
    }
  ],
  checkoutTitle: { en: 'Secure your release slot.', id: 'Amankan slot rilis kamu.' },
  checkoutBody: {
    en: 'Fill in the details below. You will be redirected to Duitku to complete payment — we never see or store your card or account credentials.',
    id: 'Isi detail di bawah. Kamu akan diarahkan ke Duitku untuk menyelesaikan pembayaran — kami tidak pernah melihat atau menyimpan data kartu / akun kamu.'
  },
  statusTitle: { en: 'Payment status', id: 'Status pembayaran' },
  statusChecking: { en: 'Checking your order…', id: 'Mengecek pesanan kamu…' },
  whatsapp: 'https://wa.me/6281234567890?text=Halo%20Cipta%20One%2C%20saya%20mau%20tanya%20layanan%20rilis%20Play%20Store.'
} as const;

export type Package = {
  id: string;
  index: string;
  name: string;
  price: number;
  featured?: boolean;
  turnaround: Bilingual;
  summary: Bilingual;
  features: Bilingual[];
  cta: Bilingual;
};

export const packages: Package[] = [
  {
    id: 'akun-ciptaone',
    index: '01',
    name: 'Akun Cipta One',
    price: 100000,
    turnaround: { en: '3–5 working days', id: '3–5 hari kerja' },
    summary: {
      en: 'Publish one app under Cipta One’s Google Play developer account — no registration needed on your side.',
      id: 'Rilis 1 aplikasi memakai akun developer Google Play milik Cipta One — tanpa perlu daftar akun sendiri.'
    },
    features: [
      { en: '1 app / 1 release track', id: '1 aplikasi / 1 jalur rilis' },
      { en: 'Published under Cipta One developer account', id: 'Diterbitkan dengan akun developer Cipta One' },
      { en: 'Policy audit + listing & screenshot help', id: 'Audit kebijakan + bantuan listing & screenshot' },
      { en: '1 submission + 1 resubmission', id: '1x submit + 1x submit ulang' },
      { en: 'Developer account stays with Cipta One', id: 'Akun developer tetap milik Cipta One' }
    ],
    cta: { en: 'Choose Akun Cipta One', id: 'Pilih Akun Cipta One' }
  },
  {
    id: 'starter',
    index: '02',
    name: 'Starter',
    price: 850000,
    turnaround: { en: '3–5 working days', id: '3–5 hari kerja' },
    summary: {
      en: 'For one app that is already built and just needs a clean first release.',
      id: 'Untuk satu aplikasi yang sudah jadi dan hanya butuh rilis pertama yang rapi.'
    },
    features: [
      { en: '1 app / 1 release track', id: '1 aplikasi / 1 jalur rilis' },
      { en: 'Pre-submission policy audit', id: 'Audit kebijakan sebelum submit' },
      { en: 'Listing & screenshot review', id: 'Review listing & screenshot' },
      { en: '1 submission + 1 resubmission', id: '1x submit + 1x submit ulang' },
      { en: 'Email handover note', id: 'Catatan serah terima via email' }
    ],
    cta: { en: 'Choose Starter', id: 'Pilih Starter' }
  },
  {
    id: 'pro',
    index: '03',
    name: 'Pro',
    price: 1750000,
    featured: true,
    turnaround: { en: '5–9 working days', id: '5–9 hari kerja' },
    summary: {
      en: 'The full release treatment — from metadata to review monitoring.',
      id: 'Paket rilis lengkap — dari metadata sampai monitoring review.'
    },
    features: [
      { en: 'Everything in Starter', id: 'Semua di paket Starter' },
      { en: 'Privacy policy + Data Safety form', id: 'Kebijakan privasi + form Data Safety' },
      { en: 'ASO copy for title & description', id: 'Copy ASO untuk judul & deskripsi' },
      { en: '2 resubmissions + review monitoring', id: '2x submit ulang + monitoring review' },
      { en: 'Release report & 14-day support', id: 'Laporan rilis & dukungan 14 hari' }
    ],
    cta: { en: 'Choose Pro', id: 'Pilih Pro' }
  },
  {
    id: 'skala',
    index: '04',
    name: 'Skala',
    price: 3500000,
    turnaround: { en: '7–14 working days', id: '7–14 hari kerja' },
    summary: {
      en: 'For teams shipping several apps, or an app with a tricky review history.',
      id: 'Untuk tim yang merilis beberapa aplikasi, atau aplikasi dengan riwayat review yang rumit.'
    },
    features: [
      { en: 'Everything in Pro', id: 'Semua di paket Pro' },
      { en: 'Up to 3 apps / release tracks', id: 'Hingga 3 aplikasi / jalur rilis' },
      { en: 'Account & release-track cleanup', id: 'Bersih-bersih akun & jalur rilis' },
      { en: 'Unlimited resubmissions during work', id: 'Submit ulang tanpa batas saat kerja' },
      { en: 'Priority handling + 30-day support', id: 'Prioritas + dukungan 30 hari' }
    ],
    cta: { en: 'Choose Skala', id: 'Pilih Skala' }
  }
];

export const formatIDR = (value: number) =>
  'Rp ' + new Intl.NumberFormat('id-ID').format(value);
