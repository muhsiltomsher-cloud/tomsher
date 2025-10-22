export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what our clients have to say about our services.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-50 rounded-lg p-6 card-hover">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Client {item}</h4>
                  <p className="text-sm text-gray-600">CEO, Company</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Excellent service and professional team. Highly recommended for web development projects."
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}