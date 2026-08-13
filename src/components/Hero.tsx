'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Send, ArrowRight, ShieldCheck, Sparkles, Code, Cpu, Database, Server } from 'lucide-react';
import Image from 'next/image';

const floatingIcons = [
  { icon: Code, name: 'Next.js', color: 'from-slate-700 to-slate-900', top: '12%', left: '8%' },
  { icon: Cpu, name: 'React', color: 'from-cyan-500 to-blue-600', top: '25%', right: '10%' },
  { icon: Database, name: 'PostgreSQL', color: 'from-blue-600 to-indigo-700', bottom: '20%', left: '10%' },
  { icon: Server, name: 'Supabase', color: 'from-emerald-500 to-teal-700', bottom: '15%', right: '12%' },
  { icon: ShieldCheck, name: 'Cybersecurity', color: 'from-purple-600 to-indigo-600', top: '48%', left: '4%' },
];

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="beranda" className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden bg-grid-pattern min-h-[90vh] flex items-center">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-tr from-cyan-500/15 to-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Lulusan Sistem Informasi • Full Stack Developer</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            </motion.div>

            {/* Main Greeting Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
              Halo, Saya{' '}
              <span className="gradient-text font-black">
                Taufik Rahman
              </span>{' '}
              👋
            </h1>

            {/* Subtitle Role */}
            <h2 className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-slate-200 mb-6">
              Lulusan Sistem Informasi & Full Stack Developer
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Saya adalah lulusan Sistem Informasi yang memiliki pengalaman dalam pengembangan aplikasi web, analisis sistem, UI/UX, teknologi informasi, dan keamanan siber. Saya senang membangun solusi digital yang modern, efektif, dan mudah digunakan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('proyek')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Lihat Proyek
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/documents/CV_Taufik_Rahman.pdf"
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base border border-slate-200 dark:border-slate-800 shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Unduh CV
              </a>

              <button
                onClick={() => scrollToSection('kontak')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm sm:text-base transition-all duration-200"
              >
                <Send className="w-4 h-4 text-indigo-500" />
                Hubungi Saya
              </button>
            </div>
          </motion.div>

          {/* Right Profile & Visual Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Outer Glowing Circle Ring */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Rotating Border Aura */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 opacity-75 blur-xl animate-pulse" />

              {/* Profile Card Frame */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card border-2 border-white/30 dark:border-slate-700/50 shadow-2xl p-3 flex flex-col justify-between">
                <div className="relative w-full h-[82%] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                    alt="Foto Profil Taufik Rahman, S.Kom"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  {/* Inner Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Sistem Informasi</p>
                    <p className="text-sm font-bold text-white">Universitas Ma'soem • IPK 3,72</p>
                  </div>
                </div>

                {/* Card Footer Badge */}
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Tersedia untuk Proyek</span>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2026</span>
                </div>
              </div>
            </div>

            {/* Floating Tech Badges around Profile */}
            {floatingIcons.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + idx, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                  className="absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border border-slate-200/80 dark:border-slate-800/80 z-20"
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xs`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
