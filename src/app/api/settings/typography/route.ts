import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await connectDB();
    
    const settings = await Settings.find({});
    
    if (!settings || settings.length === 0) {
      return NextResponse.json({
        baseFontSize: '16px',
        bodyFontWeight: '400',
        headingFontWeight: '700',
        h1Size: '3rem',
        h2Size: '2.25rem',
        h3Size: '1.875rem',
        h4Size: '1.5rem',
        h5Size: '1.25rem',
        h6Size: '1rem',
      });
    }
    
    const settingsDoc = settings[0];
    const typography = settingsDoc.typography || {
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
    
    return NextResponse.json(typography);
  } catch (error) {
    console.error('Error fetching typography settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch typography settings' },
      { status: 500 }
    );
  }
}
