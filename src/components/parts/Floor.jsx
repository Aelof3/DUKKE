import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
//import { useBox } from "@react-three/cannon"

export default function Floor(props) {
    //const [ref] = useBox(() => ({ mass: 0, ...props }))
    const ref = useRef()

    return (
        <RigidBody name="floor" colliders="cuboid" type="fixed">
            
            <Box receiveShadow ref={ref} {...props}>
                <meshStandardMaterial color={'#000044'} />
            </Box>
        </RigidBody>
    )
}
