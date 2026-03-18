import AnimatedCounter from "../components/AnimatedCounter.tsx"
import ButtonCTA from "../components/ButtonCTA.tsx"
import HeroExperience from "../components/models/HeroExperience"
import ModelZoomHint from "../components/ModelZoomHint.tsx"
import { intro, words } from "../consts/constant"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

const Hero = () => {
    const loopWords = [...words, ...words]
    const modelContainerRef = useRef<HTMLDivElement | null>(null)

    useGSAP(
        () => {
            gsap.fromTo(
                ".hero-text h1", // select the h1 elements within the hero-text container
                {
                    // from
                    y: 50,
                    opacity: 0,
                },
                {
                    // to
                    y: 0,
                    opacity: 1,
                    stagger: 0.5, // give each h1 element a staggered animation
                    duration: 1.5,
                    ease: "power2.inOut", // the easing function
                },
            )
        },
        { dependencies: [] },
    )

    return (
        <section id="hero" className="relative overflow-visible">
            <div className="absolute top-0 left-0 z-10">
                <img src="/images/bg.png" alt="" />
            </div>

            <div className="hero-layout">
                {/* LEFT: Hero Content */}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
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
                                                    alt="person"
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

                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                            {intro}
                        </p>

                        <ButtonCTA
                            text="See My Work"
                            className="md:w-80 md:h-16 w-60 h-12"
                            scrollToId="counter"
                        />
                    </div>
                </header>

                {/* RIGHT: 3D Model or Visual */}
                <figure>
                    <div className="hero-3d-layout" ref={modelContainerRef}>
                        <HeroExperience />
                        <ModelZoomHint targetRef={modelContainerRef} />
                    </div>
                </figure>
            </div>
            <AnimatedCounter />
        </section>
    )
}

export default Hero
