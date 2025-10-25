import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ isFeatured: -1, order: 1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
