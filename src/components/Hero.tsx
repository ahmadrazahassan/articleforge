import { ArrowRight, Clock, Code, Search } from 'lucide-react';

export default function Hero() {
  const scrollToGenerator = () => {
    const element = document.getElementById('generator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 20px),
                           repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 20px)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block mb-6">
              <div className="px-4 py-2 bg-black text-primary font-bold text-xs tracking-widest border-3 border-black">
                AI-POWERED CONTENT STUDIO
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6 text-balance">
              Generate
              <span className="block text-6xl sm:text-7xl lg:text-8xl italic mt-2 mb-2">SEO-Ready</span>
              <span className="inline-block bg-primary px-4 py-1 -rotate-1 border-4 border-black shadow-brutal">Articles</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl font-medium leading-relaxed">
              Transform your website description into complete HTML articles with full SEO metadata. 
              Built for <span className="bg-primary px-2 py-0.5 font-bold border-2 border-black">bloggers</span>, creators, and digital marketers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToGenerator}
                className="group px-8 py-4 bg-primary border-4 border-black font-black text-lg shadow-brutal hover-lift flex items-center justify-center gap-3"
              >
                START GENERATING
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
              <button
                onClick={scrollToGenerator}
                className="px-8 py-4 bg-white border-4 border-black font-black text-lg hover:bg-black hover:text-primary transition-colors"
              >
                VIEW DEMO
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="border-l-4 border-black pl-4">
                <div className="text-3xl font-black">99%</div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">SEO Score</div>
              </div>
              <div className="border-l-4 border-black pl-4">
                <div className="text-3xl font-black">&lt;30s</div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Generation</div>
              </div>
              <div className="border-l-4 border-black pl-4">
                <div className="text-3xl font-black">100%</div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Free to Use</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Card 1 */}
              <div className="absolute top-0 right-0 w-64 bg-white border-4 border-black p-6 shadow-brutal-lg rotate-3">
                <Code className="w-8 h-8 mb-3" strokeWidth={2.5} />
                <h3 className="text-xl font-black mb-2">Clean HTML</h3>
                <p className="text-sm font-medium text-gray-700">Production-ready semantic markup</p>
              </div>

              {/* Card 2 */}
              <div className="absolute top-32 right-16 w-64 bg-primary border-4 border-black p-6 shadow-brutal-lg -rotate-2">
                <Search className="w-8 h-8 mb-3" strokeWidth={2.5} />
                <h3 className="text-xl font-black mb-2">SEO Optimized</h3>
                <p className="text-sm font-medium">Complete meta tags and keywords</p>
              </div>

              {/* Card 3 */}
              <div className="absolute top-64 right-8 w-64 bg-black text-primary border-4 border-black p-6 shadow-brutal-lg rotate-1">
                <Clock className="w-8 h-8 mb-3" strokeWidth={2.5} />
                <h3 className="text-xl font-black mb-2">Lightning Fast</h3>
                <p className="text-sm font-medium">Generate in under 30 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
