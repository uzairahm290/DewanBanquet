import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

// Import local images
import img1 from '../assets/Images/IMG-20250905-WA0000.jpg'
import img2 from '../assets/Images/IMG-20250905-WA0001.jpg'
import img3 from '../assets/Images/IMG-20250905-WA0002.jpg'
import img4 from '../assets/Images/IMG-20250905-WA0003.jpg'
import img5 from '../assets/Images/IMG-20250905-WA0004.jpg'
import img6 from '../assets/Images/IMG-20250905-WA0005.jpg'
import img7 from '../assets/Images/IMG-20250905-WA0006.jpg'
import img8 from '../assets/Images/IMG-20250905-WA0008.jpg'
import img9 from '../assets/Images/IMG-20250905-WA0009.jpg'
import img10 from '../assets/Images/IMG-20250905-WA0010.jpg'
import img11 from '../assets/Images/IMG-20250905-WA0011.jpg'
import img12 from '../assets/Images/IMG-20250905-WA0012.jpg'
import img13 from '../assets/Images/IMG-20250905-WA0013.jpg'
import img14 from '../assets/Images/IMG-20250905-WA0014.jpg'
import img15 from '../assets/Images/IMG-20250905-WA0015.jpg'
import img16 from '../assets/Images/IMG-20250905-WA0016.jpg'

const Gallery = () => {
  const sectionRef = useRef(null)
  const imagesRef = useRef([])

  const galleryImages = [
    {
      src: img1,
      alt: "Dewaan Banquet Hall Interior",
      category: "Interior"
    },
    {
      src: img2,
      alt: "Elegant Wedding Setup",
      category: "Wedding"
    },
    {
      src: img3,
      alt: "Corporate Event Space",
      category: "Corporate"
    },
    {
      src: img4,
      alt: "Private Party Venue",
      category: "Private"
    },
    {
      src: img5,
      alt: "Special Occasion Hall",
      category: "Special"
    },
    {
      src: img6,
      alt: "Celebration Setup",
      category: "Celebration"
    },
    {
      src: img7,
      alt: "Elegant Dining Area",
      category: "Dining"
    },
    {
      src: img8,
      alt: "Luxury Banquet Hall",
      category: "Luxury"
    },
    {
      src: img9,
      alt: "Beautiful Event Space",
      category: "Events"
    },
    {
      src: img10,
      alt: "Grand Hall Interior",
      category: "Interior"
    },
    {
      src: img11,
      alt: "Wedding Reception Setup",
      category: "Wedding"
    },
    {
      src: img12,
      alt: "Corporate Meeting Space",
      category: "Corporate"
    },
    {
      src: img13,
      alt: "Private Celebration",
      category: "Private"
    },
    {
      src: img14,
      alt: "Special Event Hall",
      category: "Special"
    },
    {
      src: img15,
      alt: "Festive Celebration",
      category: "Celebration"
    },
    {
      src: img16,
      alt: "Fine Dining Experience",
      category: "Dining"
    }
  ]

  useEffect(() => {
    // Animate images with clip-path and scaling
    imagesRef.current.forEach((image, index) => {
      if (image) {
        gsap.fromTo(image,
          { 
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
            scale: 0.8,
            opacity: 0
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: image,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })
  }, [])

  const handleImageHover = (index, isHovering) => {
    const image = imagesRef.current[index]
    if (!image) return

    if (isHovering) {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      })
    } else {
      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  return (
    <section 
      id="gallery"
      ref={sectionRef}
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our beautiful venue and see the magic we create for every celebration.
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid mb-6 group cursor-pointer"
              onMouseEnter={() => handleImageHover(index, true)}
              onMouseLeave={() => handleImageHover(index, false)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  ref={el => imagesRef.current[index] = el}
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                />
                
                {/* Gold overlay on hover */}
                <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/20 transition-all duration-300"></div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                  {image.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-block bg-[#d4af37] text-white px-8 py-3 rounded-full hover:bg-[#b8941f] transition-colors duration-300 font-semibold"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Gallery
