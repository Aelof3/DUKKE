import { randomHexColor } from './helpers'
import { useThree, useFrame } from '@react-three/fiber'
import { useMemo, useState } from 'react'
import { Raycaster, Vector3, Color } from 'three'

export const useForwardRaycast = (obj) => {

    const raycaster = useMemo(() => new Raycaster(), [])
    const pos = useMemo(() => new Vector3(), [])
    const dir = useMemo(() => new Vector3(), [])
    const scene = useThree(state => state.scene)
    
    return () => {
        if (!obj.current)
            return []
        raycaster.set(
            obj.current.getWorldPosition(pos),
            obj.current.getWorldDirection(dir))
        return raycaster.intersectObjects(scene.children)
    }
}

export const useRandomColorFlash = (ref) => {
    const [color, setColor] = useState(new Color(randomHexColor()))

    const generateRandomColor = (c=new Color()) => {
        c.set(randomHexColor())
        return c
    }

    useFrame((state, delta, xrFrame) => {
        if (state.clock.getElapsedTime() % 1 < delta) {
            setColor(generateRandomColor())
        }

        ref.current.material.color.lerp(color, 0.05)
    })
}