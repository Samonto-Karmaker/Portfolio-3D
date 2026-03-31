import TitleHeader from "../components/TitleHeader"
import { aboutData } from "../consts/constant"

const About = () => {
    return (
        <section id="about" className="py-20 md:px-20 px-5 mt-16">
            <TitleHeader title="About Me" subtitle="👋 Get to know me" />
            <div className="flex flex-col md:flex-row items-center gap-10 mt-16">
                {/* Left side: Image (1/3 on large screens, full width on small screens) */}
                <div className="w-full md:w-1/3 flex justify-center order-1 md:order-1">
                    <div 
                        className="w-full max-w-sm border-4 border-white-50/20 blob-shape overflow-hidden bg-white-50" 
                        style={{ aspectRatio: "1/1" }}
                    >
                        <img
                            src={aboutData.imgPath}
                            alt={aboutData.name}
                            className="w-full h-full object-cover mix-blend-multiply"
                        />
                    </div>
                </div>

                {/* Right side: Info (2/3 on large screens, full width on small screens) */}
                <div className="w-full md:w-2/3 flex flex-col gap-4 text-center md:text-left order-2 md:order-2">
                    <h2 className="text-xl md:text-5xl font-bold text-white">
                        {aboutData.name}
                    </h2>
                    <p className="text-white-50 text-lg md:text-xl leading-relaxed">
                        {aboutData.description}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About
