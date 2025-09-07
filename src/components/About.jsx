import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import weddingImg from '../assets/Images/IMG-20250905-WA0001.jpg'

const About = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Parallax effect for image
    gsap.to(imageRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

    // Animate content on scroll
    gsap.fromTo(contentRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    gsap.fromTo(imageRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }, [])

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src= {weddingImg}
                alt="Dewaan Banquet Interior"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#d4af37] rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#d4af37] rounded-full opacity-10"></div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-gradient">Dewaan Banquet</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Nestled in the heart of the city, Dewaan Banquet stands as a testament to 
              timeless elegance and modern luxury. Our venue has been the backdrop for 
              countless celebrations, from intimate gatherings to grand festivities.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              With our commitment to excellence and attention to detail, we understand that 
              every celebration is unique. Our dedicated team works tirelessly to ensure 
              that your special moments are transformed into unforgettable memories.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#d4af37] mb-2">200+</div>
                <div className="text-gray-600">Events Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#d4af37] mb-2">2+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default About
