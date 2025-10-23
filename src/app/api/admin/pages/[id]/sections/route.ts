import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import PageSection from '@/models/PageSection';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const pageSections = await PageSection.find({ pageId: params.id })
      .populate('sectionId')
      .sort({ order: 1 });

    return NextResponse.json(pageSections);
  } catch (error) {
    console.error('Error fetching page sections:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
