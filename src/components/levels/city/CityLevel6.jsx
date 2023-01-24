import { Cylinder, Ring } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { CuboidCollider, CylinderCollider, MeshCollider, RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import { DoubleSide } from "three"
import Block from "../../parts/Block"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"
import Spinner from "../../parts/Spinner"

export default function CityLevel6(props) {
    
    const redWheelPanelProps = {
        args:[39, 0.4, 10],
        position:[14.5, 7.3, 0],
        color: 'red',
        name:'wheel_panel',
        renderOrder: 100
    }

    const blackWheelPanelProps = {
        args:[39, 0.4, 10],
        position:[14.5, 7.31, 0],
        color: 'black',
        name:'wheel_panel'
    }

    const wheelPaddleProps = {
        name:"wheel_paddle",
        args:[39.5, 5, 0.4],
        position:[0, 2, 0],
        color: 'brown',
        friction: 0
    }
    const wheelPaddleColliderProps = {
        args:[19.5,2.5,0.2],
        position:[0, 2, 0]
    }
        

    const getWheelPanels = (n) => {
        let panels = []

        for (let i = 0; i < n; i++) {
            if (i !== 21) {
                if (i % 2 === 0) {
                    panels.push(
                        <Ring 
                            key={`wpanel-${i}`}
                            name="wheel_panel"
                            args={[20, 10, 16, 1, ((Math.PI * 2) / n) * i, Math.PI / (n/2)]}
                            position={[14.5, 7.5, 0]}
                            rotation={[Math.PI/2, 0, 0]}
                        >
                            <meshStandardMaterial color="black" />
                        </Ring>
                    )
                } else {
                    panels.push(
                        <Ring 
                            key={`wpanel-${i}`}
                            name="wheel_panel"
                            args={[20, 10, 16, 1, ((Math.PI * 2) / n) * i, Math.PI / (n/2)]}
                            position={[14.5, 7.5, 0]}
                            rotation={[Math.PI/2, 0, 0]}
                        >
                            <meshStandardMaterial color="red" />
                        </Ring>
                    )
                }
            }
        }

        return panels
    }

    return (
        <LevelBase 
            level={6}
            name="city_level_6"
            start_pos={[0, 15, 14.5]}
            end_pos={[27.5, 0.6, -10]}
        >
            <RigidBody type={"fixed"} colliders="trimesh" friction={0}>
                <Ring 
                    args={[22, 0, 16, 1, 0, Math.PI * 2]}
                    position={[14.5, 0, 0]}
                    rotation={[Math.PI/2, 0, 0]}
                >
                    <meshStandardMaterial color="#888888" side={DoubleSide}/>
                </Ring>
            </RigidBody>

            <RigidBody type={"fixed"} colliders={'trimesh'}>
                <Cylinder 
                    args={[20, 20, 10, 16, 1, true]} 
                    position={[14.5, 5, 0]}   
                >
                    <meshStandardMaterial color="#444444" side={DoubleSide}/>
                </Cylinder>
                <Cylinder 
                    args={[22, 22, 10, 16, 1, true]} 
                    position={[14.5, 5, 0]}   
                >
                    <meshStandardMaterial color="#444444" side={DoubleSide}/>
                </Cylinder>
            </RigidBody>

            <Ring 
                args={[22, 20, 16, 1, 0, Math.PI * 2]}
                position={[14.5, 10, 0]}
                rotation={[Math.PI/2, 0, 0]}
            >
                <meshStandardMaterial color="#888888" />
            </Ring>

            <RigidBody type={"fixed"} colliders="hull" friction={0}>
                <Cylinder 
                    args={[0, 15, 5, 24, 1, true]} 
                    position={[14.5, 10, 0]}
                >
                    <meshStandardMaterial color={"darkgoldenrod"}/>
                </Cylinder>
            </RigidBody>

            <Spinner
                name="wheel_paddles"
                axes={[false, true, false]}
                position={[14.5, 8, 0]}
                colliderType={false}
                speed={[1,1,1]}
                rotation={[0, 0, 0]}
            >
                <CuboidCollider
                    {...wheelPaddleColliderProps}
                    rotation={[0, 0, 0]}
                />
                <Block
                    {...wheelPaddleProps}
                    rotation={[0, 0, 0]}
                />

                <CuboidCollider
                    {...wheelPaddleColliderProps}
                    rotation={[0, Math.PI / 4, 0]}
                />
                <Block
                    {...wheelPaddleProps}
                    rotation={[0, Math.PI / 4, 0]}
                />

                <CuboidCollider
                    {...wheelPaddleColliderProps}
                    rotation={[0, Math.PI / -4, 0]}
                />
                <Block
                    {...wheelPaddleProps}
                    rotation={[0, Math.PI / -4, 0]}
                />

                <CuboidCollider
                    {...wheelPaddleColliderProps}
                    rotation={[0, Math.PI / -2, 0]}
                />
                <Block
                    {...wheelPaddleProps}
                    rotation={[0, Math.PI / -2, 0]}
                />
            </Spinner>


            {/* <RigidBody type={"fixed"} colliders="hull" friction={0}> */}
                {/* {getWheelPanels(12)} */}
            {/* </RigidBody> */}

            {/* <Block
                {...redWheelPanelProps}
                rotation={[0, 0, 0]}
            />
            <Block
                {...blackWheelPanelProps}
                rotation={[0, ((Math.PI * 2) / 12) * 1, 0]}
            /> */}

            <RigidBody type={"fixed"} colliders={'trimesh'} friction={0}>
                    <Ring 
                        key={`wpanels`}
                        name="wheel_panel"
                        args={[21, 10, 16, 1, ((Math.PI * 2) / 16) * 15, Math.PI * 2 / 16 * 15]}
                        position={[14.5, 7.5, 0]}
                        rotation={[Math.PI/2, 0, 0]}
                    >
                        <meshStandardMaterial color="red" />
                    </Ring>
                    {/* {getWheelPanels(12)} */}
            </RigidBody>
            
        </LevelBase>
    )
}