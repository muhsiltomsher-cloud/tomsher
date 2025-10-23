export interface FAQSectionData {
  title?: string
  subtitle?: string
  faqs?: Array<{
    question: string
    answer: string
  }>
  variant?: 'accordion' | 'grid'
}

export interface FAQVariantProps {
  title: string
  subtitle: string
  faqs: Array<{
    question: string
    answer: string
  }>
}
