import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useContext, useRef } from "react"
import { ControlsContext } from "../../context/Controls"
import Block from "../../parts/Block"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"

export default function CityLevel1(props) {

    const { pause } = useContext(ControlsContext)

    const carRef1 = useRef()
    const carRef2 = useRef()

    const car1Speed = 2 + Math.random()
    const car2Speed = 2 + Math.random()

    useFrame(() => {
        if (pause) return
        // car 1 move back and forth
        const car1tx = carRef1.current.translation()
        const c1X = car1tx.x > 30 ? 0 : car1tx.x + (0.1 * car1Speed)
        
        carRef1.current.setTranslation({x: c1X, y: car1tx.y, z: car1tx.z})
        
        const car2tx = carRef2.current.translation()
        const c2Z = car2tx.z < -15 ? 15 : car2tx.z - (0.1 * car2Speed)

        carRef2.current.setTranslation({x: car2tx.x, y: car2tx.y, z: c2Z})
    })

    const buildingWidth = 10

    return (
        <LevelBase 
            level={1}
            name="city_level_1"
            start_pos={[0, 0.5, 14.5]}
            end_pos={[29, 0.5, -14.5]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[30, 0.2, 30]} position={[14.5,-0.1,0]} />
                
                <Block args={[10, 25, buildingWidth]} position={[4.5, 12.5, -10]} color={"red"} />
                <Block args={[7, 25, buildingWidth]} position={[6, 12.5, 10]} color={"blue"} />

                <Block args={[10, 25, buildingWidth]} position={[24.5, 12.5, 10]} color={"yellow"} />
                <Block args={[7, 25, buildingWidth]} position={[22.5, 12.5, -10]} color={"green"} />
            </RigidBody>

            <RigidBody ref={carRef1} name={"car"} position={[22,2,0]} type={"fixed"} colliders="cuboid">
                {/* car blocks */}
                <Block args={[7, 4, 5]} color={"black"} />
            </RigidBody>

            <RigidBody ref={carRef2} name={"car"} position={[14.5,2,14.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[7, 4, 5]} color={"black"} />
            </RigidBody>
        </LevelBase>
    )
}