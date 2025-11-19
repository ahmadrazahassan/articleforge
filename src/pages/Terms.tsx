import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Users } from 'lucide-react';

export default function Terms() {
  const sections = [
    {
      icon: Users,
      title: 'Acceptance of Terms',
      content: 'By accessing and using ArticleForge AI Studio, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.'
    },
    {
      icon: CheckCircle,
      title: 'Service Description',
      content: 'ArticleForge provides AI-powered content generation tools. We strive to maintain service availability but do not guarantee uninterrupted access. Features and pricing may change with notice.'
    },
    {
      icon: FileText,
      title: 'User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information and keep it updated. You are responsible for all activities under your account.'
    },
    {
      icon: Scale,
      title: 'Acceptable Use',
      content: 'You agree not to use the service for illegal purposes, to generate harmful or misleading content, to violate intellectual property rights, or to attempt unauthorized access to our systems.'
    },
    {
      icon: AlertTriangle,
      title: 'Content Ownership',
      content: 'You retain all rights to content you generate using our service. We do not claim ownership of your generated content. However, you grant us license to process and store content as necessary to provide the service.'
    },
    {
      icon: XCircle,
      title: 'Limitation of Liability',
      content: 'ArticleForge is provided "as is" without warranties. We are not liable for indirect damages, lost profits, or data loss. Our total liability is limited to the amount you paid in the past 12 months.'
    }
  ];

  const prohibitedUses = [
    'Generating illegal or harmful content',
    'Creating misleading or fraudulent material',
    'Violating intellectual property rights',
    'Attempting to reverse engineer our AI models',
    'Excessive automated requests or scraping',
    'Sharing account credentials with others'
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
            Terms of Service
          </h1>
          
          <p className="text-xl font-medium text-gray-700 mb-6">
            Last updated: November 20, 2024
          </p>

          <div className="border-l-4 border-primary pl-6 py-4">
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              These terms govern your use of ArticleForge AI Studio. Please read them carefully 
              before using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="border-4 border-black bg-white p-8 shadow-brutal-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 border-3 border-black flex items-center justify-center flex-shrink-0 ${
                    index % 2 === 0 ? 'bg-primary rotate-3' : 'bg-black -rotate-3'
                  }`}>
                    <Icon className={`w-7 h-7 ${index % 2 === 0 ? '' : 'text-primary'}`} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-black pt-2">{section.title}</h2>
                </div>
                
                <p className="text-lg font-medium text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            );
          })}

          {/* Prohibited Uses */}
          <div className="border-4 border-black bg-black text-primary p-8 shadow-brutal">
            <h2 className="text-3xl font-black mb-6">Prohibited Uses</h2>
            <p className="text-lg font-medium mb-6">
              The following activities are strictly prohibited when using our service:
            </p>
            <ul className="space-y-3">
              {prohibitedUses.map((use, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <p className="text-lg font-medium">{use}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Termination */}
          <div className="border-4 border-black bg-white p-8 shadow-brutal-sm">
            <h2 className="text-3xl font-black mb-4">Termination</h2>
            <p className="text-lg font-medium text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account if you violate these terms. 
              You may cancel your account at any time through your account settings.
            </p>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              Upon termination, your right to use the service will immediately cease. We may retain 
              certain data as required by law or for legitimate business purposes.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="border-4 border-black bg-gray-50 p-8">
            <h2 className="text-3xl font-black mb-4">Changes to These Terms</h2>
            <p className="text-lg font-medium text-gray-700 leading-relaxed mb-4">
              We may modify these terms at any time. We will notify you of significant changes via 
              email or through the service. Continued use after changes constitutes acceptance.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-black mb-4">Questions About These Terms?</h3>
            <p className="text-lg font-medium text-gray-700 mb-6">
              Contact our legal team for clarification
            </p>
            <a 
              href="mailto:legal@articleforge.ai" 
              className="inline-block px-8 py-4 bg-black text-primary border-4 border-black font-black hover-lift shadow-brutal-sm"
            >
              legal@articleforge.ai
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
