'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  label: string
  url: string
  children?: MenuItem[]
}

interface Settings {
  siteName: string
  logo: string
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
                src={settings.logo || '/logo.svg'}
                alt={settings.siteName || 'Tomsher Technologies'}
                width={180}
                height={45}
                className="h-8 lg:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item._id} className="relative group">
                  {item.children && item.children.length > 0 ? (
                    <div>
                      <button
                        className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                        onClick={() => handleDropdownToggle(item._id)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item._id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 z-50"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child._id}
                                href={child.url}
                                className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-200"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.url}
                      className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {item.label}
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <div key={item._id}>
                      {item.children && item.children.length > 0 ? (
                        <div>
                          <button
                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-primary transition-colors duration-200 font-medium py-2"
                            onClick={() => handleDropdownToggle(item._id)}
                          >
                            <span>{item.label}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                activeDropdown === item._id ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item._id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 space-y-2 mt-2"
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
                                    {child.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.url}
                          className="block text-gray-700 hover:text-primary transition-colors duration-200 font-medium py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
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
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
