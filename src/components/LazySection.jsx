import { useRef, useEffect, useState } from 'react'
import { useLazyLoading } from '../hooks/useLazyLoading'

const LazySection = ({ 
  children, 
  className = '', 
  threshold = 0.1, 
  rootMargin = '100px',
  fallback = null,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { elementRef, isInView } = useLazyLoading({ 
    threshold, 
    rootMargin, 
    triggerOnce: true 
  })

  useEffect(() => {
    if (isInView && !isLoaded) {
      // Add a small delay to ensure smooth loading
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, isLoaded])

  return (
    <div 
      ref={elementRef} 
      className={`lazy-section ${className}`}
      {...props}
    >
      {isLoaded ? children : (fallback || (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-2"></div>
            <span className="text-sm text-gray-500">Loading content...</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LazySection
