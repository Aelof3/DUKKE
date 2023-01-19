import React, { useEffect, useContext, useState } from 'react'
import { ConfigContext } from './context/Config'

export default function Gui(props) {
    const { resets, quacks, currentLevel, totalLevels, startDate } = useContext(ConfigContext)
    
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

    return (
        <div className="pointer-events-none	fixed z-50 w-screen inset-0 h-screen">
            <div className="absolute top-6 left-6 flex flex-col gap-2">
                <p>
                    keys:
                </p>
                <ul className="grid grid-cols-2 gap-2">
                    <li className="px-4 py-2 border-white border flex items-center justify-center">q</li>
                    <li className="px-4 py-2 border-white border flex items-center justify-center">w</li>
                    <li className="px-4 py-2 border-white border flex items-center justify-center">a</li>
                    <li className="px-4 py-2 border-white border flex items-center justify-center">s</li>
                    <li className="px-4 py-2 border-white border flex items-center justify-center col-span-2">space</li>
                </ul>
                <ul className="grid grid-cols-2 gap-2">
                    <li className="px-4 py-2 border-white border flex items-center justify-center">reset: r</li>
                    <li className="px-4 py-2 border-white border flex items-center justify-center">menu: esc</li>
                </ul>
                    
            </div>
            <div className="absolute top-6 right-8">
                <ul className="flex flex-col gap-4">
                    <li>Section: Introduction</li>
                    <li>Current Level: {currentLevel}/{totalLevels}</li>
                    <li>Resets: {resets} </li>
                    <li>Time Since Start: {fN(h)}:{fN(m)}:{fN(s)}</li>
                    {/* <li>Quacks: {quacks}</li> */}
                </ul>    
            </div>
        </div>
    )
}