import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Page from '@/models/Page';
import Service from '@/models/Service';
import Portfolio from '@/models/Portfolio';
import Testimonial from '@/models/Testimonial';
import BlogPost from '@/models/BlogPost';
import Contact from '@/models/Contact';
import TeamMember from '@/models/TeamMember';
import Media from '@/models/Media';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const [pages, services, portfolio, testimonials, blog, contacts, team, media] = await Promise.all([
      Page.countDocuments(),
      Service.countDocuments(),
      Portfolio.countDocuments(),
      Testimonial.countDocuments(),
      BlogPost.countDocuments(),
      Contact.countDocuments(),
      TeamMember.countDocuments(),
      Media.countDocuments(),
    ]);

    return NextResponse.json({
      pages,
      services,
      portfolio,
      testimonials,
      blog,
      contacts,
      team,
      media,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
