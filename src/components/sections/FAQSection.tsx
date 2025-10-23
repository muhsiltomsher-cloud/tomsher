import { FAQSectionData } from './faq/types'
import FAQAccordion from './faq/FAQAccordion'
import FAQGrid from './faq/FAQGrid'

interface FAQSectionProps {
  data: FAQSectionData
}

export default function FAQSection({ data }: FAQSectionProps) {
  const {
    title = 'Frequently Asked Questions',
    subtitle = 'Everything you need to know',
    faqs = [
      {
        question: 'What services do you offer?',
        answer: 'We offer comprehensive web development, mobile app development, UI/UX design, and digital marketing services tailored to your business needs.'
      },
      {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex applications may take 3-6 months. We provide detailed timelines during consultation.'
      },
      {
        question: 'What is your pricing structure?',
        answer: 'We offer flexible pricing based on project scope. We provide transparent quotes after understanding your requirements and offer both fixed-price and hourly rate options.'
      },
      {
        question: 'Do you provide ongoing support?',
        answer: 'Yes! We offer maintenance packages including updates, security patches, performance monitoring, and technical support to keep your project running smoothly.'
      },
      {
        question: 'Can you work with existing projects?',
        answer: 'Absolutely! We can take over existing projects, perform audits, implement improvements, and provide ongoing development and maintenance.'
      },
    ],
    variant = 'accordion'
  } = data

  const props = {
    title,
    subtitle,
    faqs
  }

  const variants = {
    accordion: <FAQAccordion {...props} />,
    grid: <FAQGrid {...props} />
  }

  return variants[variant] || variants.accordion
}
