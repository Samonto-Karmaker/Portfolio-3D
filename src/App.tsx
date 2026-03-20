import NavBar from "./components/NavBar"
import FeatureCards from "./sections/FeatureCards"
import Hero from "./sections/Hero"
import LogoSection from "./sections/LogoSection"
import Showcase from "./sections/Showcase"

const App = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <Showcase />
            <LogoSection />
            <FeatureCards />
        </>
    )
}

export default App
