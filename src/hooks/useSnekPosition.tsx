import { useState } from 'react'

const useSnekPosition = () => {
    const [x, setX ] = useState(0)
    const [y, setY ] = useState(0)
    const [isFollowing, setIsFollowing ] = useState(false)
    const [isMoving, setIsMoving ] = useState('')
    
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