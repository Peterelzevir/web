import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  // Set loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for progress bar
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Handle navbar visibility (hide on scroll down, show on scroll up)
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      setLastScrollY(currentScrollY);
      
      // Determine active section
      const scrollPosition = window.scrollY + 200; // Offset for better UX
      
      for (const section in sectionRefs) {
        const element = sectionRefs[section].current;
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
      <Navbar visible={navbarVisible} activeSection={activeSection} />
      <ProgressBar progress={scrollProgress} />
      
      <main>
        <section 
          ref={sectionRefs.hero} 
          id="hero" 
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <HeroSection />
        </section>
        
        <section 
          ref={sectionRefs.about} 
          id="about" 
          className="min-h-screen py-20 relative"
        >
          <AboutSection />
        </section>
        
        <section 
          ref={sectionRefs.skills} 
          id="skills" 
          className="min-h-screen py-20 relative bg-gray-800"
        >
          <SkillsSection />
        </section>
        
        <section 
          ref={sectionRefs.projects} 
          id="projects" 
          className="min-h-screen py-20 relative"
        >
          <ProjectsSection />
        </section>
        
        <section 
          ref={sectionRefs.contact} 
          id="contact" 
          className="min-h-screen py-20 relative bg-gray-800"
        >
          <ContactSection />
        </section>
      </main>
      
      <Footer />
      <FloatingNavigation />
    </div>
  );
};

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin"></div>
        <div className="absolute inset-4 rounded-full border-t-4 border-purple-500 animate-spin-slow"></div>
        <div className="absolute inset-8 rounded-full border-t-4 border-green-500 animate-spin-slower"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-green-400">P</span>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-green-400">
        Peter
      </h1>
      
      <div className="flex gap-2 mb-8">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
      
      <p className="text-gray-400 animate-pulse">Loading experience...</p>
    </div>
  );
};

// Navbar Component
const Navbar = ({ visible, activeSection }) => {
  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];
  
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="relative w-8 h-8 mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">P</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white">Peter</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a 
                      href={`#${link.id}`}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative
                        ${activeSection === link.id ? 'text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
                    >
                      {link.label}
                      {activeSection === link.id && (
                        <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 w-full"></span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden transition-max-height duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-64' : 'max-h-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === link.id 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

// Progress Bar Component
const ProgressBar = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-800">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center text-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-blue-500 bg-opacity-10 -top-20 -left-20 animate-float"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-500 bg-opacity-10 -bottom-20 -right-20 animate-float-delay"></div>
        <div className="absolute w-32 h-32 rounded-full bg-green-500 bg-opacity-10 bottom-40 left-20 animate-float-delay-long"></div>
      </div>
      
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 animate-gradient">
          Hi, I'm Peter
        </h1>
        
        <div className="text-2xl md:text-3xl font-light mb-8 text-gray-300">
          <span className="inline-block">I build </span>
          <span className="typed-text inline-block relative">
            <span className="inline-block overflow-hidden animate-type-clean whitespace-nowrap">modern web experiences</span>
            <span className="absolute bottom-0 left-0 border-r-4 border-gray-300 h-full animate-cursor"></span>
          </span>
        </div>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Crafting beautiful, interactive, and responsive websites using the latest technologies and best practices.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/ainews" className="btn-primary">
            AI News
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/kalkulator" className="btn-secondary">
            Calculator
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
        
        <div className="mt-16 animate-bounce">
          <a href="#about" className="text-gray-400 hover:text-white transition-colors">
            <span className="block mb-2 text-sm">Scroll Down</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <div className="container mx-auto px-4">
      <SectionTitle title="About Me" subtitle="Get to know me better" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
        <div className="relative animate-fadeIn">
          <div className="aspect-square rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-green-500/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl font-bold text-white/10">P</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        </div>
        
        <div className="animate-fadeIn animation-delay-300">
          <h3 className="text-2xl font-bold mb-4 text-white">Frontend Developer & UI/UX Enthusiast</h3>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            I'm Peter, a passionate web developer with a keen eye for design and user experience. With over 5 years of experience in the industry, I specialize in creating modern, responsive, and interactive web applications.
          </p>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            My journey in web development started when I was fascinated by how websites work behind the scenes. Since then, I've been continuously learning and adapting to the ever-evolving web technologies to deliver the best possible solutions.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                5+ Years Experience
              </p>
            </div>
            <div>
              <p className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                50+ Projects
              </p>
            </div>
            <div>
              <p className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Always Learning
              </p>
            </div>
            <div>
              <p className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Attention to Detail
              </p>
            </div>
          </div>
          
          <a href="#contact" className="btn-outline">
            Get In Touch
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const skills = [
    { 
      category: 'Frontend', 
      items: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'SASS'] 
    },
    { 
      category: 'Backend', 
      items: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel', 'RESTful APIs', 'GraphQL'] 
    },
    { 
      category: 'Tools & Others', 
      items: ['Git', 'Webpack', 'Docker', 'CI/CD', 'Figma', 'Adobe XD', 'Jest', 'PWA'] 
    },
  ];
  
  return (
    <div className="container mx-auto px-4">
      <SectionTitle title="Skills & Expertise" subtitle="What I work with" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-600 text-center">{skill.category}</h3>
            
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {skill.items.map((item, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-full text-sm bg-gray-600 hover:bg-gray-500 transition-colors duration-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-6">My Development Process</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <ProcessCard 
            number="01" 
            title="Plan" 
            description="Understand requirements and plan the architecture."
            color="blue"
          />
          <ProcessCard 
            number="02" 
            title="Design" 
            description="Create wireframes and design the user interface."
            color="purple"
          />
          <ProcessCard 
            number="03" 
            title="Develop" 
            description="Implement the design with clean, maintainable code."
            color="green"
          />
          <ProcessCard 
            number="04" 
            title="Deploy" 
            description="Test thoroughly and deploy to production environment."
            color="yellow"
          />
        </div>
      </div>
    </div>
  );
};

// Process Card Component
const ProcessCard = ({ number, title, description, color }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-700',
    purple: 'from-purple-500 to-purple-700',
    green: 'from-green-500 to-green-700',
    yellow: 'from-yellow-500 to-yellow-700',
  };
  
  return (
    <div className="bg-gray-700 rounded-xl p-6 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${colors[color]} rounded-bl-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
        <span className="text-lg font-bold text-white">{number}</span>
      </div>
      
      <h4 className="text-xl font-bold mb-3 mt-8">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const projects = [
    {
      title: 'AI News Portal',
      description: 'A modern news portal for artificial intelligence updates with real-time data integration.',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: '/ainews',
      color: 'blue'
    },
    {
      title: 'Advanced Calculator',
      description: 'Interactive calculator with scientific functions and history tracking.',
      tech: ['JavaScript', 'HTML5', 'CSS3'],
      link: '/kalkulator',
      color: 'purple'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured online shopping platform with payment integration and admin dashboard.',
      tech: ['React', 'Redux', 'Firebase'],
      link: '#',
      color: 'green'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and notifications.',
      tech: ['Vue.js', 'Express', 'Socket.io'],
      link: '#',
      color: 'amber'
    },
  ];
  
  return (
    <div className="container mx-auto px-4">
      <SectionTitle title="Featured Projects" subtitle="Some of my works" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <a href="#" className="btn-outline">
          View All Projects
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-700 shadow-blue-500/20',
    purple: 'from-purple-500 to-purple-700 shadow-purple-500/20',
    green: 'from-green-500 to-green-700 shadow-green-500/20',
    amber: 'from-amber-500 to-amber-700 shadow-amber-500/20',
  };
  
  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`h-2 bg-gradient-to-r ${colors[project.color]}`}></div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300">
              {tech}
            </span>
          ))}
        </div>
        
        <Link to={project.link} className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300">
          View Project
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// Contact Section Component
const ContactSection = () => {
  return (
    <div className="container mx-auto px-4">
      <SectionTitle title="Get In Touch" subtitle="Let's work together" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div className="animate-fadeIn">
          <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
          
          <p className="text-gray-300 mb-6">
            I'm interested in freelance opportunities – especially ambitious or large projects. However, if you have other requests or questions, don't hesitate to contact me.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Mail</p>
                <p className="text-white">peter@example.com</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Call</p>
                <p className="text-white">+1 (123) 456-7890</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex space-x-4">
            <a href="#" className="social-link bg-[#1DA1F2]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="social-link bg-[#4267B2]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="social-link bg-[#E4405F]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
            <a href="#" className="social-link bg-[#0A66C2]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="social-link bg-[#181717]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-xl p-6 shadow-lg animate-fadeIn animation-delay-300">
          <h3 className="text-xl font-bold mb-4">Send me a message</h3>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Subject"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full btn-primary"
            >
              Send Message
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-8 h-8 mr-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"></div>
              <div className="absolute inset-1 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">P</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white">Peter</span>
          </div>
          
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Peter. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Floating Navigation Component
const FloatingNavigation = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-full p-3 flex flex-col items-center space-y-2">
        <a 
          href="#hero" 
          className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors duration-300 tooltip"
          data-tooltip="Top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
        
        <Link 
          to="/ainews" 
          className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center transition-colors duration-300 tooltip"
          data-tooltip="AI News"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </Link>
        
        <Link 
          to="/kalkulator" 
          className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors duration-300 tooltip"
          data-tooltip="Calculator"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// Section Title Component
const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12 animate-fadeIn">
      <h4 className="text-lg text-blue-400 mb-2">{subtitle}</h4>
      <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
        {title}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></span>
      </h2>
    </div>
  );
};

// Add custom styles to the document
const CustomStyles = () => {
  // Add these styles to the document head
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(10px, -10px) rotate(5deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
      
      @keyframes float-delay {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(-10px, 10px) rotate(-5deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
      
      @keyframes float-delay-long {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(15px, 15px) rotate(10deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
      
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes type-clean {
        0% { width: 0; }
        99.9% { border-right: 0.15em solid; }
        100% { width: 100%; }
      }
      
      @keyframes cursor {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes spin-slow {
        to { transform: rotate(360deg); }
      }
      
      @keyframes spin-slower {
        to { transform: rotate(-360deg); }
      }
      
      /* Custom Utility Classes */
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-float-delay {
        animation: float-delay 8s ease-in-out infinite;
      }
      
      .animate-float-delay-long {
        animation: float-delay-long 10s ease-in-out infinite;
      }
      
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 6s ease infinite;
      }
      
      .animate-type-clean {
        width: 100%;
        animation: type-clean 3s steps(40, end) 1s 1 normal both;
      }
      
      .animate-cursor {
        animation: cursor 0.75s step-end infinite;
      }
      
      .animate-fadeIn {
        animation: fadeIn 1s ease-in-out forwards;
      }
      
      .animation-delay-300 {
        animation-delay: 300ms;
      }
      
      .animate-spin-slow {
        animation: spin-slow 8s linear infinite;
      }
      
      .animate-spin-slower {
        animation: spin-slower 12s linear infinite;
      }
      
      /* Button Styles */
      .btn-primary {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(to right, #3b82f6, #8b5cf6);
        color: white;
        font-weight: 500;
        border-radius: 9999px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        z-index: 1;
      }
      
      .btn-primary:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background: linear-gradient(to right, #8b5cf6, #3b82f6);
        transition: all 0.3s ease;
        z-index: -1;
      }
      
      .btn-primary:hover:before {
        width: 100%;
      }
      
      .btn-primary:hover {
        box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        transform: translateY(-2px);
      }
      
      .btn-secondary {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        font-weight: 500;
        border-radius: 9999px;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .btn-secondary:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }
      
      .btn-outline {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        background-color: transparent;
        color: white;
        font-weight: 500;
        border-radius: 9999px;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
      
      .btn-outline:hover {
        border-color: #3b82f6;
        color: #3b82f6;
        transform: translateY(-2px);
      }
      
      /* Social Link */
      .social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 9999px;
        color: white;
        transition: all 0.3s ease;
      }
      
      .social-link:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
      }
      
      /* Tooltip */
      .tooltip {
        position: relative;
      }
      
      .tooltip:after {
        content: attr(data-tooltip);
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 10px;
        white-space: nowrap;
        padding: 0.25rem 0.5rem;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 0.75rem;
        border-radius: 0.25rem;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
      }
      
      .tooltip:hover:after {
        opacity: 1;
        margin-right: 15px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

const HomeWithStyles = () => {
  return (
    <>
      <CustomStyles />
      <Home />
    </>
  );
};

export default HomeWithStyles;