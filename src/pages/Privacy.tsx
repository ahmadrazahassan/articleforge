import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Account information (name, email address)',
        'Usage data and analytics',
        'Generated content and preferences',
        'Payment information (processed securely by third-party providers)'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our services',
        'Process your content generation requests',
        'Send important updates and notifications',
        'Analyze usage patterns to enhance user experience'
      ]
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        'Industry-standard encryption for data in transit and at rest',
        'Regular security audits and updates',
        'Secure cloud infrastructure with redundancy',
        'Limited employee access with strict protocols'
      ]
    },
    {
      icon: Eye,
      title: 'Your Privacy Rights',
      content: [
        'Access your personal data at any time',
        'Request data deletion or correction',
        'Opt-out of marketing communications',
        'Export your data in portable format'
      ]
    },
    {
      icon: UserCheck,
      title: 'Third-Party Services',
      content: [
        'We use trusted third-party services for payments and analytics',
        'These services have their own privacy policies',
        'We never sell your personal information',
        'Data sharing is limited to essential service providers only'
      ]
    },
    {
      icon: FileText,
      title: 'Data Retention',
      content: [
        'Account data retained while your account is active',
        'Generated content stored for 90 days by default',
        'You can delete your data at any time',
        'Automated deletion of inactive accounts after 2 years'
      ]
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
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            Privacy Policy
          </h1>
          
          <p className="text-xl font-medium text-gray-700 mb-6">
            Last updated: November 20, 2024
          </p>

          <div className="border-l-4 border-primary pl-6 py-4">
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              At ArticleForge, we take your privacy seriously. This policy explains how we 
              collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="border-4 border-black bg-white p-8 shadow-brutal-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 border-3 border-black bg-primary flex items-center justify-center rotate-3 flex-shrink-0">
                    <Icon className="w-7 h-7" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-black pt-2">{section.title}</h2>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-black mt-2 flex-shrink-0"></div>
                      <p className="text-lg font-medium text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Contact Section */}
          <div className="border-4 border-black bg-black text-primary p-8 shadow-brutal">
            <h2 className="text-3xl font-black mb-4">Questions About Privacy?</h2>
            <p className="text-lg font-medium mb-6">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact our Privacy Team.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:privacy@articleforge.ai" 
                className="inline-block px-6 py-3 bg-primary text-black border-3 border-primary font-black hover:bg-white hover:border-white transition-colors"
              >
                privacy@articleforge.ai
              </a>
              <Link 
                to="/contact" 
                className="inline-block px-6 py-3 bg-transparent border-3 border-primary font-black hover:bg-primary hover:text-black transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="text-center py-8">
            <p className="text-base font-bold text-gray-600">
              We may update this policy from time to time. Check back regularly for the latest version.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
