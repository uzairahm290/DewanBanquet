import { useState, useEffect, useRef, useCallback } from 'react'

// Enhanced lazy loading hook with intersection observer
export const useLazyLoading = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    immediate = false
  } = options

  const [isInView, setIsInView] = useState(immediate)
  const [hasTriggered, setHasTriggered] = useState(immediate)
  const elementRef = useRef(null)

  const handleIntersection = useCallback((entries) => {
    const [entry] = entries
    if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
      setIsInView(true)
      setHasTriggered(true)
    }
  }, [triggerOnce, hasTriggered])

  useEffect(() => {
    if (immediate) {
      setIsInView(true)
      setHasTriggered(true)
      return
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    })

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [handleIntersection, threshold, rootMargin, immediate])

  return { elementRef, isInView, hasTriggered }
}

// Hook for lazy loading images with progressive enhancement
export const useLazyImage = (src, options = {}) => {
  const {
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
    ...lazyOptions
  } = options

  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const { elementRef, isInView } = useLazyLoading(lazyOptions)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    setIsError(false)
  }, [])

  const handleError = useCallback(() => {
    setIsError(true)
    setIsLoaded(false)
  }, [])

  return {
    elementRef,
    isInView,
    isLoaded,
    isError,
    handleLoad,
    handleError,
    placeholder
  }
}

// Hook for lazy loading components
export const useLazyComponent = (importFunc, options = {}) => {
  const {
    retries = 3,
    retryDelay = 1000,
    ...lazyOptions
  } = options

  const [Component, setComponent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { elementRef, isInView } = useLazyLoading(lazyOptions)

  useEffect(() => {
    if (!isInView || Component) return

    const loadComponent = async (attempt = 1) => {
      setIsLoading(true)
      setError(null)

      try {
        const module = await importFunc()
        setComponent(() => module.default)
        setIsLoading(false)
      } catch (err) {
        if (attempt < retries) {
          console.warn(`Component loading attempt ${attempt} failed, retrying...`, err)
          setTimeout(() => loadComponent(attempt + 1), retryDelay * attempt)
        } else {
          setError(err)
          setIsLoading(false)
        }
      }
    }

    loadComponent()
  }, [isInView, Component, importFunc, retries, retryDelay])

  return {
    elementRef,
    Component,
    isLoading,
    error,
    isInView
  }
}
