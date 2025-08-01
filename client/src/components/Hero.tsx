import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Code, Database, Smartphone } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const typingTexts = [
    'Industry-Ready Software Training',
    'Expert Programming Courses',
    'Career Transformation Programs',
    'Hands-on Learning Experience'
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % typingTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const techIcons = [
    { icon: Code, label: 'Web Development', delay: '0s' },
    { icon: Database, label: 'Data Science', delay: '1s' },
    { icon: Smartphone, label: 'Mobile Development', delay: '2s' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-pink-600/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {techIcons.map(({ icon: Icon, label, delay }, index) => (
          <div
            key={label}
            className="absolute animate-float opacity-5"
            style={{
              left: `${20 + index * 30}%`,
              top: `${30 + index * 20}%`,
              animationDelay: delay,
              animationDuration: '6s'
            }}
          >
            <Icon size={120} className="text-pink-500" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-5xl mx-auto text-center text-white transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your Career with{' '}
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                {typingTexts[currentText]}
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Master cutting-edge technologies with expert instructors, hands-on projects, 
            and guaranteed placement support at Tamil Nadu's premier software training institute.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-slide-up">
            <a
              href="#courses"
              className="group bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 flex items-center gap-3 transform hover:scale-105 hover:shadow-glow-pink"
            >
              Explore Courses
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#demo-form"
              className="group bg-transparent border-2 border-pink-500 text-pink-400 px-8 py-4 rounded-xl font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
            >
              <Play size={20} className="group-hover:scale-110 transition-transform" />
              Schedule Free Demo
            </a>
          </div>

          {/* Quick Stats with Counter Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-slide-up">
            {[
              { number: '1000+', label: 'Students Trained' },
              { number: '50+', label: 'Expert Instructors' },
              { number: '100%', label: 'Placement Support' },
              { number: '25+', label: 'Industry Partners' }
            ].map((stat, index) => (
              <div key={stat.label} className="group">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 transform group-hover:scale-105">
                  <div className="text-2xl md:text-3xl font-bold text-pink-400 mb-2 group-hover:text-pink-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="w-6 h-10 border-2 border-pink-500/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-pink-500/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;