import React, { useEffect, useContext, useState } from 'react'
import { ConfigContext } from './context/Config'
import { ControlsContext } from './context/Controls'

export default function Gui(props) {
    const { 
        resets, quacks, currentLevel, 
        totalLevels, startDate, unstucks
    } = useContext(ConfigContext)
    
    const {
        keys,
        keyFrontLeft, keyFrontRight, keyBackLeft, keyBackRight,
        keyThrottle, keyStuck, isUnsticking
    } = useContext(ControlsContext)

    const [nowDate, setNowDate] = useState((new Date().getTime() - startDate.getTime()) / 1000)

    useEffect(() => {
        nowDate > 0 && setTimeout(() => setNowDate((new Date().getTime() - startDate.getTime()) / 1000), 1000)
    }, [nowDate])

    const fN = n => n.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })

    const secondsToHMS = (n) => {
        n = Number(n)
        const h = Math.floor(n / 3600)
        const m = Math.floor(n % 3600 / 60)
        const s = Math.floor(n % 3600 % 60)
        return [h, m, s]
    }

    const [h, m, s] = secondsToHMS(nowDate)

    const getBG = (isKey) => isKey ? 'bg-[rgba(27,94,49,0.75)]' : 'bg-[rgba(17,24,39,0.5)]'

    return (
        <div className="pointer-events-none	fixed z-50 w-screen inset-0 h-screen">
            <div className="absolute top-6 left-6 flex flex-col gap-2">
                <p className='drop-shadow-2xl shadow-black'>
                    keys:
                </p>
                <ul className="grid grid-cols-2 gap-2">
                    <li className={`p-2 border-white border flex items-center justify-center ${getBG(keyFrontLeft)}`}>{keys.front_left}</li>
                    <li className={`p-2 border-white border flex items-center justify-center ${getBG(keyFrontRight)}`}>{keys.front_right}</li>
                    <li className={`p-2 border-white border flex items-center justify-center ${getBG(keyBackLeft)}`}>{keys.back_left}</li>
                    <li className={`p-2 border-white border flex items-center justify-center ${getBG(keyBackRight)}`}>{keys.back_right}</li>
                    <li className={`p-2 border-white border flex items-center justify-center col-span-2 ${getBG(keyThrottle)}`}>space</li>
                </ul>
                <ul className="grid grid-cols-2 gap-2">
                    <li className={`px-4 py-2 border-white border flex items-center justify-center bg-[rgba(17,24,39,0.5)]`}>reset: {keys.reset}</li>
                    <li className={`px-4 py-2 border-white border flex items-center justify-center ${getBG(keyStuck)}`}>unstuck: {keys.stuck}</li>
                    <li className={`px-4 py-2 border-white border flex items-center justify-center bg-[rgba(17,24,39,0.5)]`}>menu: esc</li>
                </ul>
                    
            </div>
            <div className="absolute top-6 right-8">
                <ul className="flex flex-col gap-4">
                    <li>Section: {props?.section || 'N/A'}</li>
                    <li>Current Level: {currentLevel}/{totalLevels}</li>
                    <li>Times Stuck: {unstucks}</li>
                    <li>Resets: {resets} </li>
                    <li>Time Since Start: {fN(h)}:{fN(m)}:{fN(s)}</li>
                    {/* <li>Quacks: {quacks}</li> */}
                </ul>    
            </div>
        </div>
    )
}