'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Upload,
  AlertCircle,
  Star,
  ExternalLink,
  Tag,
  ImageIcon,
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
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
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

const popularTechSuggestions = [
  'Laravel',
  'PHP',
  'React.js',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'MySQL',
  'PostgreSQL',
  'Tailwind CSS',
  'HTML',
  'CSS',
  'Bootstrap',
  'Figma',
  'Chart.js',
  'Supabase',
];

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('proyek');
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
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Project Modal & Form State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<ProjectItem | null>(null);
  const [projectFormError, setProjectFormError] = useState<string | null>(null);
  const [newTechInput, setNewTechInput] = useState('');
  const [directImageUrlInput, setDirectImageUrlInput] = useState('');

  const [projectForm, setProjectForm] = useState<ProjectItem>({
    id: '',
    slug: '',
    title: '',
    short_description: '',
    overview: '',
    problem: '',
    solution: '',
    role: '',
    impact: '',
    year: new Date().getFullYear().toString(),
    category: 'Pengembangan Web',
    client: '',
    image_url: '',
    github_url: '',
    demo_url: '',
    is_featured: false,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    gallery: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    ],
  });

  useEffect(() => {
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

  const showToast = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3500);
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
    showToast('Seluruh data berhasil disimpan.');
  };

  // Open Modal for Creating New Project
  const openCreateProjectModal = () => {
    setEditingProject(null);
    setProjectFormError(null);
    setProjectForm({
      id: '',
      slug: '',
      title: '',
      short_description: '',
      overview: '',
      problem: '',
      solution: '',
      role: 'Full Stack Developer',
      impact: '',
      year: new Date().getFullYear().toString(),
      category: 'Pengembangan Web',
      client: '',
      image_url: '',
      github_url: '',
      demo_url: '',
      is_featured: false,
      technologies: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'],
      gallery: [
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      ],
    });
    setIsProjectModalOpen(true);
  };

  // Open Modal for Editing Project
  const openEditProjectModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjectFormError(null);
    const galleryList = proj.gallery && proj.gallery.length > 0 ? [...proj.gallery] : [proj.image_url];
    setProjectForm({
      ...proj,
      category: proj.category || 'Pengembangan Web',
      technologies: proj.technologies ? [...proj.technologies] : [],
      gallery: galleryList,
    });
    setIsProjectModalOpen(true);
  };

  // Handle Multi Image Upload Convert to Data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setProjectFormError(null);
    const newImages: string[] = [...projectForm.gallery];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate File Size (Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setProjectFormError(`Ukuran file "${file.name}" melebihi 5MB.`);
        return;
      }

      // Validate Image Type
      if (!file.type.startsWith('image/')) {
        setProjectFormError(`File "${file.name}" harus berupa gambar (JPG, PNG, WebP).`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          if (newImages.length < 4) {
            newImages.push(event.target.result as string);
            setProjectForm((prev) => ({
              ...prev,
              gallery: [...newImages],
              image_url: newImages[0],
            }));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Direct Image URL Add
  const handleAddDirectImageUrl = () => {
    if (!directImageUrlInput.trim()) return;
    if (projectForm.gallery.length >= 4) {
      setProjectFormError('Maksimal 4 gambar per proyek.');
      return;
    }
    const updated = [...projectForm.gallery, directImageUrlInput.trim()];
    setProjectForm({
      ...projectForm,
      gallery: updated,
      image_url: updated[0],
    });
    setDirectImageUrlInput('');
    setProjectFormError(null);
  };

  // Remove Single Image
  const handleRemoveImage = (indexToRemove: number) => {
    const updated = projectForm.gallery.filter((_, idx) => idx !== indexToRemove);
    setProjectForm({
      ...projectForm,
      gallery: updated,
      image_url: updated.length > 0 ? updated[0] : '',
    });
  };

  // Handle Adding Technology Badge Tag
  const handleAddTechTag = (techName: string) => {
    const tech = techName.trim();
    if (!tech) return;
    if (projectForm.technologies?.includes(tech)) return;
    setProjectForm({
      ...projectForm,
      technologies: [...(projectForm.technologies || []), tech],
    });
    setNewTechInput('');
  };

  const handleRemoveTechTag = (techToRemove: string) => {
    setProjectForm({
      ...projectForm,
      technologies: projectForm.technologies?.filter((t) => t !== techToRemove),
    });
  };

  // Save Project Form Submit (Create or Update)
  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectFormError(null);

    // Validation Rules
    if (!projectForm.title.trim()) {
      setProjectFormError('Nama proyek wajib diisi.');
      return;
    }
    if (!projectForm.short_description.trim()) {
      setProjectFormError('Deskripsi proyek wajib diisi.');
      return;
    }
    if (projectForm.gallery.length < 3 || projectForm.gallery.length > 4) {
      setProjectFormError('Minimal 3 gambar dan maksimal 4 gambar wajib diupload per proyek.');
      return;
    }

    try {
      let res;
      if (editingProject) {
        res = await updateProjectApi(projectForm);
      } else {
        res = await createProjectApi(projectForm);
      }

      if (res && res.success) {
        showToast('Proyek berhasil disimpan.');
        setIsProjectModalOpen(false);

        // Refresh project list
        const updatedProjects = await getProjects();
        setProjects(updatedProjects);
      } else {
        setProjectFormError(res?.error || 'Gagal menyimpan proyek.');
      }
    } catch (err: any) {
      setProjectFormError(err.message || 'Terjadi kesalahan sistem saat menyimpan proyek.');
    }
  };

  // Delete Project Action
  const handleDeleteProject = async (proj: ProjectItem) => {
    try {
      const res = await deleteProjectApi(proj.id);
      if (res && res.success) {
        showToast('Proyek berhasil dihapus.');
        setDeleteConfirmProject(null);
        const updatedProjects = await getProjects();
        setProjects(updatedProjects);
      } else {
        alert(res?.error || 'Gagal menghapus proyek.');
      }
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus proyek.');
    }
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
    { id: 'proyek', label: `Manajemen Proyek (${projects.length})`, icon: FolderGit2 },
    { id: 'profil', label: 'Profil Utama', icon: User },
    { id: 'pendidikan', label: 'Pendidikan', icon: GraduationCap },
    { id: 'pengalaman', label: 'Pengalaman', icon: Briefcase },
    { id: 'keahlian', label: 'Keahlian', icon: Sparkles },
    { id: 'sertifikat', label: 'Sertifikat', icon: Award },
    { id: 'testimoni', label: 'Testimoni', icon: MessageSquareQuote },
    { id: 'pesan', label: `Pesan Masuk (${messages.length})`, icon: Mail },
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
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-white capitalize">
              {activeTab === 'proyek' ? 'Manajemen Proyek Portofolio' : `Manajemen ${activeTab}`}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {savedNotice && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" /> {savedNotice}
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

        <main className="p-4 sm:p-8 overflow-y-auto flex-1">
          {/* TAB 1: MANAJEMEN PROYEK (FULL CRUD) */}
          {activeTab === 'proyek' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Kelola Daftar Proyek Portfolio</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Tambah, edit, upload 3-4 gambar, dan sinkronkan proyek secara real-time ke website publik.
                  </p>
                </div>
                <button
                  onClick={openCreateProjectModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 active:scale-95 transition-all shrink-0 min-h-[44px]"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Proyek Baru
                </button>
              </div>

              {/* Projects Grid List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id || proj.slug}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="relative w-full h-48 bg-slate-800">
                        <Image
                          src={proj.image_url || (proj.gallery && proj.gallery[0]) || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'}
                          alt={proj.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
                          {proj.is_featured && (
                            <span className="px-2.5 py-1 rounded-full bg-blue-600/90 text-white font-bold text-[10px] backdrop-blur-md flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" /> Unggulan
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded-full bg-black/60 text-white font-semibold text-[10px] backdrop-blur-md">
                            {proj.year}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                          {proj.category || 'Pengembangan Web'}
                        </span>
                        <h3 className="font-bold text-white text-lg mb-2">{proj.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {proj.short_description}
                        </p>

                        {/* Technology Badges */}
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {proj.technologies.map((t, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-[11px] text-slate-500 font-medium">
                          📷 {proj.gallery ? proj.gallery.length : 1} Gambar Terupload
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
                      <Link
                        href={`/proyek/${proj.slug}`}
                        target="_blank"
                        className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
                      >
                        Preview <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditProjectModal(proj)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1 transition-colors min-h-[36px]"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-400" /> Edit
                        </button>

                        <button
                          onClick={() => setDeleteConfirmProject(proj)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center gap-1 transition-colors min-h-[36px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROFIL */}
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
                <label className="block text-xs font-bold text-slate-400 mb-1">Bio / Deskripsi</label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>
            </div>
          )}

          {/* TAB 3: PENDIDIKAN */}
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

          {/* TAB 4: PENGALAMAN */}
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

          {/* TAB 5: KEAHLIAN */}
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

          {/* TAB 6: SERTIFIKAT */}
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

          {/* TAB 7: TESTIMONI */}
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

          {/* TAB 8: PESAN */}
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

          {/* TAB 9: STATISTIK */}
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

      {/* PROJECT FORM MODAL (ADD & EDIT) */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingProject ? 'Edit Informasi Proyek' : 'Tambah Proyek Baru'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Isi detail proyek, tambahkan 3-4 gambar, dan tentukan teknologi yang digunakan.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProjectForm} className="p-6 overflow-y-auto space-y-6 flex-1">
              {projectFormError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{projectFormError}</span>
                </div>
              )}

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nama / Judul Proyek <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="Contoh: Smart Lapas Bekasi"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Kategori Proyek
                  </label>
                  <select
                    value={projectForm.category || 'Pengembangan Web'}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pengembangan Web">Pengembangan Web</option>
                    <option value="Aplikasi Mobile">Aplikasi Mobile</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Dashboard Analitik">Dashboard Analitik</option>
                    <option value="Keamanan Siber">Keamanan Siber & Digital Forensics</option>
                    <option value="Desain UI/UX">Desain UI/UX</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Deskripsi Singkat Proyek <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.short_description}
                  onChange={(e) => setProjectForm({ ...projectForm, short_description: e.target.value })}
                  placeholder="Ringkasan singkat yang tampil pada kartu proyek publik..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tahun Proyek</label>
                  <input
                    type="text"
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Client / Instansi (Opsional)</label>
                  <input
                    type="text"
                    value={projectForm.client || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    placeholder="Contoh: Lapas Kelas IIA Bekasi"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Peran Saya</label>
                  <input
                    type="text"
                    value={projectForm.role}
                    onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                    placeholder="Full Stack Developer"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Link Live Demo / Website (Opsional)</label>
                  <input
                    type="url"
                    value={projectForm.demo_url}
                    onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                    placeholder="https://demo-app.vercel.app"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Link Repository GitHub (Opsional)</label>
                  <input
                    type="url"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                    placeholder="https://github.com/taufikrahman/proyek-repo"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              {/* 3-4 Gambar Proyek Upload & Preview */}
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                      Gambar Proyek (Wajib 3 Sampai 4 Gambar)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Gambar #1 dijadikan Thumbnail Cover utama. Gambar #2–#4 untuk Galeri Detail.
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      projectForm.gallery.length >= 3 && projectForm.gallery.length <= 4
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {projectForm.gallery.length} / 4 Gambar
                  </span>
                </div>

                {/* Upload File Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 cursor-pointer font-bold text-xs transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload File Gambar dari Komputer
                    <input
                      type="file"
                      multiple
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={directImageUrlInput}
                      onChange={(e) => setDirectImageUrlInput(e.target.value)}
                      placeholder="Atau Paste URL Gambar..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddDirectImageUrl}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>

                {/* Image Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {projectForm.gallery.map((imgUrl, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative h-32 rounded-xl overflow-hidden border-2 border-slate-700 group bg-slate-900"
                    >
                      <Image src={imgUrl} alt={`Preview ${imgIdx + 1}`} fill className="object-cover" />
                      <div className="absolute top-1 left-1 px-2 py-0.5 rounded-md bg-black/70 text-[9px] font-bold text-white backdrop-blur-sm">
                        {imgIdx === 0 ? '⭐ Thumbnail Utama' : `#${imgIdx + 1} Galeri`}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(imgIdx)}
                        className="absolute top-1 right-1 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Badges Manager */}
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-400" />
                  Bahasa Pemrograman & Teknologi Yang Digunakan
                </h4>

                {/* Quick Suggestion Pills */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 self-center mr-1">Rekomendasi Cepat:</span>
                  {popularTechSuggestions.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => handleAddTechTag(sug)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 text-[11px] font-semibold transition-colors"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>

                {/* Manual Tech Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTechInput}
                    onChange={(e) => setNewTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTechTag(newTechInput);
                      }
                    }}
                    placeholder="Ketik nama teknologi lalu tekan Enter..."
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTechTag(newTechInput)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                  >
                    Tambah Tag
                  </button>
                </div>

                {/* Current Selected Technology Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {projectForm.technologies?.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-200 font-bold text-xs"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechTag(tech)}
                        className="text-blue-300 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Extended Details (Overview, Problem, Solution, Impact) */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Gambaran Lengkap Proyek (Overview)</label>
                  <textarea
                    rows={3}
                    value={projectForm.overview}
                    onChange={(e) => setProjectForm({ ...projectForm, overview: e.target.value })}
                    placeholder="Jelaskan secara mendalam gambaran sistem..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Permasalahan</label>
                    <textarea
                      rows={3}
                      value={projectForm.problem}
                      onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                      placeholder="Kendala atau masalah sebelum sistem dibangun..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Solusi</label>
                    <textarea
                      rows={3}
                      value={projectForm.solution}
                      onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                      placeholder="Solusi teknologi yang Anda hadirkan..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Hasil & Dampak</label>
                  <textarea
                    rows={2}
                    value={projectForm.impact}
                    onChange={(e) => setProjectForm({ ...projectForm, impact: e.target.value })}
                    placeholder="Contoh: Meningkatkan efisiensi pelaporan operasional sebesar 70%..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={projectForm.is_featured}
                    onChange={(e) => setProjectForm({ ...projectForm, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-800 border-slate-700"
                  />
                  <label htmlFor="is_featured" className="text-xs font-bold text-white cursor-pointer flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400" />
                    Jadikan Proyek Unggulan (Tampil Paling Atas di Portfolio Publik)
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors min-h-[44px]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 active:scale-95 transition-all min-h-[44px] flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white">Hapus Proyek?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Apakah Anda yakin ingin menghapus proyek <span className="font-bold text-white font-mono">"{deleteConfirmProject.title}"</span>? Tindakan ini akan menghapus proyek secara permanen dari database.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmProject(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors min-h-[44px]"
              >
                Batal
              </button>

              <button
                onClick={() => handleDeleteProject(deleteConfirmProject)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-500/25 active:scale-95 transition-all min-h-[44px] flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Proyek
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
