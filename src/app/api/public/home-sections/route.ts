import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SectionContent from '@/models/SectionContent';
import SiteSettings from '@/models/SiteSettings';
import { processVisualDefaults } from '@/lib/section-defaults';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const pageType = searchParams.get('pageType') || 'HOME';
    
    if (pageType === 'HOME') {
      const settings = await SiteSettings.findOne();
      
      if (settings) {
        const normalizedSections = [];
        
        if (settings.homeHero) {
          normalizedSections.push({
            componentName: 'HeroSection',
            content: settings.homeHero,
            order: 1,
            isActive: true,
            isVisible: true,
            sectionKey: 'HERO'
          });
        }
        
        if (settings.homeAbout) {
          normalizedSections.push({
            componentName: 'AboutSection',
            content: settings.homeAbout,
            order: 2,
            isActive: true,
            isVisible: true,
            sectionKey: 'ABOUT'
          });
        }
        
        if (settings.homeStats) {
          normalizedSections.push({
            componentName: 'StatsSection',
            content: settings.homeStats,
            order: 3,
            isActive: true,
            isVisible: true,
            sectionKey: 'STATS'
          });
        }
        
        if (settings.homeClients && settings.homeClients.showOnHomePage) {
          normalizedSections.push({
            componentName: 'ClientsSection',
            content: settings.homeClients,
            order: 4,
            isActive: true,
            isVisible: true,
            sectionKey: 'CLIENTS'
          });
        }
        
        if (settings.homeDevelopmentProcess) {
          const steps = (settings.homeDevelopmentProcess.steps || []).map((step: any, index: number) => ({
            ...step,
            ...processVisualDefaults[index % processVisualDefaults.length],
            details: Array.isArray(step.details) ? step.details : [],
          }));
          
          normalizedSections.push({
            componentName: 'OurProcessSection',
            content: {
              ...settings.homeDevelopmentProcess,
              steps
            },
            order: 5,
            isActive: true,
            isVisible: true,
            sectionKey: 'PROCESS'
          });
        }
        
        if (settings.homeAchievements) {
          normalizedSections.push({
            componentName: 'AchievementsSection',
            content: settings.homeAchievements,
            order: 6,
            isActive: true,
            isVisible: true,
            sectionKey: 'ACHIEVEMENTS'
          });
        }
        
        if (settings.homeCTA) {
          normalizedSections.push({
            componentName: 'CTASection',
            content: settings.homeCTA,
            order: 7,
            isActive: true,
            isVisible: true,
            sectionKey: 'CTA'
          });
        }
        
        if (normalizedSections.length > 0) {
          return NextResponse.json(normalizedSections);
        }
      }
    }
    
    const sections = await SectionContent.find({ 
      pageType,
      isActive: true 
    }).sort({ order: 1 });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching home sections:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
