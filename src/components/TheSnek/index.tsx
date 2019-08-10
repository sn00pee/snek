import React, { useEffect } from 'react'
import {
  MoveTypes,
  MoveSet,
  snekState,
  MOVE_RIGHT,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RESET,
  MOVE_DISTANCE
} from '../../store/snek'
import './snek.scss'
import { posix } from 'path';

interface Props {
  pos: snekState
  speed?: number
  distance?: number
  length: number
  onMove: (action: MoveTypes) => void
  onMoveSet: (action: MoveSet) => void
}

export default function TheSnek({
  pos,
  length,
  speed = 50,
  onMove,
  onMoveSet
}: Props) {
  const getBoundaries = () => {
    return {
      left: 0,
      top: 0,
      right: document.documentElement.clientWidth,
      bottom: document.documentElement.clientHeight
    }
  }

  const moveForward = () => {
    onMove(MOVE_RIGHT)
  }
  const moveDown = () => {
    onMove(MOVE_DOWN)
  }
  const moveUp = () => {
    onMove(MOVE_UP)
  }
  const moveBack = () => {
    onMove(MOVE_LEFT)
  }
  const stop = () => {
    resetSnek()
  }

  const checkPosition = () => {
    const { left, right, top, bottom } = getBoundaries()
    return (
      pos.x < left || pos.y < top || pos.y > bottom - 14 || pos.x > right - 14
    )
  }

  const body = Array.from(Array(length * 5).keys())

  const resetSnek = () => {
    const { bottom, right } = getBoundaries()
    const centerX = Math.ceil(right / 2 / MOVE_DISTANCE) * MOVE_DISTANCE
    const centerY = Math.ceil(bottom / 2 / MOVE_DISTANCE) * MOVE_DISTANCE

    onMoveSet({
      type: MOVE_RESET,
      payload: {
        x: centerX,
        y: centerY
      }
    })
  }

  const moveSnek = () => {
    console.log(`snek is moving: ${pos.x}, ${pos.y}, ${pos.isMoving}`)
  }

  const handleKeydown = (e: KeyboardEvent) => {
    const { keyCode } = e
    const hitWall = checkPosition()
    if (!hitWall) {
      switch (keyCode) {
        case 40:
          if (pos.isMoving !== MOVE_DOWN) moveDown()
          break
        case 38:
          if (pos.isMoving !== MOVE_UP) moveUp()
          break
        case 37:
          if (pos.isMoving !== MOVE_LEFT) moveBack()
          break
        case 39:
          if (pos.isMoving !== MOVE_RIGHT) moveForward()
          break
        default:
          console.log(keyCode)
      }
    }
  }

  const move = (action: MoveTypes) => {
    const hitWall = checkPosition()
    if (!hitWall) {
      switch (action) {
        case MOVE_DOWN:
          moveDown()
          break
        case MOVE_UP:
          moveUp()
          break
        case MOVE_LEFT:
          moveBack()
          break
        case MOVE_RIGHT:
          moveForward()
      }
    } else {
      stop()
    }
    moveSnek()
  }

  const style: React.CSSProperties = {
    position: 'absolute',
    left: pos.x,
    top: pos.y
  }

  useEffect(() => {
    resetSnek()
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown, true)

    return () => {
      window.removeEventListener('keydown', handleKeydown, true)
    }
  })

  useEffect(() => {
    const moving = pos.isMoving
      ? setInterval(() => move(pos.isMoving), speed)
      : pos.isMoving

    return () => {
      if (moving) {
        clearInterval(moving)
      }
    }
  })

  return (
    <div>
      <div className="snek" style={style} />
      {body.map((item, i) => <div className="snek" style={{
        ...style,
        left: pos.x - (10 * (i + 1))
      }}>{i}</div>)}
    </div>
  )
}
