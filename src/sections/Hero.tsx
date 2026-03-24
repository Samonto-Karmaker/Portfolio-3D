import AnimatedCounter from "../components/AnimatedCounter.tsx"
import ButtonCTA from "../components/ButtonCTA.tsx"
import ModelZoomHint from "../components/ModelZoomHint.tsx"
import { intro, words } from "../consts/constant"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Suspense, lazy, useEffect, useRef, useState } from "react"

const HeroExperience = lazy(() => import("../components/models/HeroExperience"))

const Hero = () => {
    const loopWords = [...words, ...words]
    const modelContainerRef = useRef<HTMLDivElement | null>(null)
    const [shouldLoadHero3D, setShouldLoadHero3D] = useState(false)

    useEffect(() => {
        // Delay non-critical 3D work until after initial content is visible.
        const timeoutId = window.setTimeout(() => {
            setShouldLoadHero3D(true)
        }, 1200)

        return () => window.clearTimeout(timeoutId)
    }, [])

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
        <section id="hero" className="hero-section relative overflow-visible">
            <div className="absolute top-0 left-0 z-10">
                <img src="/images/bg.png" alt="" />
            </div>

            <div className="hero-layout">
                {/* LEFT: Hero Content */}
                <header className="flex flex-col justify-center w-full md:px-20 px-5">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>
                                Designing
                                <span className="slide">
                                    <span className="wrapper">
                                        {loopWords.map((word, index) => (
                                            <span
                                                key={index}
                                                className="flex max-w-full items-center md:gap-3 gap-1 pb-2"
                                            >
                                                <span>{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                            <h1>Systems for</h1>
                            <h1>Real-World Applications</h1>
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
                    <div
                        className="hero-3d-layout hover:cursor-grab active:cursor-grabbing"
                        ref={modelContainerRef}
                    >
                        {shouldLoadHero3D ? (
                            <Suspense
                                fallback={
                                    <div className="h-full w-full bg-black" />
                                }
                            >
                                <HeroExperience />
                            </Suspense>
                        ) : (
                            <div className="h-full w-full bg-black" />
                        )}
                        <ModelZoomHint targetRef={modelContainerRef} />
                    </div>
                </figure>
            </div>
            <AnimatedCounter />
        </section>
    )
}

export default Hero
