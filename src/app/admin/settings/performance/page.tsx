'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function PerformancePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [customPaths, setCustomPaths] = useState('')

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  const clearCache = async (options: { paths?: string[], tags?: string[], all?: boolean }) => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/cache/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `Cache cleared successfully! Revalidated ${data.revalidated.paths.length} paths and ${data.revalidated.tags.length} tags.`
        })
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to clear cache'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred while clearing cache'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClearHomepage = () => {
    clearCache({ paths: ['/'] })
  }

  const handleClearAllPages = () => {
    clearCache({ all: true })
  }

  const handleClearCustomPaths = () => {
    const paths = customPaths
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0 && p.startsWith('/'))

    if (paths.length === 0) {
      setMessage({
        type: 'error',
        text: 'Please enter at least one valid path (must start with /)'
      })
      return
    }

    clearCache({ paths })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance & Cache Management</h1>
          <p className="text-gray-600">
            Clear cached pages to force refresh content on the frontend. Use this when updates don't appear immediately.
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Clear Homepage Cache</h3>
                  <p className="text-sm text-gray-600">
                    Revalidate the homepage (/) to show latest content
                  </p>
                </div>
                <button
                  onClick={handleClearHomepage}
                  disabled={loading}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Clearing...' : 'Clear Homepage'}
                </button>
              </div>

              <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Clear All Common Pages</h3>
                  <p className="text-sm text-gray-600">
                    Revalidate all common pages: /, /services, /portfolio, /blog, /contact, /terms, /privacy, /about
                  </p>
                </div>
                <button
                  onClick={handleClearAllPages}
                  disabled={loading}
                  className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Clearing...' : 'Clear All Pages'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Clear Specific Paths</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="customPaths" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter paths to clear (one per line)
                </label>
                <textarea
                  id="customPaths"
                  value={customPaths}
                  onChange={(e) => setCustomPaths(e.target.value)}
                  placeholder="/services&#10;/portfolio&#10;/blog/my-post"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Enter full paths starting with /. For example: /services, /portfolio/my-project
                </p>
              </div>

              <button
                onClick={handleClearCustomPaths}
                disabled={loading || !customPaths.trim()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Clearing...' : 'Clear Custom Paths'}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">💡 When to use cache clearing:</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>After updating home sections in admin panel</li>
              <li>After changing services, portfolio, or blog content</li>
              <li>When frontend doesn't show latest changes immediately</li>
              <li>After updating SEO settings or site configuration</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2">⚠️ Note:</h3>
            <p className="text-sm text-yellow-800">
              Clearing cache forces Next.js to regenerate pages on the next visit. This may cause slightly slower initial load times for those pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
