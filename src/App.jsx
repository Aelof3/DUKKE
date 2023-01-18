import { Suspense, useRef, useState, useEffect, useContext } from 'react'
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import MainMenu from './components/menus/MainMenu'

import { Physics, Debug } from '@react-three/rapier'
import Duck from './components/player/Duck'
import PauseMenu from './components/menus/PauseMenu'
import { ConfigProvider, ConfigContext } from './components/context/Config'

import Level1 from './components/levels/Level1'
import Level2 from './components/levels/Level2'
import Level3 from './components/levels/Level3'

export default function App() {
  return (
    <ConfigProvider>
      <main className='fixed inset-0 w-screen h-screen'>
        <Router>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/game" element={<Scene />} />
          </Routes>
        </Router>
      </main>
    </ConfigProvider>
  )
}

function Scene() {
  const [pause, setPause] = useState(false)

  const { currentLevel } = useContext(ConfigContext)

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
      <Canvas shadows camera={{ position: [-8, 12, -25], fov: 25 }}>
        <color attach="background" args={['black']} />
        <directionalLight castShadow position={[5, 5, 5]} />
        <OrbitControls />
        <Suspense fallback={<LoadSpinner />}>
          <Physics colliders={false} paused={pause}>
              <Debug />
              {currentLevel === 1 && <Level1 />}
              {currentLevel === 2 && <Level2 />}
              {currentLevel === 3 && <Level3 />}

              <Duck />
          </Physics>
        </Suspense>
        <Environment preset="city" />
      </Canvas>
      {pause && <PauseMenu />}
    </>
  )
}

function LoadSpinner() {
  return (
    <Html center>
      <div className="z-50 flex justify-center items-center bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    </Html>
  )
}