import { useContext, useState } from "react"
import { Box } from "@react-three/drei"
import { useBox } from "@react-three/cannon"
import { ConfigContext } from "../context/Config"

export default function EndPoint(props) {
    const { isComplete } = useContext(ConfigContext)

    const [ref] = useBox(() => ({ mass: 0, ...props }))

    return (
        <Box castShadow receiveShadow ref={ref} args={[1, 1, 1]} {...props} name="end">
            <meshStandardMaterial color={isComplete ? "#009900" : "#0000aa"} />
        </Box>
    )
}
