import React, { useEffect, useState } from 'react'

export const ConfigContext = React.createContext(null)

export const ConfigProvider = ({ children }) => {
    const [keys, setKeys] = useState({
        front_left: 'q',
        front_right: 'w',
        back_left: 'a',
        back_right: 's',
        throttle: ' ',
        reset: 'r'
    })

    const totalLevels = 1
    const [currentLevel, setCurrentLevel] = useState(1)
    const [paused, setPaused] = useState(false)

    const [isComplete, setIsComplete] = useState(false)

    const handleLevelComplete = () => {
        setIsComplete(true)
        
        
    }

    useEffect(() => {
        if (!isComplete) return
        
        setTimeout(() => {
            setIsComplete(false)
            
            if (currentLevel <= totalLevels) {
                setCurrentLevel(currentLevel + 1)
            } else {
                alert('You win!')
            }
        }, 500)

        return () => {
            setIsComplete(false)
        }
    }, [isComplete])

    return (
        <ConfigContext.Provider 
            value={{
                keys,
                setKeys,
                
                handleLevelComplete,

                paused,
                setPaused,

                currentLevel,
                
                isComplete,
                setIsComplete
            }}>
            {children}
        </ConfigContext.Provider>
    )
}