export default function Testimonials() {
  const testimonials = [
    {
      quote: "Transformed our content workflow completely",
      author: "Sarah Chen",
      company: "TechFlow",
    },
    {
      quote: "300% traffic increase in three months",
      author: "Michael Rodriguez",
      company: "GrowthLabs",
    },
    {
      quote: "The bulk generation is a game-changer",
      author: "Emily Watson",
      company: "ContentScale",
    },
  ];

  return (
    <section 
      className="px-4 sm:px-6 lg:px-8 mb-20"
      style={{ fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <div className="bg-black text-white rounded-[60px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 py-20 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-16">
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-white/20" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/40">
                Testimonials
              </span>
            </div>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter mb-8">
              <span className="block text-white">Loved by</span>
              <span className="block text-primary">creators</span>
            </h2>
          </div>

          {/* Testimonials - Minimal List */}
          <div className="space-y-1">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group border-t border-white/10 hover:border-primary/30 transition-all py-12"
              >
                <blockquote className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                  {testimonial.quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-black text-white">{testimonial.author}</p>
                  <div className="h-px w-8 bg-white/20" />
                  <p className="text-lg font-bold text-primary uppercase tracking-wider">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
