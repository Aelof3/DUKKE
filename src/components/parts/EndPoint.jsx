import { useContext, useRef, useState } from "react"
import { Box } from "@react-three/drei"
import { ConfigContext } from "../context/Config"
import { CuboidCollider, RigidBody } from "@react-three/rapier"

export default function EndPoint(props) {
    const { isComplete } = useContext(ConfigContext)

    const ref = useRef()

    return (
        <RigidBody name="end" type="fixed">
            <CuboidCollider args={[0.5, 0.5, 0.5]} {...props}/>

            <Box castShadow receiveShadow ref={ref} args={[1, 1, 1]} {...props}>
                <meshStandardMaterial color={isComplete ? "#009900" : "#0000aa"} />
            </Box>
        </RigidBody>
    )
}
