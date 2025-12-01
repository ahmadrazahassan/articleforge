import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-6">
      <nav className="max-w-7xl mx-auto">
        {/* Ultra-Modern Glassmorphism Container */}
        <div className="relative">
          {/* Main Glass Container */}
          <div className="relative backdrop-blur-[20px] bg-white/70 rounded-[28px] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06),0_1px_1px_rgba(255,255,255,0.8)_inset] px-4 sm:px-6 py-3">
            {/* Subtle Inner Light */}
            <div className="absolute inset-[1px] rounded-[27px] bg-white/30 pointer-events-none"></div>

            {/* Top Highlight Line */}
            <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-white/80"></div>

            {/* Decorative Corner Elements */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-black/10 rounded-tl-[28px]"></div>
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-black/10 rounded-tr-[28px]"></div>

            <div className="relative flex items-center justify-between">
              {/* Logo Section - Super Modern */}
              <Link to="/" className="group relative flex items-center gap-5 z-10">
                {/* Deconstructed Geometric Logo */}
                <div className="relative w-12 h-12">
                  {/* Layered Frames with Independent Animations */}
                  <div className="absolute inset-0 border-[3px] border-black group-hover:scale-110 transition-all duration-700 ease-out"></div>
                  <div className="absolute inset-1.5 border-[2px] border-black group-hover:scale-90 group-hover:rotate-90 transition-all duration-500 ease-out origin-center"></div>
                  <div className="absolute inset-3 border-[2px] border-primary group-hover:scale-125 group-hover:-rotate-180 transition-all duration-700 ease-out origin-center"></div>

                  {/* Pulsing Center Dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-black group-hover:bg-primary transition-all duration-300 group-hover:scale-150"></div>
                  </div>
                </div>

                {/* Brand Text */}
                <div className="hidden sm:flex flex-col">
                  <span className="text-xl font-black tracking-tight leading-none">ArticleForge</span>
                  <span className="text-[9px] font-bold text-black/50 tracking-[0.15em] uppercase mt-0.5">AI Content Studio</span>
                </div>
              </Link>

              {/* Desktop Navigation - Minimal & Clean */}
              <div className="hidden lg:flex items-center gap-2">
                {/* Nav Pills Container */}
                <div className="flex items-center gap-1 backdrop-blur-xl bg-white/50 rounded-full px-2 py-2 border border-white/60 shadow-sm">
                  <button
                    onClick={() => scrollToSection('generator')}
                    onMouseEnter={() => setActiveNav('generator')}
                    onMouseLeave={() => setActiveNav(null)}
                    className={`relative px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${activeNav === 'generator'
                        ? 'bg-black text-primary'
                        : 'hover:bg-white/80'
                      }`}
                  >
                    Generator
                  </button>

                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    onMouseEnter={() => setActiveNav('how')}
                    onMouseLeave={() => setActiveNav(null)}
                    className={`relative px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${activeNav === 'how'
                        ? 'bg-black text-primary'
                        : 'hover:bg-white/80'
                      }`}
                  >
                    How it Works
                  </button>

                  <button
                    onClick={() => scrollToSection('faq')}
                    onMouseEnter={() => setActiveNav('faq')}
                    onMouseLeave={() => setActiveNav(null)}
                    className={`relative px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${activeNav === 'faq'
                        ? 'bg-black text-primary'
                        : 'hover:bg-white/80'
                      }`}
                  >
                    FAQ
                  </button>
                </div>

                {/* CTA Button - Premium Design */}
                <button
                  onClick={() => scrollToSection('generator')}
                  className="group relative ml-2 px-6 py-2.5 bg-black rounded-full font-bold text-sm border-2 border-black transition-all hover:scale-105 overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>

                  {/* Text Content */}
                  <span className="relative z-10 flex items-center gap-2 text-primary group-hover:text-black transition-colors">
                    Start Creating
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                  </span>
                </button>
              </div>

              {/* Mobile Menu Toggle - Sleek Design */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden relative w-11 h-11 rounded-[14px] bg-black flex items-center justify-center border-2 border-black hover:scale-105 transition-transform"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-primary" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-5 h-5 text-primary" strokeWidth={2.5} />
                )}
              </button>
            </div>

            {/* Mobile Menu - Ultra Modern */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-black/10 animate-in slide-in-from-top-5 duration-300">
                <div className="space-y-1.5">
                  <button
                    onClick={() => scrollToSection('generator')}
                    className="w-full text-left px-5 py-3 rounded-[16px] font-semibold text-sm hover:bg-white/80 transition-colors"
                  >
                    Generator
                  </button>

                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="w-full text-left px-5 py-3 rounded-[16px] font-semibold text-sm hover:bg-white/80 transition-colors"
                  >
                    How it Works
                  </button>

                  <button
                    onClick={() => scrollToSection('faq')}
                    className="w-full text-left px-5 py-3 rounded-[16px] font-semibold text-sm hover:bg-white/80 transition-colors"
                  >
                    FAQ
                  </button>

                  <div className="pt-2">
                    <button
                      onClick={() => scrollToSection('generator')}
                      className="w-full px-5 py-3 bg-black text-primary rounded-[16px] font-bold text-sm border-2 border-black hover:bg-primary hover:text-black transition-colors flex items-center justify-between"
                    >
                      <span>Start Creating</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Floating Shadow Element - Creates Depth */}
          <div className="absolute inset-0 bg-black/5 blur-xl rounded-[28px] -z-10 translate-y-2"></div>
        </div>
      </nav>
    </header>
  );
}
