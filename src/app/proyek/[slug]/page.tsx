import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, CheckCircle2, ShieldAlert, Lightbulb, Trophy, Layers, UserCheck } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { getProjectBySlug, getProjects } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <Link
            href="/#proyek"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mb-8 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            Kembali ke Beranda Proyek
          </Link>

          {/* Title & Metadata */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs">
                Tahun {project.year}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                Peran: {project.role}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {project.short_description}
            </p>
          </div>

          {/* Main Hero Banner Image */}
          <div className="relative w-full h-64 sm:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl mb-12 border border-slate-200 dark:border-slate-800">
            <Image
              src={project.image_url || (project.gallery && project.gallery[0])}
              alt={project.title}
              fill
              unoptimized={true}
              className="object-cover"
              priority
            />
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14 p-6 rounded-3xl glass-card">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
              >
                Uji Coba Demo Live
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Kode Sumber GitHub
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Content Sections Grid */}
          <div className="grid grid-cols-1 gap-8">
            
            {/* Gambaran Proyek */}
            <section className="glass-card p-6 sm:p-8 rounded-3xl">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-blue-600" />
                Gambaran Proyek
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* Permasalahan & Solusi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="glass-card p-6 sm:p-8 rounded-3xl border-l-4 border-l-rose-500">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  Permasalahan
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.problem}
                </p>
              </section>

              <section className="glass-card p-6 sm:p-8 rounded-3xl border-l-4 border-l-emerald-500">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-emerald-500" />
                  Solusi
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.solution}
                </p>
              </section>
            </div>

            {/* Fitur Utama */}
            {project.features && project.features.length > 0 && (
              <section className="glass-card p-6 sm:p-8 rounded-3xl">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  Fitur Utama
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Teknologi & Peran */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.technologies && project.technologies.length > 0 && (
                <section className="glass-card p-6 sm:p-8 rounded-3xl">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    Teknologi
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold text-xs sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <section className="glass-card p-6 sm:p-8 rounded-3xl">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-500" />
                  Peran Saya
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-bold">
                  {project.role}
                </p>
              </section>
            </div>

            {/* Hasil / Dampak */}
            <section className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/30">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                Hasil & Dampak
              </h2>
              <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base font-semibold leading-relaxed">
                {project.impact}
              </p>
            </section>

            {/* Galeri Tampilan */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="glass-card p-6 sm:p-8 rounded-3xl">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Galeri Tangkapan Layar
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((imgUrl, gIdx) => (
                    <div key={gIdx} className="relative h-48 rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src={imgUrl}
                        alt={`Galeri ${project.title} ${gIdx + 1}`}
                        fill
                        unoptimized={true}
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
