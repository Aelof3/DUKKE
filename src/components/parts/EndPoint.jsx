import { useContext, useRef, useState } from "react"
import { Box, Cone } from "@react-three/drei"
import { ConfigContext } from "../context/Config"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"

export default function EndPoint(props) {
    const { isComplete } = useContext(ConfigContext)

    const ref = useRef()
    const arrowRef = useRef()

    useFrame(({ clock }) => {
        if (arrowRef.current) {
            arrowRef.current.rotation.y += 0.05
            arrowRef.current.position.y = 1.4 + Math.sin(clock.getElapsedTime() * 5) * 0.25
        }
    })

    return (
        <RigidBody name="end" type="fixed">
            <CuboidCollider args={[0.5, 0.5, 0.5]} {...props}/>

            <Box castShadow receiveShadow ref={ref} args={[1, 1, 1]} {...props}>
                <meshStandardMaterial color={isComplete ? "#009900" : "#0000aa"} />

                <Cone 
                    ref={arrowRef}
                    castShadow 
                    receiveShadow 
                    args={[0.25, 0.4, 4]} 
                    position={[0, 1.5, 0]}
                    rotation={[0, 0, Math.PI]}
                >
                    <meshStandardMaterial color={isComplete ? "#00ff00" : "#ffaa00"} />
                </Cone>
            </Box>
        </RigidBody>
    )
}
