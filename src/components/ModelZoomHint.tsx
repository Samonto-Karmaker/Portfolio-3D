import { useEffect, useRef } from "react"
import type { RefObject } from "react"
import gsap from "gsap"
import { useMediaQuery } from "react-responsive"

type ModelZoomHintProps = {
    targetRef: RefObject<HTMLDivElement | null>
    text?: string
}

const ModelZoomHint = ({
    targetRef,
    text = "Hold Ctrl/Cmd + Scroll to zoom",
}: ModelZoomHintProps) => {
    const hintRef = useRef<HTMLParagraphElement | null>(null)
    const hoverDelayRef = useRef<gsap.core.Tween | null>(null)
    const isHoveredRef = useRef(false)
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })

    useEffect(() => {
        const target = targetRef.current
        const hintElement = hintRef.current
        if (!target || !hintElement || isTablet) return

        gsap.set(hintElement, { autoAlpha: 0, y: 6 })

        const handleMouseEnter = () => {
            isHoveredRef.current = true

            if (hoverDelayRef.current) {
                hoverDelayRef.current.kill()
                hoverDelayRef.current = null
            }

            gsap.killTweensOf(hintElement)

            hoverDelayRef.current = gsap.delayedCall(0.5, () => {
                if (!isHoveredRef.current) return

                gsap.to(hintElement, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.25,
                    ease: "power2.out",
                })
            })
        }

        const handleMouseLeave = () => {
            isHoveredRef.current = false

            if (hoverDelayRef.current) {
                hoverDelayRef.current.kill()
                hoverDelayRef.current = null
            }

            gsap.killTweensOf(hintElement)
            gsap.to(hintElement, {
                autoAlpha: 0,
                y: 6,
                duration: 0.12,
                ease: "power2.out",
            })
        }

        target.addEventListener("mouseenter", handleMouseEnter)
        target.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            isHoveredRef.current = false
            if (hoverDelayRef.current) {
                hoverDelayRef.current.kill()
                hoverDelayRef.current = null
            }
            gsap.killTweensOf(hintElement)
            target.removeEventListener("mouseenter", handleMouseEnter)
            target.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [isTablet, targetRef])

    if (isTablet) return null

    return (
        <p
            ref={hintRef}
            className="absolute bottom-4 right-4 z-20 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] md:text-xs text-white-50 backdrop-blur-sm"
            aria-hidden="true"
        >
            {text}
        </p>
    )
}

export default ModelZoomHint
