import { Box } from "@react-three/drei"
import { useRef } from "react"
import { useRandomColorFlash } from "../../util/hooks"

export default function Block(props) {
    const ref = useRef()

    if (props?.flash) useRandomColorFlash(ref)

    return (
        <Box ref={ref} name="floor" {...props}>
            <meshStandardMaterial opacity={props?.opacity || 1} transparent={true} color={props?.color || 'blue'}/>
        </Box>
    )
}
