import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, MapPin, Instagram, Linkedin, ExternalLink, AlertCircle } from 'lucide-react';

const ModernContactPage: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleMapError = () => {
    setMapError(true);
  };

  const contactDetails = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 84388 29844',
      href: 'tel:+918438829844',
      ariaLabel: 'Call Ecron Technologies'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'ecrontechnologies@gmail.com',
      href: 'mailto:ecrontechnologies@gmail.com',
      ariaLabel: 'Email Ecron Technologies'
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Sat 7AM-9PM',
      href: null,
      ariaLabel: 'Business hours'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/ecrontechnologies?igsh=ODdleXh6OHE2bXc5',
      ariaLabel: 'Follow us on Instagram'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://in.linkedin.com/in/ecron-technologies-811866353',
      ariaLabel: 'Connect with us on LinkedIn'
    }
  ];

  return (
    <div className={`modern-contact-page ${isVisible ? 'fade-in' : 'opacity-0'}`}>
      {/* Header Section */}
      <header className="bg-gradient-to-br from-pink-600 via-pink-700 to-pink-800 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <img 
              src="/logo copy.png" 
              alt="Ecron Technologies Logo" 
              className="h-16 w-auto mx-auto mb-8 filter brightness-0 invert"
              loading="lazy"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Contact Us</h1>
            <p className="text-2xl leading-relaxed animate-slide-up">
              Ready to start your tech journey? Get in touch with our team and discover 
              how we can help you achieve your programming goals.
            </p>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Contact Information Card */}
          <section className="mb-20" aria-labelledby="contact-info-heading">
            <h2 id="contact-info-heading" className="text-4xl font-bold text-center mb-12 text-gray-900">
              Get In Touch
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {contactDetails.map((detail, index) => {
                const IconComponent = detail.icon;
                const content = (
                  <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-pink-100">
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{detail.label}</h3>
                      <p className="text-lg text-gray-600 font-medium">{detail.value}</p>
                    </div>
                  </div>
                );

                return detail.href ? (
                  <a 
                    key={index}
                    href={detail.href}
                    className="block group"
                    aria-label={detail.ariaLabel}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Location Section */}
          <section className="mb-20" aria-labelledby="location-heading">
            <h2 id="location-heading" className="text-4xl font-bold text-center mb-12 text-gray-900">
              Visit Our Campus
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl p-10 shadow-2xl border border-pink-100">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 rounded-2xl">
                    <MapPin size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Location</h3>
                    <address className="text-lg text-gray-600 leading-relaxed not-italic">
                      Door No: 55, First Floor<br />
                      Railway Station Road, Alandur<br />
                      Next to St. Thomas Mount Metro Parking<br />
                      Chennai - 600 016, Tamil Nadu
                    </address>
                    <a 
                      href="https://www.google.com/maps/place/Ecron+Technologies/@12.996849,80.200753,212m/data=!3m1!1e3!4m6!3m5!1s0x3a5267c5c50abd9d%3A0xa11be222559d6e88!8m2!3d12.9968485!4d80.200753!16s%2Fg%2F11x07c4j10?hl=en&entry=ttu&g_ep=EgoyMDI1MDYyMy4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                      aria-label="Get directions to Ecron Technologies"
                    >
                      <ExternalLink size={20} />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-pink-100">
                {!mapError ? (
                  <>
                    {!mapLoaded && (
                      <div className="flex flex-col items-center justify-center h-96" aria-label="Loading map">
                        <div className="w-12 h-12 border-4 border-pink-200 border-top-pink-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">Loading map...</p>
                      </div>
                    )}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5234567890123!2d80.20123456789012!3d12.996849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267c5c50abd9d%3A0xa11be222559d6e88!2sEcron%20Technologies!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                      className={`w-full h-96 rounded-2xl ${mapLoaded ? 'block' : 'hidden'}`}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ecron Technologies Location Map"
                      onLoad={handleMapLoad}
                      onError={handleMapError}
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-2xl" role="alert">
                    <AlertCircle size={64} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-red-700 mb-2">Map Unavailable</h3>
                    <p className="text-red-600 text-center">Unable to load the map. Please use the directions link above.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Social Media Section */}
          <section className="text-center" aria-labelledby="social-heading">
            <h2 id="social-heading" className="text-4xl font-bold mb-6 text-gray-900">
              Connect With Us
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Follow us on social media for the latest updates, student success stories, 
              and programming tips.
            </p>
            
            <div className="flex justify-center gap-8">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border border-pink-100"
                    aria-label={social.ariaLabel}
                  >
                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-pink-600 group-hover:to-pink-700 transition-all duration-300">
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {social.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ModernContactPage;