import { ADD_ITEM_TO_CART, DELETE_ITEM_TO_CART, RESET_CART } from "./ActionType"

const initialState = {
    items: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case DELETE_ITEM_TO_CART:
            return {
                ...state,
                items: state.items.filter((item, index) => (index !== action.payload))
            }
        case RESET_CART:
            return {...initialState}
        default:
            return state
    }
}