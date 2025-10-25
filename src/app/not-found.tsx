'use client'

import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center animate-slide-in">
          <div className="mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <h2 className="text-4xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Page Not Found
          </h2>

          <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-semibold hover:bg-primary/5 transition-colors duration-300"
            >
              <Search className="h-5 w-5" />
              Browse Portfolio
            </Link>
          </div>

          <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Link
              href="javascript:history.back()"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back to previous page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
