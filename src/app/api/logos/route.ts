import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await connectDB();

    const logoSettings = await Settings.findOne({ key: 'logos' });

    const defaultLogos = {
      mainLogo: '',
      footerLogo: '',
      stickyLogoLight: '',
      stickyLogoDark: '',
      favicon: '',
    };

    return NextResponse.json(logoSettings?.value || defaultLogos);
  } catch (error) {
    console.error('Error fetching logo settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logo settings' },
      { status: 500 }
    );
  }
}
