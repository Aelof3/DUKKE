import React, { useEffect, useState } from 'react'

export const ControlsContext = React.createContext(null)

export const ControlsProvider = ({ children }) => {
    const [keys, setKeys] = useState({
        front_left: 'q',
        front_right: 'w',
        back_left: 'a',
        back_right: 's',
        throttle: ' ',
        reset: 'r',
        stuck: 'h',
        rotate_left: 'z',
        rotate_right: 'x',
    })

    const [pause, setPause] = useState(false)
    
    const [keyFrontLeft, setKeyFrontLeft] = useState(false)
    const [keyFrontRight, setKeyFrontRight] = useState(false)
    const [keyBackLeft, setKeyBackLeft] = useState(false)
    const [keyBackRight, setKeyBackRight] = useState(false)
    const [keyThrottle, setKeyThrottle] = useState(false)
    const [keyStuck, setKeyStuck] = useState(false)
    const [isUnsticking, setIsUnsticking] = useState(false)

    const [keyRotateLeft, setKeyRotateLeft] = useState(false)
    const [keyRotateRight, setKeyRotateRight] = useState(false)

    return (
        <ControlsContext.Provider 
            value={{
                keys,
                setKeys,
                
                pause,
                setPause,

                keyFrontLeft,
                keyFrontRight,
                keyBackLeft,
                keyBackRight,
                keyThrottle,
                keyStuck,
                isUnsticking,

                setKeyFrontLeft,
                setKeyFrontRight,
                setKeyBackLeft,
                setKeyBackRight,
                setKeyThrottle,
                setKeyStuck,
                setIsUnsticking,

                keyRotateLeft,
                keyRotateRight,

                setKeyRotateLeft,
                setKeyRotateRight
            }}>
            {children}
        </ControlsContext.Provider>
    )
}