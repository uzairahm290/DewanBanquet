import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '../assets/Images/logo.png'
import heroImage from '../assets/Images/hero.png'
import heroVideo from '../assets/Images/hero.mp4'

const Hero = ({ shouldAnimate = true }) => {
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
  const videoRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (!shouldAnimate) return

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
        duration: 3,
        ease: "power3.inOut"
      },
      0
    )

    // After 4.5 seconds, transition to video smoothly
    tl.call(() => {
      if (videoReady && videoRef.current) {
        setShowVideo(true)
        // Smooth crossfade transition
        gsap.to(backgroundRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        })
        gsap.fromTo(videoRef.current, {
          opacity: 0
        }, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut"
        })
      } else {
        // If video isn't ready, wait a bit more and try again
        setTimeout(() => {
          if (videoReady && videoRef.current) {
            setShowVideo(true)
            gsap.to(backgroundRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut"
            })
            gsap.fromTo(videoRef.current, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.8,
              ease: "power2.inOut"
            })
          }
        }, 1000) // Wait 1 more second
      }
    }, null, 4.5)

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
  }, [shouldAnimate])

  // Video preloading effect
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setVideoReady(true)
    }

    const handleLoadedData = () => {
      setVideoReady(true)
    }

    const handleError = () => {
      console.warn('Video failed to load, will keep showing image')
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    // Start preloading the video
    video.load()

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
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

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
    >
      {/* Background Image - Shows first */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <div 
          ref={backgroundRef}
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0)'
          }}
        />
      </div>

      {/* Background Video - Preloaded and ready for seamless transition */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover opacity-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            filter: 'brightness(1) contrast(1)',
            transition: 'opacity 0.8s ease-in-out'
          }}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
            <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] rounded-lg -m-4 sm:mx-0.5 mx-0.5 md:mx-0.5"></div>
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
              WELCOME TO
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
              BANQUET
            </h3>
            
            {/* Tagline */}
            <h4 
              ref={taglineRef}
              className="text-[#d4af37] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] opacity-0"
              style={{ 
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: '500',
                letterSpacing: '0.05em',
                lineHeight: '1.2'
              }}
            >
              Moments Together
            </h4>
            </div>
      </div>

          {/* Right Border Line */}
          <div className="right-line absolute top-0 right-0 bottom-0 w-0.5 bg-[#d4af37] origin-top opacity-0"></div>
          
          {/* Bottom Border Lines - Two separate lines with gap in center */}
          <div className="bottom-left-line absolute bottom-0 left-0 h-0.5 w-[38%] bg-[#d4af37] origin-left opacity-0 sm:w-[38%] md:w-[43%]"></div>
          <div className="bottom-right-line absolute bottom-0 right-0 h-0.5 w-[38%] bg-[#d4af37] origin-right opacity-0 sm:w-[38%] md:w-[43%]"></div>
          
          {/* Since 2023 and Stars in center of bottom border */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center">
            <h4 
              ref={sinceRef}
              className="text-white text-xs sm:text-sm md:text-base font-medium mt-4 sm:mt-5 md:mt-6 mb-1 tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] uppercase opacity-0"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                letterSpacing: '0.1em'
              }}
            >
              SINCE 2023
            </h4>
            
            <div 
              ref={starsRef}
              className="flex justify-center space-x-0.5 sm:space-x-0.1 opacity-0"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} filled={true} />
              ))}
            </div>
          </div>
          {/* Left Border Line */}
          <div className="left-line absolute top-0 left-0 bottom-0 w-0.5 bg-[#d4af37] origin-top opacity-0"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
