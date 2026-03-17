import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"

import { counterItems } from "../consts/constant"

// ScrollTrigger lets the count-up start only when the section reaches the viewport.
gsap.registerPlugin(ScrollTrigger)

const AnimatedCounter = () => {
    // One ref for the whole section and one array ref for each counter card.
    const counterRef = useRef<HTMLDivElement | null>(null)
    const countersRef = useRef<Array<HTMLDivElement | null>>([])

    useGSAP(() => {
        // Animate each counter independently so all values can share the same timing.
        countersRef.current.forEach((counter, index) => {
            if (!counter) {
                return
            }

            // Find the number element inside the card and match it to its source data.
            const numberElement = counter.querySelector(".counter-number")
            const item = counterItems[index]

            if (!numberElement || !item) {
                return
            }

            // Reset the display before the scroll-triggered tween starts.
            gsap.set(numberElement, { innerText: "0" })

            // Tween the displayed text from 0 to the target value.
            gsap.to(numberElement, {
                innerText: item.value,
                duration: 2.5,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: "#counter",
                    start: "top center",
                },
                // Re-apply the suffix once the numeric tween is complete.
                onComplete: () => {
                    numberElement.textContent = `${item.value}${item.suffix}`
                },
            })
        }, counterRef)
    }, [])

    return (
        <div
            id="counter"
            ref={counterRef}
            className="padding-x-lg xl:mt-0 mt-32"
        >
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item, index) => (
                    <div
                        key={index}
                        // Store each card element so GSAP can target its number node later.
                        ref={(el) => {
                            countersRef.current[index] = el
                        }}
                        className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
                    >
                        <div className="counter-number text-white-50 text-5xl font-bold mb-2">
                            0 {item.suffix}
                        </div>
                        <div className="text-white-50 text-lg">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnimatedCounter
