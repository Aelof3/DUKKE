import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useState } from "react"
import { Color } from "three"
import { randomHexColor } from "../../util/helpers"

export default function Block(props) {
    const ref = useRef()
    
    const generateRandomColor = (c=new Color()) => {
        c.set(randomHexColor())
        return c
    }

    const [color, setColor] = useState(new Color(randomHexColor()))

    useFrame((state, delta, xrFrame) => {
        if (state.clock.getElapsedTime() % 1 < delta) {
            setColor(generateRandomColor())
        }

        ref.current.material.color.lerp(color, 0.05)
    })

    return (
        <RigidBody name="floor" colliders="cuboid" type="fixed">
            <Box receiveShadow ref={ref} {...props}>
                <meshStandardMaterial />
            </Box>
        </RigidBody>
    )
}
