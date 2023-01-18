import { Box } from "@react-three/drei"
import { useBox } from "@react-three/cannon"

export default function Floor(props) {
    const [ref] = useBox(() => ({ mass: 0, ...props }))

    return (
        <Box receiveShadow ref={ref} {...props}>
            <meshStandardMaterial color={'#000044'} />
        </Box>
    )
}
