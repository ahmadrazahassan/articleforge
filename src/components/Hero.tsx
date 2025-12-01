import React from 'react';
import { ArrowRight, Layers,Clock } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 mb-20"
      style={{ fontFamily: "'SF Pro Display', 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Rounded Background Container */}
      <div className="bg-primary rounded-[60px] relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 pt-32 sm:pt-40 lg:pt-48 pb-24 sm:pb-32 lg:pb-40">
          {/* Status Badge */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/5 backdrop-blur-sm border border-black/10">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-black/70">
                AI-Powered Content Creation
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="font-black text-black leading-[0.9] tracking-tighter mb-6" style={{ fontFamily: "'Outfit', 'SF Pro Display', sans-serif" }}>
              <span className="block text-5xl sm:text-7xl lg:text-8xl xl:text-9xl">
                Create Amazing
              </span>
              <span className="block text-5xl sm:text-7xl lg:text-8xl xl:text-9xl">
                Content with{' '}
                <span className="relative inline-block">
                  AI
                  <span className="absolute -bottom-2 sm:-bottom-4 left-0 right-0 h-2 sm:h-3 bg-black"></span>
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="text-lg sm:text-xl lg:text-2xl font-medium text-black/70 leading-relaxed text-center">
              Generate high-quality, SEO-optimized blog articles in seconds. No more writer's block.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-20">
            <a
              href="#generator"
              className="group relative px-10 sm:px-12 py-4 sm:py-5 bg-black text-primary font-black text-base sm:text-lg uppercase overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors">
                Start Creating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a
              href="#features"
              className="px-10 sm:px-12 py-4 sm:py-5 border-2 border-black/20 text-black font-black text-base sm:text-lg uppercase hover:bg-black/5 hover:border-black/40 transition-all"
            >
              Learn More
            </a>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black/5 border-2 border-black/10 flex items-center justify-center">
                <Layers className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-black/50">Powered by</p>
                <p className="text-sm font-black text-black">Advanced AI</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-black/10"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black/5 border-2 border-black/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-black/50">Speed</p>
                <p className="text-sm font-black text-black">Instant Results</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-black/10"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black/5 border-2 border-black/10 flex items-center justify-center">
                <span className="text-2xl font-black text-black">∞</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-black/50">Generate</p>
                <p className="text-sm font-black text-black">Unlimited</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
