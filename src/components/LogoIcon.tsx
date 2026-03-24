const LogoIcon = ({ icon }: { icon: string }) => {
    return (
        <div className="flex-none flex-center marquee-item">
            <span className="inline-flex items-center whitespace-nowrap px-5 py-2 text-xs md:text-base font-bold tracking-[0.12em] md:tracking-[0.24em] uppercase text-white-50 opacity-50 font-stretch-200%">
                {icon}
            </span>
        </div>
    )
}

export default LogoIcon
