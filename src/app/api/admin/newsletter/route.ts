import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const existing = await Newsletter.findOne({ email: body.email });
    if (existing) {
      if (existing.status === 'unsubscribed') {
        existing.status = 'subscribed';
        existing.subscribedAt = new Date();
        await existing.save();
        return NextResponse.json(existing);
      }
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }
    
    const subscriber = await Newsletter.create(body);
    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    console.error('Error creating subscriber:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
