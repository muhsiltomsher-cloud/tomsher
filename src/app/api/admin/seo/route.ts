import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import SEO from '@/models/SEO';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const seoSettings = await SEO.find().sort({ createdAt: -1 });
    return NextResponse.json(seoSettings);
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
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
    const body = await request.json();
    const seoSetting = await SEO.create(body);
    return NextResponse.json(seoSetting, { status: 201 });
  } catch (error) {
    console.error('Error creating SEO setting:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
