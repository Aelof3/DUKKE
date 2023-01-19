import { useState } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"

export default function Spinner({ children, axes=[false,false,false], colliderType="cuboid", speed=[1,1,1], increment=[0.01,0.01,0.01], ...props }) {
    const [rX, setRX] = useState(0)
    const [rY, setRY] = useState(0)
    const [rZ, setRZ] = useState(0)

    useFrame(()=>{
        if (axes[0]) setRX(prev => prev + (increment[0] * speed[0]))
        if (axes[1]) setRY(prev => prev + (increment[1] * speed[1]))
        if (axes[2]) setRZ(prev => prev + (increment[2] * speed[2]))
    })

    return (
        <RigidBody colliders={colliderType} type={"fixed"} rotation={[rX,rY,rZ]}>
            { children }
        </RigidBody>
    )
}