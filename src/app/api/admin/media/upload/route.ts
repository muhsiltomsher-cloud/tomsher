import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';
import { put } from '@vercel/blob';

export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN environment variable is not configured');
      return NextResponse.json({ 
        error: 'Blob storage not configured. Please contact administrator.' 
      }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only images are allowed' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
    }

    let blob;
    try {
      blob = await put(file.name, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    } catch (blobError: any) {
      console.error('Vercel Blob upload error:', {
        message: blobError.message,
        stack: blobError.stack,
        name: blobError.name
      });
      return NextResponse.json({ 
        error: 'Failed to upload to blob storage. Please try again or contact administrator.',
        details: blobError.message 
      }, { status: 500 });
    }

    await connectDB();
    
    const media = await Media.create({
      filename: file.name,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      url: blob.url,
      uploadedById: session.user.id || session.user.email,
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error: any) {
    console.error('Error uploading file:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      error: 'Failed to upload file. Please try again.',
      details: error.message 
    }, { status: 500 });
  }
}
