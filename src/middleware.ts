export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/pages/:path*', '/admin/services/:path*', '/admin/portfolio/:path*', '/admin/testimonials/:path*', '/admin/blog/:path*', '/admin/contacts/:path*', '/admin/settings/:path*'],
};
