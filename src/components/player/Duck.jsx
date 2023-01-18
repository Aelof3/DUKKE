import { useEffect, useState } from "react"
import { useBox } from "@react-three/cannon"
import { Box, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

import duckGLTF from '../../assets/models/old/Duck.gltf'
import Engine from "./Engine"
import { useForwardRaycast } from "../../util/hooks"

const DuckModel = (props) => {
    const duckScale = 0.4
    const gltf = useGLTF(duckGLTF)
    return <primitive {...props} object={gltf.scene} dispose={null} scale={[duckScale,duckScale,duckScale]} />
}

export default function Duck(props) {
    const [keyQ, setKeyQ] = useState(false)
    const [keyW, setKeyW] = useState(false)
    const [keyA, setKeyA] = useState(false)
    const [keyS, setKeyS] = useState(false)
    const [keySpace, setKeySpace] = useState(false)

    const [ref, api] = useBox(() => ({ mass: 1,linearDamping:0.95, args: [0.5, 0.7, 0.2], position: [0, 2, 0], ...props }))

    const raycast = useForwardRaycast(ref)

    const handleReset = () => {
        api.position.set(0, 2, 0)
        api.velocity.set(0, 0, 0)
        api.angularVelocity.set(0, 0, 0)
        api.rotation.set(0, 0, 0)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "q") {
                setKeyQ(true)
            }
            if (e.key === "w") {
                setKeyW(true)
            }
            if (e.key === "a") {
                setKeyA(true)
            }
            if (e.key === "s") {
                setKeyS(true)
            }
            if (e.key === " ") {
                setKeySpace(true)
            }
            if (e.key === "r") {
                handleReset()
            }

        }

        const handleKeyUp = (e) => {
            if (e.key === "q") {
                setKeyQ(false)
            }
            if (e.key === "w") {
                setKeyW(false)
            }
            if (e.key === "a") {
                setKeyA(false)
            }
            if (e.key === "s") {
                setKeyS(false)
            }
            if (e.key === " ") {
                setKeySpace(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    useFrame(() => {
        let pos = [0,0,0]
        let force = [0,0,0]
        const forcePerEngine = 1
        if (keyQ) {
            pos[0] += 0.25
            pos[2] += 0.15
            force[1] += forcePerEngine
        }
        if (keyW) {
            pos[0] += -0.25
            pos[2] += 0.15
            force[1] += forcePerEngine
        }
        if (keyA) {
            pos[0] += 0.25
            pos[2] += -0.15
            force[1] += forcePerEngine
        }
        if (keyS) {
            pos[0] += -0.25
            pos[2] += -0.15
            force[1] += forcePerEngine
        }
        if (keySpace) {
            api.applyLocalForce([0, 20, 0], [0, 0.1, 0])
        }
        if (keyQ || keyW || keyA || keyS) {
            const pX = Math.max(Math.min(pos[0], 0.25), -0.25)
            const pY = 0.1
            const pZ = Math.max(Math.min(pos[2], 0.15), -0.15)
            
            api.applyLocalForce(force, [pX, pY, pZ])
        }
        
        const intersections = raycast()

        // if intersections includes "end"
        if (intersections.some((i) => i.object.name === "end")) {
            handleReset()
        }
    })

    return (
        <group ref={ref}>
            <Box castShadow args={[0.5, 0.05, 0.3]} position={[0, -0.2, 0]} name="duck_base">
                <meshStandardMaterial color={"#999900"} />
            </Box>

            <Engine position={[0.25, -0.2, 0.15]} toggle={keyQ || keySpace} name="engine_q" />
            <Engine position={[-0.25, -0.2, 0.15]} toggle={keyW || keySpace} name="engine_w" />
            <Engine position={[0.25, -0.2, -0.15]} toggle={keyA || keySpace} name="engine_a" />
            <Engine position={[-0.25, -0.2, -0.15]} toggle={keyS || keySpace} name="engine_s" />
            

            <DuckModel position={[-0.05, -0.4, 0]} name="duck_model" /> 
        </group>
    )
}