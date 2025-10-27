import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { paths, tags, all } = body;

    const revalidated: { paths: string[], tags: string[] } = {
      paths: [],
      tags: []
    };

    if (all) {
      const commonPaths = [
        '/',
        '/services',
        '/portfolio',
        '/blog',
        '/contact',
        '/terms',
        '/privacy',
        '/about'
      ];

      for (const path of commonPaths) {
        try {
          revalidatePath(path);
          revalidated.paths.push(path);
        } catch (error) {
          console.error(`Error revalidating path ${path}:`, error);
        }
      }

      try {
        revalidatePath('/', 'layout');
        revalidated.paths.push('/ (layout)');
      } catch (error) {
        console.error('Error revalidating layout:', error);
      }
    }

    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        try {
          revalidatePath(path);
          revalidated.paths.push(path);
        } catch (error) {
          console.error(`Error revalidating path ${path}:`, error);
        }
      }
    }

    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        try {
          revalidateTag(tag);
          revalidated.tags.push(tag);
        } catch (error) {
          console.error(`Error revalidating tag ${tag}:`, error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      revalidated
    });

  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}
