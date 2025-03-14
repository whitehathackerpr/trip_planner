import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Desktop navigation link component
const DesktopNavLink = ({ to, label, scrolled, active, setActive }) => {
  return (
    <Link 
      to={to} 
      className="group relative py-2 font-medium"
      onClick={() => setActive(label)}
    >
      <span className={`relative z-10 transition-colors duration-300 ${
        scrolled 
          ? active ? "text-[#17153B]" : "text-[#2E236C] group-hover:text-[#17153B]" 
          : active ? "text-white" : "text-[#C8ACD6] group-hover:text-white"
      }`}>
        {label}
      </span>
      
      {/* Animated underline with dot */}
      <span className="absolute bottom-0 left-0 w-full h-0.5 flex items-center justify-center">
        <span className={`absolute h-0.5 transition-all duration-500 ease ${
          active 
            ? "w-full bg-[#C8ACD6]" 
            : "w-0 group-hover:w-full bg-[#C8ACD6]"
        }`}></span>
        
        <span className={`absolute w-1.5 h-1.5 rounded-full transform transition-all duration-300 ${
          active 
            ? "scale-100 bg-[#C8ACD6]" 
            : "scale-0 group-hover:scale-100 bg-[#C8ACD6]"
        }`}></span>
      </span>
      
      {/* Hover background effect */}
      <span className={`absolute inset-0 w-full h-full rounded-lg -z-10 transition-all duration-300 ease-out transform ${
        active 
          ? scrolled ? "bg-[#C8ACD6]/20" : "bg-white/10" 
          : "scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 " + 
            (scrolled ? "group-hover:bg-[#C8ACD6]/10" : "group-hover:bg-white/5")
      }`}></span>
    </Link>
  );
};

// Mobile navigation link component
const MobileNavLink = ({ to, label, onClick, active, setActive }) => {
  return (
    <Link 
      to={to} 
      className="block relative overflow-hidden transition-all duration-300"
      onClick={() => {
        setActive(label);
        onClick();
      }}
    >
      <span className={`absolute inset-y-0 left-0 w-1 transform transition-transform duration-300 ${
        active ? "translate-x-0 bg-[#2E236C]" : "-translate-x-full bg-[#C8ACD6]"
      }`}></span>
      
      <div className={`py-3 px-3 flex items-center transition-all duration-300 ${
        active ? "bg-[#C8ACD6]/10 text-[#17153B]" : "hover:bg-[#C8ACD6]/5 text-[#2E236C]"
      }`}>
        <span className={`inline-block transition-all duration-300 ${
          active ? "translate-x-2" : "group-hover:translate-x-2"
        }`}>{label}</span>
        
        <span className={`ml-auto transform transition-all duration-300 ${
          active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </span>
      </div>
    </Link>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/trip-planner", label: "Trip Planner" },
    { to: "/route-map", label: "Route Map" },
    { to: "/eld-logs", label: "ELD Logs" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full top-0 transition-all duration-500 z-50 ${
        scrolled 
          ? "bg-white text-[#17153B] shadow-lg py-2" 
          : "bg-gradient-to-r from-[#17153B] to-[#2E236C] text-white py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className={`transition-all duration-300 ${scrolled ? "text-[#2E236C]" : "text-white"}`}>
            {/* Truck and route icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transform transition-all duration-500 group-hover:scale-110"
            >
              <path d="M16 16V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1"></path>
              <path d="M20 17h1a1 1 0 0 0 1-1v-6h-4v7a1 1 0 0 0 1 1Z"></path>
              <path d="M9 17h6"></path>
              <circle cx="6" cy="17" r="2"></circle>
              <circle cx="18" cy="17" r="2"></circle>
              <path d="M3 5 L21 5" strokeDasharray="2 1"></path>
              <circle cx="8" cy="5" r="1" fill="currentColor"></circle>
              <circle cx="16" cy="5" r="1" fill="currentColor"></circle>
            </svg>
          </div>
          <h1 className="text-2xl tracking-tighter font-bold">
            <Link to="/" className="flex items-center">
              <span className="relative overflow-hidden font-medium uppercase tracking-wider text-lg">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  ELD
                </span>
                <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  ELD
                </span>
              </span>
              <span className="ml-2 font-semibold">Trip Planner</span>
            </Link>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <DesktopNavLink 
              key={item.label}
              to={item.to} 
              label={item.label} 
              scrolled={scrolled} 
              active={activeItem === item.label} 
              setActive={setActiveItem} 
            />
          ))}
          
          <button 
            className={`px-5 py-2 rounded-full transition-all duration-500 font-medium relative overflow-hidden group ${
              scrolled ? "text-white" : "text-[#17153B]"
            } uppercase tracking-wider text-sm font-bold`}
          >
            <span className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 ${
              scrolled ? "bg-[#2E236C]" : "bg-[#C8ACD6]"
            }`}></span>
            <span className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out transform translate-x-full group-hover:translate-x-0 ${
              scrolled ? "bg-[#17153B]" : "bg-white"
            }`}></span>
            <span className={`relative z-10 ${
              scrolled ? "text-white" : "text-[#17153B]"
            }`}>Plan Trip</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative w-6 h-6 focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`absolute block w-6 h-0.5 transform transition-all duration-300 ease-in-out ${
            scrolled ? "bg-[#17153B]" : "bg-white"
          } ${mobileMenuOpen ? "rotate-45 top-3" : "top-2"}`}></span>
          
          <span className={`absolute block w-6 h-0.5 transform transition-all duration-300 ease-in-out ${
            scrolled ? "bg-[#17153B]" : "bg-white"
          } ${mobileMenuOpen ? "opacity-0" : "opacity-100"} top-3`}></span>
          
          <span className={`absolute block w-6 h-0.5 transform transition-all duration-300 ease-in-out ${
            scrolled ? "bg-[#17153B]" : "bg-white"
          } ${mobileMenuOpen ? "-rotate-45 top-3" : "top-4"}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
        style={{
          clipPath: mobileMenuOpen 
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
            : "polygon(0 0, 100% 0, 100% 0, 0 0)"
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col space-y-1">
            {navItems.map(item => (
              <MobileNavLink 
                key={item.label}
                to={item.to} 
                label={item.label} 
                onClick={() => setMobileMenuOpen(false)} 
                active={activeItem === item.label} 
                setActive={setActiveItem} 
              />
            ))}
            
            <div className="pt-2 pb-1">
              <button className="relative w-full overflow-hidden rounded-md group">
                <span className="absolute inset-0 w-full h-full bg-[#C8ACD6] transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="absolute inset-0 w-full h-full bg-[#2E236C] transform skew-x-12 -translate-x-full delay-100 group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="block relative py-3 text-white bg-[#17153B] group-hover:bg-transparent transition-colors duration-500 z-10 uppercase tracking-widest text-sm font-bold">
                  Plan Trip
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


