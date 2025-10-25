'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { ContactFormVariantProps } from './types'

export default function ContactFormCentered({
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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 transition-colors duration-300">{description}</p>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Icon className="h-5 w-5 text-primary transition-colors duration-300" />
                  <span className="text-gray-700 transition-colors duration-300">{item.value}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 smooth-transition hover:shadow-3xl animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition"
                  />
                </div>
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-center animate-fade-in">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-center animate-fade-in">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold smooth-transition hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Send className="h-5 w-5 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
