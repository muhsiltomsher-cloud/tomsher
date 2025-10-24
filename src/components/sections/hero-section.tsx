"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <ellipse cx="12" cy="12" rx="10" ry="4" />
    <path d="M2 12a10 10 0 0 0 20 0" />
  </svg>
);

const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M21 3a2.83 2.83 0 0 1-6.58 1.04L7 10.46V13H9.54l6.43-7.41A2.83 2.83 0 0 1 21 3z"/>
    <path d="M14 10l-2.51 2.51a7.433 7.433 0 0 1-6.32 2.07l6.85-6.85"/>
    <path d="M15 15l2 2m1-1l-2-2" />
  </svg>
);

interface Badge {
  text: string;
  icon: string;
}

interface HeroContent {
  backgroundImage: string;
  backgroundColor: string;
  badges: Badge[];
  heading: {
    line1: string;
    line1Highlight: string;
    line2: string;
    line2Highlight: string;
    line3: string;
  };
  description: string;
  worksLink: {
    text: string;
    url: string;
  };
}

const defaultContent: HeroContent = {
  backgroundImage: '/images/bg-hero.png',
  backgroundColor: '#060044',
  badges: [
    { text: 'Trusted by Global Brands', icon: 'globe' },
    { text: 'Web Design & Digital Growth Experts', icon: 'rocket' }
  ],
  heading: {
    line1: 'Build Your',
    line1Highlight: 'Digital World',
    line2: 'with',
    line2Highlight: 'Tomsher',
    line3: 'Powerful, Scalable, Business-Driven Websites'
  },
  description: 'We create award-winning, conversion-focused websites and robust digital solutions for forward-thinking brands. Partner with Tomsher for next-level performance and scalable growth.',
  worksLink: {
    text: 'Our works',
    url: '/works'
  }
};

interface HeroSectionProps {
  data?: HeroContent;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const content = data || defaultContent;

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'globe':
        return <GlobeIcon />;
      case 'rocket':
        return <RocketIcon />;
      default:
        return <GlobeIcon />;
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 900, backgroundColor: content.backgroundColor }}
    >
      <div
        className={`absolute inset-0 bg-cover bg-center z-0 transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          backgroundImage: `url('${content.backgroundImage}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-hidden={true}
      />

      <div className="container mx-auto px-4 relative z-[2] h-full w-full flex flex-col justify-end">
        <div className="w-full pb-[60px] relative">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div
                className={`flex flex-wrap gap-4 mb-6 transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                aria-label="Key selling points"
              >
                {content.badges.map((badge, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-2 bg-black/20 backdrop-blur-lg border border-white/10 shadow-lg text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {renderIcon(badge.icon)}
                    {badge.text}
                  </span>
                ))}
              </div>

              <h1
                className={`text-[40px] md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                {content.heading.line1} <span className="text-white">{content.heading.line1Highlight}</span>
                <br />
                {content.heading.line2} <span className="text-white">{content.heading.line2Highlight}</span>
                <br />
                {content.heading.line3}
              </h1>

              <p
                className={`text-gray-400 max-w-md mt-8 md:mt-12 transition-all duration-700 delay-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                {content.description}
              </p>
            </div>

            <Link
              href={content.worksLink.url}
              className={`self-end text-white text-base md:text-lg font-semibold flex items-center gap-2 whitespace-nowrap hover:underline transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              aria-label={`View ${content.worksLink.text}`}
            >
              {content.worksLink.text}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
