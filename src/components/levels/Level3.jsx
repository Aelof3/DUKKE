import Floor from "../parts/Floor"
import Block from "../parts/Block"
import LevelBase from "../parts/LevelBase"

export default function Level3(props) {
    return (
        <LevelBase start_pos={[0, 0.5, 0]} end_pos={[9, 0.5, 0]} name="level_3">
            <Floor args={[10, 0.2, 2]} position={[4.5,-0.1,0]} />
            <Block args={[2, 5, 2]} position={[4.5,2.5,0]}/>
        </LevelBase>
    )
}