import { useEffect, useRef } from "react"
import { navLinks } from "../consts/constant"

const NavBar = () => {
    // Direct ref avoids React state updates on every scroll tick.
    const navbarRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const navbar = navbarRef.current
        if (!navbar) return

        // rAF throttles class updates to once per animation frame.
        let ticking = false
        // Prevents redundant DOM class toggles when the state is unchanged.
        let lastIsScrolled = false

        const syncNavbarState = (isScrolled: boolean) => {
            if (isScrolled === lastIsScrolled) return

            lastIsScrolled = isScrolled
            // Toggle visual state classes without triggering component rerenders.
            navbar.classList.toggle("scrolled", isScrolled)
            navbar.classList.toggle("not-scrolled", !isScrolled)
        }

        const handleScroll = () => {
            if (ticking) return

            ticking = true
            requestAnimationFrame(() => {
                // Flip to scrolled styling as soon as user moves beyond 5px.
                syncNavbarState(window.scrollY > 5)
                ticking = false
            })
        }

        // Set correct initial state for refreshes or deep links.
        syncNavbarState(window.scrollY > 5)
        // Passive listener keeps scrolling smooth.
        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        // Default starts as not-scrolled; effect syncs once mounted.
        <header ref={navbarRef} className="navbar not-scrolled">
            <div className="inner">
                {/* Title */}
                <a href="#hero" className="logo">
                    Samanta Karmaker
                </a>

                {/* Navigation Links */}
                <nav className="desktop">
                    <ul>
                        {navLinks.map(({link, name}) => (
                            <li key={name} className="group">
                                <a href={link}>
                                    <span>{name}</span>
                                    <span className="underline" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contact Button */}
                <a href="#contact" className="contact-btn group">
                    <div className="inner">
                        <span>Contact Me</span>
                    </div>
                </a>
            </div>
        </header>
    )
}

export default NavBar
