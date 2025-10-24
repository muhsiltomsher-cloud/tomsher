import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Page, { PageType, PageStatus } from '@/models/Page';
import User from '@/models/User';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const permanentPageTypes = [PageType.HOME, PageType.ABOUT, PageType.PORTFOLIO, PageType.SERVICE, PageType.CONTACT];
    const pages = await Page.find({ 
      type: { $nin: permanentPageTypes }
    }).sort({ updatedAt: -1 });
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
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
    
    const existing = await Page.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const pageData = {
      title: body.title,
      slug: body.slug,
      description: body.description || '',
      metaTitle: body.seoTitle || body.title,
      metaDescription: body.seoDescription || body.description || '',
      type: body.type || PageType.CUSTOM,
      status: body.isPublished ? PageStatus.PUBLISHED : PageStatus.DRAFT,
      authorId: user._id,
      sections: body.sections || [],
      publishedAt: body.isPublished ? new Date() : undefined,
    };

    const page = await Page.create(pageData);
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
