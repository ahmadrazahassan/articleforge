import { PenTool, Menu, X } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black backdrop-blur-sm bg-opacity-95">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-11 h-11 bg-primary border-3 border-black flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform">
              <PenTool className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tight">ArticleForge</span>
              <span className="text-xs font-bold text-gray-600 tracking-wider">AI STUDIO</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollToSection('generator')}
              className="px-5 py-2.5 font-bold text-sm hover:bg-black hover:text-primary transition-all border-2 border-transparent hover:border-black"
            >
              GENERATOR
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-5 py-2.5 font-bold text-sm hover:bg-black hover:text-primary transition-all border-2 border-transparent hover:border-black"
            >
              HOW IT WORKS
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-5 py-2.5 font-bold text-sm hover:bg-black hover:text-primary transition-all border-2 border-transparent hover:border-black"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('generator')}
              className="ml-2 px-6 py-2.5 bg-primary border-3 border-black font-black text-sm shadow-brutal-sm hover-lift"
            >
              START NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 border-2 border-black bg-primary flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-4 border-black bg-white">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('generator')}
                className="px-4 py-3 font-bold text-sm text-left hover:bg-primary transition-colors border-2 border-transparent hover:border-black"
              >
                GENERATOR
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-4 py-3 font-bold text-sm text-left hover:bg-primary transition-colors border-2 border-transparent hover:border-black"
              >
                HOW IT WORKS
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="px-4 py-3 font-bold text-sm text-left hover:bg-primary transition-colors border-2 border-transparent hover:border-black"
              >
                FAQ
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
