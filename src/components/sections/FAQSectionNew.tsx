'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

const defaultFaqItems: FAQItem[] = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer: 'We offer comprehensive web development, ecommerce solutions, digital marketing, UI/UX design, and custom software development services tailored to your business needs. From conceptualization to deployment, we ensure that every step of the process is aligned with your business goals to deliver exceptional results.',
    category: 'Services'
  },
  {
    id: 2,
    question: 'What industries do you specialize in?',
    answer: 'Our expertise spans technology, healthcare, education, retail, and more, providing tailored solutions to meet specific industry needs. We understand the unique challenges of each sector and develop customized strategies to ensure impactful results and industry compliance.',
    category: 'Industries'
  },
  {
    id: 3,
    question: 'How do you ensure project success?',
    answer: 'We adopt a collaborative approach, agile methodology, and emphasize communication and quality assurance to ensure project success. Regular milestones, stakeholder feedback loops, and iterative testing help us meet your expectations effectively and on time.',
    category: 'Process'
  },
  {
    id: 4,
    question: 'What technologies do you use?',
    answer: 'We leverage modern tools and technologies, including React, Angular, Node.js, Python, AWS, and others, to build scalable and reliable solutions. Our team constantly updates its knowledge base to integrate cutting-edge technologies into your projects.',
    category: 'Technology'
  },
  {
    id: 5,
    question: 'Do you offer ongoing support?',
    answer: 'Yes, we provide 24/7 support and maintenance services to ensure your solution runs smoothly post-launch. Our team is always ready to assist with updates, troubleshooting, and optimization for maximum performance.',
    category: 'Support'
  },
  {
    id: 6,
    question: 'How long does it take to complete a project?',
    answer: 'The timeline varies based on the complexity and scope of the project, but we work efficiently to deliver on time without compromising quality. We provide detailed timelines upfront to help you plan effectively.',
    category: 'Timeline'
  },
  {
    id: 7,
    question: 'Do you offer custom software solutions?',
    answer: 'Yes, we specialize in building custom software tailored to meet your specific business requirements. Our solutions are designed to integrate seamlessly with your existing systems while offering scalability for future growth.',
    category: 'Custom Solutions'
  },
  {
    id: 8,
    question: 'Can you integrate third-party APIs?',
    answer: 'Absolutely! We have extensive experience integrating various third-party APIs to enhance functionality and performance. Whether it\'s payment gateways, CRMs, or analytics tools, we ensure smooth and reliable integration.',
    category: 'Integration'
  },
  {
    id: 9,
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing models, including fixed-price, hourly, and retainer agreements, to suit your project needs. Our goal is to provide transparency and align pricing with your budget and project requirements.',
    category: 'Pricing'
  },
  {
    id: 10,
    question: 'How do you handle data security?',
    answer: 'We implement strict security measures, including encryption, secure authentication, and regular audits to protect your data. Security is embedded in every stage of our development process to safeguard sensitive information.',
    category: 'Security'
  },
  {
    id: 11,
    question: 'Do you provide training for the solutions you deliver?',
    answer: 'Yes, we provide comprehensive training and documentation to ensure a smooth transition for your team. Our support includes step-by-step guidance, workshops, and easy-to-follow manuals for user adoption.',
    category: 'Training'
  },
  {
    id: 12,
    question: 'What platforms do you work with?',
    answer: 'We work with platforms like WordPress, Shopify, Magento, and custom-built solutions to meet your business needs. Our expertise allows us to recommend and implement the most suitable platform for your goals.',
    category: 'Platforms'
  },
  {
    id: 13,
    question: 'Do you provide cloud-based solutions?',
    answer: 'Yes, we offer cloud-based solutions that ensure scalability, reliability, and cost-efficiency. Our team handles everything from migration to deployment and ongoing optimization for seamless cloud performance.',
    category: 'Cloud Solutions'
  },
  {
    id: 14,
    question: 'Can you handle large-scale projects?',
    answer: 'Yes, we have the expertise and resources to manage large-scale projects with high complexity. Our dedicated teams ensure efficient project management and timely delivery, even for enterprise-level requirements.',
    category: 'Large Projects'
  },
  {
    id: 15,
    question: 'How do you communicate with clients during a project?',
    answer: 'We maintain regular communication through emails, calls, and project management tools to keep you updated on progress. Our proactive approach ensures that you are informed about every milestone and deliverable.',
    category: 'Communication'
  },
  {
    id: 16,
    question: 'What is your approach to mobile app development?',
    answer: 'We follow a user-centric approach to design and develop high-performing, responsive, and intuitive mobile applications. Our apps are tailored to meet user expectations while leveraging the latest technologies.',
    category: 'Mobile Apps'
  },
  {
    id: 17,
    question: 'Do you provide SEO services?',
    answer: 'Yes, we offer comprehensive SEO services to improve your website\'s visibility and drive organic traffic. From on-page optimization to advanced analytics, our strategies are designed to enhance your online presence.',
    category: 'SEO'
  },
  {
    id: 18,
    question: 'What makes your services unique?',
    answer: 'Our commitment to quality, innovative solutions, and customer-centric approach set us apart from competitors. We strive to exceed expectations by delivering solutions that align with your business vision.',
    category: 'About Us'
  },
  {
    id: 19,
    question: 'Do you provide post-launch support?',
    answer: 'Yes, we offer post-launch support, including updates, bug fixes, and feature enhancements. Our dedicated team ensures your solution remains reliable and up-to-date over time.',
    category: 'Support'
  },
  {
    id: 20,
    question: 'How can I get started with your services?',
    answer: 'Simply contact us through our website or email, and our team will guide you through the onboarding process. We\'ll work closely with you to understand your needs and create a roadmap for success.',
    category: 'Getting Started'
  }
]

interface FAQSectionProps {
  data?: {
    title?: string
    subtitle?: string
    items?: FAQItem[]
  }
}

const FAQSectionNew = ({ data }: FAQSectionProps) => {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const faqItems = data?.items || defaultFaqItems
  const title = data?.title || 'FAQ'
  const subtitle = data?.subtitle || 'Frequently Asked Questions'

  return (
    <section className="bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="container mx-auto px-4 py-[100px]">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <p className="text-[18px] font-semibold text-primary">{title}</p>
            <h2 className="text-5xl font-light text-white">
              {subtitle.split('Questions').map((part, index) => (
                index === 0 ? (
                  <span key={index}>{part}</span>
                ) : (
                  <span key={index}>
                    <span className="text-secondary">Questions</span>
                    {part}
                  </span>
                )
              ))}
            </h2>
          </div>

          {/* FAQ Slider */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={15}
            slidesPerView={1}
            navigation={false}
            pagination={false}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="!pb-12"
          >
            {faqItems.map((item, index) => (
              <SwiperSlide key={index} className="flex">
                <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 h-fit w-full flex flex-col">
                  <div className="space-y-4">
                    <h3 className="text-[30px] font-light leading-8 text-white">{item.question}</h3>
                    <p className="text-gray-300 flex-grow">{item.answer}</p>
                    <span className="inline-block px-3 py-1 text-sm text-white bg-white bg-opacity-20 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default FAQSectionNew
