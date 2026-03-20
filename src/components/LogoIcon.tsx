const LogoIcon = ({ icon }: { icon: { imgPath: string; name?: string } }) => {
    return (
        <div className="flex-none flex-center marquee-item">
            <img src={icon.imgPath} alt={icon.name} />
        </div>
    )
}

export default LogoIcon
