import React from "react"
import { Box, Trail } from "@react-three/drei"

export default function Engine(props) {
    const { toggle } = props
    
    const color = toggle ? "yellow" : "transparent"
    const decay = toggle ? 5 : 100

    return (
        <Trail width={2} stride={0.1} length={4} interval={3} attenuation={(w) => w * w} decay={decay} color={color}>
            <Box args={[0.01, 0.01, 0.01]} {...props} castShadow={false} receiveShadow={false}/>
        </Trail>
    )
}

export function Engine2(props) {
    const { toggle } = props
    
    const color = toggle ? "yellow" : "transparent"
    const decay = toggle ? 5 : 100

    return (
        <Trail width={1} length={4} interval={3} attenuation={(w) => w * w} decay={decay} color={color}>
            <Box args={[0.01, 0.01, 0.01]} {...props} castShadow={false} receiveShadow={false}/>
        </Trail>
    )
}