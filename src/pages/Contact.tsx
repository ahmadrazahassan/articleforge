import { Mail, MessageSquare, MapPin, Clock, Send, Twitter, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Message sent! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-4 py-2 bg-black text-primary font-black text-xs tracking-widest mb-8 border-3 border-black">
            CONTACT US
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-8">
            Let's Talk
            <span className="block text-6xl sm:text-7xl lg:text-8xl italic mt-4">About Your Project</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-gray-700 max-w-3xl">
            Have a question, feedback, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-black mb-8">Get in Touch</h2>
                <p className="text-lg font-medium text-gray-700 leading-relaxed mb-8">
                  Whether you have a question about features, pricing, need a demo, 
                  or anything else, our team is ready to answer all your questions.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="border-4 border-black bg-white p-6 shadow-brutal-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 border-3 border-black bg-primary flex items-center justify-center rotate-3 flex-shrink-0">
                      <Mail className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2">Email Us</h3>
                      <p className="font-bold text-gray-700">support@articleforge.ai</p>
                      <p className="text-sm font-medium text-gray-600 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="border-4 border-black bg-white p-6 shadow-brutal-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 border-3 border-black bg-black flex items-center justify-center -rotate-3 flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-primary" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2">Live Chat</h3>
                      <p className="font-bold text-gray-700">Available 9AM - 6PM EST</p>
                      <p className="text-sm font-medium text-gray-600 mt-1">Get instant answers</p>
                    </div>
                  </div>
                </div>

                <div className="border-4 border-black bg-white p-6 shadow-brutal-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 border-3 border-black bg-primary flex items-center justify-center rotate-6 flex-shrink-0">
                      <MapPin className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2">Visit Us</h3>
                      <p className="font-bold text-gray-700">Remote-First Company</p>
                      <p className="text-sm font-medium text-gray-600 mt-1">HQ: San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h3 className="text-sm font-black uppercase tracking-widest mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-3 border-black bg-white hover:bg-primary hover:-rotate-6 transition-all flex items-center justify-center shadow-brutal-sm">
                    <Twitter className="w-5 h-5" strokeWidth={2.5} />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-3 border-black bg-white hover:bg-primary hover:rotate-6 transition-all flex items-center justify-center shadow-brutal-sm">
                    <Github className="w-5 h-5" strokeWidth={2.5} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-3 border-black bg-white hover:bg-primary hover:-rotate-6 transition-all flex items-center justify-center shadow-brutal-sm">
                    <Linkedin className="w-5 h-5" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="border-4 border-black bg-white p-8 shadow-brutal">
                <h2 className="text-3xl font-black mb-8">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 border-3 border-black font-bold text-base focus:outline-none focus:ring-4 focus:ring-primary ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm font-bold text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 border-3 border-black font-bold text-base focus:outline-none focus:ring-4 focus:ring-primary ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm font-bold text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-3 border-black font-bold text-base focus:outline-none focus:ring-4 focus:ring-primary"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-4 border-3 border-black font-bold text-base focus:outline-none focus:ring-4 focus:ring-primary resize-none ${
                        errors.message ? 'border-red-500' : ''
                      }`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm font-bold text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-5 bg-primary border-4 border-black font-black text-xl shadow-brutal hover-lift flex items-center justify-center gap-3"
                  >
                    Send Message
                    <Send className="w-6 h-6" strokeWidth={3} />
                  </button>
                </form>
              </div>

              {/* Response Time Note */}
              <div className="mt-6 flex items-center gap-3 p-4 border-3 border-black bg-gray-50">
                <Clock className="w-6 h-6 flex-shrink-0" strokeWidth={2.5} />
                <p className="text-sm font-bold">
                  <span className="font-black">Average response time:</span> Under 24 hours during business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
