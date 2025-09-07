import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '../assets/Images/logo.png'

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null)
  const logoRef = useRef(null)
  const textRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline()

    // Initial logo entrance
    tl.fromTo(logoRef.current,
      {
        scale: 0.5,
        opacity: 0,
        rotationY: 0
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }
    )

    // Add text entrance
    tl.fromTo(textRef.current,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      },
      "-=0.3"
    )

    // Logo flip animation after 1 second
    tl.to(logoRef.current,
      {
        rotationY: 360,
        duration: 0.8,
        ease: "power2.inOut"
      },
      "+=1"
    )

    // Fade out entire preloader after flip
    tl.to(preloaderRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setIsVisible(false)
          if (onComplete) {
            onComplete()
          }
        }
      },
      "-=0.2"
    )

    // Cleanup function
    return () => {
      tl.kill()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center"
      style={{
        background: `
          linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%),
          radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)
        `
      }}
    >
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glowing Logo Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full blur-2xl opacity-20 scale-150"></div>
        
        {/* Main Logo */}
        <div 
          ref={logoRef}
          className="relative z-10 mb-6"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          <img
            src={logo}
            alt="Dewaan Banquet Logo"
            className="h-24 w-auto drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))'
            }}
          />
        </div>

        {/* Brand Text */}
        <div ref={textRef} className="text-center">
          <p className="text-white/70 text-sm font-light tracking-[0.2em] uppercase">
            Since 2023
          </p>
          <div className="mt-4 flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-3 h-3 text-[#d4af37]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Preloader
