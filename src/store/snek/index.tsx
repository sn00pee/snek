export const MOVE_UP = 'MOVE_UP'
export const MOVE_DOWN = 'MOVE_DOWN'
export const MOVE_RIGHT = 'MOVE_RIGHT'
export const MOVE_LEFT = 'MOVE_LEFT'

export type MOVE_UP = typeof MOVE_UP
export type MOVE_DOWN = typeof MOVE_DOWN
export type MOVE_RIGHT = typeof MOVE_RIGHT
export type MOVE_LEFT = typeof MOVE_LEFT

export type MoveTypes = MOVE_UP | MOVE_DOWN | MOVE_RIGHT | MOVE_LEFT | null

export interface snekState {
    x: number
    y: number
    isMoving: MoveTypes
}

export interface MoveAction {
    type: MoveTypes
}

export type Moves = MoveAction

export function move(action: MoveTypes): Moves {
    return {
        type: action
    }
}

const intialState: snekState = {
    x: 0,
    y: 0,
    isMoving: null
}

export function snekReducer(
    state = intialState,
    action: Moves
): snekState {
    switch (action.type) {
        case MOVE_UP:
            return {...state, y: state.y - 10}
    
        case MOVE_DOWN:
            return {...state, y: state.y + 10}
    
        case MOVE_LEFT:
            return {...state, x: state.x - 10}
    
        case MOVE_RIGHT:
            return {...state, x: state.x + 10}
    
        default:
            return state
    }

}