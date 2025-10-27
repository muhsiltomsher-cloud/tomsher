import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SectionContent from '@/models/SectionContent';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const pageType = searchParams.get('pageType') || 'HOME';
    
    const sections = await SectionContent.find({ 
      pageType,
      isActive: true 
    }).sort({ order: 1 });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching home sections:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
