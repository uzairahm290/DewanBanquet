import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import local images for services
import weddingImg from '../assets/Images/IMG-20250905-WA0001.jpg'
import corporateImg from '../assets/Images/IMG-20250905-WA0003.jpg'
import privateImg from '../assets/Images/IMG-20250905-WA0004.jpg'
import specialImg from '../assets/Images/IMG-20250905-WA0005.jpg'

const Services = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const services = [
    {
      title: "Weddings",
      description: "Create your perfect day with our elegant wedding packages. From intimate ceremonies to grand celebrations at Dewaan Banquet Hall.",
      image: weddingImg,
    },
    {
      title: "Corporate Events",
      description: "Professional venues for business meetings, conferences, and corporate celebrations with state-of-the-art facilities.",
      image: corporateImg,
    },
    {
      title: "Private Parties",
      description: "Celebrate life's special moments with our customizable private party packages in our beautiful venue.",
      image: privateImg,
    },
    {
      title: "Special Occasions",
      description: "Birthdays, anniversaries, and milestone celebrations made memorable with our expert planning and elegant spaces.",
      image: specialImg,
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
      }
    })
  }, [])

  const handleCardHover = (index, isHovering) => {
    const card = cardsRef.current[index]
    if (!card) return

    if (isHovering) {
      gsap.to(card, {
        rotationY: 5,
        rotationX: 5,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      })
    } else {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={el => cardsRef.current[index] = el}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 text-3xl">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <button className="mt-4 text-[#d4af37] font-semibold hover:text-[#b8941f] transition-colors duration-300">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
