export const MOVE_UP = 'MOVE_UP'
export const MOVE_DOWN = 'MOVE_DOWN'
export const MOVE_RIGHT = 'MOVE_RIGHT'
export const MOVE_LEFT = 'MOVE_LEFT'

export const MOVE_DISTANCE = 10

export const MOVE_RESET = 'MOVE_RESET'
export const MOVE_PASSED = 'MOVE_PASSED'

export type MOVE_UP = typeof MOVE_UP
export type MOVE_DOWN = typeof MOVE_DOWN
export type MOVE_RIGHT = typeof MOVE_RIGHT
export type MOVE_LEFT = typeof MOVE_LEFT

export type MOVE_RESET = typeof MOVE_RESET
export type MOVE_PASSED = typeof MOVE_PASSED
export type MoveSets = MOVE_RESET | MOVE_PASSED
export type MoveTypes = MOVE_UP | MOVE_DOWN | MOVE_RIGHT | MOVE_LEFT | boolean

export interface snekState {
    x: number
    y: number
    isMoving: MoveTypes
}

export interface MoveAction {
    type: MoveTypes
}

export interface MoveSet {
    type: MoveSets
    payload: {
        x: number
        y: number
    }
}

export type Moves = MoveAction | MoveSet

export function move(action: MoveTypes): Moves {
    return {
        type: action
    }
}

export function set(action: MoveSet): Moves {
    return {
        type: action.type,
        payload: action.payload
    }
}

export const intialSnekState: snekState = {
    x: 0,
    y: 0,
    isMoving: false
}

export function snekReducer(
    state = intialSnekState,
    action: Moves
) {
    switch (action.type) {
        case MOVE_UP:
            return {...state, y: state.y - MOVE_DISTANCE, isMoving: action.type}
    
        case MOVE_DOWN:
            return {...state, y: state.y + MOVE_DISTANCE, isMoving: action.type}
    
        case MOVE_LEFT:
            return {...state, x: state.x - MOVE_DISTANCE, isMoving: action.type}
    
        case MOVE_RIGHT:
            return {...state, x: state.x + MOVE_DISTANCE, isMoving: action.type}
        case MOVE_RESET: 
            return {...state, x: action.payload.x , y: action.payload.y, isMoving: false }
    
        default:
            return state
    }

}