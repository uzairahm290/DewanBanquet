import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ErrorPage from './components/ErrorPage'
import HomePage from './components/HomePage'
import GalleryPage from './components/GalleryPage'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'

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
      <Routes>
        <Route path="/" element={<HomePage shouldAnimate={!isLoading} />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ScrollToTop />
      <CustomCursor />
    </Router>
  )
}

export default App
