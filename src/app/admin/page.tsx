'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Briefcase,
  Sparkles,
  FolderGit2,
  Award,
  MessageSquareQuote,
  Mail,
  BarChart3,
  LogOut,
  Menu,
  X,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Code2,
  Eye,
} from 'lucide-react';
import {
  fallbackProfile,
  fallbackEducation,
  fallbackExperiences,
  fallbackSkills,
  fallbackProjects,
  fallbackCertificates,
  fallbackTestimonials,
  getProfile,
  getEducation,
  getExperiences,
  getSkills,
  getProjects,
  getCertificates,
  getTestimonials,
  saveProfile,
  saveEducation,
  saveExperiences,
  saveSkills,
  saveProjects,
  saveCertificates,
  saveTestimonials,
  syncAllAdminData,
  Profile,
  EducationItem,
  ExperienceItem,
  SkillItem,
  ProjectItem,
  CertificateItem,
  TestimonialItem,
  ContactMessage,
} from '@/lib/data';

type AdminTab =
  | 'profil'
  | 'pendidikan'
  | 'pengalaman'
  | 'keahlian'
  | 'proyek'
  | 'sertifikat'
  | 'testimoni'
  | 'pesan'
  | 'statistik';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('profil');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Editable State
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [education, setEducation] = useState<EducationItem[]>(fallbackEducation);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(fallbackExperiences);
  const [skills, setSkills] = useState<SkillItem[]>(fallbackSkills);
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [certificates, setCertificates] = useState<CertificateItem[]>(fallbackCertificates);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    // Check local storage for auth and messages
    const authStatus = sessionStorage.getItem('taufik_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const loadAdminData = async () => {
      const [p, edu, exp, sk, proj, cert, test] = await Promise.all([
        getProfile(),
        getEducation(),
        getExperiences(),
        getSkills(),
        getProjects(),
        getCertificates(),
        getTestimonials(),
      ]);
      setProfile(p);
      setEducation(edu);
      setExperiences(exp);
      setSkills(sk);
      setProjects(proj);
      setCertificates(cert);
      setTestimonials(test);

      const savedMsgs = JSON.parse(localStorage.getItem('taufik_portfolio_messages') || '[]');
      setMessages(savedMsgs);
    };

    loadAdminData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'taufik2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('taufik_admin_auth', 'true');
    } else {
      alert('Password salah. Gunakan: admin123 atau taufik2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('taufik_admin_auth');
  };

  const triggerSaveNotification = async () => {
    await syncAllAdminData({
      profile,
      education,
      experiences,
      skills,
      projects,
      certificates,
      testimonials,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Code2 className="w-7 h-7" />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-white text-center mb-2">
            Dasbor Admin Taufik
          </h1>
          <p className="text-xs text-slate-400 text-center mb-6">
            Masukkan kata sandi administrator untuk mengelola data portfolio.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Kata Sandi Admin
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
            >
              Masuk Dasbor
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-blue-400 hover:underline">
              ← Kembali ke Website Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'pendidikan', label: 'Pendidikan', icon: GraduationCap },
    { id: 'pengalaman', label: 'Pengalaman', icon: Briefcase },
    { id: 'keahlian', label: 'Keahlian', icon: Sparkles },
    { id: 'proyek', label: 'Proyek', icon: FolderGit2 },
    { id: 'sertifikat', label: 'Sertifikat', icon: Award },
    { id: 'testimoni', label: 'Testimoni', icon: MessageSquareQuote },
    { id: 'pesan', label: `Pesan (${messages.length})`, icon: Mail },
    { id: 'statistik', label: 'Statistik Pengunjung', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <h2 className="font-bold text-sm text-white">Dasbor Admin</h2>
                <p className="text-[10px] text-slate-400">Taufik Rahman, S.Kom</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-xs transition-colors"
          >
            <Eye className="w-4 h-4" />
            Lihat Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 font-semibold text-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-white capitalize">
              Manajemen {activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {savedNotice && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" /> Perubahan Disimpan!
              </span>
            )}
            <button
              onClick={triggerSaveNotification}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
            >
              <Save className="w-4 h-4" /> Simpan Semua
            </button>
          </div>
        </header>

        {/* Tab Content Panel */}
        <main className="p-4 sm:p-8 overflow-y-auto flex-1">
          {/* 1. Tab Profil */}
          {activeTab === 'profil' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Informasi Profil Utama</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Perguruan Tinggi</label>
                  <input
                    type="text"
                    value={profile.university}
                    onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">IPK</label>
                  <input
                    type="text"
                    value={profile.gpa}
                    onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Email</label>
                  <input
                    type="text"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Judul / Headline</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Deskripsi Singkat (Bio)</label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>
            </div>
          )}

          {/* 2. Tab Pendidikan */}
          {activeTab === 'pendidikan' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Riwayat Pendidikan</h2>
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].institution = e.target.value;
                        setEducation(updated);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                      placeholder="Nama Instansi"
                    />
                    <input
                      type="text"
                      value={edu.major}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].major = e.target.value;
                        setEducation(updated);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                      placeholder="Program Studi"
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={edu.description}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[idx].description = e.target.value;
                      setEducation(updated);
                    }}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 3. Tab Pengalaman */}
          {activeTab === 'pengalaman' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Kelola Pengalaman Kerja</h2>
                <button
                  onClick={() =>
                    setExperiences([
                      ...experiences,
                      {
                        id: `exp-${Date.now()}`,
                        role: 'Posisi Baru',
                        company: 'Instansi / Perusahaan',
                        period: '2026',
                        location: 'Indonesia',
                        description: 'Deskripsi pekerjaan...',
                        responsibilities: ['Tanggung jawab 1'],
                      },
                    ])
                  }
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Tambah Pengalaman
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].role = e.target.value;
                          setExperiences(updated);
                        }}
                        className="font-bold text-white bg-transparent border-b border-slate-700 px-2 py-1 text-base w-full max-w-md"
                      />
                      <button
                        onClick={() => setExperiences(experiences.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].company = e.target.value;
                          setExperiences(updated);
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].period = e.target.value;
                          setExperiences(updated);
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Tab Keahlian */}
          {activeTab === 'keahlian' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Kelola Keahlian & Level</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">{skill.category}</span>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => {
                        const updated = [...skills];
                        updated[idx].name = e.target.value;
                        setSkills(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold text-sm border border-slate-700"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={skill.level}
                        onChange={(e) => {
                          const updated = [...skills];
                          updated[idx].level = Number(e.target.value);
                          setSkills(updated);
                        }}
                        className="flex-1"
                      />
                      <span className="text-xs font-bold text-slate-300">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Tab Proyek */}
          {activeTab === 'proyek' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Daftar Proyek Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
                    <h3 className="font-bold text-white text-base">{proj.title}</h3>
                    <p className="text-xs text-slate-400">{proj.short_description}</p>
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-400">
                      <span>Peran: {proj.role}</span>
                      <Link href={`/proyek/${proj.slug}`} target="_blank" className="hover:underline">
                        Lihat Preview →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Tab Sertifikat */}
          {activeTab === 'sertifikat' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Daftar Sertifikat & Penghargaan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                    <p className="font-bold text-white text-sm">{cert.title}</p>
                    <p className="text-xs text-blue-400">{cert.issuer} ({cert.year})</p>
                    <p className="text-[11px] text-slate-400 font-mono">ID: {cert.credential_id}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Tab Testimoni */}
          {activeTab === 'testimoni' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Testimoni Klien & Rekan Kerja</h2>
              <div className="space-y-4">
                {testimonials.map((test, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                    <p className="font-bold text-white text-sm">{test.name} - <span className="text-blue-400 font-normal">{test.role} ({test.company})</span></p>
                    <p className="text-xs text-slate-300 italic">"{test.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. Tab Pesan */}
          {activeTab === 'pesan' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Pesan Kontak Masuk ({messages.length})</h2>
              {messages.length === 0 ? (
                <p className="text-slate-400 text-xs italic">Belum ada pesan masuk saat ini.</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{msg.name} ({msg.email})</span>
                        <span className="text-[10px] text-slate-400">{msg.created_at ? new Date(msg.created_at).toLocaleDateString('id-ID') : 'Baru'}</span>
                      </div>
                      <p className="text-xs font-bold text-blue-400">Subjek: {msg.subject}</p>
                      <p className="text-xs text-slate-300">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 9. Tab Statistik */}
          {activeTab === 'statistik' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Statistik Pengunjung Website</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
                  <p className="text-xs text-slate-400 font-bold uppercase">Total Pengunjung</p>
                  <p className="text-3xl font-extrabold text-white mt-2">1.248</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
                  <p className="text-xs text-slate-400 font-bold uppercase">Tampilan Halaman</p>
                  <p className="text-3xl font-extrabold text-blue-400 mt-2">3.890</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
                  <p className="text-xs text-slate-400 font-bold uppercase">Pesan Kontak</p>
                  <p className="text-3xl font-extrabold text-emerald-400 mt-2">{messages.length}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
