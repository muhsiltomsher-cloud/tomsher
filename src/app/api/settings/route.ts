import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne();
    
    if (!settings) {
      return NextResponse.json({
        siteName: 'Tomsher Technologies',
        logo: '/logo.svg',
        logoNormal: '/logo.svg',
        logoSticky: '/logo.svg',
        logoFooter: '/logo-white.svg',
        favicon: '/favicon.ico',
        phone: '+971 4 123 4567',
        email: 'info@tomsher.com',
        address: 'Dubai, UAE',
        description: '30+ Countries Served'
      });
    }
    
    const response = {
      ...settings.toObject(),
      phone: settings.contactPhone,
      email: settings.contactEmail,
      description: settings.siteDescription,
      facebook: settings.socialMedia?.facebook,
      twitter: settings.socialMedia?.twitter,
      instagram: settings.socialMedia?.instagram,
      linkedin: settings.socialMedia?.linkedin,
      youtube: settings.socialMedia?.youtube,
      pinterest: settings.socialMedia?.pinterest,
      tiktok: settings.socialMedia?.tiktok,
      snapchat: settings.socialMedia?.snapchat,
      whatsapp: settings.socialMedia?.whatsapp,
      telegram: settings.socialMedia?.telegram,
      github: settings.socialMedia?.github,
      dribbble: settings.socialMedia?.dribbble,
      behance: settings.socialMedia?.behance,
      medium: settings.socialMedia?.medium,
      reddit: settings.socialMedia?.reddit,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
