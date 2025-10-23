'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  ArrowRight
} from 'lucide-react'

interface Settings {
  siteName?: string
  logo?: string
  logoWhite?: string
  logoFooter?: string
  phone?: string
  email?: string
  address?: string
  description?: string
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
}

interface MenuItem {
  _id: string
  label: string
  url: string
  children?: MenuItem[]
}

export function Footer() {
  const [settings, setSettings] = useState<Settings>({})
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, menuRes] = await Promise.all([
          fetch('/api/settings'),
          fetch('/api/menu')
        ])
        
        if (settingsRes.ok) {
          const data = await settingsRes.json()
          setSettings(data)
        }
        
        if (menuRes.ok) {
          const data = await menuRes.json()
          setMenuItems(data)
        }
      } catch (error) {
        console.error('Error fetching footer data:', error)
      }
    }
    
    fetchData()
  }, [])
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={settings.logoFooter || settings.logoWhite || settings.logo || '/logo-white.svg'}
                alt={settings.siteName || 'Tomsher Technologies'}
                width={180}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            {settings.description && (
              <p className="text-gray-300 mb-6 leading-relaxed">
                {settings.description}
              </p>
            )}
            
            {/* Contact Info */}
            <div className="space-y-3">
              {settings.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">{settings.address}</span>
                </div>
              )}
              {settings.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">{settings.phone}</span>
                </div>
              )}
              {settings.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">{settings.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Menu Columns */}
          {menuItems.filter(item => item.children && item.children.length > 0).slice(0, 3).map((menuItem) => (
            <div key={menuItem._id}>
              <h3 className="text-lg font-semibold mb-6">{menuItem.label}</h3>
              <ul className="space-y-3">
                {menuItem.children?.map((child) => (
                  <li key={child._id}>
                    <Link
                      href={child.url}
                      className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Quick Links (if less than 3 menu groups) */}
          {menuItems.filter(item => item.children && item.children.length > 0).length < 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {menuItems.filter(item => !item.children || item.children.length === 0).slice(0, 6).map((item) => (
                  <li key={item._id}>
                    <Link
                      href={item.url}
                      className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for the latest updates on web development trends and digital marketing insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-300 text-sm">
              © {new Date().getFullYear()} | All rights reserved by {settings.siteName || 'Tomsher Technologies'}.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {settings.facebook && (
                <Link
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              )}
              {settings.twitter && (
                <Link
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
              {settings.instagram && (
                <Link
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
              {settings.linkedin && (
                <Link
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {settings.youtube && (
                <Link
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              )}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-primary transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
