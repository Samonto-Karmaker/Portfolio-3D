import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

type ParticlesProps = {
    count?: number
}

const Particles = ({ count = 200 }: ParticlesProps) => {
    const pointsRef = useRef<THREE.Points | null>(null)
    const speedsRef = useRef<number[]>([])
    const positionsRef = useRef<Float32Array | null>(null)
    const frameBudgetRef = useRef(0)

    useEffect(() => {
        const geometry = pointsRef.current?.geometry
        if (!geometry) return

        const positions = new Float32Array(count * 3)
        const speeds: number[] = []

        for (let index = 0; index < count; index++) {
            positions[index * 3] = (Math.random() - 0.5) * 10
            positions[index * 3 + 1] = Math.random() * 10 + 5
            positions[index * 3 + 2] = (Math.random() - 0.5) * 10
            speeds.push(0.005 + Math.random() * 0.001)
        }

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3),
        )
        positionsRef.current = positions
        speedsRef.current = speeds
    }, [count])

    useFrame((_, delta) => {
        // Updating slightly below refresh-rate meaningfully reduces CPU cost
        // while keeping motion visually smooth.
        frameBudgetRef.current += delta
        if (frameBudgetRef.current < 1 / 45) return
        frameBudgetRef.current = 0

        const positionAttribute =
            pointsRef.current?.geometry.getAttribute("position")
        if (!(positionAttribute instanceof THREE.BufferAttribute)) return

        const positions = positionsRef.current
        if (!positions) return

        for (let index = 0; index < count; index++) {
            let y = positions[index * 3 + 1]
            y -= speedsRef.current[index] ?? 0

            if (y < -2) {
                y = Math.random() * 10 + 5
            }

            positions[index * 3 + 1] = y
        }
        positionAttribute.needsUpdate = true
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry />
            <pointsMaterial
                color="#ffffff"
                size={0.05}
                transparent
                opacity={0.9}
                depthWrite={false}
            />
        </points>
    )
}

export default Particles
