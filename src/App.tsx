import NavBar from "./components/NavBar"
import Experience from "./sections/Experience"
import FeatureCards from "./sections/FeatureCards"
import Hero from "./sections/Hero"
import LogoSection from "./sections/LogoSection"
import Showcase from "./sections/Showcase"
import TechStack from "./sections/TechStack"

const App = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <Showcase />
            <LogoSection />
            <FeatureCards />
            <Experience />
            <TechStack />
        </>
    )
}

export default App
