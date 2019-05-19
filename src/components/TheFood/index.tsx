import React, { useEffect, CSSProperties } from 'react'
import useFoodPosition from '../../hooks/useFoodPosition'
import './food.scss'

export default function TheFood ({padding = 10}) {
    const position = useFoodPosition()

    const getBoundaries = () => {
        return {
            minX: padding,
            minY: padding,
            maxX: (document.documentElement.clientWidth - padding),
            maxY: (document.documentElement.clientHeight - padding)
        }
    }

    const getRandomInt = (min: number, max: number, rounder: number = 10) => {
        const a = Math.ceil(min);
        const b = Math.floor(max);
        const rando = Math.floor(Math.random() * (b - a + 1)) + a
        return Math.ceil(rando / rounder) * rounder;
    }

    const setRandomPosition = (x: number, y: number) => {
        position.setX(x)
        position.setY(y)
    }

    useEffect(() => {
        const boundaries = getBoundaries()
        const x = getRandomInt(boundaries.minX, boundaries.maxX, padding)
        const y = getRandomInt(boundaries.minY, boundaries.maxY, padding)
        setRandomPosition(x, y)
        console.log(`food is at: ${x}, ${y}`)
    }, [])

    const style: CSSProperties = {
        left: position.x,
        top: position.y
    }

    return (
        <div className="food" style={style}></div>
    )
}