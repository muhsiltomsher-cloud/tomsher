import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import SectionContent from '@/models/SectionContent';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const pageType = searchParams.get('pageType');
    const sectionKey = searchParams.get('sectionKey');
    
    let query: any = {};
    if (pageType) query.pageType = pageType;
    if (sectionKey) query.sectionKey = sectionKey;
    
    const sectionContents = await SectionContent.find(query).sort({ order: 1 });
    return NextResponse.json(sectionContents);
  } catch (error) {
    console.error('Error fetching section contents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    const existingContent = await SectionContent.findOne({
      sectionKey: body.sectionKey,
      pageType: body.pageType,
    });
    
    if (existingContent) {
      const updated = await SectionContent.findByIdAndUpdate(
        existingContent._id,
        body,
        { new: true }
      );
      return NextResponse.json(updated);
    }
    
    const sectionContent = await SectionContent.create(body);
    return NextResponse.json(sectionContent, { status: 201 });
  } catch (error) {
    console.error('Error creating/updating section content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
