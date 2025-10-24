import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export const dynamic = 'force-dynamic';
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
    const member = await TeamMember.findByIdAndUpdate(params.id, body, { new: true });

    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error('Error updating team member:', error);
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
    const member = await TeamMember.findByIdAndDelete(params.id);

    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
