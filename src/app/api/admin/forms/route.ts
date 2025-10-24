import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import FormSubmission from '@/models/FormSubmission';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const submissions = await FormSubmission.find().sort({ createdAt: -1 });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
