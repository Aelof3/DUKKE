import EndPoint from "./EndPoint"
import StartPoint from "./StartPoint"

export default function LevelBase(props) {
    const { children, name='level_null', start_pos=[0, 0.5, 0], end_pos=[9, 0.5, 0] } = props

    return (
        <group name={name}>
            <StartPoint position={start_pos} />
            {children}
            <EndPoint position={end_pos} />
        </group>
    )
}
