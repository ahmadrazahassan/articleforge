import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
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

        <div className="max-w-7xl mx-auto relative z-10 py-32 sm:py-40 lg:py-48">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-16 bg-black/20" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/40">
                Get Started
              </span>
            </div>

            <h2 className="text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter mb-16 text-black">
              <span className="block">Start</span>
              <span className="block">creating</span>
              <span className="block text-black/70">today</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 border-t border-black/10 pt-12">
              <p className="text-2xl sm:text-3xl font-medium text-black/50 flex-1 leading-tight">
                Generate your first article in under 30 seconds
              </p>
              
              <button
                onClick={() => {
                  const element = document.getElementById('generator');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative inline-flex items-center px-10 py-5 bg-black text-primary font-black text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors">
                  START NOW
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </span>
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm font-medium text-black/40">
              <span>No credit card</span>
              <div className="w-1 h-1 bg-black/20 rounded-full" />
              <span>Free forever</span>
              <div className="w-1 h-1 bg-black/20 rounded-full" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
