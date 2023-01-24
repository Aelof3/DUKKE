import Floor from "../../parts/Floor"
import Block from "../../parts/Block"
import LevelBase from "../../parts/LevelBase"
import { RigidBody } from "@react-three/rapier"

export default function IntroLevel3(props) {
    return (
        <LevelBase
            level={3}
            name="level_3"
            start_pos={[0, 0.5, 0]}
            end_pos={[9, 0.5, 0]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[10, 0.2, 2]} position={[4.5, -0.1, 0]} />
                <Block args={[2, 5, 2]} position={[4.5, 2.5, 0]} />
            </RigidBody>
        </LevelBase>
    )
}