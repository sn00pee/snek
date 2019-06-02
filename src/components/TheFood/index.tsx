import React, { useEffect, CSSProperties } from 'react'
import { intialSnekState, snekState } from '../../store/snek'
import { initialFoodState, foodState, FoodAction, FOOD_SET, FOOD_ATE } from '../../store/food'
import './food.scss'

interface Props {
    food?: foodState
    onSet: (action: FoodAction) => void
    snek: snekState
    padding?: number
}

export default function TheFood ({padding = 10, snek = intialSnekState, food = initialFoodState, onSet }: Props) {
    const position = {...food}

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

    const setPosition = (x: number, y: number, ate:number) => {
        onSet({
            type: FOOD_SET,
            payload: {...position, x, y, ate}
        })
    }

    const setRandomPostion = (eaten?: boolean) => {
        const boundaries = getBoundaries()
        const x = getRandomInt(boundaries.minX, boundaries.maxX, padding)
        const y = getRandomInt(boundaries.minY, boundaries.maxY, padding)
        let ate = position.ate
        if (eaten) {
            ate = ate + 1
        }
        setPosition(x, y, ate)

        console.log(`food is at: ${x}, ${y}`)
    }

    useEffect(() => {
        setRandomPostion()
    }, [])

    const checkSnek = (snek: snekState, pos: foodState) => {
        return (snek.x === pos.x && snek.y === pos.y) && snek.isMoving !== false
    }

    useEffect(() => {
       const ateFood = checkSnek(snek, position)
       if (ateFood) {
        setRandomPostion(ateFood)
       }
        
    }, [snek])

    const style: CSSProperties = {
        left: position.x,
        top: position.y
    }

    return (
        <div className="food" style={style}></div>
    )
}