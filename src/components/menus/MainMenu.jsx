import { Link } from "react-router-dom"

export default function MainMenu(props) {
    return (
        <nav className="fixed w-screen inset-0 flex bg-gray-800 justify-center items-center">
            <ul>
                <li className="text-white">
                    <Link to="/game">Start Game</Link>
                </li>
            </ul>
        </nav>
    )
}