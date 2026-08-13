'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, FolderGit2, ShieldCheck, GraduationCap, User, CheckCircle2 } from 'lucide-react';
import { Profile } from '@/lib/data';

interface AboutProps {
  profile: Profile;
}

const stats = [
  {
    icon: GraduationCap,
    label: 'IPK Akademik',
    value: '3,72',
    sub: 'Universitas Ma\'soem',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Briefcase,
    label: 'Pengalaman Pengabdian',
    value: '5+',
    sub: 'Tahun Pengalaman',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: FolderGit2,
    label: 'Proyek Selesai',
    value: '10+',
    sub: 'Aplikasi & Sistem',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: ShieldCheck,
    label: 'Spesialisasi Utama',
    value: 'IT & Cyber',
    sub: 'Keamanan Siber & Web',
    color: 'from-emerald-500 to-teal-600',
  },
];

const highlights = [
  'Lulusan Program Studi Sistem Informasi, Universitas Ma\'soem',
  'Pengalaman dalam Investigasi Forensik Digital & Cyber Security Analyst',
  'Pengembangan Sistem Informasi & Digitalisasi Layanan Instansi Publik',
  'Desain UI/UX Modern yang Berfokus pada Kemudahan Pengguna (Usability)',
  'Pengelolaan Basis Data PostgreSQL, MySQL, serta Infrastruktur TI',
];

export default function About({ profile }: AboutProps) {
  return (
    <section id="tentang" className="py-20 md:py-28 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider mb-3"
          >
            <User className="w-4 h-4" />
            <span>Tentang Saya</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Mengenal Lebih Dekat <span className="gradient-text">Taufik Rahman</span>
          </motion.h2>
        </div>

        {/* Animated Counter Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/10`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {stat.sub}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Profile Details & Core Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Bio Description Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Profil & Latar Belakang Professional
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {profile.bio}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Sebagai lulusan **Universitas Ma'soem** di Program Studi Sistem Informasi dengan IPK **3,72**, saya memiliki kombinasi keahlian teknis dalam rekayasa perangkat lunak modern (Next.js, React, Laravel) serta pemahaman analisis sistem dan keahlian siber yang teruji.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs">
                  IPK
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Predikat Kelulusan</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">3,72 / 4,00 (Sangat Memuaskan)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  UNIV
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Perguruan Tinggi</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Universitas Ma'soem</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights & Key Competencies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Fokus Utama Keahlian
              </h3>
              <ul className="space-y-4">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Visi Kerja</p>
                <p className="text-xs sm:text-sm font-medium mt-1">
                  "Menghadirkan aplikasi web dan sistem informasi yang aman, berkinerja tinggi, dan memberikan dampak nyata bagi pengguna."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
