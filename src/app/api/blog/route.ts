import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ status: 'published' })
      .sort({ publishedAt: -1, createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
