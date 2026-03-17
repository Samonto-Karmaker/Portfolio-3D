import type React from "react"
import type { JSX } from "react"

const ButtonCTA = ({
    text,
    className,
    scrollToId,
}: {
    text?: string
    className?: string
    scrollToId?: string
}): JSX.Element => {
    const handleAutoScroll = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        e.preventDefault()

        // if scroll to id is provided, scroll to that element
        if (scrollToId) {
            const targetId = document.getElementById(scrollToId)
            if (!targetId) return

            const viewportTopPadding = window.innerHeight * 0.15
            const targetTopInViewport = targetId.getBoundingClientRect().top
            const currentScrollY = window.scrollY
            const targetTopInDocument = targetTopInViewport + currentScrollY
            const scrollDestinationY = targetTopInDocument - viewportTopPadding

            window.scrollTo({
                top: scrollDestinationY,
                behavior: "smooth",
            })
        }
    }

    return (
        <a onClick={(e) => handleAutoScroll(e)}>
            <div className={`${className ?? ""} cta-wrapper`}>
                <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">{text}</p>
                    <div className="arrow-wrapper">
                        <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                </div>
            </div>
        </a>
    )
}

export default ButtonCTA
