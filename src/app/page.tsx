import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AiAssistant from '@/components/AiAssistant';

import {
  getProfile,
  getEducation,
  getExperiences,
  getSkills,
  getProjects,
  getCertificates,
  getTestimonials,
} from '@/lib/data';

export const revalidate = 3600; // Revalidate data hourly

export default async function HomePage() {
  const [
    profile,
    education,
    experiences,
    skills,
    projects,
    certificates,
    testimonials,
  ] = await Promise.all([
    getProfile(),
    getEducation(),
    getExperiences(),
    getSkills(),
    getProjects(),
    getCertificates(),
    getTestimonials(),
  ]);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <About profile={profile} />
        <Education educationList={education} />
        <Skills skillsList={skills} />
        <Experience experienceList={experiences} />
        <Projects projectsList={projects} />
        <Certificates certificatesList={certificates} />
        <Testimonials testimonialsList={testimonials} />
        <Contact profile={profile} />
      </main>

      <Footer />

      {/* Floating AI Assistant Widget */}
      <AiAssistant
        profile={profile}
        education={education}
        experiences={experiences}
        skills={skills}
        projects={projects}
      />
    </div>
  );
}
