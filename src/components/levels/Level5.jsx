import Floor from "../parts/Floor"
import Block from "../parts/Block"
import LevelBase from "../parts/LevelBase"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Level5(props) {
    const spinRef = useRef()

    useFrame((state, delta, xrFrame) => {
        spinRef.current.rotation.x += 0.02
    })

    return (
        <LevelBase start_pos={[0, 0.5, 0]} end_pos={[9, 0.5, 0]} name="level_5">
            <Floor args={[10, 0.2, 5]} position={[4.5,-0.1,0]} />
            <group ref={spinRef}>
                <Block args={[2, 10, 2]} position={[4.5,0,0]}/>
            </group>
        </LevelBase>
    )
}