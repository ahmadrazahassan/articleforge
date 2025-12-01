import { ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Enter Details',
      description: 'Provide your website name and a brief description of your niche or topic.',
    },
    {
      number: '02',
      title: 'Choose Settings',
      description: 'Select article type, length, tone of voice, and language preferences.',
    },
    {
      number: '03',
      title: 'Generate Article',
      description: 'Click generate and let AI create a comprehensive, SEO-optimized HTML article.',
    },
    {
      number: '04',
      title: 'Copy and Use',
      description: 'Copy the HTML and SEO details directly into your blog or CMS platform.',
    },
  ];

  return (
    <section 
      id="how-it-works" 
      className="px-4 sm:px-6 lg:px-8 mb-20"
      style={{ fontFamily: "'SF Pro Display', 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Rounded Background Container */}
      <div className="bg-black text-white rounded-[60px] relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 py-20 sm:py-24 lg:py-32">
          {/* Header - Ultra Modern Typography */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-white/20" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/40">
                Process
              </span>
            </div>
            <h2 
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter mb-8"
              style={{ fontFamily: "'Outfit', 'SF Pro Display', sans-serif" }}
            >
              <span className="block text-white">How it</span>
              <span className="block text-primary">works</span>
            </h2>
            <p className="text-xl sm:text-2xl font-medium text-white/50 max-w-2xl leading-relaxed">
              Four steps to transform your ideas into professional content
            </p>
          </div>

          {/* Steps - Minimal List Design */}
          <div className="space-y-1 mb-24">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="group border-t border-white/10 hover:border-primary/30 transition-all"
              >
                <div className="py-12 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="text-8xl sm:text-9xl font-black text-white/5 leading-none group-hover:text-primary/10 transition-colors">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <h3 
                      className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight"
                      style={{ fontFamily: "'Outfit', 'SF Pro Display', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-lg sm:text-xl font-medium text-white/60 leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="flex-shrink-0 hidden lg:block">
                    <div className="w-12 h-12 border-2 border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                      <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section - Minimal Design */}
          <div className="border-t border-white/10 pt-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex-1">
                <h3 
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white leading-tight tracking-tight"
                  style={{ fontFamily: "'Outfit', 'SF Pro Display', sans-serif" }}
                >
                  Ready to start?
                </h3>
                <p className="text-xl font-medium text-white/50">
                  Create your first article in seconds
                </p>
              </div>
              <button
                onClick={() => {
                  const element = document.getElementById('generator');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-10 py-5 bg-primary text-black font-black text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors">
                  START NOW
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
