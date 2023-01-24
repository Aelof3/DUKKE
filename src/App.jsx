import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import MainMenu from './components/menus/MainMenu'
import LevelSelect from './components/menus/LevelSelect'

import { ConfigProvider } from './components/context/Config'


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
import CityLevel2 from './components/levels/city/CityLevel2'

import { ControlsProvider } from './components/context/Controls'
import Introduction from './components/levels/zones/Introduction'
import City from './components/levels/zones/City'

export default function App() {
  return (
    <main className='fixed inset-0 w-screen h-screen bg-gray-900'>
      <Router>
        <ConfigProvider>
          <ControlsProvider>
            <Routes>
              <Route path="/" index element={<MainMenu />} />
              <Route path="/levels">
                <Route index element={<LevelSelect />} />
                
                <Route path="intro" element={<Introduction />}>
                  <Route path="1" element={<IntroLevel1 />} />
                  <Route path="2" element={<IntroLevel2 />} />
                  <Route path="3" element={<IntroLevel3 />} />
                  <Route path="4" element={<IntroLevel4 />} />
                  <Route path="5" element={<IntroLevel5 />} />
                  <Route path="6" element={<IntroLevel6 />} />
                  <Route path="7" element={<IntroLevel7 />} />
                  <Route path="8" element={<IntroLevel8 />} />
                  <Route path="9" element={<IntroLevel9 />} />
                </Route>

                <Route path="city" element={<City />}>
                  <Route path="1" element={<CityLevel1 />} />
                  <Route path="2" element={<CityLevel2 />} />
                </Route>
              </Route>
            </Routes>
          </ControlsProvider>
        </ConfigProvider>
      </Router>
    </main>
  )
}