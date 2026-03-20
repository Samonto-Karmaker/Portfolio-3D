import LogoIcon from "../components/LogoIcon"
import { logoIconsList } from "../consts/constant"

const LogoSection = () => {
    return (
        <section className="md:my-20 my-10 relative">
            {/* Two edge overlays create matching left/right fades for the scrolling strip. */}
            <div className="gradient-edge" />
            <div className="gradient-edge" />

            <div className="marquee h-52">
                <div className="marquee-box md:gap-12 gap-5">
                    {logoIconsList.map((icon, index) => (
                        <LogoIcon key={index} icon={icon} />
                    ))}
                    {/* Render the same list again so the marquee can loop continuously without a visible jump. */}
                    {logoIconsList.map((icon, index) => (
                        <LogoIcon key={index} icon={icon} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LogoSection
