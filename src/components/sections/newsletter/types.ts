export interface NewsletterSectionData {
  title?: string
  subtitle?: string
  placeholder?: string
  buttonText?: string
  backgroundColor?: string
  variant?: 'default' | 'gradient'
}

export interface NewsletterVariantProps {
  title: string
  subtitle: string
  placeholder: string
  buttonText: string
  backgroundColor?: string
}
