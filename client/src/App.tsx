import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './components/AuthProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import Courses from './components/Courses';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Events from './components/Events';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import DemoForm from './components/DemoForm';
import ContactPage from './components/ContactPage';
import ModernContactPage from './components/ModernContactPage';
import CourseDetailPage from './components/CourseDetailPage';
import './styles/ModernContactPage.css';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'contact' | 'modern-contact' | 'course-detail'>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);

  // Handle URL hash changes for demo purposes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#demo-form') {
        setIsDemoFormOpen(true);
      } else if (hash === '#contact-page') {
        setCurrentView('contact');
      } else if (hash === '#modern-contact') {
        setCurrentView('modern-contact');
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-detail');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCourseId('');
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          {currentView === 'course-detail' ? (
            <CourseDetailPage 
              courseId={selectedCourseId} 
              onBack={handleBackToHome}
            />
          ) : currentView === 'modern-contact' ? (
            <ModernContactPage />
          ) : currentView === 'contact' ? (
            <>
              <Header />
              <ContactPage />
              <Footer />
              <WhatsAppFloat />
            </>
          ) : (
            <>
              <Header />
              <Hero />
              <Statistics />
              <Courses onCourseSelect={handleCourseSelect} />
              <About />
              <Testimonials />
              <Contact />
              <Events />
              <Footer />
              <WhatsAppFloat />
            </>
          )}
          <DemoForm 
            isOpen={isDemoFormOpen} 
            onClose={() => setIsDemoFormOpen(false)} 
          />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;