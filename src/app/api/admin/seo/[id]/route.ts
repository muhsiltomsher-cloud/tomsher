import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import SEO from '@/models/SEO';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const seoSetting = await SEO.findByIdAndUpdate(params.id, body, { new: true });

    if (!seoSetting) {
      return NextResponse.json({ error: 'SEO setting not found' }, { status: 404 });
    }

    return NextResponse.json(seoSetting);
  } catch (error) {
    console.error('Error updating SEO setting:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const seoSetting = await SEO.findByIdAndDelete(params.id);

    if (!seoSetting) {
      return NextResponse.json({ error: 'SEO setting not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'SEO setting deleted successfully' });
  } catch (error) {
    console.error('Error deleting SEO setting:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
