'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TestimonialItem } from '@/lib/data';

interface TestimonialsProps {
  testimonialsList: TestimonialItem[];
}

export default function Testimonials({ testimonialsList }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const current = testimonialsList[currentIndex];

  if (!current) return null;

  return (
    <section id="testimoni" className="py-20 md:py-28 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
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
            <MessageSquareQuote className="w-4 h-4" />
            <span>Testimoni</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Apa Kata <span className="gradient-text">Mereka</span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Avatar Photo */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-blue-500/30">
                <Image
                  src={current.avatar_url}
                  alt={current.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Quote & Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-lg italic leading-relaxed mb-6 font-medium">
                  "{current.content}"
                </p>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {current.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {current.role} • {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {testimonialsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
