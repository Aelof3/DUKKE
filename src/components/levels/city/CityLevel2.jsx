import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useContext, useRef } from "react"
import Block from "../../parts/Block"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"
import { ControlsContext } from "../../context/Controls"
import CityCar from "../../parts/CityCar"
import CityBuilding from "../../parts/CityBuilding"

export default function CityLevel2(props) {
    
    const { pause } = useContext(ControlsContext)

    const carRef1 = useRef()
    const carRef2 = useRef()
    const carRef3 = useRef()
    const carRef4 = useRef()

    const car1Speed = 2 + Math.random()
    const car2Speed = car1Speed
    const car3Speed = 2 + Math.random()
    const car4Speed = car3Speed

    useFrame(() => {
        if (pause) return
        // car 1 move back and forth
        const car2tx = carRef2.current.translation()
        const c2X = car2tx.x > 40 ? -25 : car2tx.x + (0.1 * car2Speed)
        
        carRef2.current.setTranslation({x: c2X, y: car2tx.y, z: car2tx.z})
        
        const car1tx = carRef1.current.translation()
        const c1X = car1tx.x > 40 ? -25 : car1tx.x + (0.1 * car1Speed)
        
        carRef1.current.setTranslation({x: c1X, y: car1tx.y, z: car1tx.z})
        


        const car3tx = carRef3.current.translation()
        const c3Z = car3tx.z < -30 ? 30 : car3tx.z - (0.2 * car3Speed)

        carRef3.current.setTranslation({x: car3tx.x, y: car3tx.y, z: c3Z})
        
        const car4tx = carRef4.current.translation()
        const c4Z = car4tx.z < -30 ? 30 : car4tx.z - (0.2 * car4Speed)

        carRef4.current.setTranslation({x: car4tx.x, y: car4tx.y, z: c4Z})
    })

    const buildingWidth = 10

    return (
        <LevelBase 
            level={2}
            name="city_level_2"
            start_pos={[0, 0.5, 14.5]}
            end_pos={[28, 48, 13.5]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[30, 0.2, 30]} position={[14.5,-0.1,0]} color={'darkgreen'}/>
            </RigidBody>
            
            <CityBuilding position={[4.5, 0, -10]} height={1.2} width={0.85} depth={0.85}/>
            <CityBuilding position={[5, 0, 10]} height={2} width={0.85} depth={0.65}/>
            <CityBuilding position={[23.5, 0, 10]} height={3} width={0.85} depth={1}/>
            <CityBuilding position={[23.5, 0, -10]} height={2} width={0.85} depth={1}/>

            <RigidBody
                ref={carRef1}
                type={"fixed"}
                colliders={false}
                rotation={[0,Math.PI/-2,0]}
                position={[-12, 2, 0]}
            >
                <CityCar
                    height={2}
                    width={2}
                    depth={2}
                 />
            </RigidBody>
            <RigidBody
                ref={carRef2}
                type={"fixed"}
                colliders={false}
                rotation={[0,Math.PI/-2,0]}
                position={[25, 2, 0]}
            >
                <CityCar
                    height={2}
                    width={2}
                    depth={2}
                 />
            </RigidBody>


            <RigidBody
                ref={carRef3}
                type={"fixed"}
                colliders={false}
                position={[14.5,2,14.5]}
            >
                <CityCar
                    height={2}
                    width={2}
                    depth={2}
                 />
            </RigidBody>
            <RigidBody
                ref={carRef4}
                type={"fixed"}
                colliders={false}
                position={[14.5,3,-14.5]}
            >
                <CityCar
                    height={3}
                    width={3}
                    depth={2}
                 />
            </RigidBody>
            

        </LevelBase>
    )
}