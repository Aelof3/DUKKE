import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ConfigContext = React.createContext(null)

export const ConfigProvider = ({ children }) => {
    const [keys, setKeys] = useState({
        front_left: 'q',
        front_right: 'w',
        back_left: 'a',
        back_right: 's',
        throttle: ' ',
        reset: 'r',
        stuck: 'h'
    })

    const navigate = useNavigate()

    const [isDebug, setIsDebug] = useState(false)

    const [quacks, setQuacks] = useState(0)

    const sD = localStorage.getItem('startDate')
    const [startDate, setStartDate] = useState(sD ? new Date(sD) : new Date())

    const rL = localStorage.getItem('resets')
    const [resets, setResets] = useState(rL ? parseInt(rL) : 0)

    const uL = localStorage.getItem('unstucks')
    const [unstucks, setUnstucks] = useState(uL ? parseInt(uL) : 0)

    const totalLevels = 9

    const cL = localStorage.getItem('currentLevel')
    const [currentLevel, setCurrentLevel] = useState(cL ? parseInt(cL) : 1)

    const cZ = localStorage.getItem('currentZone')
    const [currentZone, setCurrentZone] = useState(cZ ? cZ : 'intro')
    //const [currentLevel, setCurrentLevel] = useState(1)
    //localStorage.setItem('currentLevel', 1)

    const compLevels = localStorage.getItem('completedLevels')
    const [completedLevels, setCompletedLevels] = useState(compLevels ? JSON.parse(compLevels) : [])

    const [paused, setPaused] = useState(false)

    const [isComplete, setIsComplete] = useState(false)

    const resetProgress = () => {
        setStartDate(new Date())
        setResets(0)
        setCurrentLevel(1)
        setCurrentZone('intro')
        setCompletedLevels([])
        setUnstucks(0)
    }

    const handleLevelComplete = () => {
        const completedLevel = `${currentZone}-${currentLevel}`
        if (!completedLevels?.includes(completedLevel)) {
            setCompletedLevels(clvls => [...clvls, completedLevel])
        }
        setIsComplete(true)
    }

    const handleUnstuck = () => {
        setUnstucks(nU => nU + 1)
    }

    const handleResets = () => {
        setResets(nR => nR + 1)
    }

    useEffect(() => {
        if (window?.location?.href?.includes('debug')) {
            setIsDebug(true)
        }
    },[])

    useEffect(() => {
        localStorage.setItem('completedLevels', JSON.stringify(completedLevels))
    }, [completedLevels])

    useEffect(() => {
        localStorage.setItem('unstucks', unstucks)
    }, [unstucks])

    useEffect(() => {
        localStorage.setItem('currentLevel', currentLevel)
    }, [currentLevel])

    useEffect(() => {
        localStorage.setItem('currentZone', currentZone)
    }, [currentZone])

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
            
            navigate('/levels')
            /* if (currentLevel < totalLevels) {
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
            } */
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
                setCurrentLevel,

                currentZone,
                setCurrentZone,
                
                resetProgress,

                totalLevels,
                quacks,

                isComplete,
                setIsComplete,

                completedLevels,

               
                resets,
                handleResets,

                unstucks,
                handleUnstuck,

                startDate,

                isDebug,
            }}>
            {children}
        </ConfigContext.Provider>
    )
}