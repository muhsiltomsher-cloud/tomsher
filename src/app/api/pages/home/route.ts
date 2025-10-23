import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Page from '@/models/Page';
import PageSection from '@/models/PageSection';
import Section from '@/models/Section';

export async function GET() {
  try {
    await connectDB();
    
    const homePage = await Page.findOne({ type: 'HOME', status: 'PUBLISHED' });
    
    if (!homePage) {
      return NextResponse.json({ error: 'Home page not found' }, { status: 404 });
    }

    const pageSections = await PageSection.find({ 
      pageId: homePage._id,
      isVisible: true 
    })
      .populate('sectionId')
      .sort({ order: 1 });

    const sections = pageSections.map(ps => ({
      _id: ps._id,
      order: ps.order,
      content: ps.content,
      variant: ps.variant,
      section: ps.sectionId,
    }));

    return NextResponse.json({
      page: {
        _id: homePage._id,
        title: homePage.title,
        metaTitle: homePage.metaTitle,
        metaDescription: homePage.metaDescription,
      },
      sections,
    });
  } catch (error) {
    console.error('Error fetching home page:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
