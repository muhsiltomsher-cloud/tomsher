export interface ContactFormSectionData {
  title?: string
  subtitle?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  formType?: string
  variant?: 'default' | 'split' | 'centered'
}

export interface ContactFormVariantProps {
  title: string
  subtitle: string
  description: string
  email: string
  phone: string
  address: string
  formType: string
}
