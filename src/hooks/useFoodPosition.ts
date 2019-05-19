import { useState } from 'react'

const useFoodPosition = () => {
    const [x, setX ] = useState(0)
    const [y, setY ] = useState(0)
    const [isAte, setIsAte] = useState<boolean>(false)
    
    return {
        x,
        y,
        isAte,
        setX,
        setY,
        setIsAte
    }
}

export default useFoodPosition