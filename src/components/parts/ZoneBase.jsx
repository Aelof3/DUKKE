import { useContext, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Stats } from "@react-three/drei"
import { Physics, Debug } from "@react-three/rapier"
import { Outlet } from "react-router-dom"
import { Perf } from "r3f-perf"

import { ConfigContext } from "../context/Config"
import { ControlsContext } from "../context/Controls"

import { addUrlBase } from "../../util/helpers"
import PauseMenu from "../menus/PauseMenu"
import Duck from "../player/Duck"

import Gui from "../Gui"
import LoadSpinner from "./LoadSpinner"

export default function Zone({ env, zone, camera, slug }) {
    const { currentLevel, isDebug, setCurrentZone } = useContext(ConfigContext)
    const { pause, setPause } = useContext(ControlsContext)

    useEffect(() => {
        setCurrentZone(slug)
    }, [slug])

    useEffect(() => {
        const handleKeyDown = (e) => {
            // esc key
            if (e.keyCode === 27) {
                setPause(!pause)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [pause])

    return (
        <>
            <Canvas shadows camera={camera}>
                <ambientLight intensity={0.25} />
                <directionalLight castShadow position={[5, 5, 5]} />
                <OrbitControls />
                <Suspense fallback={<LoadSpinner />}>
                    <Physics colliders={false} paused={pause} interpolate>
                        {isDebug && <Debug />}

                        <Outlet />
                        
                    </Physics>
                </Suspense>
                <Environment
                    background
                    blur={1}
                    files={addUrlBase(`hdr/${env}`)}
                    resolution={256}
                />
                {isDebug && <Stats showPanel={2} />}
                {isDebug && <Perf position='bottom-left' deepAnalyze={true} />}
            </Canvas>
            <Gui section={zone} />
            {pause && <PauseMenu />}
        </>
    )
}
