export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 space-y-16 animate-pulse">
        <div className="space-y-4">
          <div className="h-12 bg-gray-300 rounded-lg w-1/3" />
          <div className="h-6 bg-gray-300 rounded w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-video bg-gray-300 rounded-lg" />
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
