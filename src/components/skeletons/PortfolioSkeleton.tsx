export default function PortfolioSkeleton() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-pulse">
          <div className="h-4 w-32 bg-gray-300 rounded-full mx-auto" />
          <div className="h-12 w-64 bg-gray-300 rounded-lg mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
              <div className="aspect-[4/3] bg-gray-300" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-24 bg-gray-300 rounded-full" />
                <div className="h-6 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-300 rounded-full" />
                  <div className="h-6 w-16 bg-gray-300 rounded-full" />
                  <div className="h-6 w-16 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
