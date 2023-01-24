import { Html } from '@react-three/drei'

export default function LoadSpinner() {
    return (
        <Html center>
            <div className="z-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
        </Html>
    )
}