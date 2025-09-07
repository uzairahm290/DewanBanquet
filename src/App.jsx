import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./components/HomePage'))
const GalleryPage = lazy(() => import('./components/GalleryPage'))
const ServicesPage = lazy(() => import('./components/ServicesPage'))
const ErrorPage = lazy(() => import('./components/ErrorPage'))

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
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>}>
        <Routes>
          <Route path="/" element={<HomePage shouldAnimate={!isLoading} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<ServicesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <ScrollToTop />
      <CustomCursor />
    </Router>
  )
}

export default App
