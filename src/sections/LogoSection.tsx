import LogoIcon from "../components/LogoIcon"
import { logoIconsList } from "../consts/constant"

const LogoSection = () => {
    return (
        <section className="md:my-20 my-10 relative">
            {/* Two edge overlays create matching left/right fades for the scrolling strip. */}
            <div className="gradient-edge" />
            <div className="gradient-edge" />

            <div className="marquee h-52">
                <div className="marquee-box">
                    <div className="marquee-group">
                        {logoIconsList.map((icon, index) => (
                            <LogoIcon
                                key={`primary-${icon}-${index}`}
                                icon={icon}
                            />
                        ))}
                    </div>

                    {/* Render the same list again so the marquee can loop continuously without a visible jump. */}
                    <div className="marquee-group" aria-hidden="true">
                        {logoIconsList.map((icon, index) => (
                            <LogoIcon
                                key={`duplicate-${icon}-${index}`}
                                icon={icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LogoSection
