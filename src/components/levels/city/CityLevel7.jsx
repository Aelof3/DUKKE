import { Instance, Instances } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useContext, useRef, useEffect } from "react"
import { Object3D } from "three"
import { ControlsContext } from "../../context/Controls"
import Block from "../../parts/Block"
import CityBuilding from "../../parts/CityBuilding"
import CityCar from "../../parts/CityCar"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"
import Tree from "../../parts/Tree"

export default function CityLevel7(props) {

    const { pause } = useContext(ControlsContext)

    const generateTrees = (n) => {
        const trees = []
        for (let i = 0; i < n; i++) {
            const x = Math.random() * 26 + 2
            const z = Math.random() * 26 - 14

            const height = Math.random() * 3 + 0.5
            const width = Math.random() * 0.5 + 0.5
            const depth = Math.random() * 0.5 + 0.5

            trees.push(
                <Tree
                    key={`tree-${i}`}
                    position={[x, 0, z]}
                    height={height}
                    width={width}
                    depth={depth}
                />
            )
        }

        return trees
    }

    return (
        <LevelBase
            level={7}
            name="city_level_7"
            start_pos={[0, 0.5, 14.5]}
            /* end_pos={[5, 0.5, 14.5]} */
            end_pos={[29, 0.5, -14.5]}
        >
            <RigidBody type={"fixed"} colliders="cuboid">
                <Floor args={[30, 0.2, 30]} position={[14.5, -0.1, 0]} color={'darkgreen'} />
            </RigidBody>
            
            <CityBuilding position={[4.5, 0, -11.2]} height={0.9} width={0.65} depth={0.65}/>
            <CityBuilding position={[5, 0, 11.2]} height={1} width={0.65} depth={0.65}/>
            <CityBuilding position={[23.5, 0, 11.2]} height={1.5} width={0.65} depth={0.65}/>
            <CityBuilding position={[23.5, 0, -11.2]} height={2} width={0.65} depth={0.65}/>

            {generateTrees(100)}

        </LevelBase>
    )
}