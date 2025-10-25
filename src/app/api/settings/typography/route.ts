import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await connectDB();
    
    const typographySetting = await Settings.findOne({ key: 'typography' });
    
    const defaultTypography = {
      baseFontSize: '16px',
      bodyFontWeight: '400',
      headingFontWeight: '700',
      h1Size: '3rem',
      h2Size: '2.25rem',
      h3Size: '1.875rem',
      h4Size: '1.5rem',
      h5Size: '1.25rem',
      h6Size: '1rem',
    };
    
    if (!typographySetting) {
      return NextResponse.json(defaultTypography);
    }
    
    const typography = typographySetting.value || defaultTypography;
    
    return NextResponse.json(typography);
  } catch (error) {
    console.error('Error fetching typography settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch typography settings' },
      { status: 500 }
    );
  }
}
