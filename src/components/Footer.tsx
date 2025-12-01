import { Heart, Twitter, Github, Linkedin, Mail, ArrowUpRight, Circle, Square, Triangle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative overflow-hidden mt-20"
      style={{ fontFamily: "'SF Pro Display', 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Rounded Black Background Container */}
      <div className="bg-black text-white rounded-t-[60px] relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-12 relative z-10">
        {/* Hero Section */}
        <div className={`mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Building the Future</span>
            </div>
            
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8" style={{ fontFamily: "'SF Pro Display', 'Montserrat', sans-serif" }}>
              Let's create<br/>
              <span className="text-primary">something</span><br/>
              extraordinary
            </h2>
            
            <p className="text-xl sm:text-2xl text-white/60 font-medium leading-relaxed max-w-2xl mb-12" style={{ fontFamily: "'SF Pro Text', 'Montserrat', sans-serif" }}>
              Join thousands of creators who are redefining content creation with AI-powered tools.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-4 bg-primary text-black font-black text-lg overflow-hidden">
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors">
                  Start Creating
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
              
              <button className="px-8 py-4 border-2 border-white/20 text-white font-black text-lg hover:bg-white/5 hover:border-white/40 transition-all">
                View Showcase
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-24">

          {/* Brand Column */}
          <div className={`lg:col-span-4 space-y-8 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Logo */}
            <Link to="/" className="group inline-block">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 border-2 border-white group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-2 border-2 border-primary group-hover:rotate-180 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary group-hover:scale-150 transition-transform" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tight text-white">ArticleForge</div>
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest">AI Studio</div>
                </div>
              </div>
            </Link>

            <p className="text-base text-white/60 leading-relaxed font-medium">
              Empowering creators with next-generation AI tools. Transform ideas into exceptional content.
            </p>

            {/* Newsletter */}
            <div className="space-y-4">
              <div className="text-sm font-black uppercase tracking-widest text-white/40">Stay Updated</div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
                  style={{ fontFamily: "'SF Pro Text', sans-serif" }}
                />
                <button className="px-6 py-3 bg-primary text-black font-black hover:bg-white transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-16">

              {/* Product Column */}
              <div className={`space-y-5 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center gap-2 mb-6">
                  <Circle className="w-3 h-3 text-primary" />
                  <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white/40">Product</h3>
                </div>
                <ul className="space-y-3">
                  {['Features', 'Pricing', 'Templates'].map((item) => (
                    <li key={item}>
                      <Link to="/" className="group inline-flex items-center gap-2 text-base font-semibold text-white/70 hover:text-primary transition-colors">
                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div className={`space-y-5 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center gap-2 mb-6">
                  <Square className="w-3 h-3 text-primary" />
                  <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white/40">Company</h3>
                </div>
                <ul className="space-y-3">
                  {['About', 'Blog', 'Contact'].map((item) => (
                    <li key={item}>
                      <Link to="/" className="group inline-flex items-center gap-2 text-base font-semibold text-white/70 hover:text-primary transition-colors">
                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Column */}
              <div className={`space-y-5 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center gap-2 mb-6">
                  <Triangle className="w-3 h-3 text-primary" />
                  <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white/40">Legal</h3>
                </div>
                <ul className="space-y-3">
                  {['Privacy', 'Terms', 'Security'].map((item) => (
                    <li key={item}>
                      <Link to="/" className="group inline-flex items-center gap-2 text-base font-semibold text-white/70 hover:text-primary transition-colors">
                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-white/10 pt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            
            {/* Copyright & Credits */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/40 font-medium">
                <span>© 2024 ArticleForge</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  Made with <Heart className="w-3.5 h-3.5 text-primary fill-primary animate-pulse" /> by creators
                </span>
              </div>
            </div>

            {/* Social Links - Modern Minimal */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Github, href: '#', label: 'GitHub' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Mail, href: '#', label: 'Email' }
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="group relative w-11 h-11 flex items-center justify-center border border-white/10 hover:border-primary bg-white/5 hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-white/60 group-hover:text-primary group-hover:scale-110 transition-all" strokeWidth={2} />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-primary bg-white/5 hover:bg-primary/10 text-white/60 hover:text-primary font-bold text-sm transition-all"
            >
              <span>Back to top</span>
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
