import { NewsletterSectionData } from './newsletter/types'
import NewsletterDefault from './newsletter/NewsletterDefault'
import NewsletterGradient from './newsletter/NewsletterGradient'

interface NewsletterSectionProps {
  data: NewsletterSectionData
}

export default function NewsletterSection({ data }: NewsletterSectionProps) {
  const {
    title = 'Stay Updated',
    subtitle = 'Subscribe to our newsletter for the latest updates and insights',
    placeholder = 'Enter your email address',
    buttonText = 'Subscribe',
    backgroundColor = '#f8f9fa',
    variant = 'default'
  } = data

  const props = {
    title,
    subtitle,
    placeholder,
    buttonText,
    backgroundColor
  }

  const variants = {
    default: <NewsletterDefault {...props} />,
    gradient: <NewsletterGradient title={title} subtitle={subtitle} placeholder={placeholder} buttonText={buttonText} />
  }

  return variants[variant] || variants.default
}
