'use client';
import { useState } from 'react';

interface Location {
  id: number;
  name: string;
  content: {
    services: string[];
    description: string;
  };
}

const locations: Location[] = [
  {
    id: 1,
    name: "WEB DESIGN DUBAI",
    content: {
      services: [
        "Custom Website Development",
        "E-commerce Solutions",
        "Mobile-Responsive Design",
        "Enterprise Web Applications",
        "Digital Marketing Services"
      ],
      description: "Leading web design company in Dubai offering innovative digital solutions for businesses."
    }
  },
  {
    id: 2,
    name: "WEB DESIGN ABU DHABI",
    content: {
      services: [
        "Corporate Website Design",
        "E-commerce Development",
        "UI/UX Design Services",
        "Digital Transformation",
        "SEO Optimization"
      ],
      description: "Professional web design services in Abu Dhabi focusing on modern, scalable solutions."
    }
  },
  {
    id: 3,
    name: "WEB DESIGN SHARJAH",
    content: {
      services: [
        "Business Website Design",
        "E-commerce Platforms",
        "Mobile App Development",
        "Digital Marketing",
        "Web Maintenance"
      ],
      description: "Expert web design and development services in Sharjah for growing businesses."
    }
  },
  {
    id: 4,
    name: "WEB DESIGN AJMAN",
    content: {
      services: [
        "Responsive Website Design",
        "Online Store Development",
        "CMS Solutions",
        "Digital Branding",
        "Local SEO"
      ],
      description: "Comprehensive web design solutions in Ajman tailored to local businesses."
    }
  },
  {
    id: 5,
    name: "WEB DESIGN RAS AL KHAIMAH",
    content: {
      services: [
        "Custom Web Development",
        "E-commerce Websites",
        "WordPress Development",
        "Digital Marketing",
        "Web Hosting"
      ],
      description: "Professional web design services in RAK delivering cutting-edge solutions."
    }
  },
  {
    id: 6,
    name: "WEB DESIGN FUJAIRAH",
    content: {
      services: [
        "Business Websites",
        "E-commerce Solutions",
        "Mobile-First Design",
        "SEO Services",
        "Web Maintenance"
      ],
      description: "Expert web design and development services in Fujairah for local businesses."
    }
  },
  {
    id: 7,
    name: "WEB DESIGN UMM AL QUWAIN",
    content: {
      services: [
        "Corporate Websites",
        "Online Stores",
        "Responsive Design",
        "Digital Marketing",
        "Website Management"
      ],
      description: "Professional web design services in UAQ focused on business growth and success."
    }
  }
];

const FooterSEO = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleTabClick = (id: number) => {
    setActiveTab(activeTab === id ? null : id);
  };

  const displayedLocations = showAll ? locations : locations.slice(0, 3);

  return (
    <div className="mt-12 border-t border-white/10">
      <div className="space-y-2">
        {displayedLocations.map((location) => (
          <div key={location.id} className="border-b border-white/5">
            <button
              onClick={() => handleTabClick(location.id)}
              className="w-full py-3 flex items-center justify-between text-gray-400 hover:text-primary transition-colors"
            >
              <span className="text-sm font-medium">{location.name}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  activeTab === location.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              activeTab === location.id ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0'
            }`}>
              <div className="text-sm text-gray-400 space-y-2">
                <p>{location.content.description}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {location.content.services.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Centered Button Container */}
      <div className="flex justify-center mt-6">
        {locations.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 border border-white/20 rounded-full text-sm text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 flex items-center gap-2"
          >
            <span>{showAll ? 'View Less' : 'View More'}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                showAll ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default FooterSEO;
