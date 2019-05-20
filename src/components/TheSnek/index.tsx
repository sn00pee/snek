import React, { useEffect } from 'react'
import { MoveTypes, 
    snekState, 
    MOVE_RIGHT, 
    MOVE_UP,
    MOVE_DOWN, 
    MOVE_LEFT 
} from '../../store/snek'
import useSnekPostion from '../../hooks/useSnekPosition'
import './snek.scss'

interface Props {
    pos: snekState;
    speed?: number;
    distance?: number;
    onMove: (action: MoveTypes) => void
}

export default function TheSnek({pos, speed = 50, distance = 10, onMove }: Props) {
    const position = useSnekPostion()

    const getBoundaries = () => {
        return {
            left: 0,
            top: 0,
            right: document.documentElement.clientWidth,
            bottom: document.documentElement.clientHeight
        }
    }

    const moveForward = () => {
        position.setIsMoving('right')
        onMove(MOVE_RIGHT)
    }
    const moveDown = () => {
        position.setIsMoving('down')
        onMove(MOVE_DOWN)
    }
    const moveUp = () => {
        position.setIsMoving('up')
        onMove(MOVE_UP)
    }
    const moveBack = () => {
        position.setIsMoving('left')
        onMove(MOVE_LEFT)
    }
    const stop = () => {
        position.setIsMoving('')
        onMove(null)
    }

    const checkPosition = () => {
        const {left, right, top, bottom} = getBoundaries()
        return pos.x < left ||
            pos.y < top ||
            pos.y > (bottom - 14) ||
            pos.x > (right - 14)
        
    }

    const resetSnek = () => {
        const { bottom, right } = getBoundaries()
        const centerX = Math.ceil( (right / 2) / distance ) * distance
        const centerY = Math.ceil( (bottom / 2) / distance ) * distance
        position.setX(centerX)
        position.setY(centerY)
    }

    const moveSnek = () => {
        console.log(`snek is moving: ${pos.x}, ${pos.y}`)
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
        left: pos.x,
        top: pos.y
    }

    useEffect(() => {
        position.setIsFollowing(false)
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
        <div className="snek" style={style}></div>
    )
}