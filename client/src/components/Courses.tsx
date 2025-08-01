import React, { useState } from 'react';
import { Code, Database, Smartphone, Globe, Brain, Shield, FileCode, Server, Layout, Cloud, TestTube, BarChart3, Coffee, ChevronDown, ChevronUp, Palette, Layers } from 'lucide-react';

interface Course {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  fee: string;
  maxSalary?: string;
  highlights: string[];
  details: string[];
}

interface CoursesProps {
  onCourseSelect?: (courseId: string) => void;
}

const Courses: React.FC<CoursesProps> = ({ onCourseSelect }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: 'mean-stack',
      icon: Code,
      title: 'MEAN Stack Development',
      description: 'Complete full-stack development with MongoDB, Express.js, Angular, and Node.js.',
      category: 'fullstack',
      duration: '2 months',
      level: 'Beginner to Advanced',
      highlights: ['HTML, CSS, JS, Bootstrap', 'React JS, Node.js', 'MongoDB'],
      details: [
        'Frontend development with HTML, CSS, JavaScript',
        'Modern frameworks: React JS and Bootstrap',
        'Backend development with Node.js',
        'Database management with MongoDB',
        'Full-stack project development'
      ]
    },
    {
      id: 'uiux-design',
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Comprehensive UI/UX design training covering user research, wireframing, prototyping, and visual design using industry-standard tools.',
      category: 'design',
      duration: '2 months',
      level: 'Beginner to Intermediate',
      highlights: ['HTML, CSS, JS, Bootstrap', 'React JS, Node.js, MongoDB', 'Figma, Adobe XD, Sketch'],
      details: [
        'Full product design lifecycle training',
        'User research and wireframing techniques',
        'Prototyping and visual design mastery',
        'Industry tools: Figma, Adobe XD, Sketch',
        'Real-world case studies and projects'
      ]
    },
    {
      id: 'cyber-security',
      icon: Shield,
      title: 'Cyber Security',
      description: 'Comprehensive cybersecurity training covering ethical hacking, network security, and digital forensics.',
      category: 'security',
      duration: '14 weeks',
      level: 'Intermediate to Advanced',
      highlights: ['Ethical Hacking', 'Network Security', 'Digital Forensics'],
      details: [
        'Penetration testing and vulnerability assessment',
        'Network security and firewall configuration',
        'Digital forensics and incident response'
      ]
    },
    {
      id: 'azure-devops',
      icon: Cloud,
      title: 'Azure DevOps',
      description: 'Master Microsoft Azure DevOps tools and practices for continuous integration and deployment.',
      category: 'cloud',
      duration: '10 weeks',
      level: 'Intermediate',
      highlights: ['Azure DevOps', 'CI/CD Pipelines', 'Infrastructure as Code'],
      details: [
        'Azure DevOps services and tools',
        'Building CI/CD pipelines',
        'Infrastructure automation with ARM templates'
      ]
    },

    {
      id: '2',
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'Master cloud platforms and DevOps practices for modern infrastructure management.',
      category: 'cloud',
      duration: '13 weeks',
      level: 'Intermediate',
      fee: 'Contact for pricing',
      highlights: ['Linux, AWS, Azure, GCP', 'DevOps'],
      details: [
        'Virtual machines, cloud storage',
        'CI/CD pipelines',
        'Infrastructure as Code'
      ]
    },
    {
      id: '3',
      icon: Server,
      title: 'AWS & DevOps Master Training',
      description: 'Comprehensive AWS cloud services with advanced DevOps practices, automation, and enterprise deployment strategies.',
      category: 'cloud',
      duration: '2 months',
      level: 'Beginner to Advanced',
      fee: '₹25,000',
      highlights: ['AWS Cloud Services', 'DevOps & CI/CD', 'Docker & Kubernetes'],
      details: [
        '• AWS Services: EC2, S3, RDS, Lambda, VPC',
        '• DevOps Tools: Jenkins, Docker, Kubernetes',
        '• Infrastructure as Code: Terraform, CloudFormation',
        '• Expected Starting Salary: ₹30,000/month'
      ]
    },
    {
      id: '4',
      icon: TestTube,
      title: 'Software Testing Master Program',
      description: 'Comprehensive testing training covering manual and automated testing methodologies.',
      category: 'testing',
      duration: '12 weeks',
      level: 'Beginner to Intermediate',
      fee: 'Contact for pricing',
      highlights: ['Manual Testing', 'Selenium with Java', 'SQL'],
      details: [
        'Test case design',
        'UI automation using Selenium',
        'Database validation'
      ]
    },
    {
      id: '5',
      icon: Brain,
      title: 'Data Science Master Training',
      description: 'Complete data science program covering ML, AI, and advanced analytics.',
      category: 'data',
      duration: '20 weeks',
      level: 'Intermediate to Advanced',
      fee: 'Contact for pricing',
      highlights: ['SQL, Statistics, Python', 'Data Science, ML, Deep Learning', 'AI, Power BI'],
      details: [
        'Real-world ML models',
        'Data wrangling & visualization',
        'AI project applications'
      ]
    },
    {
      id: '6',
      icon: BarChart3,
      title: 'Data Analytics Training',
      description: 'Business intelligence and data analytics with practical dashboard creation.',
      category: 'data',
      duration: '13 weeks',
      level: 'Beginner to Intermediate',
      fee: 'Contact for pricing',
      highlights: ['Excel, Advanced Excel', 'SQL, Power BI', 'Python'],
      details: [
        'Dashboard creation',
        'Data cleaning & aggregation',
        'BI storytelling'
      ]
    },
    {
      id: '7',
      icon: Coffee,
      title: 'Java Developer Training',
      description: 'Enterprise Java development with J2EE and database integration.',
      category: 'programming',
      duration: '16 weeks',
      level: 'Beginner to Advanced',
      fee: 'Contact for pricing',
      highlights: ['Java, J2EE', 'SQL'],
      details: [
        'OOP, Servlets, JDBC',
        'SQL queries & logic building',
        'Java-based app development'
      ]
    },
    {
      id: '8',
      icon: Code,
      title: 'Python Developer Training',
      description: 'Python programming from basics to advanced with database integration.',
      category: 'programming',
      duration: '13 weeks',
      level: 'Beginner to Advanced',
      fee: 'Contact for pricing',
      highlights: ['Python', 'SQL'],
      details: [
        'Python basics to advanced',
        'Data handling, file ops',
        'SQL queries for backend integration'
      ]
    }
  ];

  const filters = [
    { id: 'all', label: 'All Courses' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'programming', label: 'Programming' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'data', label: 'Data Science' },
    { id: 'testing', label: 'Testing' },
    { id: 'security', label: 'Cyber Security' }
  ];

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  const toggleCourseDetails = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const handleViewDetails = (courseId: string) => {
    if (onCourseSelect) {
      onCourseSelect(courseId);
    }
  };

  return (
    <section id="courses" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Master Programs &{' '}
            <span className="bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              Professional Training
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Transform your career with our industry-focused training programs. From full-stack development 
            to data science and cloud computing, we offer comprehensive courses designed by industry experts.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-slide-up">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-xl shadow-pink-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => {
            const IconComponent = course.icon;
            const isExpanded = expandedCourse === course.id;
            
            return (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-800 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:from-pink-600 group-hover:to-pink-700 transition-all duration-300 transform group-hover:rotate-6 shadow-lg">
                    <IconComponent size={32} className="text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Topics:</h4>
                  <div className="space-y-2">
                    {course.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="text-sm bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 px-3 py-2 rounded-lg border border-pink-200 dark:border-pink-800"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center items-center mb-6">
                  <span className="text-sm bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full font-medium">
                    {course.duration}
                  </span>
                  <span className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full font-medium ml-4">
                    {course.level}
                  </span>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl animate-slide-up">
                    <ul className="space-y-2">
                      {course.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                          <span className="text-pink-500 mt-1">→</span>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleViewDetails(course.id)}
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Apply for this Course
                  </button>

                  <button
                    onClick={() => toggleCourseDetails(course.id)}
                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Quick Preview
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            👉 Click "View Full Details & Apply" to see complete course information and submit your application.
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            Transform your career with{' '}
            <span className="bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              industry-relevant skills
            </span>{' '}
            and hands-on training.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Courses;