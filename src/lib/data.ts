import { supabase, isSupabaseConfigured } from './supabase';
import dbJson from '@/data/db.json';

export interface Profile {
  id?: string;
  name: string;
  title: string;
  university: string;
  gpa: string;
  bio: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  avatar_url: string;
  cv_url: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  major: string;
  faculty: string;
  start_year: string;
  end_year: string;
  gpa: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
}

export interface SkillItem {
  id: string;
  category: 'Pengembangan Web' | 'Basis Data' | 'Keamanan Siber' | 'Desain' | 'Teknologi Informasi';
  name: string;
  icon_name?: string;
  level: number;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  impact: string;
  year: string;
  image_url: string;
  github_url: string;
  demo_url: string;
  is_featured: boolean;
  features?: string[];
  technologies?: string[];
  gallery?: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credential_id: string;
  verification_url: string;
  image_url: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Initial Data from JSON file
export const fallbackProfile: Profile = dbJson.profile as Profile;
export const fallbackEducation: EducationItem[] = dbJson.education as EducationItem[];
export const fallbackExperiences: ExperienceItem[] = dbJson.experiences as ExperienceItem[];
export const fallbackSkills: SkillItem[] = dbJson.skills as SkillItem[];
export const fallbackProjects: ProjectItem[] = dbJson.projects as ProjectItem[];
export const fallbackCertificates: CertificateItem[] = dbJson.certificates as CertificateItem[];
export const fallbackTestimonials: TestimonialItem[] = dbJson.testimonials as TestimonialItem[];

function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// Data Fetching Functions
export async function getProfile(): Promise<Profile> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
      if (!error && data) return data as Profile;
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_profile', fallbackProfile);
}

export async function getEducation(): Promise<EducationItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('education').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as EducationItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_education', fallbackEducation);
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('experiences').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as ExperienceItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_experiences', fallbackExperiences);
}

export async function getSkills(): Promise<SkillItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('skills').select('*');
      if (!error && data && data.length > 0) return data as SkillItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_skills', fallbackSkills);
}

export async function getProjects(): Promise<ProjectItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('is_featured', { ascending: false });
      if (!error && data && data.length > 0) return data as ProjectItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_projects', fallbackProjects);
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getCertificates(): Promise<CertificateItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('certificates').select('*');
      if (!error && data && data.length > 0) return data as CertificateItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_certificates', fallbackCertificates);
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('testimonials').select('*');
      if (!error && data && data.length > 0) return data as TestimonialItem[];
    } catch {
      // fallback
    }
  }
  return getLocalItem('taufik_portfolio_testimonials', fallbackTestimonials);
}

// Data Saving Functions for Admin Dashboard
export async function saveProfile(profile: Profile): Promise<boolean> {
  setLocalItem('taufik_portfolio_profile', profile);
  if (isSupabaseConfigured && supabase) {
    try {
      const payload = { ...profile };
      delete payload.id;
      const { error } = await supabase.from('profiles').upsert([payload]);
      if (error) console.error('Supabase profile save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveEducation(education: EducationItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_education', education);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('education').upsert(education);
      if (error) console.error('Supabase education save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveExperiences(experiences: ExperienceItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_experiences', experiences);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('experiences').upsert(experiences);
      if (error) console.error('Supabase experiences save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveSkills(skills: SkillItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_skills', skills);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('skills').upsert(skills);
      if (error) console.error('Supabase skills save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveProjects(projects: ProjectItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_projects', projects);
  if (isSupabaseConfigured && supabase) {
    try {
      const cleanProjects = projects.map(({ features, technologies, gallery, ...rest }: any) => rest);
      const { error } = await supabase.from('projects').upsert(cleanProjects);
      if (error) console.error('Supabase projects save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveCertificates(certificates: CertificateItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_certificates', certificates);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('certificates').upsert(certificates);
      if (error) console.error('Supabase certificates save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function saveTestimonials(testimonials: TestimonialItem[]): Promise<boolean> {
  setLocalItem('taufik_portfolio_testimonials', testimonials);
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('testimonials').upsert(testimonials);
      if (error) console.error('Supabase testimonials save error:', error);
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

export async function syncAllAdminData(data: {
  profile: Profile;
  education: EducationItem[];
  experiences: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  testimonials: TestimonialItem[];
}) {
  setLocalItem('taufik_portfolio_profile', data.profile);
  setLocalItem('taufik_portfolio_education', data.education);
  setLocalItem('taufik_portfolio_experiences', data.experiences);
  setLocalItem('taufik_portfolio_skills', data.skills);
  setLocalItem('taufik_portfolio_projects', data.projects);
  setLocalItem('taufik_portfolio_certificates', data.certificates);
  setLocalItem('taufik_portfolio_testimonials', data.testimonials);

  try {
    await fetch('/api/admin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error('API sync error:', err);
  }
}
