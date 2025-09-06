import Navigation from './Navigation'
import Hero from './Hero'
import About from './About'
import Services from './Services'
import Gallery from './Gallery'
import Contact from './Contact'
import Footer from './Footer'

const HomePage = ({ shouldAnimate }) => {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Hero shouldAnimate={shouldAnimate} />
      <Navigation />
      <About />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  )
}

export default HomePage
