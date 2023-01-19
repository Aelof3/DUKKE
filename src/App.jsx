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
import { addUrlBase } from './util/helpers'


import IntroLevel1 from './components/levels/intro/IntroLevel1'
import IntroLevel2 from './components/levels/intro/IntroLevel2'
import IntroLevel3 from './components/levels/intro/IntroLevel3'
import IntroLevel4 from './components/levels/intro/IntroLevel4'
import IntroLevel5 from './components/levels/intro/IntroLevel5'
import IntroLevel6 from './components/levels/intro/IntroLevel6'
import IntroLevel7 from './components/levels/intro/IntroLevel7'
import IntroLevel8 from './components/levels/intro/IntroLevel8'
import IntroLevel9 from './components/levels/intro/IntroLevel9'

import CityLevel1 from './components/levels/city/CityLevel1'


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

  const park_hdrs = [
    'park_arboretum_2k.hdr',
    'park_bell_park_dawn_2k.hdr',
    'park_park_bench_2k.hdr',
    'park_pond_bridge_night_2k.hdr',
    'park_spruit_sunrise_2k.hdr',
  ]

  const city_hdrs = [
    'city_canary_wharf_2k.hdr',
    'city_potsdamer_platz_2k.hdr',
    'city_royal_esplanade_2k.hdr',
    'city_sunset_jhbcentral_2k.hdr',
  ]

  const desert_hdrs = [
    'desert_chapmans_drive_2k.hdr',
    'desert_goegap_2k.hdr',
    'desert_kiara_4_mid-morning_2k.hdr',
    'desert_lenong_1_2k.hdr',
    'desert_lenong_2_2k.hdr',
    'desert_quarry_02_2k.hdr',
    'desert_sunset_in_the_chalk_quarry_2k.hdr',
    'desert_syferfontein_18d_clear_2k.hdr',
  ]

  const island_hdrs = [
    'island_lakeside_2k.hdr',
    'island_pond_2k.hdr',
    'island_pool_2k.hdr',
    'island_simons_town_rocks_2k.hdr',
  ]

  const ocean_hdrs = [
    'ocean_kloofendal_48d_partly_cloudy_puresky_2k.hdr',
  ]

  const winter_hdrs = [
    'winter_birchwood_2k.hdr',
    'winter_snow_field_2k.hdr',
    'winter_snowy_field_2k.hdr',
    'winter_snowy_forest_path_01_2k.hdr',
    'winter_snowy_forest_path_02_2k.hdr',
    'winter_snowy_park_01_2k.hdr',
    'winter_winter_lake_01_2k.hdr',
  ]


  const sections = [
    {
      id: 0,
      name: 'Introduction',
      env: park_hdrs[4]
    },
    {
      id: 1,
      name: 'City',
      env: city_hdrs[0]
    },
    {
      id: 2,
      name: 'Desert',
      env: desert_hdrs[1] // 1 4 6
    },
    {
      id: 3,
      name: 'Island',
      env: island_hdrs[3] // 2
    },
    {
      id: 4,
      name: 'Ocean',
      env: ocean_hdrs[0]
    },
    {
      id: 5,
      name: 'Winter',
      env: winter_hdrs[4]
    },
  ]

  const getCurrentSection = () => {
    if (currentLevel < 10) {
      return sections[0]
    }
    if (currentLevel < 20) {
      return sections[1]
    }
    if (currentLevel < 30) {
      return sections[2]
    }
    if (currentLevel < 40) {
      return sections[3]
    }
    if (currentLevel < 50) {
      return sections[4]
    }
    if (currentLevel < 60) {
      return sections[5]
    }
  }

  const currentSection = getCurrentSection()

  return (
    <>
      <Canvas shadows camera={{ position: [-8, 12, -25], fov: 25 }}>
        {/* <color attach="background" args={['black']} /> */}
        <directionalLight castShadow position={[5, 5, 5]} />
        <OrbitControls />
        <Suspense fallback={<LoadSpinner />}>
          <Physics colliders={false} paused={pause} interpolate>
              {/* <Debug /> */}
              
              {/* INTRO */}
              {currentLevel === 1 && <IntroLevel1 />}
              {currentLevel === 2 && <IntroLevel2 />}
              {currentLevel === 3 && <IntroLevel3 />}
              {currentLevel === 4 && <IntroLevel4 />}
              {currentLevel === 5 && <IntroLevel5 />}
              {currentLevel === 6 && <IntroLevel6 />}
              {currentLevel === 7 && <IntroLevel7 />}
              {currentLevel === 8 && <IntroLevel8 />}
              {currentLevel === 9 && <IntroLevel9 />}

              {/* CITY */}
              {currentLevel === 10 && <CityLevel1 />}


              <Duck />
          </Physics>
        </Suspense>
        <Environment 
          background 
          blur={1}
          files={addUrlBase(`hdr/${currentSection.env}`)}
          resolution={256}
          />
      </Canvas>
      <Gui section={currentSection.name} />
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