import React, { useEffect, useRef } from 'react'
import useSnekPostion from '../../hooks/useSnekPosition'
import './snek.scss'

interface Props {
    pos?: number;
    speed?: number;
    distance?: number;
}

export default function TheSnek({pos = 0, speed = 30, distance = 6}: Props) {
    const position = useSnekPostion()

    const getWindowWidth = () => {
        return document.documentElement.clientWidth
    }
    const snek = useRef(null) 
    
    const moveForward = () => {
        position.setIsMoving('moveForward')
        position.setX(position.x + distance)
    }
    const moveDown = () => {
        position.setIsMoving('moveDown')
        position.setY(position.y + distance)
    }
    const moveUp = () => {
        position.setIsMoving('moveUp')
        position.setY(position.y - distance)
    }
    const moveBack = () => {
        position.setIsMoving('moveBack')
        position.setX(position.x - distance)
    }

    const moveSnek = () => {
        console.log(`snek is moving: ${position.x}, ${position.y}`)

    }

    const handleKeydown = (e: KeyboardEvent) => {
        const { keyCode } = e
        switch(keyCode) {
            case 40:
                moveDown()
                break
            case 38:
                moveUp()
                break
            case 37:
                moveBack()
                break
            case 39:
                moveForward()
                break
            default:
                console.log(keyCode)
        }
    }
    
    const move = (action: string) => {
        switch(action) {
            case 'moveDown':
                moveDown()
                break
            case 'moveUp':
                moveUp()
                break
            case 'moveBack':
                moveBack()
                break
            case 'moveForward':
                moveForward()
        }
    }

    const style: React.CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y
    }

    useEffect(() => {
        position.setIsFollowing(pos !== 0)
        if(!position.isFollowing) {
            window.addEventListener('keydown', handleKeydown, true)
            const moving = setInterval(() => move(position.isMoving), speed)
            return () => {
                window.removeEventListener('keydown', handleKeydown, true)
                clearInterval(moving)
            }
        }
    })


    return (
        <div className="snek" style={style} ref={snek}></div>
    )
}