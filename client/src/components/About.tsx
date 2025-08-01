import React from 'react';
import { Target, Eye, Award, Users2 } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Empowering careers through quality software education and industry connections'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the leading technology education provider bridging the gap between academia and industry'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering world-class training with cutting-edge curriculum and methodologies'
    },
    {
      icon: Users2,
      title: 'Community',
      description: 'Building a strong network of technology professionals and lifelong learners'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-slide-in-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              About{' '}
              <span className="bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                Ecron Technologies
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Established as Tamil Nadu's premier software training institute, Ecron Technologies 
              has been at the forefront of technology education for over a decade. We specialize 
              in transforming aspiring professionals into industry-ready software experts.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Our comprehensive approach combines theoretical knowledge with practical application, 
              ensuring our students are equipped with both the technical skills and professional 
              mindset needed to excel in today's competitive technology landscape.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div key={index} className="flex items-start gap-4 group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 rounded-xl flex-shrink-0 group-hover:from-pink-600 group-hover:to-pink-700 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image/Stats Card */}
          <div className="relative animate-slide-in-right">
            <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl p-10 text-white shadow-2xl border border-pink-500/20">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-pink-500/20">
                <h3 className="text-3xl font-bold mb-6 text-center">
                  <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                    Why Choose Us?
                  </span>
                </h3>
                <ul className="space-y-4">
                  {[
                    'Industry-expert instructors with real-world experience',
                    'Hands-on projects and practical learning approach',
                    'Dedicated placement assistance and career guidance',
                    'State-of-the-art facilities and learning environment',
                    'Flexible learning schedules for working professionals',
                    'Continuous support and mentorship throughout your journey'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                    5000+
                  </span>
                </div>
                <div className="text-pink-300 text-xl font-semibold">Success Stories</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;