import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import Block from "../../parts/Block"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"

export default function CityLevel2(props) {

    const carRef0 = useRef()
    const carRef1 = useRef()
    const carRef2 = useRef()
    const carRef3 = useRef()

    const car0Speed = 2 + Math.random()
    const car1Speed = car0Speed
    const car2Speed = 2 + Math.random()
    const car3Speed = car2Speed

    useFrame(() => {
        // car 1 move back and forth
        const car1tx = carRef1.current.translation()
        const c1X = car1tx.x > 30 ? 0 : car1tx.x + (0.1 * car1Speed)
        
        carRef1.current.setTranslation({x: c1X, y: car1tx.y, z: car1tx.z})
        
        const car0tx = carRef0.current.translation()
        const c0X = car0tx.x > 30 ? 0 : car0tx.x + (0.1 * car0Speed)
        
        carRef0.current.setTranslation({x: c0X, y: car0tx.y, z: car0tx.z})
        


        const car2tx = carRef2.current.translation()
        const c2Z = car2tx.z < -15 ? 15 : car2tx.z - (0.1 * car2Speed)

        carRef2.current.setTranslation({x: car2tx.x, y: car2tx.y, z: c2Z})
        
        const car3tx = carRef3.current.translation()
        const c3Z = car3tx.z < -15 ? 15 : car3tx.z - (0.1 * car3Speed)

        carRef3.current.setTranslation({x: car3tx.x, y: car3tx.y, z: c3Z})
    })

    const buildingWidth = 10

    return (
        <LevelBase 
            level={2}
            name="city_level_2"
            start_pos={[0, 0.5, 14.5]}
            end_pos={[28, 20.5, 13.5]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[30, 0.2, 30]} position={[14.5,-0.1,0]} />
                
                <Block args={[10, 12, buildingWidth]} position={[4.5, 6, -10]} color={"red"} />
                <Block args={[7, 25, buildingWidth]} position={[6, 12.5, 10]} color={"blue"} />

                <Block args={[10, 20, buildingWidth]} position={[24.5, 10, 10]} color={"green"} />
                <Block args={[10, 25, buildingWidth]} position={[24.5, 12.5, -10]} color={"yellow"} />
            </RigidBody>

            <RigidBody ref={carRef0} name={"car_reset"} position={[7,2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[7, 4, 5]} color={"black"}/>
            </RigidBody>
            <RigidBody ref={carRef1} name={"car_reset"} position={[22,2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[7, 4, 5]} color={"black"}/>
            </RigidBody>

            <RigidBody ref={carRef2} name={"car_reset"} position={[14.5,4,14.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 8, 5]} color={"black"}/>
            </RigidBody>
            <RigidBody ref={carRef3} name={"car_reset"} position={[14.5,4,-0.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 8, 5]} color={"black"}/>
            </RigidBody>
        </LevelBase>
    )
}