import { useRef, useMemo } from 'react'
import { useFBX } from '@react-three/drei'
import { addUrlBase } from '../../util/helpers'
import { RigidBody } from '@react-three/rapier'

const BuildingModel = ({ height=1, width=1, depth=1 }) => {
    const scale = 0.0125
    
    const url = addUrlBase('models/City_Building.fbx')
    const fbx = useMemo(() => useFBX(url), [])
    const model = fbx.clone()

    return (<primitive 
        object={model} 
        dispose={null}
        scale={[scale * depth, scale * width, scale * height]}
    />)
}

export default function CityBuilding(props) {
    const ref = useRef()

    const { height, width, depth } = props
    
    return (
        <RigidBody type={"fixed"} colliders="cuboid" rotation={[Math.PI * -0.5,0,0]} {...props} >
            <BuildingModel height={height} width={width} depth={depth} />
        </RigidBody>
    )
}
