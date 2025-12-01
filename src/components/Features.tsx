export default function Features() {
  const features = [
    {
      number: '01',
      title: 'SEO Optimized',
      description: 'Every article is crafted with SEO best practices, including meta tags, keywords, and structured content for maximum visibility.',
    },
    {
      number: '02',
      title: 'Multiple Formats',
      description: 'Export your content in HTML, Markdown, JSON, or WordPress-ready format. One click, multiple options.',
    },
    {
      number: '03',
      title: 'Bulk Generation',
      description: 'Generate hundreds of articles at once with our smart paste and category generator. Scale your content effortlessly.',
    },
    {
      number: '04',
      title: 'Article Library',
      description: 'Store, organize, and manage all your generated content in one place. Search, filter, and export anytime.',
    },
    {
      number: '05',
      title: 'Custom Settings',
      description: 'Control tone, length, language, and style. Every article tailored to your exact specifications.',
    },
    {
      number: '06',
      title: 'Instant Results',
      description: 'No waiting. Generate professional-grade articles in seconds, not hours. AI-powered speed meets quality.',
    },
  ];

  return (
    <section 
      className="px-4 sm:px-6 lg:px-8 mb-20"
      style={{ fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <div className="bg-primary rounded-[60px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 py-20 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-16">
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-black/20" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/40">
                Features
              </span>
            </div>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter mb-8 text-black">
              <span className="block">Everything</span>
              <span className="block text-black/70">you need</span>
            </h2>
            <p className="text-xl sm:text-2xl font-medium text-black/50 max-w-2xl leading-relaxed">
              Powerful features designed for modern content creators
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group border border-black/10 hover:border-black/30 transition-all p-10"
              >
                <div className="mb-6">
                  <div className="text-7xl font-black text-black/5 leading-none group-hover:text-black/10 transition-colors">
                    {feature.number}
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg font-medium text-black/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
