'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  featuredImage?: string
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
  createdAt: string
}

interface PageContent {
  title: string
  subtitle?: string
  heroImage?: string
  heroTitle?: string
  heroSubtitle?: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [pageContent, setPageContent] = useState<PageContent>({
    title: 'Our Blog',
    subtitle: 'Insights, tutorials, and stories about web development, design, and technology'
  })

  useEffect(() => {
    fetchPosts()
    fetchPageContent()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPageContent = async () => {
    try {
      const response = await fetch('/api/page-content/BLOG')
      if (response.ok) {
        const data = await response.json()
        setPageContent({
          title: data.heroTitle || data.title || 'Our Blog',
          subtitle: data.heroSubtitle || data.subtitle || 'Insights, tutorials, and stories about web development, design, and technology',
          heroImage: data.heroImage,
        })
      }
    } catch (error) {
      console.error('Error fetching page content:', error)
    }
  }

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))]
  
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory)

  const featuredPost = filteredPosts.find(p => p.featuredImage) || filteredPosts[0]
  const regularPosts = filteredPosts.filter(p => p._id !== featuredPost?._id)

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20 lg:py-32"
          style={{
            backgroundImage: pageContent.heroImage ? `url(${pageContent.heroImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {pageContent.heroImage && (
            <div className="absolute inset-0 bg-black/50" />
          )}
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-slide-in">
              <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${pageContent.heroImage ? 'text-white' : ''}`}>
                {pageContent.title.includes('Blog') ? (
                  <>
                    {pageContent.title.split('Blog')[0]}<span className="gradient-text">Blog</span>
                  </>
                ) : (
                  pageContent.title
                )}
              </h1>
              {pageContent.subtitle && (
                <p className={`text-xl mb-8 ${pageContent.heroImage ? 'text-gray-200' : 'text-gray-600'}`}>
                  {pageContent.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No blog posts found in this category.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                  <div className="animate-slide-in">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <div className="grid lg:grid-cols-2 gap-8 items-center bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                        <div className="relative h-96 lg:h-full bg-gradient-to-br from-primary/20 to-secondary/20">
                          {featuredPost.featuredImage ? (
                            <Image
                              src={featuredPost.featuredImage}
                              alt={featuredPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Tag className="h-24 w-24 text-primary/30" />
                            </div>
                          )}
                        </div>
                        <div className="p-8 lg:p-12">
                          <span className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Featured Post
                          </span>
                          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
                            {featuredPost.title}
                          </h2>
                          <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              {featuredPost.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {calculateReadTime(featuredPost.content)} min read
                            </div>
                          </div>
                          <div className="inline-flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                            Read More
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post, index) => (
                      <div
                        key={post._id}
                        className="group animate-slide-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <Link href={`/blog/${post.slug}`}>
                          <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                            {/* Post Image */}
                            <div className="relative h-56 bg-gradient-to-br from-primary/20 to-secondary/20">
                              {post.featuredImage ? (
                                <Image
                                  src={post.featuredImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Tag className="h-16 w-16 text-primary/30" />
                                </div>
                              )}
                            </div>

                            {/* Post Content */}
                            <div className="p-6 flex-1 flex flex-col">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                  {post.category}
                                </span>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {calculateReadTime(post.content)} min
                                </div>
                              </div>

                              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>

                              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                                {post.excerpt}
                              </p>

                              {/* Tags */}
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {post.tags.slice(0, 3).map((tag, i) => (
                                    <span
                                      key={i}
                                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Author and Date */}
                              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                                <div className="flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  {post.author}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </div>
                              </div>
                            </div>
                          </article>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Newsletter Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-slide-in">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Get the latest articles, tutorials, and insights delivered to your inbox
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
