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
  Globe,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MenuItem {
  _id: string
  title: string
  url: string
  order: number
  image?: string
  description?: string
  icon?: string
  isExternal: boolean
  openInNewTab: boolean
  parentId?: string
  isActive: boolean
  isMegaMenu: boolean
  megaMenuColumns: number
  children?: MenuItem[]
}

export function MegaMenuHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu')
      if (response.ok) {
        const data = await response.json()
        setMenuItems(data)
      }
    } catch (error) {
      console.error('Error fetching menu:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDropdownToggle = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const renderMegaMenu = (item: MenuItem) => {
    if (!item.children || item.children.length === 0) return null

    const columns = Math.min(item.megaMenuColumns, 6)
    const itemsPerColumn = Math.ceil(item.children.length / columns)

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border z-50"
        style={{ minWidth: '800px', maxWidth: '1200px' }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className={`grid grid-cols-${columns} gap-8`}>
            {Array.from({ length: columns }).map((_, colIndex) => {
              const startIdx = colIndex * itemsPerColumn
              const endIdx = startIdx + itemsPerColumn
              const columnItems = item.children!.slice(startIdx, endIdx)

              if (columnItems.length === 0) return null

              return (
                <div key={colIndex} className="space-y-4">
                  {columnItems.map((child) => (
                    <Link
                      key={child._id}
                      href={child.url}
                      className="block group"
                      onClick={() => setActiveDropdown(null)}
                      target={child.openInNewTab ? '_blank' : undefined}
                      rel={child.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                        {child.image && (
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={child.image}
                              alt={child.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                              {child.title}
                            </h4>
                            {child.isExternal && (
                              <ExternalLink className="h-3 w-3 text-gray-400" />
                            )}
                          </div>
                          {child.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {child.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    )
  }

  const renderDropdown = (item: MenuItem) => {
    if (!item.children || item.children.length === 0) return null

    return (
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
            target={child.openInNewTab ? '_blank' : undefined}
            rel={child.isExternal ? 'noopener noreferrer' : undefined}
          >
            <div className="flex items-center justify-between">
              <span>{child.title}</span>
              {child.isExternal && (
                <ExternalLink className="h-3 w-3 text-gray-400" />
              )}
            </div>
          </Link>
        ))}
      </motion.div>
    )
  }

  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
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
          </div>
        </div>
      </header>
    )
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
              {menuItems.map((item) => (
                <div key={item._id} className="relative group">
                  {item.children && item.children.length > 0 ? (
                    <div>
                      <button
                        className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                        onClick={() => handleDropdownToggle(item._id)}
                      >
                        <span>{item.title}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item._id && (
                          item.isMegaMenu 
                            ? renderMegaMenu(item)
                            : renderDropdown(item)
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.url}
                      className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                      target={item.openInNewTab ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{item.title}</span>
                        {item.isExternal && (
                          <ExternalLink className="h-3 w-3" />
                        )}
                      </div>
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
                  {menuItems.map((item) => (
                    <div key={item._id}>
                      {item.children && item.children.length > 0 ? (
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
                                    target={child.openInNewTab ? '_blank' : undefined}
                                    rel={child.isExternal ? 'noopener noreferrer' : undefined}
                                  >
                                    {child.title}
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
                          target={item.openInNewTab ? '_blank' : undefined}
                          rel={item.isExternal ? 'noopener noreferrer' : undefined}
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
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
