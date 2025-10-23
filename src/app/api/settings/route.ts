import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await connectDB();
    const settings = await Settings.findOne();
    
    if (!settings) {
      return NextResponse.json({
        siteName: 'Tomsher Technologies',
        logo: '/logo.svg',
        phone: '+971 4 123 4567',
        email: 'info@tomsher.com',
        address: 'Dubai, UAE',
        description: '30+ Countries Served'
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
