import { Heart, PenTool, Twitter, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
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
    <footer ref={footerRef} className="relative bg-white border-t-4 border-black overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Links */}
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            {/* Brand Column */}
            <div className={`lg:col-span-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary border-4 border-black flex items-center justify-center rotate-6 shadow-brutal-sm">
                  <PenTool className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-3xl font-black tracking-tight">ArticleForge</span>
                  <span className="text-xs font-black text-gray-600 tracking-widest mt-1">AI STUDIO</span>
                </div>
              </div>
              <p className="text-base font-medium text-gray-700 leading-relaxed mb-8 max-w-sm">
                Transform ideas into SEO-ready articles instantly. Built by creators, for creators.
              </p>
              
              {/* Newsletter */}
              <div className="max-w-md">
                <p className="text-xs font-black uppercase tracking-widest mb-3">Stay Updated</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 border-3 border-black font-bold text-sm focus:outline-none focus:ring-4 focus:ring-primary"
                  />
                  <button className="px-6 py-3 bg-black text-primary border-3 border-black font-black hover:bg-primary hover:text-black transition-colors">
                    <ArrowRight className="w-5 h-5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-sm font-black uppercase tracking-widest mb-5 flex items-center gap-2">
                <div className="w-2 h-2 bg-black"></div>
                Product
              </h3>
              <nav className="space-y-3">
                <Link to="/" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  Generator
                </Link>
                <Link to="/" onClick={(e) => { e.preventDefault(); window.location.pathname = '/'; setTimeout(() => { const el = document.getElementById('how-it-works'); el?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  How It Works
                </Link>
                <Link to="/" onClick={(e) => { e.preventDefault(); window.location.pathname = '/'; setTimeout(() => { const el = document.getElementById('faq'); el?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  FAQ
                </Link>
                <Link to="/docs" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  Docs
                </Link>
              </nav>
            </div>

            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-sm font-black uppercase tracking-widest mb-5 flex items-center gap-2">
                <div className="w-2 h-2 bg-black"></div>
                Company
              </h3>
              <nav className="space-y-3">
                <Link to="/about" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  About
                </Link>
                <Link to="/blog" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  Blog
                </Link>
                <Link to="/careers" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  Careers
                </Link>
                <Link to="/contact" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  Contact
                </Link>
              </nav>
            </div>

            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-sm font-black uppercase tracking-widest mb-5 flex items-center gap-2">
                <div className="w-2 h-2 bg-black"></div>
                Legal
              </h3>
              <nav className="space-y-3">
                <Link to="/privacy" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  Privacy
                </Link>
                <Link to="/terms" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  Terms
                </Link>
                <Link to="/cookies" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  Cookies
                </Link>
                <Link to="/license" className="group block text-base font-bold hover:translate-x-2 transition-transform">
                  License
                </Link>
              </nav>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="border-t-4 border-black pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className={`flex items-center gap-2 text-sm font-black transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <span>© 2024 ArticleForge AI</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-2">
                  Made with <Heart className="w-4 h-4 fill-red-500 text-red-500" strokeWidth={2.5} /> for creators
                </span>
              </div>

              <div className={`flex gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group w-14 h-14 border-4 border-black bg-white hover:bg-primary hover:-rotate-12 transition-all flex items-center justify-center shadow-brutal-sm">
                  <Twitter className="w-6 h-6" strokeWidth={2.5} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group w-14 h-14 border-4 border-black bg-white hover:bg-primary hover:rotate-12 transition-all flex items-center justify-center shadow-brutal-sm">
                  <Github className="w-6 h-6" strokeWidth={2.5} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group w-14 h-14 border-4 border-black bg-white hover:bg-primary hover:-rotate-12 transition-all flex items-center justify-center shadow-brutal-sm">
                  <Linkedin className="w-6 h-6" strokeWidth={2.5} />
                </a>
                <a href="mailto:support@articleforge.ai" className="group w-14 h-14 border-4 border-black bg-white hover:bg-primary hover:rotate-12 transition-all flex items-center justify-center shadow-brutal-sm">
                  <Mail className="w-6 h-6" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
