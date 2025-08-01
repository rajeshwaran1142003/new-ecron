import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Full Stack Developer',
      company: 'TCS',
      rating: 5,
      content: 'Ecron Technologies transformed my career completely. The hands-on training and placement support helped me secure my dream job at TCS. The instructors are amazing!'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Data Scientist',
      company: 'Infosys',
      rating: 5,
      content: 'The Data Science course exceeded my expectations. Real-world projects and expert mentorship made all the difference. Now I\'m working as a Data Scientist at Infosys.'
    },
    {
      id: 3,
      name: 'Anitha Reddy',
      role: 'Mobile App Developer',
      company: 'Wipro',
      rating: 5,
      content: 'From zero coding knowledge to building mobile apps - Ecron made it possible! The curriculum is well-structured and the support is incredible.'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'DevOps Engineer',
      company: 'HCL',
      rating: 5,
      content: 'The Cloud Computing course at Ecron gave me the skills I needed to excel in DevOps. The practical approach and industry connections are unmatched.'
    },
    {
      id: 5,
      name: 'Deepika Nair',
      role: 'AI Engineer',
      company: 'Cognizant',
      rating: 5,
      content: 'The AI course opened up a whole new world for me. Now I\'m working on cutting-edge AI projects at Cognizant. Thank you, Ecron Technologies!'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Student{' '}
            <span className="bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Hear from our graduates who have successfully transformed their careers 
            and secured positions in top technology companies.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl border border-pink-100 dark:border-pink-900">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote size={100} className="text-pink-600" />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={28} className="text-yellow-400 fill-current mx-1 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 text-center mb-10 leading-relaxed font-medium">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <div className="font-bold text-gray-900 dark:text-white text-2xl mb-2">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-pink-600 dark:text-pink-400 font-semibold text-lg mb-1">
                  {testimonials[currentIndex].role}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {testimonials[currentIndex].company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 border border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700 transform hover:scale-110"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 border border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700 transform hover:scale-110"
          >
            <ChevronRight size={28} />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 w-12 shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-pink-300 dark:hover:bg-pink-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;