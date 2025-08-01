import React, { useState } from 'react';
import { Calendar, Users, MapPin, Clock, ArrowRight } from 'lucide-react';
import EventRegistrationForm from './EventRegistrationForm';

const Events: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const eventDetails = {
    title: "Campus to Cloud",
    subtitle: "Transform Your Career Journey",
    date: "March 15, 2025",
    time: "10:00 AM - 4:00 PM",
    venue: "Ecron Technologies Campus",
    description: "Join us for an exclusive event designed to bridge the gap between academic learning and industry requirements. Learn about cloud technologies, career opportunities, and get hands-on experience with industry experts.",
    highlights: [
      "Industry Expert Sessions",
      "Hands-on Cloud Computing Workshop",
      "Career Guidance & Placement Support",
      "Networking with Tech Professionals",
      "Certificate of Participation",
      "Refreshments & Lunch"
    ]
  };

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {!showRegistrationForm ? (
          <>
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Upcoming{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Events
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join our exclusive events designed to accelerate your tech career and connect with industry professionals.
              </p>
            </div>

            {/* Event Card */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                {/* Event Header */}
                <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white p-8 md:p-12">
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                      {eventDetails.title}
                    </h3>
                    <p className="text-xl text-green-100 mb-6">
                      {eventDetails.subtitle}
                    </p>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-8 md:p-12">
                  <div className="mb-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">About the Event</h4>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {eventDetails.description}
                    </p>
                  </div>

                  {/* Event Highlights */}
                  <div className="mb-10">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {eventDetails.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700 font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Registration CTA */}
                  <div className="text-center">
                    <button
                      onClick={() => setShowRegistrationForm(true)}
                      className="group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                    >
                      <Users size={24} />
                      Register Now - Free Entry
                      <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-gray-500 mt-4 text-sm">
                      Limited seats available. Register now to secure your spot!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EventRegistrationForm onBack={() => setShowRegistrationForm(false)} />
        )}
      </div>
    </section>
  );
};

export default Events;