import { Box } from "@react-three/drei"
import { useRef } from "react"
import { useRandomColorFlash } from "../../util/hooks"

export default function Block({opacity=1, color='blue', ...props}) {
    const ref = useRef()

    if (props?.flash) useRandomColorFlash(ref)

    return (
        <Box ref={ref} name="floor" {...props}>
            <meshStandardMaterial opacity={opacity} transparent={true} color={color}/>
        </Box>
    )
}
