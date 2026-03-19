import { useEffect, useRef, useState } from "react"
import { navLinks } from "../consts/constant"
import MobileSidebar from "./MobileSidebar"

const NavBar = () => {
    // Direct ref avoids React state updates on every scroll tick.
    const navbarRef = useRef<HTMLElement | null>(null)
    const sidebarRef = useRef<HTMLElement | null>(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const navbar = navbarRef.current
        if (!navbar) return

        // rAF throttles class updates to once per animation frame.
        let ticking = false
        // Prevent unnecessary DOM writes while scrolling.
        let lastIsScrolled: boolean | null = null

        const syncNavbarState = (isScrolled: boolean) => {
            if (lastIsScrolled === isScrolled) return

            lastIsScrolled = isScrolled
            // Toggle visual state classes without triggering component rerenders.
            navbar.classList.toggle("scrolled", isScrolled)
            navbar.classList.toggle("not-scrolled", !isScrolled)
            // Explicitly sync background as a safety net for class desync edge cases.
            navbar.style.backgroundColor = isScrolled ? "#000" : "transparent"
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

    useEffect(() => {
        const navbar = navbarRef.current
        const sidebar = sidebarRef.current
        if (!navbar || !sidebar) return

        const syncSidebarOffset = () => {
            sidebar.style.setProperty(
                "--navbar-offset",
                `${navbar.offsetHeight}px`,
            )
        }

        syncSidebarOffset()
        window.addEventListener("resize", syncSidebarOffset)

        const resizeObserver = new ResizeObserver(syncSidebarOffset)
        resizeObserver.observe(navbar)

        return () => {
            window.removeEventListener("resize", syncSidebarOffset)
            resizeObserver.disconnect()
        }
    }, [])

    return (
        <>
            {/* Header */}
            <header ref={navbarRef} className="navbar not-scrolled">
                <div className="inner">
                    {/* Left Section: Hamburger + Title */}
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu - Mobile Only */}
                        <button
                            className="hamburger-btn lg:hidden"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            <span
                                className={`line ${isSidebarOpen ? "open" : ""}`}
                            />
                            <span
                                className={`line ${isSidebarOpen ? "open" : ""}`}
                            />
                            <span
                                className={`line ${isSidebarOpen ? "open" : ""}`}
                            />
                        </button>

                        {/* Title */}
                        <a href="#hero" className="logo">
                            Samanta Karmaker
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <nav className="desktop">
                        <ul>
                            {navLinks.map(({ link, name }) => (
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

            <MobileSidebar
                isOpen={isSidebarOpen}
                sidebarRef={sidebarRef}
                links={navLinks}
                onClose={() => setIsSidebarOpen(false)}
            />
        </>
    )
}

export default NavBar
