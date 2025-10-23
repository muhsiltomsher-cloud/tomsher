import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import PageSection from '@/models/PageSection';

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
    const pageSection = await PageSection.findByIdAndDelete(params.id);

    if (!pageSection) {
      return NextResponse.json({ error: 'Page section not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Page section deleted successfully' });
  } catch (error) {
    console.error('Error deleting page section:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    const pageSection = await PageSection.findByIdAndUpdate(params.id, body, { new: true });

    if (!pageSection) {
      return NextResponse.json({ error: 'Page section not found' }, { status: 404 });
    }

    return NextResponse.json(pageSection);
  } catch (error) {
    console.error('Error updating page section:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
