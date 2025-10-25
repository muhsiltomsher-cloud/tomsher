'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center animate-slide-in">
          <div className="mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full" />
          </div>

          <h2 className="text-3xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Something went wrong
          </h2>

          <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            We encountered an unexpected error. Don't worry, our team has been notified.
          </p>

          {error.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-red-800 font-mono">{error.message}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-semibold hover:bg-primary/5 transition-colors duration-300"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
