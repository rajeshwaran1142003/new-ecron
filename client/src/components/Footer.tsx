import React from 'react';
import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { subscribeToNewsletter } from '../lib/newsletter';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#courses', label: 'Courses' },
    { href: '#about', label: 'About Us' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
    { href: '#events', label: 'Events' }
  ];

  const courses = [
    'MEAN Stack Development',
    'UI/UX Design',
    'Java Development Training',
    'Python Development Training',
    'Cloud Computing',
    'AWS & DevOps Master Training',
    'Software Testing Master Program',
    'Data Science Master Training',
    'Data Analytics Training',
    'Cyber Security',
    'Azure DevOps'
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      setMessage('Thank you for subscribing to our newsletter!');
      setEmail('');
    } else {
      setMessage(result.error || 'Failed to subscribe. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/ecrone-f-02.png" 
                alt="Ecron Technologies Logo" 
                className="h-12 w-auto mr-4"
              />
              <div>
                <h3 className="text-2xl font-bold">Ecron Technologies</h3>
                <p className="text-pink-400 text-sm font-medium">Software Training Institute</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-8 leading-relaxed">
              Empowering careers through quality software education and industry connections. 
              Transform your future with our comprehensive training programs.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-pink-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <div>Door No: 55, First Floor</div>
                  <div>Railway Station Road, Alandur</div>
                  <div>Next to St. Thomas Mount Metro Parking</div>
                  <div>Chennai - 600 016</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-pink-400" />
                <div className="text-gray-400 text-sm">
                  <a href="tel:+918438829844" className="hover:text-pink-400 transition-colors block">
                    +91 8438829844
                  </a>
                  <a href="tel:+918122236894" className="hover:text-pink-400 transition-colors block">
                    +91 8122236894
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-pink-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:ecrontechnologies@gmail.com" className="text-gray-400 text-sm hover:text-pink-400 transition-colors break-all leading-relaxed">
                  ecrontechnologies@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-xl">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-pink-500" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-bold mb-6 text-xl">Our Courses</h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course}>
                  <a
                    href="#courses"
                    className="text-gray-400 hover:text-pink-400 transition-colors text-sm block py-1"
                  >
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6 text-xl">Stay Updated</h4>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Subscribe to our newsletter for the latest updates on courses and technology trends.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-pink-400 disabled:to-pink-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              {message && (
                <p className={`text-sm ${message.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </form>
            
            <div className="mt-8">
              <p className="text-gray-400 mb-4 text-sm">Follow Us</p>
              <div className="flex gap-4">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Ecron Technologies. All rights reserved.
            </p>
            
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;