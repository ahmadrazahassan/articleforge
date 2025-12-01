import { FileText, Check, X, Info, AlertCircle } from 'lucide-react';

export default function License() {
  const allowedUses = [
    'Generate unlimited articles for personal or commercial use',
    'Use generated content on your websites and blogs',
    'Modify and customize generated content as needed',
    'Use content for client projects (with appropriate plan)',
    'Create derivative works from generated content'
  ];

  const prohibitedUses = [
    'Resell or redistribute the ArticleForge software itself',
    'Claim generated content as AI-free when it\'s not',
    'Use the service to generate harmful or illegal content',
    'Attempt to reverse engineer our AI models',
    'Share your account credentials with others'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-black text-primary font-black text-xs tracking-widest mb-8 border-3 border-black">
            LEGAL
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            License Agreement
          </h1>
          
          <p className="text-xl font-medium text-gray-700 mb-6">
            Last updated: November 20, 2024
          </p>

          <div className="border-l-4 border-primary pl-6 py-4">
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              This license governs your use of ArticleForge AI Studio and the content you 
              generate with our service.
            </p>
          </div>
        </div>
      </section>

      {/* Content Ownership */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-8">Content Ownership & Rights</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-4 border-black bg-primary p-8 shadow-brutal-sm">
              <FileText className="w-12 h-12 mb-4" strokeWidth={2.5} />
              <h3 className="text-2xl font-black mb-4">Your Content</h3>
              <p className="text-lg font-medium leading-relaxed">
                You own all rights to the content you generate using ArticleForge. 
                We do not claim any ownership over your generated articles.
              </p>
            </div>

            <div className="border-4 border-black bg-white p-8 shadow-brutal-sm">
              <FileText className="w-12 h-12 mb-4" strokeWidth={2.5} />
              <h3 className="text-2xl font-black mb-4">Our Software</h3>
              <p className="text-lg font-medium text-gray-700 leading-relaxed">
                ArticleForge software, including AI models and code, remains our 
                intellectual property. You receive a license to use the service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Allowed Uses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12">What You Can Do</h2>
          
          <div className="space-y-4">
            {allowedUses.map((use, index) => (
              <div key={index} className="border-4 border-black bg-white p-6 flex items-start gap-4 shadow-brutal-sm hover-lift">
                <div className="w-10 h-10 border-3 border-black bg-primary flex items-center justify-center flex-shrink-0 rotate-3">
                  <Check className="w-6 h-6" strokeWidth={3} />
                </div>
                <p className="text-lg font-bold pt-2">{use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibited Uses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12">What You Cannot Do</h2>
          
          <div className="space-y-4">
            {prohibitedUses.map((use, index) => (
              <div key={index} className="border-4 border-black bg-white p-6 flex items-start gap-4 shadow-brutal-sm">
                <div className="w-10 h-10 border-3 border-black bg-black flex items-center justify-center flex-shrink-0 -rotate-3">
                  <X className="w-6 h-6 text-primary" strokeWidth={3} />
                </div>
                <p className="text-lg font-bold text-gray-700 pt-2">{use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* License Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12">License Tiers</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-4 border-black bg-white p-6">
              <h3 className="text-xl font-black mb-4">Free Tier</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-medium text-gray-700">Personal use only</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-medium text-gray-700">Limited generations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-medium text-gray-700">Basic features</span>
                </li>
              </ul>
            </div>

            <div className="border-4 border-black bg-primary p-6">
              <h3 className="text-xl font-black mb-4">Pro License</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-medium">Commercial use</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-medium">Unlimited generations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-medium">Priority support</span>
                </li>
              </ul>
            </div>

            <div className="border-4 border-black bg-black text-primary p-6">
              <h3 className="text-xl font-black mb-4">Agency License</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-medium">Client projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-medium">Team accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-medium">White-label options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border-4 border-black bg-white p-8 flex items-start gap-4">
            <Info className="w-8 h-8 flex-shrink-0 mt-1" strokeWidth={2.5} />
            <div>
              <h3 className="text-xl font-black mb-2">AI-Generated Disclosure</h3>
              <p className="text-lg font-medium text-gray-700 leading-relaxed">
                While you own the content you generate, we recommend disclosing that content 
                was created with AI assistance where appropriate, following industry best practices.
              </p>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-8 flex items-start gap-4">
            <AlertCircle className="w-8 h-8 flex-shrink-0 mt-1" strokeWidth={2.5} />
            <div>
              <h3 className="text-xl font-black mb-2">Content Responsibility</h3>
              <p className="text-lg font-medium text-gray-700 leading-relaxed">
                You are responsible for reviewing and editing generated content before publication. 
                Ensure all content meets your quality standards and complies with applicable laws.
              </p>
            </div>
          </div>

          <div className="border-4 border-black bg-black text-primary p-8">
            <h3 className="text-2xl font-black mb-4">Questions About Licensing?</h3>
            <p className="text-lg font-medium mb-6">
              Need clarification on what you can do with your license? Our team is here to help.
            </p>
            <a 
              href="mailto:legal@articleforge.ai" 
              className="inline-block px-6 py-3 bg-primary text-black border-3 border-primary font-black hover:bg-white hover:border-white transition-colors"
            >
              Contact Legal Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
