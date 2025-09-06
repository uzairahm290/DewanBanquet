import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import logo from '../assets/Images/logo.png'

// Import all gallery images
import IMG1 from '../assets/Images/interior1.jpg'
import IMG2 from '../assets/Images/interior2.jpg'
import IMG3 from '../assets/Images/interior3.jpg'
import IMG4 from '../assets/Images/interior4.jpg'
import IMG5 from '../assets/Images/interior5.jpg'
import IMG6 from '../assets/Images/interior6.jpg'
import IMG7 from '../assets/Images/interior7.jpg'
import IMG8 from '../assets/Images/interior8.jpg'
import IMG9 from '../assets/Images/interior9.jpg'
import IMG10 from '../assets/Images/interior10.jpg'
import IMG11 from '../assets/Images/interior11.jpg'
import IMG12 from '../assets/Images/interior12.jpg'
import IMG13 from '../assets/Images/wedding1.png'
import IMG14 from '../assets/Images/wedding2.png'
import IMG15 from '../assets/Images/wedding3.png'
import IMG16 from '../assets/Images/wedding4.png'
import IMG17 from '../assets/Images/wedding5.png'


const GalleryPage = () => {
  const galleryRef = useRef(null)
  const headerRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('all')

  const galleryImages = [
    { id: 1, src: IMG1, alt: 'Dewaan Banquet Hall Interior View 1', category: 'interior' },
    { id: 2, src: IMG2, alt: 'Dewaan Banquet Hall Interior View 2', category: 'interior' },
    { id: 3, src: IMG3, alt: 'Dewaan Banquet Hall Interior View 3', category: 'interior' },
    { id: 4, src: IMG4, alt: 'Dewaan Banquet Hall Interior View 4', category: 'interior' },
    { id: 5, src: IMG5, alt: 'Dewaan Banquet Hall Interior View 5', category: 'interior' },
    { id: 6, src: IMG6, alt: 'Dewaan Banquet Hall Interior View 6', category: 'interior' },
    { id: 7, src: IMG7, alt: 'Dewaan Banquet Hall Interior View 7', category: 'interior' },
    { id: 8, src: IMG8, alt: 'Dewaan Banquet Hall Interior View 8', category: 'interior' },
    { id: 9, src: IMG9, alt: 'Dewaan Banquet Hall Interior View 9', category: 'interior' },
    { id: 10, src: IMG10, alt: 'Dewaan Banquet Hall Interior View 10', category: 'interior' },
    { id: 11, src: IMG11, alt: 'Dewaan Banquet Hall Interior View 11', category: 'interior' },
    { id: 12, src: IMG12, alt: 'Dewaan Banquet Hall Interior View 12', category: 'interior' },
    { id: 13, src: IMG13, alt: 'Beautiful Wedding Ceremony', category: 'wedding' },
    { id: 14, src: IMG14, alt: 'Elegant Wedding Reception', category: 'wedding' },
    { id: 15, src: IMG15, alt: 'Romantic Wedding Setup', category: 'wedding' },
    { id: 16, src: IMG16, alt: 'Luxury Wedding Celebration', category: 'wedding' },
    { id: 17, src: IMG17, alt: 'Luxury Mehndi Celebration', category: 'wedding' }

  ]

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Interior', value: 'interior' },
    { name: 'Weddings', value: 'wedding' },
    { name: 'Birthdays', value: 'birthday' },
    { name: 'Corporate', value: 'corporate' },
    { name: 'Setup', value: 'setup' }
  ]

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Create master timeline
    const tl = gsap.timeline()

    // Animate header elements with stagger
    tl.fromTo(headerRef.current.querySelector('img'),
      { scale: 0.5, opacity: 0, rotationY: -180 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "back.out(1.7)" }
    )
    .fromTo(headerRef.current.querySelector('h1'),
      { y: 50, opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
      { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(headerRef.current.querySelector('p'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(headerRef.current.querySelector('.w-24'),
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Animate filter buttons
    gsap.fromTo('.filter-button',
      { y: 20, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.2)",
        stagger: 0.1,
        delay: 0.5
      }
    )

    // Enhanced gallery items animation
    gsap.fromTo('.gallery-item',
      { 
        y: 80, 
        opacity: 0, 
        scale: 0.7,
        rotationY: 15,
        filter: 'blur(10px)'
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power3.out",
        stagger: {
          amount: 0.8,
          from: "start"
        },
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate gallery item images on hover
    gsap.set('.gallery-item img', { transformOrigin: 'center center' })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [filter])

  // Enhanced hover animations for gallery items
  const handleImageHover = (e, isHovering) => {
    const img = e.currentTarget.querySelector('img')
    const overlay = e.currentTarget.querySelector('.absolute')
    const zoomIcon = e.currentTarget.querySelector('.w-8')
    
    if (isHovering) {
      gsap.to(img, {
        scale: 1.15,
        rotation: 2,
        duration: 0.6,
        ease: "power2.out"
      })
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(zoomIcon, {
        scale: 1.2,
        rotation: 180,
        duration: 0.4,
        ease: "back.out(1.7)"
      })
    } else {
      gsap.to(img, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(zoomIcon, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out"
      })
    }
  }

  // Filter button click animation
  const handleFilterClick = (value) => {
    setFilter(value)
    
    // Animate filter buttons
    gsap.to('.filter-button', {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      stagger: 0.05,
      onComplete: () => {
        gsap.to('.filter-button', {
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.7)",
          stagger: 0.05
        })
      }
    })
  }

  // Modal animations
  const openModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
    
    // Animate modal entrance
    gsap.fromTo('.modal-backdrop',
      { opacity: 0, backdropFilter: 'blur(0px)' },
      { opacity: 1, backdropFilter: 'blur(10px)', duration: 0.3, ease: "power2.out" }
    )
    gsap.fromTo('.modal-content',
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
    )
  }

  const closeModal = () => {
    // Animate modal exit
    gsap.to('.modal-content', {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setSelectedImage(null)
        document.body.style.overflow = 'auto'
      }
    })
    gsap.to('.modal-backdrop', {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.3,
      ease: "power2.in"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Luxury Background Pattern */}
      <div className="fixed inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40L50 0Z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37]/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="pt-20 pb-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto text-center">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full blur-lg opacity-30"></div>
                <img
                  src={logo}
                  alt="Dewaan Banquet Logo"
                  className="h-16 sm:h-20 w-auto relative z-10"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-serif">
              <span className="text-white">OUR</span>{' '}
              <span className="text-[#d4af37]">GALLERY</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-8 font-serif">
              Discover the elegance and luxury of Dewaan Banquet Hall through our stunning collection of event memories
            </p>

            {/* Decorative Line */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleFilterClick(category.value)}
                className={`filter-button px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                  filter === category.value
                    ? 'bg-[#d4af37] text-black'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item group cursor-pointer"
                onClick={() => openModal(image)}
                onMouseEnter={(e) => handleImageHover(e, true)}
                onMouseLeave={(e) => handleImageHover(e, false)}
              >
                <div className="relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium capitalize">
                        {image.category} Event
                      </p>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center opacity-0">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-12">
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 uppercase tracking-wide"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="modal-content relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
              <p className="text-white text-lg font-medium capitalize">
                {selectedImage.category} Event
              </p>
              <p className="text-white/80 text-sm">
                Dewaan Banquet Hall
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
