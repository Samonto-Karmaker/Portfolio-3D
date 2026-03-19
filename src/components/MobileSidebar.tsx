import type { RefObject } from "react"

type SidebarLink = {
    link: string
    name: string
}

type MobileSidebarProps = {
    isOpen: boolean
    sidebarRef: RefObject<HTMLElement | null>
    links: SidebarLink[]
    onClose: () => void
}

const MobileSidebar = ({
    isOpen,
    sidebarRef,
    links,
    onClose,
}: MobileSidebarProps) => {
    return (
        <>
            {/* Overlay softens the background and closes the menu when clicked. */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-98"
                    onClick={onClose}
                />
            )}

            {/* Sidebar uses the shared mobile styles and opens under the navbar. */}
            <nav
                ref={sidebarRef}
                className={`mobile-sidebar ${isOpen ? "open" : ""}`}
            >
                <ul>
                    {links.map(({ link, name }) => (
                        <li key={name} className="group">
                            {/* Clicking a link navigates and closes the sidebar. */}
                            <a href={link} onClick={onClose}>
                                <span>{name}</span>
                                <span className="underline" />
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default MobileSidebar
