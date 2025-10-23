import { ContactFormSectionData } from './contact/types'
import ContactFormDefault from './contact/ContactFormDefault'
import ContactFormSplit from './contact/ContactFormSplit'
import ContactFormCentered from './contact/ContactFormCentered'

interface ContactFormSectionProps {
  data: ContactFormSectionData
}

export default function ContactFormSection({ data }: ContactFormSectionProps) {
  const {
    title = 'Get In Touch',
    subtitle = 'Contact Us',
    description = 'Have a question or want to work together? We\'d love to hear from you.',
    email = 'info@tomsher.com',
    phone = '+971 50 123 4567',
    address = 'Dubai, UAE',
    formType = 'contact',
    variant = 'default'
  } = data

  const props = {
    title,
    subtitle,
    description,
    email,
    phone,
    address,
    formType
  }

  const variants = {
    default: <ContactFormDefault {...props} />,
    split: <ContactFormSplit {...props} />,
    centered: <ContactFormCentered {...props} />
  }

  return variants[variant] || variants.default
}
