import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import PageSection from '@/models/PageSection';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const pageSection = await PageSection.create(body);
    return NextResponse.json(pageSection, { status: 201 });
  } catch (error) {
    console.error('Error creating page section:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
