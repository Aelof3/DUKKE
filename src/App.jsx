import { Suspense, useRef, useState, useEffect } from 'react'
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import MainMenu from './components/menus/MainMenu'
import Level1 from './components/levels/Level1'

import { Physics } from '@react-three/cannon'
import Duck from './components/player/Duck'
import PauseMenu from './components/menus/PauseMenu'
import { ConfigProvider } from './components/context/Config'

export default function App() {
  return (
    <ConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<Scene />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

function Scene() {
  const [pause, setPause] = useState(false)


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
    <main className='fixed inset-0 w-screen h-screen'>
      <Canvas shadows camera={{ position: [-8, 12, -25], fov: 25 }}>
        <color attach="background" args={['black']} />
        <directionalLight castShadow position={[5, 5, 5]} />
        <OrbitControls />
        <Physics>
          <Suspense fallback={<LoadSpinner />}>
            <Level1 />
            <Duck />
          </Suspense>
        </Physics>
        <Environment preset="city" />
      </Canvas>
      {pause && <PauseMenu />}
    </main>
  )
}

function LoadSpinner() {
  return (
    <Html center>
      <div className="fixed z-50 h-screen w-screen inset-0 flex justify-center items-center bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    </Html>
  )
}