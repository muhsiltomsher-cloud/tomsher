import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Let's discuss your requirements and create a solution that drives results for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">
              View Our Work
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}