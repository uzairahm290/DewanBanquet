import { useState, useRef, useEffect, forwardRef } from 'react'

const OptimizedImage = forwardRef(({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  immediate = false,
  onLoad,
  onError,
  ...props 
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const imgRef = useRef(null)

  const handleImageLoad = (e) => {
    setIsLoaded(true)
    setIsError(false)
    onLoad?.(e)
  }

  const handleImageError = (e) => {
    setIsError(true)
    setIsLoaded(false)
    onError?.(e)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Simple loading state - only show for non-immediate images */}
      {!isLoaded && !immediate && !isError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-xs text-gray-500">Failed to load</span>
        </div>
      )}

      {/* Actual image */}
      <img
        ref={ref || imgRef}
        src={src}
        alt={alt}
        loading={immediate ? 'eager' : loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  )
});

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage
