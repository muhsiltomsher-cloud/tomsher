import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import connectDB from '../src/lib/mongodb';
import SiteSettings from '../src/models/SiteSettings';

async function seedHeroSection() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const existingSettings = await SiteSettings.findOne();
    
    const heroData = {
      homeHero: {
        backgroundImage: '/images/bg-hero.png',
        backgroundColor: '#060044',
        badges: [
          { text: 'Trusted by Global Brands', icon: 'globe' },
          { text: 'Web Design & Digital Growth Experts', icon: 'rocket' }
        ],
        heading: {
          line1: 'Build Your',
          line1Highlight: 'Digital World',
          line2: 'with',
          line2Highlight: 'Tomsher',
          line3: 'Powerful, Scalable, Business-Driven Websites'
        },
        description: 'We create award-winning, conversion-focused websites and robust digital solutions for forward-thinking brands. Partner with Tomsher for next-level performance and scalable growth.',
        worksLink: {
          text: 'Our works',
          url: '/works'
        }
      }
    };

    if (existingSettings) {
      await SiteSettings.findByIdAndUpdate(
        existingSettings._id,
        { $set: heroData },
        { new: true }
      );
      console.log('Updated existing SiteSettings with hero section data');
    } else {
      await SiteSettings.create({
        siteName: 'Tomsher Technologies',
        siteDescription: 'Leading web development company in Dubai, UAE',
        contactEmail: 'info@tomsher.com',
        contactPhone: '+971 4 123 4567',
        address: 'Dubai, UAE',
        ...heroData
      });
      console.log('Created new SiteSettings with hero section data');
    }

    console.log('Hero section seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding hero section:', error);
    process.exit(1);
  }
}

seedHeroSection();
