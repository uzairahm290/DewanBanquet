import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      
      setScrollProgress(scrollPercent)
      setIsVisible(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isVisible && containerRef.current) {
      // Simple entrance animation
      gsap.fromTo(containerRef.current, 
        { 
          opacity: 0, 
          y: 30
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        }
      )
    }
  }, [isVisible])

  const scrollToTop = () => {
    // Simple click animation
    gsap.to(textRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <div className="fixed right-8 bottom-8 z-50">
          <div
            ref={containerRef}
            onClick={scrollToTop}
            className="group cursor-pointer flex flex-col items-center space-y-3 hover:opacity-80 transition-opacity duration-300"
          >
            {/* Vertical progress bar */}
            <div 
              ref={barRef}
              className="w-0.5 h-12 bg-[#d4af37] relative overflow-hidden"
              style={{
                background: `linear-gradient(to top, #d4af37 ${scrollProgress}%, rgba(212, 175, 55, 0.3) ${scrollProgress}%)`
              }}
            >
              {/* Progress fill */}
              <div 
                className="absolute bottom-0 left-0 w-full bg-[#d4af37] transition-all duration-300"
                style={{
                  height: `${scrollProgress}%`
                }}
              ></div>
            </div>
            
            {/* Vertical text */}
            <div 
              ref={textRef}
              className="text-[#d4af37] font-bold text-xs leading-tight tracking-wider group-hover:text-white transition-colors duration-300"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed'
              }}
            >
              BACK TOP
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ScrollToTop
