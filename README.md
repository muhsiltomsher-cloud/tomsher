# Tomsher Technologies Website

A modern, responsive website built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB for Tomsher Technologies - a leading web development company in Dubai, UAE.

## 🚀 Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Content Management**: Dynamic sections with multiple design variants
- **Database**: MongoDB integration with Prisma ORM
- **Admin Panel**: Full-featured admin dashboard for content management
- **SEO Optimized**: Built-in SEO features and meta tag management
- **Performance**: Optimized for speed and Core Web Vitals
- **Accessibility**: WCAG compliant and screen reader friendly

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Material-UI
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **File Uploads**: UploadThing
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tomsher
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- MongoDB connection string
- NextAuth secret
- UploadThing credentials
- Email configuration

4. Generate Prisma client:
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes
│   └── services/       # Service pages
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── sections/      # Page sections
│   ├── layout/        # Layout components
│   └── admin/         # Admin components
├── lib/               # Utility functions
├── types/             # TypeScript types
├── hooks/             # Custom React hooks
├── store/             # State management
└── styles/            # Global styles
```

## 🎨 Design System

The website features a comprehensive design system with:

- **Multiple Section Variants**: Each section can have 2-6 different design variations
- **Reusable Components**: Modular components for consistency
- **Dynamic Content**: Admin-controlled content and layouts
- **Responsive Grid**: Mobile-first responsive design
- **Color System**: Consistent color palette with CSS variables
- **Typography**: Custom font stack with Poppins and Inter

## 📊 Admin Panel Features

- **Page Management**: Create and edit pages with drag-and-drop sections
- **Section Builder**: Choose from multiple design variants for each section
- **Media Library**: Upload and manage images with optimization
- **Content Editor**: Rich text editor for content creation
- **SEO Management**: Meta tags, descriptions, and schema markup
- **Analytics Dashboard**: Track performance and user engagement
- **User Management**: Role-based access control

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check
- `npm run format` - Format code with Prettier

## 🌟 Key Features

### Dynamic Section System
Each page can be built using reusable sections with multiple design variants:
- Hero sections (3 variants)
- Service sections (6 variants)
- Portfolio sections (4 variants)
- Testimonial sections (3 variants)
- Contact sections (5 variants)

### Content Management
- Visual page builder
- Real-time preview
- Version control
- Scheduled publishing
- SEO optimization

### Performance Optimizations
- Image optimization with Next.js Image
- Code splitting and lazy loading
- CDN integration
- Caching strategies
- Core Web Vitals optimization

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🔒 Security

- Environment variable protection
- CSRF protection
- Rate limiting
- Input validation
- Secure authentication
- XSS prevention

## 📈 SEO Features

- Dynamic meta tags
- Open Graph integration
- Twitter Cards
- Structured data
- XML sitemaps
- Robots.txt
- Canonical URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary software owned by Tomsher Technologies LLC.

## 📞 Support

For support and inquiries:
- Email: info@tomsher.com
- Phone: +971 4 123 4567
- Website: https://tomsher.com

---

Built with ❤️ by Tomsher Technologies