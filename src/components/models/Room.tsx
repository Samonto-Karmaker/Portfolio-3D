import { useMemo, useRef } from "react"
import { useGLTF, useTexture } from "@react-three/drei"
import type { ThreeElements } from "@react-three/fiber"
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import type { GLTF } from "three-stdlib"
import type { Object3D, Material } from "three"
import { Mesh, MeshPhongMaterial, MeshStandardMaterial } from "three"

type RoomProps = ThreeElements["group"]

type RoomGLTF = GLTF & {
    nodes: Record<string, Object3D>
    materials: Record<string, Material>
}

export function Room(props: RoomProps) {
    const { nodes, materials } = useGLTF(
        "/models/optimized-room.glb",
    ) as unknown as RoomGLTF
    const screensRef = useRef<Mesh>(null!)
    const matcapTexture = useTexture("/images/textures/mat1.png")

    const getGeometry = (nodeName: string) => {
        const node = nodes[nodeName]
        if (!(node instanceof Mesh)) {
            throw new Error(`Expected ${nodeName} to be a mesh`)
        }

        return node.geometry
    }

    const curtainMaterial = useMemo(
        () =>
            new MeshPhongMaterial({
                color: "#d90429",
            }),
        [],
    )

    const bodyMaterial = useMemo(
        () =>
            new MeshPhongMaterial({
                map: matcapTexture,
            }),
        [matcapTexture],
    )

    const tableMaterial = useMemo(
        () =>
            new MeshPhongMaterial({
                color: "#582f0e",
            }),
        [],
    )

    const radiatorMaterial = useMemo(
        () =>
            new MeshPhongMaterial({
                color: "#fff",
            }),
        [],
    )

    const compMaterial = useMemo(
        () =>
            new MeshStandardMaterial({
                color: "#fff",
            }),
        [],
    )

    const pillowMaterial = useMemo(
        () =>
            new MeshPhongMaterial({
                color: "#8338ec",
            }),
        [],
    )

    const chairMaterial = useMemo(
        () =>
            new MeshPhongMaterial({
                color: "#000",
            }),
        [],
    )

    return (
        <group {...props} dispose={null}>
            <EffectComposer>
                <SelectiveBloom
                    selection={screensRef}
                    intensity={1.5}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    blendFunction={BlendFunction.ADD}
                />
            </EffectComposer>
            <mesh
                geometry={getGeometry("_________6_blinn1_0")}
                material={curtainMaterial}
            />
            <mesh
                geometry={getGeometry("body1_blinn1_0")}
                material={bodyMaterial}
            />
            <mesh
                geometry={getGeometry("cabin_blinn1_0")}
                material={tableMaterial}
            />
            <mesh
                geometry={getGeometry("chair_body_blinn1_0")}
                material={chairMaterial}
            />
            <mesh
                geometry={getGeometry("comp_blinn1_0")}
                material={compMaterial}
            />
            <mesh
                ref={screensRef}
                geometry={getGeometry("emis_lambert1_0")}
                material={materials.lambert1}
            />
            <mesh
                geometry={getGeometry("handls_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("keyboard_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("kovrik_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("lamp_bl_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("lamp_white_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("miuse_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("monitor2_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("monitor3_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("pCylinder5_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("pillows_blinn1_0")}
                material={pillowMaterial}
            />
            <mesh
                geometry={getGeometry("polySurface53_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("radiator_blinn1_0")}
                material={radiatorMaterial}
            />
            <mesh
                geometry={getGeometry("radiator_blinn1_0001")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("railing_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("red_bttns_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("red_vac_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("stylus_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("table_blinn1_0")}
                material={tableMaterial}
            />
            <mesh
                geometry={getGeometry("tablet_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("triangle_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("vac_black_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("vacuum1_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("vacuumgrey_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("vires_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("window_blinn1_0")}
                material={materials.blinn1}
            />
            <mesh
                geometry={getGeometry("window4_phong1_0")}
                material={materials.phong1}
            />
        </group>
    )
}
