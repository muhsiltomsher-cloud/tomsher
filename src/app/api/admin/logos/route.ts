import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    const logoSettings = await Settings.findOneAndUpdate(
      { key: 'logos' },
      {
        key: 'logos',
        value: body,
        type: 'JSON',
        group: 'branding',
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(logoSettings.value);
  } catch (error) {
    console.error('Error updating logo settings:', error);
    return NextResponse.json(
      { error: 'Failed to update logo settings' },
      { status: 500 }
    );
  }
}
