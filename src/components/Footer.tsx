'use client';

import React from 'react';
import Link from 'next/link';
import { Code2, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-base">
                Taufik Rahman, S.Kom
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Full Stack Developer & Cybersecurity Specialist
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <a href="#beranda" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Beranda</a>
            <span>•</span>
            <a href="#tentang" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tentang Saya</a>
            <span>•</span>
            <a href="#pendidikan" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pendidikan</a>
            <span>•</span>
            <a href="#keahlian" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Keahlian</a>
            <span>•</span>
            <a href="#proyek" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Proyek</a>
            <span>•</span>
            <a href="#kontak" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Kontak</a>
          </div>

          {/* Right Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/taufikrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/taufik-rahman-a89704109"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:taufikrahman140@gmail.com"
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-900 text-center text-xs text-slate-500 dark:text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {year} Taufik Rahman, S.Kom. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1">
            Dibuat menggunakan Next.js, Tailwind CSS & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
