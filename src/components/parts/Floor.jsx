import { Box } from "@react-three/drei"

import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"

export default function Floor(props) {
    const ref = useRef()

    return (
        <Box receiveShadow ref={ref} {...props}>
            <meshStandardMaterial color={props?.color || '#000044'} opacity={props?.opacity || 1} transparent={true}/>
        </Box>
    )
}
