import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const SectionContentSchema = new mongoose.Schema({
  sectionKey: String,
  pageType: String,
  title: String,
  subtitle: String,
  content: mongoose.Schema.Types.Mixed,
  isActive: Boolean,
  order: Number,
}, { timestamps: true });

const PageContentSchema = new mongoose.Schema({
  pageType: String,
  title: String,
  content: String,
  isActive: Boolean,
}, { timestamps: true });

const SectionContent = mongoose.models.SectionContent || mongoose.model('SectionContent', SectionContentSchema);
const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

const homeSections = [
  {
    sectionKey: 'HERO',
    pageType: 'HOME',
    title: 'Transform Your Digital Presence',
    subtitle: 'Leading Web Development Company in Dubai',
    content: {
      description: 'We create stunning, high-performance websites and applications that drive business growth.',
      features: [
        'Custom Web Development',
        'E-commerce Solutions',
        'Mobile App Development',
        'Digital Marketing'
      ],
      stats: [
        { label: 'Projects Completed', value: '500+' },
        { label: 'Happy Clients', value: '200+' },
        { label: 'Years Experience', value: '10+' }
      ],
      primaryButton: { text: 'Get Started', url: '/contact' },
      secondaryButton: { text: 'View Portfolio', url: '/portfolio' }
    },
    isActive: true,
    order: 1
  },
  {
    sectionKey: 'ABOUT',
    pageType: 'HOME',
    title: 'About Tomsher Technologies',
    subtitle: 'Your Trusted Technology Partner',
    content: {
      description: 'We are a Dubai-based web development company specializing in creating innovative digital solutions. With over 10 years of experience, we have helped hundreds of businesses establish and grow their online presence.',
      image: '/images/about-us.jpg',
      features: [
        { title: 'Expert Team', description: 'Skilled developers and designers', icon: 'team' },
        { title: 'Quality Assurance', description: 'Rigorous testing processes', icon: 'quality' },
        { title: '24/7 Support', description: 'Always here to help', icon: 'support' }
      ]
    },
    isActive: true,
    order: 2
  },
  {
    sectionKey: 'SERVICES',
    pageType: 'HOME',
    title: 'Our Services',
    subtitle: 'Comprehensive Digital Solutions',
    content: {
      services: [
        {
          title: 'Web Development',
          description: 'Custom websites built with modern technologies',
          icon: 'code',
          features: ['Responsive Design', 'SEO Optimized', 'Fast Loading']
        },
        {
          title: 'E-commerce Development',
          description: 'Powerful online stores that drive sales',
          icon: 'shopping',
          features: ['Payment Integration', 'Inventory Management', 'Analytics']
        },
        {
          title: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications',
          icon: 'mobile',
          features: ['iOS & Android', 'React Native', 'Flutter']
        },
        {
          title: 'Digital Marketing',
          description: 'Grow your online presence and reach',
          icon: 'marketing',
          features: ['SEO', 'Social Media', 'Content Marketing']
        }
      ]
    },
    isActive: true,
    order: 3
  },
  {
    sectionKey: 'STATS',
    pageType: 'HOME',
    title: 'Our Achievements',
    subtitle: 'Numbers That Speak',
    content: {
      stats: [
        { label: 'Projects Completed', value: '500+', icon: 'project' },
        { label: 'Happy Clients', value: '200+', icon: 'client' },
        { label: 'Years Experience', value: '10+', icon: 'experience' },
        { label: 'Team Members', value: '50+', icon: 'team' }
      ]
    },
    isActive: true,
    order: 4
  },
  {
    sectionKey: 'PORTFOLIO',
    pageType: 'HOME',
    title: 'Our Portfolio',
    subtitle: 'Recent Projects',
    content: {
      description: 'Explore our latest work and see how we have helped businesses succeed online.',
      viewAllButton: { text: 'View All Projects', url: '/portfolio' }
    },
    isActive: true,
    order: 5
  },
  {
    sectionKey: 'TESTIMONIALS',
    pageType: 'HOME',
    title: 'Client Testimonials',
    subtitle: 'What Our Clients Say',
    content: {
      description: 'Read what our satisfied clients have to say about working with us.'
    },
    isActive: true,
    order: 6
  },
  {
    sectionKey: 'CTA',
    pageType: 'HOME',
    title: 'Ready to Start Your Project?',
    subtitle: 'Let\'s Build Something Amazing Together',
    content: {
      description: 'Contact us today for a free consultation and quote.',
      button: { text: 'Get in Touch', url: '/contact' }
    },
    isActive: true,
    order: 7
  },
  {
    sectionKey: 'CONTACT',
    pageType: 'HOME',
    title: 'Get in Touch',
    subtitle: 'We\'d Love to Hear From You',
    content: {
      address: 'Dubai, United Arab Emirates',
      email: 'info@tomsher.com',
      phone: '+971 XX XXX XXXX',
      socialMedia: {
        facebook: 'https://facebook.com/tomsher',
        twitter: 'https://twitter.com/tomsher',
        linkedin: 'https://linkedin.com/company/tomsher',
        instagram: 'https://instagram.com/tomsher'
      }
    },
    isActive: true,
    order: 8
  }
];

const aboutSections = [
  {
    sectionKey: 'HERO',
    pageType: 'ABOUT',
    title: 'About Tomsher Technologies',
    subtitle: 'Your Trusted Technology Partner Since 2014',
    content: {
      description: 'We are a leading web development company based in Dubai, dedicated to creating innovative digital solutions that help businesses thrive in the digital age.'
    },
    isActive: true,
    order: 1
  },
  {
    sectionKey: 'ABOUT',
    pageType: 'ABOUT',
    title: 'Our Story',
    subtitle: 'A Decade of Excellence',
    content: {
      description: 'Founded in 2014, Tomsher Technologies has grown from a small startup to a leading web development company in Dubai. Our journey has been marked by continuous innovation, client satisfaction, and a commitment to excellence.',
      image: '/images/our-story.jpg'
    },
    isActive: true,
    order: 2
  },
  {
    sectionKey: 'TEAM',
    pageType: 'ABOUT',
    title: 'Our Team',
    subtitle: 'Meet the Experts',
    content: {
      description: 'Our team consists of talented developers, designers, and digital marketing experts who are passionate about creating exceptional digital experiences.'
    },
    isActive: true,
    order: 3
  }
];

const staticPages = [
  {
    pageType: 'TERMS',
    title: 'Terms and Conditions',
    content: `
      <h2>1. Introduction</h2>
      <p>Welcome to Tomsher Technologies. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
      
      <h2>2. Intellectual Property Rights</h2>
      <p>Unless otherwise stated, Tomsher Technologies and/or its licensors own the intellectual property rights for all material on this website.</p>
      
      <h2>3. Restrictions</h2>
      <p>You are specifically restricted from all of the following:</p>
      <ul>
        <li>Publishing any website material in any other media</li>
        <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
        <li>Using this website in any way that is or may be damaging to this website</li>
      </ul>
      
      <h2>4. Your Content</h2>
      <p>In these terms and conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this website.</p>
      
      <h2>5. No warranties</h2>
      <p>This website is provided "as is," with all faults, and Tomsher Technologies express no representations or warranties, of any kind related to this website or the materials contained on this website.</p>
      
      <h2>6. Limitation of liability</h2>
      <p>In no event shall Tomsher Technologies, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website.</p>
      
      <h2>7. Indemnification</h2>
      <p>You hereby indemnify to the fullest extent Tomsher Technologies from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
      
      <h2>8. Variation of Terms</h2>
      <p>Tomsher Technologies is permitted to revise these Terms at any time as it sees fit, and by using this website you are expected to review these Terms on a regular basis.</p>
      
      <h2>9. Governing Law & Jurisdiction</h2>
      <p>These Terms will be governed by and interpreted in accordance with the laws of the United Arab Emirates, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Dubai for the resolution of any disputes.</p>
    `,
    isActive: true
  },
  {
    pageType: 'PRIVACY',
    title: 'Privacy Policy',
    content: `
      <h2>1. Introduction</h2>
      <p>At Tomsher Technologies, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
      
      <h2>2. Information We Collect</h2>
      <p>We may collect information about you in a variety of ways. The information we may collect on the website includes:</p>
      <ul>
        <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact information</li>
        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the website</li>
        <li><strong>Financial Data:</strong> Financial information related to your transactions</li>
      </ul>
      
      <h2>3. Use of Your Information</h2>
      <p>We may use information collected about you to:</p>
      <ul>
        <li>Create and manage your account</li>
        <li>Process your transactions</li>
        <li>Send you marketing and promotional communications</li>
        <li>Respond to your inquiries and offer customer support</li>
        <li>Improve our website and services</li>
      </ul>
      
      <h2>4. Disclosure of Your Information</h2>
      <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
      <ul>
        <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information is necessary to comply with the law</li>
        <li><strong>Business Transfers:</strong> Information may be shared or transferred in connection with any merger, sale of company assets, or acquisition</li>
        <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us</li>
      </ul>
      
      <h2>5. Security of Your Information</h2>
      <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
      
      <h2>6. Policy for Children</h2>
      <p>We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13, we will delete that information as quickly as possible.</p>
      
      <h2>7. Contact Us</h2>
      <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
      <p>Email: info@tomsher.com<br>Phone: +971 XX XXX XXXX</p>
    `,
    isActive: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Seeding home page sections...');
    for (const section of homeSections) {
      await SectionContent.findOneAndUpdate(
        { sectionKey: section.sectionKey, pageType: section.pageType },
        section,
        { upsert: true, new: true }
      );
      console.log(`✓ Seeded ${section.sectionKey} for ${section.pageType}`);
    }

    console.log('\nSeeding about page sections...');
    for (const section of aboutSections) {
      await SectionContent.findOneAndUpdate(
        { sectionKey: section.sectionKey, pageType: section.pageType },
        section,
        { upsert: true, new: true }
      );
      console.log(`✓ Seeded ${section.sectionKey} for ${section.pageType}`);
    }

    console.log('\nSeeding static pages...');
    for (const page of staticPages) {
      await PageContent.findOneAndUpdate(
        { pageType: page.pageType },
        page,
        { upsert: true, new: true }
      );
      console.log(`✓ Seeded ${page.pageType} page`);
    }

    console.log('\n✅ Database seeding completed successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
