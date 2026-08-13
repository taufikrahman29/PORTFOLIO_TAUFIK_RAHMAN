'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, ShieldAlert, Palette, Cpu, Sparkles } from 'lucide-react';
import { SkillItem } from '@/lib/data';

interface SkillsProps {
  skillsList: SkillItem[];
}

const categories = [
  { name: 'Pengembangan Web', icon: Code2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Basis Data', icon: Database, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { name: 'Keamanan Siber', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { name: 'Desain', icon: Palette, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Teknologi Informasi', icon: Cpu, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

export default function Skills({ skillsList }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Pengembangan Web');

  const filteredSkills = skillsList.filter((s) => s.category === activeCategory);

  return (
    <section id="keahlian" className="py-20 md:py-28 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-4 h-4" />
            <span>Keahlian & Spesialisasi</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Teknologi & <span className="gradient-text">Kompetensi Teknis</span>
          </motion.h2>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 min-h-[44px] ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : cat.color}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id || index}
              className="glass-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between group hover:border-blue-500/40"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {skill.name}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
