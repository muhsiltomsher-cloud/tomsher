import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function GET() {
  try {
    await connectDB();
    const portfolio = await Portfolio.find().sort({ order: 1 });
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const portfolioItem = await Portfolio.create(body);

    return NextResponse.json(portfolioItem, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
