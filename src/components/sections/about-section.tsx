'use client'

import { useState, useEffect } from 'react'
import SectionWrapper from '@/common/components/SectionWrapper'
import Button from '@/common/components/Button'

interface AboutContent {
  yearsText: string
  yearsLabel: string
  tagline1: string
  tagline2: string
  tagline3: string
  sectionLabel: string
  title: string
  titleHighlight: string
  description: string
  button1Text: string
  button1Link: string
  button2Text: string
  button2Link: string
  videoUrl: string
}

const defaultContent: AboutContent = {
  yearsText: '14+',
  yearsLabel: 'years of excellence',
  tagline1: 'Creative Designs.',
  tagline2: 'Meaningful Impact.',
  tagline3: 'Measurable Result.',
  sectionLabel: 'About tomsher',
  title: 'Web Design',
  titleHighlight: 'Company in Dubai',
  description: 'Tomsher is a leading web software solutions provider based in the UAE, specializing in web design and digital marketing. As the best web design company in Dubai, we take pride in our expert in-house web development team, delivering top-notch, high-quality services to meet all your digital needs. We have been working with multinational, semi-government, corporate, SME and start-up companies from Middle East, Africa, Asia, Europe and America. Our majority of clients are from UAE and have clientele across 30+ countries around the globe.',
  button1Text: 'Learn More',
  button1Link: '/about',
  button2Text: 'Contact us today',
  button2Link: '/contact',
  videoUrl: 'https://player.vimeo.com/video/1044576275?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0'
}

export const AboutSection = () => {
  const [content, setContent] = useState<AboutContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          if (data.homeAbout) {
            setContent({
              yearsText: data.homeAbout.yearsText || defaultContent.yearsText,
              yearsLabel: data.homeAbout.yearsLabel || defaultContent.yearsLabel,
              tagline1: data.homeAbout.tagline1 || defaultContent.tagline1,
              tagline2: data.homeAbout.tagline2 || defaultContent.tagline2,
              tagline3: data.homeAbout.tagline3 || defaultContent.tagline3,
              sectionLabel: data.homeAbout.sectionLabel || defaultContent.sectionLabel,
              title: data.homeAbout.title || defaultContent.title,
              titleHighlight: data.homeAbout.titleHighlight || defaultContent.titleHighlight,
              description: data.homeAbout.description || defaultContent.description,
              button1Text: data.homeAbout.button1Text || defaultContent.button1Text,
              button1Link: data.homeAbout.button1Link || defaultContent.button1Link,
              button2Text: data.homeAbout.button2Text || defaultContent.button2Text,
              button2Link: data.homeAbout.button2Link || defaultContent.button2Link,
              videoUrl: data.homeAbout.videoUrl || defaultContent.videoUrl,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching about content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  if (loading) {
    return null
  }

  return (
    <SectionWrapper className="!bg-white" containerClassName="py-[100px]">
      <div className="space-y-3">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Section */}
          <div className="flex gap-2">
            <div className="flex flex-col">
              <span className="text-[100px] font-thin text-primary leading-[80px]">
                {content.yearsText}
              </span>
              <span className="text-xs uppercase tracking-wider text-gray-500">
                {content.yearsLabel}
              </span>
            </div>
            <h2 className="text-gray-500 text-2xl mb-0 leading-snug font-light">
              {content.tagline1}<br />
              {content.tagline2}<br />
              {content.tagline3}
            </h2>
          </div>

          {/* Right Section */}
          <div className="max-w-2xl">
            <p className="text-[18px] pt-[15px] font-semibold text-primary leading-tight">
              {content.sectionLabel}
            </p>
            <h1 className="text-5xl pt-[15px] font-light text-black leading-tight">
              {content.title} <span className="text-primary">{content.titleHighlight}</span> & Digital Marketing Company
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Video */}
          <div className="overflow-hidden" style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src={content.videoUrl}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              title="tomsher-about"
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-3">
            <p className="text-[16px] leading-[25px] text-gray-500 pt-[20px]">
              {content.description}
            </p>

            <div className="flex gap-4 !pt-7">
              <Button customVariant="normal" size="medium" href={content.button1Link}>
                {content.button1Text}
              </Button>
              <Button customVariant="outline" size="medium" href={content.button2Link}>
                {content.button2Text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
