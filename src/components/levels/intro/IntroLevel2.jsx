import { RigidBody } from "@react-three/rapier"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"

export default function IntroLevel2(props) {
    return (
        <LevelBase
            level={2}
            name="level_2"
            start_pos={[0, 0.5, 0]}
            end_pos={[19, 0.5, 0]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[20, 0.2, 2]} position={[9.5, -0.1, 0]} />
            </RigidBody>
        </LevelBase>
    )
}