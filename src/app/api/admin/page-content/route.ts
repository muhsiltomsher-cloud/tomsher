import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import PageContent from '@/models/PageContent';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const pageContents = await PageContent.find().sort({ pageType: 1 });
    return NextResponse.json(pageContents);
  } catch (error) {
    console.error('Error fetching page contents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const pageContent = await PageContent.create(data);
    return NextResponse.json(pageContent, { status: 201 });
  } catch (error) {
    console.error('Error creating page content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
