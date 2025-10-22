'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Code, 
  ShoppingCart, 
  Smartphone, 
  TrendingUp,
  Search,
  Palette,
  Database,
  Cloud,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites built with modern technologies like React, Next.js, and Node.js for optimal performance.',
    features: ['Responsive Design', 'Fast Loading', 'SEO Optimized', 'Secure'],
    href: '/services/web-development'
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Development',
    description: 'Complete online store solutions with payment integration, inventory management, and user-friendly interfaces.',
    features: ['Shopify', 'WooCommerce', 'Custom Solutions', 'Payment Gateway'],
    href: '/services/ecommerce-development'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and hybrid mobile applications for iOS and Android platforms with seamless user experience.',
    features: ['iOS Apps', 'Android Apps', 'Hybrid Apps', 'App Store Optimization'],
    href: '/services/mobile-app-development'
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to boost your online presence and drive business growth.',
    features: ['Social Media', 'Google Ads', 'Content Marketing', 'Analytics'],
    href: '/services/digital-marketing'
  },
  {
    icon: Search,
    title: 'SEO Services',
    description: 'Search engine optimization to improve your website visibility and organic traffic from search engines.',
    features: ['On-page SEO', 'Technical SEO', 'Link Building', 'Local SEO'],
    href: '/services/seo-services'
  },
  {
    icon: Palette,
    title: 'Web Design',
    description: 'Creative and user-centered web designs that reflect your brand identity and engage your audience.',
    features: ['UI/UX Design', 'Brand Identity', 'Prototyping', 'User Research'],
    href: '/services/web-design'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We offer comprehensive digital solutions to help your business thrive in the digital landscape. 
            From web development to digital marketing, we've got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 card-hover"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors duration-200 group/link"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a custom solution that drives results. 
              Our team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}