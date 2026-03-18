import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive"
import { useEffect, useState } from "react"
import { memo } from "react"

import { Room } from "./Room.tsx"
import HeroLights from "./HeroLights"
import Particles from "./Particle"
import { Suspense } from "react"

const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 425px)" })
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })
    const [isZoomModifierPressed, setIsZoomModifierPressed] = useState(false)
    // const roomScale = isMobile ? 0.7 : isTablet ? 0.88 : 1.05
    // const roomPositionY = isMobile ? -3 : isTablet ? -2.75 : -2.5

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                setIsZoomModifierPressed(true)
            }
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            if (!event.ctrlKey && !event.metaKey) {
                setIsZoomModifierPressed(false)
            }
        }

        const handleWindowBlur = () => {
            setIsZoomModifierPressed(false)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        window.addEventListener("blur", handleWindowBlur)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
            window.removeEventListener("blur", handleWindowBlur)
        }
    }, [])

    return (
        <Canvas
            camera={{ position: [0, 0, 12.5], fov: 46 }}
            style={{ background: "#000000" }}
        >
            <color attach="background" args={["#000000"]} />
            {/* deep blue ambient */}
            <ambientLight intensity={0.2} color="#1a1a40" />
            {/* Configure OrbitControls to disable panning and control zoom based on device type */}
            <OrbitControls
                enablePan={false} // Prevents panning of the scene
                // Keep page scrolling natural; zoom only when Ctrl/Cmd is held.
                enableZoom={!isTablet && isZoomModifierPressed}
                enableDamping
                dampingFactor={0.08}
                zoomSpeed={0.45}
                maxDistance={20} // Prevents zooming out so far that layout feels empty
                minDistance={10} // Prevents clipping from excessive zoom in
                minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
                maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
            />

            <Suspense fallback={null}>
                <HeroLights />
                <Particles count={100} />
                <group
                    scale={isMobile ? 0.7 : 1}
                    position={[0, -3.5, 0]}
                    rotation={[0, -Math.PI / 4, 0]}
                >
                    <Room />
                </group>
            </Suspense>
        </Canvas>
    )
}

export default memo(HeroExperience)
