import { useEffect, useRef, useState } from "react"
import { navLinks } from "../consts/constant"
import MobileSidebar from "./MobileSidebar"

const NavBar = () => {
    const navbarRef = useRef<HTMLElement | null>(null)
    const sidebarRef = useRef<HTMLElement | null>(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // useEffect runs after mount so refs are available.
    // We measure navbar height and expose it as a CSS variable for mobile sidebar spacing.
    useEffect(() => {
        const navbar = navbarRef.current
        const sidebar = sidebarRef.current
        if (!navbar || !sidebar) return

        // Keep sidebar top offset in sync with current navbar height.
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

        // Cleanup listeners/observer to avoid leaks when component unmounts.
        return () => {
            window.removeEventListener("resize", syncSidebarOffset)
            resizeObserver.disconnect()
        }
    }, [])

    return (
        <>
            {/* Header */}
            <header ref={navbarRef} className="navbar">
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
