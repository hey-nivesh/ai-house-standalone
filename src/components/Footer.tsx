import React from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const exploreLinks = [
    { title: "Home", href: "https://www.hidevs.xyz" },
    { title: "AI House", href: "https://www.aihouze.xyz" },
    { title: "About Us", href: "https://www.hidevs.xyz/aboutus" },
    { title: "City Lead", href: "https://www.hidevs.xyz/city-lead" },
  ];

  const legalLinks = [
    { title: "Terms & Conditions", href: "https://www.hidevs.xyz/terms" },
    { title: "Refund Policy", href: "https://www.hidevs.xyz/refund-policy" },
  ];

  const socialIcons = [
    { icon: Twitter, href: "https://x.com/dchawla1307", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/hidevs_community/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/hidevs-gen-ai-workforce/", label: "LinkedIn" },
  ];

  return (
    <footer className="relative w-full">
      {/* Main footer content */}
      <div 
        className="w-full pt-12 pb-6 px-6 md:px-12 lg:px-20 rounded-t-[40px] md:rounded-t-[60px] lg:rounded-t-[80px]"
        style={{
          background: "linear-gradient(135deg, #724e99 0%, #1a1a1a 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Logo Section - Centered */}
          <div className="text-center mb-8">
            <a 
              href="https://www.hidevs.xyz" 
              className="inline-block transition-transform hover:-translate-y-1"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                HiDevs
              </h3>
            </a>
            <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Empowering the next generation of developers with hands-on
              industry experience and AI-guided learning.
            </p>
          </div>

          {/* Navigation Links - Centered Row */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-8">
            {exploreLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm md:text-base font-medium hover:text-[#eadff5] transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#eadff5] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.title}
              </a>
            ))}
            {legalLinks.map((link, index) => (
              <a
                key={`legal-${index}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm md:text-base font-medium hover:text-[#eadff5] transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#eadff5] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Social Icons - Centered */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-white hover:text-[#724e99] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#724e99]/30"
              >
                <social.icon size={18} className="md:w-5 md:h-5" />
              </a>
            ))}
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-center text-white/80 text-xs md:text-sm">
              © {new Date().getFullYear()} HiDevs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
