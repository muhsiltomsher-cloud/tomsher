'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

interface ProcessStep {
  title: string
  subtitle: string
  description: string
  details: string[]
  bgColor: string
  tabColor: string
  imageSrc: string
}

const defaultSteps: ProcessStep[] = [
  {
    title: 'Discover',
    subtitle: 'Research & Analysis Phase',
    description:
      'We approach exploration as the ultimate endeavor: at the onset of each project, we meticulously analyze and dissect every element to enrich the virtual experience.',
    details: [
      'In-depth market research and competitor analysis',
      'User behavior studies and target audience identification',
      'Technical requirements gathering and documentation',
      'Project scope definition and milestone planning',
    ],
    bgColor: '#d6f8ff',
    tabColor: '#0597B3',
    imageSrc: '/images/Discover.png',
  },
  {
    title: 'Design',
    subtitle: 'Creative & UX Development',
    description:
      'Guided by our objectives, we craft the optimal solution with an aesthetic focus aimed at marvel and ultimate effectiveness.',
    details: [
      'User interface wireframing and prototyping',
      'Visual design and branding integration',
      'Interactive user experience mapping',
      'Mobile-first responsive design approach',
    ],
    bgColor: '#f3e8ff',
    tabColor: '#9333ea',
    imageSrc: '/images/design.png',
  },
  {
    title: 'Develop',
    subtitle: 'Technical Implementation',
    description:
      'The synergy of technique, creativity, and problem-solving expertise brings the envisioned project to life in its most captivating form.',
    details: [
      'Clean, efficient code implementation',
      'Cross-browser compatibility testing',
      'Performance optimization and speed tuning',
      'Security measures implementation',
    ],
    bgColor: '#e0f7fa',
    tabColor: '#0d9488',
    imageSrc: '/images/develop.png',
  },
  {
    title: 'Distribute',
    subtitle: 'Launch & Optimization',
    description:
      'Accessibility and usability serve as our beacons throughout the project lifecycle: we envisage our projects in the broadest, most intuitive, and welcoming environments possible.',
    details: [
      'Comprehensive quality assurance testing',
      'Search engine optimization implementation',
      'Performance monitoring setup',
      'Post-launch support and maintenance',
    ],
    bgColor: '#fff8e1',
    tabColor: '#f59e0b',
    imageSrc: '/images/Distribute.png',
  },
]

interface OurProcessSectionProps {
  data?: {
    title?: string
    subtitle?: string
    description?: string
    steps?: ProcessStep[]
  }
}

const OurProcessSection: React.FC<OurProcessSectionProps> = ({ data }) => {
  const [activeStep, setActiveStep] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement | null>(null)

  const steps = data?.steps || defaultSteps
  const title = data?.title || 'Our Development Process'
  const subtitle = data?.subtitle || 'Transforming Ideas into Digital Excellence'
  const description = data?.description || 'At Tomsher, we follow a systematic approach to web development that combines creativity with technical expertise. Our proven four-phase methodology ensures successful project delivery.'

  useEffect(() => {
    const activeTab = tabRefs.current[activeStep]
    const indicator = indicatorRef.current
    if (activeTab && indicator) {
      const { offsetLeft, offsetWidth } = activeTab
      indicator.style.transform = `translateX(${offsetLeft}px)`
      indicator.style.width = `${offsetWidth}px`
      indicator.style.backgroundColor = steps[activeStep].tabColor
    }
  }, [activeStep, steps])

  const handleTabClick = (index: number) => {
    setActiveStep(index)
    swiperRef.current?.slideTo(index)
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-[50px]">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-[20px]">
          <div className="space-y-6">
            <p className="text-[18px] font-semibold text-primary leading-tight">
              {title}
            </p>
            <h2 className="text-5xl font-light text-black leading-tight">
              {subtitle.split('Digital Excellence').map((part, index) => (
                index === 0 ? (
                  <span key={index}>{part}</span>
                ) : (
                  <span key={index}>
                    <span className="text-primary">Digital Excellence</span>
                    {part}
                  </span>
                )
              ))}
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-[20px] leading-normal text-gray-500">
              {description}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-[65px] z-10 flex justify-start lg:justify-center md:static md:px-0 mb-10 overflow-x-auto">
          <div className="bg-gray-100 relative flex gap-4 overflow-visible rounded-full border border-[#EFF1F4] p-2 transition-colors duration-300">
            <div
              ref={indicatorRef}
              className="absolute bottom-2 top-2 left-0 rounded-full transition-all duration-300 z-0"
              style={{
                width: '0px',
                backgroundColor: steps[activeStep].tabColor,
              }}
            />
            {steps.map((step, index) => (
              <button
                key={index}
                ref={(el: HTMLButtonElement | null) => {
                  tabRefs.current[index] = el
                }}
                onClick={() => handleTabClick(index)}
                className="z-[1] rounded-full px-6 py-3 font-mono font-medium capitalize transition-colors duration-300 whitespace-nowrap"
                style={{
                  color: activeStep === index ? '#fff' : '#333',
                  backgroundColor: activeStep === index ? steps[activeStep].tabColor : 'transparent',
                }}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Swiper Content */}
        <Swiper
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          onSlideChange={(swiper: SwiperType) => setActiveStep(swiper.activeIndex)}
          slidesPerView={1}
          spaceBetween={30}
          loop={false}
          speed={200}
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex flex-col lg:flex-row gap-8 rounded-xl overflow-hidden"
                style={{ backgroundColor: step.bgColor }}
              >
                <div className="lg:w-1/2 space-y-6 p-[30px]">
                  <h2
                    className="text-[30px] font-bold"
                    style={{ color: step.tabColor }}
                  >
                    0{index + 1}. {step.title}
                  </h2>
                  <h3 className="text-[40px] font-light text-gray-800">{step.subtitle}</h3>
                  <p className="text-black text-lg">{step.description}</p>
                  <button className="mt-6 px-6 py-3 bg-primary text-white rounded-full font-semibold transition-transform transform hover:scale-105">
                    Learn More
                  </button>
                </div>
                <div className="lg:w-1/2">
                  <Image
                    src={step.imageSrc}
                    alt={`${step.title} process illustration`}
                    width={700}
                    height={400}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default OurProcessSection
