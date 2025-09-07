import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/Images/logo.png'

const Footer = () => {
  const footerRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    // Animate footer sections on scroll
    gsap.fromTo(footerRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate each section with stagger
    gsap.fromTo(sectionRefs.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }, [])

  const navigationLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'WEDDINGS', href: '/events#weddings' },
    { name: 'BIRTHDAY', href: '/events#birthday-parties' },
    { name: 'CORPORATE EVENTS', href: '/events#corporate-events' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'ABOUT US', href: '#about' },
    { name: 'CONTACT', href: '#contact' }
  ]

  const eventTypes = [
    { name: 'WEDDINGS', href: '/events#weddings' },
    { name: 'BIRTHDAY', href: '/events#birthday-parties' },
    { name: 'RECEPTIONS', href: '/events#receptions' },
    { name: 'ANNIVERSARIES', href: '/events#anniversaries' },
    { name: 'CORPORATE EVENTS', href: '/events#corporate-events' }
  ]

  const socialLinks = [
    { name: 'TIKTOK', icon: 'tiktok', href: 'https://www.tiktok.com/@dewanbanquet' },
    { name: 'FACEBOOK', icon: 'facebook', href: 'https://facebook.com/DewanBanquet' }
  ]

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 sm:py-12 lg:py-6 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40L50 0Z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      {/* Floating Particles - Reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37]/20 rounded-full animate-pulse hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
              ))}
            </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full blur-lg opacity-30"></div>
              <img
                src={logo}
                alt="Dewaan Banquet Logo"
                className="h-12 sm:h-16 lg:h-20 w-auto relative z-10"
              />
            </div>
          </div>
          <div className="w-16 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 sm:mt-6"></div>
          </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {/* Mobile View - Two Columns */}
          <div className="sm:hidden col-span-1">
            <div className="grid grid-cols-2 gap-6">
              {/* Navigation Column */}
              <div ref={el => sectionRefs.current[0] = el} className="flex flex-col">
                <h3 className="text-[#d4af37] text-sm font-semibold mb-3 tracking-wider uppercase text-left">Navigation</h3>
                <ul className="space-y-2">
                  {navigationLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                        className="group flex items-center text-white/80 hover:text-[#d4af37] transition-all duration-300 text-xs font-medium uppercase tracking-wide"
                  >
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></div>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

              {/* Events Column */}
              <div ref={el => sectionRefs.current[1] = el} className="flex flex-col">
                <h3 className="text-[#d4af37] text-sm font-semibold mb-3 tracking-wider uppercase text-left">Events</h3>
                <ul className="space-y-2">
                  {eventTypes.map((event, index) => (
                    <li key={event.name}>
                      <a
                        href={event.href}
                        className="group flex items-center text-white/80 hover:text-[#d4af37] transition-all duration-300 text-xs font-medium uppercase tracking-wide"
                      >
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></div>
                        {event.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop View - Navigation Links */}
          <div ref={el => sectionRefs.current[0] = el} className="hidden sm:block sm:col-span-2 lg:col-span-1">
            <h3 className="text-[#d4af37] text-base sm:text-lg font-semibold mb-4 sm:mb-6 tracking-wider uppercase">Navigation</h3>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
              {navigationLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center text-white/80 hover:text-[#d4af37] transition-all duration-300 text-xs sm:text-sm font-medium uppercase tracking-wide"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#d4af37] rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                    {link.name}
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop View - Event Types */}
          <div ref={el => sectionRefs.current[1] = el} className="hidden sm:block sm:col-span-2 lg:col-span-1">
            <h3 className="text-[#d4af37] text-base sm:text-lg font-semibold mb-4 sm:mb-6 tracking-wider uppercase">Events</h3>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
              {eventTypes.map((event, index) => (
                <li key={event.name}>
                  <a
                    href={event.href}
                    className="group flex items-center text-white/80 hover:text-[#d4af37] transition-all duration-300 text-xs sm:text-sm font-medium uppercase tracking-wide"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#d4af37] rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                    {event.name}
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                  </a>
                </li>
              ))}
            </ul>
              </div>
              
          {/* Column 3 - Contact Information */}
          <div ref={el => sectionRefs.current[2] = el} className="relative sm:col-span-2 lg:col-span-1">
            <h3 className="text-[#d4af37] text-base sm:text-lg font-semibold mb-4 sm:mb-6 tracking-wider uppercase">Contact</h3>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/60 text-xs uppercase tracking-wider">Phone</p>
                  <a 
                    href="https://wa.me/923346081111?text=Hello! I'm interested in booking an event at Dewan Banquet Hall. Could you please provide me with more information about your services and availability?" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white font-medium text-sm sm:text-base hover:text-[#d4af37] transition-colors duration-300"
                  >
                    (+92) 334-6081111
                  </a>
                </div>
              </div>
              
              <div className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/60 text-xs uppercase tracking-wider">Email</p>
                  <p className="text-white font-medium text-xs sm:text-sm break-all">EVENTS@DEWAANBANQUETHALL.COM</p>
                </div>
              </div>
              
              <div className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/60 text-xs uppercase tracking-wider">Address</p>
                  <a 
                    href="https://maps.app.goo.gl/iqZJ83RBWX4ZxC186"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium text-xs sm:text-sm hover:text-[#d4af37] transition-colors duration-300"
                  >
                    Rajana Road Near Suzuki Showroom, Toba Tek Singh
                  </a>
              </div>
            </div>
          </div>
        </div>

          {/* Column 4 - Social Media Links */}
          <div ref={el => sectionRefs.current[3] = el} className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-[#d4af37] text-base sm:text-lg font-semibold mb-4 sm:mb-6 tracking-wider uppercase text-center sm:text-left">Follow Us</h3>
            
            {/* Mobile View - Icons Only */}
            <div className="sm:hidden flex justify-center space-x-4 mb-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  {social.icon === 'tiktok' && (
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  )}
                  {social.icon === 'facebook' && (
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* Desktop View - Full Links */}
            <ul className="hidden sm:block space-y-2 sm:space-y-3 lg:space-y-4">
              {socialLinks.map((social, index) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {social.icon === 'tiktok' && (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                      )}
                      {social.icon === 'facebook' && (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white/60 text-xs uppercase tracking-wider">{social.name}</p>
                      <p className="text-white font-medium text-xs sm:text-sm">Follow Us</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-white/60 text-xs sm:text-sm text-center sm:text-left">
              COPYRIGHT © 2025 DEWAAN BANQUET HALL.
            </p>
            
            <div className="flex flex-row justify-center sm:justify-end text-xs sm:text-sm">
              <a 
                href="https://www.linkedin.com/in/uzairahm290/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#d4af37] transition-colors duration-300 tracking-wide text-center sm:text-left flex items-center space-x-2"
              >
                <span>Designed by</span>
                <span className="font-semibold text-[#d4af37] hover:text-white">Uzair Ahmad</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
