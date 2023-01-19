import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import duckBG from '../../assets/images/duckbg4.jpg'
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

    const resetButton = isReset ? 'bg-[#009900]' : 'bg-[#aa0000]'

    return (
        <nav className="fixed w-screen inset-0 flex bg-gray-900 justify-center items-center">
            <div className="relative flex items-end">
                <img src={duckBG} alt="duck background" className="w-full object-contain rounded-xl shadow-2xl shadow-black border-white border-2" />
                <ul className="absolute bottom-8 left-4 flex flex-col gap-14 z-10 items-start justify-end">
                    <li className="text-white">
                        <Link to="/game" className="px-8 py-6 bg-[#480043] rounded-xl shadow-2xl shadow-black text-3xl border-2 border-white">START GAME</Link>
                    </li>
                    <li className="text-white">
                        <button onClick={handleReset} className={`p-4 ${resetButton} shadow-2xl shadow-black border-2 border-white rounded-md text-xs`}>
                            {isReset ? 'RESET COMPLETE' : 'RESET PROGRESS'}</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}