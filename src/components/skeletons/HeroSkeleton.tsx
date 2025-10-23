export default function HeroSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="h-4 w-32 bg-gray-300 rounded-full mx-auto" />
          <div className="space-y-4">
            <div className="h-16 bg-gray-300 rounded-lg w-3/4 mx-auto" />
            <div className="h-16 bg-gray-300 rounded-lg w-2/3 mx-auto" />
          </div>
          <div className="h-6 bg-gray-300 rounded-lg w-1/2 mx-auto" />
          <div className="flex gap-4 justify-center">
            <div className="h-14 w-40 bg-gray-300 rounded-full" />
            <div className="h-14 w-40 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
