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

    const [quacks, setQuacks] = useState(0)

    const sD = localStorage.getItem('startDate')
    const [startDate, setStartDate] = useState(sD ? new Date(sD) : new Date())

    const rL = localStorage.getItem('resets')
    const [resets, setResets] = useState(rL ? parseInt(rL) : 0)

    const totalLevels = 9

    const cL = localStorage.getItem('currentLevel')
    const [currentLevel, setCurrentLevel] = useState(cL ? parseInt(cL) : 1)
    //const [currentLevel, setCurrentLevel] = useState(1)
    //localStorage.setItem('currentLevel', 1)

    const [paused, setPaused] = useState(false)

    const [isComplete, setIsComplete] = useState(false)

    const resetProgress = () => {
        setStartDate(new Date())
        setResets(0)
        setCurrentLevel(1)
    }

    const handleLevelComplete = () => {
        setIsComplete(true)
    }

    const handleResets = () => {
        setResets(nR => nR + 1)
    }

    useEffect(() => {
        localStorage.setItem('currentLevel', currentLevel)
    }, [currentLevel])

    useEffect(() => {
        localStorage.setItem('startDate', startDate)
    }, [startDate])

    useEffect(() => {
        localStorage.setItem('resets', resets)
    }, [resets])

    useEffect(() => {
        if (!isComplete) return

        setTimeout(() => {
            setIsComplete(false)
            
            if (currentLevel < totalLevels) {
                setCurrentLevel(nCL => nCL + 1)
            } else {
                
                const wText = [
                    'cGFpbnR7M',
                    '80b',
                    '9E',
                    'UtLMyF9'
                ]
                
                alert(`You win! \n\n ${atob(wText.join('V'))}`)

                setCurrentLevel(1)
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
                resetProgress,

                totalLevels,
                quacks,

                isComplete,
                setIsComplete,
                resets,
                handleResets,

                startDate,
            }}>
            {children}
        </ConfigContext.Provider>
    )
}