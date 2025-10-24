import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import PageContent from '@/models/PageContent';

export const dynamic = 'force-dynamic';
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const existingHome = await PageContent.findOne({ pageType: 'HOME' });
    if (existingHome) {
      return NextResponse.json({ 
        message: 'Home page already initialized',
        pageContent: existingHome 
      });
    }

    const homePageData = {
      pageType: 'HOME',
      title: 'Best Web Development Company in Dubai, UAE | Tomsher Technologies',
      subtitle: 'Leading web development company in Dubai',
      heroTitle: 'Transform Your Digital Presence',
      heroSubtitle: 'We create stunning websites and digital solutions',
      heroButtonText: 'Get Started',
      heroButtonUrl: '/contact',
      sections: [
        {
          componentName: 'HeroSection',
          type: 'HERO',
          title: 'Hero Section',
          order: 1,
          isVisible: true,
        },
        {
          componentName: 'AboutSection',
          type: 'ABOUT',
          title: 'About Section',
          order: 2,
          isVisible: true,
        },
        {
          componentName: 'ServicesSection',
          type: 'SERVICES',
          title: 'Services Section',
          order: 3,
          isVisible: true,
        },
        {
          componentName: 'ClientsSection',
          type: 'CLIENTS',
          title: 'Clients Section',
          order: 4,
          isVisible: true,
        },
        {
          componentName: 'StatsSection',
          type: 'STATS',
          title: 'Stats Section',
          order: 5,
          isVisible: true,
        },
        {
          componentName: 'OurProcessSection',
          type: 'PROCESS',
          title: 'Our Process Section',
          order: 6,
          isVisible: true,
        },
        {
          componentName: 'PortfolioSectionNew',
          type: 'PORTFOLIO',
          title: 'Portfolio Section',
          order: 7,
          isVisible: true,
        },
        {
          componentName: 'TestimonialsSection',
          type: 'TESTIMONIALS',
          title: 'Testimonials Section',
          order: 8,
          isVisible: true,
        },
        {
          componentName: 'FAQSectionNew',
          type: 'FAQ',
          title: 'FAQ Section',
          order: 9,
          isVisible: true,
        },
        {
          componentName: 'CTASection',
          type: 'CTA',
          title: 'CTA Section',
          order: 10,
          isVisible: true,
        },
        {
          componentName: 'ContactSection',
          type: 'CONTACT',
          title: 'Contact Section',
          order: 11,
          isVisible: true,
        },
      ],
      seo: {
        metaTitle: 'Best Web Development Company in Dubai, UAE | Tomsher Technologies',
        metaDescription: 'Tomsher is a leading web development company in Dubai, specializing in affordable website creation and custom eCommerce website development services in Dubai and UAE.',
        keywords: ['web development Dubai', 'web design company UAE', 'ecommerce development', 'digital marketing Dubai'],
      },
      isActive: true,
    };

    const pageContent = await PageContent.create(homePageData);
    return NextResponse.json({ 
      message: 'Home page initialized successfully',
      pageContent 
    }, { status: 201 });
  } catch (error) {
    console.error('Error initializing home page:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
