import { supabase, isSupabaseConfigured } from './supabase';

export interface Profile {
  id?: string;
  name: string;
  title: string;
  university: string;
  gpa: string;
  bio: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  avatar_url: string;
  cv_url: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  major: string;
  faculty: string;
  start_year: string;
  end_year: string;
  gpa: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
}

export interface SkillItem {
  id: string;
  category: 'Pengembangan Web' | 'Basis Data' | 'Keamanan Siber' | 'Desain' | 'Teknologi Informasi';
  name: string;
  icon_name?: string;
  level: number;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  impact: string;
  year: string;
  image_url: string;
  github_url: string;
  demo_url: string;
  is_featured: boolean;
  features?: string[];
  technologies?: string[];
  gallery?: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credential_id: string;
  verification_url: string;
  image_url: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Fallback Mock Data
export const fallbackProfile: Profile = {
  name: 'Taufik Rahman, S.Kom',
  title: 'Lulusan Sistem Informasi • Full Stack Developer • Frontend Developer • UI/UX Enthusiast',
  university: 'Universitas Ma\'soem',
  gpa: '3,72 / 4,00',
  bio: 'Lulusan Sistem Informasi Universitas Ma\'soem dengan pengalaman di bidang pengembangan web, analisis sistem, UI/UX, teknologi informasi, infrastruktur IT, dan keamanan siber. Saya senang membangun solusi digital yang modern, efektif, dan mudah digunakan.',
  email: 'taufikrahman140@gmail.com',
  whatsapp: '082214139962',
  linkedin: 'https://linkedin.com/in/taufik-rahman-a89704109',
  github: 'https://github.com/taufikrahman',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  cv_url: '/documents/CV_Taufik_Rahman.pdf',
};

export const fallbackEducation: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'Universitas Ma\'soem',
    major: 'Sistem Informasi',
    faculty: 'Fakultas Ilmu Komputer',
    start_year: '2021',
    end_year: '2025',
    gpa: '3,72 / 4,00',
    description: 'Fokus studi meliputi Pengembangan Perangkat Lunak, Analisis & Desain Sistem Informasi, Manajemen Basis Data, Keamanan Jaringan, dan UI/UX Design. Lulus dengan predikat Sangat Memuaskan.',
  },
];

export const fallbackExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'General Facilities Management Intern',
    company: 'Lapas Kelas IIA Bekasi',
    period: 'September 2025 – Juni 2026',
    location: 'Bekasi, Jawa Barat',
    description: 'Bertanggung jawab penuh atas digitalisasi layanan operasional, pemeliharaan sistem TI, infrastruktur jaringan, dan analisis sistem keamanan fisik/digital.',
    responsibilities: [
      'Pengembangan dan pemeliharaan website serta sistem internal instansi (frontend & backend).',
      'Pengelolaan basis data operasional dan perancangan dasbor monitoring terintegrasi.',
      'Analisis kebutuhan sistem, pemeliharaan infrastruktur jaringan, CCTV, dan troubleshooting perangkat TI.',
      'Mendorong transformasi digital layanan publik serta optimalisasi alur kerja staf.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Digital Forensic Investigation',
    company: 'PT. Analyst Forensik Digital',
    period: 'September 2024 – Desember 2024',
    location: 'Bandung, Jawa Barat',
    description: 'Melakukan akuisisi, analisis bukti digital, dan penyusunan laporan investigasi siber profesional.',
    responsibilities: [
      'Investigasi digital forensik pada perangkat seluler, komputer, dan media penyimpanan log jaringan.',
      'Analisis bukti digital menggunakan tools industri seperti Autopsy, FTK Imager, dan Wireshark.',
      'Penanganan dan penelusuran insiden keamanan siber (Incident Response).',
      'Penyusunan dokumen teknis dan laporan hasil analisis forensik secara mendalam.',
    ],
  },
  {
    id: 'exp-3',
    role: 'Cyber Security Analyst',
    company: 'Kepolisian Negara Republik Indonesia',
    period: 'Januari 2021 – Agustus 2025',
    location: 'Indonesia',
    description: 'Menganalisis potensi ancaman keamanan jaringan, pengawasan lalu lintas data, dan asistensi audit sistem informasi.',
    responsibilities: [
      'Monitoring lalu lintas jaringan dan analisis anomali lalu lintas data.',
      'Identifikasi celah keamanan (vulnerability assessment) dan mitigasi risiko siber.',
      'Penyusunan rekomendasi penguatan arsitektur keamanan TI.',
      'Kolaborasi dalam penanganan insiden serta penyiapan dokumentasi audit keamanan.',
    ],
  },
];

export const fallbackSkills: SkillItem[] = [
  { id: 'sk-1', category: 'Pengembangan Web', name: 'Next.js', level: 92 },
  { id: 'sk-2', category: 'Pengembangan Web', name: 'React.js', level: 95 },
  { id: 'sk-3', category: 'Pengembangan Web', name: 'TypeScript', level: 88 },
  { id: 'sk-4', category: 'Pengembangan Web', name: 'JavaScript', level: 90 },
  { id: 'sk-5', category: 'Pengembangan Web', name: 'PHP', level: 85 },
  { id: 'sk-6', category: 'Pengembangan Web', name: 'Laravel', level: 86 },
  { id: 'sk-7', category: 'Pengembangan Web', name: 'HTML', level: 98 },
  { id: 'sk-8', category: 'Pengembangan Web', name: 'CSS', level: 95 },
  { id: 'sk-9', category: 'Pengembangan Web', name: 'Tailwind CSS', level: 96 },

  { id: 'sk-10', category: 'Basis Data', name: 'MySQL', level: 90 },
  { id: 'sk-11', category: 'Basis Data', name: 'PostgreSQL', level: 88 },
  { id: 'sk-12', category: 'Basis Data', name: 'Database Management', level: 92 },

  { id: 'sk-13', category: 'Keamanan Siber', name: 'Digital Forensics', level: 85 },
  { id: 'sk-14', category: 'Keamanan Siber', name: 'Cybersecurity', level: 88 },
  { id: 'sk-15', category: 'Keamanan Siber', name: 'Network Analysis', level: 87 },
  { id: 'sk-16', category: 'Keamanan Siber', name: 'Wireshark', level: 90 },
  { id: 'sk-17', category: 'Keamanan Siber', name: 'Autopsy', level: 86 },
  { id: 'sk-18', category: 'Keamanan Siber', name: 'FTK', level: 84 },

  { id: 'sk-19', category: 'Desain', name: 'UI/UX', level: 92 },
  { id: 'sk-20', category: 'Desain', name: 'Figma', level: 94 },
  { id: 'sk-21', category: 'Desain', name: 'Adobe Photoshop', level: 86 },
  { id: 'sk-22', category: 'Desain', name: 'Adobe Illustrator', level: 82 },

  { id: 'sk-23', category: 'Teknologi Informasi', name: 'Analisis Sistem', level: 92 },
  { id: 'sk-24', category: 'Teknologi Informasi', name: 'IT Support', level: 94 },
  { id: 'sk-25', category: 'Teknologi Informasi', name: 'Infrastruktur Jaringan', level: 88 },
  { id: 'sk-26', category: 'Teknologi Informasi', name: 'Troubleshooting', level: 95 },
  { id: 'sk-27', category: 'Teknologi Informasi', name: 'Pemeliharaan Sistem', level: 90 },
];

export const fallbackProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    slug: 'smart-lapas-bekasi',
    title: 'Smart Lapas Bekasi',
    short_description: 'Sistem monitoring dan manajemen digital berbasis web untuk operasional instansi terpadu.',
    overview: 'Smart Lapas Bekasi adalah sistem platform terpadu yang dirancang untuk mengintegrasikan pengawasan operasional, manajemen hunian, fasilitas umum, dan pemantauan infrastruktur keamanan secara realtime.',
    problem: 'Pengelolaan data fasilitas dan pemantauan operasional lapangan sebelumnya dilakukan secara manual dengan pencatatan fisik, memicu ketidakakuratan data dan respons kendala teknis yang lambat.',
    solution: 'Membangun platform web berbasis Next.js dan PostgreSQL dengan dashboard interaktif, sistem ticketing maintenance, pemantauan status CCTV, dan modul laporan otomatis.',
    role: 'Full Stack Developer & System Analyst',
    impact: 'Meningkatkan efisiensi pelaporan operasional sebesar 70% dan mempercepat waktu tanggap penanganan teknis dari 2 hari menjadi 30 menit.',
    year: '2026',
    image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    github_url: 'https://github.com/taufikrahman/smart-lapas-bekasi',
    demo_url: 'https://smartlapas-demo.vercel.app',
    is_featured: true,
    features: [
      'Dashboard pemantauan status fasilitas dan perangkat terintegrasi secara live.',
      'Sistem pelaporan kendala teknis (ticketing maintenance) dengan prioritas otomatis.',
      'Integrasi log pemantauan jaringan & CCTV untuk pengawasan area.',
      'Modul statistik analitis dan ekspor laporan berkala otomatis PDF/Excel.'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Framer Motion', 'Chart.js'],
    gallery: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'proj-2',
    slug: 'spmb-smk-gpi',
    title: 'Sistem Informasi PPDB Berbasis Web',
    short_description: 'Platform pendaftaran siswa baru online SMK GPI Solokan Jeruk lengkap dengan verifikasi dokumen & pembayaran.',
    overview: 'Sistem Informasi Penerimaan Peserta Didik Baru (PPDB) SMK GPI Solokan Jeruk menyajikan layanan pendaftaran terdigitalisasi penuh bagi calon siswa baru dan panitia seleksi sekolah.',
    problem: 'Proses pendaftaran fisik membutuhkan kehadiran langsung calon siswa, pengumpulan berkas kertas yang rentan hilang, serta pengolahan hasil seleksi yang memakan waktu lama.',
    solution: 'Merancang sistem aplikasi web responsive dengan fitur formulir online dinamis, unggah & verifikasi dokumen, gateway pencatatan pembayaran, dan generator bukti pendaftaran otomatis.',
    role: 'Frontend & Full Stack Developer',
    impact: 'Memproses lebih dari 500+ pendaftar online tanpa kendala server dan menghemat pengeluaran percetakan formulir hingga 90%.',
    year: '2025',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    github_url: 'https://github.com/taufikrahman/ppdb-smk-gpi',
    demo_url: 'https://ppdb-smk-gpi.vercel.app',
    is_featured: true,
    features: [
      'Formulir pendaftaran online responsif dengan validasi otomatis.',
      'Unggah dan verifikasi berkas administratif calon siswa.',
      'Manajemen pencatatan bukti pembayaran & biaya formulir.',
      'Dasbor panitia PPDB untuk verifikasi cepat dan cetak kartu peserta.'
    ],
    technologies: ['React.js', 'Laravel', 'MySQL', 'Tailwind CSS', 'Bootstrap'],
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'proj-3',
    slug: 'pelayanan-publik-digital',
    title: 'Website Digitalisasi Pelayanan Publik',
    short_description: 'Platform digital untuk meningkatkan efisiensi, keterbukaan, dan aksesibilitas layanan administrasi publik.',
    overview: 'Website portal layanan publik yang memungkinkan masyarakat mengajukan permohonan administrasi secara mandiri, melacak status dokumen secara realtime, dan mengakses transparansi informasi.',
    problem: 'Antrean fisik layanan administrasi publik yang panjang dan kurangnya transparansi alur status pengajuan surat warga.',
    solution: 'Mengembangkan platform portal publik dengan autentikasi aman, pelacak resi layanan live, dan pengarsipan digital terenkripsi.',
    role: 'Lead Frontend Developer & UI/UX Designer',
    impact: 'Mengurangi durasi antrean tatap muka sebesar 80% dan mempermudah masyarakat mengakses layanan 24/7.',
    year: '2025',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    github_url: 'https://github.com/taufikrahman/pelayanan-publik',
    demo_url: 'https://layanan-publik-demo.vercel.app',
    is_featured: true,
    features: [
      'Pengajuan permohonan surat administrasi online 24/7.',
      'Live tracking nomor resi permohonan dengan indikator status.',
      'Portal berita dan transparansi statistik pelayanan publik.',
      'Integrasi autentikasi pengguna dan perlindungan enkripsi dokumen.'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Figma'],
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'proj-4',
    slug: 'monitoring-dapur-logistik',
    title: 'Sistem Monitoring Dapur & Logistik',
    short_description: 'Aplikasi pengawasan stok bahan pangan, perencanaan menu harian, dan manajemen logistik operasional.',
    overview: 'Aplikasi manajemen stok dan distribusi logistik dapur untuk memantau siklus pasokan bahan makanan, anggaran harian, dan efisiensi konsumsi.',
    problem: 'Ketidaksesuaian stok bahan makanan antara gudang dan dapur serta potensi pembengkakan sisa bahan baku yang kadaluarsa.',
    solution: 'Membuat sistem inventaris dengan algoritma FIFO (First In First Out), peringatan batas minimum stok, serta Dasbor visualisasi konsumsi bahan.',
    role: 'Full Stack Developer',
    impact: 'Menurunkan angka pemborosan bahan pangan hingga 35% dan meningkatkan akurasi inventarisasi stok logistik.',
    year: '2025',
    image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    github_url: 'https://github.com/taufikrahman/dapur-logistik',
    demo_url: 'https://dapur-logistik-demo.vercel.app',
    is_featured: false,
    features: [
      'Manajemen siklus stok bahan makanan dengan klasifikasi kategori.',
      'Perencanaan menu harian & rekap perkiraan kebutuhan bahan baku.',
      'Pencatatan barang masuk, barang keluar, dan laporan stok Opname.',
      'Notifikasi otomatis saat stok mendekati ambang batas minimum.'
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'JavaScript'],
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'proj-5',
    slug: 'dashboard-keuangan-ecommerce',
    title: 'Dashboard Keuangan E-Commerce',
    short_description: 'Dasbor analitik finansial modern untuk melacak omzet, margin keuntungan, dan pengeluaran secara visual.',
    overview: 'Platform dashboard bisnis e-commerce yang mengolah data transaksi mentah menjadi visualisasi grafik interaktif finansial secara real-time.',
    problem: 'Kesulitan pemilik bisnis dalam menganalisis arus kas harian dan mengidentifikasi tren keuntungan produk secara cepat.',
    solution: 'Mengembangkan UI Dashboard intuitif menggunakan React, Tailwind CSS, dan Chart.js dengan filter tanggal dinamis serta ekspor data laporan PDF/Excel.',
    role: 'Frontend Developer & Data Analyst',
    impact: 'Membantu manajemen membuat keputusan bisnis berbasis data 3x lebih cepat dengan tampilan metriks yang intuitif.',
    year: '2024',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    github_url: 'https://github.com/taufikrahman/ecommerce-financial-dashboard',
    demo_url: 'https://financial-dash-demo.vercel.app',
    is_featured: false,
    features: [
      'Visualisasi pendapatan, marjin keuntungan, dan grafik arus kas.',
      'Analisis peringkat produk terlaris & rincian biaya operasional.',
      'Ekspor laporan laporan keuangan siap cetak (PDF, XLSX, CSV).',
      'Antarmuka responsif dark mode & light mode.'
    ],
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Framer Motion'],
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

export const fallbackCertificates: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Certified Cybersecurity Analyst & Forensic Expert',
    issuer: 'Siber Akademi Indonesia',
    year: '2025',
    credential_id: 'SAI-8849-2025',
    verification_url: 'https://siberakademi.id/verify/SAI-8849-2025',
    image_url: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cert-2',
    title: 'Full Stack Web Development Professional',
    issuer: 'Digital Talent Scholarship (Kominfo)',
    year: '2024',
    credential_id: 'DTS-2024-FSWD-1029',
    verification_url: 'https://digitalent.kominfo.go.id/verify/DTS-2024-FSWD-1029',
    image_url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cert-3',
    title: 'UI/UX Design Masterclass & Prototyping',
    issuer: 'Figma Certification Program',
    year: '2024',
    credential_id: 'FIG-UIUX-99321',
    verification_url: 'https://figma.com/certificates/FIG-UIUX-99321',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cert-4',
    title: 'PostgreSQL Database Administrator Specialist',
    issuer: 'Oracle & DB Academy',
    year: '2024',
    credential_id: 'DBA-PGSQL-2024-001',
    verification_url: 'https://dbacademy.org/verify/DBA-PGSQL-2024-001',
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  },
];

export const fallbackTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Dr. H. Ahmad Fauzi, M.T.',
    role: 'Kepala Program Studi Sistem Informasi',
    company: 'Universitas Ma\'soem',
    content: 'Taufik Rahman adalah mahasiswa dengan dedikasi luar biasa. IPK 3,72 yang diraihnya mencerminkan pemahaman mendalam dalam analisis sistem dan rekayasa perangkat lunak. Proyek-proyeknya selalu solutif dan berkualitas tinggi.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-2',
    name: 'Bambang Sugiarto, S.H.',
    role: 'Kepala Subbagian Umum',
    company: 'Lapas Kelas IIA Bekasi',
    content: 'Kerja keras Taufik selama magang sangat membantu instansi kami. Sistem monitoring dan digitalisasi fasilitas yang dibangunnya membuat pengelolaan TI dan operasional menjadi jauh lebih efisien dan modern.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-3',
    name: 'Rahmat Hidayat, S.T.',
    role: 'Senior Digital Forensic Lead',
    company: 'PT. Analyst Forensik Digital',
    content: 'Taufik memiliki ketelitian tinggi dalam investigasi forensik digital dan analisis keamanan siber. Kemampuan analisis data dan penyusunan laporkannya sangat profesional.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
];

// Helper for Browser LocalStorage Persistence
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// Data Fetching Functions
export async function getProfile(): Promise<Profile> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
      if (!error && data) return data as Profile;
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_profile', fallbackProfile);
}

export async function getEducation(): Promise<EducationItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('education').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as EducationItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_education', fallbackEducation);
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('experiences').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as ExperienceItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_experiences', fallbackExperiences);
}

export async function getSkills(): Promise<SkillItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('skills').select('*');
      if (!error && data && data.length > 0) return data as SkillItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_skills', fallbackSkills);
}

export async function getProjects(): Promise<ProjectItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('is_featured', { ascending: false });
      if (!error && data && data.length > 0) return data as ProjectItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_projects', fallbackProjects);
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getCertificates(): Promise<CertificateItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('certificates').select('*');
      if (!error && data && data.length > 0) return data as CertificateItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_certificates', fallbackCertificates);
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('testimonials').select('*');
      if (!error && data && data.length > 0) return data as TestimonialItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_testimonials', fallbackTestimonials);
}

// Data Saving Functions for Admin Dashboard
export async function saveProfile(profile: Profile): Promise<boolean> {
  setLocalItem('taufik_portfolio_profile', profile);
  if (isSupabaseConfigured && supabase) {
    try {
      const payload = { ...profile };
      if (!payload.id) delete payload.id;
      const { error } = await supabase.from('profiles').upsert([payload]);
      if (error) console.error('Supabase profile save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveEducation(education: EducationItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_education', education);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('education').upsert(education);
      if (error) console.error('Supabase education save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveExperiences(experiences: ExperienceItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_experiences', experiences);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('experiences').upsert(experiences);
      if (error) console.error('Supabase experiences save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveSkills(skills: SkillItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_skills', skills);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('skills').upsert(skills);
      if (error) console.error('Supabase skills save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveProjects(projects: ProjectItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_projects', projects);
  if (isSupabaseConfigured && supabase) {
    try {
      const cleanProjects = projects.map(({ features, technologies, gallery, ...rest }) => rest);
      const { error } = await supabase.from('projects').upsert(cleanProjects);
      if (error) console.error('Supabase projects save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveCertificates(certificates: CertificateItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_certificates', certificates);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('certificates').upsert(certificates);
      if (error) console.error('Supabase certificates save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveTestimonials(testimonials: TestimonialItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_testimonials', testimonials);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('testimonials').upsert(testimonials);
      if (error) console.error('Supabase testimonials save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}
