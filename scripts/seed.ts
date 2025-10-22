import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import connectDB from '../src/lib/mongodb';
import User, { Role } from '../src/models/User';
import Page, { PageStatus, PageType } from '../src/models/Page';
import Section, { SectionType } from '../src/models/Section';
import PageSection from '../src/models/PageSection';
import Service from '../src/models/Service';
import Portfolio from '../src/models/Portfolio';
import Testimonial from '../src/models/Testimonial';
import BlogPost, { PostStatus } from '../src/models/BlogPost';
import Settings, { SettingType } from '../src/models/Settings';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Page.deleteMany({});
    await Section.deleteMany({});
    await PageSection.deleteMany({});
    await Service.deleteMany({});
    await Portfolio.deleteMany({});
    await Testimonial.deleteMany({});
    await BlogPost.deleteMany({});
    await Settings.deleteMany({});
    console.log('Cleared existing data');

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      email: 'admin@tomsher.com',
      name: 'Admin User',
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
    });
    console.log('Created admin user:', adminUser.email);

    const heroSection = await Section.create({
      name: 'Hero Section',
      type: SectionType.HERO,
      component: 'HeroSection',
      contentSchema: {
        title: 'string',
        subtitle: 'string',
        description: 'string',
        ctaText: 'string',
        ctaLink: 'string',
        image: 'string',
      },
      variants: ['variant1', 'variant2', 'variant3'],
      isActive: true,
      createdById: adminUser._id,
    });

    const servicesSection = await Section.create({
      name: 'Services Section',
      type: SectionType.SERVICES,
      component: 'ServicesSection',
      contentSchema: {
        title: 'string',
        subtitle: 'string',
        services: 'array',
      },
      variants: ['grid', 'list', 'cards'],
      isActive: true,
      createdById: adminUser._id,
    });

    const aboutSection = await Section.create({
      name: 'About Section',
      type: SectionType.ABOUT,
      component: 'AboutSection',
      contentSchema: {
        title: 'string',
        description: 'string',
        image: 'string',
        stats: 'array',
      },
      variants: ['default', 'with-stats'],
      isActive: true,
      createdById: adminUser._id,
    });

    const portfolioSection = await Section.create({
      name: 'Portfolio Section',
      type: SectionType.PORTFOLIO,
      component: 'PortfolioSection',
      contentSchema: {
        title: 'string',
        subtitle: 'string',
        projects: 'array',
      },
      variants: ['grid', 'masonry', 'carousel'],
      isActive: true,
      createdById: adminUser._id,
    });

    const testimonialsSection = await Section.create({
      name: 'Testimonials Section',
      type: SectionType.TESTIMONIALS,
      component: 'TestimonialsSection',
      contentSchema: {
        title: 'string',
        testimonials: 'array',
      },
      variants: ['carousel', 'grid', 'cards'],
      isActive: true,
      createdById: adminUser._id,
    });

    const contactSection = await Section.create({
      name: 'Contact Section',
      type: SectionType.CONTACT,
      component: 'ContactSection',
      contentSchema: {
        title: 'string',
        subtitle: 'string',
        email: 'string',
        phone: 'string',
        address: 'string',
      },
      variants: ['form', 'info', 'map'],
      isActive: true,
      createdById: adminUser._id,
    });

    const ctaSection = await Section.create({
      name: 'CTA Section',
      type: SectionType.CTA,
      component: 'CTASection',
      contentSchema: {
        title: 'string',
        description: 'string',
        ctaText: 'string',
        ctaLink: 'string',
      },
      variants: ['default', 'centered', 'split'],
      isActive: true,
      createdById: adminUser._id,
    });

    const statsSection = await Section.create({
      name: 'Stats Section',
      type: SectionType.STATS,
      component: 'StatsSection',
      contentSchema: {
        stats: 'array',
      },
      variants: ['default', 'minimal'],
      isActive: true,
      createdById: adminUser._id,
    });

    console.log('Created sections');

    const services = await Service.insertMany([
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js. We create scalable, performant, and user-friendly web solutions tailored to your business needs.',
        shortDescription: 'Modern, scalable web applications',
        icon: 'Code',
        category: 'Development',
        features: [
          'Responsive Design',
          'Progressive Web Apps',
          'API Integration',
          'Performance Optimization',
          'SEO Optimization',
        ],
        isActive: true,
        order: 1,
      },
      {
        title: 'Mobile App Development',
        slug: 'mobile-app-development',
        description: 'Native and cross-platform mobile applications for iOS and Android. We build intuitive, high-performance mobile apps that engage users and drive business growth.',
        shortDescription: 'iOS and Android mobile applications',
        icon: 'Smartphone',
        category: 'Development',
        features: [
          'Native iOS & Android',
          'Cross-platform Development',
          'App Store Optimization',
          'Push Notifications',
          'Offline Functionality',
        ],
        isActive: true,
        order: 2,
      },
      {
        title: 'E-Commerce Solutions',
        slug: 'ecommerce-solutions',
        description: 'Complete e-commerce platforms with payment integration, inventory management, and analytics. We help businesses sell online with secure, scalable solutions.',
        shortDescription: 'Complete online store solutions',
        icon: 'ShoppingCart',
        category: 'E-Commerce',
        features: [
          'Payment Gateway Integration',
          'Inventory Management',
          'Order Tracking',
          'Multi-currency Support',
          'Analytics Dashboard',
        ],
        isActive: true,
        order: 3,
      },
      {
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'User-centered design that combines aesthetics with functionality. We create beautiful, intuitive interfaces that enhance user experience and drive engagement.',
        shortDescription: 'Beautiful, user-friendly interfaces',
        icon: 'Palette',
        category: 'Design',
        features: [
          'User Research',
          'Wireframing & Prototyping',
          'Visual Design',
          'Usability Testing',
          'Design Systems',
        ],
        isActive: true,
        order: 4,
      },
      {
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'Comprehensive digital marketing strategies including SEO, social media, and content marketing. We help businesses grow their online presence and reach their target audience.',
        shortDescription: 'Grow your online presence',
        icon: 'TrendingUp',
        category: 'Marketing',
        features: [
          'SEO Optimization',
          'Social Media Marketing',
          'Content Strategy',
          'Email Marketing',
          'Analytics & Reporting',
        ],
        isActive: true,
        order: 5,
      },
      {
        title: 'Cloud Solutions',
        slug: 'cloud-solutions',
        description: 'Cloud infrastructure setup and management on AWS, Azure, and Google Cloud. We help businesses leverage cloud technology for scalability and reliability.',
        shortDescription: 'Scalable cloud infrastructure',
        icon: 'Cloud',
        category: 'Infrastructure',
        features: [
          'Cloud Migration',
          'DevOps & CI/CD',
          'Server Management',
          'Security & Compliance',
          'Cost Optimization',
        ],
        isActive: true,
        order: 6,
      },
    ]);
    console.log('Created services');

    const portfolios = await Portfolio.insertMany([
      {
        title: 'E-Commerce Platform for Fashion Brand',
        slug: 'fashion-ecommerce-platform',
        description: 'A complete e-commerce solution with advanced filtering, wishlist, and seamless checkout experience. Built with Next.js and integrated with Stripe for payments.',
        shortDescription: 'Modern e-commerce platform',
        category: 'E-Commerce',
        client: 'Fashion Forward LLC',
        projectUrl: 'https://example.com',
        technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe'],
        isActive: true,
        isFeatured: true,
        order: 1,
        gallery: [],
      },
      {
        title: 'Healthcare Management System',
        slug: 'healthcare-management-system',
        description: 'Comprehensive healthcare management platform with patient records, appointment scheduling, and telemedicine features. HIPAA compliant and secure.',
        shortDescription: 'Patient management platform',
        category: 'Healthcare',
        client: 'MediCare Solutions',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC'],
        isActive: true,
        isFeatured: true,
        order: 2,
        gallery: [],
      },
      {
        title: 'Real Estate Listing Platform',
        slug: 'real-estate-platform',
        description: 'Property listing platform with advanced search, virtual tours, and agent management. Integrated with mapping services for location-based search.',
        shortDescription: 'Property listing website',
        category: 'Real Estate',
        client: 'Prime Properties',
        projectUrl: 'https://example.com',
        technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Google Maps API'],
        isActive: true,
        isFeatured: false,
        order: 3,
        gallery: [],
      },
      {
        title: 'Restaurant Ordering App',
        slug: 'restaurant-ordering-app',
        description: 'Mobile app for restaurant ordering with real-time order tracking, payment integration, and loyalty rewards program.',
        shortDescription: 'Food ordering mobile app',
        category: 'Mobile App',
        client: 'Foodie Delights',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
        isActive: true,
        isFeatured: false,
        order: 4,
        gallery: [],
      },
      {
        title: 'Corporate Website Redesign',
        slug: 'corporate-website-redesign',
        description: 'Complete redesign of corporate website with modern UI/UX, improved performance, and SEO optimization. Increased conversion rate by 45%.',
        shortDescription: 'Corporate website redesign',
        category: 'Web Design',
        client: 'Tech Innovations Inc',
        projectUrl: 'https://example.com',
        technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
        isActive: true,
        isFeatured: true,
        order: 5,
        gallery: [],
      },
    ]);
    console.log('Created portfolio items');

    const testimonials = await Testimonial.insertMany([
      {
        name: 'Sarah Johnson',
        position: 'CEO',
        company: 'Fashion Forward LLC',
        content: 'Tomsher Technologies transformed our online presence with a stunning e-commerce platform. Sales increased by 200% in the first quarter. Their team is professional, responsive, and truly understands business needs.',
        rating: 5,
        isActive: true,
        isFeatured: true,
        order: 1,
      },
      {
        name: 'Michael Chen',
        position: 'CTO',
        company: 'MediCare Solutions',
        content: 'The healthcare management system they built exceeded our expectations. It\'s secure, scalable, and our staff loves using it. Tomsher delivered on time and within budget.',
        rating: 5,
        isActive: true,
        isFeatured: true,
        order: 2,
      },
      {
        name: 'Emily Rodriguez',
        position: 'Marketing Director',
        company: 'Prime Properties',
        content: 'Working with Tomsher was a pleasure. They took our vision and turned it into reality. The real estate platform they developed is user-friendly and has significantly improved our lead generation.',
        rating: 5,
        isActive: true,
        isFeatured: true,
        order: 3,
      },
      {
        name: 'David Thompson',
        position: 'Owner',
        company: 'Foodie Delights',
        content: 'Our restaurant ordering app has been a game-changer. Customers love the interface and the real-time tracking feature. Tomsher\'s expertise in mobile development is outstanding.',
        rating: 5,
        isActive: true,
        isFeatured: false,
        order: 4,
      },
      {
        name: 'Lisa Anderson',
        position: 'VP of Operations',
        company: 'Tech Innovations Inc',
        content: 'The website redesign not only looks amazing but also performs exceptionally well. Our bounce rate decreased and conversions increased significantly. Highly recommend Tomsher Technologies!',
        rating: 5,
        isActive: true,
        isFeatured: false,
        order: 5,
      },
    ]);
    console.log('Created testimonials');

    const blogPosts = await BlogPost.insertMany([
      {
        title: 'The Future of Web Development in 2024',
        slug: 'future-of-web-development-2024',
        content: 'Web development continues to evolve at a rapid pace. In 2024, we\'re seeing exciting trends that are shaping the future of how we build web applications...',
        excerpt: 'Explore the latest trends and technologies shaping web development in 2024.',
        category: 'Web Development',
        tags: ['Web Development', 'Technology', 'Trends'],
        status: PostStatus.PUBLISHED,
        views: 1250,
        readTime: 8,
        publishedAt: new Date(),
      },
      {
        title: 'Building Scalable E-Commerce Platforms',
        slug: 'building-scalable-ecommerce-platforms',
        content: 'Creating an e-commerce platform that can scale with your business is crucial for long-term success. Here are the key considerations...',
        excerpt: 'Learn how to build e-commerce platforms that grow with your business.',
        category: 'E-Commerce',
        tags: ['E-Commerce', 'Scalability', 'Best Practices'],
        status: PostStatus.PUBLISHED,
        views: 890,
        readTime: 10,
        publishedAt: new Date(),
      },
      {
        title: 'Mobile App Development: Native vs Cross-Platform',
        slug: 'native-vs-cross-platform-mobile-development',
        content: 'Choosing between native and cross-platform development is one of the most important decisions when building a mobile app...',
        excerpt: 'Compare native and cross-platform approaches to mobile app development.',
        category: 'Mobile Development',
        tags: ['Mobile Development', 'React Native', 'iOS', 'Android'],
        status: PostStatus.PUBLISHED,
        views: 1450,
        readTime: 12,
        publishedAt: new Date(),
      },
    ]);
    console.log('Created blog posts');

    await Settings.insertMany([
      {
        key: 'site_name',
        value: 'Tomsher Technologies',
        type: SettingType.STRING,
        group: 'general',
      },
      {
        key: 'site_description',
        value: 'Leading web development company in Dubai, UAE',
        type: SettingType.STRING,
        group: 'general',
      },
      {
        key: 'contact_email',
        value: 'info@tomsher.com',
        type: SettingType.STRING,
        group: 'contact',
      },
      {
        key: 'contact_phone',
        value: '+971 4 123 4567',
        type: SettingType.STRING,
        group: 'contact',
      },
      {
        key: 'social_facebook',
        value: 'https://facebook.com/tomsher',
        type: SettingType.STRING,
        group: 'social',
      },
      {
        key: 'social_twitter',
        value: 'https://twitter.com/tomsher',
        type: SettingType.STRING,
        group: 'social',
      },
      {
        key: 'social_linkedin',
        value: 'https://linkedin.com/company/tomsher',
        type: SettingType.STRING,
        group: 'social',
      },
    ]);
    console.log('Created settings');

    const homePage = await Page.create({
      title: 'Home',
      slug: 'home',
      description: 'Welcome to Tomsher Technologies - Your trusted partner for web development in Dubai',
      metaTitle: 'Tomsher Technologies - Web Development Company in Dubai',
      metaDescription: 'Leading web development company in Dubai, UAE. We specialize in custom web applications, mobile apps, and e-commerce solutions.',
      status: PageStatus.PUBLISHED,
      type: PageType.HOME,
      authorId: adminUser._id,
      publishedAt: new Date(),
    });

    await PageSection.create({
      pageId: homePage._id,
      sectionId: heroSection._id,
      order: 1,
      content: {
        title: 'Transform Your Digital Presence',
        subtitle: 'Leading Web Development Company in Dubai',
        description: 'We create innovative web solutions that drive business growth. From custom web applications to mobile apps, we bring your vision to life.',
        ctaText: 'Get Started',
        ctaLink: '/contact',
      },
      variant: 'variant1',
      isVisible: true,
    });

    await PageSection.create({
      pageId: homePage._id,
      sectionId: servicesSection._id,
      order: 2,
      content: {
        title: 'Our Services',
        subtitle: 'Comprehensive Digital Solutions',
      },
      variant: 'grid',
      isVisible: true,
    });

    await PageSection.create({
      pageId: homePage._id,
      sectionId: statsSection._id,
      order: 3,
      content: {
        stats: [
          { label: 'Projects Completed', value: '500+' },
          { label: 'Happy Clients', value: '200+' },
          { label: 'Years Experience', value: '10+' },
          { label: 'Team Members', value: '50+' },
        ],
      },
      variant: 'default',
      isVisible: true,
    });

    await PageSection.create({
      pageId: homePage._id,
      sectionId: portfolioSection._id,
      order: 4,
      content: {
        title: 'Our Work',
        subtitle: 'Featured Projects',
      },
      variant: 'grid',
      isVisible: true,
    });

    await PageSection.create({
      pageId: homePage._id,
      sectionId: testimonialsSection._id,
      order: 5,
      content: {
        title: 'What Our Clients Say',
      },
      variant: 'carousel',
      isVisible: true,
    });

    await PageSection.create({
      pageId: homePage._id,
      sectionId: ctaSection._id,
      order: 6,
      content: {
        title: 'Ready to Start Your Project?',
        description: 'Let\'s discuss how we can help you achieve your digital goals.',
        ctaText: 'Contact Us',
        ctaLink: '/contact',
      },
      variant: 'centered',
      isVisible: true,
    });

    console.log('Created home page with sections');

    const aboutPage = await Page.create({
      title: 'About Us',
      slug: 'about',
      description: 'Learn more about Tomsher Technologies and our mission',
      metaTitle: 'About Tomsher Technologies - Web Development Experts',
      metaDescription: 'Tomsher Technologies is a leading web development company in Dubai with over 10 years of experience in creating innovative digital solutions.',
      status: PageStatus.PUBLISHED,
      type: PageType.ABOUT,
      authorId: adminUser._id,
      publishedAt: new Date(),
    });

    await PageSection.create({
      pageId: aboutPage._id,
      sectionId: aboutSection._id,
      order: 1,
      content: {
        title: 'About Tomsher Technologies',
        description: 'Founded in 2014, Tomsher Technologies has been at the forefront of web development in Dubai. We are a team of passionate developers, designers, and digital strategists committed to delivering exceptional results. Our mission is to help businesses succeed in the digital world through innovative technology solutions.',
        stats: [
          { label: 'Years in Business', value: '10+' },
          { label: 'Team Members', value: '50+' },
          { label: 'Countries Served', value: '15+' },
        ],
      },
      variant: 'with-stats',
      isVisible: true,
    });

    await PageSection.create({
      pageId: aboutPage._id,
      sectionId: ctaSection._id,
      order: 2,
      content: {
        title: 'Join Our Team',
        description: 'We\'re always looking for talented individuals to join our growing team.',
        ctaText: 'View Careers',
        ctaLink: '/careers',
      },
      variant: 'default',
      isVisible: true,
    });

    console.log('Created about page with sections');

    const contactPage = await Page.create({
      title: 'Contact Us',
      slug: 'contact',
      description: 'Get in touch with Tomsher Technologies',
      metaTitle: 'Contact Tomsher Technologies - Get a Free Quote',
      metaDescription: 'Contact us for a free consultation. We\'re here to help you with your web development, mobile app, and digital marketing needs.',
      status: PageStatus.PUBLISHED,
      type: PageType.CONTACT,
      authorId: adminUser._id,
      publishedAt: new Date(),
    });

    await PageSection.create({
      pageId: contactPage._id,
      sectionId: contactSection._id,
      order: 1,
      content: {
        title: 'Get In Touch',
        subtitle: 'We\'d love to hear from you',
        email: 'info@tomsher.com',
        phone: '+971 4 123 4567',
        address: 'Dubai, United Arab Emirates',
      },
      variant: 'form',
      isVisible: true,
    });

    console.log('Created contact page with sections');

    const servicesPage = await Page.create({
      title: 'Our Services',
      slug: 'services',
      description: 'Explore our comprehensive range of digital services',
      metaTitle: 'Our Services - Web Development, Mobile Apps & More',
      metaDescription: 'Discover our full range of services including web development, mobile app development, e-commerce solutions, UI/UX design, and digital marketing.',
      status: PageStatus.PUBLISHED,
      type: PageType.SERVICE,
      authorId: adminUser._id,
      publishedAt: new Date(),
    });

    await PageSection.create({
      pageId: servicesPage._id,
      sectionId: servicesSection._id,
      order: 1,
      content: {
        title: 'Our Services',
        subtitle: 'Comprehensive Digital Solutions for Your Business',
      },
      variant: 'cards',
      isVisible: true,
    });

    await PageSection.create({
      pageId: servicesPage._id,
      sectionId: ctaSection._id,
      order: 2,
      content: {
        title: 'Need a Custom Solution?',
        description: 'We can create a tailored solution that fits your specific business needs.',
        ctaText: 'Contact Us',
        ctaLink: '/contact',
      },
      variant: 'split',
      isVisible: true,
    });

    console.log('Created services page with sections');

    const portfolioPage = await Page.create({
      title: 'Our Portfolio',
      slug: 'portfolio',
      description: 'View our latest projects and success stories',
      metaTitle: 'Portfolio - Our Work & Success Stories',
      metaDescription: 'Browse our portfolio of successful web development, mobile app, and e-commerce projects. See how we\'ve helped businesses grow.',
      status: PageStatus.PUBLISHED,
      type: PageType.PORTFOLIO,
      authorId: adminUser._id,
      publishedAt: new Date(),
    });

    await PageSection.create({
      pageId: portfolioPage._id,
      sectionId: portfolioSection._id,
      order: 1,
      content: {
        title: 'Our Portfolio',
        subtitle: 'Showcasing Our Best Work',
      },
      variant: 'masonry',
      isVisible: true,
    });

    console.log('Created portfolio page with sections');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nAdmin Credentials:');
    console.log('Email: admin@tomsher.com');
    console.log('Password: admin123');
    console.log('\nPages created:');
    console.log('- Home (/home)');
    console.log('- About (/about)');
    console.log('- Services (/services)');
    console.log('- Portfolio (/portfolio)');
    console.log('- Contact (/contact)');
    console.log('\nData created:');
    console.log(`- ${services.length} Services`);
    console.log(`- ${portfolios.length} Portfolio Items`);
    console.log(`- ${testimonials.length} Testimonials`);
    console.log(`- ${blogPosts.length} Blog Posts`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
