'use client'

import { useState, useEffect } from 'react'
import SectionWrapper from '@/common/components/SectionWrapper'
import Button from '@/common/components/Button'

interface LeftContent {
  yearsText?: string
  yearsLabel?: string
  tagline1?: string
  tagline2?: string
  tagline3?: string
}

interface RightContent {
  sectionLabel?: string
  title?: string
  titleHighlight?: string
  description?: string
  button1Text?: string
  button1Link?: string
  button2Text?: string
  button2Link?: string
  videoUrl?: string
}

interface AboutContent {
  leftContent?: LeftContent
  rightContent?: RightContent
}

interface AboutSectionProps {
  data?: AboutContent
}

export const AboutSection = ({ data }: AboutSectionProps = {}) => {
  const [content, setContent] = useState<AboutContent | null>(data ?? null)
  const [loading, setLoading] = useState(!data)

  useEffect(() => {
    if (data) {
      setContent(data)
      setLoading(false)
      return
    }

    const fetchContent = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const fetchedData = await response.json()
          if (fetchedData.homeAbout) {
            setContent(fetchedData.homeAbout)
          } else {
            setContent(null)
          }
        } else {
          setContent(null)
        }
      } catch (error) {
        console.error('Error fetching about content:', error)
        setContent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [data])

  if (loading || !content) {
    return null
  }

  const isFlat = !content.leftContent && !content.rightContent
  
  const leftContent = isFlat ? {
    yearsText: (content as any).yearsText,
    yearsLabel: (content as any).yearsLabel,
    tagline1: (content as any).tagline1,
    tagline2: (content as any).tagline2,
    tagline3: (content as any).tagline3,
  } : content.leftContent
  
  const rightContent = isFlat ? {
    sectionLabel: (content as any).sectionLabel,
    title: (content as any).title,
    titleHighlight: (content as any).titleHighlight,
    description: (content as any).description,
    button1Text: (content as any).button1Text,
    button1Link: (content as any).button1Link,
    button2Text: (content as any).button2Text,
    button2Link: (content as any).button2Link,
    videoUrl: (content as any).videoUrl,
  } : content.rightContent

  return (
    <SectionWrapper className="!bg-white" containerClassName="py-[100px]">
      <div className="space-y-3">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Section */}
          {leftContent && (leftContent.yearsText || leftContent.tagline1) && (
            <div className="flex gap-2">
              {leftContent.yearsText && (
                <div className="flex flex-col">
                  <span className="text-[100px] font-thin text-primary leading-[80px]">
                    {leftContent.yearsText}
                  </span>
                  {leftContent.yearsLabel && (
                    <span className="text-xs uppercase tracking-wider text-gray-500">
                      {leftContent.yearsLabel}
                    </span>
                  )}
                </div>
              )}
              {(leftContent.tagline1 || leftContent.tagline2 || leftContent.tagline3) && (
                <h2 className="text-gray-500 text-2xl mb-0 leading-snug font-light">
                  {leftContent.tagline1 && <>{leftContent.tagline1}<br /></>}
                  {leftContent.tagline2 && <>{leftContent.tagline2}<br /></>}
                  {leftContent.tagline3 && <>{leftContent.tagline3}</>}
                </h2>
              )}
            </div>
          )}

          {/* Right Section */}
          {rightContent && (rightContent.title || rightContent.sectionLabel) && (
            <div className="max-w-2xl">
              {rightContent.sectionLabel && (
                <p className="text-[18px] pt-[15px] font-semibold text-primary leading-tight">
                  {rightContent.sectionLabel}
                </p>
              )}
              {(rightContent.title || rightContent.titleHighlight) && (
                <h1 className="text-5xl pt-[15px] font-light text-black leading-tight">
                  {rightContent.title && <>{rightContent.title} </>}
                  {rightContent.titleHighlight && (
                    <span className="text-primary">{rightContent.titleHighlight}</span>
                  )}
                </h1>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Video */}
          {rightContent?.videoUrl && (
            <div className="overflow-hidden" style={{ padding: "56.25% 0 0 0", position: "relative" }}>
              <iframe
                src={rightContent.videoUrl}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                title="tomsher-about"
              />
            </div>
          )}

          {/* Right Column - Content */}
          {rightContent && (rightContent.description || rightContent.button1Text || rightContent.button2Text) && (
            <div className="space-y-3">
              {rightContent.description && (
                <p className="text-[16px] leading-[25px] text-gray-500 pt-[20px]">
                  {rightContent.description}
                </p>
              )}

              {(rightContent.button1Text || rightContent.button2Text) && (
                <div className="flex gap-4 !pt-7">
                  {rightContent.button1Text && rightContent.button1Link && (
                    <Button customVariant="normal" size="medium" href={rightContent.button1Link}>
                      {rightContent.button1Text}
                    </Button>
                  )}
                  {rightContent.button2Text && rightContent.button2Link && (
                    <Button customVariant="outline" size="medium" href={rightContent.button2Link}>
                      {rightContent.button2Text}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
