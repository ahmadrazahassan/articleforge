import { Briefcase, MapPin, Clock, ArrowRight, Users, Rocket, Heart, Code } from 'lucide-react';
import { useState } from 'react';

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = ['all', 'engineering', 'design', 'marketing', 'operations'];

  const jobPositions: JobPosition[] = [
    {
      id: 1,
      title: 'Senior Full-Stack Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and scale our AI-powered content generation platform with modern web technologies.'
    },
    {
      id: 2,
      title: 'Product Designer',
      department: 'design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive interfaces that make complex AI technology accessible to everyone.'
    },
    {
      id: 3,
      title: 'Machine Learning Engineer',
      department: 'engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      description: 'Develop and optimize AI models for content generation and natural language processing.'
    },
    {
      id: 4,
      title: 'Content Marketing Lead',
      department: 'marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead our content strategy and help creators discover the power of AI-assisted writing.'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and maintain infrastructure that powers thousands of content generations daily.'
    },
    {
      id: 6,
      title: 'Customer Success Manager',
      department: 'operations',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help our users get the most value from ArticleForge and build lasting relationships.'
    }
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobPositions 
    : jobPositions.filter(job => job.department === selectedDepartment);

  const benefits = [
    { icon: Rocket, title: 'Fast Growth', description: 'Rapid career advancement in a scaling startup' },
    { icon: Users, title: 'Amazing Team', description: 'Work with world-class talent from top companies' },
    { icon: Heart, title: 'Work-Life Balance', description: 'Flexible hours and unlimited PTO policy' },
    { icon: Code, title: 'Latest Tech', description: 'Work with cutting-edge AI and web technologies' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b-4 border-black overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-black rotate-12 bg-primary opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-block px-4 py-2 bg-black text-primary font-black text-xs tracking-widest mb-8 border-3 border-black">
            CAREERS
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-8">
            Join Our
            <span className="block text-6xl sm:text-7xl lg:text-8xl italic mt-4 mb-4">Mission</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-gray-700 max-w-3xl leading-relaxed mb-8">
            Help us revolutionize content creation for millions of creators worldwide. 
            We're building something special, and we want you to be part of it.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="border-4 border-black bg-white px-6 py-4">
              <div className="text-3xl font-black mb-1">20+</div>
              <div className="text-sm font-bold text-gray-600">Team Members</div>
            </div>
            <div className="border-4 border-black bg-primary px-6 py-4">
              <div className="text-3xl font-black mb-1">6</div>
              <div className="text-sm font-bold">Open Positions</div>
            </div>
            <div className="border-4 border-black bg-black text-primary px-6 py-4">
              <div className="text-3xl font-black mb-1">100%</div>
              <div className="text-sm font-bold">Remote-First</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-center">Why Join Us?</h2>
          <p className="text-xl font-medium text-gray-700 text-center mb-16 max-w-2xl mx-auto">
            We offer more than just a job—we offer a chance to shape the future
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="border-4 border-black bg-white p-6 shadow-brutal-sm hover-lift"
                >
                  <div className={`w-14 h-14 border-4 border-black flex items-center justify-center mb-4 ${
                    index % 2 === 0 ? 'bg-primary rotate-3' : 'bg-black -rotate-3'
                  }`}>
                    <Icon className={`w-7 h-7 ${index % 2 === 0 ? '' : 'text-primary'}`} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-black mb-2">{benefit.title}</h3>
                  <p className="font-medium text-gray-700">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black mb-12">Open Positions</h2>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-3 font-black text-sm uppercase tracking-wider border-3 border-black transition-all ${
                  selectedDepartment === dept
                    ? 'bg-black text-primary'
                    : 'bg-white hover:bg-primary'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="border-4 border-black bg-white p-8 shadow-brutal-sm hover-lift group cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="px-3 py-1 bg-primary border-2 border-black text-xs font-black uppercase tracking-wider">
                        {job.department}
                      </span>
                      <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" strokeWidth={2.5} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" strokeWidth={2.5} />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-black mb-3 group-hover:translate-x-2 transition-transform">
                      {job.title}
                    </h3>
                    
                    <p className="text-lg font-medium text-gray-700 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  
                  <button className="px-8 py-4 bg-black text-primary border-4 border-black font-black text-base shadow-brutal-sm hover-lift flex items-center gap-3 whitespace-nowrap">
                    Apply Now
                    <ArrowRight className="w-5 h-5" strokeWidth={3} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-gray-500">No positions available in this department</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-black bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <Briefcase className="w-16 h-16 border-4 border-black bg-primary p-3 rotate-6" strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">Don't See Your Role?</h2>
          <p className="text-xl font-medium text-gray-700 mb-8">
            We're always looking for talented people. Send us your resume and let's talk!
          </p>
          <button className="inline-flex items-center gap-3 px-10 py-5 bg-black text-primary border-4 border-black font-black text-xl shadow-brutal hover-lift">
            Send Your Resume
            <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
      </section>
    </div>
  );
}
