import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Tomsher Technologies',
  },
  siteDescription: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: '',
  },
  logoNormal: {
    type: String,
    default: '',
  },
  logoSticky: {
    type: String,
    default: '',
  },
  logoFooter: {
    type: String,
    default: '',
  },
  favicon: {
    type: String,
    default: '',
  },
  contactEmail: {
    type: String,
    default: '',
  },
  contactPhone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    pinterest: String,
    tiktok: String,
    snapchat: String,
    whatsapp: String,
    telegram: String,
    github: String,
    dribbble: String,
    behance: String,
    medium: String,
    reddit: String,
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
  },
  analytics: {
    googleAnalyticsId: String,
    facebookPixelId: String,
  },
  typography: {
    baseFontSize: {
      type: String,
      default: '16px',
    },
    headingFontWeight: {
      type: String,
      default: '700',
    },
    bodyFontWeight: {
      type: String,
      default: '400',
    },
    h1Size: {
      type: String,
      default: '3rem',
    },
    h2Size: {
      type: String,
      default: '2.25rem',
    },
    h3Size: {
      type: String,
      default: '1.875rem',
    },
    h4Size: {
      type: String,
      default: '1.5rem',
    },
    h5Size: {
      type: String,
      default: '1.25rem',
    },
    h6Size: {
      type: String,
      default: '1rem',
    },
  },
  homeHero: {
    backgroundImage: {
      type: String,
      default: '/images/bg-hero.png',
    },
    backgroundColor: {
      type: String,
      default: '#060044',
    },
    badges: [{
      text: String,
      icon: String,
    }],
    heading: {
      line1: {
        type: String,
        default: 'Build Your',
      },
      line1Highlight: {
        type: String,
        default: 'Digital World',
      },
      line2: {
        type: String,
        default: 'with',
      },
      line2Highlight: {
        type: String,
        default: 'Tomsher',
      },
      line3: {
        type: String,
        default: 'Powerful, Scalable, Business-Driven Websites',
      },
    },
    description: {
      type: String,
      default: 'We create award-winning, conversion-focused websites and robust digital solutions for forward-thinking brands. Partner with Tomsher for next-level performance and scalable growth.',
    },
    worksLink: {
      text: {
        type: String,
        default: 'Our works',
      },
      url: {
        type: String,
        default: '/works',
      },
    },
  },
  homeAbout: {
    yearsText: {
      type: String,
      default: '14+',
    },
    yearsLabel: {
      type: String,
      default: 'years of excellence',
    },
    tagline1: {
      type: String,
      default: 'Creative Designs.',
    },
    tagline2: {
      type: String,
      default: 'Meaningful Impact.',
    },
    tagline3: {
      type: String,
      default: 'Measurable Result.',
    },
    sectionLabel: {
      type: String,
      default: 'About tomsher',
    },
    title: {
      type: String,
      default: 'Web Design',
    },
    titleHighlight: {
      type: String,
      default: 'Company in Dubai',
    },
    description: {
      type: String,
      default: 'Tomsher is a leading web software solutions provider based in the UAE, specializing in web design and digital marketing. As the best web design company in Dubai, we take pride in our expert in-house web development team, delivering top-notch, high-quality services to meet all your digital needs. We have been working with multinational, semi-government, corporate, SME and start-up companies from Middle East, Africa, Asia, Europe and America. Our majority of clients are from UAE and have clientele across 30+ countries around the globe.',
    },
    button1Text: {
      type: String,
      default: 'Learn More',
    },
    button1Link: {
      type: String,
      default: '/about',
    },
    button2Text: {
      type: String,
      default: 'Contact us today',
    },
    button2Link: {
      type: String,
      default: '/contact',
    },
    videoUrl: {
      type: String,
      default: 'https://player.vimeo.com/video/1044576275?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0',
    },
  },
  homeStats: {
    title: {
      type: String,
      default: 'Our Achievements',
    },
    subtitle: {
      type: String,
      default: 'Numbers that speak for themselves',
    },
    stats: [{
      label: String,
      value: String,
      icon: String,
    }],
  },
  homeClients: {
    title: {
      type: String,
      default: 'Our Clients',
    },
    subtitle: {
      type: String,
      default: 'Trusted by Industry Leaders Worldwide',
    },
    description: {
      type: String,
      default: "We've helped companies of all sizes achieve their digital transformation goals.",
    },
    showOnHomePage: {
      type: Boolean,
      default: true,
    },
    activeClients: {
      type: String,
      default: '250+',
    },
    countriesServed: {
      type: String,
      default: '30+',
    },
    clients: [{
      name: String,
      logo: String,
      website: String,
    }],
  },
  homeDevelopmentProcess: {
    title: {
      type: String,
      default: 'Our Development Process',
    },
    subtitle: {
      type: String,
      default: 'Transforming Ideas into Digital Excellence',
    },
    description: {
      type: String,
      default: 'At Tomsher, we follow a systematic approach to web development that combines creativity with technical expertise. Our proven four-phase methodology ensures successful project delivery.',
    },
    steps: [{
      number: String,
      title: String,
      description: String,
      icon: String,
    }],
  },
  homeAchievements: {
    title: {
      type: String,
      default: 'Our Achievements',
    },
    subtitle: {
      type: String,
      default: 'Numbers that speak for themselves',
    },
    achievements: [{
      icon: String,
      value: String,
      label: String,
    }],
  },
  homeCTA: {
    title: {
      type: String,
      default: 'Ready to Start Your Project?',
    },
    subtitle: {
      type: String,
      default: 'Let\'s work together to bring your ideas to life',
    },
    ctaPrimary: {
      type: String,
      default: 'Get Started',
    },
    ctaSecondary: {
      type: String,
      default: 'Contact Us',
    },
  },
  footer: {
    description: {
      type: String,
      default: 'Leading web development company in Dubai, UAE specializing in custom website development, eCommerce solutions, and digital marketing services.',
    },
    newsletterTitle: {
      type: String,
      default: 'Stay Updated',
    },
    newsletterDescription: {
      type: String,
      default: 'Subscribe to our newsletter for the latest updates on web development trends and digital marketing insights.',
    },
    copyrightText: {
      type: String,
      default: 'All rights reserved by Tomsher Technologies.',
    },
    showNewsletter: {
      type: Boolean,
      default: true,
    },
  },
}, {
  timestamps: true,
});

const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
