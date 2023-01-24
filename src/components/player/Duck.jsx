import { useContext, useEffect, useState, useRef, useMemo } from "react"
import { Box, useGLTF, useFBX, useHelper, Trail } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

import { ConfigContext } from "../context/Config"
import { addUrlBase } from "../../util/helpers"
import { Quaternion, Vector3, Vector4 } from "three"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { ControlsContext } from "../context/Controls"

import Engine from "./Engine"

const DuckModel = (props) => {
    const duckScale = 0.0017
    const duckUrl = addUrlBase('models/Dukke.fbx')
    const fbx = useMemo(() => useFBX(duckUrl), [])
    const model = fbx.clone()

    return <primitive {...props} object={model} dispose={null} scale={[duckScale, duckScale, duckScale]} />
}

export default function Duck(props) {
    const { startPos } = props

    const {
        handleLevelComplete, isComplete, currentLevel,
        handleResets, handleUnstuck
    } = useContext(ConfigContext)

    const {
        keys,
        keyFrontLeft, setKeyFrontLeft,
        keyFrontRight, setKeyFrontRight,
        keyBackLeft, setKeyBackLeft,
        keyBackRight, setKeyBackRight,
        keyThrottle, setKeyThrottle,
        keyStuck, setKeyStuck,
        isUnsticking, setIsUnsticking,
        keyRotateLeft, setKeyRotateLeft,
        keyRotateRight, setKeyRotateRight

    } = useContext(ControlsContext)

    const ref = useRef()
    const rigidBodyRef = useRef()


    const handleReset = () => {
        rigidBodyRef.current.resetForces(true)
        rigidBodyRef.current.resetTorques(true)

        rigidBodyRef.current.setTranslation(new Vector3(0, 0, 0), true)
        rigidBodyRef.current.setLinvel(new Vector3(0, 0, 0), true)
        rigidBodyRef.current.setAngvel(new Vector3(0, 0, 0), true)
        rigidBodyRef.current.setRotation({ w: 1.0, x: 0.0, y: 0.0, z: 0.0 }, true)


        setKeyBackLeft(false)
        setKeyBackRight(false)
        setKeyFrontLeft(false)
        setKeyFrontRight(false)
        setKeyThrottle(false)
        setKeyStuck(false)

        handleResets()
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
            
            if (e.key === keys.rotate_left) {
                setKeyRotateLeft(true)
            }
            if (e.key === keys.rotate_right) {
                setKeyRotateRight(true)
            }

            if (e.key === keys.stuck) {
                setKeyStuck(true)
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
            if (e.key === keys.stuck) {
                setKeyStuck(false)
            }

            if (e.key === keys.rotate_left) {
                setKeyRotateLeft(false)
            }
            if (e.key === keys.rotate_right) {
                setKeyRotateRight(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    const pv3 = new Vector3()
    const fv3 = new Vector3()
    const angvel3 = new Vector3()

    const avl = 25 // max angular velocity

    const getLocalPosition = (x, y, z) => {
        pv3.set(x, y, z)
        ref.current.localToWorld(pv3)
        return pv3
    }

    const getLocalForce = (x, y, z) => {
        fv3.set(x, y, z)
        fv3.applyQuaternion(rigidBodyRef.current.rotation())
        return fv3
    }

    const randN = (n) => (Math.random() * 2 - 1) * n

    useFrame(() => {
        let pos = [0, 0, 0]
        let force = [0, 0, 0]
        const forcePerEngine = 0.075

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
            const localForce = getLocalForce(0, forcePerEngine * 4, 0)

            rigidBodyRef.current.applyImpulse(localForce)
        }
        if (keyFrontLeft || keyFrontRight || keyBackLeft || keyBackRight) {
            const pX = Math.max(Math.min(pos[0], 0.25), -0.25)
            const pY = 0
            const pZ = Math.max(Math.min(pos[2], 0.15), -0.15)

            const localPosition = getLocalPosition(pX, pY, pZ)
            const localForce = getLocalForce(force[0], force[1], force[2])

            rigidBodyRef.current.applyImpulseAtPoint(localForce, localPosition)
        }
        if (keyStuck) {
            if (!isUnsticking) {
                setIsUnsticking(true)
                handleUnstuck()
                rigidBodyRef.current.applyTorqueImpulse({x:randN(1), y:randN(1), z:randN(1)})
                setTimeout(() => setIsUnsticking(false), 500)
            }
        }
        if (keyRotateLeft) {
            /* rigidBodyRef.current.applyTorqueImpulse({x:0, y:0.025, z:0}) */
            rigidBodyRef.current.applyTorqueImpulse(getLocalForce(0,0.025,0))//{x:0, y:0.025, z:0})
        }
        if (keyRotateRight) {
            /* rigidBodyRef.current.applyTorqueImpulse({x:0, y:-0.025, z:0}) */
            rigidBodyRef.current.applyTorqueImpulse(getLocalForce(0,-0.025,0))//{x:0, y:-0.025, z:0})
        }

        // clamp rotation speed
        const angvel = rigidBodyRef.current.angvel()
        const newAngvel = angvel3.set(Math.max(Math.min(angvel.x,avl),-avl), Math.max(Math.min(angvel.y,avl),-avl), Math.max(Math.min(angvel.z,avl),-avl))
        rigidBodyRef.current.setAngvel(newAngvel)
    })

    useEffect(() => {
        handleReset()
    }, [isComplete])

    /* const trail = useMemo(() => <Trail target={ref} width={4} length={4} decay={5} color="yellow" />, []) */
    
    return (
        <>
        <RigidBody
            ref={rigidBodyRef}
            ccd={true}
            name="duck"
            linearDamping={0}
            angularDamping={0}
            mass={1}
            rotation={[0, 0, 0]}
            onCollisionEnter={({ manifold, target, other }) => {
                if (other.rigidBodyObject) {
                    if (target.rigidBodyObject.name === 'duck' && other.rigidBodyObject.name === 'end') {
                        handleLevelComplete()
                    }
                    if (target.rigidBodyObject.name === 'duck' && other.rigidBodyObject.name.includes('reset')) {
                        handleReset()
                    }
                }
            }}
        >
            <group ref={ref} position={startPos}>
                <CuboidCollider args={[0.3, 0.3, 0.25]} position={[0,-0.1,0]} name="duck_collider" />

                {/* <Engines /> */}

                <DuckModel position={[0.02, -0.4, 0]} name="duck_model" />
            </group>
        </RigidBody>
        </>
    )
}

const Engines = (props) => {
    const {
        keyFrontLeft,
        keyFrontRight,
        keyBackLeft,
        keyBackRight,
        keyThrottle,
    } = useContext(ControlsContext)

    return (
        <group>
            <Engine position={[0.2, -0.3, -0.21]} toggle={keyFrontLeft || keyThrottle} name="engine_front_left" />
            <Engine position={[0.2, -0.3, 0.21]} toggle={keyFrontRight || keyThrottle} name="engine_front_right" />
            <Engine position={[-0.25, -0.3, -0.21]} toggle={keyBackLeft || keyThrottle} name="engine_back_left" />
            <Engine position={[-0.25, -0.3, 0.21]} toggle={keyBackRight || keyThrottle} name="engine_back_right" /> 
        </group>
    )
}