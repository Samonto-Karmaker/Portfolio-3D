import { useCallback, useEffect, useRef, useState, type JSX } from "react"
import { projectDetails } from "../consts/constant"

type ProjectDetailsModalProps = {
    projectId: string | null
    onClose: () => void
}

const ProjectDetailsModal = ({
    projectId,
    onClose,
}: ProjectDetailsModalProps): JSX.Element | null => {
    const overlayRef = useRef<HTMLDivElement>(null)
    const [activeImg, setActiveImg] = useState(0)

    const project = projectDetails.find((p) => p.id === projectId) ?? null

    const handleClose = useCallback(() => {
        const overlay = overlayRef.current
        if (overlay) {
            overlay.removeAttribute("data-open")
        }
        setTimeout(onClose, 300)
    }, [onClose])

    // Open animation: set data-open after mount so CSS transition fires
    useEffect(() => {
        if (!projectId) return
        const raf = requestAnimationFrame(() => {
            overlayRef.current?.setAttribute("data-open", "true")
        })
        return () => cancelAnimationFrame(raf)
    }, [projectId])

    // Close on Escape
    useEffect(() => {
        if (!projectId) return
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [projectId, handleClose])

    // Lock body scroll while modal is open
    useEffect(() => {
        if (!projectId) return
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = ""
        }
    }, [projectId])

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) handleClose()
    }

    // Reset thumbnail when project changes
    if (!projectId) return null

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="project-modal-overlay"
            aria-modal="true"
            role="dialog"
            aria-label={project?.title ?? "Project details"}
        >
            <div className="project-modal-panel">
                {/* Close button */}
                <button
                    className="project-modal-close"
                    onClick={handleClose}
                    aria-label="Close modal"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M15 5L5 15M5 5l10 10"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {project ? (
                    <div className="project-modal-content">
                        {/* ── Image carousel ── */}
                        <div className="project-modal-images">
                            <div className="project-modal-main-img-wrapper">
                                <img
                                    key={activeImg}
                                    src={project.images[activeImg]}
                                    alt={`${project.title} screenshot ${activeImg + 1}`}
                                    className="project-modal-main-img"
                                />
                            </div>

                            {project.images.length > 1 && (
                                <div className="project-modal-thumbs">
                                    {project.images.map((src, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImg(i)}
                                            className={`project-modal-thumb ${i === activeImg ? "active" : ""}`}
                                            aria-label={`View screenshot ${i + 1}`}
                                        >
                                            <img src={src} alt={`Thumbnail ${i + 1}`} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── Text content ── */}
                        <div className="project-modal-body">
                            {/* Title */}
                            <h2 className="project-modal-title">{project.title}</h2>

                            {/* Description */}
                            <p className="project-modal-description">{project.description}</p>

                            {/* Divider */}
                            <div className="project-modal-divider" />

                            {/* Contributions */}
                            <div className="project-modal-section">
                                <h3 className="project-modal-section-heading">
                                    <span className="project-modal-heading-accent">✦</span>
                                    My Contribution
                                </h3>
                                <ul className="project-modal-contributions">
                                    {project.contributions.map((point, i) => (
                                        <li key={i} className="project-modal-contribution-item">
                                            <span className="project-modal-bullet" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Divider */}
                            <div className="project-modal-divider" />

                            {/* Tech stack */}
                            <div className="project-modal-section">
                                <h3 className="project-modal-section-heading">
                                    <span className="project-modal-heading-accent">✦</span>
                                    Tech Stack
                                </h3>
                                <div className="project-modal-tech-badges">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="tech-badge project-modal-badge">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-white-50 p-10">Project not found.</p>
                )}
            </div>
        </div>
    )
}

export default ProjectDetailsModal
