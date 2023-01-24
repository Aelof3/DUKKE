import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import Block from "../../parts/Block"
import Floor from "../../parts/Floor"
import Gear from "../../parts/Gear"
import LevelBase from "../../parts/LevelBase"

export default function CityLevel4(props) {

    const wallColor = "#553300"

    return (
        <LevelBase 
            level={4}
            name="city_level_4"
            start_pos={[1, 0.5, 8.5]}
            end_pos={[18, 60, -8.5]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                {/* ground floor */}
                <Floor args={[20, 0.2, 20]} position={[9.4,-0.1,0]} color={"#442200"} />
                {/* end floor */}
                <Floor args={[5, 0.2, 5]} position={[16.9, 59.5, -7.5]} color={"#442200"} />

                {/* first floor */}
                <Floor args={[20, 0.2, 10]} position={[9.4,16,-5]} rotation={[Math.PI/-1.2,0,0]} color={"#442200"} />
                {/* second floor */}
                <Floor args={[10, 0.2, 20]} position={[15,26,0]} rotation={[0,0,Math.PI/-1.2]} color={"#442200"} />
                {/* break platform */}
                <Floor args={[6, 0.2, 5]} position={[3, 26, -7.5]} color={"#442200"} />
                {/* third floor */}
                <Floor args={[20, 0.2, 10]} position={[9.4,36,5]} rotation={[Math.PI/1.2,0,0]} color={"#442200"} />
                {/* fourth floor */}
                <Floor args={[10, 0.2, 20]} position={[5,46,0]} rotation={[0,0,Math.PI/1.2]} color={"#442200"} />

                {/* walls */}
                <Block args={[0.2, 70, 20]} position={[19.4,35,0]} color={wallColor} />
                <Block args={[0.2, 70, 20]} position={[9.5,35,-10]} rotation={[0,Math.PI/2,0]} color={wallColor} />
                
                {/* DONT FORGET TO UNCOMMENT */}
                <Block args={[0.2, 70, 20]} position={[9.6,35,10.1]} rotation={[0,Math.PI/2,0]} opacity={0.0} color={"black"}/>
                <Block args={[0.2, 70, 20]} position={[-0.5,35,0]} opacity={0.0} color={"white"} />

            </RigidBody>

            {/* gears */}
            <Gear 
                position={[12,12,5]} 
                speed={4} 
                color={'black'} 
            />
            <Gear 
                position={[12,8.5,2]} 
                rotation={[Math.PI/-2,0,0.35]}
                speed={4} 
                color={'black'} 
                axes={[false,false,true]}
                scale={[1,1,1]}
            />

            <Gear
                position={[1,22,4]} 
                speed={-2} 
                color={'black'}
                rotation={[0,Math.PI/-2,0]} 
                scale={[2,2,1]}
                innerRadius={3.25}
            />
            
            <Gear
                position={[16,46,1]} 
                speed={3} 
                color={'black'}
                rotation={[0,Math.PI/-2,0]} 
                scale={[2,2,1]}
                innerRadius={3.25}
            />

            <Gear 
                position={[9,50,5]} 
                speed={2} 
                color={'black'} 
            />
            <Gear 
                position={[9,53.5,2]} 
                rotation={[Math.PI/-2,0,0.35]} 
                speed={-2} 
                color={'black'} 
                axes={[false,false,true]}
                scale={[1,1,1]}
            />

        </LevelBase>
    )
}