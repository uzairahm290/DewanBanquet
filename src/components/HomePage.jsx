import { Suspense, lazy } from 'react'
import Navigation from './Navigation'
import Hero from './Hero'
import LazySection from './LazySection'

// Lazy load non-critical sections
const About = lazy(() => import('./About'))
const Services = lazy(() => import('./Services'))
const Gallery = lazy(() => import('./Gallery'))
const Testimonials = lazy(() => import('./Testimonials'))
const Footer = lazy(() => import('./Footer'))

const HomePage = ({ shouldAnimate }) => {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Hero shouldAnimate={shouldAnimate} />
      <Navigation />
      
      <LazySection threshold={0.2} rootMargin="200px">
        <Suspense fallback={
          <div className="min-h-[400px] flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading content...</p>
            </div>
          </div>
        }>
          <About />
        </Suspense>
      </LazySection>

      <LazySection threshold={0.2} rootMargin="200px">
        <Suspense fallback={
          <div className="min-h-[400px] flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading services...</p>
            </div>
          </div>
        }>
          <Services />
        </Suspense>
      </LazySection>

      <LazySection threshold={0.1} rootMargin="150px">
        <Suspense fallback={
          <div className="min-h-[400px] flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          </div>
        }>
          <Gallery />
        </Suspense>
      </LazySection>

      <LazySection threshold={0.2} rootMargin="200px">
        <Suspense fallback={
          <div className="min-h-[300px] flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          </div>
        }>
          <Testimonials />
        </Suspense>
      </LazySection>

      <LazySection threshold={0.1} rootMargin="100px">
        <Suspense fallback={
          <div className="min-h-[200px] flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-white/60 text-sm">Loading footer...</p>
            </div>
          </div>
        }>
          <Footer />
        </Suspense>
      </LazySection>
    </div>
  )
}

export default HomePage
