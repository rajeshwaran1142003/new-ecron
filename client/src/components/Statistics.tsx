import React, { useEffect, useRef, useState } from 'react';
import { Users, Award, Target, Building } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  number: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, number, suffix, label, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, delay]);

  useEffect(() => {
    if (isVisible && count < number) {
      const increment = Math.ceil(number / 50);
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + increment, number));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [count, number, isVisible]);

  return (
    <div ref={ref} className="text-center group">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 border border-pink-100 dark:border-pink-900 hover:border-pink-300 dark:hover:border-pink-700">
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-pink-600 group-hover:to-pink-700 transition-all duration-300 transform group-hover:rotate-6 shadow-lg">
          <Icon size={36} className="text-white" />
        </div>
        <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
            {count}{suffix}
          </span>
        </div>
        <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
          {label}
        </div>
      </div>
    </div>
  );
};

const Statistics: React.FC = () => {
  const stats = [
    { icon: Users, number: 1000, suffix: '+', label: 'Students Trained', delay: 0 },
    { icon: Award, number: 50, suffix: '+', label: 'Expert Instructors', delay: 200 },
    { icon: Target, number: 100, suffix: '%', label: 'Placement Support', delay: 400 },
    { icon: Building, number: 25, suffix: '+', label: 'Industry Partners', delay: 600 }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our track record speaks for itself. Join thousands of successful graduates 
            who have transformed their careers with our comprehensive training programs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;