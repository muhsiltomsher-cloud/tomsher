import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MenuItem from '@/models/Menu';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await connectDB();
    const menuItems = await MenuItem.find({ isActive: true }).sort({ order: 1 });
    
    const topLevel = menuItems.filter(item => !item.parentId);
    const buildTree = (items: any[]) => {
      return items.map(item => ({
        ...item.toObject(),
        children: menuItems
          .filter(child => child.parentId?.toString() === item._id.toString())
          .map(child => child.toObject()),
      }));
    };
    
    const menuTree = buildTree(topLevel);
    return NextResponse.json(menuTree);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
