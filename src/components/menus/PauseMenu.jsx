import { Link } from "react-router-dom"
import duckBG from '../../assets/images/duckbg3.jpg'

export default function PauseMenu(props) {
    return (
        <nav className="z-50 fixed w-screen inset-0 flex bg-gray-800 justify-center items-center opacity-80">
            <img src={duckBG} alt="duck background" className="absolute inset-0 w-full h-full object-cover" />
            <ul className="z-10">
                <li className="text-white">
                    <Link to="/levels" className="p-10 bg-[#000000ee] rounded-3xl">EXIT TO LEVEL SELECT</Link>
                </li>
            </ul>
        </nav>
    )
}