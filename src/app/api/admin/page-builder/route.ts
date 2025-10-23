import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import CustomPage from '@/models/CustomPage';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const pages = await CustomPage.find().sort({ updatedAt: -1 });
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching custom pages:', error);
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
    
    const existing = await CustomPage.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 });
    }

    const page = await CustomPage.create(body);
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error('Error creating custom page:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
