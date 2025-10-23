import { PricingSectionData } from './pricing/types'
import PricingDefault from './pricing/PricingDefault'
import PricingCards from './pricing/PricingCards'

interface PricingSectionProps {
  data: PricingSectionData
}

export default function PricingSection({ data }: PricingSectionProps) {
  const {
    title = 'Simple, Transparent Pricing',
    subtitle = 'Choose the perfect plan for your needs',
    plans = [
      {
        name: 'Starter',
        price: '$29',
        period: '/month',
        features: ['5 Projects', '10GB Storage', 'Basic Support', 'API Access'],
        buttonText: 'Get Started',
      },
      {
        name: 'Professional',
        price: '$79',
        period: '/month',
        features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced API', 'Custom Domain'],
        highlighted: true,
        buttonText: 'Start Free Trial',
      },
      {
        name: 'Enterprise',
        price: '$199',
        period: '/month',
        features: ['Unlimited Everything', '1TB Storage', '24/7 Support', 'Dedicated Manager', 'Custom Integration', 'SLA Guarantee'],
        buttonText: 'Contact Sales',
      },
    ],
    variant = 'default'
  } = data

  const props = {
    title,
    subtitle,
    plans
  }

  const variants = {
    default: <PricingDefault {...props} />,
    cards: <PricingCards {...props} />
  }

  return variants[variant] || variants.default
}
