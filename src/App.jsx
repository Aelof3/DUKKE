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

import IntroLevel1 from './components/levels/intro/IntroLevel1'
import IntroLevel2 from './components/levels/intro/IntroLevel2'
import IntroLevel3 from './components/levels/intro/IntroLevel3'
import IntroLevel4 from './components/levels/intro/IntroLevel4'
import IntroLevel5 from './components/levels/intro/IntroLevel5'
import IntroLevel6 from './components/levels/intro/IntroLevel6'
import IntroLevel7 from './components/levels/intro/IntroLevel7'
import IntroLevel8 from './components/levels/intro/IntroLevel8'
import IntroLevel9 from './components/levels/intro/IntroLevel9'


import Gui from './components/Gui'

export default function App() {
  return (
    <ConfigProvider>
      <main className='fixed inset-0 w-screen h-screen bg-gray-900'>
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
          <Physics colliders={false} paused={pause} interpolate>
              {/* <Debug /> */}
              {currentLevel === 1 && <IntroLevel1 />}
              {currentLevel === 2 && <IntroLevel2 />}
              {currentLevel === 3 && <IntroLevel3 />}
              {currentLevel === 4 && <IntroLevel4 />}
              {currentLevel === 5 && <IntroLevel5 />}
              {currentLevel === 6 && <IntroLevel6 />}
              {currentLevel === 7 && <IntroLevel7 />}
              {currentLevel === 8 && <IntroLevel8 />}
              {currentLevel === 9 && <IntroLevel9 />}


              <Duck />
          </Physics>
        </Suspense>
        <Environment preset="city" />
      </Canvas>
      <Gui />
      {pause && <PauseMenu />}
    </>
  )
}

function LoadSpinner() {
  return (
    <Html center>
      <div className="z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    </Html>
  )
}