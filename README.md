# Website Portofolio Taufik Rahman, S.Kom

Aplikasi web portofolio interaktif dan modern **Taufik Rahman, S.Kom** — Lulusan Sistem Informasi Universitas Ma'soem (IPK 3,72 / 4,00), Full Stack Developer, & Cybersecurity Specialist.

Website dibangun dengan pendekatan **Mobile First, Fully Responsive, Modern, Premium, Interaktif, dan Profesional** dengan antarmuka 100% menggunakan **Bahasa Indonesia**.

---

## 🛠️ Teknologi Yang Penggunaannya Digunakan

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animasi**: [Framer Motion](https://framer.com/motion)
- **Database & Auth**: [Supabase (PostgreSQL & Storage)](https://supabase.com/)
- **Icon**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.app/)
- **Repository**: [GitHub](https://github.com/)

---

## 🚀 Fitur Utama

1. **Antarmuka Bahasa Indonesia**: Seluruh teks antarmuka menggunakan Bahasa Indonesia profesional & natural.
2. **Hero Interaktif**: Background animated gradient, floating technology icons, dan visual kartu profil modern.
3. **Asisten AI Taufik**: Character AI digital assistant interaktif yang dapat menjawab pertanyaan seputar CV Taufik Rahman.
4. **Responsif Multi-Device**: Dioptimalkan dari smartphone layar kecil (320px) hingga widescreen (1920px+).
5. **Detail Proyek Dinamis (`/proyek/[slug]`)**: Gambaran proyek, permasalahan, solusi, fitur, teknologi, peran, hasil, dan galeri.
6. **Modal Sertifikat Interactive**: Preview sertifikat resmi dengan link verifikasi kredensial.
7. **Testimonial Carousel**: Slide testimoni responsif dengan rating bintang.
8. **Dasbor Admin (`/admin`)**: Manajemen CRUD terintegrasi untuk Profil, Pendidikan, Pengalaman, Keahlian, Proyek, Sertifikat, Testimoni, Pesan, dan Statistik.
9. **Dark Mode & Light Mode**: Toggle tema persistent dengan `localStorage`.
10. **Dual-Mode Data Architecture**: Bekerja out-of-the-box menggunakan local fallback data maupun terkoneksi live ke Supabase PostgreSQL.

---

## 📦 Instalasi & Jalankan Secara Lokal

```bash
# 1. Clone repository
git clone https://github.com/taufikrahman/portfolio-taufik-rahman.git

# 2. Masuk ke direktori
cd portfolio-taufik-rahman

# 3. Install dependensi
npm install

# 4. Salin file environment
cp .env.example .env.local

# 5. Jalankan server pengembang
npm run dev
```

Buka `http://localhost:3000` pada peramban Anda.

---

## 🗄️ Konfigurasi Supabase PostgreSQL

1. Buat proyek baru di [Supabase Console](https://supabase.com).
2. Jalankan skrip di SQL Editor Supabase:
   - `database/schema.sql` (Membuat tabel & relasi)
   - `database/seed.sql` (Mengisi data awal CV Taufik Rahman)
3. Ambil `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` lalu masukkan ke file `.env.local` atau Pengaturan Environment Variables di Vercel.

---

## 📝 Hak Cipta

© 2026 Taufik Rahman, S.Kom. Hak Cipta Dilindungi Undang-Undang.
