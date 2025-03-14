import React from "react";
import { Link } from "react-router-dom";
import { Truck, Map, Clock, Phone, Mail, Github } from "lucide-react";

// Social links component
const SocialLink = ({ href, icon: Icon }) => (
  <a href={href} className="text-slate-300 hover:text-blue-400 transition-colors">
    <Icon size={20} />
  </a>
);

// Navigation link component
const NavLink = ({ to, icon: Icon, label }) => (
  <li>
    <Link to={to} className="text-slate-300 hover:text-white flex items-center">
      <Icon size={16} className="mr-2" />
      {label}
    </Link>
  </li>
);

// Contact info item component
const ContactItem = ({ icon: Icon, children }) => (
  <li className="flex items-start">
    <Icon size={16} className="mr-2 mt-1 flex-shrink-0" />
    <span className="text-slate-300">{children}</span>
  </li>
);

// Legal link component
const LegalLink = ({ to, label }) => (
  <Link to={to} className="hover:text-white transition-colors">
    {label}
  </Link>
);

const Footer = () => {
  // Navigation links data
  const navLinks = [
    { to: "/", icon: Map, label: "Dashboard" },
    { to: "/plan", icon: Truck, label: "Plan Trip" },
    { to: "/logs", icon: Clock, label: "ELD Logs" },
    { to: "/results", icon: Map, label: "Results" }
  ];

  // Social links data
  const socialLinks = [
    { href: "#mail", icon: Mail },
    { href: "#phone", icon: Phone }
  ];

  // Legal links data
  const legalLinks = [
    { to: "/terms", label: "Terms" },
    { to: "/privacy", label: "Privacy" },
    { to: "/cookies", label: "Cookies" }
  ];

  return (
    <footer className="bg-slate-900 text-white py-12 mt-8 w-full">
      <div className="w-full px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Truck className="mr-2" size={20} />
              Trip Planner
            </h2>
            <p className="text-slate-300 mb-4">
              Streamlining your journey with intelligent route planning and ELD compliance.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link, index) => (
                <SocialLink key={index} href={link.href} icon={link.icon} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <NavLink key={index} to={link.to} icon={link.icon} label={link.label} />
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <ContactItem icon={Mail}>support@tripplanner.com</ContactItem>
              <ContactItem icon={Phone}>(256) 782-4794</ContactItem>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8 max-w-7xl mx-auto"></div>

        {/* Copyright */}
        <div className="text-center text-slate-400 text-sm max-w-7xl mx-auto">
          <p>&copy; {new Date().getFullYear()} Trip Planner. All Rights Reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            {legalLinks.map((link, index) => (
              <LegalLink key={index} to={link.to} label={link.label} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;