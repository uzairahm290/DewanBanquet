import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

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
    if (!cursor) return

    // Mouse move handler
    const handleMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile])

  // Don't render custom cursor on mobile
  if (isMobile) return null

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-[9999]"
        style={{
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Outer circle */}
        <div 
          className="w-full h-full rounded-full border-2 border-gray-800 bg-transparent"
        />
        {/* Inner filled circle */}
        <div 
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gray-400"
          style={{
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }
        
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
