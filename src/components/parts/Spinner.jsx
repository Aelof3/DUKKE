import { useContext, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { ControlsContext } from "../context/Controls"

export default function Spinner({ 
    axes=[false,false,false], 
    colliderType="cuboid", speed=[1,1,1], 
    increment=[0.01,0.01,0.01],
    rotation=[0,0,0],
    children, ...props 
}) {
    const pos = props?.position ?? [0,0,0]
    const rot = rotation
    const { pause } = useContext(ControlsContext)

    const [rX, setRX] = useState(rot[0])
    const [rY, setRY] = useState(rot[1])
    const [rZ, setRZ] = useState(rot[2])

    useFrame(()=>{
        if (pause) return
        if (axes[0]) setRX(prev => prev + (increment[0] * speed[0]))
        if (axes[1]) setRY(prev => prev + (increment[1] * speed[1]))
        if (axes[2]) setRZ(prev => prev + (increment[2] * speed[2]))
    })

    return (
        <RigidBody colliders={colliderType} type={"fixed"} rotation={[rX,rY,rZ]} position={pos}>
            { children }
        </RigidBody>
    )
}