import Floor from "../parts/Floor"
import LevelBase from "../parts/LevelBase"

export default function Level1(props) {
    return (
        <LevelBase start_pos={[0, 0.5, 0]} end_pos={[9, 0.5, 0]}>
            <Floor args={[10, 0.2, 2]} position={[4.5,-0.1,0]} />
        </LevelBase>
    )
}