import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, GraduationCap, Calendar, Building, Phone, Mail, Shield, Send, CheckCircle } from 'lucide-react';
import { createEventRegistration } from '../lib/supabaseClient';

interface EventRegistrationFormProps {
  onBack: () => void;
}

interface FormData {
  name: string;
  degree: string;
  year: string;
  collegeName: string;
  universityName: string;
  contactNumber: string;
  alternateNumber: string;
  emailId: string;
  certificateCode: string;
  captchaAnswer: string;
}

interface FormErrors {
  [key: string]: string;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    degree: '',
    year: '',
    collegeName: '',
    universityName: '',
    contactNumber: '',
    alternateNumber: '',
    emailId: '',
    certificateCode: '',
    captchaAnswer: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: '', answer: 0 });

  // Check if form was already submitted
  useEffect(() => {
    const submitted = localStorage.getItem('campusToCloudRegistered');
    if (submitted === 'true') {
      setIsSubmitted(true);
    }
  }, []);

  // Generate captcha question
  useEffect(() => {
    generateCaptcha();
    generateCertificateCode();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion({
      question: `${num1} + ${num2} = ?`,
      answer: num1 + num2
    });
  };

  const generateCertificateCode = () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const code = `C2C-2025-${randomNum}`;
    setFormData(prev => ({ ...prev, certificateCode: code }));
  };

  // Tamil Nadu Colleges
  const colleges = [
    'Anna University',
    'IIT Madras',
    'NIT Tiruchirappalli',
    'PSG College of Technology',
    'Thiagarajar College of Engineering',
    'SSN College of Engineering',
    'Velammal Engineering College',
    'SRM Institute of Science and Technology',
    'VIT Vellore',
    'Amrita Vishwa Vidyapeetham',
    'Hindustan Institute of Technology',
    'Loyola College',
    'Stella Maris College',
    'Presidency College',
    'Madras Christian College'
  ];

  // Tamil Nadu Universities
  const universities = [
    'Anna University',
    'University of Madras',
    'Bharathiar University',
    'Madurai Kamaraj University',
    'Bharathidasan University',
    'Manonmaniam Sundaranar University',
    'Periyar University',
    'Thiruvalluvar University',
    'Tamil Nadu Open University',
    'Annamalai University'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Degree validation
    if (!formData.degree) {
      newErrors.degree = 'Please select your degree';
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = 'Please select your year';
    }

    // College validation
    if (!formData.collegeName) {
      newErrors.collegeName = 'Please select your college';
    }

    // University validation
    if (!formData.universityName) {
      newErrors.universityName = 'Please select your university';
    }

    // Contact number validation
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.contactNumber.replace(/\s+/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    // Alternate number validation (optional but if provided, must be valid)
    if (formData.alternateNumber.trim() && !/^[6-9]\d{9}$/.test(formData.alternateNumber.replace(/\s+/g, ''))) {
      newErrors.alternateNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    // Email validation
    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email ID is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email address';
    }

    // Certificate code validation
    if (!formData.certificateCode.trim()) {
      newErrors.certificateCode = 'Certificate code is required';
    } else if (!/^C2C-2025-\d{4}$/.test(formData.certificateCode)) {
      newErrors.certificateCode = 'Certificate code must be in format C2C-2025-XXXX';
    }

    // Captcha validation
    if (!formData.captchaAnswer.trim()) {
      newErrors.captchaAnswer = 'Please solve the captcha';
    } else if (parseInt(formData.captchaAnswer) !== captchaQuestion.answer) {
      newErrors.captchaAnswer = 'Incorrect answer. Please try again.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createEventRegistration({
        name: formData.name,
        degree: formData.degree,
        year: formData.year,
        college_name: formData.collegeName,
        university_name: formData.universityName,
        contact_number: formData.contactNumber,
        alternate_number: formData.alternateNumber || undefined,
        email_id: formData.emailId,
        certificate_code: formData.certificateCode
      });
      
      // Mark as submitted in localStorage
      localStorage.setItem('campusToCloudRegistered', 'true');
      localStorage.setItem('campusToCloudData', JSON.stringify(formData));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-green-100">
          <div className="mb-8">
            <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Registration Successful!
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Thank you for joining the Campus-to-Cloud event. We're excited to have you with us!
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 border border-green-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Your Certificate Code</h3>
            <p className="text-2xl font-mono font-bold text-green-600">
              {formData.certificateCode}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please save this code for your records
            </p>
          </div>

          <button
            onClick={onBack}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Event Details
        </button>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Campus to Cloud Event Registration
        </h2>
        <p className="text-lg text-gray-600">
          Fill out the form below to secure your spot at our exclusive event
        </p>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 font-semibold">{submitError}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
              <User size={16} className="inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
              }`}
              placeholder="Enter your full name"
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Degree and Year Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="degree" className="block text-sm font-bold text-gray-700 mb-2">
                <GraduationCap size={16} className="inline mr-2" />
                Degree *
              </label>
              <select
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.degree ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
                }`}
                aria-describedby={errors.degree ? 'degree-error' : undefined}
              >
                <option value="">Select Degree</option>
                <option value="UG">UG (Under Graduate)</option>
                <option value="PG">PG (Post Graduate)</option>
              </select>
              {errors.degree && (
                <p id="degree-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.degree}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-bold text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Year *
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.year ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
                }`}
                aria-describedby={errors.year ? 'year-error' : undefined}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              {errors.year && (
                <p id="year-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.year}
                </p>
              )}
            </div>
          </div>

          {/* College Name */}
          <div>
            <label htmlFor="collegeName" className="block text-sm font-bold text-gray-700 mb-2">
              <Building size={16} className="inline mr-2" />
              College Name *
            </label>
            <select
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                errors.collegeName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
              }`}
              aria-describedby={errors.collegeName ? 'college-error' : undefined}
            >
              <option value="">Select College</option>
              {colleges.map((college) => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
            {errors.collegeName && (
              <p id="college-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.collegeName}
              </p>
            )}
          </div>

          {/* University Name */}
          <div>
            <label htmlFor="universityName" className="block text-sm font-bold text-gray-700 mb-2">
              <GraduationCap size={16} className="inline mr-2" />
              University Name *
            </label>
            <select
              id="universityName"
              name="universityName"
              value={formData.universityName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                errors.universityName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
              }`}
              aria-describedby={errors.universityName ? 'university-error' : undefined}
            >
              <option value="">Select University</option>
              {universities.map((university) => (
                <option key={university} value={university}>{university}</option>
              ))}
            </select>
            {errors.universityName && (
              <p id="university-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.universityName}
              </p>
            )}
          </div>

          {/* Contact Numbers Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-bold text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.contactNumber ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
                }`}
                placeholder="9876543210"
                aria-describedby={errors.contactNumber ? 'contact-error' : undefined}
              />
              {errors.contactNumber && (
                <p id="contact-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.contactNumber}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="alternateNumber" className="block text-sm font-bold text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                Alternate Number (Optional)
              </label>
              <input
                type="tel"
                id="alternateNumber"
                name="alternateNumber"
                value={formData.alternateNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.alternateNumber ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
                }`}
                placeholder="9876543210"
                aria-describedby={errors.alternateNumber ? 'alternate-error' : undefined}
              />
              {errors.alternateNumber && (
                <p id="alternate-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.alternateNumber}
                </p>
              )}
            </div>
          </div>

          {/* Email ID */}
          <div>
            <label htmlFor="emailId" className="block text-sm font-bold text-gray-700 mb-2">
              <Mail size={16} className="inline mr-2" />
              Email ID *
            </label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                errors.emailId ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
              }`}
              placeholder="your.email@example.com"
              aria-describedby={errors.emailId ? 'email-error' : undefined}
            />
            {errors.emailId && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.emailId}
              </p>
            )}
          </div>

          {/* Certificate Code */}
          <div>
            <label htmlFor="certificateCode" className="block text-sm font-bold text-gray-700 mb-2">
              <Shield size={16} className="inline mr-2" />
              Certificate Code *
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="certificateCode"
                name="certificateCode"
                value={formData.certificateCode}
                onChange={handleInputChange}
                className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.certificateCode ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
                }`}
                placeholder="C2C-2025-XXXX"
                aria-describedby={errors.certificateCode ? 'certificate-error' : undefined}
              />
              <button
                type="button"
                onClick={generateCertificateCode}
                className="px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Generate
              </button>
            </div>
            {errors.certificateCode && (
              <p id="certificate-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.certificateCode}
              </p>
            )}
          </div>

          {/* Captcha */}
          <div>
            <label htmlFor="captchaAnswer" className="block text-sm font-bold text-gray-700 mb-2">
              <Shield size={16} className="inline mr-2" />
              Security Check *
            </label>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 px-6 py-3 rounded-xl border border-green-200 font-mono text-lg font-bold text-gray-800">
                {captchaQuestion.question}
              </div>
              <input
                type="number"
                id="captchaAnswer"
                name="captchaAnswer"
                value={formData.captchaAnswer}
                onChange={handleInputChange}
                className={`w-24 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.captchaAnswer ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'
                }`}
                placeholder="?"
                aria-describedby={errors.captchaAnswer ? 'captcha-error' : undefined}
              />
              <button
                type="button"
                onClick={generateCaptcha}
                className="px-3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all duration-300"
                title="Refresh captcha"
              >
                ↻
              </button>
            </div>
            {errors.captchaAnswer && (
              <p id="captcha-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.captchaAnswer}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Registering...
                </>
              ) : (
                <>
                  <Send size={24} />
                  Register Now
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationForm;