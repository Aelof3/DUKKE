import Floor from "../../parts/Floor"
import Block from "../../parts/Block"
import LevelBase from "../../parts/LevelBase"

import Spinner from "../../parts/Spinner"
import { RigidBody } from "@react-three/rapier"

export default function IntroLevel6(props) {

    return (
        <LevelBase
            level={6}
            name="level_6"
            start_pos={[0, 0.5, 0]}
            end_pos={[9, 0.5, 0]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[10, 0.2, 5]} position={[4.5, -0.1, 0]} />
            </RigidBody>
            
            <Spinner axes={[true, false, false]}>
                <Floor args={[10, 0.2, 5]} position={[4.5, -5, 0]} />
                <Block args={[2, 10, 2]} position={[4.5, 0, 0]} />
                <Floor args={[10, 0.2, 5]} position={[4.5, 5, 0]} />
            </Spinner>
        </LevelBase>
    )
}