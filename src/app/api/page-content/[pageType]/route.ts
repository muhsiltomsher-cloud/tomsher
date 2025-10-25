import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PageContent from '@/models/PageContent';

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  { params }: { params: { pageType: string } }
) {
  try {
    await connectDB();
    const pageContent = await PageContent.findOne({ 
      pageType: params.pageType.toUpperCase(),
      isActive: true 
    });
    
    if (!pageContent) {
      return NextResponse.json({ error: 'Page content not found' }, { status: 404 });
    }

    return NextResponse.json(pageContent);
  } catch (error) {
    console.error('Error fetching page content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
