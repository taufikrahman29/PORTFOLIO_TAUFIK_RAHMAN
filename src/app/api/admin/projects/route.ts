import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';
import { ProjectItem } from '@/lib/data';

function readDbFile() {
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    if (fs.existsSync(dbPath)) {
      const content = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }
  return null;
}

function writeDbFile(data: any) {
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db.json:', err);
  }
}

// POST: Create New Project
export async function POST(request: Request) {
  try {
    const project: ProjectItem = await request.json();

    // Validation
    if (!project.title || !project.title.trim()) {
      return NextResponse.json({ success: false, error: 'Nama proyek wajib diisi.' }, { status: 400 });
    }
    if (!project.short_description || !project.short_description.trim()) {
      return NextResponse.json({ success: false, error: 'Deskripsi proyek wajib diisi.' }, { status: 400 });
    }
    if (!project.gallery || project.gallery.length < 3 || project.gallery.length > 4) {
      return NextResponse.json({ success: false, error: 'Proyek harus memiliki minimal 3 gambar dan maksimal 4 gambar.' }, { status: 400 });
    }

    // Assign main image_url as first image in gallery
    project.image_url = project.gallery[0];
    if (!project.slug) {
      project.slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    if (!project.id) {
      project.id = `proj-${Date.now()}`;
    }

    // Update Local JSON file
    const db = readDbFile();
    if (db) {
      if (!db.projects) db.projects = [];
      db.projects.unshift(project);
      writeDbFile(db);
    }

    // Update Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { features, technologies, gallery, ...supabasePayload } = project;
        await supabase.from('projects').upsert([supabasePayload]);
      } catch (sbErr) {
        console.error('Supabase project insert error:', sbErr);
      }
    }

    // Revalidate public caches
    revalidatePath('/');
    revalidatePath('/proyek/[slug]');

    return NextResponse.json({ success: true, message: 'Proyek berhasil disimpan.', data: project });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PUT: Update Existing Project
export async function PUT(request: Request) {
  try {
    const project: ProjectItem = await request.json();

    if (!project.title || !project.title.trim()) {
      return NextResponse.json({ success: false, error: 'Nama proyek wajib diisi.' }, { status: 400 });
    }
    if (!project.short_description || !project.short_description.trim()) {
      return NextResponse.json({ success: false, error: 'Deskripsi proyek wajib diisi.' }, { status: 400 });
    }
    if (!project.gallery || project.gallery.length < 3 || project.gallery.length > 4) {
      return NextResponse.json({ success: false, error: 'Proyek harus memiliki minimal 3 gambar dan maksimal 4 gambar.' }, { status: 400 });
    }

    project.image_url = project.gallery[0];

    // Update Local JSON file
    const db = readDbFile();
    if (db) {
      if (!db.projects) db.projects = [];
      const idx = db.projects.findIndex((p: any) => p.id === project.id || p.slug === project.slug);
      if (idx !== -1) {
        db.projects[idx] = project;
      } else {
        db.projects.unshift(project);
      }
      writeDbFile(db);
    }

    // Update Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { features, technologies, gallery, ...supabasePayload } = project;
        await supabase.from('projects').upsert([supabasePayload]);
      } catch (sbErr) {
        console.error('Supabase project update error:', sbErr);
      }
    }

    revalidatePath('/');
    revalidatePath('/proyek/[slug]');

    return NextResponse.json({ success: true, message: 'Proyek berhasil disimpan.', data: project });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE: Delete Project
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID Proyek wajib disertakan.' }, { status: 400 });
    }

    // Update Local JSON file
    const db = readDbFile();
    if (db && db.projects) {
      db.projects = db.projects.filter((p: any) => p.id !== id);
      writeDbFile(db);
    }

    // Update Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (sbErr) {
        console.error('Supabase project delete error:', sbErr);
      }
    }

    revalidatePath('/');
    revalidatePath('/proyek/[slug]');

    return NextResponse.json({ success: true, message: 'Proyek berhasil dihapus.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
