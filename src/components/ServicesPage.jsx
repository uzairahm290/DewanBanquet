import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './Navigation'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import CustomCursor from './CustomCursor'
import OptimizedImage from './OptimizedImage'
import logo from '../assets/Images/logo.png'
import heroImage from '../assets/Images/hero.png'
import wedding1 from '../assets/Images/wedding1.png'
import wedding2 from '../assets/Images/wedding2.png'
import wedding3 from '../assets/Images/wedding3.png'
import wedding4 from '../assets/Images/wedding4.png'
import wedding5 from '../assets/Images/wedding5.png'
import corporate1 from '../assets/Images/coporate1.png'

gsap.registerPlugin(ScrollTrigger)

const ServicesPage = () => {
  const servicesRef = useRef(null)
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const welcomeRef = useRef(null)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const taglineRef = useRef(null)
  const sinceRef = useRef(null)
  const starsRef = useRef(null)
  const frameRef = useRef(null)
  const backgroundRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Carousel images array
  const carouselImages = [
    heroImage,
    wedding1,
    wedding2,
    wedding3,
    wedding4,
    wedding5,
    corporate1
  ]

  // Auto-rotate carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 2500) // Change image every 2.5 seconds

    return () => clearInterval(interval)
  }, [carouselImages.length])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Animate background image - "turning on the lights" effect
    tl.fromTo(backgroundRef.current,
      { 
        opacity: 0,
        filter: 'brightness(0) contrast(0.8)'
      },
      { 
        opacity: 1,
        filter: 'brightness(1) contrast(1)',
        duration: 1.5,
        ease: "power3.inOut"
      },
      0
    )

    // Animate top lines with center-out effect
    tl.fromTo(".top-left-line",
      { 
        scaleX: 0, 
        opacity: 0, 
        transformOrigin: "right center" 
      },
      { 
        scaleX: 1, 
        opacity: 1,
        duration: 2.5, 
        ease: "power2.out"
      },
      0.5
    )

    tl.fromTo(".top-right-line",
      { 
        scaleX: 0, 
        opacity: 0, 
        transformOrigin: "left center" 
      },
      { 
        scaleX: 1, 
        opacity: 1, 
        duration: 2.5, 
        ease: "power2.out" 
      },
      0.5
    )

    // Animate vertical lines with staggered timing
    tl.fromTo(".left-line",
      { 
        scaleY: 0, 
        opacity: 0, 
        transformOrigin: "center top" 
      },
      { 
        scaleY: 1, 
        opacity: 1, 
        duration: 2.5, 
        ease: "power2.out" 
      },
      0.8
    )

    tl.fromTo(".right-line",
      { 
        scaleY: 0, 
        opacity: 0, 
        transformOrigin: "center bottom" 
      },
      { 
        scaleY: 1, 
        opacity: 1, 
        duration: 2.5, 
        ease: "power2.out" 
      },
      0.8
    )

    // Animate bottom lines with center-out effect and smooth timing
    tl.fromTo(".bottom-left-line",
      { 
        scaleX: 0, 
        opacity: 0, 
        transformOrigin: "left center" 
      },
      { 
        scaleX: 1, 
        opacity: 1, 
        duration: 2.5, 
        ease: "power2.out" 
      },
      1.1
    )

    tl.fromTo(".bottom-right-line",
      { 
        scaleX: 0, 
        opacity: 0, 
        transformOrigin: "right center" 
      },
      { 
        scaleX: 1, 
        opacity: 1, 
        duration: 2.5, 
        ease: "power2.out" 
      },
      1.1
    )

    // Animate text elements - start early with border lines
    tl.fromTo(welcomeRef.current,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 0.9, 
        duration: 0.8, 
        ease: "power3.out" 
      },
      1.0
    )

    tl.fromTo(headingRef.current,
      { 
        y: 50, 
        opacity: 0, 
        scale: 0.8 
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.0, 
        ease: "power3.out" 
      },
      1.3
    )

    tl.fromTo(subtitleRef.current,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 0.95, 
        duration: 0.8, 
        ease: "power3.out" 
      },
      1.7
    )

    tl.fromTo(taglineRef.current,
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 0.9, 
        duration: 0.6, 
        ease: "power3.out" 
      },
      2.0
    )

    tl.fromTo(sinceRef.current,
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 0.7, 
        duration: 0.6, 
        ease: "power3.out" 
      },
      2.3
    )

    tl.fromTo(starsRef.current,
      { 
        scale: 0, 
        opacity: 0 
      },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        ease: "back.out(1.7)" 
      },
      2.5
    )

    // Simple scrolling animations for all event sections
    gsap.utils.toArray(".service-section").forEach((section, index) => {
      gsap.fromTo(section,
      { 
        y: 100, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
          start: "top 80%",
          end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Scroll-triggered animations for event content
    gsap.fromTo(".service-content",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.0, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-content",
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Star component for rating display
  const Star = ({ filled = true }) => (
    <svg 
      className={`w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 ${filled ? 'text-[#d4af37]' : 'text-gray-400'}`} 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  const events = [
    {
      number: "01",
      title: "WEDDINGS",
      description: "One of the most special moments for any person is their wedding day. We know how much pressure and stress this may bring for some couples. Therefore, we have come up with the best processes and perfected our system in order to make this process easy and enjoyable. Let us guide you through all of your choices and give you advice along the way. Some of the most unique and unforgettable weddings have taken place at Dewaan Banquet.",
      image: "/src/assets/Images/wedding1.png"
    },
    {
      number: "02", 
      title: "RECEPTIONS",
      description: "Host grand receptions in our luxurious halls with state-of-the-art sound systems, elegant lighting, and world-class catering facilities. Our spacious reception areas can accommodate intimate gatherings or grand celebrations, ensuring every guest experiences the magic of your special day.",
      image: "/src/assets/Images/wedding2.png"
    },
    {
      number: "03",
      title: "CORPORATE EVENTS", 
      description: "Professional business events, conferences, and corporate gatherings with modern facilities and technical support. Our versatile spaces are perfect for board meetings, product launches, annual conferences, and team building events with all the amenities your business needs.",
      image: "/src/assets/Images/interior10.jpg"
    },
    {
      number: "04",
      title: "BIRTHDAY PARTIES",
      description: "Celebrate special birthdays with themed decorations, entertainment options, and personalized party planning. From milestone birthdays to children's parties, we create magical experiences that make every birthday celebration unforgettable and unique.",
      image: "/src/assets/Images/wedding3.png"
    },
    {
      number: "05",
      title: "ANNIVERSARIES",
      description: "Mark milestone anniversaries with romantic settings, elegant dining, and memorable experiences. Whether it's your 25th, 50th, or any special anniversary, we create intimate and romantic atmospheres that celebrate your love story in the most beautiful way.",
      image: "/src/assets/Images/wedding4.png"
    },
    {
      number: "06", 
      title: "CULTURAL EVENTS",
      description: "Traditional cultural celebrations with authentic decor, traditional cuisine, and cultural entertainment. We honor and celebrate diverse cultural traditions with respect and authenticity, creating meaningful experiences that connect communities and preserve heritage.",
      image: "/src/assets/Images/wedding5.png"
    }
  ]

  return (
    <div className="bg-white text-gray-900">
      <Navigation />
      <CustomCursor />
      
      {/* Hero Section - Exact same as main Hero */}
      <section 
        id="services-hero"
        className="relative h-screen min-h-[600px] w-full overflow-hidden"
      >
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-white">
          <img
            ref={backgroundRef}
            src={carouselImages[currentImageIndex]}
            alt="Event showcase"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
            style={{ filter: 'brightness(0)' }}
          />
        </div>


        {/* Main Content Container */}
        <div className="absolute inset-0 z-10 flex items-center justify-center w-full px-6 sm:px-6 md:px-8 border-0 outline-none" style={{ border: 'none', outline: 'none' }}>
          {/* Small Border Lines */}
          <div 
            ref={frameRef}
            className="relative bg-transparent py-10 sm:py-6 md:py-8 px-4 sm:px-4 md:px-6 w-full max-w-4xl flex flex-col justify-center border-0 outline-none"
            style={{ border: 'none', outline: 'none' }}
          >
            {/* Top Border Lines - Two separate lines with gap in center */}
            <div className="top-left-line absolute top-0 left-0 w-[38%] h-0.5 bg-[#d4af37] origin-left opacity-0 sm:w-[38%] md:w-[43%]"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
              <img 
                src={logo} 
                alt="Dewaan Banquet Logo" 
                className="h-12 w-auto sm:h-12 md:h-16"
              />
            </div>
            <div className="top-right-line absolute top-0 right-0 w-[38%] h-0.5 bg-[#d4af37] origin-right opacity-0 sm:w-[38%] md:w-[43%]"></div>
            
            {/* Main Content - Centered */}
            <div className="relative flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4 w-full px-2 sm:px-4">
              {/* Background overlay for better text visibility */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-lg -m-4 sm:mx-0.5 mx-0.5 md:mx-0.5"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 md:space-y-4 w-full px-2 sm:px-4">
                {/* Welcome Text */}
              <h2 
                ref={welcomeRef}
                className="text-white text-xs sm:text-sm md:text-base font-medium tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase opacity-0"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.2em',
                  fontWeight: '500'
                }}
              >
                OUR EVENTS
                </h2>
                
                {/* Main Heading */}
          <h1 
            ref={headingRef}
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tight opacity-0"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                    lineHeight: '0.9'
                  }}
                >
                  DEWAN
                </h1>
                
                {/* Subtitle */}
              <h3 
                ref={subtitleRef}
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-[0.15em] sm:tracking-[0.18em] md:tracking-[0.2em] uppercase opacity-0"
              >
                EVENTS
                </h3>
              
              </div>
            </div>

            {/* Right Border Line */}
            <div className="right-line absolute top-0 right-0 bottom-0 w-0.5 bg-[#d4af37] origin-top opacity-0"></div>
            
            {/* Bottom Border Lines - Two separate lines with gap in center */}
            <div className="bottom-left-line absolute bottom-0 left-0 h-0.5 w-[29%] bg-[#d4af37] origin-left opacity-0 sm:w-[29%] md:w-[34%]"></div>
            <div className="bottom-right-line absolute bottom-0 right-0 h-0.5 w-[29%] bg-[#d4af37] origin-right opacity-0 sm:w-[29%] md:w-[34%]"></div>
            
            {/* Moments Together in center of bottom border */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center">
              <h4 
                ref={sinceRef}
                className="text-[#d4af37] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] uppercase"
                style={{ 
                  fontFamily: 'Playfair, sans-serif',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  lineHeight: '1.2'
                }}
              >
                Moments Together
              </h4>
            </div>
            {/* Left Border Line */}
            <div className="left-line absolute top-0 left-0 bottom-0 w-0.5 bg-[#d4af37] origin-top opacity-0"></div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-[#d4af37] scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Events Sections - Full Screen Panels */}
{events.map((event, index) => (
        <section key={index} id={event.title.toLowerCase().replace(/\s+/g, '-')} className="service-section h-screen w-full bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
          <div className="service-content container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                {/* Left Column - Text Content */}
                <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center mb-6">
                    <span 
                    className="text-6xl sm:text-7xl font-bold text-gray-300 mr-4"
                      style={{ 
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: '700'
                      }}
                    >
                    {event.number}
                    </span>
                    <h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
                      style={{ 
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: '700'
                      }}
                    >
                    {event.title}
                    </h2>
                  </div>
                  
                <div className="relative bg-gradient-to-br from-gray-100/80 via-gray-50/60 to-gray-100/40 backdrop-blur-md border border-gray-200 rounded-2xl p-6 mb-6 shadow-2xl overflow-hidden">
                  {/* Luxury gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-[#d4af37]/5 rounded-2xl"></div>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/30 rounded-tr-lg"></div>
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/30 rounded-bl-lg"></div>
                  
                  <p className="relative text-gray-800 text-lg leading-relaxed font-light tracking-wide z-10"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '1.6',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {event.description}
                    </p>
                  </div>
                </div>
                
                {/* Right Column - Image */}
                <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="relative w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
        </section>
      ))}

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default ServicesPage
