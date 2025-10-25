'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { ContactFormVariantProps } from './types'

export default function ContactFormSplit({
  title,
  subtitle,
  description,
  email,
  phone,
  address,
  formType
}: ContactFormVariantProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      } else {
        setError('Failed to send message. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: email },
    { icon: Phone, label: 'Phone', value: phone },
    { icon: MapPin, label: 'Address', value: address },
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="animate-slide-in">
            <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300">{title}</h2>
            <p className="text-xl text-gray-600 mb-8 transition-colors duration-300">{description}</p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 smooth-transition hover:scale-110">
                      <Icon className="h-6 w-6 text-primary transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 transition-colors duration-300">{item.label}</p>
                      <p className="text-gray-600 transition-colors duration-300">{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gray-50 rounded-3xl p-8 smooth-transition hover:shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm animate-fade-in">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm animate-fade-in">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white px-8 py-4 rounded-full font-semibold smooth-transition hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send className="h-5 w-5 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
