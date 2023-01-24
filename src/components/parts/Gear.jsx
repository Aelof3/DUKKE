import { Cylinder } from "@react-three/drei"
import { CuboidCollider, CylinderCollider } from "@react-three/rapier"
import { useRef } from "react"
import Block from "./Block"
import Spinner from "./Spinner"

export default function Gear(props) {
    const { 
        color, 
        scale=[1,1,1], 
        axes=[false,false,true], 
        position, 
        rotation, 
        speed,
        innerRadius=2.5,
    } = props

    const ref = useRef()

    const gearColor = color || "black"

    return (
        <Spinner 
            name={"gear"} 
            speed={[speed, speed, speed]}
            position={position} 
            rotation={rotation}
            colliderType={false} 
            axes={axes}
        >
            <group ref={ref} scale={scale}>
                <CylinderCollider args={[0.6, innerRadius]} position={[0,0,0]} rotation={[Math.PI/2,0,0]} />
                <Cylinder args={[innerRadius, innerRadius, 1.2, 8]} position={[0,0,0]} rotation={[Math.PI/2,0,0]}>
                    <meshStandardMaterial opacity={1} transparent={true} color={gearColor}/>
                </Cylinder>

                <CuboidCollider args={[0.5, 4, 0.5]} position={[0,0,0]} />
                <Block args={[1, 8, 1]} position={[0,0,0]} color={gearColor} />
                <CuboidCollider args={[4, 0.5, 0.5]} position={[0,0,0]} />
                <Block args={[8, 1, 1]} position={[0,0,0]} color={gearColor} />
                <CuboidCollider args={[0.5, 4, 0.5]} position={[0,0,0]} rotation={[0,0,Math.PI/4]} />
                <Block args={[1, 8, 1]} position={[0,0,0]} rotation={[0,0,Math.PI/4]} color={gearColor} />
                <CuboidCollider args={[0.5, 4, 0.5]} position={[0,0,0]} rotation={[0,0,Math.PI/-4]} />
                <Block args={[1, 8, 1]} position={[0,0,0]} rotation={[0,0,Math.PI/-4]} color={gearColor} />
            </group>
        </Spinner>
    )
}