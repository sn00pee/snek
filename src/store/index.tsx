import { combineReducers, createStore } from 'redux'
import { snekReducer } from './snek'
import { foodReducer } from './food'

const rootReducer = combineReducers({
    snek: snekReducer,
    food: foodReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
    return createStore(rootReducer)
}