import { RigidBody } from "@react-three/rapier"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"

export default function IntroLevel1(props) {
    return (
        <LevelBase start_pos={[0, 0.5, 0]} end_pos={[9, 0.5, 0]} name="level_1">
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[10, 0.2, 2]} position={[4.5,-0.1,0]} />
            </RigidBody>
        </LevelBase>
    )
}