import { Box } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useRef } from "react"

export default function StartPoint(props) {
    const ref = useRef()

    return (
        <RigidBody name="start" type="fixed">
            <CuboidCollider  args={[0.5, 0.5, 0.5]} {...props}/>
            <Box castShadow receiveShadow ref={ref} args={[1, 1, 1]} {...props}>
                <meshStandardMaterial color={"#990000"} />
            </Box>
        </RigidBody>
    )
}