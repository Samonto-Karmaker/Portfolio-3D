import { navLinks, socialImgs } from "../consts/constant"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="space-y-3">
                    <a
                        href="#hero"
                        className="inline-block text-2xl font-semibold text-white transition-colors duration-300 hover:text-white-50"
                    >
                        Samanta Karmaker
                    </a>
                    <p className="text-sm md:text-base text-white-50/80">
                        Building thoughtful digital products with design, code,
                        and performance in mind.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-5 md:gap-8 flex-wrap">
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.link}
                            className="text-sm md:text-base text-white-50 transition-colors duration-300 hover:text-white"
                        >
                            {item.name}
                        </a>
                    ))}
                    <a
                        href="#hero"
                        className="text-sm md:text-base text-white-50 transition-colors duration-300 hover:text-white"
                    >
                        Top
                    </a>
                </div>

                <div className="socials md:justify-end">
                    {socialImgs.map((social) => (
                        <a
                            key={social.name}
                            href="#"
                            aria-label={social.name}
                            className="icon"
                        >
                            <img
                                src={social.imgPath}
                                alt={social.name}
                                className="size-4 md:size-5 object-contain"
                            />
                        </a>
                    ))}
                </div>
            </div>

            <p className="mt-8 text-xs md:text-sm text-white-50/70 text-center">
                © {currentYear} Samanta Karmaker. Crafted with React, Three.js, and care.
            </p>
        </footer>
    )
}

export default Footer
