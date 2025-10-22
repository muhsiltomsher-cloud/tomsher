export function PortfolioSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg text-gray-600">
            Explore our recent projects and see how we've helped businesses succeed online.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-blue-500/20"></div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Project {item}</h3>
                <p className="text-gray-600 text-sm">Web Development</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}