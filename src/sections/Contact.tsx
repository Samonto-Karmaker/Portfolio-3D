import { Suspense, lazy, useEffect, useRef, useState } from "react"
import emailjs from "@emailjs/browser"

import TitleHeader from "../components/TitleHeader"

const ContactExperience = lazy(
    () => import("../components/models/ContactExperience"),
)

const Contact = () => {
    const formRef: React.RefObject<HTMLFormElement | null> = useRef(null)
    const modelContainerRef = useRef<HTMLDivElement | null>(null)
    const [loading, setLoading] = useState(false)
    const [shouldRenderModel, setShouldRenderModel] = useState(false)
    // Tracks a successful GLTF render callback from the 3D component.
    const [modelLoaded, setModelLoaded] = useState(false)
    // Manual fallback UI is shown only after automatic recovery fails.
    const [showModelRetry, setShowModelRetry] = useState(false)
    // One silent remount is attempted before showing retry controls.
    const [autoRetryAttempted, setAutoRetryAttempted] = useState(false)
    // Changing key forces a full remount of lazy 3D subtree.
    const [modelInstanceKey, setModelInstanceKey] = useState(0)
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    })

    // Observe the model container for intersection
    // On intersection, set the flag to render the model
    // Lazy load the 3D model
    useEffect(() => {
        const target = modelContainerRef.current
        if (!target || shouldRenderModel) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setShouldRenderModel(true)
                    observer.disconnect()
                }
            },
            { rootMargin: "220px 0px" },
        )

        observer.observe(target)

        return () => observer.disconnect()
    }, [shouldRenderModel])

    useEffect(() => {
        if (!shouldRenderModel || modelLoaded) return

        setShowModelRetry(false)
        const retryTimer = window.setTimeout(() => {
            // First stall triggers an automatic remount to recover transient load issues.
            if (!autoRetryAttempted) {
                setAutoRetryAttempted(true)
                setModelLoaded(false)
                setModelInstanceKey((prev) => prev + 1)
                return
            }

            // If a second attempt still stalls, expose a manual retry button.
            setShowModelRetry(true)
        }, 8000)

        return () => window.clearTimeout(retryTimer)
    }, [shouldRenderModel, modelLoaded, autoRetryAttempted, modelInstanceKey])

    const handleModelRetry = () => {
        // Manual remount path used only after the automatic retry has already run.
        setModelLoaded(false)
        setShowModelRetry(false)
        setModelInstanceKey((prev) => prev + 1)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true) // Show loading state

        if (!formRef.current) {
            setLoading(false)
            return
        }

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
            )

            // Reset form and stop loading
            setForm({ name: "", email: "", message: "" })
        } catch (error) {
            console.error("EmailJS Error:", error) // Optional: show toast
        } finally {
            setLoading(false) // Always stop loading, even on error
        }
    }

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-0">
                <TitleHeader
                    title="Get in Touch – Let’s Connect"
                    subtitle="💬 Have questions or ideas? Let’s talk! 🚀"
                />
                <div className="grid-12-cols mt-10 md:mt-16">
                    <div className="xl:col-span-5">
                        <div className="flex-center card-border rounded-xl p-4 sm:p-6 md:p-10">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-5 md:gap-7"
                            >
                                <div>
                                    <label htmlFor="name">Your name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="What’s your good name?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="What’s your email address?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="How can I help you?"
                                        rows={5}
                                        required
                                    />
                                </div>

                                <button type="submit" className="w-full">
                                    <div className="cta-button group">
                                        <div className="bg-circle" />
                                        <p className="text">
                                            {loading
                                                ? "Sending..."
                                                : "Send Message"}
                                        </p>
                                        <div className="arrow-wrapper">
                                            <img
                                                src="/images/arrow-down.svg"
                                                alt="arrow"
                                            />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="xl:col-span-7 min-h-96">
                        <div
                            className="relative bg-[#cd7c2e] w-full h-full hover:cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden"
                            ref={modelContainerRef}
                        >
                            {shouldRenderModel ? (
                                <Suspense
                                    fallback={
                                        <div className="h-full w-full bg-[#cd7c2e]" />
                                    }
                                >
                                    <ContactExperience
                                        key={modelInstanceKey}
                                        onModelReady={() => {
                                            setModelLoaded(true)
                                            setShowModelRetry(false)
                                        }}
                                    />
                                </Suspense>
                            ) : (
                                <div className="h-full w-full bg-[#cd7c2e]" />
                            )}

                            {shouldRenderModel &&
                            showModelRetry &&
                            !modelLoaded ? (
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={handleModelRetry}
                                        className="pointer-events-auto rounded-md bg-black/60 px-4 py-2 text-sm text-white hover:bg-black/70"
                                    >
                                        Model taking too long. Retry load
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
