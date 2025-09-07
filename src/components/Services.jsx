import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

// Import local images for services
import weddingImg from '../assets/Images/wedding1.png'
import corporateImg from '../assets/Images/interior10.jpg'
import privateImg from '../assets/Images/wedding2.png'
import specialImg from '../assets/Images/wedding3.png'

const Services = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const services = [
    {
      title: "Weddings",
      description: "Create your perfect day with our elegant wedding packages. From intimate ceremonies to grand celebrations at Dewaan Banquet Hall.",
      image: weddingImg,
      link: "/events#weddings"
    },
    {
      title: "Corporate Events",
      description: "Professional venues for business meetings, conferences, and corporate celebrations with state-of-the-art facilities.",
      image: corporateImg,
      link: "/events#corporate-events"
    },
    {
      title: "Receptions",
      description: "Host grand receptions in our luxurious halls with state-of-the-art sound systems, elegant lighting, and world-class catering facilities.",
      image: privateImg,
      link: "/events#receptions"
    },
    {
      title: "Special Occasions",
      description: "Birthdays, anniversaries, and milestone celebrations made memorable with our expert planning and elegant spaces.",
      image: specialImg,
      link: "/events#birthday-parties"
    }
  ]

  useEffect(() => {
    // Animate cards with staggered rotation and scale
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { 
            rotation: 10,
            scale: 0.8,
            opacity: 0,
            y: 100
          },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Set initial position for title container (at bottom)
        const titleContainer = card.querySelector('.title-container')
        if (titleContainer) {
          gsap.set(titleContainer, { y: 0 }) // Start at bottom
        }
      }
    })
  }, [])

  const handleCardHover = (index, isHovering) => {
    const card = cardsRef.current[index]
    const titleContainer = card?.querySelector('.title-container')
    const titleText = card?.querySelector('.title-text')
    const topLine = card?.querySelector('.top-line')
    const bottomLine = card?.querySelector('.bottom-line')
    
    if (!card || !titleContainer || !titleText) return

    if (isHovering) {
      // Card hover animation
      gsap.to(card, {
        rotationY: 5,
        rotationX: 5,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      })

      // Title animation - smooth move from bottom to center
      gsap.to(titleContainer, {
        y: -90, // Move up to center (half the card height)
        duration: 1.2,
        ease: "power2.out"
      })

      // Lines animation with delay
      gsap.to([topLine, bottomLine], {
        opacity: 1,
        scaleX: 1,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
        stagger: 0.1
      })

      // Title text micro animation
      gsap.to(titleText, {
        y: -4,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out"
      })

    } else {
      // Reset animations
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })

      gsap.to(titleContainer, {
        y: 0, // Return to bottom position
        duration: 0.8,
        ease: "power2.out"
      })

      gsap.to([topLine, bottomLine], {
        opacity: 0,
        scaleX: 0,
        duration: 0.3,
        ease: "power2.out"
      })

      gsap.to(titleText, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="py-20 px-6 bg-[#faf8f5]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, we provide exceptional 
            venues and services for every occasion.
          </p>
        </div>

        {/* Services Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.link}
              ref={el => cardsRef.current[index] = el}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              className="group cursor-pointer block"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                
                {/* Title - Starts at bottom center, animates to center on hover */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="title-container text-center pb-6" style={{ transform: 'translateY(0px)' }}>
                    {/* Top Line */}
                    <div className="top-line w-24 h-0.5 bg-white mx-auto mb-4 opacity-0 scale-x-0 origin-center"></div>
                    
                    {/* Title */}
                    <h3 className="title-text text-white text-xl font-semibold px-4">
                      {service.title}
                    </h3>
                    
                    {/* Bottom Line */}
                    <div className="bottom-line w-24 h-0.5 bg-white mx-auto mt-4 opacity-0 scale-x-0 origin-center"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Services Carousel - Mobile */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.link}
                className="flex-shrink-0 w-72 h-80 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 active:scale-95"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative h-full">
                  {/* Background Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  {/* Title - Always centered on mobile */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {/* Top Line */}
                      <div className="w-16 h-0.5 bg-white mx-auto mb-3"></div>
                      
                      {/* Title */}
                      <h3 className="text-white text-lg font-semibold px-4">
                        {service.title}
                      </h3>
                      
                      {/* Bottom Line */}
                      <div className="w-16 h-0.5 bg-white mx-auto mt-3"></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
