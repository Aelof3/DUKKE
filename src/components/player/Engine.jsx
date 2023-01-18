import { Box } from "@react-three/drei"

export default function Engine(props) {
    const { toggle } = props
    return (
        <Box castShadow receiveShadow args={[0.1, 0.2, 0.1]} {...props}>
            <meshStandardMaterial color={toggle ? "orange" : "purple"} />
        </Box>
    )
}