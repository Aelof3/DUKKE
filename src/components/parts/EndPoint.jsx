import { Box } from "@react-three/drei"
import { useBox } from "@react-three/cannon"

export default function EndPoint(props) {
    const [ref] = useBox(() => ({ mass: 0, ...props }))
    
    return (
        <Box castShadow receiveShadow ref={ref} args={[1, 1, 1]} {...props} name="end">
            <meshStandardMaterial color={"#009900"} />
        </Box>
    )
}
