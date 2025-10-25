'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail,
  MapPin,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MenuItem {
  _id: string
  title: string
  url: string
  children?: MenuItem[]
  isMegaMenu?: boolean
  megaMenuColumns?: number
  megaMenuData?: {
    columns?: Array<{
      title: string
      content?: string
      image?: string
      links?: Array<{
        title: string
        url: string
        description?: string
      }>
      button?: {
        text: string
        url: string
        style: string
      }
    }>
  }
}

interface Settings {
  siteName: string
  logo: string
  logoNormal?: string
  logoSticky?: string
  phone: string
  email: string
  address: string
  description: string
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [navigation, setNavigation] = useState<MenuItem[]>([])
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Tomsher Technologies',
    logo: '/logo.svg',
    phone: '+971 4 123 4567',
    email: 'info@tomsher.com',
    address: 'Dubai, UAE',
    description: '30+ Countries Served'
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchMenuAndSettings = async () => {
      try {
        const [menuRes, settingsRes] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/settings')
        ])
        
        if (menuRes.ok) {
          const menuData = await menuRes.json()
          setNavigation(menuData)
        }
        
        if (settingsRes.ok) {
          const settingsData = await settingsRes.json()
          setSettings(settingsData)
        }
      } catch (error) {
        console.error('Error fetching menu and settings:', error)
      }
    }
    
    fetchMenuAndSettings()
  }, [])

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              {settings.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{settings.phone}</span>
                </div>
              )}
              {settings.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{settings.email}</span>
                </div>
              )}
              {settings.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{settings.address}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/get-quote" className="hover:underline">
                Get Free Quote
              </Link>
              {settings.description && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{settings.description}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={
                  isScrolled 
                    ? (settings.logoSticky || settings.logoNormal || settings.logo || '/logo.svg')
                    : (settings.logoNormal || settings.logo || '/logo.svg')
                }
                alt={settings.siteName || 'Tomsher Technologies'}
                width={180}
                height={45}
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? 'h-7 lg:h-8' : 'h-8 lg:h-10'
                }`}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item._id} className="relative group">
                  {item.isMegaMenu && item.megaMenuData?.columns ? (
                    <div>
                      <button
                        className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                        onClick={() => handleDropdownToggle(item._id)}
                      >
                        <span>{item.title}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {activeDropdown === item._id && (
                        <div
                          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border p-6 z-50 animate-fade-in"
                          style={{ 
                            width: `${Math.min(item.megaMenuColumns || 3, 6) * 250}px`,
                            maxWidth: '90vw'
                          }}
                        >
                            <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${item.megaMenuColumns || 3}, 1fr)` }}>
                              {item.megaMenuData.columns.map((column, idx) => (
                                <div key={idx} className="space-y-3">
                                  {column.image && (
                                    <img 
                                      src={column.image} 
                                      alt={column.title}
                                      className="w-full h-32 object-cover rounded-lg mb-3"
                                    />
                                  )}
                                  <h3 className="font-bold text-gray-900 text-lg">{column.title}</h3>
                                  {column.content && (
                                    <p className="text-sm text-gray-600">{column.content}</p>
                                  )}
                                  {column.links && column.links.length > 0 && (
                                    <div className="space-y-2">
                                      {column.links.map((link, linkIdx) => (
                                        <Link
                                          key={linkIdx}
                                          href={link.url}
                                          className="block text-sm text-gray-700 hover:text-primary transition-colors"
                                          onClick={() => setActiveDropdown(null)}
                                        >
                                          <div className="font-medium">{link.title}</div>
                                          {link.description && (
                                            <div className="text-xs text-gray-500">{link.description}</div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                  {column.button && (
                                    <Link
                                      href={column.button.url}
                                      className={`inline-block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        column.button.style === 'primary' 
                                          ? 'bg-primary text-white hover:bg-primary/90'
                                          : column.button.style === 'secondary'
                                          ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                                          : 'border border-primary text-primary hover:bg-primary/5'
                                      }`}
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      {column.button.text}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                        </div>
                      )}
                    </div>
                  ) : item.children && item.children.length > 0 ? (
                    <div>
                      <button
                        className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                        onClick={() => handleDropdownToggle(item._id)}
                      >
                        <span>{item.title}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {activeDropdown === item._id && (
                        <div
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 z-50 animate-fade-in"
                        >
                            {item.children.map((child) => (
                              <Link
                                key={child._id}
                                href={child.url}
                                className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-200"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {child.title}
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.url}
                      className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button asChild className="btn-primary">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden bg-white border-t animate-slide-down"
          >
              <div className="container mx-auto px-4 py-4">
                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <div key={item._id}>
                      {item.isMegaMenu && item.megaMenuData?.columns ? (
                        <div>
                          <button
                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-primary transition-colors duration-200 font-medium py-2"
                            onClick={() => handleDropdownToggle(item._id)}
                          >
                            <span>{item.title}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                activeDropdown === item._id ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          {activeDropdown === item._id && (
                            <div
                              className="pl-4 space-y-4 mt-2 animate-slide-down"
                            >
                                {item.megaMenuData.columns.map((column, idx) => (
                                  <div key={idx} className="space-y-2 pb-4 border-b last:border-b-0">
                                    <div className="font-bold text-gray-900">{column.title}</div>
                                    {column.content && (
                                      <p className="text-sm text-gray-600">{column.content}</p>
                                    )}
                                    {column.links && column.links.map((link, linkIdx) => (
                                      <Link
                                        key={linkIdx}
                                        href={link.url}
                                        className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                                        onClick={() => {
                                          setIsMobileMenuOpen(false)
                                          setActiveDropdown(null)
                                        }}
                                      >
                                        {link.title}
                                      </Link>
                                    ))}
                                    {column.button && (
                                      <Link
                                        href={column.button.url}
                                        className={`inline-block px-3 py-1.5 rounded-md text-sm font-medium ${
                                          column.button.style === 'primary' 
                                            ? 'bg-primary text-white'
                                            : column.button.style === 'secondary'
                                            ? 'bg-gray-200 text-gray-900'
                                            : 'border border-primary text-primary'
                                        }`}
                                        onClick={() => {
                                          setIsMobileMenuOpen(false)
                                          setActiveDropdown(null)
                                        }}
                                      >
                                        {column.button.text}
                                      </Link>
                                    )}
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      ) : item.children && item.children.length > 0 ? (
                        <div>
                          <button
                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-primary transition-colors duration-200 font-medium py-2"
                            onClick={() => handleDropdownToggle(item._id)}
                          >
                            <span>{item.title}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                activeDropdown === item._id ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          {activeDropdown === item._id && (
                            <div
                              className="pl-4 space-y-2 mt-2 animate-slide-down"
                            >
                                {item.children.map((child) => (
                                  <Link
                                    key={child._id}
                                    href={child.url}
                                    className="block text-gray-600 hover:text-primary transition-colors duration-200 py-1"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false)
                                      setActiveDropdown(null)
                                    }}
                                  >
                                    {child.title}
                                  </Link>
                                ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.url}
                          className="block text-gray-700 hover:text-primary transition-colors duration-200 font-medium py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <Button asChild className="w-full btn-primary">
                      <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </nav>
              </div>
          </div>
        )}
      </header>
    </>
  )
}
