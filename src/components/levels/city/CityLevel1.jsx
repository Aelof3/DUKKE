import { RigidBody } from "@react-three/rapier"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"

export default function CityLevel1(props) {
    return (
        <LevelBase 
            level={1}
            name="city_level_1"
            start_pos={[0, 0.5, 0]} 
            end_pos={[9, 0.5, 0]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[10, 0.2, 2]} position={[4.5,-0.1,0]} />
            </RigidBody>
        </LevelBase>
    )
}