import { ArrowRight, Users, Target, Award, TrendingUp, Heart, Code } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b-4 border-black overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-black rotate-12 bg-primary opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-black opacity-10"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="inline-block px-4 py-2 bg-black text-primary font-black text-xs tracking-widest mb-8 border-3 border-black">
            ABOUT US
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-8">
            Building the
            <span className="block text-6xl sm:text-7xl lg:text-8xl italic mt-4 mb-4">Future</span>
            <span className="inline-block bg-primary px-6 py-3 -rotate-1 border-4 border-black shadow-brutal">of Content</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-gray-700 max-w-3xl leading-relaxed">
            We're on a mission to democratize content creation with AI-powered tools that help 
            creators, marketers, and businesses produce professional articles in seconds.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
                Our Story
              </h2>
              <div className="space-y-6 text-lg font-medium text-gray-700 leading-relaxed">
                <p>
                  ArticleForge was born from a simple frustration: creating high-quality, 
                  SEO-optimized content took too long and required too many specialized skills.
                </p>
                <p>
                  We asked ourselves: <span className="bg-primary px-2 py-1 font-bold border-2 border-black">
                  What if AI could handle the heavy lifting?</span> What if content creators could 
                  focus on strategy and creativity while technology handled the technical execution?
                </p>
                <p>
                  Today, thousands of creators worldwide use ArticleForge to generate professional 
                  articles with complete SEO metadata, saving hours of work and maintaining 
                  consistently high quality.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative border-4 border-black bg-white p-8 shadow-brutal-lg rotate-2">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary border-4 border-black rotate-12"></div>
                <h3 className="text-3xl font-black mb-4">1000+</h3>
                <p className="text-lg font-bold">Articles generated daily</p>
              </div>
              
              <div className="absolute -bottom-8 -right-8 border-4 border-black bg-black text-primary p-6 shadow-brutal -rotate-3">
                <h3 className="text-2xl font-black mb-2">50+</h3>
                <p className="text-base font-bold">Countries served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Our Values</h2>
            <p className="text-xl font-medium text-gray-700 max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className={`border-4 border-black bg-white p-8 shadow-brutal-sm hover-lift transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-primary border-4 border-black flex items-center justify-center mb-6 rotate-3">
                <Users className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black mb-4">Creator-First</h3>
              <p className="font-medium text-gray-700 leading-relaxed">
                Every feature is designed with creators in mind. Your success is our success.
              </p>
            </div>

            {/* Value 2 */}
            <div className={`border-4 border-black bg-white p-8 shadow-brutal-sm hover-lift transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mb-6 -rotate-3">
                <Target className="w-8 h-8 text-primary" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black mb-4">Quality First</h3>
              <p className="font-medium text-gray-700 leading-relaxed">
                We never compromise on output quality. Professional results, every time.
              </p>
            </div>

            {/* Value 3 */}
            <div className={`border-4 border-black bg-white p-8 shadow-brutal-sm hover-lift transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-primary border-4 border-black flex items-center justify-center mb-6 rotate-6">
                <Code className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black mb-4">Innovation</h3>
              <p className="font-medium text-gray-700 leading-relaxed">
                Constantly pushing boundaries with cutting-edge AI technology.
              </p>
            </div>

            {/* Value 4 */}
            <div className={`border-4 border-black bg-white p-8 shadow-brutal-sm hover-lift transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mb-6 rotate-2">
                <TrendingUp className="w-8 h-8 text-primary" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black mb-4">Transparency</h3>
              <p className="font-medium text-gray-700 leading-relaxed">
                Clear pricing, honest communication, and no hidden surprises.
              </p>
            </div>

            {/* Value 5 */}
            <div className={`border-4 border-black bg-white p-8 shadow-brutal-sm hover-lift transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-primary border-4 border-black flex items-center justify-center mb-6 -rotate-2">
                <Award className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black mb-4">Excellence</h3>
              <p className="font-medium text-gray-700 leading-relaxed">
                Striving for perfection in every line of code and every feature.
              </p>
            </div>

            {/* Value 6 */}
            <div className={`border-4 border-black bg-white p-8 shadow-brutal-sm hover-lift transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mb-6 rotate-3">
                <Heart className="w-8 h-8 text-primary fill-primary" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black mb-4">Community</h3>
              <p className="font-medium text-gray-700 leading-relaxed">
                Building a supportive ecosystem where creators help creators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-black bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight">
            Join Our Journey
          </h2>
          <p className="text-xl font-medium text-gray-700 mb-12 max-w-2xl mx-auto">
            Be part of the content creation revolution. Start generating professional 
            articles today.
          </p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-primary border-4 border-black font-black text-xl shadow-brutal hover-lift"
          >
            GET STARTED FREE
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
          </button>
        </div>
      </section>
    </div>
  );
}
