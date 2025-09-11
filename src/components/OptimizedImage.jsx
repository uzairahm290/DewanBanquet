import { useState, useRef, useEffect, forwardRef, useCallback } from 'react'
import { useLazyImage } from '../hooks/useLazyLoading'

const OptimizedImage = forwardRef(({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
  loading = 'lazy',
  immediate = false,
  threshold = 0.1,
  rootMargin = '50px',
  onLoad,
  onError,
  ...props 
}, ref) => {
  const [imageError, setImageError] = useState(false)
  const { 
    elementRef, 
    isInView, 
    isLoaded, 
    isError, 
    handleLoad, 
    handleError 
  } = useLazyImage(src, { 
    placeholder, 
    immediate, 
    threshold, 
    rootMargin 
  })

  const handleImageLoad = useCallback((e) => {
    handleLoad()
    setImageError(false)
    onLoad?.(e)
  }, [handleLoad, onLoad])

  const handleImageError = useCallback((e) => {
    handleError()
    setImageError(true)
    onError?.(e)
  }, [handleError, onError])

  // Preload image for better performance
  useEffect(() => {
    if (isInView && src && !immediate) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        // Image is preloaded, ready to display
      }
      img.onerror = () => {
        setImageError(true)
      }
    }
  }, [isInView, src, immediate])

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && !immediate && !imageError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center"
          style={{ 
            backgroundImage: `url(${placeholder})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        >
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mb-2"></div>
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-xs">Failed to load</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && !imageError && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={immediate ? 'eager' : loading}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`transition-all duration-500 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${className}`}
          style={{
            willChange: 'opacity, transform'
          }}
          {...props}
        />
      )}
    </div>
  )
});

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage
