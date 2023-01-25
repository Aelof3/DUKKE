import { useRef, useMemo } from 'react'
import { useFBX } from '@react-three/drei'
import { addUrlBase } from '../../util/helpers'
import { RigidBody } from '@react-three/rapier'

export const TreeModel = ({ height=1, width=1, depth=1 }) => {
    const scale = 0.0125
    
    const url = addUrlBase('models/City_Tree.fbx')
    const fbx = useMemo(() => useFBX(url), [])
    const model = fbx.clone()

    return (<primitive 
        object={model} 
        dispose={null}
        scale={[scale * depth, scale * width, scale * height]}
    />)
}

export default function Tree(props) {
    const ref = useRef()

    const { height, width, depth } = props
    
    return (
        <RigidBody ref={ref} type={"fixed"} colliders="trimesh" rotation={[Math.PI * -0.5,0,0]} {...props} >
            <TreeModel height={height} width={width} depth={depth} />
        </RigidBody>
    )
}
