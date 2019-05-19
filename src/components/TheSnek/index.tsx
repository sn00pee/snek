import React, { useEffect, useRef } from 'react'
import useSnekPostion from '../../hooks/useSnekPosition'
import './snek.scss'

interface Props {
    pos?: number;
    speed?: number;
    distance?: number;
}

export default function TheSnek({pos = 0, speed = 50, distance = 10}: Props) {
    const position = useSnekPostion()

    const getBoundaries = () => {
        return {
            left: 0,
            top: 0,
            right: document.documentElement.clientWidth,
            bottom: document.documentElement.clientHeight
        }
    }
    
    const snek = useRef(null) 
    
    const moveForward = () => {
        position.setIsMoving('right')
        position.setX(position.x + distance)
    }
    const moveDown = () => {
        position.setIsMoving('down')
        position.setY(position.y + distance)
    }
    const moveUp = () => {
        position.setIsMoving('up')
        position.setY(position.y - distance)
    }
    const moveBack = () => {
        position.setIsMoving('left')
        position.setX(position.x - distance)
    }
    const stop = () => {
        position.setIsMoving('')
    }

    const checkPosition = () => {
        const {left, right, top, bottom} = getBoundaries()
        return position.x < left ||
            position.y < top ||
            position.y > (bottom - 14) ||
            position.x > (right - 14)
        
    }

    const resetSnek = () => {
        const { bottom, right } = getBoundaries()
        const centerX = Math.ceil( (right / 2) / distance ) * distance
        const centerY = Math.ceil( (bottom / 2) / distance ) * distance
        position.setX(centerX)
        position.setY(centerY)
    }

    const moveSnek = () => {
        console.log(`snek is moving: ${position.x}, ${position.y}`)
    }

    const handleKeydown = (e: KeyboardEvent) => {
        const { keyCode } = e
        const hitWall = checkPosition()
        if (!hitWall) {
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
    }
    
    const move = (action: string) => {
        const hitWall = checkPosition()
        if (!hitWall) {
            switch(action) {
                case 'down':
                    moveDown()
                    break
                case 'up':
                    moveUp()
                    break
                case 'left':
                    moveBack()
                    break
                case 'right':
                    moveForward()
            }
        } else {
            stop()
        }
        moveSnek() 
    }

    const style: React.CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y
    }

    useEffect(() => {
        position.setIsFollowing(pos !== 0)
        window.addEventListener('keydown', handleKeydown, true)
        const moving = position.isMoving ? setInterval(() => move(position.isMoving), speed) : position.isMoving
        if (!moving) {
            resetSnek()
        }
        return () => {
            window.removeEventListener('keydown', handleKeydown, true)
            if (moving) {
                clearInterval(moving)                
            }
        }
    })


    return (
        <div className="snek" style={style} ref={snek}></div>
    )
}