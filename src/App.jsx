import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import PerformanceMonitor from './components/PerformanceMonitor'

// Enhanced lazy loading with retry mechanism and better error handling
const lazyWithRetry = (importFunc, retries = 3) => {
  return lazy(() => {
    return new Promise((resolve, reject) => {
      const attemptImport = (attempt) => {
        importFunc()
          .then(resolve)
          .catch((error) => {
            if (attempt < retries) {
              console.warn(`Lazy loading attempt ${attempt} failed, retrying...`, error)
              setTimeout(() => attemptImport(attempt + 1), 1000 * attempt)
            } else {
              reject(error)
            }
          })
      }
      attemptImport(1)
    })
  })
}

// Lazy load pages for better performance with retry mechanism
const HomePage = lazyWithRetry(() => import('./components/HomePage'))
const GalleryPage = lazyWithRetry(() => import('./components/GalleryPage'))
const ServicesPage = lazyWithRetry(() => import('./components/ServicesPage'))
const ErrorPage = lazyWithRetry(() => import('./components/ErrorPage'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  // Handle preloader completion
  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <Router>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#d4af37]/20 border-t-[#d4af37] mx-auto mb-4"></div>
              <div className="absolute inset-0 animate-pulse">
                <div className="rounded-full h-16 w-16 bg-[#d4af37]/10 mx-auto"></div>
              </div>
            </div>
            <p className="text-white/80 text-lg font-medium">Loading...</p>
            <p className="text-white/60 text-sm mt-2">Preparing your experience</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage shouldAnimate={!isLoading} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<ServicesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <ScrollToTop />
      <CustomCursor />
      <PerformanceMonitor enabled={process.env.NODE_ENV === 'development'} />
    </Router>
  )
}

export default App
