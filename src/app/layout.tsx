import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Taufik Rahman, S.Kom | Full Stack Developer',
  description:
    'Portfolio Taufik Rahman, S.Kom — Lulusan Sistem Informasi, Full Stack Developer, Frontend Developer, UI/UX Enthusiast, dan Cybersecurity Enthusiast.',
  keywords: [
    'Taufik Rahman',
    'Full Stack Developer',
    'Frontend Developer',
    'UI/UX Enthusiast',
    'Cybersecurity Enthusiast',
    'Universitas Ma\'soem',
    'Sistem Informasi',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'PostgreSQL',
    'Supabase',
  ],
  authors: [{ name: 'Taufik Rahman, S.Kom' }],
  creator: 'Taufik Rahman, S.Kom',
  openGraph: {
    title: 'Taufik Rahman, S.Kom | Full Stack Developer',
    description:
      'Portfolio Taufik Rahman, S.Kom — Lulusan Sistem Informasi Universitas Ma\'soem, Full Stack Developer, & Cybersecurity Enthusiast.',
    url: 'https://taufikrahman.vercel.app',
    siteName: 'Taufik Rahman Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Taufik Rahman, S.Kom Portfolio',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taufik Rahman, S.Kom | Full Stack Developer',
    description:
      'Portfolio Taufik Rahman, S.Kom — Lulusan Sistem Informasi, Full Stack Developer, dan Keamanan Siber.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Taufik Rahman, S.Kom',
    jobTitle: 'Full Stack Developer & System Analyst',
    alumniOf: 'Universitas Ma\'soem',
    description:
      'Lulusan Sistem Informasi Universitas Ma\'soem dengan pengalaman di bidang pengembangan web, analisis sistem, UI/UX, dan keamanan siber.',
    knowsAbout: [
      'Next.js',
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Supabase',
      'Cybersecurity',
      'Digital Forensics',
    ],
    email: 'taufikrahman140@gmail.com',
    telephone: '082214139962',
    sameAs: [
      'https://linkedin.com/in/taufik-rahman-a89704109',
      'https://github.com/taufikrahman',
    ],
  };

  return (
    <html lang="id" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
