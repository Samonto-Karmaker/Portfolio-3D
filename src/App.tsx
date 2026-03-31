import NavBar from "./components/NavBar"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Experience from "./sections/Experience"
import FeatureCards from "./sections/FeatureCards"
import Footer from "./sections/Footer.tsx"
import Hero from "./sections/Hero"
import LogoSection from "./sections/LogoSection"
import Showcase from "./sections/Showcase"
import TechStack from "./sections/TechStack"
import Testimonials from "./sections/Testimonials"

const App = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <About />
            <Showcase />
            <LogoSection />
            <FeatureCards />
            <Experience />
            <TechStack />
            <Testimonials />
            <Contact />
            <Footer />
        </>
    )
}

export default App
