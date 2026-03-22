import { useMemo, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { showcaseProjects } from "../consts/constant"

gsap.registerPlugin(ScrollTrigger)

const Showcase = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)

    const projectsWithKey = useMemo(
        () =>
            showcaseProjects.map((project, index) => ({
                ...project,
                renderKey: `${project.id}-${index}`,
            })),
        [],
    )

    const featuredProject =
        projectsWithKey.find((project) => project.isFeatured) ??
        projectsWithKey[0]

    const secondaryProjects = useMemo(
        () =>
            projectsWithKey.filter(
                (project) => project.renderKey !== featuredProject?.renderKey,
            ),
        [featuredProject?.renderKey, projectsWithKey],
    )

    const getImageWrapperStyle = (imageBackground?: string) => {
        return {
            backgroundColor: imageBackground ?? "#FFEFDB",
        }
    }

    useGSAP(
        () => {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5 },
            )

            const cards = gsap.utils.toArray<HTMLElement>(
                ".project-card",
                sectionRef.current,
            )

            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    {
                        y: 50,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        delay: 0.3 * (index + 1),
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100",
                        },
                    },
                )
            })
        },
        { scope: sectionRef },
    )

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                {showcaseProjects.length ? (
                    <>
                        {featuredProject && (
                            <div className="showcaselayout">
                                <div className="first-project-wrapper project-card featured-project-card">
                                    <div
                                        className="image-wrapper"
                                        style={getImageWrapperStyle(
                                            featuredProject.imageBackground,
                                        )}
                                    >
                                        <img
                                            src={featuredProject.imgPath}
                                            alt={featuredProject.imgAlt}
                                        />
                                    </div>
                                    <div className="text-content">
                                        <h2>{featuredProject.title}</h2>
                                        <p className="text-white-50 md:text-xl">
                                            {featuredProject.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {secondaryProjects.length > 0 && (
                            <div className="project-masonry">
                                {secondaryProjects.map((project, index) => {
                                    const sizeVariants = [
                                        "masonry-card-medium",
                                        "masonry-card-tall",
                                        "masonry-card-compact",
                                    ]

                                    return (
                                        <div
                                            className={`project project-card masonry-project-card ${sizeVariants[index % sizeVariants.length]}`}
                                            key={project.renderKey}
                                        >
                                            <div
                                                className="image-wrapper"
                                                style={getImageWrapperStyle(
                                                    project.imageBackground,
                                                )}
                                            >
                                                <img
                                                    src={project.imgPath}
                                                    alt={project.imgAlt}
                                                />
                                            </div>
                                            <h2>{project.title}</h2>
                                            <p className="text-white-50 mt-3 md:text-lg">
                                                {project.description}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-white-50 text-lg">
                        No projects added yet.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Showcase
