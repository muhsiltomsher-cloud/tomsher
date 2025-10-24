import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Settings from '@/models/Settings'

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const defaultSettings = {
      enableSkeletonLoaders: true,
      enablePageTransitions: true,
      pageTransitionVariant: 'fade',
      enableScrollAnimations: true,
      scrollAnimationVariant: 'slideUp',
      enableImageOptimization: true,
      enableLazyLoading: true,
      animationDuration: 0.6,
      animationDelay: 0,
    }

    const setting = await Settings.findOne({ key: 'performance' })
    
    if (!setting) {
      return NextResponse.json(defaultSettings)
    }

    return NextResponse.json(setting.value)
  } catch (error) {
    console.error('Error fetching performance settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    await dbConnect()

    await Settings.findOneAndUpdate(
      { key: 'performance' },
      { 
        key: 'performance',
        value: data,
        type: 'JSON',
        group: 'performance'
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving performance settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
