import { useContext, useEffect, useState, useRef } from "react"
//import { useBox } from "@react-three/cannon"
import { Box, useGLTF, useHelper } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

//import duckGLTF from '../../assets/models/old/Duck.gltf'
import Engine from "./Engine"
import { useForwardRaycast } from "../../util/hooks"
import { ConfigContext } from "../context/Config"
import { addUrlBase } from "../../util/helpers"
import { BoxHelper, GridHelper, Quaternion, Vector3, Vector4 } from "three"
import { RigidBody } from "@react-three/rapier"

const DuckModel = (props) => {
    const duckScale = 0.4
    const duckUrl = addUrlBase('models/Duck.gltf')
    const gltf = useGLTF(duckUrl)
    return <primitive {...props} object={gltf.scene} dispose={null} scale={[duckScale,duckScale,duckScale]} />
}

export default function Duck(props) {
    const startingPosition = [0, 2, 0]

    const [keyFrontLeft, setKeyFrontLeft] = useState(false)
    const [keyFrontRight, setKeyFrontRight] = useState(false)
    const [keyBackLeft, setKeyBackLeft] = useState(false)
    const [keyBackRight, setKeyBackRight] = useState(false)
    const [keyThrottle, setKeyThrottle] = useState(false)

    const { keys, setIsComplete } = useContext(ConfigContext)

    const isDebug = false

    //const [ref, api] = useBox(() => ({ mass: isDebug ? 0 : 1,linearDamping:0.95, args: [0.5, 0.7, 0.2], position: startingPosition, ...props }))
    const ref = useRef()
    const rigidBodyRef = useRef()

    //const raycast = useForwardRaycast(ref)

    const handleReset = () => {
        /* ref.current.position.set(...startingPosition)
        api.position.set(...startingPosition)
        api.velocity.set(0, 0, 0)
        api.angularVelocity.set(0, 0, 0)
        api.rotation.set(0, 0, 0) */
        rigidBodyRef.current.resetForces(true)
        rigidBodyRef.current.resetTorques(true)
        rigidBodyRef.current.setTranslation(new Vector3(...startingPosition), true)
        rigidBodyRef.current.setLinvel(new Vector3(0, 0, 0), true)
        rigidBodyRef.current.setAngvel(new Vector3(0, 0, 0), true)
        rigidBodyRef.current.setRotation({ w: 1.0, x: 0.0, y: 0.0, z: 0.0 }, true)
        

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

    const getLocalPosition = (x, y, z, p=new Vector3(), q=new Quaternion()) => {
        p.set(x, y, z)
        //localPosition.applyQuaternion(ref.current.quaternion)
        ref.current.localToWorld(p)
        //ref.current.localToWorld(p)
        //ref.current.getWorldQuaternion(q)
        //localPosition.applyQuaternion(q)
        return p
    }

    const getLocalForce = (x, y, z, f=new Vector3(), q=new Quaternion(), d=new Vector3()) => {
        f.set(x, y, z)
        f.applyQuaternion(rigidBodyRef.current.rotation())
        //ref.current.worldToLocal(localForce)
        //ref.current.localToWorld(localForce)
        //ref.current.getWorldQuaternion(q)
        //ref.current.getWorldDirection(d)
        //f.applyQuaternion(q)
        return f
    }

    useFrame(() => {
        let pos = [0,0,0]
        let force = [0,0,0]
        const forcePerEngine = 0.5
        
        if (isDebug) {
            if (keyFrontRight) {
                //ref.current.position.set(ref.current.position.x + 0.1, ref.current.position.y, ref.current.position.z)
                //api.position.set(ref.current.position.x + 0.1, ref.current.position.y, ref.current.position.z)
            }
            
        } else {
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
        }
    })

    return (
        <RigidBody 
                ref={rigidBodyRef}
                colliders={"cuboid"} 
                name="duck"
                type={"dynamic"}
                linearDamping={0}
                angularDamping={0}
                mass={1}
                onCollisionEnter={({ manifold, target, other }) => {
                    console.log(
                      "Collision at world position ",
                      manifold.solverContactPoint(0)
                    );
            
                    if (other.rigidBodyObject) {
                      console.log(
                        // this rigid body's Object3D
                        target.rigidBodyObject.name,
                        " collided with ",
                        // the other rigid body's Object3D
                        other.rigidBodyObject.name
                      );
                    }
                  }}
            >
            <group ref={ref} position={startingPosition}>
                <Box castShadow args={[0.5, 0.05, 0.3]} position={[0, -0.2, 0]} name="duck_base">
                    <meshStandardMaterial color={"#999900"} />
                </Box>

                <axesHelper args={[5]} />

                <Engine position={[0.25, -0.3, -0.15]} toggle={keyFrontLeft || keyThrottle} name="engine_front_left" />
                <Engine position={[0.25, -0.3, 0.15]} toggle={keyFrontRight || keyThrottle} name="engine_front_right" />
                <Engine position={[-0.25, -0.3, -0.15]} toggle={keyBackLeft || keyThrottle} name="engine_back_left" />
                <Engine position={[-0.25, -0.3, 0.15]} toggle={keyBackRight || keyThrottle} name="engine_back_right" />
                

                <DuckModel position={[-0.05, -0.4, 0]} name="duck_model" />  
            </group>
        </RigidBody>
    )
}