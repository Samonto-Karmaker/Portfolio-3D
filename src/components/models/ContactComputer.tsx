import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import type { ThreeElements } from "@react-three/fiber"
import type { Mesh, Material } from "three"
import type { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
    nodes: {
        Cube000_ComputerDesk_0001_1: Mesh
        Cube000_ComputerDesk_0001_2: Mesh
    }
    materials: {
        "ComputerDesk.001": Material
        "FloppyDisk.001": Material
    }
}

type ComputerProps = ThreeElements["group"] & {
    onLoaded?: () => void
}

export function Computer({ onLoaded, ...props }: ComputerProps) {
    const { nodes, materials } = useGLTF(
        "/models/computer-optimized-transformed.glb",
    ) as unknown as GLTFResult

    useEffect(() => {
        // Notify parent that GLTF nodes/materials resolved and scene can be marked ready.
        onLoaded?.()
    }, [onLoaded])

    return (
        <group {...props} dispose={null}>
            <group position={[-4.005, 67.549, 58.539]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
                    material={materials["ComputerDesk.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
                    material={materials["FloppyDisk.001"]}
                />
            </group>
        </group>
    )
}

useGLTF.preload("/models/computer-optimized-transformed.glb")

export default Computer
