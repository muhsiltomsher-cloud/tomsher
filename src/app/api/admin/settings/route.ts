import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    let settings = await SiteSettings.findOne();
    
    if (!settings) {
      settings = await SiteSettings.create({
        siteName: 'Tomsher Technologies',
        siteDescription: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
      });
    }
    
    return NextResponse.json([settings]); // Return as array for compatibility
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    const existingSettings = await SiteSettings.findOne();
    
    if (existingSettings) {
      const updated = await SiteSettings.findByIdAndUpdate(
        existingSettings._id,
        body,
        { new: true }
      );
      return NextResponse.json(updated);
    } else {
      const settings = await SiteSettings.create(body);
      return NextResponse.json(settings, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
