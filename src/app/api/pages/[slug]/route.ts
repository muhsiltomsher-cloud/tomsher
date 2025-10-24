import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Page, { PageStatus } from '@/models/Page';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    
    const page = await Page.findOne({ 
      slug: params.slug,
      status: PageStatus.PUBLISHED
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
