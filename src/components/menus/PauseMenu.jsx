import { Link } from "react-router-dom"
import duckBG from '../../assets/images/duckbg3.jpg'

export default function PauseMenu(props) {
    return (
        <nav className="fixed w-screen inset-0 flex bg-gray-800 justify-center items-center">
            <img src={duckBG} alt="duck background" className="absolute inset-0 w-full h-full object-cover" />
            <ul className="z-10">
                <li className="text-white">
                    <Link to="/" className="p-10 bg-[#00000099] rounded-3xl">EXIT GAME</Link>
                </li>
            </ul>
        </nav>
    )
}