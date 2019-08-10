import React, { CSSProperties } from 'react'
import { snekState } from '../../store/snek';

interface Props {
    parentPos: snekState
    index: number
}

const Body = (props: Props) => {
    const { parentPos, index} = props

    const style: CSSProperties = {
        position: 'absolute'
    }

    return <div className="snek" style={style}></div>
}
export default Body