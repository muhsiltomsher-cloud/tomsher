'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export default function PageHero({
  title,
  subtitle,
  image,
  buttonText,
  buttonUrl,
}: PageHeroProps) {
  return (
    <section
      className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 to-primary/5"
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {image && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${image ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-lg lg:text-xl mb-8 ${image ? 'text-gray-200' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
          {buttonText && buttonUrl && (
            <Button asChild size="lg" className="btn-primary">
              <Link href={buttonUrl}>{buttonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
