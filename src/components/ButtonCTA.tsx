import type { JSX } from "react"

const ButtonCTA = ({
    text,
    className,
}: {
    text?: string
    className?: string
    id?: string
}): JSX.Element => {
    return (
        <div className={`${className ?? ""} cta-wrapper`}>
            <div className="cta-button group">
                <div className="bg-circle" />
                <p className="text">{text}</p>
                <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" alt="arrow" />
                </div>
            </div>
        </div>
    )
}

export default ButtonCTA