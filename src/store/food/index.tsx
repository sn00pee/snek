export const FOOD_SET = 'FOOD_SET'
export const FOOD_ATE = 'FOOD_ATE'

export const FOOD_RESET = 'FOOD_RESET'

export interface foodState {
  x: number
  y: number
  ate: number
}

export type FOOD_SET = typeof FOOD_SET
export type FOOD_ATE = typeof FOOD_ATE

export type FOOD_RESET = typeof FOOD_RESET

export type FoodTypes = FOOD_SET | FOOD_ATE | FOOD_RESET

export interface FoodAction {
  type: FoodTypes
  payload: foodState
}

export function setFood({ type, payload }: FoodAction) {
  return {
    type,
    payload
  }
}

export const initialFoodState: foodState = {
  x: 0,
  y: 0,
  ate: 0
}

export function foodReducer(state = initialFoodState, action: FoodAction) {
  switch (action.type) {
    case FOOD_SET:
      return { ...state, ...action.payload }
    case FOOD_ATE:
      return { ...state, ...action.payload }
    case FOOD_RESET:
      return { ...state, ...initialFoodState }
    default:
      return state
  }
}
