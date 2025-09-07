import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import logo from '../assets/Images/logo.png'

const ErrorPage = () => {
  const errorRef = useRef(null)
  const logoRef = useRef(null)
  const numberRef = useRef(null)
  const textRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Animate logo entrance
    tl.fromTo(logoRef.current,
      {
        scale: 0.5,
        opacity: 0,
        rotation: -10
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }
    )

    // Animate 404 number
    tl.fromTo(numberRef.current,
      {
        scale: 0,
        opacity: 0,
        y: 50
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.5"
    )

    // Animate text content
    tl.fromTo(textRef.current,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.3"
    )

    // Animate button
    tl.fromTo(buttonRef.current,
      {
        y: 20,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.2)"
      },
      "-=0.2"
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div 
      ref={errorRef}
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center px-4 relative overflow-hidden"
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

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mt-10">
        {/* Logo */}
        <div className="mb-1">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full blur-2xl opacity-30 scale-150"></div>
            <img
              ref={logoRef}
              src={logo}
              alt="Dewaan Banquet Logo"
              className="h-20 w-auto relative z-10 mx-auto"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))'
              }}
            />
          </div>
        </div>

        {/* 404 Number */}
        <div ref={numberRef} className="mb-6">
          <h1 className="text-[#d4af37] text-8xl sm:text-9xl font-bold font-serif tracking-tight" style={{
            fontFamily: 'Playfair Display, serif',
            textShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
            background: 'linear-gradient(45deg, #d4af37, #b8941f, #d4af37)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 3s ease-in-out infinite'
          }}>
            404
          </h1>
        </div>

        {/* Error Text */}
        <div ref={textRef} className="mb-8">
          <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-4 tracking-wide">
            Page Not Found
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            The page you're looking for seems to have vanished into the elegance of our banquet hall. 
            Let us guide you back to our luxurious venue.
          </p>
        </div>

        {/* Action Button */}
        <div ref={buttonRef} className="mb-8">
          <Link
            to="/"
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-[#d4af37] to-[#b8941f] hover:from-[#b8941f] hover:to-[#d4af37] text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            style={{
              boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)'
            }}
          >
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="text-white/50 text-sm">
          <p className="mb-2">Need assistance?</p>
          <p>Call us at <span className="text-[#d4af37] font-semibold">(+92) 334-6081111</span></p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}

export default ErrorPage
