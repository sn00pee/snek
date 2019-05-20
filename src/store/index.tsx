import { combineReducers, createStore } from 'redux'
import { snekReducer } from './snek'

const rootReducer = combineReducers({
    snek: snekReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
    return createStore(rootReducer)
}