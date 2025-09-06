import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '../assets/Images/logo.png'

const Navigation = () => {
  const navRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Animate navigation on load
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )

    // Initialize underline animation
    gsap.set(".phone-underline", { scaleX: 0, transformOrigin: "center center" })
  }, [])

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'VENUE', href: '#venue' },
    { name: 'MENU', href: '#menu' },
    { name: 'EVENTS', href: '#events' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'ABOUT US', href: '#about' },
    { name: 'CONTACT US', href: '#contact' }
  ]

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // Opening menu
      setIsMenuOpen(true)
      
      // Use setTimeout to ensure DOM is rendered before animation
      setTimeout(() => {
        // Set initial states first
        gsap.set(".mobile-menu-overlay", { x: "100%", opacity: 0 })
        gsap.set(".mobile-menu-content", { y: 50, opacity: 0 })
        gsap.set(".mobile-nav-link", { x: 30, opacity: 0 })
        gsap.set(".mobile-menu-header", { y: -30, opacity: 0 })
        gsap.set(".mobile-contact-info", { y: 30, opacity: 0 })
        
        // Create timeline for smooth coordinated animation
        const tl = gsap.timeline()
        
        // Animate menu sliding in from right
        tl.to(".mobile-menu-overlay", {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        })
        
        // Animate menu content
        tl.to(".mobile-menu-content", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.6")
        
        // Animate mobile header
        tl.to(".mobile-menu-header", {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4")
        
        // Animate navigation links with stagger
        tl.to(".mobile-nav-link", {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08
        }, "-=0.3")
        
        // Animate contact info
        tl.to(".mobile-contact-info", {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.2")
        
      }, 10) // Small delay to ensure DOM is ready
      
    } else {
      // Closing menu
      gsap.to(".mobile-menu-overlay", {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setIsMenuOpen(false)
      })
    }
  }

  const handlePhoneHover = () => {
    gsap.timeline()
      .to(".phone-number", { 
        scale: 1.05, 
        duration: 0.3, 
        ease: "power2.out" 
      })
      .to(".phone-underline", { 
        scaleX: 1, 
        duration: 0.5, 
        ease: "power3.out" 
      }, "-=0.2")
      .to(".phone-number svg", { 
        rotation: 10, 
        duration: 0.3, 
        ease: "back.out(1.7)" 
      }, "-=0.3")
  }

  const handlePhoneLeave = () => {
    gsap.timeline()
      .to(".phone-number", { 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      })
      .to(".phone-underline", { 
        scaleX: 0, 
        duration: 0.4, 
        ease: "power3.in" 
      }, "-=0.1")
      .to(".phone-number svg", { 
        rotation: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      }, "-=0.2")
  }

  const handleMenuHover = () => {
    gsap.timeline()
      .to(".menu-button", { 
        scale: 1.1, 
        rotation: 5, 
        duration: 0.3, 
        ease: "back.out(1.7)" 
      })
      .to("#menu-icon", { 
        fill: "#fbbf24", 
        scale: 1.1, 
        duration: 0.3, 
        ease: "power2.out" 
      }, "-=0.2")
      .to("#menu-icon path", { 
        strokeWidth: 3, 
        duration: 0.2, 
        ease: "power2.out" 
      }, "-=0.1")
  }

  const handleMenuLeave = () => {
    gsap.timeline()
      .to(".menu-button", { 
        scale: 1, 
        rotation: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      })
      .to("#menu-icon", { 
        fill: "none", 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      }, "-=0.2")
      .to("#menu-icon path", { 
        strokeWidth: 2, 
        duration: 0.2, 
        ease: "power2.out" 
      }, "-=0.1")
  }

  return (
    <>
    <nav 
      ref={navRef}
        className={`fixed top-0 z-50 w-full duration-300 ${
        isScrolled 
            ? 'bg-black/20 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
        style={{overflow: 'visible'}}
      >
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full blur-lg opacity-30"></div>
              <img 
                src={logo} 
                alt="Dewaan Banquet Logo" 
                className="h-12 w-auto relative z-10"
              />
            </div>
          </div>

          {/* Right Side - Phone Number and Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            {/* Phone Number - Hidden on small screens */}
            <div 
              className="phone-number hidden sm:flex items-center space-x-1 cursor-pointer relative flex-shrink-0"
              onMouseEnter={handlePhoneHover}
              onMouseLeave={handlePhoneLeave}
            >
              <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-white text-sm font-medium whitespace-nowrap">
                (818) 352-7748
              </span>
              {/* Animated Underline */}
              <div className="phone-underline absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400"></div>
            </div>

            {/* Vertical Divider - Hidden on small screens */}
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>

            {/* Hamburger Menu */}
            <button 
              className="menu-button w-8 h-8 sm:w-10 sm:h-10 border-2 border-white flex items-center justify-center flex-shrink-0 bg-black/30 hover:bg-black/50 transition-colors duration-300 relative z-50"
              onClick={toggleMenu}
              onMouseEnter={handleMenuHover}
              onMouseLeave={handleMenuLeave}
              style={{cursor: 'pointer'}}
            >
              <svg 
                id="menu-icon"
                className="w-4 h-4 sm:w-5 sm:h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      </nav>

      {/* Dewaan Banquet Theme Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay fixed inset-0 z-50 overflow-hidden" 
          style={{
            zIndex: 99999, 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            width: '100vw', 
            height: '100vh'
          }}
        >
          {/* Elegant Background with Venue Aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>

          {/* Main Menu Container - Split Layout */}
          <div className="mobile-menu-content relative z-10 h-full flex flex-col lg:flex-row">
            {/* Left Side - Branding & Contact (Desktop) / Header (Mobile) */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Mobile Header */}
              <div className="mobile-menu-header lg:hidden flex items-center justify-between p-6 border-b border-[#d4af37]/30">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center">
                    <img
                      src={logo}
                      alt="Dewaan Banquet Logo"
                      className="h-6 w-auto"
                    />
                  </div>
                  <div>
                    <h1 className="text-[#d4af37] text-lg font-bold font-serif">DEWAAN</h1>
                    <p className="text-white/70 text-xs font-light tracking-wider">BANQUET HALL</p>
                  </div>
                </div>
                <button
                  onClick={toggleMenu}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-[#d4af37]/30 hover:border-[#d4af37]/50 rounded-lg flex items-center justify-center transition-all duration-300 group backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 text-[#d4af37] group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Desktop Branding Section */}
              <div 
                className="hidden lg:flex flex-col justify-center items-center p-12 border-r border-[#d4af37]/30 relative"
                style={{
                  backgroundImage: `url('/src/assets/Images/hero.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black/70"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center mb-12">
                  <div className="rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
                    <img
                      src={logo}
                      alt="Dewaan Banquet Logo"
                      className="h-25 w-auto"
                    />
                  </div>
                  <p className="text-white/50 text-sm mt-2">SINCE 2018</p>
                </div>

                {/* Contact Information */}
                <div className="mobile-contact-info relative z-10 space-y-6 w-full max-w-sm">
                  <div className="flex items-center space-x-4 text-white/80">
                    <div className="w-12 h-12 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#d4af37] text-sm font-medium">Phone</p>
                      <p className="text-white text-base">(818) 352-7748</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-white/80">
                    <div className="w-12 h-12 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#d4af37] text-sm font-medium">Location</p>
                      <p className="text-white text-base">7179 Foothill Blvd, Tujunga, CA 91042</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-white/80">
                    <div className="w-12 h-12 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#d4af37] text-sm font-medium">Hours</p>
                      <p className="text-white text-base">9AM - 5PM (Tuesday - Sunday)</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="relative z-10 flex items-center space-x-4 mt-8">
                  <a href="#" className="w-12 h-12 bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/40 rounded-lg flex items-center justify-center transition-all duration-300 group backdrop-blur-sm">
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/40 rounded-lg flex items-center justify-center transition-all duration-300 group backdrop-blur-sm">
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/40 rounded-lg flex items-center justify-center transition-all duration-300 group backdrop-blur-sm">
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Navigation Links */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Desktop Close Button */}
              <div className="hidden lg:flex justify-end p-8">
                <button
                  onClick={toggleMenu}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-[#d4af37]/30 hover:border-[#d4af37]/50 rounded-lg flex items-center justify-center transition-all duration-300 group backdrop-blur-sm"
                >
                  <svg className="w-6 h-6 text-[#d4af37] group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

          {/* Navigation Links */}
              <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12">
                <div className="w-full max-w-sm space-y-2">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                      className="mobile-nav-link group block p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300 transform hover:scale-[1.01] rounded-md"
                      onClick={() => setIsMenuOpen(false)}
              >
                      <div className="flex items-center space-x-3">
                        {/* Elegant Diamond Icon */}
                        <div className="w-2 h-2 bg-[#d4af37] transform rotate-45 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="text-white text-sm font-medium group-hover:text-[#d4af37] transition-colors duration-300 font-serif uppercase tracking-wide">
                {item.name}
                        </span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
              </a>
            ))}
                </div>
          </div>

              {/* Mobile Contact Section */}
              <div className="lg:hidden p-6 border-t border-[#d4af37]/30">
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="flex items-center space-x-3 text-white/80">
                    <div className="w-8 h-8 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#d4af37] text-xs font-medium">Phone</p>
                      <p className="text-white text-sm">(818) 352-7748</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-white/80">
                    <div className="w-8 h-8 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#d4af37] text-xs font-medium">Location</p>
                      <p className="text-white text-sm">Tujunga, CA</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-white/80">
                    <div className="w-8 h-8 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#d4af37] text-xs font-medium">Hours</p>
                      <p className="text-white text-sm">9AM - 5PM</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Social Links */}
                <div className="flex items-center justify-center space-x-3">
                  <a href="#" className="w-10 h-10 bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/40 rounded-lg flex items-center justify-center transition-all duration-300 group backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/40 rounded-lg flex items-center justify-center transition-all duration-300 group backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/40 rounded-lg flex items-center justify-center transition-all duration-300 group backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
            </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
