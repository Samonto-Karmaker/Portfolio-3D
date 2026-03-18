import { useMemo, useRef } from "react"
import type { CSSProperties } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { showcaseProjects } from "../consts/constant"

gsap.registerPlugin(ScrollTrigger)

const Showcase = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)

    const projectsWithRenderKey = useMemo(
        () =>
            showcaseProjects.map((project, index) => ({
                ...project,
                renderKey: `${project.id}-${index}`,
            })),
        [],
    )

    const featuredProject =
        projectsWithRenderKey.find((project) => project.isFeatured) ??
        projectsWithRenderKey[0]
    const otherProjects = useMemo(
        () =>
            projectsWithRenderKey.filter(
                (project) => project.renderKey !== featuredProject?.renderKey,
            ),
        [featuredProject?.renderKey, projectsWithRenderKey],
    )

    const clampImageScale = (scale: number) =>
        Math.max(0.6, Math.min(1.05, scale))
    const clampCardScale = (scale: number) =>
        Math.max(0.9, Math.min(1.08, scale))

    const getMasonryCardClassName = (index: number) => {
        const sizeVariants = [
            "masonry-card-medium",
            "masonry-card-tall",
            "masonry-card-compact",
        ]
        return `project project-card masonry-project-card ${sizeVariants[index % sizeVariants.length]}`
    }

    const getRandomScaleFromRange = (scaleRange?: readonly number[]) => {
        if (!scaleRange || scaleRange.length < 2) return 1

        const minScale = Number(scaleRange[0])
        const maxScale = Number(scaleRange[1])
        const safeMin = Math.max(0.9, Math.min(minScale, maxScale))
        const safeMax = Math.min(1.08, Math.max(minScale, maxScale))

        if (safeMax <= safeMin) return safeMin

        const randomSource =
            typeof crypto !== "undefined" && "getRandomValues" in crypto
                ? crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295
                : 0.5

        return Number((randomSource * (safeMax - safeMin) + safeMin).toFixed(3))
    }

    const randomizedScales = useMemo(
        () =>
            otherProjects.reduce<Record<string, number>>((acc, project) => {
                acc[project.renderKey] = getRandomScaleFromRange(
                    project.cardScaleRange,
                )
                return acc
            }, {}),
        [otherProjects],
    )

    const featuredImageScale = clampImageScale(
        featuredProject?.imageScale ?? 0.95,
    )
    const featuredCardScale = clampCardScale(featuredProject?.cardScale ?? 1)

    const getCardStyle = (scale: number) => {
        return {
            "--card-scale": String(clampCardScale(scale)),
        } as CSSProperties
    }

    const getImageWrapperStyle = (
        imageScale: number,
        imageBackground?: string,
    ) => {
        return {
            backgroundColor: imageBackground ?? "#FFEFDB",
            "--image-scale": String(clampImageScale(imageScale)),
        } as CSSProperties
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
                        <div className="showcaselayout">
                            {featuredProject && (
                                <div
                                    className="first-project-wrapper project-card featured-project-card scalable-card"
                                    style={getCardStyle(featuredCardScale)}
                                >
                                    <div
                                        className="image-wrapper scalable-image-wrapper"
                                        style={getImageWrapperStyle(
                                            featuredImageScale,
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
                            )}
                        </div>

                        {otherProjects.length > 0 && (
                            <div className="project-masonry">
                                {otherProjects.map((project, index) => (
                                    <div
                                        className={`${getMasonryCardClassName(index)} scalable-card`}
                                        key={project.renderKey}
                                        style={getCardStyle(
                                            randomizedScales[
                                                project.renderKey
                                            ] ?? 1,
                                        )}
                                    >
                                        <div
                                            className="image-wrapper scalable-image-wrapper"
                                            style={getImageWrapperStyle(
                                                project.imageScale,
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
                                ))}
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
