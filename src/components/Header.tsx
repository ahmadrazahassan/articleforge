import { PenTool, Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    // If not on home page, navigate to home first
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
    <header className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-white/80">
      {/* Modern Rounded Container */}
      <nav className="max-w-7xl mx-auto">
        <div className="bg-white border-4 border-black rounded-[32px] shadow-brutal px-6 sm:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Modern Logo Design */}
            <Link to="/" className="flex items-center gap-4 group">
              {/* Unique Icon Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-14 h-14 bg-black rounded-2xl flex items-center justify-center border-4 border-black transform group-hover:scale-105 transition-transform">
                  <PenTool className="w-7 h-7 text-primary" strokeWidth={2.5} />
                </div>
              </div>
              
              {/* Modern Typography */}
              <div className="hidden sm:flex flex-col justify-center">
                <span className="text-2xl font-black tracking-tight leading-none">ArticleForge</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase">AI Studio</span>
                </div>
              </div>
            </Link>

            {/* Modern Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {/* Rounded Pill Navigation Container */}
              <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1.5 border-3 border-black mr-4">
                <button
                  onClick={() => scrollToSection('generator')}
                  className="group relative px-6 py-2.5 font-bold text-sm rounded-full transition-all hover:bg-white"
                >
                  <span className="relative z-10">Generator</span>
                  <div className="absolute inset-0 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-0"></div>
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="group relative px-6 py-2.5 font-bold text-sm rounded-full transition-all hover:bg-white"
                >
                  <span className="relative z-10">How it Works</span>
                  <div className="absolute inset-0 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-0"></div>
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="group relative px-6 py-2.5 font-bold text-sm rounded-full transition-all hover:bg-white"
                >
                  <span className="relative z-10">FAQ</span>
                  <div className="absolute inset-0 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-0"></div>
                </button>
              </div>
              
              {/* Modern CTA Button */}
              <button
                onClick={() => scrollToSection('generator')}
                className="group relative overflow-hidden px-8 py-3 bg-black text-primary rounded-full font-black text-sm border-4 border-black transition-all hover:bg-primary hover:text-black"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Creating
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </span>
              </button>
            </div>

            {/* Modern Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-12 h-12 rounded-2xl border-3 border-black bg-primary flex items-center justify-center hover:bg-black hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2.5} /> : <Menu className="w-6 h-6" strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Modern Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white border-4 border-black rounded-[28px] overflow-hidden shadow-brutal-lg animate-in slide-in-from-top-5 duration-300">
            <div className="p-4 space-y-2">
              <button
                onClick={() => scrollToSection('generator')}
                className="w-full text-left px-6 py-4 font-bold text-base rounded-2xl hover:bg-primary transition-colors border-2 border-transparent hover:border-black"
              >
                Generator
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="w-full text-left px-6 py-4 font-bold text-base rounded-2xl hover:bg-primary transition-colors border-2 border-transparent hover:border-black"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="w-full text-left px-6 py-4 font-bold text-base rounded-2xl hover:bg-primary transition-colors border-2 border-transparent hover:border-black"
              >
                FAQ
              </button>
              <div className="pt-2">
                <button
                  onClick={() => scrollToSection('generator')}
                  className="w-full px-6 py-4 bg-black text-primary rounded-2xl font-black text-base border-4 border-black hover:bg-primary hover:text-black transition-colors flex items-center justify-between"
                >
                  <span>Start Creating</span>
                  <ChevronRight className="w-5 h-5" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
