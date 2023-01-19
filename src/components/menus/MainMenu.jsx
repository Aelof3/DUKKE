import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import duckBG from '../../assets/images/duckbg1.jpg'
import { ConfigContext } from "../context/Config"

export default function MainMenu(props) {
    const { resetProgress } = useContext(ConfigContext)
    const [isReset, setIsReset] = useState(false)

    const handleReset = () => {
        resetProgress()
        setIsReset(true)
        setTimeout(() => {
            setIsReset(false)
        }, 2000)
    }

    const resetButton = isReset ? 'bg-[#00990099]' : 'bg-[#aa000099]'

    return (
        <nav className="fixed w-screen inset-0 flex bg-gray-800 justify-center items-center">
            <img src={duckBG} alt="duck background" className="absolute inset-0 w-full h-full object-cover" />
            <ul className="flex flex-col gap-24 z-10 items-center justify-center">
                <li className="text-white">
                    <Link to="/game" className="p-10 bg-[#00440099] rounded-3xl text-3xl">START GAME</Link>
                </li>
                <li className="text-white">
                    <button onClick={handleReset} className={`p-4 ${resetButton} rounded-xl text-xs`}>
                        {isReset ? 'RESET COMPLETE' : 'RESET PROGRESS'}</button>
                </li>
            </ul>
        </nav>
    )
}