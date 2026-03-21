const TitleHeader = ({
    title,
    subtitle,
}: {
    title: string
    subtitle: string
}) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="hero-badge">
                <p>{subtitle}</p>
            </div>
            <div className="font-semibold md:text-5xl text-3xl text-center">
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default TitleHeader
