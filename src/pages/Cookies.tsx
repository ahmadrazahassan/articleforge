import { Cookie, Settings, Eye, Shield, CheckCircle } from 'lucide-react';

export default function Cookies() {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly',
      required: true,
      examples: ['Authentication', 'Security', 'Session management']
    },
    {
      icon: Eye,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website',
      required: false,
      examples: ['Page views', 'Click patterns', 'Time on site']
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Remember your preferences and settings',
      required: false,
      examples: ['Language preference', 'Theme settings', 'Form data']
    },
    {
      icon: CheckCircle,
      title: 'Performance Cookies',
      description: 'Monitor and improve website performance',
      required: false,
      examples: ['Load times', 'Error tracking', 'Feature usage']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-black text-primary font-black text-xs tracking-widest mb-8 border-3 border-black">
            LEGAL
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 border-4 border-black bg-primary flex items-center justify-center rotate-6">
              <Cookie className="w-8 h-8" strokeWidth={2.5} />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
              Cookie Policy
            </h1>
          </div>
          
          <p className="text-xl font-medium text-gray-700 mb-6">
            Last updated: November 20, 2024
          </p>

          <div className="border-l-4 border-primary pl-6 py-4">
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              This policy explains how ArticleForge uses cookies and similar tracking technologies 
              to enhance your experience and improve our services.
            </p>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-8">What Are Cookies?</h2>
          
          <div className="border-4 border-black bg-white p-8 shadow-brutal-sm">
            <p className="text-lg font-medium text-gray-700 leading-relaxed mb-6">
              Cookies are small text files stored on your device when you visit a website. 
              They help websites remember information about your visit, making your next 
              visit easier and the site more useful to you.
            </p>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              We use cookies to provide essential functionality, analyze usage patterns, 
              and personalize your experience. You have control over which cookies you accept.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Cookies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12">Types of Cookies We Use</h2>
          
          <div className="space-y-8">
            {cookieTypes.map((cookie, index) => {
              const Icon = cookie.icon;
              return (
                <div key={index} className="border-4 border-black bg-white p-8 shadow-brutal-sm">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 border-3 border-black flex items-center justify-center flex-shrink-0 ${
                        index % 2 === 0 ? 'bg-primary rotate-3' : 'bg-black -rotate-3'
                      }`}>
                        <Icon className={`w-7 h-7 ${index % 2 === 0 ? '' : 'text-primary'}`} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black mb-2">{cookie.title}</h3>
                        <p className="text-lg font-medium text-gray-700">{cookie.description}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 border-2 border-black text-xs font-black tracking-wider whitespace-nowrap ${
                      cookie.required ? 'bg-primary' : 'bg-white'
                    }`}>
                      {cookie.required ? 'REQUIRED' : 'OPTIONAL'}
                    </span>
                  </div>
                  
                  <div className="ml-[72px]">
                    <p className="text-sm font-black uppercase tracking-wider mb-3 text-gray-600">Examples:</p>
                    <ul className="space-y-2">
                      {cookie.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-black"></div>
                          <span className="font-medium text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-8">Managing Your Cookie Preferences</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-4 border-black bg-white p-6">
              <h3 className="text-xl font-black mb-4">Browser Settings</h3>
              <p className="font-medium text-gray-700 leading-relaxed mb-4">
                Most browsers allow you to control cookies through their settings. You can 
                choose to block or delete cookies, but this may affect site functionality.
              </p>
              <button className="px-6 py-3 bg-black text-primary border-3 border-black font-black hover:bg-primary hover:text-black transition-colors">
                Learn How
              </button>
            </div>

            <div className="border-4 border-black bg-primary p-6">
              <h3 className="text-xl font-black mb-4">Cookie Preferences</h3>
              <p className="font-medium mb-4 leading-relaxed">
                Manage your cookie preferences directly on our website. You can update 
                your choices at any time.
              </p>
              <button className="px-6 py-3 bg-black text-primary border-3 border-black font-black hover:bg-white hover:border-white transition-colors">
                Manage Cookies
              </button>
            </div>
          </div>

          <div className="mt-8 border-4 border-black bg-black text-primary p-6">
            <p className="text-lg font-bold leading-relaxed">
              <strong className="font-black">Note:</strong> Disabling essential cookies may prevent 
              you from using certain features of our service. Analytics and functional cookies can 
              be disabled without affecting core functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-8">Third-Party Cookies</h2>
          
          <div className="border-4 border-black bg-white p-8 shadow-brutal-sm mb-8">
            <p className="text-lg font-medium text-gray-700 leading-relaxed mb-6">
              We use trusted third-party services that may set their own cookies:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 border-2 border-black bg-primary flex-shrink-0 mt-1"></div>
                <div>
                  <p className="font-black mb-1">Analytics Services</p>
                  <p className="font-medium text-gray-700">Help us understand how users interact with our site</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 border-2 border-black bg-primary flex-shrink-0 mt-1"></div>
                <div>
                  <p className="font-black mb-1">Payment Processors</p>
                  <p className="font-medium text-gray-700">Secure payment handling and fraud prevention</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 border-2 border-black bg-primary flex-shrink-0 mt-1"></div>
                <div>
                  <p className="font-black mb-1">Social Media Platforms</p>
                  <p className="font-medium text-gray-700">Enable social sharing features</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h3 className="text-2xl font-black mb-4">Questions About Cookies?</h3>
            <p className="text-lg font-medium text-gray-700 mb-6">
              Contact us for more information about our cookie practices
            </p>
            <a 
              href="mailto:privacy@articleforge.ai" 
              className="inline-block px-8 py-4 bg-primary border-4 border-black font-black hover-lift shadow-brutal-sm"
            >
              privacy@articleforge.ai
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
