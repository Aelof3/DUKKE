import { useContext, useEffect, useState } from "react"
import { useBox } from "@react-three/cannon"
import { Box, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

//import duckGLTF from '../../assets/models/old/Duck.gltf'
import Engine from "./Engine"
import { useForwardRaycast } from "../../util/hooks"
import { ConfigContext } from "../context/Config"
import { addUrlBase } from "../../util/helpers"

const DuckModel = (props) => {
    const duckScale = 0.4
    const duckUrl = addUrlBase('models/Duck.gltf')
    const gltf = useGLTF(duckUrl)
    return <primitive {...props} object={gltf.scene} dispose={null} scale={[duckScale,duckScale,duckScale]} />
}

export default function Duck(props) {
    const [keyFrontLeft, setKeyFrontLeft] = useState(false)
    const [keyFrontRight, setKeyFrontRight] = useState(false)
    const [keyBackLeft, setKeyBackLeft] = useState(false)
    const [keyBackRight, setKeyBackRight] = useState(false)
    const [keyThrottle, setKeyThrottle] = useState(false)

    const { keys, handleLevelComplete } = useContext(ConfigContext)

    const [ref, api] = useBox(() => ({ mass: 1,linearDamping:0.95, args: [0.5, 0.7, 0.2], position: [0, 2, 0], ...props }))

    const raycast = useForwardRaycast(ref)

    const handleReset = () => {
        api.position.set(0, 2, 0)
        api.velocity.set(0, 0, 0)
        api.angularVelocity.set(0, 0, 0)
        api.rotation.set(0, 0, 0)
        setKeyBackLeft(false)
        setKeyBackRight(false)
        setKeyFrontLeft(false)
        setKeyFrontRight(false)
        setKeyThrottle(false)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === keys.front_left) {
                setKeyFrontLeft(true)
            }
            if (e.key === keys.front_right) {
                setKeyFrontRight(true)
            }
            if (e.key === keys.back_left) {
                setKeyBackLeft(true)
            }
            if (e.key === keys.back_right) {
                setKeyBackRight(true)
            }
            if (e.key === keys.throttle) {
                setKeyThrottle(true)
            }
            if (e.key === keys.reset) {
                handleReset()
            }

        }

        const handleKeyUp = (e) => {
            if (e.key === keys.front_left) {
                setKeyFrontLeft(false)
            }
            if (e.key === keys.front_right) {
                setKeyFrontRight(false)
            }
            if (e.key === keys.back_left) {
                setKeyBackLeft(false)
            }
            if (e.key === keys.back_right) {
                setKeyBackRight(false)
            }
            if (e.key === keys.throttle) {
                setKeyThrottle(false)
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
        if (keyFrontLeft) {
            pos[0] += 0.25
            pos[2] += -0.15
            force[1] += forcePerEngine
        }
        if (keyFrontRight) {
            pos[0] += 0.25
            pos[2] += 0.15
            force[1] += forcePerEngine
        }
        if (keyBackLeft) {
            pos[0] += -0.25
            pos[2] += -0.15
            force[1] += forcePerEngine
        }
        if (keyBackRight) {
            pos[0] += -0.25
            pos[2] += 0.15
            force[1] += forcePerEngine
        }
        if (keyThrottle) {
            api.applyLocalForce([0, 20, 0], [0, 0.1, 0])
        }
        if (keyFrontLeft || keyFrontRight || keyBackLeft || keyBackRight) {
            const pX = Math.max(Math.min(pos[0], 0.25), -0.25)
            const pY = 0.1
            const pZ = Math.max(Math.min(pos[2], 0.15), -0.15)
            
            api.applyLocalForce(force, [pX, pY, pZ])
        }
        
        const intersections = raycast()

        // if intersections includes "end"
        if (intersections.some((i) => i.object.name === "end")) {
            handleReset()
            handleLevelComplete()
        }
    })

    return (
        <group ref={ref}>
            <Box castShadow args={[0.5, 0.05, 0.3]} position={[0, -0.2, 0]} name="duck_base">
                <meshStandardMaterial color={"#999900"} />
            </Box>

            <Engine position={[0.25, -0.2, -0.15]} toggle={keyFrontLeft || keyThrottle} name="engine_front_left" />
            <Engine position={[0.25, -0.2, 0.15]} toggle={keyFrontRight || keyThrottle} name="engine_front_right" />
            <Engine position={[-0.25, -0.2, -0.15]} toggle={keyBackLeft || keyThrottle} name="engine_back_left" />
            <Engine position={[-0.25, -0.2, 0.15]} toggle={keyBackRight || keyThrottle} name="engine_back_right" />
            

            <DuckModel position={[-0.05, -0.4, 0]} name="duck_model" /> 
        </group>
    )
}