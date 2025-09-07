import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Contact = () => {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const backgroundRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    // Parallax effect for background
    gsap.to(backgroundRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

    // Animate form on scroll
    gsap.fromTo(formRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  const handleRippleClick = (e) => {
    const button = e.currentTarget
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.classList.add('ripple-effect')

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f142bb8b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Ready to plan your next celebration? Contact us today and let us make your event unforgettable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Address</div>
                    <div className="text-gray-300">Rajana Road Near Suzuki Showroom, Toba Tek Singh</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Phone</div>
                    <a 
                      href="https://wa.me/923346081111?text=Hello! I'm interested in booking an event at Dewan Banquet Hall. Could you please provide me with more information about your services and availability?" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300"
                    >
                      (+92) 334-6081111
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">info@dewaanbanquet.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.tiktok.com/@dewanbanquet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#b8941f] transition-colors duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/DewanBanquet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#b8941f] transition-colors duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#d4af37] focus:bg-white/30 transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#d4af37] focus:bg-white/30 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#d4af37] focus:bg-white/30 transition-all duration-300 resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>

              <button
                type="submit"
                onClick={handleRippleClick}
                className="w-full ripple bg-[#d4af37] text-white py-4 rounded-lg font-semibold hover:bg-[#b8941f] transition-colors duration-300 relative overflow-hidden"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact
