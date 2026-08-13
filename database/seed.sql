-- Seed Data for Taufik Rahman, S.Kom Portfolio

-- Insert Profile
INSERT INTO profiles (name, title, university, gpa, bio, email, whatsapp, linkedin, github, avatar_url, cv_url)
VALUES (
    'Taufik Rahman, S.Kom',
    'Lulusan Sistem Informasi • Full Stack Developer • Frontend Developer • UI/UX Enthusiast',
    'Universitas Ma''soem',
    '3,72 / 4,00',
    'Lulusan Sistem Informasi Universitas Ma''soem dengan pengalaman di bidang pengembangan web, analisis sistem, UI/UX, teknologi informasi, infrastruktur IT, dan keamanan siber. Saya senang membangun solusi digital yang modern, efektif, dan mudah digunakan.',
    'taufikrahman140@gmail.com',
    '082214139962',
    'https://linkedin.com/in/taufik-rahman-a89704109',
    'https://github.com/taufikrahman',
    '/images/profile.jpg',
    '/documents/CV_Taufik_Rahman.pdf'
);

-- Insert Education
INSERT INTO education (institution, major, faculty, start_year, end_year, gpa, description)
VALUES (
    'Universitas Ma''soem',
    'Sistem Informasi',
    'Fakultas Ilmu Komputer',
    '2021',
    '2025',
    '3,72 / 4,00',
    'Fokus studi meliputi Pengembangan Perangkat Lunak, Analisis & Desain Sistem Informasi, Manajemen Basis Data, Keamanan Jaringan, dan UI/UX Design. Lulus dengan predikat Sangat Memuaskan.'
);

-- Insert Experiences
INSERT INTO experiences (role, company, period, location, description, responsibilities)
VALUES 
(
    'General Facilities Management Intern',
    'Lapas Kelas IIA Bekasi',
    'September 2025 – Juni 2026',
    'Bekasi, Jawa Barat',
    'Bertanggung jawab penuh atas digitalisasi layanan operasional, pemeliharaan sistem TI, infrastruktur jaringan, dan analisis sistem keamanan fisik/digital.',
    ARRAY[
        'Pengembangan dan pemeliharaan website serta sistem internal instansi (frontend & backend).',
        'Pengelolaan basis data operasional dan perancangan dasbor monitoring terintegrasi.',
        'Analisis kebutuhan sistem, pemeliharaan infrastruktur jaringan, CCTV, dan troubleshooting perangkat TI.',
        'Mendorong transformasi digital layanan publik serta optimalisasi alur kerja staf.'
    ]
),
(
    'Digital Forensic Investigation',
    'PT. Analyst Forensik Digital',
    'September 2024 – Desember 2024',
    'Bandung, Jawa Barat',
    'Melakukan akuisisi, analisis bukti digital, dan penyusunan laporan investigasi siber profesional.',
    ARRAY[
        'Investigasi digital forensik pada perangkat seluler, komputer, dan media penyimpanan log jaringan.',
        'Analisis bukti digital menggunakan tools industri seperti Autopsy, FTK Imager, dan Wireshark.',
        'Penanganan dan penelusuran insiden keamanan siber (Incident Response).',
        'Penyusunan dokumen teknis dan laporan hasil analisis forensik secara mendalam.'
    ]
),
(
    'Cyber Security Analyst',
    'Kepolisian Negara Republik Indonesia',
    'Januari 2021 – Agustus 2025',
    'Indonesia',
    'Menganalisis potensi ancaman keamanan jaringan, pengawasan lalu lintas data, dan asistensi audit sistem informasi.',
    ARRAY[
        'Monitoring lalu lintas jaringan dan analisis anomali lalu lintas data.',
        'Identifikasi celah keamanan (vulnerability assessment) dan mitigasi risiko siber.',
        'Penyusunan rekomendasi penguatan arsitektur keamanan TI.',
        'Kolaborasi dalam penanganan insiden serta penyiapan dokumentasi audit keamanan.'
    ]
);

-- Insert Skills
INSERT INTO skills (category, name, icon_name, level) VALUES
('Pengembangan Web', 'Next.js', 'SiNextdotjs', 92),
('Pengembangan Web', 'React.js', 'SiReact', 95),
('Pengembangan Web', 'TypeScript', 'SiTypescript', 88),
('Pengembangan Web', 'JavaScript', 'SiJavascript', 90),
('Pengembangan Web', 'PHP', 'SiPhp', 85),
('Pengembangan Web', 'Laravel', 'SiLaravel', 86),
('Pengembangan Web', 'HTML', 'SiHtml5', 98),
('Pengembangan Web', 'CSS', 'SiCss3', 95),
('Pengembangan Web', 'Tailwind CSS', 'SiTailwindcss', 96),

('Basis Data', 'MySQL', 'SiMysql', 90),
('Basis Data', 'PostgreSQL', 'SiPostgresql', 88),
('Basis Data', 'Database Management', 'Database', 92),

('Keamanan Siber', 'Digital Forensics', 'ShieldAlert', 85),
('Keamanan Siber', 'Cybersecurity', 'ShieldCheck', 88),
('Keamanan Siber', 'Network Analysis', 'Activity', 87),
('Keamanan Siber', 'Wireshark', 'Radio', 90),
('Keamanan Siber', 'Autopsy', 'Search', 86),
('Keamanan Siber', 'FTK', 'Key', 84),

('Desain', 'UI/UX', 'Layout', 92),
('Desain', 'Figma', 'SiFigma', 94),
('Desain', 'Adobe Photoshop', 'SiAdobephotoshop', 86),
('Desain', 'Adobe Illustrator', 'SiAdobeillustrator', 82),

('Teknologi Informasi', 'Analisis Sistem', 'Cpu', 92),
('Teknologi Informasi', 'IT Support', 'Wrench', 94),
('Teknologi Informasi', 'Infrastruktur Jaringan', 'Server', 88),
('Teknologi Informasi', 'Troubleshooting', 'Terminal', 95),
('Teknologi Informasi', 'Pemeliharaan Sistem', 'Settings', 90);

-- Insert Projects
INSERT INTO projects (slug, title, short_description, overview, problem, solution, role, impact, year, image_url, github_url, demo_url, is_featured)
VALUES 
(
    'smart-lapas-bekasi',
    'Smart Lapas Bekasi',
    'Sistem monitoring dan manajemen digital berbasis web untuk optimalisasi operasional instansi.',
    'Smart Lapas Bekasi adalah sistem platform terpadu yang dirancang untuk mengintegrasikan pengawasan operasional, manajemen hunian, fasilitas umum, dan pemantauan infrastruktur keamanan secara realtime.',
    'Pengelolaan data fasilitas dan pemantauan operasional lapangan sebelumnya dilakukan secara manual dengan pencatatan fisik, memicu ketidakakuratan data dan respons kendala teknis yang lambat.',
    'Membangun platform web berbasis Next.js dan PostgreSQL dengan dashboard interaktif, sistem ticketing maintenance, pemantauan status CCTV, dan modul laporan otomatis.',
    'Full Stack Developer & System Analyst',
    'Meningkatkan efisiensi pelaporan operasional sebesar 70% dan mempercepat waktu tanggap penanganan teknis dari 2 hari menjadi 30 menit.',
    '2026',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/taufikrahman/smart-lapas-bekasi',
    'https://smartlapas-demo.vercel.app',
    true
),
(
    'spmb-smk-gpi',
    'Sistem Informasi PPDB Berbasis Web',
    'Platform pendaftaran siswa baru online SMK GPI Solokan Jeruk lengkap dengan verifikasi dokumen dan pembayaran.',
    'Sistem Informasi Penerimaan Peserta Didik Baru (PPDB) SMK GPI Solokan Jeruk menyajikan layanan pendaftaran terdigitalisasi penuh bagi calon siswa baru dan panitia seleksi sekolah.',
    'Proses pendaftaran fisik membutuhkan kehadiran langsung calon siswa, pengumpulan berkas kertas yang rentan hilang, serta pengolahan hasil seleksi yang memakan waktu lama.',
    'Merancang sistem aplikasi web responsive dengan fitur formulir online dinamis, unggah & verifikasi dokumen, gateway pencatatan pembayaran, dan generator bukti pendaftaran otomatis.',
    'Frontend & Full Stack Developer',
    'Memproses lebih dari 500+ pendaftar online tanpa kendala server dan menghemat pengeluaran percetakan formulir hingga 90%.',
    '2025',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/taufikrahman/ppdb-smk-gpi',
    'https://ppdb-smk-gpi.vercel.app',
    true
),
(
    'pelayanan-publik-digital',
    'Website Digitalisasi Pelayanan Publik',
    'Platform digital untuk meningkatkan efisiensi, keterbukaan, dan aksesibilitas layanan administrasi publik.',
    'Website portal layanan publik yang memungkinkan masyarakat mengajukan permohonan administrasi secara mandiri, melacak status dokumen secara realtime, dan mengakses transparansi informasi.',
    'Antrean fisik layanan administrasi publik yang panjang dan kurangnya transparansi alur status pengajuan surat warga.',
    'Mengembangkan platform portal publik dengan autentikasi aman, pelacak resi layanan live, dan pengarsipan digital terenkripsi.',
    'Lead Frontend Developer & UI/UX Designer',
    'Mengurangi durasi antrean tatap muka sebesar 80% dan mempermudah masyarakat mengakses layanan 24/7.',
    '2025',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/taufikrahman/pelayanan-publik',
    'https://layanan-publik-demo.vercel.app',
    true
),
(
    'monitoring-dapur-logistik',
    'Sistem Monitoring Dapur & Logistik',
    'Aplikasi pengawasan stok bahan pangan, perencanaan menu harian, dan manajemen logistik operasional.',
    'Aplikasi manajemen stok dan distribusi logistik dapur untuk memantau siklus pasokan bahan makanan, anggaran harian, dan efisiensi konsumsi.',
    'Ketidaksesuaian stok bahan makanan antara gudang dan dapur serta potensi pembengkakan sisa bahan baku yang kadaluarsa.',
    'Membuat sistem inventaris dengan algoritma FIFO (First In First Out), peringatan batas minimum stok, serta Dasbor visualisasi konsumsi bahan.',
    'Full Stack Developer',
    'Menurunkan angka pemborosan bahan pangan hingga 35% dan meningkatkan akurasi inventarisasi stok logistik.',
    '2025',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/taufikrahman/dapur-logistik',
    'https://dapur-logistik-demo.vercel.app',
    false
),
(
    'dashboard-keuangan-ecommerce',
    'Dashboard Keuangan E-Commerce',
    'Dasbor analitik finansial modern untuk melacak omzet, margin keuntungan, dan pengeluaran secara visual.',
    'Platform dashboard bisnis e-commerce yang mengolah data transaksi mentah menjadi visualisasi grafik interaktif finansial secara real-time.',
    'Kesulitan pemilik bisnis dalam menganalisis arus kas harian dan mengidentifikasi tren keuntungan produk secara cepat.',
    'Mengembangkan UI Dashboard intuitif menggunakan React, Tailwind CSS, dan Chart.js dengan filter tanggal dinamis serta ekspor data laporan PDF/Excel.',
    'Frontend Developer & Data Analyst',
    'Membantu manajemen membuat keputusan bisnis berbasis data 3x lebih cepat dengan tampilan metriks yang intuitif.',
    '2024',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/taufikrahman/ecommerce-financial-dashboard',
    'https://financial-dash-demo.vercel.app',
    false
);

-- Insert Project Features
INSERT INTO project_features (project_id, feature_text)
SELECT id, 'Dashboard pemantauan status fasilitas dan perangkat terintegrasi secara live.' FROM projects WHERE slug = 'smart-lapas-bekasi';
INSERT INTO project_features (project_id, feature_text)
SELECT id, 'Sistem pelaporan kendala teknis (ticketing maintenance) dengan prioritas otomatis.' FROM projects WHERE slug = 'smart-lapas-bekasi';
INSERT INTO project_features (project_id, feature_text)
SELECT id, 'Integrasi log pemantauan jaringan & CCTV untuk pengawasan area.' FROM projects WHERE slug = 'smart-lapas-bekasi';

INSERT INTO project_features (project_id, feature_text)
SELECT id, 'Formulir pendaftaran online responsif dengan validasi otomatis.' FROM projects WHERE slug = 'spmb-smk-gpi';
INSERT INTO project_features (project_id, feature_text)
SELECT id, 'Unggah dan verifikasi berkas administratif calon siswa.' FROM projects WHERE slug = 'spmb-smk-gpi';
INSERT INTO project_features (project_id, feature_text)
SELECT id, 'Dasbor panitia PPDB untuk verifikasi cepat dan cetak kartu peserta.' FROM projects WHERE slug = 'spmb-smk-gpi';

-- Insert Certificates
INSERT INTO certificates (title, issuer, year, credential_id, verification_url, image_url)
VALUES 
(
    'Certified Cybersecurity Analyst & Forensic Expert',
    'Siber Akademi Indonesia',
    '2025',
    'SAI-8849-2025',
    'https://siberakademi.id/verify/SAI-8849-2025',
    'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80'
),
(
    'Full Stack Web Development Professional',
    'Digital Talent Scholarship (Kominfo)',
    '2024',
    'DTS-2024-FSWD-1029',
    'https://digitalent.kominfo.go.id/verify/DTS-2024-FSWD-1029',
    'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80'
),
(
    'UI/UX Design Masterclass & Prototyping',
    'Figma Certification Program',
    '2024',
    'FIG-UIUX-99321',
    'https://figma.com/certificates/FIG-UIUX-99321',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
),
(
    'PostgreSQL Database Administrator Specialist',
    'Oracle & DB Academy',
    '2024',
    'DBA-PGSQL-2024-001',
    'https://dbacademy.org/verify/DBA-PGSQL-2024-001',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
);

-- Insert Testimonials
INSERT INTO testimonials (name, role, company, content, avatar_url)
VALUES 
(
    'Dr. H. Ahmad Fauzi, M.T.',
    'Kepala Program Studi Sistem Informasi',
    'Universitas Ma''soem',
    'Taufik Rahman adalah mahasiswa dengan dedikasi luar biasa. IPK 3,72 yang diraihnya mencerminkan pemahaman mendalam dalam analisis sistem dan rekayasa perangkat lunak. Proyek-proyeknya selalu solutif dan berkualitas tinggi.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
),
(
    'Bambang Sugiarto, S.H.',
    'Kepala Subbagian Umum',
    'Lapas Kelas IIA Bekasi',
    'Kerja keras Taufik selama magang sangat membantu instansi kami. Sistem monitoring dan digitalisasi fasilitas yang dibangunnya membuat pengelolaan TI dan operasional menjadi jauh lebih efisien dan modern.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
),
(
    'Rahmat Hidayat, S.T.',
    'Senior Digital Forensic Lead',
    'PT. Analyst Forensik Digital',
    'Taufik memiliki ketelitian tinggi dalam investigasi forensik digital dan analisis keamanan siber. Kemampuan analisis data dan penyusunan laporkannya sangat profesional.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
);
