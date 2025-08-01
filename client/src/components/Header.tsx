import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#courses', label: 'Courses' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
    { href: '#events', label: 'Events' }
  ];

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-6 overflow-x-auto">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <MapPin size={14} />
                <a 
                  href="https://www.google.com/maps/place/Ecron+Technologies/@12.996849,80.200753,212m/data=!3m1!1e3!4m6!3m5!1s0x3a5267c5c50abd9d%3A0xa11be222559d6e88!8m2!3d12.9968485!4d80.200753!16s%2Fg%2F11x07c4j10?hl=en&entry=ttu&g_ep=EgoyMDI1MDYyMy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-200 transition-colors"
                >
                  <span className="hidden sm:inline">Door No: 55, Railway Station Road, Alandur, Chennai - 600 016</span>
                  <span className="sm:hidden">Alandur, Chennai</span>
                </a>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Phone size={14} />
                <a href="tel:+918438829844" className="hover:text-pink-200 transition-colors">
                  +91 8438829844
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0" />
                <a href="mailto:ecrontechnologies@gmail.com" className="hover:text-pink-200 transition-colors break-all text-xs sm:text-sm">
                  <span className="hidden md:inline">ecrontechnologies@gmail.com</span>
                  <span className="md:hidden">Contact</span>
                </a>
              </div>
            </div>
            <div className="hidden sm:block w-px h-4 bg-pink-300/50"></div>
            <div className="flex-shrink-0">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-xl border-b border-pink-100' 
          : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center animate-slide-in-left">
              <img 
                src="/logo copy.png" 
                alt="Ecron Technologies Logo" 
                className="h-12 w-auto mr-3 transition-transform hover:scale-105"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Ecron Technologies
                </h1>
                <p className="text-xs text-pink-600 font-medium">
                  Software Training Institute
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-pink-600 font-medium transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-pink-100 transition-all duration-300 transform hover:scale-110"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 py-4 border-t border-gray-200' : 'max-h-0'
          }`}>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-pink-600 font-medium transition-all duration-300 py-2 px-4 rounded-lg hover:bg-pink-50 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;