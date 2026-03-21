import { abilities } from "../consts/constant"
import FeatureCard from "../components/FeatureCard"

const FeatureCards = () => {
    return (
        <section className="feature-cards-section w-full padding-x-lg">
            <div className="mx-auto grid-3-cols">
                {abilities.map(({ imgPath, title, desc }) => (
                    <FeatureCard
                        key={title}
                        imgPath={imgPath}
                        title={title}
                        desc={desc}
                    />
                ))}
            </div>
        </section>
    )
}

export default FeatureCards
