import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useState } from "react"
import { Color } from "three"
import { randomHexColor } from "../../util/helpers"
import { useRandomColorFlash } from "../../util/hooks"

export default function Block(props) {
    const ref = useRef()

    useRandomColorFlash(ref)

    return (
        <Box ref={ref} name="floor" {...props}>
            <meshStandardMaterial opacity={props?.opacity || 1} transparent={true}/>
        </Box>
    )
}
