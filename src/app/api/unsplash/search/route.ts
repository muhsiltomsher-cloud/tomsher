import { NextRequest, NextResponse } from 'next/server';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'demo';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') || 'business';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '12';

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`,
      {
        headers: {
          'Accept-Version': 'v1',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }

    const data = await response.json();
    
    const images = data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      alt: photo.alt_description || photo.description || 'Unsplash image',
      author: photo.user.name,
      authorUrl: photo.user.links.html,
      downloadUrl: photo.links.download_location,
    }));

    return NextResponse.json({
      images,
      total: data.total,
      totalPages: data.total_pages,
    });
  } catch (error) {
    console.error('Unsplash API error:', error);
    
    return NextResponse.json({
      images: [
        {
          id: 'demo-1',
          url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
          thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200',
          alt: 'Team collaboration',
          author: 'Demo',
          authorUrl: '#',
        },
        {
          id: 'demo-2',
          url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
          thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200',
          alt: 'Business analytics',
          author: 'Demo',
          authorUrl: '#',
        },
        {
          id: 'demo-3',
          url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
          thumb: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200',
          alt: 'Office workspace',
          author: 'Demo',
          authorUrl: '#',
        },
      ],
      total: 3,
      totalPages: 1,
    });
  }
}
