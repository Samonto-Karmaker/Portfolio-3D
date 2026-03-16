import ButtonCTA from "../components/ButtonCTA.tsx"
import HeroExperience from "../components/models/HeroExperience"
import { intro, words } from "../consts/constant"

const Hero = () => {
    const loopWords = [...words, ...words]

    return (
        <section id="hero" className="relative overflow-hidden min-h-screen">
            <div className="absolute top-0 left-0 z-0 pointer-events-none">
                <img src="/images/bg.png" alt="Background" />
            </div>

            <div className="hero-layout">
                {/* Left: hero content */}
                <header className="w-full xl:w-1/2 flex flex-col justify-center z-20">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>
                                Shaping
                                <span className="slide">
                                    <span className="wrapper">
                                        {loopWords.map((word, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center md:gap-3 gap-1 pb-2"
                                            >
                                                <img
                                                    src={word.imgPath}
                                                    alt={word.text}
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                />
                                                <span>{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                            <h1>into Real Projects</h1>
                            <h1>that Deliver Results</h1>
                        </div>
                        <p className="max-w-2xl">{intro}</p>
                        <ButtonCTA
                            text="See My Work"
                            className="md:w-80 md:h-16 w-60 h-12"
                        />
                    </div>
                </header>
                {/* Right: 3D model */}
                <figure className="w-full xl:w-1/2 flex justify-center xl:justify-end">
                    <div className="hero-3d-layout">
                        <HeroExperience />
                    </div>
                </figure>
            </div>
        </section>
    )
}

export default Hero
