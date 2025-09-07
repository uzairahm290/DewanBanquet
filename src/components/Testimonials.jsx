import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Testimonials = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  const testimonials = [
    {
      name: "Ahmad & Fatima Sheikh",
      event: "Wedding Reception",
      text: "Our wedding at Dewaan Banquet was absolutely magical! The elegant decor, impeccable service, and attention to detail made our special day unforgettable.",
      rating: 5
    },
    {
      name: "Muhammad Hassan",
      event: "Corporate Conference",
      text: "We hosted our annual corporate conference at Dewaan Banquet and it was a tremendous success. The professional setup and excellent service impressed all our clients.",
      rating: 5
    },
    {
      name: "Ayesha Malik",
      event: "Birthday Celebration",
      text: "My daughter's 18th birthday party at Dewaan Banquet was absolutely perfect! The themed decorations and amazing atmosphere created memories that will last a lifetime.",
      rating: 5
    },
    {
      name: "Ali & Saba Khan",
      event: "Anniversary Dinner",
      text: "Celebrating our 15th wedding anniversary at Dewaan Banquet was the perfect choice. The romantic ambiance and personalized service made our evening truly special.",
      rating: 5
    },
    {
      name: "Dr. Usman Ali",
      event: "Graduation Ceremony",
      text: "We organized my son's medical graduation ceremony at Dewaan Banquet and it was absolutely outstanding! The grand hall and exceptional service made the event memorable.",
      rating: 5
    },
    {
      name: "Zainab & Omar",
      event: "Engagement Ceremony",
      text: "Our engagement ceremony at Dewaan Banquet was absolutely beautiful! The traditional decor and warm hospitality made our families feel truly welcomed.",
      rating: 5
    }
  ]

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Animate header on scroll
    gsap.fromTo(headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate testimonials container on scroll
    gsap.fromTo('.testimonials-circular',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }, [])

  return (
    <section 
      id="testimonials"
      ref={sectionRef}
      className="py-2 bg-white relative overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            What Our <span className="font-medium text-gray-700">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experiences.
          </p>
        </div>

        {/* Circular Moving Testimonials - Single Row */}
        <div className="relative overflow-hidden">
          <div 
            className="testimonials-circular flex space-x-6 py-4"
            style={{ 
              width: `${testimonials.length * 2 * 384}px`
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                key={`circular-${index}`}
                  className="flex-shrink-0 w-80 group"
                >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-gray-100/50">
                    {/* Quote Icon */}
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>

                  {/* Rating */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                    {/* Testimonial Text */}
                  <blockquote className="text-gray-700 leading-relaxed mb-8 text-sm font-light">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-gray-200 transition-colors duration-300">
                      <span className="text-gray-600 font-medium text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                      <div className="font-medium text-gray-900 text-sm">
                          {testimonial.name}
                        </div>
                      <div className="text-gray-500 text-xs font-light">
                          {testimonial.event}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
