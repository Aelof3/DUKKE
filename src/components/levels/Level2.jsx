import Floor from "../parts/Floor"
import LevelBase from "../parts/LevelBase"

export default function Level2(props) {
    return (
        <LevelBase start_pos={[0, 0.5, 0]} end_pos={[19, 0.5, 0]} name="level_2">
            <Floor args={[20, 0.2, 2]} position={[9.5,-0.1,0]} />
        </LevelBase>
    )
}