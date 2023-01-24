import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import duckBG from '../../assets/images/ducks1.jpg'

import { ConfigContext } from '../context/Config'


const LevelItem = ({ zone, num, bg }) => {
    const { completedLevels } = useContext(ConfigContext)
    
    const levelSlug = `${zone}-${num}`

    const bgColor = completedLevels.includes(levelSlug) ? 'bg-green-800' : `bg-[${bg}]`

    const classes = `px-8 py-6 ${bgColor} hover:bg-blue-700 rounded-xl shadow-2xl shadow-black text-3xl border-2 border-white`

    return (
        <li className="text-white min-h-6">
            <Link to={`${zone}/${num}`}>
                <div className={classes}>
                    {num}
                </div>
            </Link>
        </li>
    )
}

const ZoneItem = ({ zone, count, bg }) => {
    return (
        <ul className="grid grid-cols-4 gap-4 z-10 w-full">
            {Array.from(Array(count).keys()).map((num) => <LevelItem key={`${zone}-${num}`} zone={zone} num={num + 1} bg={bg}/> )}
        </ul>
    ) 
}

function LevelSelect(props) {
    const navigate = useNavigate()

    useEffect(() => {
        const handleKeyDown = (e) => {
            // esc key
            if (e.keyCode === 27) {
                navigate('/')
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return (
        <nav className="fixed w-screen inset-0 flex bg-gray-900 justify-center items-center">
            <div className="relative flex flex-col gap-8 py-4 px-6 rounded-xl shadow-2xl overflow-hidden border-white border-2 bg-black shadow-black">
                <img src={duckBG} alt="duck background" className="absolute inset-0 h-full w-full object-cover opacity-50" />
                <h1 className="z-10 text-4xl text-white">Level Select</h1>
                <div className="z-10 flex flex-col gap-4">
                    <h2 className="z-10">Introduction</h2>
                    <ZoneItem zone="intro" count={9} bg="#480043" />
                </div>

                {/* <div className="z-10 flex flex-col gap-4">
                    <h2 className="z-10">City</h2>
                    <ZoneItem zone="city" count={1} bg="#480043" />
                </div> */}

                <Link 
                    to="/"
                    className="z-10 cursor-pointer text-white opacity-50 hover:opacity-100"
                >
                    Back to Main Menu
                </Link>
            </div>
        </nav>
    )
}

export default LevelSelect