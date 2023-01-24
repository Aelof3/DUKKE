import Block from "../../parts/Block"
import LevelBase from "../../parts/LevelBase"
import Spinner from "../../parts/Spinner"

export default function IntroLevel5(props) {

    return (
        <LevelBase
            level={5}
            name="level_5"
            start_pos={[0, 0.5, 0]}
            end_pos={[9, 0.5, 0]}
        >
            <Spinner axes={[true, false, false]}>
                <Block args={[2, 10, 2]} position={[4.5, 0, 0]} />
            </Spinner>
        </LevelBase>
    )
}