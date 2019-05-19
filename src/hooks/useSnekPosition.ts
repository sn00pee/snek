import { useState } from 'react'
import { directionType } from '../constants'

const useSnekPosition = () => {
    const [x, setX ] = useState(0)
    const [y, setY ] = useState(0)
    const [isFollowing, setIsFollowing ] = useState(false)
    const [isMoving, setIsMoving ] = useState<directionType>('')
    
    return {
        x,
        y,
        isMoving,
        isFollowing,
        setX,
        setY,
        setIsFollowing,
        setIsMoving
    }
}

export default useSnekPosition