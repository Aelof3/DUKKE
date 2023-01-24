import { useContext, useEffect, useState, useRef, useMemo } from "react"
import { Box, useGLTF, useFBX, useHelper } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

import { ConfigContext } from "../context/Config"
import { addUrlBase } from "../../util/helpers"
import { Quaternion, Vector3, Vector4 } from "three"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { ControlsContext } from "../context/Controls"

const DuckModel = (props) => {
    const duckScale = 0.0017
    const duckUrl = addUrlBase('models/Dukke.fbx')
    const fbx = useMemo(() => useFBX(duckUrl), [duckUrl])
    const model = fbx.clone()

    return <primitive {...props} object={model} dispose={null} scale={[duckScale, duckScale, duckScale]} />
}

export default function Duck(props) {
    const startingPosition = [0, 1.4, 0]

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
        isUnsticking, setIsUnsticking

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
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    const getLocalPosition = (x, y, z, p = new Vector3(), q = new Quaternion()) => {
        p.set(x, y, z)
        ref.current.localToWorld(p)
        return p
    }

    const getLocalForce = (x, y, z, f = new Vector3(), q = new Quaternion(), d = new Vector3()) => {
        f.set(x, y, z)
        f.applyQuaternion(rigidBodyRef.current.rotation())
        return f
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
                rigidBodyRef.current.applyTorqueImpulse(new Vector3(randN(1), randN(1), randN(1)))
                setTimeout(() => setIsUnsticking(false), 500)
            }
        }
    })

    useEffect(() => {
        if (isComplete) {
            handleReset()
        }
    }, [isComplete])


    return (
        <RigidBody
            ref={rigidBodyRef}

            name="duck"
            linearDamping={0}
            angularDamping={0}
            mass={1}
            onCollisionEnter={({ manifold, target, other }) => {
                if (other.rigidBodyObject) {
                    if (target.rigidBodyObject.name === 'duck' && other.rigidBodyObject.name === 'end') {
                        handleLevelComplete()
                    }
                }
            }}
        >
            <group ref={ref} position={startingPosition}>

                <CuboidCollider args={[0.3, 0.3, 0.25]} position={[0, -0.1, 0]} name="duck_collider" />

                {/*
                
                TODO: replace these with engine fire or smoke plumes

                <Engine position={[0.25, -0.3, -0.15]} toggle={keyFrontLeft || keyThrottle} name="engine_front_left" />
                <Engine position={[0.25, -0.3, 0.15]} toggle={keyFrontRight || keyThrottle} name="engine_front_right" />
                <Engine position={[-0.25, -0.3, -0.15]} toggle={keyBackLeft || keyThrottle} name="engine_back_left" />
                <Engine position={[-0.25, -0.3, 0.15]} toggle={keyBackRight || keyThrottle} name="engine_back_right" /> 
                
                */}


                <DuckModel position={[0.02, -0.4, 0]} name="duck_model" />
            </group>
        </RigidBody>
    )
}