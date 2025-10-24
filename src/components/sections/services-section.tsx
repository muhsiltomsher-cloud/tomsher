"use client";

import React from 'react';

interface ServiceItemProps {
  colSpan: string;
  backgroundImage: string;
  icon: string;
  title: string;
  description: string;
  link?: string;
}

interface ServiceData {
  _id: string;
  id: number;
  title: string;
  description: string;
  icon: string;
  backgroundImage: string;
  link?: string;
  order: number;
}

const ArrowSVG: React.FC = () => (
  <svg
    className="absolute top-6 right-6 w-8 h-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const ServiceItem: React.FC<ServiceItemProps> = ({ 
  colSpan, 
  backgroundImage, 
  icon, 
  title, 
  description, 
  link 
}) => (
  <div
    className={`relative !bg-white/50 p-6 overflow-hidden group cursor-pointer ${colSpan} min-h-[350px] transition-all duration-500 ease-in-out rounded-lg hover:shadow-xl`}
    style={{
      backgroundImage: `url('${backgroundImage}')`,
      backgroundPosition: "left center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
    onClick={() => link && window.open(link, '_blank')}
  >
    <ArrowSVG />
    <div className="relative z-10 h-full flex flex-col justify-end">
      <div className="transform transition-all duration-500 ease-in-out group-hover:-translate-y-8">
        <img
          src={icon}
          alt={title}
          className="w-[110px] h-auto bg-transparent rounded mb-4 transition-transform duration-500 object-contain group-hover:scale-90"
        />
        <h3 className="text-[30px] font-light text-primary mb-2 transition-all duration-500">
          {title}
        </h3>
        <p className="text-black font-light text-[18px] transform transition-all duration-500 ease-in-out opacity-0 max-h-0 group-hover:max-h-[150px] group-hover:opacity-100">
          {description}
        </p>
      </div>
    </div>
  </div>
);

interface ServicesSectionProps {
  data?: ServiceData[];
}

export function ServicesSection({ data }: ServicesSectionProps = {}) {
  const services = data || [];

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#bee1e6] py-[100px]">
      <div className="container mx-auto px-4">
        <div id="services">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="mb-4 md:mb-0 space-y-[30px]">
              <p className="text-[18px] pt-[15px] font-semibold text-primary leading-tight">
                Services
              </p>
              <p className="text-5xl font-light text-black">
                Sell here, there, and everywhere
              </p>
            </div>

            <div>
              <p className="text-[20px] leading-normal text-gray-500">
                Tomsher is a leading web software solutions provider based in the UAE, specializing in web design and digital marketing. As the best web design company in Dubai, we take pride in our expert in-house web development team, delivering top-notch, high-quality services to meet all your digital needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <div className="md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {services.slice(0, 4).map((service: ServiceData, index: number) => (
                <ServiceItem
                  key={service._id}
                  colSpan={index === 0 || index === 2 ? "col-span-2" : ""}
                  backgroundImage={service.backgroundImage || ''}
                  icon={service.icon || ''}
                  title={`0${index + 1}. ${service.title}`}
                  description={service.description}
                  link={service.link}
                />
              ))}
            </div>

            {services.slice(4, 5).map((service: ServiceData) => (
              <ServiceItem
                key={service._id}
                colSpan="md:col-span-1 flex flex-col justify-end items-start"
                backgroundImage={service.backgroundImage || ''}
                icon={service.icon || ''}
                title={`05. ${service.title}`}
                description={service.description}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
