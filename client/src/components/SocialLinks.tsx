import React from 'react';
import { Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';

const SocialLinks: React.FC = () => {
  const socialLinks = [
    { 
      icon: Linkedin, 
      href: 'https://in.linkedin.com/in/ecron-technologies-811866353', 
      label: 'LinkedIn' 
    },
    { 
      icon: Facebook, 
      href: 'https://facebook.com/ecrontech', 
      label: 'Facebook' 
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/ecrontechnologies?igsh=ODdleXh6OHE2bXc5', 
      label: 'Instagram' 
    },
    { 
      icon: Youtube, 
      href: 'https://www.youtube.com/@ecrontechnologies_chennai', 
      label: 'YouTube' 
    }
  ];

  return (
    <div className="flex items-center gap-3">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purple-200 transition-colors p-1"
          aria-label={label}
        >
          <Icon size={14} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;