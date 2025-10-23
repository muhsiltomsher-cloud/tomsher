export default function ServicesSkeleton() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-pulse">
          <div className="h-4 w-32 bg-gray-300 rounded-full mx-auto" />
          <div className="h-12 w-64 bg-gray-300 rounded-lg mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-2xl p-8 space-y-4 animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-lg" />
              <div className="h-8 bg-gray-300 rounded-lg w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-5/6" />
                <div className="h-4 bg-gray-300 rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
