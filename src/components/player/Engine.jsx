import { Box, Trail } from "@react-three/drei"

export default function Engine(props) {
    const { toggle } = props
    
    const color = toggle ? "yellow" : "transparent"
    const width = toggle ? 3 : 3
    const length = toggle ? 2 : 2
    const decay = toggle ? 5 : 100

    return (
        <Trail width={width} length={length} attenuation={(w) => w} decay={decay} color={color}>
            <Box args={[0.01, 0.01, 0.01]} {...props} />
        </Trail>
    )
}