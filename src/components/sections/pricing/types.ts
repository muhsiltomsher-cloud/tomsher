export interface PricingSectionData {
  title?: string
  subtitle?: string
  plans?: Array<{
    name: string
    price: string
    period: string
    features: string[]
    highlighted?: boolean
    buttonText?: string
  }>
  variant?: 'default' | 'cards'
}

export interface PricingVariantProps {
  title: string
  subtitle: string
  plans: Array<{
    name: string
    price: string
    period: string
    features: string[]
    highlighted?: boolean
    buttonText?: string
  }>
}
