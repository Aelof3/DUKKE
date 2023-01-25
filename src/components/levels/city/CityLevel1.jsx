import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useContext, useRef } from "react"
import { ControlsContext } from "../../context/Controls"
import Block from "../../parts/Block"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"
import CityCar from "../../parts/CityCar"
import CityBuilding from "../../parts/CityBuilding"

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
        const c1X = car1tx.x > 45 ? -25 : car1tx.x + (0.2 * car1Speed)
        
        carRef1.current.setTranslation({x: c1X, y: car1tx.y, z: car1tx.z})
        
        const car2tx = carRef2.current.translation()
        const c2Z = car2tx.z < -30 ? 30 : car2tx.z - (0.19 * car2Speed)

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
                <Floor args={[30, 0.2, 30]} position={[14.5,-0.1,0]} color={"darkgreen"} />
            </RigidBody>

            <CityBuilding position={[4.5, 0, -9.2]} height={2} width={0.85} depth={0.85}/>
            <CityBuilding position={[5, 0, 10.1]} height={2} width={0.85} depth={0.65}/>
            <CityBuilding position={[23.5, 0, 10]} height={2} width={0.85} depth={1}/>
            <CityBuilding position={[22.5, 0, -10]} height={2} width={0.85} depth={0.65}/>

            <RigidBody
                ref={carRef1}
                type={"fixed"}
                colliders={false}
                rotation={[0,Math.PI/-2,0]}
                position={[22, 2, 0]}
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
                rotation={[0,0,0]}
                position={[14.5, 2, 14.5]}
            >
                <CityCar
                    height={2}
                    width={2}
                    depth={2}
                 />
            </RigidBody>
        </LevelBase>
    )
}