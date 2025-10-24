import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FormSubmission from '@/models/FormSubmission';

export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    const submission = await FormSubmission.create({
      ...body,
      ipAddress,
      userAgent,
      status: 'new',
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      id: submission._id 
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to submit form' 
    }, { status: 500 });
  }
}
