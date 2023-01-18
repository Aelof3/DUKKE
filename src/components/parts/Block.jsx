import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import { randomHexColor } from "../../util/helpers"

export default function Block(props) {
    const ref = useRef()

    return (
        <RigidBody name="floor" colliders="cuboid" type="fixed">
            <Box receiveShadow ref={ref} {...props}>
                <meshStandardMaterial color={randomHexColor()} />
            </Box>
        </RigidBody>
    )
}
