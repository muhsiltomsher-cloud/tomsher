'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FooterSEO from './FooterSEO'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  ArrowRight,
  Github,
  MessageCircle,
  Send,
  Camera,
  Music2,
  Dribbble,
  Palette,
  BookOpen,
  MessageSquare
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
  footer?: {
    description?: string
    newsletterTitle?: string
    newsletterDescription?: string
    copyrightText?: string
    showNewsletter?: boolean
  }
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
    <footer className="bg-[#0f172a] text-white">
      <div className="container mx-auto px-4">
        {/* Follow Us Section */}
        <div className="flex flex-col items-center justify-center pb-12 sm:pb-16 pt-20">
          <h3 className="text-2xl font-light mb-8">Follow Us</h3>
          <div className="flex gap-6">
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </a>
            )}
            {settings.twitter && (
              <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </a>
            )}
            {settings.linkedin && (
              <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </a>
            )}
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </a>
            )}
            {settings.youtube && (
              <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Youtube className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Design Services</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Corporate Branding
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Logo Designing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Digital Brochure
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Photo/Video Production
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Development</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Custom Website
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  WordPress Website
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Custom Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Digital Services</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Google PPC Ads
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Email Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Payment Integration
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Business Setup
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Solutions</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Enterprise Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Small Business
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Retail
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Add FooterSEO Component */}
        <FooterSEO />

        {/* Bottom Bar */}
        <div className="pt-8 pb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tomsher Technologies LLC. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
