import Floor from "../parts/Floor"
import Block from "../parts/Block"
import LevelBase from "../parts/LevelBase"
import { RigidBody } from "@react-three/rapier"

export default function Level7(props) {
    return (
        <LevelBase start_pos={[0, 0.5, 0]} end_pos={[9, 0.5, 0]} name="level_7">
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[15, 0.2, 5]} position={[4.5,-2,0]} color={'#000044'} opacity={0.95}/>
                <Floor args={[15, 0.2, 6]} position={[4.5,1,2.5]} color={'#000044'} rotation={[Math.PI / 2,0,0]} opacity={0.95} />
                <Floor args={[15, 0.2, 5]} position={[4.5,4,0]} color={'#000044'} opacity={0.95}/>
                <Floor args={[15, 0.2, 6]} position={[4.5,1,-2.5]} color={'#000044'} rotation={[Math.PI / 2,0,0]} opacity={0.95}/>

                <Block args={[0.2, 6, 5]} position={[4.5,1,0]} opacity={0.95}/>
            </RigidBody>
        </LevelBase>
    )
}