import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useContext, useMemo } from "react"
import Block from "../../parts/Block"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"
import { getRandomColorName } from "../../../util/helpers"

import { ControlsContext } from "../../context/Controls"

export default function CityLevel3(props) {

    const { pause } = useContext(ControlsContext)

    const carRef0 = useRef()
    const carRef1 = useRef()
    const carRef2 = useRef()
    const carRef3 = useRef()
    const carRef4 = useRef()
    const carRef5 = useRef()
    const carRef6 = useRef()
    const carRef7 = useRef()
    const carRef8 = useRef()
    const carRef9 = useRef()
    const carRef10 = useRef()
    const carRef11 = useRef()

    // generate a color for each car ref
    const carColors = useMemo(()=> Array(12).fill(0).map(() => getRandomColorName()), [])
    
    const row1Speed = -1.5 // + 2 * Math.random()
    const row2Speed = 2.5 // + 0.5 * Math.random()
    const row3Speed = -3 // + -2 * Math.random()
    const row4Speed = 3 // + -1 * Math.random()
    
    const handleTx = (r, speed, reverse) => {
        const tx = r.current.translation()
        const isPastMax = reverse ? tx.z > 30 : tx.z < -30
        const resetVal = reverse ? -30 : 30
        const z = isPastMax ? resetVal : tx.z + (0.1 * speed)
        r.current.setTranslation({x: tx.x, y: tx.y, z})
    }

    useFrame(() => {
        if (pause) return
        // car 1 move back and forth

        // ROW 1
        handleTx(carRef0, row1Speed, false)
        handleTx(carRef1, row1Speed, false)

        // ROW 2
        handleTx(carRef2, row2Speed, true)
        handleTx(carRef3, row2Speed, true)
        handleTx(carRef4, row2Speed, true)

        // ROW 3
        handleTx(carRef5, row3Speed, false)
        handleTx(carRef6, row3Speed, false)
        handleTx(carRef7, row3Speed, false)

        // ROW 4
        handleTx(carRef8, row4Speed, true)
        handleTx(carRef9, row4Speed, true)
        handleTx(carRef10, row4Speed, true)
        handleTx(carRef11, row4Speed, true)
    })

    return (
        <LevelBase 
            level={3}
            name="city_level_3"
            start_pos={[0, 0.5, 0]}
            end_pos={[59, 0.5, 0]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[60, 0.2, 60]} position={[29.5,-0.1,0]} />
            </RigidBody>

            {/* cars */}

            {/* row 1 */}
            <RigidBody ref={carRef0} name={"car"} position={[8,2,24.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 4, 5]} color={carColors[0]}/>
            </RigidBody>
            <RigidBody ref={carRef1} name={"car"} position={[8,4,-0.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 8, 5]} color={carColors[1]}/>
            </RigidBody>

            {/* row 2 */}
            <RigidBody ref={carRef2} name={"car"} position={[22,2,14.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[6, 4, 5]} color={carColors[2]}/>
            </RigidBody>
            <RigidBody ref={carRef3} name={"car"} position={[22,1.5,-24.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[4, 3, 5]} color={carColors[3]}/>
            </RigidBody>
            <RigidBody ref={carRef4} name={"car"} position={[22,2,-0.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[8, 4, 5]} color={carColors[4]}/>
            </RigidBody>

            {/* row 3 */}
            <RigidBody ref={carRef5} name={"car"} position={[36,2,-18.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 4, 5]} color={carColors[5]}/>
            </RigidBody>
            <RigidBody ref={carRef6} name={"car"} position={[36,4,-0.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 8, 5]} color={carColors[6]}/>
            </RigidBody>
            <RigidBody ref={carRef7} name={"car"} position={[36,2,18.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 4, 5]} color={carColors[7]}/>
            </RigidBody>

            {/* row 4 */}
            <RigidBody ref={carRef8} name={"car"} position={[50,2,-23.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 4, 5]} color={carColors[8]}/>
            </RigidBody>
            <RigidBody ref={carRef9} name={"car"} position={[50,6,-8]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 12, 5]} color={carColors[9]}/>
            </RigidBody>
            <RigidBody ref={carRef10} name={"car"} position={[50,3,8]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 6, 5]} color={carColors[10]}/>
            </RigidBody>
            <RigidBody ref={carRef11} name={"car"} position={[50,5,23.5]} rotation={[0,Math.PI/2,0]} type={"fixed"} colliders="cuboid">
                <Block args={[12, 10, 5]} color={carColors[11]}/>
            </RigidBody>
        </LevelBase>
    )
}