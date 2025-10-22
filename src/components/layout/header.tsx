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

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'E-commerce Development', href: '/services/ecommerce-development' },
      { name: 'Mobile App Development', href: '/services/mobile-app-development' },
      { name: 'Digital Marketing', href: '/services/digital-marketing' },
      { name: 'SEO Services', href: '/services/seo-services' },
      { name: 'Web Design', href: '/services/web-design' },
    ]
  },
  {
    name: 'Solutions',
    href: '/solutions',
    children: [
      { name: 'Custom Web Applications', href: '/solutions/custom-web-applications' },
      { name: 'E-commerce Solutions', href: '/solutions/ecommerce-solutions' },
      { name: 'CMS Development', href: '/solutions/cms-development' },
      { name: 'API Development', href: '/solutions/api-development' },
    ]
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@tomsher.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Dubai, UAE</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/get-quote" className="hover:underline">
                Get Free Quote
              </Link>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>30+ Countries Served</span>
              </div>
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
                src="/logo.svg"
                alt="Tomsher Technologies"
                width={180}
                height={45}
                className="h-8 lg:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.children ? (
                    <div>
                      <button
                        className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                        onClick={() => handleDropdownToggle(item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 z-50"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-200"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {item.name}
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
                    <div key={item.name}>
                      {item.children ? (
                        <div>
                          <button
                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-primary transition-colors duration-200 font-medium py-2"
                            onClick={() => handleDropdownToggle(item.name)}
                          >
                            <span>{item.name}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                activeDropdown === item.name ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 space-y-2 mt-2"
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    className="block text-gray-600 hover:text-primary transition-colors duration-200 py-1"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false)
                                      setActiveDropdown(null)
                                    }}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block text-gray-700 hover:text-primary transition-colors duration-200 font-medium py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
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