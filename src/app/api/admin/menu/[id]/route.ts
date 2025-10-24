import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import MenuItem from '@/models/Menu';

export const dynamic = 'force-dynamic';
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
    const menuItem = await MenuItem.findByIdAndDelete(params.id);

    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
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
    const menuItem = await MenuItem.findByIdAndUpdate(params.id, body, { new: true });

    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json(menuItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
