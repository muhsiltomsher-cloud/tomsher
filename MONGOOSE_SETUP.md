# Mongoose Setup and Admin Panel Guide

This document explains the Mongoose migration and how to use the new admin panel.

## What Changed

### Migration from Prisma to Mongoose
- ✅ Removed Prisma dependencies (`@prisma/client`, `prisma`)
- ✅ Removed `prisma/` directory and schema
- ✅ Added Mongoose as the MongoDB ORM
- ✅ Created 11 Mongoose models in `src/models/`
- ✅ Created database connection utility with caching

### New Features
- ✅ NextAuth authentication system
- ✅ Admin login page at `/admin/login`
- ✅ Admin dashboard at `/admin/dashboard`
- ✅ Protected admin routes with middleware
- ✅ API routes for CRUD operations
- ✅ Comprehensive seed script with sample data

## Database Models

All models are located in `src/models/`:

1. **User** - Admin users with role-based access
2. **Page** - Website pages (Home, About, Services, etc.)
3. **Section** - Reusable page sections
4. **PageSection** - Junction table linking pages and sections
5. **Service** - Service offerings
6. **Portfolio** - Portfolio projects
7. **Testimonial** - Client testimonials
8. **BlogPost** - Blog articles
9. **Contact** - Contact form submissions
10. **Media** - Uploaded files and images
11. **Settings** - Site-wide settings

## MongoDB Connection

### Environment Variables

Make sure your `.env.local` file has the correct MongoDB URI:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**Important**: Special characters in the password must be URL-encoded:
- `@` becomes `%40`
- `!` becomes `%21`
- `#` becomes `%23`
- `$` becomes `%24`
- etc.

### IP Whitelisting

If using MongoDB Atlas, you need to whitelist your IP address:

1. Go to MongoDB Atlas dashboard
2. Navigate to Network Access
3. Click "Add IP Address"
4. Either add your current IP or use `0.0.0.0/0` for all IPs (development only)

## Seeding the Database

Once your MongoDB connection is working, run the seed script:

```bash
npm run db:seed
```

This will:
- Clear existing data
- Create an admin user
- Create 8 section templates
- Add 6 services
- Add 5 portfolio items
- Add 5 testimonials
- Add 3 blog posts
- Create 5 pages (Home, About, Services, Portfolio, Contact)
- Add site settings

### Default Admin Credentials

After seeding, you can login with:
- **Email**: `admin@tomsher.com`
- **Password**: `admin123`

**⚠️ Change these credentials in production!**

## Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Enter your credentials
3. You'll be redirected to `/admin/dashboard`

### Admin Dashboard Features

The dashboard provides access to:

- **Pages** - Manage website pages
- **Services** - Add/edit services
- **Portfolio** - Manage portfolio items
- **Testimonials** - Manage client testimonials
- **Blog Posts** - Create and edit blog articles
- **Contacts** - View contact form submissions
- **Settings** - Configure site settings

### API Routes

All admin API routes are protected and require authentication:

- `GET /api/admin/stats` - Dashboard statistics
- `GET/POST /api/admin/services` - Services CRUD
- `GET/POST /api/admin/portfolio` - Portfolio CRUD
- `GET/POST /api/admin/testimonials` - Testimonials CRUD
- `GET/POST /api/admin/blog` - Blog posts CRUD
- `GET /api/admin/contacts` - View contacts
- `GET/POST /api/admin/pages` - Pages CRUD

## Development Workflow

### Starting Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Running Lint

```bash
npm run lint
```

### Type Checking

```bash
npm run type-check
```

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── login/          # Login page
│   │   └── dashboard/      # Dashboard
│   └── api/
│       ├── auth/           # NextAuth API routes
│       └── admin/          # Admin API routes
├── lib/
│   └── mongodb.ts          # MongoDB connection utility
├── models/                 # Mongoose models
│   ├── User.ts
│   ├── Page.ts
│   ├── Section.ts
│   ├── Service.ts
│   ├── Portfolio.ts
│   ├── Testimonial.ts
│   ├── BlogPost.ts
│   ├── Contact.ts
│   ├── Media.ts
│   ├── Settings.ts
│   └── index.ts
├── middleware.ts           # Route protection
└── types/
    └── next-auth.d.ts      # NextAuth type definitions

scripts/
└── seed.ts                 # Database seed script
```

## Common Issues

### Connection Errors

If you see connection errors:
1. Check your MongoDB URI is correct
2. Verify special characters are URL-encoded
3. Ensure your IP is whitelisted in MongoDB Atlas
4. Check if MongoDB cluster is running

### Authentication Issues

If login doesn't work:
1. Ensure `NEXTAUTH_SECRET` is set in `.env.local`
2. Check if the user exists in the database
3. Verify the password is correct
4. Clear browser cookies and try again

### Seed Script Fails

If seeding fails:
1. Check MongoDB connection
2. Ensure database is accessible
3. Verify you have write permissions
4. Check for any validation errors in the console

## Next Steps

1. **Whitelist your IP** in MongoDB Atlas
2. **Run the seed script** to populate the database
3. **Login to admin panel** at `/admin/login`
4. **Customize the content** through the admin dashboard
5. **Change default admin password** for security

## Production Deployment

Before deploying to production:

1. ✅ Change default admin credentials
2. ✅ Set strong `NEXTAUTH_SECRET`
3. ✅ Use environment-specific MongoDB URIs
4. ✅ Enable MongoDB Atlas IP whitelisting
5. ✅ Set up proper backup strategy
6. ✅ Configure monitoring and logging
7. ✅ Test all admin functionality

## Support

For issues or questions:
- Check the MongoDB connection logs
- Review the seed script output
- Verify environment variables are set correctly
- Ensure all dependencies are installed

---

**Built with ❤️ using Mongoose, Next.js 14, and NextAuth**
