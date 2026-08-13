import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { profile, education, experiences, skills, projects, certificates, testimonials } = body;

    // 1. Write to local db.json if running in Node environment
    try {
      const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
      const dbData = {
        profile: profile || {},
        education: education || [],
        experiences: experiences || [],
        skills: skills || [],
        projects: projects || [],
        certificates: certificates || [],
        testimonials: testimonials || [],
      };
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('Unable to write to local db.json file:', fsErr);
    }

    // 2. Write to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        if (profile) {
          const profilePayload = { ...profile };
          delete profilePayload.id;
          await supabase.from('profiles').upsert([profilePayload]);
        }
        if (education && education.length > 0) {
          await supabase.from('education').upsert(education);
        }
        if (experiences && experiences.length > 0) {
          await supabase.from('experiences').upsert(experiences);
        }
        if (skills && skills.length > 0) {
          await supabase.from('skills').upsert(skills);
        }
        if (projects && projects.length > 0) {
          const cleanProjects = projects.map(({ features, technologies, gallery, ...rest }: any) => rest);
          await supabase.from('projects').upsert(cleanProjects);
        }
        if (certificates && certificates.length > 0) {
          await supabase.from('certificates').upsert(certificates);
        }
        if (testimonials && testimonials.length > 0) {
          await supabase.from('testimonials').upsert(testimonials);
        }
      } catch (sbErr) {
        console.error('Supabase batch save error:', sbErr);
      }
    }

    // 3. Revalidate Next.js cache
    revalidatePath('/');
    revalidatePath('/proyek/[slug]');

    return NextResponse.json({ success: true, message: 'Data berhasil disimpan dan disinkronkan!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
