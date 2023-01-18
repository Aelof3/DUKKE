import { Suspense, useRef } from 'react'
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { OrbitControls, TorusKnot, Environment, Html } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import MainMenu from './components/menus/MainMenu'
import Level1 from './components/levels/Level1'

import { Physics } from '@react-three/cannon'
import Duck from './components/player/Duck'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/game" element={<Scene />} />
      </Routes>
    </Router> 
  )
}

function Scene() {
  return (
    <Canvas shadows camera={{position:[-8,12,-25], fov:25}}>
      <color attach="background" args={['black']} />
      <directionalLight castShadow position={[5,5,5]}/>
      <OrbitControls />
      <Physics>
        <Suspense fallback={<LoadSpinner />}>
          <Level1 />
          <Duck />
        </Suspense>
      </Physics>
      <Environment preset="city" />
    </Canvas>
  )
}

function LoadSpinner() {
  return (
    <Html center>
    <div className="fixed w-screen inset-0 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    </Html>
  )
}


function Thing() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.01))
  return (
    <TorusKnot ref={ref} args={[1, 0.3, 128, 16]}>
      <meshNormalMaterial />
    </TorusKnot>
  )
}
