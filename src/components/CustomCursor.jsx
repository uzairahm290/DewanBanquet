import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 'ontouchstart' in window
      setIsMobile(isMobileDevice)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Hover handlers
    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Animation loop
    const animate = () => {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      
      // Faster dot movement
      dotX += (mouseX - dotX) * 0.3
      dotY += (mouseY - dotY) * 0.3

      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      
      cursorDot.style.left = dotX + 'px'
      cursorDot.style.top = dotY + 'px'

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isMobile])

  // Don't render custom cursor on mobile
  if (isMobile) return null

  return (
    <>
      {/* Custom Cursor - Outer Circle */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-[9999] transition-all duration-300 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className={`w-full h-full rounded-full border-2 bg-transparent transition-all duration-300 ease-out ${
            isHovering 
              ? 'border-[#d4af37] scale-150 shadow-lg shadow-[#d4af37]/30' 
              : 'border-gray-800 scale-100'
          }`}
        />
      </div>

      {/* Custom Cursor - Inner Dot */}
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className={`w-full h-full rounded-full transition-all duration-200 ease-out ${
            isHovering 
              ? 'bg-[#d4af37] scale-200 shadow-lg shadow-[#d4af37]/50' 
              : 'bg-gray-400 scale-100'
          }`}
        />
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        /* Show default cursor for text inputs */
        input[type="text"], 
        input[type="email"], 
        input[type="password"], 
        textarea {
          cursor: text !important;
        }
        
        /* Hide custom cursor on mobile and touch devices */
        @media (max-width: 768px), (hover: none) {
          * {
            cursor: auto !important;
          }
          
          body {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor
