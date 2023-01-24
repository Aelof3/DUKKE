import { Cone, Ring } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import { Vector3 } from "three"
import Block from "../../parts/Block"
import Floor from "../../parts/Floor"
import LevelBase from "../../parts/LevelBase"

export default function CityLevel5(props) {
    const carRef1 = useRef()
    const carSpeed = 0.1

    const rVec = new Vector3()

    const getLocalForce = (x, y, z) => {
        rVec.set(x, y, z)
        rVec.applyQuaternion({ x: 0, y: Math.PI / 7.5, z: 0, w: 1 })
        return rVec
    }

    useFrame((state) => {
        // do my best to move the car in an infinity symbol around the mtns
        const pt1 = { x: 14.5, y: 3.8, z: 0 }
        const pt2 = { x: 38.5, y: 3.3, z: -24.5 }
        const t = state.clock.getElapsedTime()

        const newX = 26.5
        const newZ = -8.5

        const a = newX

        const tS = (t * carSpeed)

        const tx = {
            x: a * Math.cos(tS) + 23.5,
            y: pt2.y,
            z: a * Math.sin(tS) * Math.cos(tS) - newZ
        }
        
        const newPos = getLocalForce(tx.x, tx.y, tx.z)
        carRef1.current.setTranslation(newPos)
    })

    return (
        <LevelBase 
            level={5}
            name="city_level_5"
            start_pos={[0, 4, 18.5]}
            end_pos={[52.5, 4, -43.5]}
        >
            <RigidBody type={"fixed"} colliders="cuboid" name="floor_reset">
                <Floor 
                    name="floor_reset"
                    args={[30, 0.2, 30]} 
                    position={[14.5,-0.1,0]} 
                />
                <Floor
                    name="floor_reset" 
                    args={[30, 0.2, 30]} 
                    position={[38.5,0.1,-24.5]} 
                />
            </RigidBody>

            <RigidBody type="fixed" colliders="cuboid" >
                <Floor 
                    name="floor"
                    args={[8.8, 0.2, 8.8]} 
                    position={[0, 3.4, 18.5]} 
                    rotation={[0,Math.PI/3.32,0]} 
                />
                <Floor 
                    name="floor"
                    args={[8.5, 0.2, 8.5]} 
                    position={[52.5, 3.4, -43]} 
                    rotation={[0,Math.PI/3.35,0]} 
                />

            </RigidBody>
            

            <RigidBody type={"fixed"} colliders="hull" name="road_reset">
                <Ring 
                    name="road_reset"
                    args={[20, 10, 10]} 
                    position={[14.5, 3.5, 0]} 
                    rotation={[Math.PI/2, 0, 0]} >
                    <meshStandardMaterial color="#888888" />
                </Ring>
                <Ring 
                    name="road_reset"
                    args={[20, 10, 10]} 
                    position={[38.5, 3.5, -24.5]} 
                    rotation={[Math.PI/2, 0, 0]} >
                    <meshStandardMaterial color="#888888" />
                </Ring>
            </RigidBody>


            {/* mountains 1 */}
            <RigidBody type={"fixed"} colliders="hull" name="mountain_reset">
                <Cone args={[8, 12, 10]} name="mountain_reset" position={[18.5, 6, 2.5]} rotation={[0, 0, 0]} >
                    <meshStandardMaterial color="darkolivegreen" />
                </Cone>
                <Cone args={[11, 14, 10]} name="mountain_reset" position={[14.5, 7, 0.5]} rotation={[0, 0, 0]} >
                    <meshStandardMaterial color="darkolivegreen" />
                </Cone>
            </RigidBody>

            {/* mountains 2 */}
            <RigidBody type={"fixed"} colliders="hull" name="mountain_reset">
                <Cone args={[6, 9, 10]} name="mountain_reset" position={[33, 6, -24.5]} rotation={[0, 0, 0]} >
                    <meshStandardMaterial color="darkolivegreen" />
                </Cone>
                <Cone args={[8, 12, 10]} name="mountain_reset" position={[42.5, 6, -24.5]} rotation={[0, 0, 0]} >
                    <meshStandardMaterial color="darkolivegreen" />
                </Cone>
                <Cone args={[11, 14, 10]} name="mountain_reset" position={[38.5, 7, -25.5]} rotation={[0, 0, 0]} >
                    <meshStandardMaterial color="darkolivegreen" />
                </Cone>
            </RigidBody>

            <RigidBody ref={carRef1} name={"car"} position={[50,1.5,23.5]} type={"fixed"} colliders="cuboid">
                <Block args={[4, 1, 4]} color={'red'}/>
            </RigidBody>
        </LevelBase>
    )
}