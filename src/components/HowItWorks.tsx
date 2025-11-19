import { FileText, Settings, Download, Globe, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Globe,
      number: '01',
      title: 'Enter Details',
      description: 'Provide your website name and a brief description of your niche or topic.',
      color: 'bg-primary',
    },
    {
      icon: Settings,
      number: '02',
      title: 'Choose Settings',
      description: 'Select article type, length, tone of voice, and language preferences.',
      color: 'bg-white',
    },
    {
      icon: FileText,
      number: '03',
      title: 'Generate Article',
      description: 'Click generate and let AI create a comprehensive, SEO-optimized HTML article.',
      color: 'bg-black',
    },
    {
      icon: Download,
      number: '04',
      title: 'Copy and Use',
      description: 'Copy the HTML and SEO details directly into your blog or CMS platform.',
      color: 'bg-primary',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-black text-primary font-bold text-xs tracking-widest border-3 border-black">
              SIMPLE PROCESS
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
            How It <span className="italic">Works</span>
          </h2>
          <p className="text-xl font-medium text-gray-700 max-w-2xl">
            Generate professional HTML articles in four simple steps—no coding required
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className={`${step.color} ${step.color === 'bg-black' ? 'text-primary' : 'text-black'} border-4 border-black p-6 shadow-brutal hover-lift h-full flex flex-col`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${step.color === 'bg-black' ? 'bg-primary text-black' : step.color === 'bg-primary' ? 'bg-black text-primary' : 'bg-black text-primary'} border-3 border-black flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform`}>
                    <step.icon className="w-7 h-7" strokeWidth={2.5} />
                  </div>
                  <span className="text-5xl font-black opacity-20">{step.number}</span>
                </div>
                <h3 className="text-xl font-black mb-3 uppercase tracking-tight">{step.title}</h3>
                <p className={`text-sm font-medium leading-relaxed ${step.color === 'bg-black' ? 'text-primary opacity-90' : 'text-gray-700'}`}>
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className={`w-6 h-6 ${step.color === 'bg-black' ? 'text-primary' : 'text-black'}`} strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-primary border-4 border-black p-8 sm:p-12 shadow-brutal-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl sm:text-4xl font-black mb-2">Ready to Get Started?</h3>
              <p className="text-lg font-bold">Create your first SEO-optimized article in under 30 seconds</p>
            </div>
            <button
              onClick={() => {
                const element = document.getElementById('generator');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-8 py-4 bg-black text-primary border-4 border-black font-black text-lg shadow-brutal-sm hover-lift flex items-center gap-3 whitespace-nowrap"
            >
              START NOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
