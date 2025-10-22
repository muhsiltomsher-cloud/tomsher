export function StatsSection() {
  return (
    <section className="section-padding bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-primary-foreground/80">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">300+</div>
            <div className="text-primary-foreground/80">Happy Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">30+</div>
            <div className="text-primary-foreground/80">Countries Served</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">10+</div>
            <div className="text-primary-foreground/80">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}