'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { EducationItem } from '@/lib/data';

interface EducationProps {
  educationList: EducationItem[];
}

export default function Education({ educationList }: EducationProps) {
  return (
    <section id="pendidikan" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider mb-3"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Pendidikan</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Riwayat <span className="gradient-text">Pendidikan Akademik</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto">
          {educationList.map((edu, index) => (
            <motion.div
              key={edu.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pl-6 sm:pl-10 border-l-2 border-blue-500/30 dark:border-blue-500/20 pb-12 last:pb-0"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 border-4 border-white dark:border-slate-950">
                <GraduationCap className="w-4 h-4" />
              </div>

              {/* Card content */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-xs mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.start_year} – {edu.end_year}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {edu.institution}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {edu.major} • {edu.faculty}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-extrabold text-sm sm:text-base shrink-0">
                    <Award className="w-5 h-5 text-emerald-500" />
                    <span>IPK: {edu.gpa}</span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {edu.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    Sistem Informasi Web
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    Analisis & Desain Sistem
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    Keamanan Siber & Basis Data
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
