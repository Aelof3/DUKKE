import { useEffect, useContext } from "react"
import { ConfigContext } from "../context/Config"
import { ControlsContext } from "../context/Controls"
import Duck from "../player/Duck"

import EndPoint from "./EndPoint"
import StartPoint from "./StartPoint"



export default function LevelBase(props) {
    const {
        name = 'level_null',
        start_pos = [0, 0.5, 0],
        end_pos = [9, 0.5, 0],
        level = 1,
        children
    } = props

    const { setPause } = useContext(ControlsContext)
    const { setCurrentLevel } = useContext(ConfigContext)

    useEffect(() => {
        setPause(false)
    }, [])

    useEffect(() => {
        setCurrentLevel(level)
    }, [level])

    const startingPosition = [start_pos[0], start_pos[1] + 0.9, start_pos[2]]

    return (
        <>
        <group name={name}>
            <StartPoint position={start_pos} />

            {children}

            <EndPoint position={end_pos} />
        </group>

        <Duck startPos={startingPosition} />
        </>
    )
}
