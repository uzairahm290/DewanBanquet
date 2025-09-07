import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

// Import local images
import img1 from '../assets/Images/interior1.jpg'
import img2 from '../assets/Images/interior2.jpg'
import img3 from '../assets/Images/interior3.jpg'
import img4 from '../assets/Images/wedding1.png'
import img5 from '../assets/Images/wedding2.png'
import img6 from '../assets/Images/interior4.jpg'
import img7 from '../assets/Images/wedding3.png'
import img8 from '../assets/Images/interior5.jpg'

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
      alt: "Elegant Venue Space",
      category: "Interior"
    },
    {
      src: img3,
      alt: "Luxury Banquet Hall",
      category: "Interior"
    },
    {
      src: img4,
      alt: "Beautiful Wedding Ceremony",
      category: "Wedding"
    },
    {
      src: img5,
      alt: "Elegant Wedding Reception",
      category: "Wedding"
    },
    {
      src: img6,
      alt: "Grand Hall Interior",
      category: "Interior"
    },
    {
      src: img7,
      alt: "Special Wedding Celebration",
      category: "Wedding"
    },
    {
      src: img8,
      alt: "Modern Banquet Space",
      category: "Interior"
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

        {/* Uniform Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onMouseEnter={() => handleImageHover(index, true)}
              onMouseLeave={() => handleImageHover(index, false)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square">
                <img
                  ref={el => imagesRef.current[index] = el}
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
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
