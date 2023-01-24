import { Box, Trail } from "@react-three/drei"

export default function Engine(props) {
    const { toggle } = props
    
    const color = toggle ? "yellow" : "transparent"
    const decay = toggle ? 5 : 100

    return (
        <Trail width={3} length={2} attenuation={(w) => w} decay={decay} color={color}>
            <Box args={[0.01, 0.01, 0.01]} {...props} />
        </Trail>
    )
}