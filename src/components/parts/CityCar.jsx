import { useRef, useMemo, forwardRef } from 'react'
import { useFBX } from '@react-three/drei'
import { addUrlBase } from '../../util/helpers'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

const CarModel = ({ height=1, width=1, depth=1, ...props }) => {
    const scale = 0.0125
    
    const url = addUrlBase('models/City_Car.fbx')
    const fbx = useMemo(() => useFBX(url), [])
    const model = fbx.clone()

    return (<primitive 
        {...props}
        object={model} 
        dispose={null}
        scale={[scale * depth, scale * width, scale * height]}
    />)
}

const CityCar = (props) => {
    const { height, width, depth } = props
    const ref = useRef()
    
    return (
        <group ref={ref} position={[0,0.6,0]}>
            <CuboidCollider args={[1, 1.15, 2.2]} position={[0,0,0]} />
            <CarModel 
                height={height} 
                width={width} 
                depth={depth} 
                position={[0, 0, 0]}
                rotation={[Math.PI * -0.5,0,0]}
            />
        </group>
    )
}

export default CityCar